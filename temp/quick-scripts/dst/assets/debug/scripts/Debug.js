
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/debug/scripts/Debug.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eec27Tp3CVH9LOA9W6695Ii', 'Debug');
// debug/scripts/Debug.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Debug = /** @class */ (function (_super) {
    __extends(Debug, _super);
    function Debug() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.export_btn = null;
        _this.clear_store_btn = null;
        return _this;
    }
    Debug.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Debug);
        }
        else if (event.target == this.export_btn.node) {
            GameManager_1.gm.data.export_data();
        }
        else if (event.target == this.clear_store_btn.node) {
            GameManager_1.gm.data.clear_store_data();
        }
    };
    __decorate([
        property(cc.Button)
    ], Debug.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Debug.prototype, "export_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Debug.prototype, "clear_store_btn", void 0);
    Debug = __decorate([
        ccclass
    ], Debug);
    return Debug;
}(GameModule_1.GameModule));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGVidWdcXHNjcmlwdHNcXERlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFFNUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0IseUJBQVU7SUFBOUI7UUFBQSxxRUFtQkM7UUFqQlMsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsZ0JBQVUsR0FBcUIsSUFBSSxDQUFDO1FBR3BDLHFCQUFlLEdBQXFCLElBQUksQ0FBQzs7SUFXbkQsQ0FBQztJQVRRLDhDQUE4QixHQUFyQyxVQUFzQyxLQUFlO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtZQUN2QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QzthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUMvQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QjthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtZQUNwRCxnQkFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQWhCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUN1QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUN3QjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUM2QjtJQVI3QyxLQUFLO1FBRFYsT0FBTztPQUNGLEtBQUssQ0FtQlY7SUFBRCxZQUFDO0NBbkJELEFBbUJDLENBbkJtQix1QkFBVSxHQW1CN0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBEZWJ1ZyBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gIHByaXZhdGUgZXhwb3J0X2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgcHJpdmF0ZSBjbGVhcl9zdG9yZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bi5ub2RlKSB7XHJcbiAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkRlYnVnKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuZXhwb3J0X2J0bi5ub2RlKSB7XHJcbiAgICAgIGdtLmRhdGEuZXhwb3J0X2RhdGEoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuY2xlYXJfc3RvcmVfYnRuLm5vZGUpIHtcclxuICAgICAgZ20uZGF0YS5jbGVhcl9zdG9yZV9kYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==