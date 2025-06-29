"use strict";
cc._RF.push(module, '6e017FRNmNOiIsa1SH/o4W+', 'ServerData');
// start-scene/scripts/ServerData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData = exports.ServerNoticeData = exports.RequestType = void 0;
// @
var SingletonBase_1 = require("./SingletonBase");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var Utils_1 = require("./Utils");
// @
var RequestType;
(function (RequestType) {
    RequestType["GET"] = "GET";
    RequestType["POST"] = "POST";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
// @
var ServerNoticeData = /** @class */ (function () {
    // @
    function ServerNoticeData() {
        this.email_notice_count = 0;
        this.shou_fight_notice_count = 0;
        this.gong_fight_notice_count = 0;
    }
    return ServerNoticeData;
}());
exports.ServerNoticeData = ServerNoticeData;
// @
var ServerData = /** @class */ (function (_super) {
    __extends(ServerData, _super);
    // @
    function ServerData() {
        var _this = _super.call(this) || this;
        _this.is_test_server = false;
        _this._server_request_url = "https://dhh.qszhg.6hwan.com/";
        _this._test_server_request_url = "http://testdhh.qszhg.6hwan.com/";
        _this.short_pooling_interval = 60;
        _this.sync_data_interval = 300;
        _this.random_nick_name_history = [];
        _this.max_rename_request_count = 20;
        _this.rename_request_count = 0;
        //
        _this.server_notice_data = new ServerNoticeData();
        _this.uid = "";
        _this.open_id = "";
        _this.nickname = "";
        _this.avatarUrl = "";
        _this.token = "";
        _this.free_rename = 0;
        _this.mail_red_point = false;
        _this.has_new_defense_log = false;
        return _this;
    }
    Object.defineProperty(ServerData.prototype, "server_request_url", {
        // @
        get: function () {
            return this.is_test_server ? this._test_server_request_url : this._server_request_url;
        },
        enumerable: false,
        configurable: true
    });
    // @
    ServerData.prototype.open_polling = function () {
        var scheduler = cc.director.getScheduler();
        scheduler.enableForTarget(this);
        scheduler.schedule(this.polling_handler, this, this.short_pooling_interval, cc.macro.REPEAT_FOREVER, 0, false);
        scheduler.schedule(this.sync_data_handler, this, this.sync_data_interval, cc.macro.REPEAT_FOREVER, 0, false);
        GameManager_1.gm.data.event_emitter.on("email_notice_count_change", this.on_email_notice_count_change, this);
        GameManager_1.gm.data.event_emitter.on("shou_fight_notice_count_change", this.on_shou_fight_notice_count_change, this);
        GameManager_1.gm.data.event_emitter.on("gong_fight_notice_count_change", this.on_gong_fight_notice_count_change, this);
        this.polling_handler();
    };
    // @
    ServerData.prototype.on_email_notice_count_change = function () {
        console.log("Receive email notification"); // 收到邮件通知
        this.mail_red_point = true;
        GameManager_1.gm.data.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
    };
    // @
    ServerData.prototype.on_shou_fight_notice_count_change = function () {
        var self = this;
        this.mail_red_point = true;
        this.has_new_defense_log = true;
        GameManager_1.gm.data.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
        console.log("Received defense notification"); // 收到防守通知
        GameManager_1.gm.data.get_player_score_data_request();
        GameManager_1.gm.data.get_player_fight_log_data("1", function () {
            self.do_log_loss_reward();
        });
        if (GameManager_1.gm.ui.mapMainUI && GameManager_1.gm.ui.mapMainUI.node.activeInHierarchy) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.MailLogNotice);
            this.has_new_defense_log = false;
        }
        else {
            cc.warn("When the non-main interface receives the latest battle report notification, the latest battle report will be displayed only when you return to the main interface"); // 非主界面收到最新战报通知，回到主界面才会显示最新战报
        }
    };
    // @
    ServerData.prototype.do_log_loss_reward = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array;
        var _loop_1 = function (index) {
            var tempdata = tempData[index];
            if (2 === tempdata.op_result && 0 === tempdata.is_deduct_loss_reward) {
                var requestData = {
                    uid: this_1.uid,
                    token: this_1.token,
                    op_type: "1",
                    replay_id: tempdata.replay_id,
                    is_deduct_loss_reward: 1
                };
                this_1.op_deduct_loss_reward(function (response) {
                    if (0 === response.ResultCode) {
                        tempdata.is_deduct_loss_reward = 1;
                        for (var i = 0; i < tempdata.op_battle.length; i++) {
                            var battle = tempdata.op_battle[i];
                            if (battle.hp <= 0) {
                                GameManager_1.gm.data.mapCell_data.delete_hero(battle.unique_id, battle.id);
                            }
                        }
                        for (var i = 0; i < tempdata.op_loss_reward.length; i++) {
                            var reward = tempdata.op_loss_reward[i];
                            if (reward.id > 0 && reward.num > 0) {
                                GameManager_1.gm.data.mapCell_data.delCellItem(reward.id, reward.num);
                            }
                        }
                        _this.do_log_loss_reward();
                    }
                }, requestData);
                return "break";
            }
        };
        var this_1 = this;
        for (var index = 0; index < tempData.length; index++) {
            var state_1 = _loop_1(index);
            if (state_1 === "break")
                break;
        }
    }; // end: do_log_loss_reward
    // @
    ServerData.prototype.on_gong_fight_notice_count_change = function () {
        console.log("Received attack notification"); // 收到攻击通知
    };
    // @
    ServerData.prototype.polling_handler = function () {
        if (!GameManager_1.gm.data.mapCell_data)
            return;
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (buildData && buildData.buildLvl >= 1)
            GameManager_1.gm.data.get_player_notice();
    };
    // @
    ServerData.prototype.sync_data_handler = function () {
        GameManager_1.gm.data.update_player_data_request();
    };
    // @
    ServerData.prototype.close_polling = function () {
        var scheduler = cc.director.getScheduler();
        scheduler.unschedule(this.polling_handler, this);
        scheduler.unschedule(this.sync_data_handler, this);
        GameManager_1.gm.data.event_emitter.off("email_notice_count_change", this.on_email_notice_count_change, this);
    };
    // @
    // public http_request(method: RequestType, params: any, url: string, callback: (response: any) => void, data?: any): void {
    ServerData.prototype.http_request = function (method, callback, url, params, data) {
        // cũ: method, callback, url, params, data
        // this.http_request(RequestType.GET, callback, url, params);
        // this.http_request(RequestType.GET, params, url, callback);
        var isDemo = true;
        if (isDemo) {
            GameManager_1.gm.data.event_emitter.emit("connect_fail");
            return;
        }
        if (data === undefined)
            data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                console.log("http_request -> xhr.responseText:", xhr.responseText);
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (typeof callback === "function")
                        callback(response);
                }
                catch (error) {
                    console.error("http_request -> try parse responseText error:", error);
                }
            }
            else if (xhr.readyState === 4 && (xhr.status < 100 || xhr.status >= 400)) {
                cc.error("Request failed"); // 请求失败
                GameManager_1.gm.data.event_emitter.emit("connect_fail");
            }
        };
        //
        var queryString = "";
        var r = 0;
        var entries = Object.entries(params);
        for (var c = 0; c < entries.length; c++) {
            var entry = entries[c];
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
        if (data)
            cc.log("http_request data:", JSON.stringify(data));
        xhr.send(method === RequestType.POST && data ? JSON.stringify(data) : null);
    }; // end: http_request
    // @
    ServerData.prototype.login_request = function (callback, params) {
        var isDemo = true;
        if (!isDemo) {
            var url = this.server_request_url + "user/login";
            this.http_request(RequestType.GET, callback, url, params);
        }
        else {
            var fakeResponseData = {
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
    }; // end: login_request
    // @
    ServerData.prototype.update_player_data_request = function (callback, params, data) {
        var url = this.server_request_url + "user/update_player_data";
        this.http_request(RequestType.POST, callback, url, params, data);
    };
    // @
    ServerData.prototype.get_player_data_request = function (callback, params) {
        var url = this.server_request_url + "user/get_player_data";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.update_nickname = function (callback, params) {
        var url = this.server_request_url + "user/update_profile";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.match_players = function (callback, params) {
        var url = this.server_request_url + "user/match_players";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_score_rank = function (callback, params) {
        var url = this.server_request_url + "user/get_score_rank";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.update_player_fight_data = function (callback, params, data) {
        var url = this.server_request_url + "user/update_player_fight_data";
        this.http_request(RequestType.POST, callback, url, params, data);
    };
    // @
    ServerData.prototype.get_player_fight_data = function (callback, params) {
        var url = this.server_request_url + "user/get_player_fight_data";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.op_deduct_loss_reward = function (callback, params) {
        var url = this.server_request_url + "user/op_deduct_loss_reward";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_player_email_data = function (callback, params) {
        var url = this.server_request_url + "user/get_player_email_data";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.op_player_email = function (callback, params) {
        var url = this.server_request_url + "user/op_player_email";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_player_fight_replay_data = function (callback, params) {
        var url = this.server_request_url + "user/get_player_fight_replay_data";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_player_notice = function (callback, params) {
        var url = this.server_request_url + "user/get_player_notice";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_rob_record = function (callback, params) {
        var url = this.server_request_url + "user/get_rob_record";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.get_arch_rank = function (callback, params) {
        var url = this.server_request_url + "user/get_arch_rank";
        this.http_request(RequestType.GET, callback, url, params);
    };
    // @
    ServerData.prototype.random_default_name = function (callback) {
        this.rename_callback = callback;
        this.rename_default_nickname();
    };
    // @
    ServerData.prototype.random_nickname = function () {
        var configData = GameManager_1.gm.config.get_config_data("RandomNameConfigData");
        if (configData && configData.data) {
            var length = Object.keys(configData.data).length;
            var nickname = "";
            do {
                var lastName = GameManager_1.gm.config.get_row_data("RandomNameConfigData", Utils_1.Utils.math_random(true, 1, length) + "");
                var firstName = GameManager_1.gm.config.get_row_data("RandomNameConfigData", Utils_1.Utils.math_random(true, 1, length) + "");
                nickname = lastName.last_name + firstName.first_name;
            } while (this.random_nick_name_history.indexOf(nickname) !== -1);
            this.random_nick_name_history.push(nickname);
            return nickname;
        }
        console.error("Random name configuration table error"); // 随机名字配置表出错
        return "";
    };
    // @
    ServerData.prototype.rename_default_nickname = function () {
        var self = this;
        var nickname = this.random_nickname();
        var requestData = {
            uid: this.uid,
            token: this.token,
            nickname: nickname,
            op_type: this.rename_request_count < this.max_rename_request_count ? "1" : "2"
        };
        this.update_nickname(function (response) {
            if (0 === response.ResultCode) {
                self.rename_callback(nickname);
            }
            else {
                self.rename_request_count++;
                self.rename_default_nickname();
            }
        }, requestData);
    };
    // @
    ServerData.prototype.rename_nickname = function (nickname, callback) {
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            nickname: nickname,
            op_type: "3"
        };
        GameManager_1.gm.data.server_data.update_nickname(function (response) {
            if (0 === response.ResultCode) {
                callback();
            }
            else {
                GameManager_1.gm.ui.show_notice(response.msg);
            }
        }, requestData);
    };
    // @
    ServerData.EVENT_DATA_CHANGE = "server_data_change";
    return ServerData;
}(SingletonBase_1.SingletonBase)); // end: ServerData
exports.ServerData = ServerData;

cc._RF.pop();