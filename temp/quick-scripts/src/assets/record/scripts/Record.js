"use strict";
cc._RF.push(module, 'bd637DpVetLZbwURZnF2k+7', 'Record');
// record/scripts/Record.ts

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
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count_lbl = null;
        _this.close_btn = null;
        _this.record_btn = null;
        _this.share_record_btn = null;
        return _this;
    }
    Record.prototype.onEnable = function () {
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        if (GameManager_1.gm.data.record_data.share_record_count < GameManager_1.gm.data.record_data.reward_array.length) {
            this._reward_data = GameManager_1.gm.data.record_data.reward_array[GameManager_1.gm.data.record_data.share_record_count];
        }
        else {
            this._reward_data = GameManager_1.gm.data.record_data.reward_data;
        }
        if (5 <= GameManager_1.gm.data.record_data.share_record_count) {
            this._reward_data.value = 0;
        }
        this.count_lbl.string = "+" + this._reward_data.value;
        this.record_btn.node.active = 0 == GameManager_1.gm.data.record_data.record_state;
        this.share_record_btn.node.active = 2 == GameManager_1.gm.data.record_data.record_state;
    };
    Record.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        if (1 == GameManager_1.gm.data.record_data.record_type && 2 == GameManager_1.gm.data.record_data.record_state) {
            GameManager_1.gm.data.record_data.record_state = 0;
            GameManager_1.gm.data.record_data.record_timestamp = 0;
            GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            GameManager_1.gm.data.record_data.async_write_data();
        }
    };
    Record.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
        }
        else if (event.target == this.record_btn.node) {
            GameManager_1.gm.channel.record_start();
            GameManager_1.gm.data.record_data.record_state = 1;
            GameManager_1.gm.data.record_data.record_type = 1;
            GameManager_1.gm.data.record_data.record_timestamp = Date.now();
            GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
        }
        else if (event.target == this.share_record_btn.node) {
            GameManager_1.gm.channel.viedo_share(true, function (result) {
                if (_this._reward_data && 0 == result) {
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
                    GameManager_1.gm.data.record_data.share_record_count++;
                    GameManager_1.gm.data.record_data.record_state = 0;
                    GameManager_1.gm.data.record_data.record_timestamp = 0;
                    GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
                    GameManager_1.gm.data.record_data.async_write_data();
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, _this._reward_data.value);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], Record.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "record_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "share_record_btn", void 0);
    Record = __decorate([
        ccclass
    ], Record);
    return Record;
}(GameModule_1.GameModule));

cc._RF.pop();