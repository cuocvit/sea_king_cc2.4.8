"use strict";
cc._RF.push(module, '18a13uE78tFtr6UixVCghRw', 'AddDesktopEntry');
// start-scene/scripts/AddDesktopEntry.ts

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
exports.AddDesktopEntry = void 0;
//
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var MainData_1 = require("./MainData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AddDesktopEntry = /** @class */ (function (_super) {
    __extends(AddDesktopEntry, _super);
    function AddDesktopEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.add_desktop_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    // @
    AddDesktopEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(MainData_1.MainData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    // @
    AddDesktopEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(MainData_1.MainData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    // @
    AddDesktopEntry.prototype.update_view = function () {
        this.node.active = !GameManager_1.gm.data.main_data.is_receive_shortcut_reward;
        this.red_point_node.active = !GameManager_1.gm.data.main_data.is_receive_shortcut_reward;
    };
    // @
    AddDesktopEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.add_desktop_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.AddDesktop);
        }
    };
    __decorate([
        property(cc.Button)
    ], AddDesktopEntry.prototype, "add_desktop_btn", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktopEntry.prototype, "red_point_node", void 0);
    AddDesktopEntry = __decorate([
        ccclass
    ], AddDesktopEntry);
    return AddDesktopEntry;
}(NodePoolItem_1.NodePoolItem));
exports.AddDesktopEntry = AddDesktopEntry;

cc._RF.pop();