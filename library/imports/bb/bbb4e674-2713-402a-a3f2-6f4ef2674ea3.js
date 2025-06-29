"use strict";
cc._RF.push(module, 'bbb4eZ0JxNAKqPyb07yZ06j', 'AutoCompose');
// start-scene/scripts/AutoCompose.ts

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
//
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var TaskData_1 = require("./TaskData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AutoCompose = /** @class */ (function (_super) {
    __extends(AutoCompose, _super);
    function AutoCompose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask = null;
        _this.lblTime = null;
        _this.newerIcon = null;
        _this.handAni = null;
        _this.autoAnim = null;
        _this._timeContainer = 0;
        _this._maxTime = 600;
        _this._stopTime = 0;
        _this.timer = 0;
        return _this;
    }
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.onEnable = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        this.newerIcon.active = GameManager_1.gm.data.mapCell_data.is_first_auto_compose === 0;
        this.showReciveTime();
        GameManager_1.gm.ui.on("task_finish_20009", this.showHandAnimAtAutoCom, this);
        GameManager_1.gm.data.event_emitter.on("auto_merge_message", this.on_auto_merge_message, this);
    };
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off("auto_merge_message", this.on_auto_merge_message, this);
        GameManager_1.gm.ui.off("task_finish_20009", this.showHandAnimAtAutoCom, this);
    };
    // @
    AutoCompose.prototype.showHandAnimAtAutoCom = function () {
        this.handAni.active = true;
    };
    // @
    AutoCompose.prototype.on_auto_merge_message = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            GameManager_1.gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
        }
        else {
            this._stopTime = this._maxTime;
            GameManager_1.gm.channel.report_event("video_auto_merge", {
                event_desc: "Watch video automatically",
                desc: "Watch video automatically" // 看视频自动合成
            });
            NetUtils_1.ReportData.instance.report_once_point(10881);
            NetUtils_1.ReportData.instance.report_point(10882);
        }
        this.playAutoCompose();
    };
    // @
    AutoCompose.prototype.playAutoCompose = function () {
        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.AUTOCOMPOSE);
        if (!GameManager_1.gm.data.mapCell_data.autoCompose()) {
            GameManager_1.gm.data.mapCell_data.autoOpenCase();
        }
    };
    // @
    AutoCompose.prototype.onClick = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            GameManager_1.gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
            this.playAutoCompose();
        }
        else if (this._stopTime <= 0) {
            GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
        }
    };
    // @
    AutoCompose.prototype.watchAdCb = function () {
        if (this._stopTime > 0)
            return;
        this._stopTime = this._maxTime;
        GameManager_1.gm.channel.report_event("video_auto_merge", {
            event_desc: "Watch video automatically",
            desc: "Watch video automatically" // 看视频自动合成
        });
        NetUtils_1.ReportData.instance.report_once_point(10881);
        NetUtils_1.ReportData.instance.report_point(10882);
        this.playAutoCompose();
    };
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.update = function (deltaTime) {
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.timer += deltaTime;
            if (this.timer > 15 && !this.autoAnim.node.active) {
                this.autoAnim.node.active = true;
                this.autoAnim.play();
            }
        }
        if (this._stopTime > 0) {
            this._timeContainer += deltaTime;
            if (this._timeContainer >= 1) {
                --this._timeContainer;
                this._stopTime--;
                this.playAutoCompose();
                this.showReciveTime();
            }
        }
    };
    // @
    AutoCompose.prototype.showReciveTime = function () {
        this.lblTime.string = Utils_1.Utils.format_time_miunte(this._stopTime);
        this.mask.fillRange = this._stopTime / this._maxTime;
        if (this._stopTime === 0) {
            this.lblTime.string = "Tự động tổng hợp"; // 自动合成
            this.mask.fillRange = 0;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], AutoCompose.prototype, "mask", void 0);
    __decorate([
        property(cc.Label)
    ], AutoCompose.prototype, "lblTime", void 0);
    __decorate([
        property(cc.Node)
    ], AutoCompose.prototype, "newerIcon", void 0);
    __decorate([
        property(cc.Node)
    ], AutoCompose.prototype, "handAni", void 0);
    __decorate([
        property(cc.Animation)
    ], AutoCompose.prototype, "autoAnim", void 0);
    AutoCompose = __decorate([
        ccclass
    ], AutoCompose);
    return AutoCompose;
}(GameModule_1.GameModule));
exports.default = AutoCompose;

cc._RF.pop();