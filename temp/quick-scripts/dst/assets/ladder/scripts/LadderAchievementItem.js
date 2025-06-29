
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderAchievementItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJBY2hpZXZlbWVudEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQThEO0FBQzlELHVFQUFzRTtBQUN0RSxxRUFBMkQ7QUFHckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MseUNBQVk7SUFDNUM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFHTyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFvQixJQUFJLENBQUM7O0lBTjVDLENBQUM7SUFRRCxzQkFBVyx1Q0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFnQztZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSwyQ0FBVyxHQUFsQjtRQUNJLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQzthQUMzRDtTQUNKO0lBQ0wsQ0FBQztJQUVNLHFDQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFsQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyREFDc0I7SUFHekM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzs4REFDeUI7SUFUMUMscUJBQXFCO1FBRDFCLE9BQU87T0FDRixxQkFBcUIsQ0F5QzFCO0lBQUQsNEJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q21DLDJCQUFZLEdBeUMvQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTGFkZGVyQWNoaWV2ZW1lbnRJdGVtRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGFkZGVyVGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIExhZGRlckFjaGlldmVtZW50SXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGlzdDogTGlzdFZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogTGFkZGVyQWNoaWV2ZW1lbnRJdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBMYWRkZXJBY2hpZXZlbWVudEl0ZW1EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGFkZGVyRGF0YSA9IGdtLmRhdGEubGFkZGVyX2RhdGE7XHJcbiAgICAgICAgdGhpcy5zdGFyX2xibC5zdHJpbmcgPSB0aGlzLl9kYXRhLnN0YXIgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMucmV3YXJkX2xpc3Quc2V0RGF0YSh0aGlzLl9kYXRhLnJld2FyZF9hcnJheSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9kYXRhLnJld2FyZF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmV3YXJkX2xpc3QuZ2V0SXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdCA9IHRoaXMuX2RhdGEuaWQgPCBsYWRkZXJEYXRhLmFjaGlldmVtZW50X2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFyX2xibCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJld2FyZF9saXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkX2xpc3QucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19