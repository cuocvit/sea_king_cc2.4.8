"use strict";
cc._RF.push(module, 'eeec1QveatLj7C51mTwIhoC', 'StoreEntry');
// start-scene/scripts/StoreEntry.ts

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
exports.StoreEntry = void 0;
//
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreEntry = /** @class */ (function (_super) {
    __extends(StoreEntry, _super);
    function StoreEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoreEntry.prototype.onEnable = function () {
        if (this.node.parent) {
            this.node.parent.active = true;
        }
        this.node.x = 0;
        this.node.y = 0;
    };
    StoreEntry.prototype.onDisable = function () {
        // No implementation needed
    };
    StoreEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.RMBSTORE);
        }
    };
    StoreEntry = __decorate([
        ccclass
    ], StoreEntry);
    return StoreEntry;
}(NodePoolItem_1.NodePoolItem));
exports.StoreEntry = StoreEntry;

cc._RF.pop();