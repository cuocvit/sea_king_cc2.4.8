
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightReturn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3f0azDNItBBZYW9BhYu80n', 'FightReturn');
// fight/scripts/FightReturn.ts

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
var FightReturn = /** @class */ (function (_super) {
    __extends(FightReturn, _super);
    function FightReturn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.cancel_btn = null;
        _this.ok_btn = null;
        return _this;
    }
    FightReturn.prototype.editor_on_button_click_handler = function (event) {
        var target = event.target;
        if (target == this.close_btn.node || target == this.anywhere_close_btn.node || target == this.cancel_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReturn);
        }
        else if (target == this.ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReturn);
            GameManager_1.gm.ui.fight.fight_return();
        }
    };
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "cancel_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "ok_btn", void 0);
    FightReturn = __decorate([
        ccclass
    ], FightReturn);
    return FightReturn;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFFNUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEIsK0JBQVU7SUFBcEM7UUFBQSxxRUFzQkM7UUFwQlMsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1Qix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFHckMsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsWUFBTSxHQUFjLElBQUksQ0FBQzs7SUFXbkMsQ0FBQztJQVRTLG9EQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQ3BELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQzdHLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDckMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQW5CRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUN5QjtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNhO0lBWDdCLFdBQVc7UUFEaEIsT0FBTztPQUNGLFdBQVcsQ0FzQmhCO0lBQUQsa0JBQUM7Q0F0QkQsQUFzQkMsQ0F0QnlCLHVCQUFVLEdBc0JuQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0UmV0dXJuIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIGNsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIGNhbmNlbF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgcHJpdmF0ZSBva19idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKHRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bi5ub2RlIHx8IHRhcmdldCA9PSB0aGlzLmFueXdoZXJlX2Nsb3NlX2J0bi5ub2RlIHx8IHRhcmdldCA9PSB0aGlzLmNhbmNlbF9idG4ubm9kZSkge1xyXG4gICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5GaWdodFJldHVybik7XHJcbiAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSB0aGlzLm9rX2J0bi5ub2RlKSB7XHJcbiAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0UmV0dXJuKTtcclxuICAgICAgZ20udWkuZmlnaHQuZmlnaHRfcmV0dXJuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==