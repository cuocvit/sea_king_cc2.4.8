
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightNumItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe784RPy79FmYP2QopWyuCk', 'FightNumItem');
// fight/scripts/FightNumItem.ts

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
exports.FightNumItem = void 0;
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightNumItem = /** @class */ (function (_super) {
    __extends(FightNumItem, _super);
    function FightNumItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text_lbl = null;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(FightNumItem.prototype, "data", {
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
    FightNumItem.prototype.onEnable = function () {
        if (this._data) {
            cc.tween(this.node)
                .hide()
                .delay(this._data.delay)
                .show()
                .to(0.5, {
                position: cc.v3(this.node.position.x, this.node.position.y + 60),
                opacity: 255
            })
                .removeSelf()
                .start();
        }
    };
    FightNumItem.prototype.update_view = function () {
        if (this._data) {
            var displayText = this._data.num.toString();
            switch (this._data.id) {
                case 0:
                    displayText = "" + this._data.num;
                    break;
                case 1:
                    displayText = "\u66B4\u51FB " + this._data.num;
                    break;
                case 2:
                    displayText = "+" + this._data.num;
                    break;
                default:
                    console.error("NumItem不存在数字类型");
            }
            this.text_lbl.node.color = NUM_COLOR_ARRAY[this._data.id];
            this.text_lbl.string = displayText;
        }
    };
    FightNumItem.prototype.reset = function () {
        this._data = null;
        if (this.text_lbl) {
            this.text_lbl.string = "";
        }
        cc.tween(this.node).stop();
    };
    FightNumItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    __decorate([
        property(cc.Label)
    ], FightNumItem.prototype, "text_lbl", void 0);
    FightNumItem = __decorate([
        ccclass
    ], FightNumItem);
    return FightNumItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightNumItem = FightNumItem;
var NUM_COLOR_ARRAY = [
    GameManager_1.gm.const.COLOR_RED,
    GameManager_1.gm.const.COLOR_RED,
    cc.Color.GREEN,
    GameManager_1.gm.const.COLOR_YELLOW
];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0TnVtSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELHVFQUFzRTtBQUVoRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQVM1QztJQUEyQixnQ0FBWTtJQUF2QztRQUFBLHFFQStEQztRQTdEQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUV6QixXQUFLLEdBQTRCLElBQUksQ0FBQzs7SUEyRGhELENBQUM7SUF6REMsc0JBQVcsOEJBQUk7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBZ0IsS0FBOEI7WUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUxBO0lBT1MsK0JBQVEsR0FBbEI7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2hCLElBQUksRUFBRTtpQkFDTixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3ZCLElBQUksRUFBRTtpQkFDTixFQUFFLENBQUMsR0FBRyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoRSxPQUFPLEVBQUUsR0FBRzthQUNiLENBQUM7aUJBQ0QsVUFBVSxFQUFFO2lCQUNaLEtBQUssRUFBRSxDQUFDO1NBQ1o7SUFDSCxDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwRCxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUNyQixLQUFLLENBQUM7b0JBQ0osV0FBVyxHQUFHLEtBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUM7b0JBQ2xDLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLFdBQVcsR0FBRyxrQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUssQ0FBQztvQkFDckMsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0osV0FBVyxHQUFHLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFTyw0QkFBSyxHQUFiO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSw0QkFBSyxHQUFaO1FBQ0UsaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBNUREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ2M7SUFGN0IsWUFBWTtRQURqQixPQUFPO09BQ0YsWUFBWSxDQStEakI7SUFBRCxtQkFBQztDQS9ERCxBQStEQyxDQS9EMEIsMkJBQVksR0ErRHRDO0FBU1Esb0NBQVk7QUFQckIsSUFBTSxlQUFlLEdBQWU7SUFDbEMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUztJQUNsQixnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTO0lBQ2xCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSztJQUNkLGdCQUFFLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDdEIsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTm9kZVBvb2xJdGVtJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5pbnRlcmZhY2UgRmlnaHROdW1JdGVtRGF0YSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBudW06IG51bWJlcjtcclxuICBkZWxheTogbnVtYmVyO1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBGaWdodE51bUl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICB0ZXh0X2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfZGF0YTogRmlnaHROdW1JdGVtRGF0YSB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGEoKTogRmlnaHROdW1JdGVtRGF0YSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEZpZ2h0TnVtSXRlbURhdGEgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZGF0YSkge1xyXG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXHJcbiAgICAgICAgLmhpZGUoKVxyXG4gICAgICAgIC5kZWxheSh0aGlzLl9kYXRhLmRlbGF5KVxyXG4gICAgICAgIC5zaG93KClcclxuICAgICAgICAudG8oMC41LCB7XHJcbiAgICAgICAgICBwb3NpdGlvbjogY2MudjModGhpcy5ub2RlLnBvc2l0aW9uLngsIHRoaXMubm9kZS5wb3NpdGlvbi55ICsgNjApLFxyXG4gICAgICAgICAgb3BhY2l0eTogMjU1XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVtb3ZlU2VsZigpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2RhdGEpIHtcclxuICAgICAgbGV0IGRpc3BsYXlUZXh0OiBzdHJpbmcgPSB0aGlzLl9kYXRhLm51bS50b1N0cmluZygpO1xyXG4gICAgICBzd2l0Y2ggKHRoaXMuX2RhdGEuaWQpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IGAke3RoaXMuX2RhdGEubnVtfWA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICBkaXNwbGF5VGV4dCA9IGDmmrTlh7sgJHt0aGlzLl9kYXRhLm51bX1gO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgZGlzcGxheVRleHQgPSBgKyR7dGhpcy5fZGF0YS5udW19YDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTnVtSXRlbeS4jeWtmOWcqOaVsOWtl+exu+Wei1wiKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnRleHRfbGJsLm5vZGUuY29sb3IgPSBOVU1fQ09MT1JfQVJSQVlbdGhpcy5fZGF0YS5pZF07XHJcbiAgICAgIHRoaXMudGV4dF9sYmwuc3RyaW5nID0gZGlzcGxheVRleHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcbiAgICBpZiAodGhpcy50ZXh0X2xibCkge1xyXG4gICAgICB0aGlzLnRleHRfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnN0b3AoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1bnVzZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnVudXNlKCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBOVU1fQ09MT1JfQVJSQVk6IGNjLkNvbG9yW10gPSBbXHJcbiAgZ20uY29uc3QuQ09MT1JfUkVELFxyXG4gIGdtLmNvbnN0LkNPTE9SX1JFRCxcclxuICBjYy5Db2xvci5HUkVFTixcclxuICBnbS5jb25zdC5DT0xPUl9ZRUxMT1dcclxuXTtcclxuXHJcbmV4cG9ydCB7IEZpZ2h0TnVtSXRlbSwgRmlnaHROdW1JdGVtRGF0YSB9OyJdfQ==