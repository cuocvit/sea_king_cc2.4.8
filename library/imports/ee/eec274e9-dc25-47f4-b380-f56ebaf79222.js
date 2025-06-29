"use strict";
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