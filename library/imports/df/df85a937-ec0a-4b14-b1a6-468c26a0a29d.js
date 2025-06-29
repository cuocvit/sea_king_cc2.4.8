"use strict";
cc._RF.push(module, 'df85ak37ApLFLGmRowmoKKd', 'NetUtils');
// start-scene/scripts/NetUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetUtils = exports.ReportData = void 0;
var ChannelManager_1 = require("./ChannelManager");
// @
var ReportData = /** @class */ (function () {
    // @
    function ReportData() {
        this.PREFIX = "P2_",
            this.STORAGE_KEY = "ReportData",
            this.only_once_point_map = {};
        this.total_count_point_map = {};
        this.read_data();
        this.write_data();
    }
    Object.defineProperty(ReportData, "instance", {
        // @
        get: function () {
            if (this._instance === null) {
                this._instance = new ReportData();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    // @
    ReportData.prototype.report_once_point = function (point) {
        if (!this.only_once_point_map[point]) {
            this.only_once_point_map[point] = 1;
            this.write_data();
            NetUtils.report_point(point);
        }
    };
    // @
    ReportData.prototype.report_point = function (point) {
        NetUtils.report_point(point);
    };
    // @
    ReportData.prototype.write_data = function (replacer) {
        try {
            var data = JSON.stringify(this, replacer);
            cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, data);
        }
        catch (error) {
            cc.error("ReportData->write_data error:", error);
        }
    };
    // @
    ReportData.prototype.read_data = function () {
        try {
            var data = cc.sys.localStorage.getItem(this.PREFIX + this.STORAGE_KEY);
            if (data) {
                var parsedData = null;
                try {
                    parsedData = JSON.parse(data);
                }
                catch (error) {
                    // Player data deserialization failed -> 玩家数据反序列化失败
                    console.error("ReportData->read_data error: Player data deserialization failed.");
                    return;
                }
                for (var key in parsedData) {
                    if (parsedData[key] != null) { // != null <=> !== null & !== undefined
                        if (parsedData[key] instanceof Array) {
                            this[key] = [];
                            while (parsedData[key].length > 0) {
                                this[key].push(parsedData[key].shift());
                            }
                        }
                        else {
                            this[key] = parsedData[key];
                        }
                    }
                }
            }
        }
        catch (error) {
            cc.error("ReportData->read_data error:", error);
        }
    }; // end: read_data
    // @
    ReportData.prototype.clear_data = function () {
        cc.sys.localStorage.removeItem(this.PREFIX + this.STORAGE_KEY);
    };
    ReportData._instance = null;
    return ReportData;
}()); // end: ReportData class
exports.ReportData = ReportData;
// @
var NetUtils = /** @class */ (function () {
    function NetUtils() {
    }
    // @
    NetUtils.http_request = function (url, method, successCallback, errorCallback, options) {
        console.log("NetUtils->http_request:", method, url);
        if (Date.now() > 0)
            return; // Placeholder condition
        //
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = null;
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (error) {
                        response = xhr.responseText;
                    }
                    console.log("NetUtils->http_request->onreadystatechange:", response);
                    if (typeof successCallback === "function")
                        successCallback(response, xhr);
                }
                else if (xhr.status < 100 || xhr.status >= 400) {
                    if (typeof errorCallback === "function")
                        errorCallback(null, xhr);
                }
            }
        };
        //
        if (typeof options === "object") {
            for (var key in options) {
                xhr[key] = options[key];
            }
        }
        xhr.open(method, url, true);
        xhr.send();
        // if (errorCallback) errorCallback(null, {});
    }; // end: http_request
    // @
    NetUtils.generate_uuid = function () {
        return Date.now().toString(36) + "_" + Math.random().toString(36).substr(2);
    };
    // @
    NetUtils.remove_uuid = function () {
        cc.sys.localStorage.removeItem(this.PREFIX + this.STORAGE_KEY);
    };
    // @
    NetUtils.get_version = function () {
        try {
            var version = cc.sys.localStorage.getItem(this.PREFIX + this.VERSION_KEY);
            return isNaN(version) ? parseInt(version) : 0;
        }
        catch (error) {
            return 0;
        }
    };
    // @
    NetUtils.set_version = function (version) {
        cc.sys.localStorage.setItem(this.PREFIX + this.VERSION_KEY, version);
    };
    Object.defineProperty(NetUtils, "game_uuid", {
        // @
        get: function () {
            if (!window.game_uuid) {
                window.game_uuid = cc.sys.localStorage.getItem(this.PREFIX + this.STORAGE_KEY);
                if (!window.game_uuid) {
                    window.game_uuid = this.generate_uuid();
                    cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, window.game_uuid);
                }
            }
            return window.game_uuid;
        },
        enumerable: false,
        configurable: true
    });
    // @
    NetUtils.save_game_uuid = function () {
        if (window.game_uuid) {
            console.log("save Game: ", window.game_uuid);
            cc.sys.localStorage.setItem(this.PREFIX + this.STORAGE_KEY, window.game_uuid);
        }
    };
    Object.defineProperty(NetUtils, "channel_name", {
        // @
        get: function () {
            var platformName = "unknown";
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                platformName = window.tt ? "tt-game" : window.qq ? "qq-game" : window.wx ? "wechat-game" : "unknown";
            }
            else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                platformName = "tt-game";
            }
            else {
                platformName = ChannelManager_1.ChannelManager.instance.get_channel_name();
            }
            return platformName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NetUtils, "game_app_name", {
        // @
        get: function () {
            var cName = this.channel_name;
            if (cName === "tt-game") {
                return window.tt && window.tt.getSystemInfoSync ? window.tt.getSystemInfoSync().appName : "unknown";
            }
            return cName === "qq-game" ? "qq" : cName === "wechat-game" ? "wechat" : ChannelManager_1.ChannelManager.instance.get_app_name();
        },
        enumerable: false,
        configurable: true
    });
    // @
    NetUtils.report_point = function (point, value) {
        if (value === void 0) { value = 1; }
        if (this.is_cloud_test()) {
            cc.log("NetUtils->report_point: Currently in cloud testing environment, reporting point is disabled.");
        }
        else if (point != null && value != null) {
            // != null <=> !== null & !== undefined
            var url = cc.js.formatStr("https://gameapipy.6hwan.com/log/minigame_report/?gamename=sailing_%s&uuid=%s&op_type=%s&val=%s", this.game_app_name, this.game_uuid, point.toString(), value.toString());
            this.http_request(url, this.POST);
        }
    };
    // @
    NetUtils.is_cloud_test = function () {
        return (typeof GameGlobal === "object" && GameGlobal.isTest);
    };
    NetUtils.PREFIX = "P2_";
    NetUtils.STORAGE_KEY = "GameUUID";
    NetUtils.VERSION_KEY = "Version";
    NetUtils.HEAD = "HEAD";
    NetUtils.GET = "GET";
    NetUtils.POST = "POST";
    return NetUtils;
}()); // end: NetUtils class
exports.NetUtils = NetUtils;

cc._RF.pop();