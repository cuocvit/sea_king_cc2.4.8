
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ServerData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNlcnZlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7QUFDSixpREFBZ0Q7QUFDaEQsNkNBQW1DO0FBQ25DLHlDQUE0QztBQUM1QyxpQ0FBZ0M7QUFLaEMsSUFBSTtBQUNKLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQiwwQkFBVyxDQUFBO0lBQ1gsNEJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFFRCxJQUFJO0FBQ0o7SUFLSSxJQUFJO0lBQ0o7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLDRDQUFnQjtBQWE3QixJQUFJO0FBQ0o7SUFBZ0MsOEJBQWE7SUE0QnpDLElBQUk7SUFDSjtRQUFBLFlBQ0ksaUJBQU8sU0FtQlY7UUFsQkcsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSSxDQUFDLG1CQUFtQixHQUFHLDhCQUE4QixDQUFDO1FBQzFELEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxpQ0FBaUMsQ0FBQztRQUNsRSxLQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7UUFDOUIsS0FBSSxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsd0JBQXdCLEdBQUcsRUFBRSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsRUFBRTtRQUNGLEtBQUks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LFFBQVE7WUFDMUIsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDbEM7UUFDTCxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUk7SUFDRyxvQ0FBZSxHQUF0QixVQUF1QixRQUFnQixFQUFFLFFBQW9CO1FBQ3pELElBQU0sV0FBVyxHQUFZO1lBQ3pCLEdBQUcsRUFBRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRztZQUM1QixLQUFLLEVBQUUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDaEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLEdBQUc7U0FDZixDQUFDO1FBQ0YsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFDLFFBQVE7WUFDekMsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDM0IsUUFBUSxFQUFFLENBQUM7YUFDZDtpQkFBTTtnQkFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFoWEQsSUFBSTtJQUNVLDRCQUFpQixHQUFXLG9CQUFvQixDQUFDO0lBZ1huRSxpQkFBQztDQWxYRCxBQWtYQyxDQWxYK0IsNkJBQWEsR0FrWDVDLENBQUMsa0JBQWtCO0FBbFhQLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQFxyXG5pbXBvcnQgeyBTaW5nbGV0b25CYXNlIH0gZnJvbSAnLi9TaW5nbGV0b25CYXNlJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgUmFuZG9tTmFtZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL3JhbmRvbV9uYW1lJztcclxuaW1wb3J0IHsgTWFpbEluYm94SXRlbURhdGEsIE1haWxMb2dJdGVtRGF0YSB9IGZyb20gJy4vTWFpbFRlbXBEYXRhJztcclxuaW1wb3J0IHsgIHJlcXVlc3QgfSBmcm9tICcuL0RhdGFNYW5hZ2VyJztcclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gUmVxdWVzdFR5cGUge1xyXG4gICAgR0VUID0gXCJHRVRcIixcclxuICAgIFBPU1QgPSBcIlBPU1RcIlxyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJOb3RpY2VEYXRhIHtcclxuICAgIC8vIEAga2V5IGZvciB1cGRhdGUgd2hlbiByZWNlaXZpbmcgaHR0cCByZXNwb25zZS5kYXRhXHJcbiAgICBwdWJsaWMgZW1haWxfbm90aWNlX2NvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2hvdV9maWdodF9ub3RpY2VfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBnb25nX2ZpZ2h0X25vdGljZV9jb3VudDogbnVtYmVyO1xyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lbWFpbF9ub3RpY2VfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2hvdV9maWdodF9ub3RpY2VfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ29uZ19maWdodF9ub3RpY2VfY291bnQgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJEYXRhIGV4dGVuZHMgU2luZ2xldG9uQmFzZSB7XHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0RBVEFfQ0hBTkdFOiBzdHJpbmcgPSBcInNlcnZlcl9kYXRhX2NoYW5nZVwiO1xyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBpc190ZXN0X3NlcnZlcjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3NlcnZlcl9yZXF1ZXN0X3VybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdGVzdF9zZXJ2ZXJfcmVxdWVzdF91cmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgc2hvcnRfcG9vbGluZ19pbnRlcnZhbDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzeW5jX2RhdGFfaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmFuZG9tX25pY2tfbmFtZV9oaXN0b3J5OiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgbWF4X3JlbmFtZV9yZXF1ZXN0X2NvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlbmFtZV9yZXF1ZXN0X2NvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlbmFtZV9jYWxsYmFjazogKG5pY2tuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gICAgLy8gQCBwdWJsaWNcclxuICAgIHB1YmxpYyBzZXJ2ZXJfbm90aWNlX2RhdGE6IFNlcnZlck5vdGljZURhdGE7XHJcbiAgICBwdWJsaWMgdWlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3Blbl9pZDogc3RyaW5nOyAvLyAocHVibGljIG1vZGUgbm90IHVzZWQpXHJcbiAgICBwdWJsaWMgYXZhdGFyVXJsOiBzdHJpbmc7IC8vIChwdWJsaWMgbW9kZSBub3QgdXNlZClcclxuICAgIHB1YmxpYyBuaWNrbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZnJlZV9yZW5hbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtYWlsX3JlZF9wb2ludDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBoYXNfbmV3X2RlZmVuc2VfbG9nOiBib29sZWFuO1xyXG4gICAgLy8gYW55ICEhIVxyXG4gICAgcHVibGljIG1haWxfbG9nX2RhdGFfYXJyYXk6IE1haWxMb2dJdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIG1haWxfaW5ib3hfZGF0YV9hcnJheTogTWFpbEluYm94SXRlbURhdGFbXTtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pc190ZXN0X3NlcnZlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlcl9yZXF1ZXN0X3VybCA9IFwiaHR0cHM6Ly9kaGgucXN6aGcuNmh3YW4uY29tL1wiO1xyXG4gICAgICAgIHRoaXMuX3Rlc3Rfc2VydmVyX3JlcXVlc3RfdXJsID0gXCJodHRwOi8vdGVzdGRoaC5xc3poZy42aHdhbi5jb20vXCI7XHJcbiAgICAgICAgdGhpcy5zaG9ydF9wb29saW5nX2ludGVydmFsID0gNjA7XHJcbiAgICAgICAgdGhpcy5zeW5jX2RhdGFfaW50ZXJ2YWwgPSAzMDA7XHJcbiAgICAgICAgdGhpcy5yYW5kb21fbmlja19uYW1lX2hpc3RvcnkgPSBbXTtcclxuICAgICAgICB0aGlzLm1heF9yZW5hbWVfcmVxdWVzdF9jb3VudCA9IDIwO1xyXG4gICAgICAgIHRoaXMucmVuYW1lX3JlcXVlc3RfY291bnQgPSAwO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJfbm90aWNlX2RhdGEgPSBuZXcgU2VydmVyTm90aWNlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudWlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLm9wZW5faWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubmlja25hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYXZhdGFyVXJsID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRva2VuID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZyZWVfcmVuYW1lID0gMDtcclxuICAgICAgICB0aGlzLm1haWxfcmVkX3BvaW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYXNfbmV3X2RlZmVuc2VfbG9nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCBzZXJ2ZXJfcmVxdWVzdF91cmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc190ZXN0X3NlcnZlciA/IHRoaXMuX3Rlc3Rfc2VydmVyX3JlcXVlc3RfdXJsIDogdGhpcy5fc2VydmVyX3JlcXVlc3RfdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvcGVuX3BvbGxpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVyID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCk7XHJcbiAgICAgICAgc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcclxuICAgICAgICBzY2hlZHVsZXIuc2NoZWR1bGUodGhpcy5wb2xsaW5nX2hhbmRsZXIsIHRoaXMsIHRoaXMuc2hvcnRfcG9vbGluZ19pbnRlcnZhbCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsIDAsIGZhbHNlKTtcclxuICAgICAgICBzY2hlZHVsZXIuc2NoZWR1bGUodGhpcy5zeW5jX2RhdGFfaGFuZGxlciwgdGhpcywgdGhpcy5zeW5jX2RhdGFfaW50ZXJ2YWwsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFwiZW1haWxfbm90aWNlX2NvdW50X2NoYW5nZVwiLCB0aGlzLm9uX2VtYWlsX25vdGljZV9jb3VudF9jaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihcInNob3VfZmlnaHRfbm90aWNlX2NvdW50X2NoYW5nZVwiLCB0aGlzLm9uX3Nob3VfZmlnaHRfbm90aWNlX2NvdW50X2NoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFwiZ29uZ19maWdodF9ub3RpY2VfY291bnRfY2hhbmdlXCIsIHRoaXMub25fZ29uZ19maWdodF9ub3RpY2VfY291bnRfY2hhbmdlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBvbGxpbmdfaGFuZGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvbl9lbWFpbF9ub3RpY2VfY291bnRfY2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVjZWl2ZSBlbWFpbCBub3RpZmljYXRpb25cIik7IC8vIOaUtuWIsOmCruS7tumAmuefpVxyXG4gICAgICAgIHRoaXMubWFpbF9yZWRfcG9pbnQgPSB0cnVlO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFNlcnZlckRhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvbl9zaG91X2ZpZ2h0X25vdGljZV9jb3VudF9jaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tYWlsX3JlZF9wb2ludCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYXNfbmV3X2RlZmVuc2VfbG9nID0gdHJ1ZTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChTZXJ2ZXJEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIGRlZmVuc2Ugbm90aWZpY2F0aW9uXCIpOyAvLyDmlLbliLDpmLLlrojpgJrnn6VcclxuICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCk7XHJcbiAgICAgICAgZ20uZGF0YS5nZXRfcGxheWVyX2ZpZ2h0X2xvZ19kYXRhKFwiMVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuZG9fbG9nX2xvc3NfcmV3YXJkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGdtLnVpLm1hcE1haW5VSSAmJiBnbS51aS5tYXBNYWluVUkubm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0Lk1haWxMb2dOb3RpY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc19uZXdfZGVmZW5zZV9sb2cgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiV2hlbiB0aGUgbm9uLW1haW4gaW50ZXJmYWNlIHJlY2VpdmVzIHRoZSBsYXRlc3QgYmF0dGxlIHJlcG9ydCBub3RpZmljYXRpb24sIHRoZSBsYXRlc3QgYmF0dGxlIHJlcG9ydCB3aWxsIGJlIGRpc3BsYXllZCBvbmx5IHdoZW4geW91IHJldHVybiB0byB0aGUgbWFpbiBpbnRlcmZhY2VcIik7IC8vIOmdnuS4u+eVjOmdouaUtuWIsOacgOaWsOaImOaKpemAmuefpe+8jOWbnuWIsOS4u+eVjOmdouaJjeS8muaYvuekuuacgOaWsOaImOaKpVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZG9fbG9nX2xvc3NfcmV3YXJkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2RlZmVuc2VfbG9nX2RhdGFfYXJyYXk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlbXBEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wZGF0YSA9IHRlbXBEYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKDIgPT09IHRlbXBkYXRhLm9wX3Jlc3VsdCAmJiAwID09PSB0ZW1wZGF0YS5pc19kZWR1Y3RfbG9zc19yZXdhcmQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3REYXRhOiByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpZDogdGhpcy51aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgb3BfdHlwZTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbGF5X2lkOiB0ZW1wZGF0YS5yZXBsYXlfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNfZGVkdWN0X2xvc3NfcmV3YXJkOiAxXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcF9kZWR1Y3RfbG9zc19yZXdhcmQoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IHJlc3BvbnNlLlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGRhdGEuaXNfZGVkdWN0X2xvc3NfcmV3YXJkID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wZGF0YS5vcF9iYXR0bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhdHRsZSA9IHRlbXBkYXRhLm9wX2JhdHRsZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXR0bGUuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbGV0ZV9oZXJvKGJhdHRsZS51bmlxdWVfaWQsIGJhdHRsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wZGF0YS5vcF9sb3NzX3Jld2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gdGVtcGRhdGEub3BfbG9zc19yZXdhcmRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV3YXJkLmlkID4gMCAmJiByZXdhcmQubnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbENlbGxJdGVtKHJld2FyZC5pZCwgcmV3YXJkLm51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb19sb2dfbG9zc19yZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCByZXF1ZXN0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBkb19sb2dfbG9zc19yZXdhcmRcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgb25fZ29uZ19maWdodF9ub3RpY2VfY291bnRfY2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgYXR0YWNrIG5vdGlmaWNhdGlvblwiKTsgLy8g5pS25Yiw5pS75Ye76YCa55+lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHBvbGxpbmdfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgICAgIGlmIChidWlsZERhdGEgJiYgYnVpbGREYXRhLmJ1aWxkTHZsID49IDEpIGdtLmRhdGEuZ2V0X3BsYXllcl9ub3RpY2UoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzeW5jX2RhdGFfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLnVwZGF0ZV9wbGF5ZXJfZGF0YV9yZXF1ZXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGNsb3NlX3BvbGxpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVyID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCk7XHJcbiAgICAgICAgc2NoZWR1bGVyLnVuc2NoZWR1bGUodGhpcy5wb2xsaW5nX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHNjaGVkdWxlci51bnNjaGVkdWxlKHRoaXMuc3luY19kYXRhX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXCJlbWFpbF9ub3RpY2VfY291bnRfY2hhbmdlXCIsIHRoaXMub25fZW1haWxfbm90aWNlX2NvdW50X2NoYW5nZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgLy8gcHVibGljIGh0dHBfcmVxdWVzdChtZXRob2Q6IFJlcXVlc3RUeXBlLCBwYXJhbXM6IGFueSwgdXJsOiBzdHJpbmcsIGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCwgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgcHVibGljIGh0dHBfcmVxdWVzdChtZXRob2Q6IFJlcXVlc3RUeXBlLCBjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHVybDogc3RyaW5nLCBwYXJhbXM6IHJlcXVlc3QsIGRhdGE/OiByZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgLy8gY8WpOiBtZXRob2QsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcywgZGF0YVxyXG4gICAgICAgIC8vIHRoaXMuaHR0cF9yZXF1ZXN0KFJlcXVlc3RUeXBlLkdFVCwgY2FsbGJhY2ssIHVybCwgcGFyYW1zKTtcclxuICAgICAgICAvLyB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5HRVQsIHBhcmFtcywgdXJsLCBjYWxsYmFjayk7XHJcbiAgICAgICAgY29uc3QgaXNEZW1vID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNEZW1vKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwiY29ubmVjdF9mYWlsXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIGRhdGEgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJodHRwX3JlcXVlc3QgLT4geGhyLnJlc3BvbnNlVGV4dDpcIiwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImh0dHBfcmVxdWVzdCAtPiB0cnkgcGFyc2UgcmVzcG9uc2VUZXh0IGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgKHhoci5zdGF0dXMgPCAxMDAgfHwgeGhyLnN0YXR1cyA+PSA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIlJlcXVlc3QgZmFpbGVkXCIpOyAvLyDor7fmsYLlpLHotKVcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwiY29ubmVjdF9mYWlsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBxdWVyeVN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHIgPSAwO1xyXG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhwYXJhbXMpO1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgZW50cmllcy5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXNbY107XHJcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nICs9IHIgPT09IDAgPyBcIlwiIDogXCImXCI7XHJcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nICs9IGVudHJ5WzBdICsgXCI9XCIgKyBlbnRyeVsxXTtcclxuICAgICAgICAgICAgcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cmwgKz0gXCI/XCIgKyBxdWVyeVN0cmluZztcclxuICAgICAgICBjb25zb2xlLmxvZyhcImh0dHBfcmVxdWVzdCB1cmw6XCIsIHVybCk7XHJcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIGlmIChtZXRob2QgPT09IFJlcXVlc3RUeXBlLlBPU1QpIHtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSkgY2MubG9nKFwiaHR0cF9yZXF1ZXN0IGRhdGE6XCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB4aHIuc2VuZChtZXRob2QgPT09IFJlcXVlc3RUeXBlLlBPU1QgJiYgZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogbnVsbCk7XHJcbiAgICB9IC8vIGVuZDogaHR0cF9yZXF1ZXN0XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGxvZ2luX3JlcXVlc3QoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBwYXJhbXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzRGVtbyA9IHRydWU7XHJcbiAgICAgICAgaWYgKCFpc0RlbW8pIHtcclxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zZXJ2ZXJfcmVxdWVzdF91cmwgKyBcInVzZXIvbG9naW5cIjtcclxuICAgICAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZha2VSZXNwb25zZURhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcIlJlc3VsdENvZGVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwibXNnXCI6IFwiR2V0IHVzZXIgZGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInVpZFwiOiBcIjg2MzcyN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwib3Blbl9pZFwiOiBcImw2ZHN6ZjNnXzdtdWd4MTdnb2RsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJuaWNrbmFtZVwiOiBcIkRhbyBUZWFwb3RcIixcclxuICAgICAgICAgICAgICAgICAgICBcImZyZWVfcmVuYW1lXCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhdmF0YXJVcmxcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwiZGI0YTY1YjUxMGFlMTE2NWJiNWE2ODAzNzNlNjIzZjRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjYWxsYmFjayhmYWtlUmVzcG9uc2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGVuZDogbG9naW5fcmVxdWVzdFxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB1cGRhdGVfcGxheWVyX2RhdGFfcmVxdWVzdChjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogeyB1aWQ6IHN0cmluZywgdG9rZW46IHN0cmluZyB9LCBkYXRhPzogcmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc2VydmVyX3JlcXVlc3RfdXJsICsgXCJ1c2VyL3VwZGF0ZV9wbGF5ZXJfZGF0YVwiO1xyXG4gICAgICAgIHRoaXMuaHR0cF9yZXF1ZXN0KFJlcXVlc3RUeXBlLlBPU1QsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcywgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9wbGF5ZXJfZGF0YV9yZXF1ZXN0KGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCwgcGFyYW1zOiByZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zZXJ2ZXJfcmVxdWVzdF91cmwgKyBcInVzZXIvZ2V0X3BsYXllcl9kYXRhXCI7XHJcbiAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB1cGRhdGVfbmlja25hbWUoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBwYXJhbXM6IHJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlcl9yZXF1ZXN0X3VybCArIFwidXNlci91cGRhdGVfcHJvZmlsZVwiO1xyXG4gICAgICAgIHRoaXMuaHR0cF9yZXF1ZXN0KFJlcXVlc3RUeXBlLkdFVCwgY2FsbGJhY2ssIHVybCwgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgbWF0Y2hfcGxheWVycyhjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogcmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc2VydmVyX3JlcXVlc3RfdXJsICsgXCJ1c2VyL21hdGNoX3BsYXllcnNcIjtcclxuICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5HRVQsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9zY29yZV9yYW5rKGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCwgcGFyYW1zOiByZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zZXJ2ZXJfcmVxdWVzdF91cmwgKyBcInVzZXIvZ2V0X3Njb3JlX3JhbmtcIjtcclxuICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5HRVQsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVwZGF0ZV9wbGF5ZXJfZmlnaHRfZGF0YShjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogcmVxdWVzdCwgZGF0YT86IHJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlcl9yZXF1ZXN0X3VybCArIFwidXNlci91cGRhdGVfcGxheWVyX2ZpZ2h0X2RhdGFcIjtcclxuICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5QT1NULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfcGxheWVyX2ZpZ2h0X2RhdGEoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBwYXJhbXM6IHJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlcl9yZXF1ZXN0X3VybCArIFwidXNlci9nZXRfcGxheWVyX2ZpZ2h0X2RhdGFcIjtcclxuICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5HRVQsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIG9wX2RlZHVjdF9sb3NzX3Jld2FyZChjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogcmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc2VydmVyX3JlcXVlc3RfdXJsICsgXCJ1c2VyL29wX2RlZHVjdF9sb3NzX3Jld2FyZFwiO1xyXG4gICAgICAgIHRoaXMuaHR0cF9yZXF1ZXN0KFJlcXVlc3RUeXBlLkdFVCwgY2FsbGJhY2ssIHVybCwgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0X3BsYXllcl9lbWFpbF9kYXRhKGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCwgcGFyYW1zOiByZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zZXJ2ZXJfcmVxdWVzdF91cmwgKyBcInVzZXIvZ2V0X3BsYXllcl9lbWFpbF9kYXRhXCI7XHJcbiAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvcF9wbGF5ZXJfZW1haWwoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBwYXJhbXM6IHJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlcl9yZXF1ZXN0X3VybCArIFwidXNlci9vcF9wbGF5ZXJfZW1haWxcIjtcclxuICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdChSZXF1ZXN0VHlwZS5HRVQsIGNhbGxiYWNrLCB1cmwsIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9wbGF5ZXJfZmlnaHRfcmVwbGF5X2RhdGEoY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB2b2lkLCBwYXJhbXM6IHJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnNlcnZlcl9yZXF1ZXN0X3VybCArIFwidXNlci9nZXRfcGxheWVyX2ZpZ2h0X3JlcGxheV9kYXRhXCI7XHJcbiAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfcGxheWVyX25vdGljZShjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogcmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc2VydmVyX3JlcXVlc3RfdXJsICsgXCJ1c2VyL2dldF9wbGF5ZXJfbm90aWNlXCI7XHJcbiAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfcm9iX3JlY29yZChjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQsIHBhcmFtczogcmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuc2VydmVyX3JlcXVlc3RfdXJsICsgXCJ1c2VyL2dldF9yb2JfcmVjb3JkXCI7XHJcbiAgICAgICAgdGhpcy5odHRwX3JlcXVlc3QoUmVxdWVzdFR5cGUuR0VULCBjYWxsYmFjaywgdXJsLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfYXJjaF9yYW5rKGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4gdm9pZCwgcGFyYW1zOiByZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zZXJ2ZXJfcmVxdWVzdF91cmwgKyBcInVzZXIvZ2V0X2FyY2hfcmFua1wiO1xyXG4gICAgICAgIHRoaXMuaHR0cF9yZXF1ZXN0KFJlcXVlc3RUeXBlLkdFVCwgY2FsbGJhY2ssIHVybCwgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmFuZG9tX2RlZmF1bHRfbmFtZShjYWxsYmFjazogKG5pY2tuYW1lOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmFtZV9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucmVuYW1lX2RlZmF1bHRfbmlja25hbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmFuZG9tX25pY2tuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJSYW5kb21OYW1lQ29uZmlnRGF0YVwiKTtcclxuICAgICAgICBpZiAoY29uZmlnRGF0YSAmJiBjb25maWdEYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gT2JqZWN0LmtleXMoY29uZmlnRGF0YS5kYXRhKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBuaWNrbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlJhbmRvbU5hbWVDb25maWdEYXRhXCIsIFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDEsIGxlbmd0aCkgKyBcIlwiKSBhcyBSYW5kb21OYW1lO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlJhbmRvbU5hbWVDb25maWdEYXRhXCIsIFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDEsIGxlbmd0aCkgKyBcIlwiKSBhcyBSYW5kb21OYW1lO1xyXG4gICAgICAgICAgICAgICAgbmlja25hbWUgPSBsYXN0TmFtZS5sYXN0X25hbWUgKyBmaXJzdE5hbWUuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgfSB3aGlsZSAodGhpcy5yYW5kb21fbmlja19uYW1lX2hpc3RvcnkuaW5kZXhPZihuaWNrbmFtZSkgIT09IC0xKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21fbmlja19uYW1lX2hpc3RvcnkucHVzaChuaWNrbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuaWNrbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlJhbmRvbSBuYW1lIGNvbmZpZ3VyYXRpb24gdGFibGUgZXJyb3JcIik7IC8vIOmaj+acuuWQjeWtl+mFjee9ruihqOWHuumUmVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyByZW5hbWVfZGVmYXVsdF9uaWNrbmFtZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zdCBuaWNrbmFtZSA9IHRoaXMucmFuZG9tX25pY2tuYW1lKCk7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdERhdGE6IHJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIHVpZDogdGhpcy51aWQsXHJcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICBuaWNrbmFtZTogbmlja25hbWUsXHJcbiAgICAgICAgICAgIG9wX3R5cGU6IHRoaXMucmVuYW1lX3JlcXVlc3RfY291bnQgPCB0aGlzLm1heF9yZW5hbWVfcmVxdWVzdF9jb3VudCA/IFwiMVwiIDogXCIyXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX25pY2tuYW1lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoMCA9PT0gcmVzcG9uc2UuUmVzdWx0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5hbWVfY2FsbGJhY2sobmlja25hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5hbWVfcmVxdWVzdF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5hbWVfZGVmYXVsdF9uaWNrbmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgcmVxdWVzdERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyByZW5hbWVfbmlja25hbWUobmlja25hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0RGF0YTogcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZSxcclxuICAgICAgICAgICAgb3BfdHlwZTogXCIzXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEudXBkYXRlX25pY2tuYW1lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoMCA9PT0gcmVzcG9uc2UuUmVzdWx0Q29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKHJlc3BvbnNlLm1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCByZXF1ZXN0RGF0YSk7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBTZXJ2ZXJEYXRhXHJcbiJdfQ==