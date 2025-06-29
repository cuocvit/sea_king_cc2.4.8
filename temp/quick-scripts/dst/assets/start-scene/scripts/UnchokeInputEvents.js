
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/UnchokeInputEvents.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cb3d3UAV/tJwIjweqksqOwF', 'UnchokeInputEvents');
// start-scene/scripts/UnchokeInputEvents.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var UnchokeInputEvents = /** @class */ (function (_super) {
    __extends(UnchokeInputEvents, _super);
    function UnchokeInputEvents() {
        var _this = _super.call(this) || this;
        _this._isSwallow = false;
        return _this;
    }
    UnchokeInputEvents.prototype.onEnable = function () {
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(this._isSwallow);
        }
    };
    UnchokeInputEvents = __decorate([
        ccclass,
        menu("添加自定义组件/UnchokeInputEvents")
    ], UnchokeInputEvents);
    return UnchokeInputEvents;
}(cc.Component));
exports.default = UnchokeInputEvents;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFVuY2hva2VJbnB1dEV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQW9CLEVBQUUsQ0FBQyxVQUFVLEVBQS9CLE9BQU8sYUFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUl4QztJQUFpQyxzQ0FBWTtJQUd6QztRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOztJQUM1QixDQUFDO0lBRVMscUNBQVEsR0FBbEI7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFaQyxrQkFBa0I7UUFGdkIsT0FBTztRQUNQLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztPQUM3QixrQkFBa0IsQ0FhdkI7SUFBRCx5QkFBQztDQWJELEFBYUMsQ0FiZ0MsRUFBRSxDQUFDLFNBQVMsR0FhNUM7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi5re75Yqg6Ieq5a6a5LmJ57uE5Lu2L1VuY2hva2VJbnB1dEV2ZW50c1wiKVxyXG5jbGFzcyBVbmNob2tlSW5wdXRFdmVudHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBfaXNTd2FsbG93OiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5faXNTd2FsbG93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKHRoaXMuX2lzU3dhbGxvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVbmNob2tlSW5wdXRFdmVudHM7Il19