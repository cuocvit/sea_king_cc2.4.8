
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FlyNoticeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35577cHayRNu6DynbNBUV7U', 'FlyNoticeItem');
// start-scene/scripts/FlyNoticeItem.ts

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
exports.FlyNoticeItem = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FlyNoticeItem = /** @class */ (function (_super) {
    __extends(FlyNoticeItem, _super);
    function FlyNoticeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item_spr = null;
        _this.value_lbl = null;
        return _this;
    }
    FlyNoticeItem.prototype.set_data = function (key, num) {
        Utils_1.Utils.async_set_sprite_frame(this.item_spr, Constants_1.BundleName.COMMON, "res/item/" + key);
        this.value_lbl.string = (num > 0 ? "+" : "") + Utils_1.Utils.numFormat(num, 2);
        this.node.runAction(cc.sequence(cc.moveTo(1, this.node.x, this.node.y + 60), cc.callFunc(function () {
            GameManager_1.gm.pool.put(this.node);
        })));
    };
    FlyNoticeItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.value_lbl.string = "";
        this.node.stopAllActions();
    };
    __decorate([
        property(cc.Sprite)
    ], FlyNoticeItem.prototype, "item_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FlyNoticeItem.prototype, "value_lbl", void 0);
    FlyNoticeItem = __decorate([
        ccclass
    ], FlyNoticeItem);
    return FlyNoticeItem;
}(NodePoolItem_1.NodePoolItem));
exports.FlyNoticeItem = FlyNoticeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZseU5vdGljZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDOUMsNkNBQW1DO0FBQ25DLGlDQUFnQztBQUNoQyx5Q0FBeUM7QUFFbkMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEIsaUNBQVk7SUFBeEM7UUFBQSxxRUFvQkM7UUFsQlcsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFvQixJQUFJLENBQUM7O0lBZTlDLENBQUM7SUFiVSxnQ0FBUSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxHQUFXO1FBQ3BDLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JGLGdCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVNLDZCQUFLLEdBQVo7UUFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFqQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDc0I7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDdUI7SUFMeEMsYUFBYTtRQURsQixPQUFPO09BQ0YsYUFBYSxDQW9CbEI7SUFBRCxvQkFBQztDQXBCRCxBQW9CQyxDQXBCMkIsMkJBQVksR0FvQnZDO0FBRVEsc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZseU5vdGljZUl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaXRlbV9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdmFsdWVfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzZXRfZGF0YShrZXk6IHN0cmluZywgbnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaXRlbV9zcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9pdGVtL1wiICsga2V5KTtcclxuICAgICAgICB0aGlzLnZhbHVlX2xibC5zdHJpbmcgPSAobnVtID4gMCA/IFwiK1wiIDogXCJcIikgKyBVdGlscy5udW1Gb3JtYXQobnVtLCAyKTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygxLCB0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyA2MCksIGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnVzZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51bnVzZSgpO1xyXG4gICAgICAgIHRoaXMudmFsdWVfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEZseU5vdGljZUl0ZW0gfTsiXX0=