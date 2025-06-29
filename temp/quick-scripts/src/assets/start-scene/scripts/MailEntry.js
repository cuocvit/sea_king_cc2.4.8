"use strict";
cc._RF.push(module, '0c1e3Qsgb1NxrfgeL2xRAoq', 'MailEntry');
// start-scene/scripts/MailEntry.ts

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
exports.MailEntry = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var ServerData_1 = require("./ServerData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailEntry = /** @class */ (function (_super) {
    __extends(MailEntry, _super);
    function MailEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mail_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    MailEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    MailEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    MailEntry.prototype.update_view = function () {
        if (this.red_point_node) {
            this.red_point_node.active = GameManager_1.gm.data.server_data.mail_red_point;
        }
    };
    MailEntry.prototype.editor_on_button_click_handler = function (event) {
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!buildData || buildData.buildLvl < 1) {
            GameManager_1.gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
        }
        else if (event.target == this.mail_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Mail);
        }
    };
    __decorate([
        property(cc.Button)
    ], MailEntry.prototype, "mail_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MailEntry.prototype, "red_point_node", void 0);
    MailEntry = __decorate([
        ccclass
    ], MailEntry);
    return MailEntry;
}(NodePoolItem_1.NodePoolItem));
exports.MailEntry = MailEntry;

cc._RF.pop();