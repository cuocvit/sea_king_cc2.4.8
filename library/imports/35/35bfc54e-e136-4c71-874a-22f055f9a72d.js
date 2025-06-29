"use strict";
cc._RF.push(module, '35bfcVO4TZMcYdKIvBV+act', 'LadderRankItem');
// ladder/scripts/LadderRankItem.ts

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
exports.LadderRankItem = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderRankItem = /** @class */ (function (_super) {
    __extends(LadderRankItem, _super);
    function LadderRankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rank_spr = null;
        _this.lv_spr = null;
        _this.name_lbl = null;
        _this.rank_lbl = null;
        _this.star_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    Object.defineProperty(LadderRankItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    LadderRankItem.prototype.update_view = function () {
        if (this._data.rank <= 0) {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = "200+";
            this.rank_spr.node.active = false;
        }
        else if (0 < this._data.rank && this._data.rank < 4) {
            this.rank_lbl.node.active = false;
            this.rank_spr.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.rank_spr, Constants_1.BundleName.LADDER, "res/rank_" + this._data.rank);
        }
        else {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank + "";
            this.rank_spr.node.active = false;
        }
        this.star_lbl.string = this._data.star + "";
        this.name_lbl.string = this._data.name + ("0" == this._data.uid ? "." : "");
        if (0 < this._data.rank) {
            var number = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(this._data.rank);
            var rowData = GameManager_1.gm.config.get_row_data("LadderRewardConfigData", number + "");
            if (rowData) {
                Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.LADDER, "res/" + rowData.iconId);
                this.reward_list.setData(rowData.reward_array);
            }
        }
        else {
            this.reward_list.reset();
        }
    };
    LadderRankItem.prototype.reset = function () {
        this.rank_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.name_lbl.string = "";
        this.reward_list.reset();
    };
    __decorate([
        property(cc.Sprite)
    ], LadderRankItem.prototype, "rank_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderRankItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "rank_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], LadderRankItem.prototype, "reward_list", void 0);
    LadderRankItem = __decorate([
        ccclass
    ], LadderRankItem);
    return LadderRankItem;
}(ListViewItem_1.ListViewItem));
exports.LadderRankItem = LadderRankItem;

cc._RF.pop();