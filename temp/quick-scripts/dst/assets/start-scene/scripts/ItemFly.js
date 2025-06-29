
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ItemFly.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '518a4z7ax9EdaFD8zexddDI', 'ItemFly');
// start-scene/scripts/ItemFly.ts

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
exports.ItemFly = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemFly = /** @class */ (function (_super) {
    __extends(ItemFly, _super);
    function ItemFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._start_pos = new cc.Vec3(0, 0);
        _this._target_pos = new cc.Vec3(-300, 500);
        return _this;
    }
    ItemFly.prototype.onEnable = function () {
        this.node.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 4;
        this.do_node_anim();
    };
    ItemFly.prototype.init_fly_anim = function (itemId, startPos, targetPos) {
        var _this = this;
        if (targetPos === void 0) { targetPos = null; }
        var itemType = 3e4 < itemId ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(itemId);
            if (heroConfig) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroConfig.heroid, NodePoolItem_1.NodePoolItem, function (t) {
                    console.log("hero node", _this.node.childrenCount);
                    if (0 == _this.node.childrenCount) {
                        _this.node.addChild(t.node);
                        t.node.x = 0;
                        t.node.y = -15;
                        if (t.getComponent(sp.Skeleton)) {
                            t.getComponent(sp.Skeleton).setSkin("front");
                            t.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                        }
                    }
                    else {
                        GameManager_1.gm.pool.put(t.node);
                    }
                });
            }
        }
        else if (!(itemType != Constants_1.ItemTypeEnum.ITEM_TYPE)) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemId);
            if (itemConfig) {
                Utils_1.Utils.async_set_sprite_frame(this.node.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemConfig.icon);
            }
        }
        this._start_pos = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(startPos);
        this._target_pos = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(targetPos);
    };
    ItemFly.prototype.do_node_anim = function () {
        var _this = this;
        this.node.active = true;
        this.node.setPosition(cc.v2(this._start_pos.x, this._start_pos.y));
        this.node.scale = GameManager_1.gm.ui.mapMainUI.mapContent.scale;
        var moveAction = cc.moveTo(.3, this._target_pos.x, this._target_pos.y);
        this.node.runAction(cc.sequence(moveAction, cc.callFunc(function () {
            GameManager_1.gm.pool.put_children(_this.node);
            GameManager_1.gm.pool.put(_this.node);
        })));
    };
    ItemFly = __decorate([
        ccclass
    ], ItemFly);
    return ItemFly;
}(NodePoolItem_1.NodePoolItem));
exports.ItemFly = ItemFly;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEl0ZW1GbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDOUMseUNBQXVEO0FBQ3ZELDZDQUFtQztBQUNuQyxpQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkIsMkJBQVk7SUFBekM7UUFBQSxxRUFtREM7UUFsRFcsZ0JBQVUsR0FBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLGlCQUFXLEdBQVksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQWlEMUQsQ0FBQztJQS9DYSwwQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSwrQkFBYSxHQUFwQixVQUFxQixNQUFjLEVBQUUsUUFBaUIsRUFBRSxTQUFnQztRQUF4RixpQkE2QkM7UUE3QnVELDBCQUFBLEVBQUEsZ0JBQWdDO1FBQ3BGLElBQU0sUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQztRQUNoRixJQUFJLFFBQVEsSUFBSSx3QkFBWSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxJQUFNLFVBQVUsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdELElB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QUFDLENBQUM7WUFDaEMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDUixDQUFDO0lBbERRLE9BQU87UUFEbkIsT0FBTztPQUNLLE9BQU8sQ0FtRG5CO0lBQUQsY0FBQztDQW5ERCxBQW1EQyxDQW5ENEIsMkJBQVksR0FtRHhDO0FBbkRZLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgSXRlbVR5cGVFbnVtLCBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBJdGVtRmx5IGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIHByaXZhdGUgX3N0YXJ0X3BvczogY2MuVmVjMyA9IG5ldyBjYy5WZWMzKDAsIDApO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0X3BvczogY2MuVmVjMyA9IG5ldyBjYy5WZWMzKC0zMDAsIDUwMCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBnbS5jb25zdC5NQVhfQ0VMTF9OVU0gKyA0O1xyXG4gICAgICAgIHRoaXMuZG9fbm9kZV9hbmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRfZmx5X2FuaW0oaXRlbUlkOiBudW1iZXIsIHN0YXJ0UG9zOiBjYy5WZWMzLCB0YXJnZXRQb3M6IGNjLlZlYzMgfCBudWxsID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1UeXBlID0gM2U0IDwgaXRlbUlkID8gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSA6IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEU7XHJcbiAgICAgICAgaWYgKGl0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaXRlbUlkKVxyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIGhlcm9Db25maWcuaGVyb2lkLCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJvIG5vZGVcIiwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Lm5vZGUueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubm9kZS55ID0gLTE1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihcImZyb250XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcInN0YXlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghKGl0ZW1UeXBlICE9IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGl0ZW1JZClcclxuICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyBpdGVtQ29uZmlnLmljb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdGFydF9wb3MgPSBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydFBvcyk7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0X3BvcyA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcylcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvX25vZGVfYW5pbSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjIodGhpcy5fc3RhcnRfcG9zLngsIHRoaXMuX3N0YXJ0X3Bvcy55KSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuc2NhbGU7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vdmVBY3Rpb24gPSBjYy5tb3ZlVG8oLjMsIHRoaXMuX3RhcmdldF9wb3MueCwgdGhpcy5fdGFyZ2V0X3Bvcy55KTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKG1vdmVBY3Rpb24sIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICB9KSkpXHJcbiAgICB9XHJcbn0iXX0=