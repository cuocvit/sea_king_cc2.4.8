// @
import { SingletonBase } from './SingletonBase';
import { gm } from './GameManager';
import { BuildTypeEnum } from './Constants';
import { Utils } from './Utils';
import { RandomName } from '../../common/configs/random_name';
import { MailInboxItemData, MailLogItemData } from './MailTempData';
import {  request } from './DataManager';

// @
export enum RequestType {
    GET = "GET",
    POST = "POST"
}

// @
export class ServerNoticeData {
    // @ key for update when receiving http response.data
    public email_notice_count: number;
    public shou_fight_notice_count: number;
    public gong_fight_notice_count: number;
    // @
    constructor() {
        this.email_notice_count = 0;
        this.shou_fight_notice_count = 0;
        this.gong_fight_notice_count = 0;
    }
}

// @
export class ServerData extends SingletonBase {
    // @
    public static EVENT_DATA_CHANGE: string = "server_data_change";
    // @
    private is_test_server: boolean;
    private _server_request_url: string;
    private _test_server_request_url: string;
    private short_pooling_interval: number;
    private sync_data_interval: number;
    private random_nick_name_history: string[];
    private max_rename_request_count: number;
    private rename_request_count: number;
    private rename_callback: (nickname: string) => void;

    // @ public
    public server_notice_data: ServerNoticeData;
    public uid: string;
    public open_id: string; // (public mode not used)
    public avatarUrl: string; // (public mode not used)
    public nickname: string;
    public token: string;
    public free_rename: number;
    public mail_red_point: boolean;
    public has_new_defense_log: boolean;
    // any !!!
    public mail_log_data_array: MailLogItemData[];
    public mail_inbox_data_array: MailInboxItemData[];

    // @
    private constructor() {
        super();
        this.is_test_server = false;
        this._server_request_url = "https://dhh.qszhg.6hwan.com/";
        this._test_server_request_url = "http://testdhh.qszhg.6hwan.com/";
        this.short_pooling_interval = 60;
        this.sync_data_interval = 300;
        this.random_nick_name_history = [];
        this.max_rename_request_count = 20;
        this.rename_request_count = 0;
        //
        this.server_notice_data = new ServerNoticeData();
        this.uid = "";
        this.open_id = "";
        this.nickname = "";
        this.avatarUrl = "";
        this.token = "";
        this.free_rename = 0;
        this.mail_red_point = false;
        this.has_new_defense_log = false;
    }

    // @
    public get server_request_url(): string {
        return this.is_test_server ? this._test_server_request_url : this._server_request_url;
    }

    // @
    public open_polling(): void {
        const scheduler = cc.director.getScheduler();
        scheduler.enableForTarget(this);
        scheduler.schedule(this.polling_handler, this, this.short_pooling_interval, cc.macro.REPEAT_FOREVER, 0, false);
        scheduler.schedule(this.sync_data_handler, this, this.sync_data_interval, cc.macro.REPEAT_FOREVER, 0, false);
        gm.data.event_emitter.on("email_notice_count_change", this.on_email_notice_count_change, this);
        gm.data.event_emitter.on("shou_fight_notice_count_change", this.on_shou_fight_notice_count_change, this);
        gm.data.event_emitter.on("gong_fight_notice_count_change", this.on_gong_fight_notice_count_change, this);
        this.polling_handler();
    }

    // @
    public on_email_notice_count_change(): void {
        console.log("Receive email notification"); // 收到邮件通知
        this.mail_red_point = true;
        gm.data.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
    }

    // @
    public on_shou_fight_notice_count_change(): void {
        const self = this;
        this.mail_red_point = true;
        this.has_new_defense_log = true;
        gm.data.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
        console.log("Received defense notification"); // 收到防守通知
        gm.data.get_player_score_data_request();
        gm.data.get_player_fight_log_data("1", () => {
            self.do_log_loss_reward();
        });
        if (gm.ui.mapMainUI && gm.ui.mapMainUI.node.activeInHierarchy) {
            gm.ui.show_panel(gm.const.MailLogNotice);
            this.has_new_defense_log = false;
        } else {
            cc.warn("When the non-main interface receives the latest battle report notification, the latest battle report will be displayed only when you return to the main interface"); // 非主界面收到最新战报通知，回到主界面才会显示最新战报
        }
    }

    // @
    public do_log_loss_reward(): void {
        const tempData = gm.data.mail_temp_data.mail_defense_log_data_array;
        for (let index = 0; index < tempData.length; index++) {
            const tempdata = tempData[index];
            if (2 === tempdata.op_result && 0 === tempdata.is_deduct_loss_reward) {
                const requestData: request = {
                    uid: this.uid,
                    token: this.token,
                    op_type: "1",
                    replay_id: tempdata.replay_id,
                    is_deduct_loss_reward: 1
                };
                this.op_deduct_loss_reward((response) => {
                    if (0 === response.ResultCode) {
                        tempdata.is_deduct_loss_reward = 1;
                        for (let i = 0; i < tempdata.op_battle.length; i++) {
                            const battle = tempdata.op_battle[i];
                            if (battle.hp <= 0) {
                                gm.data.mapCell_data.delete_hero(battle.unique_id, battle.id);
                            }
                        }
                        for (let i = 0; i < tempdata.op_loss_reward.length; i++) {
                            const reward = tempdata.op_loss_reward[i];
                            if (reward.id > 0 && reward.num > 0) {
                                gm.data.mapCell_data.delCellItem(reward.id, reward.num);
                            }
                        }
                        this.do_log_loss_reward();
                    }
                }, requestData);
                break;
            }
        }
    } // end: do_log_loss_reward

    // @
    public on_gong_fight_notice_count_change(): void {
        console.log("Received attack notification"); // 收到攻击通知
    }

    // @
    public polling_handler(): void {
        if (!gm.data.mapCell_data) return;
        const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        if (buildData && buildData.buildLvl >= 1) gm.data.get_player_notice()
    }

    // @
    public sync_data_handler(): void {
        gm.data.update_player_data_request();
    }

    // @
    public close_polling(): void {
        const scheduler = cc.director.getScheduler();
        scheduler.unschedule(this.polling_handler, this);
        scheduler.unschedule(this.sync_data_handler, this);
        gm.data.event_emitter.off("email_notice_count_change", this.on_email_notice_count_change, this);
    }

    // @
    // public http_request(method: RequestType, params: any, url: string, callback: (response: any) => void, data?: any): void {
    public http_request(method: RequestType, callback: (response: any) => void, url: string, params: request, data?: request): void {
        // cũ: method, callback, url, params, data
        // this.http_request(RequestType.GET, callback, url, params);
        // this.http_request(RequestType.GET, params, url, callback);
        const isDemo = true;
        if (isDemo) {
            gm.data.event_emitter.emit("connect_fail");
            return;
        }
        if (data === undefined) data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                console.log("http_request -> xhr.responseText:", xhr.responseText);
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (typeof callback === "function") callback(response);
                } catch (error) {
                    console.error("http_request -> try parse responseText error:", error);
                }
            } else if (xhr.readyState === 4 && (xhr.status < 100 || xhr.status >= 400)) {
                cc.error("Request failed"); // 请求失败
                gm.data.event_emitter.emit("connect_fail");
            }
        };
        //
        let queryString = "";
        let r = 0;
        const entries = Object.entries(params);
        for (let c = 0; c < entries.length; c++) {
            const entry = entries[c];
            queryString += r === 0 ? "" : "&";
            queryString += entry[0] + "=" + entry[1];
            r++;
        }
        url += "?" + queryString;
        console.log("http_request url:", url);
        xhr.open(method, url, true);
        if (method === RequestType.POST) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        }
        if (data) cc.log("http_request data:", JSON.stringify(data));
        xhr.send(method === RequestType.POST && data ? JSON.stringify(data) : null);
    } // end: http_request

    // @
    public login_request(callback: (response: any) => void, params: any): void {
        const isDemo = true;
        if (!isDemo) {
            const url = this.server_request_url + "user/login";
            this.http_request(RequestType.GET, callback, url, params);
        } else {
            const fakeResponseData = {
                "ResultCode": 0,
                "msg": "Get user data",
                "data": {
                    "uid": "863727",
                    "open_id": "l6dszf3g_7mugx17godl",
                    "nickname": "Dao Teapot",
                    "free_rename": 0,
                    "avatarUrl": "",
                    "token": "db4a65b510ae1165bb5a680373e623f4"
                }
            };
            callback(fakeResponseData);
        }
    } // end: login_request

    // @
    public update_player_data_request(callback: (response: any) => void, params: { uid: string, token: string }, data?: request): void {
        const url = this.server_request_url + "user/update_player_data";
        this.http_request(RequestType.POST, callback, url, params, data);
    }

    // @
    public get_player_data_request(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_player_data";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public update_nickname(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/update_profile";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public match_players(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/match_players";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_score_rank(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_score_rank";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public update_player_fight_data(callback: (response: any) => void, params: request, data?: request): void {
        const url = this.server_request_url + "user/update_player_fight_data";
        this.http_request(RequestType.POST, callback, url, params, data);
    }

    // @
    public get_player_fight_data(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_player_fight_data";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public op_deduct_loss_reward(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/op_deduct_loss_reward";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_player_email_data(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_player_email_data";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public op_player_email(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/op_player_email";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_player_fight_replay_data(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_player_fight_replay_data";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_player_notice(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_player_notice";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_rob_record(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_rob_record";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public get_arch_rank(callback: (response: any) => void, params: request): void {
        const url = this.server_request_url + "user/get_arch_rank";
        this.http_request(RequestType.GET, callback, url, params);
    }

    // @
    public random_default_name(callback: (nickname: string) => void): void {
        this.rename_callback = callback;
        this.rename_default_nickname();
    }

    // @
    public random_nickname(): string {
        const configData = gm.config.get_config_data("RandomNameConfigData");
        if (configData && configData.data) {
            const length = Object.keys(configData.data).length;
            let nickname = "";
            do {
                const lastName = gm.config.get_row_data("RandomNameConfigData", Utils.math_random(true, 1, length) + "") as RandomName;
                const firstName = gm.config.get_row_data("RandomNameConfigData", Utils.math_random(true, 1, length) + "") as RandomName;
                nickname = lastName.last_name + firstName.first_name;
            } while (this.random_nick_name_history.indexOf(nickname) !== -1);
            this.random_nick_name_history.push(nickname);
            return nickname;
        }
        console.error("Random name configuration table error"); // 随机名字配置表出错
        return "";
    }

    // @
    public rename_default_nickname(): void {
        const self = this;
        const nickname = this.random_nickname();
        const requestData: request = {
            uid: this.uid,
            token: this.token,
            nickname: nickname,
            op_type: this.rename_request_count < this.max_rename_request_count ? "1" : "2"
        };
        this.update_nickname((response) => {
            if (0 === response.ResultCode) {
                self.rename_callback(nickname);
            } else {
                self.rename_request_count++;
                self.rename_default_nickname();
            }
        }, requestData);
    }

    // @
    public rename_nickname(nickname: string, callback: () => void): void {
        const requestData: request = {
            uid: gm.data.server_data.uid,
            token: gm.data.server_data.token,
            nickname: nickname,
            op_type: "3"
        };
        gm.data.server_data.update_nickname((response) => {
            if (0 === response.ResultCode) {
                callback();
            } else {
                gm.ui.show_notice(response.msg);
            }
        }, requestData);
    }
} // end: ServerData
