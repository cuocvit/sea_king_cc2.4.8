
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightPropItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf144i/RJlCFYD/H6eHO1bp', 'FightPropItem');
// fight/scripts/FightPropItem.ts

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
exports.FightPropItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightPropItem = /** @class */ (function (_super) {
    __extends(FightPropItem, _super);
    function FightPropItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(FightPropItem.prototype, "data", {
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
    FightPropItem.prototype.update_view = function () {
        var _this = this;
        var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", this._data.id.toString());
        if (itemData) {
            if (itemData.anim_name == "") {
                Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.MAP, "res/" + this._data.id);
                GameManager_1.gm.pool.put_children(this.prop_spr.node);
            }
            else {
                this.prop_spr.spriteFrame = null;
                GameManager_1.gm.pool.put_children(this.prop_spr.node);
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item/" + itemData.anim_name, NodePoolItem_1.NodePoolItem, function (item) {
                    if (_this.prop_spr.node.childrenCount == 0) {
                        _this.prop_spr.node.addChild(item.node);
                        var animation = item.getComponent(cc.Animation);
                        if (animation)
                            animation.play();
                    }
                });
            }
            if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                this.num_lbl.node.active = true;
                this.num_lbl.string = this._data.num.toString();
            }
            else {
                this.num_lbl.node.active = false;
            }
        }
    };
    FightPropItem.prototype.reset = function () {
        if (this.prop_spr)
            this.prop_spr.spriteFrame = null;
        if (this.num_lbl)
            this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightPropItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightPropItem.prototype, "num_lbl", void 0);
    FightPropItem = __decorate([
        ccclass
    ], FightPropItem);
    return FightPropItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightPropItem = FightPropItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UHJvcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQscUVBQTJEO0FBQzNELGlFQUFpRTtBQUkzRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QixpQ0FBWTtJQUF4QztRQUFBLHFFQWdEQztRQTlDUyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxhQUFPLEdBQW9CLElBQUksQ0FBQzs7SUEyQzFDLENBQUM7SUF2Q0Msc0JBQVcsK0JBQUk7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBZ0IsS0FBd0I7WUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUxBO0lBT08sbUNBQVcsR0FBbkI7UUFBQSxpQkF3QkM7UUF2QkMsSUFBTSxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFlLENBQUM7UUFDbEcsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFO2dCQUM1QixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxzQkFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEYsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFVLENBQUMsR0FBRyxFQUFFLGVBQWUsR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLDJCQUFZLEVBQUUsVUFBQyxJQUFJO29CQUN6RixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7d0JBQ3pDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3ZDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLFNBQVM7NEJBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNqQztnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ2xDO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMsT0FBTztZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBN0NEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ3FCO0lBTHBDLGFBQWE7UUFEbEIsT0FBTztPQUNGLGFBQWEsQ0FnRGxCO0lBQUQsb0JBQUM7Q0FoREQsQUFnREMsQ0FoRDJCLDJCQUFZLEdBZ0R2QztBQUVRLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBJdGVtQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0UHJvcEl0ZW1EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodFRlbXBEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBGaWdodFByb3BJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gIHByaXZhdGUgcHJvcF9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgcHJpdmF0ZSBudW1fbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIF9kYXRhOiBGaWdodFByb3BJdGVtRGF0YTtcclxuXHJcbiAgcHVibGljIGdldCBkYXRhKCk6IEZpZ2h0UHJvcEl0ZW1EYXRhIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBGaWdodFByb3BJdGVtRGF0YSkge1xyXG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIHRoaXMuX2RhdGEuaWQudG9TdHJpbmcoKSkgYXMgSXRlbUNvbmZpZztcclxuICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICBpZiAoaXRlbURhdGEuYW5pbV9uYW1lID09IFwiXCIpIHtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucHJvcF9zcHIsIEJ1bmRsZU5hbWUuTUFQLCBcInJlcy9cIiArIHRoaXMuX2RhdGEuaWQpO1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMucHJvcF9zcHIubm9kZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wcm9wX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5wcm9wX3Nwci5ub2RlKTtcclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLk1BUCwgXCJwcmVmYWJzL2l0ZW0vXCIgKyBpdGVtRGF0YS5hbmltX25hbWUsIE5vZGVQb29sSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnByb3Bfc3ByLm5vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9zcHIubm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSBpdGVtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSBhbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgIHRoaXMubnVtX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5udW1fbGJsLnN0cmluZyA9IHRoaXMuX2RhdGEubnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5udW1fbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnByb3Bfc3ByKSB0aGlzLnByb3Bfc3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIGlmICh0aGlzLm51bV9sYmwpIHRoaXMubnVtX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRmlnaHRQcm9wSXRlbSB9OyJdfQ==