
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MainData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74700JHprFGN6aKA/4ShZaH', 'MainData');
// start-scene/scripts/MainData.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapItemVo = exports.MapDataVO = exports.MainData = void 0;
// @
var NetUtils_1 = require("./NetUtils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
var ServerData_1 = require("./ServerData");
//
var MainData = /** @class */ (function (_super) {
    __extends(MainData, _super);
    // @
    function MainData() {
        var _this = _super.call(this) || this;
        _this.store_timestamp = 0; // (public mode not used)
        _this.STORAGE_KEY = "MainData",
            _this.uuid = "";
        _this.new_store_timestamp = Date.now();
        _this.store_timestamp = 0;
        //
        _this.is_music_mute = false;
        _this.is_effect_mute = false;
        _this.is_vibrate = false;
        _this.ab_test = Constants_1.ABTest.A;
        _this.has_watch_story = true;
        _this.story_reward = 0;
        _this.left_share_count = 0;
        _this.is_today_no_ad = false;
        //
        _this.role_map_Data = null;
        _this.is_receive_shortcut_reward = false;
        _this.left_free_super_recruit_count = 0;
        _this.is_first_super_recruit = true;
        _this.super_recruit_count = 0;
        return _this;
        // this.server_notice_data = null;
    }
    // @
    MainData.prototype.async_read_data = function (callback) {
        return __awaiter(this, void 0, Promise, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                _super.prototype.async_read_data.call(this, function (data) {
                    var _a, _b, _c, _d, _e, _f;
                    if (self.is_init) {
                        if (self.server_notice_data === null) {
                            self.server_notice_data = new ServerData_1.ServerNoticeData();
                        }
                        self.left_share_count = (_a = self.left_share_count) !== null && _a !== void 0 ? _a : GameManager_1.gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
                        self.is_today_no_ad = (_b = self.is_today_no_ad) !== null && _b !== void 0 ? _b : false;
                        self.is_receive_shortcut_reward = (_c = self.is_receive_shortcut_reward) !== null && _c !== void 0 ? _c : false;
                        self.left_free_super_recruit_count = (_d = self.left_free_super_recruit_count) !== null && _d !== void 0 ? _d : GameManager_1.gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
                        self.super_recruit_count = (_e = self.super_recruit_count) !== null && _e !== void 0 ? _e : 0;
                        self.is_first_super_recruit = (_f = self.is_first_super_recruit) !== null && _f !== void 0 ? _f : true;
                        Object.setPrototypeOf(self.server_notice_data, ServerData_1.ServerNoticeData.prototype);
                    }
                    else {
                        self.uuid = NetUtils_1.NetUtils.generate_uuid();
                        self.ab_test = Math.floor(self.new_store_timestamp / 1000) % 2 === 0 ? Constants_1.ABTest.A : Constants_1.ABTest.B;
                        self.has_watch_story = false;
                        self.role_map_Data = new MapDataVO();
                        self.story_reward = 0;
                        self.role_map_Data.col = 0;
                        self.role_map_Data.row = 0;
                        self.role_map_Data.mapList = [];
                        self.server_notice_data = new ServerData_1.ServerNoticeData();
                        self.left_share_count = GameManager_1.gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
                        self.is_today_no_ad = false;
                        self.left_free_super_recruit_count = GameManager_1.gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
                        self.super_recruit_count = 0;
                        self.is_first_super_recruit = true;
                        self.is_init = true;
                        self.async_write_data();
                    }
                    GameManager_1.gm.audio.music_mute = self.is_music_mute;
                    GameManager_1.gm.audio.music_volume = self.is_music_mute ? 0 : 1;
                    GameManager_1.gm.audio.effect_mute = self.is_effect_mute;
                    GameManager_1.gm.audio.effect_volume = self.is_effect_mute ? 0 : 1;
                    if (callback)
                        callback(data);
                });
                return [2 /*return*/];
            });
        });
    }; // end: async_read_data
    // @
    MainData.prototype.async_write_data = function (callback) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                GameManager_1.gm.data.event_emitter.emit(MainData.EVENT_DATA_CHANGE);
                this.store_timestamp = Date.now();
                this.is_music_mute = GameManager_1.gm.audio.music_mute;
                this.is_effect_mute = GameManager_1.gm.audio.effect_mute;
                _super.prototype.async_write_data.call(this, callback);
                return [2 /*return*/];
            });
        });
    };
    // @
    MainData.prototype.clear = function () {
        this.uuid = "";
        this.new_store_timestamp = Date.now();
        this.store_timestamp = 0;
        this.is_music_mute = false;
        this.is_effect_mute = false;
        this.is_vibrate = false;
        this.ab_test = Constants_1.ABTest.A;
        this.has_watch_story = true;
        this.story_reward = 0;
        this.role_map_Data = new MapDataVO();
        this.server_notice_data = new ServerData_1.ServerNoticeData();
    };
    // @
    MainData.EVENT_DATA_CHANGE = "main_data_change";
    return MainData;
}(StorageBase_1.StorageBase));
exports.MainData = MainData;
// @
var MapDataVO = /** @class */ (function () {
    function MapDataVO() {
        this.col = 0;
        this.row = 0;
        this.mapList = [];
    }
    return MapDataVO;
}());
exports.MapDataVO = MapDataVO;
// @
var MapItemVo = /** @class */ (function () {
    function MapItemVo() {
    }
    return MapItemVo;
}());
exports.MapItemVo = MapItemVo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1haW5EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJO0FBQ0osdUNBQXNDO0FBQ3RDLHlDQUFtRDtBQUNuRCw2Q0FBbUM7QUFDbkMsNkNBQTRDO0FBQzVDLDJDQUFnRDtBQUVoRCxFQUFFO0FBQ0Y7SUFBOEIsNEJBQVc7SUF5QnJDLElBQUk7SUFDSjtRQUFBLFlBQ0ksaUJBQU8sU0FxQlY7UUFuQ00scUJBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFlekQsS0FBSSxDQUFDLFdBQVcsR0FBRyxVQUFVO1lBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QyxLQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixFQUFFO1FBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxrQkFBTSxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEVBQUU7UUFDRixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixLQUFJLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLEtBQUks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SSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBTSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksNkJBQWdCLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBaEhELElBQUk7SUFDVSwwQkFBaUIsR0FBVyxrQkFBa0IsQ0FBQztJQWdIakUsZUFBQztDQWxIRCxBQWtIQyxDQWxINkIseUJBQVcsR0FrSHhDO0FBbEhZLDRCQUFRO0FBcUhyQixJQUFJO0FBQ0o7SUFBQTtRQUNXLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixZQUFPLEdBQVUsRUFBRSxDQUFDO0lBSS9CLENBQUM7SUFBRCxnQkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksOEJBQVM7QUFTdEIsSUFBSTtBQUNKO0lBQUE7SUFBd0IsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBeEIsQUFBeUIsSUFBQTtBQUFaLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQFxyXG5pbXBvcnQgeyBOZXRVdGlscyB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBBQlRlc3QsIEl0ZW1UeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgU3RvcmFnZUJhc2UgfSBmcm9tICcuL1N0b3JhZ2VCYXNlJztcclxuaW1wb3J0IHsgU2VydmVyTm90aWNlRGF0YSB9IGZyb20gJy4vU2VydmVyRGF0YSc7XHJcblxyXG4vL1xyXG5leHBvcnQgY2xhc3MgTWFpbkRhdGEgZXh0ZW5kcyBTdG9yYWdlQmFzZSB7XHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0RBVEFfQ0hBTkdFOiBzdHJpbmcgPSBcIm1haW5fZGF0YV9jaGFuZ2VcIjtcclxuICAgIC8vIEAgcHJpdmF0ZVxyXG4gICAgcHJpdmF0ZSBpc19tdXNpY19tdXRlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpc19lZmZlY3RfbXV0ZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcm9sZV9tYXBfRGF0YTogTWFwRGF0YVZPO1xyXG4gICAgcHVibGljIGlzX2ZpcnN0X3N1cGVyX3JlY3J1aXQ6IGJvb2xlYW47XHJcblxyXG4gICAgLy8gQCBwdWJsaWNcclxuICAgIHB1YmxpYyBTVE9SQUdFX0tFWTogc3RyaW5nO1xyXG4gICAgcHVibGljIHV1aWQ6IHN0cmluZzsgLy8gKHB1YmxpYyBtb2RlIG5vdCB1c2VkKVxyXG4gICAgcHVibGljIG5ld19zdG9yZV90aW1lc3RhbXA6IG51bWJlcjsgLy8gKHB1YmxpYyBtb2RlIG5vdCB1c2VkKVxyXG4gICAgcHVibGljIHN0b3JlX3RpbWVzdGFtcDogbnVtYmVyID0gMDsgLy8gKHB1YmxpYyBtb2RlIG5vdCB1c2VkKVxyXG4gICAgcHVibGljIGlzX3ZpYnJhdGU6IGJvb2xlYW47IC8vIChwdWJsaWMgbW9kZSBub3QgdXNlZClcclxuICAgIHB1YmxpYyBhYl90ZXN0OiBBQlRlc3Q7IC8vIChwdWJsaWMgbW9kZSBub3QgdXNlZClcclxuICAgIHB1YmxpYyBoYXNfd2F0Y2hfc3Rvcnk6IGJvb2xlYW47IC8vIChwdWJsaWMgbW9kZSBub3QgdXNlZClcclxuICAgIHB1YmxpYyBzdG9yeV9yZXdhcmQ6IG51bWJlcjsgLy8gKHB1YmxpYyBtb2RlIG5vdCB1c2VkKVxyXG4gICAgcHVibGljIGxlZnRfc2hhcmVfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc190b2RheV9ub19hZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc19yZWNlaXZlX3Nob3J0Y3V0X3Jld2FyZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBsZWZ0X2ZyZWVfc3VwZXJfcmVjcnVpdF9jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHN1cGVyX3JlY3J1aXRfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZXJ2ZXJfbm90aWNlX2RhdGE6IFNlcnZlck5vdGljZURhdGE7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlNUT1JBR0VfS0VZID0gXCJNYWluRGF0YVwiLCBcclxuICAgICAgICB0aGlzLnV1aWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubmV3X3N0b3JlX3RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5zdG9yZV90aW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5pc19tdXNpY19tdXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19lZmZlY3RfbXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfdmlicmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWJfdGVzdCA9IEFCVGVzdC5BO1xyXG4gICAgICAgIHRoaXMuaGFzX3dhdGNoX3N0b3J5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0b3J5X3Jld2FyZCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZWZ0X3NoYXJlX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmlzX3RvZGF5X25vX2FkID0gZmFsc2U7XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLnJvbGVfbWFwX0RhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNfcmVjZWl2ZV9zaG9ydGN1dF9yZXdhcmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxlZnRfZnJlZV9zdXBlcl9yZWNydWl0X2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmlzX2ZpcnN0X3N1cGVyX3JlY3J1aXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3VwZXJfcmVjcnVpdF9jb3VudCA9IDA7XHJcbiAgICAgICAgLy8gdGhpcy5zZXJ2ZXJfbm90aWNlX2RhdGEgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luYyBhc3luY19yZWFkX2RhdGEoY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfcmVhZF9kYXRhKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmlzX2luaXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlcnZlcl9ub3RpY2VfZGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VydmVyX25vdGljZV9kYXRhID0gbmV3IFNlcnZlck5vdGljZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYubGVmdF9zaGFyZV9jb3VudCA9IHNlbGYubGVmdF9zaGFyZV9jb3VudCA/PyBnbS5jb25zdC5NQVhfVklERU9fRkFJTF9TSEFSRV9DT1VOVDtcclxuICAgICAgICAgICAgICAgIHNlbGYuaXNfdG9kYXlfbm9fYWQgPSBzZWxmLmlzX3RvZGF5X25vX2FkID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc19yZWNlaXZlX3Nob3J0Y3V0X3Jld2FyZCA9IHNlbGYuaXNfcmVjZWl2ZV9zaG9ydGN1dF9yZXdhcmQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxlZnRfZnJlZV9zdXBlcl9yZWNydWl0X2NvdW50ID0gc2VsZi5sZWZ0X2ZyZWVfc3VwZXJfcmVjcnVpdF9jb3VudCA/PyBnbS5jb25zdC5NQVhfRlJFRV9TVVBFUl9SRUNSVUlUX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zdXBlcl9yZWNydWl0X2NvdW50ID0gc2VsZi5zdXBlcl9yZWNydWl0X2NvdW50ID8/IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX2ZpcnN0X3N1cGVyX3JlY3J1aXQgPSBzZWxmLmlzX2ZpcnN0X3N1cGVyX3JlY3J1aXQgPz8gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzZWxmLnNlcnZlcl9ub3RpY2VfZGF0YSwgU2VydmVyTm90aWNlRGF0YS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi51dWlkID0gTmV0VXRpbHMuZ2VuZXJhdGVfdXVpZCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hYl90ZXN0ID0gTWF0aC5mbG9vcihzZWxmLm5ld19zdG9yZV90aW1lc3RhbXAgLyAxMDAwKSAlIDIgPT09IDAgPyBBQlRlc3QuQSA6IEFCVGVzdC5CO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5oYXNfd2F0Y2hfc3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYucm9sZV9tYXBfRGF0YSA9IG5ldyBNYXBEYXRhVk8oKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3RvcnlfcmV3YXJkID0gMDtcclxuICAgICAgICAgICAgICAgIHNlbGYucm9sZV9tYXBfRGF0YS5jb2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yb2xlX21hcF9EYXRhLnJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJvbGVfbWFwX0RhdGEubWFwTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXJ2ZXJfbm90aWNlX2RhdGEgPSBuZXcgU2VydmVyTm90aWNlRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sZWZ0X3NoYXJlX2NvdW50ID0gZ20uY29uc3QuTUFYX1ZJREVPX0ZBSUxfU0hBUkVfQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX3RvZGF5X25vX2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxlZnRfZnJlZV9zdXBlcl9yZWNydWl0X2NvdW50ID0gZ20uY29uc3QuTUFYX0ZSRUVfU1VQRVJfUkVDUlVJVF9DT1VOVDtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3VwZXJfcmVjcnVpdF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzX2ZpcnN0X3N1cGVyX3JlY3J1aXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLm11c2ljX211dGUgPSBzZWxmLmlzX211c2ljX211dGU7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLm11c2ljX3ZvbHVtZSA9IHNlbGYuaXNfbXVzaWNfbXV0ZSA/IDAgOiAxO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5lZmZlY3RfbXV0ZSA9IHNlbGYuaXNfZWZmZWN0X211dGU7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLmVmZmVjdF92b2x1bWUgPSBzZWxmLmlzX2VmZmVjdF9tdXRlID8gMCA6IDE7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IC8vIGVuZDogYXN5bmNfcmVhZF9kYXRhXHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGFzeW5jIGFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoTWFpbkRhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHRoaXMuc3RvcmVfdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmlzX211c2ljX211dGUgPSBnbS5hdWRpby5tdXNpY19tdXRlO1xyXG4gICAgICAgIHRoaXMuaXNfZWZmZWN0X211dGUgPSBnbS5hdWRpby5lZmZlY3RfbXV0ZTtcclxuICAgICAgICBzdXBlci5hc3luY193cml0ZV9kYXRhKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51dWlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLm5ld19zdG9yZV90aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuc3RvcmVfdGltZXN0YW1wID0gMDtcclxuICAgICAgICB0aGlzLmlzX211c2ljX211dGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2VmZmVjdF9tdXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc192aWJyYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hYl90ZXN0ID0gQUJUZXN0LkE7XHJcbiAgICAgICAgdGhpcy5oYXNfd2F0Y2hfc3RvcnkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RvcnlfcmV3YXJkID0gMDtcclxuICAgICAgICB0aGlzLnJvbGVfbWFwX0RhdGEgPSBuZXcgTWFwRGF0YVZPKCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJfbm90aWNlX2RhdGEgPSBuZXcgU2VydmVyTm90aWNlRGF0YSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgTWFwRGF0YVZPIHtcclxuICAgIHB1YmxpYyBjb2w6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgcm93OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIG1hcExpc3Q6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgaXRlbUlEOiBudW1iZXI7IC8vIHR2dCBhZGQ6IHPhu60gZOG7pW5nIHThuqFpIEJ1aWxkSWNvbkl0ZW0udHNcclxuICAgIHB1YmxpYyBpdGVtVHlwZTogSXRlbVR5cGVFbnVtOyAvLyB0dnQgYWRkOiBz4butIGThu6VuZyB04bqhaSBCdWlsZEljb25JdGVtLnRzXHJcbiAgICBwdWJsaWMgY2VsbElEOiBudW1iZXI7IC8vIHR2dCBhZGQ6IHPhu60gZOG7pW5nIHThuqFpIEJ1aWxkSWNvbkl0ZW0udHNcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgTWFwSXRlbVZvIHt9XHJcbiJdfQ==