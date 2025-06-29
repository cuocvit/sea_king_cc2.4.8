"use strict";
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