
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SignEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cdf04OTYMxIF6jetJhMO+9G', 'SignEntry');
// start-scene/scripts/SignEntry.ts

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
exports.SignEntry = void 0;
// +-+
var SignData_1 = require("./SignData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignEntry = /** @class */ (function (_super) {
    __extends(SignEntry, _super);
    function SignEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sign_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    SignEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    SignEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    SignEntry.prototype.update_view = function () {
        var signData = GameManager_1.gm.data.sign_data;
        this.red_point_node.active =
            signData.sign_state < 3 ||
                signData.sign_buy_data_array[0].state < 2;
    };
    SignEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a;
        if (event.target === ((_a = this.sign_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Sign);
        }
    };
    __decorate([
        property(cc.Button)
    ], SignEntry.prototype, "sign_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SignEntry.prototype, "red_point_node", void 0);
    SignEntry = __decorate([
        ccclass
    ], SignEntry);
    return SignEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SignEntry = SignEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNpZ25FbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHVDQUFzQztBQUN0Qyw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQStCLDZCQUFZO0lBQTNDO1FBQUEscUVBb0NDO1FBbENXLGNBQVEsR0FBcUIsSUFBSSxDQUFDO1FBR2xDLG9CQUFjLEdBQW1CLElBQUksQ0FBQzs7SUErQmxELENBQUM7SUE3QmEsNEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUNwQixtQkFBUSxDQUFDLGlCQUFpQixFQUMxQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRVMsNkJBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNyQixtQkFBUSxDQUFDLGlCQUFpQixFQUMxQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQ1AsQ0FBQztJQUNOLENBQUM7SUFFTywrQkFBVyxHQUFuQjtRQUNJLElBQU0sUUFBUSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07WUFDdEIsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDO2dCQUN2QixRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sa0RBQThCLEdBQXJDLFVBQXNDLEtBQWU7O1FBQ2pELElBQUksS0FBSyxDQUFDLE1BQU0sWUFBSyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUN0QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBakNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQzRCO0lBTHJDLFNBQVM7UUFEckIsT0FBTztPQUNLLFNBQVMsQ0FvQ3JCO0lBQUQsZ0JBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQzhCLDJCQUFZLEdBb0MxQztBQXBDWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBTaWduRGF0YSB9IGZyb20gXCIuL1NpZ25EYXRhXCI7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSBcIi4vTm9kZVBvb2xJdGVtXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNpZ25FbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBzaWduX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJlZF9wb2ludF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihcclxuICAgICAgICAgICAgU2lnbkRhdGEuRVZFTlRfREFUQV9DSEFOR0UsXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcsXHJcbiAgICAgICAgICAgIHRoaXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXHJcbiAgICAgICAgICAgIFNpZ25EYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNpZ25EYXRhID0gZ20uZGF0YS5zaWduX2RhdGE7XHJcbiAgICAgICAgdGhpcy5yZWRfcG9pbnRfbm9kZS5hY3RpdmUgPVxyXG4gICAgICAgICAgICBzaWduRGF0YS5zaWduX3N0YXRlIDwgMyB8fFxyXG4gICAgICAgICAgICBzaWduRGF0YS5zaWduX2J1eV9kYXRhX2FycmF5WzBdLnN0YXRlIDwgMjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMuc2lnbl9idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5TaWduKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19