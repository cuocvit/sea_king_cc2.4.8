
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NodePoolItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd0ed7ybOelHw6PsbKMMdwZd', 'NodePoolItem');
// start-scene/scripts/NodePoolItem.ts

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
exports.NodePoolItem = void 0;
// @
var GameObject_1 = require("./GameObject");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
var NodePoolItem = /** @class */ (function (_super) {
    __extends(NodePoolItem, _super);
    function NodePoolItem() {
        var _this = _super.call(this) || this;
        _this.__can_reuse = true;
        _this.is_can_use = true;
        _this.load_url = "";
        return _this;
    }
    // @
    NodePoolItem.prototype.destroy = function () {
        var t = _super.prototype.destroy.call(this);
        if (this.__can_reuse) {
            this.unuse();
        }
        else if (this.node && this.node.isValid) {
            this.node.destroy();
        }
        return t;
    };
    // @
    NodePoolItem.prototype.reuse = function () {
        this.node.position = cc.Vec3.ZERO;
        this.node.scale = 1;
        this.node.angle = 0;
        this.node.opacity = 255;
        this.node.zIndex = 0;
        this.is_can_use = true;
    };
    // @
    NodePoolItem.prototype.unuse = function () {
        this.is_can_use = false;
    };
    NodePoolItem = __decorate([
        ccclass,
        menu('Adding custom components/NodePoolItem'),
        disallowMultiple
    ], NodePoolItem);
    return NodePoolItem;
}(GameObject_1.GameObject));
exports.NodePoolItem = NodePoolItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5vZGVQb29sSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSTtBQUNKLDJDQUEwQztBQUdwQyxJQUFBLEtBQXNDLEVBQUUsQ0FBQyxVQUFVLEVBQWpELE9BQU8sYUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUsxRDtJQUFrQyxnQ0FBVTtJQU14QztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQVBNLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVEsR0FBVyxFQUFFLENBQUM7O0lBSzdCLENBQUM7SUFFRCxJQUFJO0lBQ0csOEJBQU8sR0FBZDtRQUNJLElBQU0sQ0FBQyxHQUFHLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7SUFDRyw0QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJO0lBQ0csNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFsQ1EsWUFBWTtRQUh4QixPQUFPO1FBQ1AsSUFBSSxDQUFDLHVDQUF1QyxDQUFDO1FBQzdDLGdCQUFnQjtPQUNKLFlBQVksQ0FtQ3hCO0lBQUQsbUJBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQ2lDLHVCQUFVLEdBbUMzQztBQW5DWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gXCIuL0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBtZW51LCBkaXNhbGxvd011bHRpcGxlIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoJ0FkZGluZyBjdXN0b20gY29tcG9uZW50cy9Ob2RlUG9vbEl0ZW0nKVxyXG5AZGlzYWxsb3dNdWx0aXBsZVxyXG5leHBvcnQgY2xhc3MgTm9kZVBvb2xJdGVtIGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgX19jYW5fcmV1c2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGlzX2Nhbl91c2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGxvYWRfdXJsOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGJ1bmRsZV9uYW1lOiBCdW5kbGVOYW1lOyAvLyB0dnQgYuG7lSBzdW5nXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICBjb25zdCB0ID0gc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9fY2FuX3JldXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW51c2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmV1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzX2Nhbl91c2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB1bnVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzX2Nhbl91c2UgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=