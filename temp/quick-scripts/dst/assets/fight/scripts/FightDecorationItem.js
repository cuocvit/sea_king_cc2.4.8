
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightDecorationItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e22bei3BkNGEpb/zI8wlqkG', 'FightDecorationItem');
// fight/scripts/FightDecorationItem.ts

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
exports.FightDecorationItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightDecorationItem = /** @class */ (function (_super) {
    __extends(FightDecorationItem, _super);
    function FightDecorationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.decoration_node = null;
        _this.decoration_spr = null;
        return _this;
    }
    Object.defineProperty(FightDecorationItem.prototype, "data", {
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
    FightDecorationItem.prototype.update_view = function () {
        var _this = this;
        if (this._data) {
            this.decoration_node.x = this._data.plant_x_offset;
            this.decoration_node.y = this._data.plant_y_offset - 48;
            var decorationConfig = GameManager_1.gm.config.get_row_data("DecorateConfigData", this._data.decoration_id + "");
            if (decorationConfig) {
                if (decorationConfig.animID !== "") {
                    if (this.decoration_node.childrenCount == 0) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, decorationConfig.animID, NodePoolItem_1.NodePoolItem, function (nodeItem) {
                            if (_this.decoration_node.childrenCount == 0) {
                                _this.decoration_node.addChild(nodeItem.node);
                            }
                        });
                    }
                }
                else {
                    Utils_1.Utils.async_set_sprite_frame(this.decoration_spr, Constants_1.BundleName.TEST, "res/" + decorationConfig.imgID);
                }
            }
        }
    };
    FightDecorationItem.prototype.reset = function () {
        this.decoration_spr.spriteFrame = null;
        GameManager_1.gm.pool.put_children(this.decoration_node);
    };
    FightDecorationItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    __decorate([
        property(cc.Node)
    ], FightDecorationItem.prototype, "decoration_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightDecorationItem.prototype, "decoration_spr", void 0);
    FightDecorationItem = __decorate([
        ccclass
    ], FightDecorationItem);
    return FightDecorationItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightDecorationItem = FightDecorationItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0RGVjb3JhdGlvbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSxxRUFBMkQ7QUFDM0QsaUVBQWlFO0FBQ2pFLHlEQUF3RDtBQUlsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyx1Q0FBWTtJQUE5QztRQUFBLHFFQWdEQztRQTlDUyxxQkFBZSxHQUFtQixJQUFJLENBQUM7UUFHdkMsb0JBQWMsR0FBcUIsSUFBSSxDQUFDOztJQTJDbEQsQ0FBQztJQXZDQyxzQkFBVyxxQ0FBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7YUFFRCxVQUFnQixLQUE4QjtZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BTEE7SUFPTSx5Q0FBVyxHQUFsQjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDeEQsSUFBTSxnQkFBZ0IsR0FBRyxnQkFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFtQixDQUFDO1lBQ3ZILElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7d0JBQzNDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsMkJBQVksRUFBRSxVQUFDLFFBQVE7NEJBQ2hGLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO2dDQUMzQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQzlDO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO3FCQUFNO29CQUNMLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHNCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckc7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVNLG1DQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sbUNBQUssR0FBWjtRQUNFLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQTdDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dFQUM2QjtJQUcvQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytEQUM0QjtJQUw1QyxtQkFBbUI7UUFEeEIsT0FBTztPQUNGLG1CQUFtQixDQWdEeEI7SUFBRCwwQkFBQztDQWhERCxBQWdEQyxDQWhEaUMsMkJBQVksR0FnRDdDO0FBRVEsa0RBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBEZWNvcmF0ZUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2RlY29yYXRlJztcclxuaW1wb3J0IHsgRmlnaHREZWNvcmF0aW9uSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0RGVjb3JhdGlvbkl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHByaXZhdGUgZGVjb3JhdGlvbl9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgcHJpdmF0ZSBkZWNvcmF0aW9uX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgX2RhdGE6IEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhO1xyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGEoKTogRmlnaHREZWNvcmF0aW9uSXRlbURhdGEge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZGF0YSkge1xyXG4gICAgICB0aGlzLmRlY29yYXRpb25fbm9kZS54ID0gdGhpcy5fZGF0YS5wbGFudF94X29mZnNldDtcclxuICAgICAgdGhpcy5kZWNvcmF0aW9uX25vZGUueSA9IHRoaXMuX2RhdGEucGxhbnRfeV9vZmZzZXQgLSA0ODtcclxuICAgICAgY29uc3QgZGVjb3JhdGlvbkNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJEZWNvcmF0ZUNvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5kZWNvcmF0aW9uX2lkICsgXCJcIikgYXMgRGVjb3JhdGVDb25maWc7XHJcbiAgICAgIGlmIChkZWNvcmF0aW9uQ29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGRlY29yYXRpb25Db25maWcuYW5pbUlEICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kZWNvcmF0aW9uX25vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuTUFQLCBkZWNvcmF0aW9uQ29uZmlnLmFuaW1JRCwgTm9kZVBvb2xJdGVtLCAobm9kZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5kZWNvcmF0aW9uX25vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRpb25fbm9kZS5hZGRDaGlsZChub2RlSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuZGVjb3JhdGlvbl9zcHIsIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvXCIgKyBkZWNvcmF0aW9uQ29uZmlnLmltZ0lEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVjb3JhdGlvbl9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5kZWNvcmF0aW9uX25vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVudXNlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudW51c2UoKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEZpZ2h0RGVjb3JhdGlvbkl0ZW0gfTsiXX0=