"use strict";
cc._RF.push(module, 'eef13aiVoRK5KkjN1+rbSq2', 'SuperRecruitEntry');
// start-scene/scripts/SuperRecruitEntry.ts

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
exports.SuperRecruitEntry = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperRecruitEntry = /** @class */ (function (_super) {
    __extends(SuperRecruitEntry, _super);
    function SuperRecruitEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.super_recruit_btn = null;
        _this.red_point_node = null;
        _this._is_show_red = true;
        return _this;
    }
    SuperRecruitEntry.prototype.onEnable = function () {
        this.update_view();
    };
    SuperRecruitEntry.prototype.onDisable = function () {
        // Add any necessary cleanup logic here
    };
    SuperRecruitEntry.prototype.update_view = function () {
        this.red_point_node.active = this._is_show_red;
    };
    SuperRecruitEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.super_recruit_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.SuperRecruit);
            if (this._is_show_red) {
                this._is_show_red = false;
                this.update_view();
            }
        }
    };
    __decorate([
        property(cc.Button)
    ], SuperRecruitEntry.prototype, "super_recruit_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SuperRecruitEntry.prototype, "red_point_node", void 0);
    SuperRecruitEntry = __decorate([
        ccclass
    ], SuperRecruitEntry);
    return SuperRecruitEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SuperRecruitEntry = SuperRecruitEntry;

cc._RF.pop();