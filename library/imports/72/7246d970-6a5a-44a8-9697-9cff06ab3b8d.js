"use strict";
cc._RF.push(module, '7246dlwalpEqJaXnP8GqzuN', 'LadderRankRewardItem');
// ladder/scripts/LadderRankRewardItem.ts

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
var ListView_1 = require("../../start-scene/scripts/ListView");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderRankRewardItem = /** @class */ (function (_super) {
    __extends(LadderRankRewardItem, _super);
    function LadderRankRewardItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rank_spr = null;
        _this.rank_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    Object.defineProperty(LadderRankRewardItem.prototype, "data", {
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
    LadderRankRewardItem.prototype.update_view = function () {
        GameManager_1.gm.data.ladder_data;
        if (this._data.rank_a == this._data.rank_b && 1 == this._data.rank_a) {
            this.rank_spr.node.active = true;
            this.rank_lbl.node.active = false;
            c.Utils.async_set_sprite_frame(this.rank_spr, Constants_1.BundleName.LADDER, "res/rank_" + this._data.rank_a);
        }
        else {
            this.rank_spr.node.active = false;
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank_a + "-" + this._data.rank_b;
        }
        this.reward_list.setData(this._data.reward_array);
        for (var index = 0; index < this._data.reward_array.length; index++) {
            var item = this.reward_list.getItem(index);
            if (item) {
                item.select = false;
            }
        }
    };
    LadderRankRewardItem.prototype.reset = function () {
        this.reward_list.reset();
    };
    __decorate([
        property(cc.Sprite)
    ], LadderRankRewardItem.prototype, "rank_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankRewardItem.prototype, "rank_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], LadderRankRewardItem.prototype, "reward_list", void 0);
    LadderRankRewardItem = __decorate([
        ccclass
    ], LadderRankRewardItem);
    return LadderRankRewardItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();