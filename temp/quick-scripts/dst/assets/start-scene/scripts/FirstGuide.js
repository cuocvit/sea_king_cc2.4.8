
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FirstGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03163BVnfRDdaoOAmPWdg3x', 'FirstGuide');
// start-scene/scripts/FirstGuide.ts

"use strict";
// import cc from './cc';
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
var MyComponent = /** @class */ (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyComponent.prototype.onClick = function () {
        // Click handling logic here
    };
    return MyComponent;
}(cc.Component));
exports.default = MyComponent;
var MyComponentDecorator = cc._decorator.ccclass;
var MyComponentProperty = cc._decorator.property;
var c = /** @class */ (function (_super) {
    __extends(c, _super);
    function c() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    c = __decorate([
        MyComponentDecorator
    ], c);
    return c;
}(MyComponent));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpcnN0R3VpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpCO0lBQXlDLCtCQUFZO0lBQXJEOztJQUlBLENBQUM7SUFIRyw2QkFBTyxHQUFQO1FBQ0ksNEJBQTRCO0lBQ2hDLENBQUM7SUFDTCxrQkFBQztBQUFELENBSkEsQUFJQyxDQUp3QyxFQUFFLENBQUMsU0FBUyxHQUlwRDs7QUFFRCxJQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0FBQ25ELElBQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFHbkQ7SUFBZ0IscUJBQVc7SUFBM0I7O0lBRUEsQ0FBQztJQUZLLENBQUM7UUFETixvQkFBb0I7T0FDZixDQUFDLENBRU47SUFBRCxRQUFDO0NBRkQsQUFFQyxDQUZlLFdBQVcsR0FFMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY2MgZnJvbSAnLi9jYyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIENsaWNrIGhhbmRsaW5nIGxvZ2ljIGhlcmVcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgTXlDb21wb25lbnREZWNvcmF0b3IgPSBjYy5fZGVjb3JhdG9yLmNjY2xhc3M7XHJcbmNvbnN0IE15Q29tcG9uZW50UHJvcGVydHkgPSBjYy5fZGVjb3JhdG9yLnByb3BlcnR5O1xyXG5cclxuQE15Q29tcG9uZW50RGVjb3JhdG9yXHJcbmNsYXNzIGMgZXh0ZW5kcyBNeUNvbXBvbmVudCB7XHJcbiAgICAvLyBBZGRpdGlvbmFsIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgY2FuIGJlIGFkZGVkIGhlcmVcclxufSJdfQ==