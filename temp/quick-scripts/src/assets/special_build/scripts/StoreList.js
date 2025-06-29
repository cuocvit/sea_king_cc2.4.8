"use strict";
cc._RF.push(module, 'd6c0fIvtkFKYI1pYy2in446', 'StoreList');
// special_build/scripts/StoreList.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var Timer_1 = require("../../start-scene/scripts/Timer");
var Utils_1 = require("../../start-scene/scripts/Utils");
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreList = /** @class */ (function (_super) {
    __extends(StoreList, _super);
    function StoreList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_panle = null;
        _this.store_list = null;
        _this.daily_list = null;
        _this.video_list = null;
        _this.diamond_list = null;
        _this.btn_close = null;
        _this.btn_refresh = null;
        _this.ref_time_lbl = null;
        _this.btn_close_bg = null;
        _this._time = null;
        return _this;
    }
    StoreList.prototype.onLoad = function () { };
    StoreList.prototype.onEnable = function () {
        if (GameManager_1.gm.data.store_data.refresh_time <= Date.now() / 1000 || GameManager_1.gm.data.store_data.daily_store_array.length > 4) {
            GameManager_1.gm.data.store_data.refresh_store();
        }
        GameManager_1.gm.data.event_emitter.on(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this.on_record_state_change_handler();
        this.showStoreList();
        this.showStoreDailyList();
        this.showVideoDailyList();
        this.showDiamondDailyList();
    };
    StoreList.prototype.onDisable = function () {
        this.store_list.reset();
        this.daily_list.reset();
        this.video_list.reset();
        this.diamond_list.reset();
        GameManager_1.gm.data.event_emitter.off(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this._time && this._time.stop();
    };
    StoreList.prototype.on_record_state_change_handler = function () {
        var _this = this;
        if (!this._time) {
            this._time = new Timer_1.Timer();
        }
        if (!this._time.is_running) {
            this._time.start(function () {
                var time = Math.floor(GameManager_1.gm.data.store_data.refresh_time - Date.now() / 1000);
                _this.ref_time_lbl.string = "Thời gian làm mới: " + Utils_1.Utils.time_format(time, "mm:ss");
                if (time <= 0) {
                    GameManager_1.gm.data.store_data.refresh_store();
                    _this.showStoreDailyList();
                    _this.showStoreList();
                }
            }, 1000, 0);
        }
    };
    StoreList.prototype.showStoreList = function () {
        this.store_list.setData(GameManager_1.gm.data.store_data.store_array);
    };
    StoreList.prototype.showStoreDailyList = function () {
        this.daily_list.setData(GameManager_1.gm.data.store_data.daily_store_array);
    };
    StoreList.prototype.showVideoDailyList = function () {
        this.video_list.setData(GameManager_1.gm.data.store_data.video_store_array);
    };
    StoreList.prototype.showDiamondDailyList = function () {
        this.diamond_list.setData(GameManager_1.gm.data.store_data.diamond_store_array);
    };
    StoreList.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.btn_close.node || event.target === this.btn_close_bg.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Store);
        }
        else if (event.target === this.btn_refresh.node) {
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < 5) {
                GameManager_1.gm.ui.show_notice("Không đủ kim cương");
            }
            else {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, 5);
                GameManager_1.gm.data.store_data.refresh_store();
                this.showStoreDailyList();
                this.showStoreList();
                this.showDiamondDailyList();
                this.showVideoDailyList();
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], StoreList.prototype, "show_panle", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "store_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "daily_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "video_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "diamond_list", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_close", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_refresh", void 0);
    __decorate([
        property(cc.Label)
    ], StoreList.prototype, "ref_time_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_close_bg", void 0);
    StoreList = __decorate([
        ccclass
    ], StoreList);
    return StoreList;
}(GameModule_1.GameModule));

cc._RF.pop();