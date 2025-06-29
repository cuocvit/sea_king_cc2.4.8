
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderRankRewardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJSYW5rUmV3YXJkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBOEQ7QUFDOUQsdUVBQXNFO0FBQ3RFLGlFQUFpRTtBQUNqRSxxRUFBMkQ7QUFHckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBbUMsd0NBQVk7SUFBL0M7UUFBQSxxRUEyQ0M7UUF6Q1csY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsaUJBQVcsR0FBb0IsSUFBSSxDQUFDOztJQW1DaEQsQ0FBQztJQWpDRyxzQkFBVyxzQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUErQjtZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSwwQ0FBVyxHQUFsQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JHO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO0lBRU0sb0NBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQXhDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDOzZEQUN5QjtJQVIxQyxvQkFBb0I7UUFEekIsT0FBTztPQUNGLG9CQUFvQixDQTJDekI7SUFBRCwyQkFBQztDQTNDRCxBQTJDQyxDQTNDa0MsMkJBQVksR0EyQzlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3JztcclxuaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlld0l0ZW0nO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBMYWRkZXJSYW5rUmV3YXJkSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xhZGRlclRlbXBEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBMYWRkZXJSYW5rUmV3YXJkSXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSByYW5rX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByYW5rX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIHJld2FyZF9saXN0OiBMaXN0VmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBMYWRkZXJSYW5rUmV3YXJkSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogTGFkZGVyUmFua1Jld2FyZEl0ZW1EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5sYWRkZXJfZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YS5yYW5rX2EgPT0gdGhpcy5fZGF0YS5yYW5rX2IgJiYgMSA9PSB0aGlzLl9kYXRhLnJhbmtfYSkge1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfc3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjLlV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5yYW5rX3NwciwgQnVuZGxlTmFtZS5MQURERVIsIFwicmVzL3JhbmtfXCIgKyB0aGlzLl9kYXRhLnJhbmtfYSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX3Nwci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfbGJsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5zdHJpbmcgPSB0aGlzLl9kYXRhLnJhbmtfYSArIFwiLVwiICsgdGhpcy5fZGF0YS5yYW5rX2I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmV3YXJkX2xpc3Quc2V0RGF0YSh0aGlzLl9kYXRhLnJld2FyZF9hcnJheSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9kYXRhLnJld2FyZF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmV3YXJkX2xpc3QuZ2V0SXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJld2FyZF9saXN0LnJlc2V0KCk7XHJcbiAgICB9XHJcbn0iXX0=