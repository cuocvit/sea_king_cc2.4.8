
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/EventProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2f1e84T+FKJIPW0y9/AlCx', 'EventProxy');
// start-scene/scripts/EventProxy.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventProxy = void 0;
var GameObject_1 = require("./GameObject");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var EventProxy = /** @class */ (function (_super) {
    __extends(EventProxy, _super);
    function EventProxy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.event_array = [];
        return _this;
    }
    EventProxy.prototype.on_event_proxy_handler = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        cc.Component.EventHandler.emitEvents.apply(this, __spreadArrays([this.event_array], args));
    };
    __decorate([
        property([cc.Component.EventHandler])
    ], EventProxy.prototype, "event_array", void 0);
    EventProxy = __decorate([
        ccclass,
        menu("添加自定义组件/EventProxy")
    ], EventProxy);
    return EventProxy;
}(GameObject_1.GameObject));
exports.EventProxy = EventProxy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEV2ZW50UHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDcEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFJbEQ7SUFBZ0MsOEJBQVU7SUFBMUM7UUFBQSxxRUFPQztRQUxXLGlCQUFXLEdBQWdDLEVBQUUsQ0FBQzs7SUFLMUQsQ0FBQztJQUhXLDJDQUFzQixHQUE5QjtRQUErQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUN6QyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksa0JBQUcsSUFBSSxDQUFDLFdBQVcsR0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBSkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO21EQUNnQjtJQUY3QyxVQUFVO1FBRnRCLE9BQU87UUFDUCxJQUFJLENBQUMsb0JBQW9CLENBQUM7T0FDZCxVQUFVLENBT3RCO0lBQUQsaUJBQUM7Q0FQRCxBQU9DLENBUCtCLHVCQUFVLEdBT3pDO0FBUFksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lT2JqZWN0IH0gZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLmt7vliqDoh6rlrprkuYnnu4Tku7YvRXZlbnRQcm94eVwiKVxyXG5leHBvcnQgY2xhc3MgRXZlbnRQcm94eSBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgQHByb3BlcnR5KFtjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXSlcclxuICAgIHByaXZhdGUgZXZlbnRfYXJyYXk6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgb25fZXZlbnRfcHJveHlfaGFuZGxlciguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cy5hcHBseSh0aGlzLCBbdGhpcy5ldmVudF9hcnJheSwgLi4uYXJnc10pO1xyXG4gICAgfVxyXG59Il19