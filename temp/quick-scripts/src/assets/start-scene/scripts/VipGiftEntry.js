"use strict";
cc._RF.push(module, 'a5ba0ZBTQtPZ6D9fctH7I6V', 'VipGiftEntry');
// start-scene/scripts/VipGiftEntry.ts

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
exports.VipGiftEntry = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipGiftEntry = /** @class */ (function (_super) {
    __extends(VipGiftEntry, _super);
    function VipGiftEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entry_btn = null;
        _this.extend_node = null;
        return _this;
    }
    VipGiftEntry.prototype.onEnable = function () {
        if (this.node.parent) {
            this.node.parent.active = true;
        }
    };
    VipGiftEntry.prototype.onDisable = function () {
        // Add any necessary cleanup logic here
    };
    VipGiftEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.VIPGIFT);
        }
    };
    __decorate([
        property(cc.Button)
    ], VipGiftEntry.prototype, "entry_btn", void 0);
    __decorate([
        property(cc.Node)
    ], VipGiftEntry.prototype, "extend_node", void 0);
    VipGiftEntry = __decorate([
        ccclass
    ], VipGiftEntry);
    return VipGiftEntry;
}(NodePoolItem_1.NodePoolItem));
exports.VipGiftEntry = VipGiftEntry;

cc._RF.pop();