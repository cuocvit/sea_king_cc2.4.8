
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NetUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5ldFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRDtBQUVsRCxJQUFJO0FBQ0o7SUFRSSxJQUFJO0lBQ0o7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUs7WUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVk7WUFDL0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdELHNCQUFrQixzQkFBUTtRQUQxQixJQUFJO2FBQ0o7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxJQUFJO0lBQ0csc0NBQWlCLEdBQXhCLFVBQXlCLEtBQWE7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVELElBQUk7SUFDRyxpQ0FBWSxHQUFuQixVQUFvQixLQUFhO1FBQzdCLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUk7SUFDRywrQkFBVSxHQUFqQixVQUFrQixRQUFzRDtR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Q0FBQztJQUVELElBQUk7SUFDVSxzQkFBYSxHQUEzQjtRQUNJLE9BQU8sQ0FBQyxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFySWEsZUFBTSxHQUFHLEtBQUssQ0FBQztJQUNmLG9CQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLG9CQUFXLEdBQUcsU0FBUyxDQUFDO0lBQ3hCLGFBQUksR0FBRyxNQUFNLENBQUM7SUFDZCxZQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1osYUFBSSxHQUFHLE1BQU0sQ0FBQztJQWlJaEMsZUFBQztDQXZJRCxBQXVJQyxJQUFBLENBQUMsc0JBQXNCO0FBdklYLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgUmVwb3J0RGF0YSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJlcG9ydERhdGEgfCBudWxsID0gbnVsbDtcclxuICAgIC8vXHJcbiAgICBQUkVGSVg6IHN0cmluZztcclxuICAgIFNUT1JBR0VfS0VZOiBzdHJpbmc7XHJcbiAgICBvbmx5X29uY2VfcG9pbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xyXG4gICAgdG90YWxfY291bnRfcG9pbnRfbWFwOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5QUkVGSVggPSBcIlAyX1wiLFxyXG4gICAgICAgICAgICB0aGlzLlNUT1JBR0VfS0VZID0gXCJSZXBvcnREYXRhXCIsXHJcbiAgICAgICAgICAgIHRoaXMub25seV9vbmNlX3BvaW50X21hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMudG90YWxfY291bnRfcG9pbnRfbWFwID0ge307XHJcbiAgICAgICAgdGhpcy5yZWFkX2RhdGEoKTtcclxuICAgICAgICB0aGlzLndyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBSZXBvcnREYXRhIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgUmVwb3J0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHJlcG9ydF9vbmNlX3BvaW50KHBvaW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMub25seV9vbmNlX3BvaW50X21hcFtwb2ludF0pIHtcclxuICAgICAgICAgICAgdGhpcy5vbmx5X29uY2VfcG9pbnRfbWFwW3BvaW50XSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICBOZXRVdGlscy5yZXBvcnRfcG9pbnQocG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmVwb3J0X3BvaW50KHBvaW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBOZXRVdGlscy5yZXBvcnRfcG9pbnQocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB3cml0ZV9kYXRhKHJlcGxhY2VyPzogKHRoaXM6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLCByZXBsYWNlcik7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLlBSRUZJWCArIHRoaXMuU1RPUkFHRV9LRVksIGRhdGEpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiUmVwb3J0RGF0YS0+d3JpdGVfZGF0YSBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmVhZF9kYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5QUkVGSVggKyB0aGlzLlNUT1JBR0VfS0VZKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYXllciBkYXRhIGRlc2VyaWFsaXphdGlvbiBmYWlsZWQgLT4g546p5a625pWw5o2u5Y+N5bqP5YiX5YyW5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlcG9ydERhdGEtPnJlYWRfZGF0YSBlcnJvcjogUGxheWVyIGRhdGEgZGVzZXJpYWxpemF0aW9uIGZhaWxlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcGFyc2VkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZWREYXRhW2tleV0gIT0gbnVsbCkgeyAvLyAhPSBudWxsIDw9PiAhPT0gbnVsbCAmICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlZERhdGFba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChwYXJzZWREYXRhW2tleV0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHBhcnNlZERhdGFba2V5XS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcnNlZERhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiUmVwb3J0RGF0YS0+cmVhZF9kYXRhIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IHJlYWRfZGF0YVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBjbGVhcl9kYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLlBSRUZJWCArIHRoaXMuU1RPUkFHRV9LRVkpO1xyXG4gICAgfVxyXG59IC8vIGVuZDogUmVwb3J0RGF0YSBjbGFzc1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgTmV0VXRpbHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBQUkVGSVggPSBcIlAyX1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVE9SQUdFX0tFWSA9IFwiR2FtZVVVSURcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVkVSU0lPTl9LRVkgPSBcIlZlcnNpb25cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgSEVBRCA9IFwiSEVBRFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBHRVQgPSBcIkdFVFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBQT1NUID0gXCJQT1NUXCI7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBodHRwX3JlcXVlc3QoXHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgbWV0aG9kOiBzdHJpbmcsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrPzogKHJlc3BvbnNlOiBhbnksIHhocjogWE1MSHR0cFJlcXVlc3QpID0+IHZvaWQsXHJcbiAgICAgICAgZXJyb3JDYWxsYmFjaz86IChlcnJvcjogYW55LCB4aHI6IFhNTEh0dHBSZXF1ZXN0KSA9PiB2b2lkLFxyXG4gICAgICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldFV0aWxzLT5odHRwX3JlcXVlc3Q6XCIsIG1ldGhvZCwgdXJsKTtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSA+IDApIHJldHVybjsgLy8gUGxhY2Vob2xkZXIgY29uZGl0aW9uXHJcbiAgICAgICAgLy9cclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5ldFV0aWxzLT5odHRwX3JlcXVlc3QtPm9ucmVhZHlzdGF0ZWNoYW5nZTpcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VjY2Vzc0NhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHN1Y2Nlc3NDYWxsYmFjayhyZXNwb25zZSwgeGhyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA8IDEwMCB8fCB4aHIuc3RhdHVzID49IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBlcnJvckNhbGxiYWNrKG51bGwsIHhocik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgeGhyW2tleV0gPSBvcHRpb25zW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgLy8gaWYgKGVycm9yQ2FsbGJhY2spIGVycm9yQ2FsbGJhY2sobnVsbCwge30pO1xyXG4gICAgfSAvLyBlbmQ6IGh0dHBfcmVxdWVzdFxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2VuZXJhdGVfdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSArIFwiX1wiICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlX3V1aWQoKTogdm9pZCB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuUFJFRklYICsgdGhpcy5TVE9SQUdFX0tFWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfdmVyc2lvbigpOiBudW1iZXIge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5QUkVGSVggKyB0aGlzLlZFUlNJT05fS0VZKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHZlcnNpb24pID8gcGFyc2VJbnQodmVyc2lvbikgOiAwO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldF92ZXJzaW9uKHZlcnNpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLlBSRUZJWCArIHRoaXMuVkVSU0lPTl9LRVksIHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGdhbWVfdXVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghd2luZG93LmdhbWVfdXVpZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2FtZV91dWlkID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuUFJFRklYICsgdGhpcy5TVE9SQUdFX0tFWSk7XHJcbiAgICAgICAgICAgIGlmICghd2luZG93LmdhbWVfdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmdhbWVfdXVpZCA9IHRoaXMuZ2VuZXJhdGVfdXVpZCgpO1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuUFJFRklYICsgdGhpcy5TVE9SQUdFX0tFWSwgd2luZG93LmdhbWVfdXVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nYW1lX3V1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlX2dhbWVfdXVpZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAod2luZG93LmdhbWVfdXVpZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNhdmUgR2FtZTogXCIsIHdpbmRvdy5nYW1lX3V1aWQpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5QUkVGSVggKyB0aGlzLlNUT1JBR0VfS0VZLCB3aW5kb3cuZ2FtZV91dWlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY2hhbm5lbF9uYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHBsYXRmb3JtTmFtZSA9IFwidW5rbm93blwiO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybU5hbWUgPSB3aW5kb3cudHQgPyBcInR0LWdhbWVcIiA6IHdpbmRvdy5xcSA/IFwicXEtZ2FtZVwiIDogd2luZG93Lnd4ID8gXCJ3ZWNoYXQtZ2FtZVwiIDogXCJ1bmtub3duXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybU5hbWUgPSBcInR0LWdhbWVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybU5hbWUgPSBDaGFubmVsTWFuYWdlci5pbnN0YW5jZS5nZXRfY2hhbm5lbF9uYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF0Zm9ybU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZ2FtZV9hcHBfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGNOYW1lID0gdGhpcy5jaGFubmVsX25hbWU7XHJcbiAgICAgICAgaWYgKGNOYW1lID09PSBcInR0LWdhbWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnR0ICYmIHdpbmRvdy50dC5nZXRTeXN0ZW1JbmZvU3luYyA/IHdpbmRvdy50dC5nZXRTeXN0ZW1JbmZvU3luYygpLmFwcE5hbWUgOiBcInVua25vd25cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNOYW1lID09PSBcInFxLWdhbWVcIiA/IFwicXFcIiA6IGNOYW1lID09PSBcIndlY2hhdC1nYW1lXCIgPyBcIndlY2hhdFwiIDogQ2hhbm5lbE1hbmFnZXIuaW5zdGFuY2UuZ2V0X2FwcF9uYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRfcG9pbnQocG9pbnQ6IG51bWJlciwgdmFsdWU6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc19jbG91ZF90ZXN0KCkpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiTmV0VXRpbHMtPnJlcG9ydF9wb2ludDogQ3VycmVudGx5IGluIGNsb3VkIHRlc3RpbmcgZW52aXJvbm1lbnQsIHJlcG9ydGluZyBwb2ludCBpcyBkaXNhYmxlZC5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludCAhPSBudWxsICYmIHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gIT0gbnVsbCA8PT4gIT09IG51bGwgJiAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNjLmpzLmZvcm1hdFN0cihcclxuICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9nYW1lYXBpcHkuNmh3YW4uY29tL2xvZy9taW5pZ2FtZV9yZXBvcnQvP2dhbWVuYW1lPXNhaWxpbmdfJXMmdXVpZD0lcyZvcF90eXBlPSVzJnZhbD0lc1wiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX2FwcF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3V1aWQsXHJcbiAgICAgICAgICAgICAgICBwb2ludC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBfcmVxdWVzdCh1cmwsIHRoaXMuUE9TVCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNfY2xvdWRfdGVzdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiBHYW1lR2xvYmFsID09PSBcIm9iamVjdFwiICYmIEdhbWVHbG9iYWwuaXNUZXN0KTtcclxuICAgIH1cclxufSAvLyBlbmQ6IE5ldFV0aWxzIGNsYXNzXHJcbiJdfQ==