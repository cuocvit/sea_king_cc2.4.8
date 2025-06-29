"use strict";
cc._RF.push(module, '3b3dcZ3sEVBmJWkxPUAN06i', 'LadderAchievementItem');
// ladder/scripts/LadderAchievementItem.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderAchievementItem = /** @class */ (function (_super) {
    __extends(LadderAchievementItem, _super);
    function LadderAchievementItem() {
        var _this = _super.call(this) || this;
        _this.star_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    Object.defineProperty(LadderAchievementItem.prototype, "data", {
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
    LadderAchievementItem.prototype.update_view = function () {
        var ladderData = GameManager_1.gm.data.ladder_data;
        this.star_lbl.string = this._data.star + "";
        this.reward_list.setData(this._data.reward_array);
        for (var index = 0; index < this._data.reward_array.length; index++) {
            var item = this.reward_list.getItem(index);
            if (item) {
                item.select = this._data.id < ladderData.achievement_id;
            }
        }
    };
    LadderAchievementItem.prototype.reset = function () {
        if (this.star_lbl) {
            this.star_lbl.string = "";
        }
        if (this.reward_list) {
            this.reward_list.reset();
        }
    };
    __decorate([
        property(cc.Label)
    ], LadderAchievementItem.prototype, "star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], LadderAchievementItem.prototype, "reward_list", void 0);
    LadderAchievementItem = __decorate([
        ccclass
    ], LadderAchievementItem);
    return LadderAchievementItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();