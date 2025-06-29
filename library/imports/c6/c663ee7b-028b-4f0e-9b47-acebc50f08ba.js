"use strict";
cc._RF.push(module, 'c663e57AotPDptHrOvFDwi6', 'RecordShare');
// record/scripts/RecordShare.ts

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
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordShare = /** @class */ (function (_super) {
    __extends(RecordShare, _super);
    function RecordShare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_spr = null;
        _this.count_lbl = null;
        _this.close_btn = null;
        _this.share_record_btn = null;
        _this._reward_data = null;
        return _this;
    }
    RecordShare.prototype.onEnable = function () {
        this._reward_data = GameManager_1.gm.data.record_data.push_share_reward_data;
        this.count_lbl.string = "+" + this._reward_data.value;
        this.share_record_btn.node.active = GameManager_1.gm.data.record_data.left_push_share_count > 0;
        Utils_1.Utils.async_set_sprite_frame(this.bg_spr, Constants_1.BundleName.RECORD, "res/" + Utils_1.Utils.math_random(true, 1, 5));
    };
    RecordShare.prototype.onDisable = function () {
        GameManager_1.gm.data.record_data.record_state = 0;
        GameManager_1.gm.data.record_data.record_timestamp = 0;
        GameManager_1.gm.data.event_emitter.emit(RecordData_1.RecordData.RECORD_STATE_CHANGE);
        GameManager_1.gm.data.record_data.async_write_data();
    };
    RecordShare.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RecordShare);
        }
        else if (event.target == this.share_record_btn.node) {
            if (0 < GameManager_1.gm.data.record_data.left_push_share_count) {
                GameManager_1.gm.channel.viedo_share(true, function (result) {
                    if (_this._reward_data && 0 == result) {
                        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RecordShare);
                        GameManager_1.gm.data.record_data.left_push_share_count--;
                        GameManager_1.gm.data.record_data.share_record_count++;
                        GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, _this._reward_data.value);
                        GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    }
                });
            }
            else {
                GameManager_1.gm.ui.show_notice("Số lần chia sẻ đã hết, hãy quay lại vào ngày mai!!");
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], RecordShare.prototype, "bg_spr", void 0);
    __decorate([
        property(cc.Label)
    ], RecordShare.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], RecordShare.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], RecordShare.prototype, "share_record_btn", void 0);
    RecordShare = __decorate([
        ccclass
    ], RecordShare);
    return RecordShare;
}(GameModule_1.GameModule));

cc._RF.pop();