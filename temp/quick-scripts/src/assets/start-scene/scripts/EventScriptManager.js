"use strict";
cc._RF.push(module, '1ec00CQ2jNPT5H8/N2uNYwC', 'EventScriptManager');
// start-scene/scripts/EventScriptManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventScriptManager = void 0;
var GameManager_1 = require("./GameManager");
var TempData_1 = require("./TempData");
var ccclass = cc._decorator.ccclass;
var EventScriptManager = /** @class */ (function () {
    // @@
    function EventScriptManager() {
        this._NewerGuideList = [];
        this._isFinish = true;
        this._guideID = {
            1: 1,
            2: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            15: 1
        };
    }
    EventScriptManager_1 = EventScriptManager;
    Object.defineProperty(EventScriptManager, "instance", {
        // @@
        get: function () {
            return this._instance || (this._instance = new EventScriptManager_1());
        },
        enumerable: false,
        configurable: true
    });
    // @@
    EventScriptManager.prototype.initEventList = function () {
        var guideData = TempData_1.TempData.getRoleGuideData();
        var guideID = GameManager_1.gm.data.config_data.getGuideIDList(guideData.guideID);
        if (guideID) {
            this._NewerGuideList = guideID;
            this.dispatchNewerGuideEvent();
            if (8 == this._NewerGuideList[0].guideID) {
                GameManager_1.gm.ui.mapMainUI.playGuideBarrelFly(4);
            }
        }
    };
    EventScriptManager.prototype.dispatchNewerGuideEvent = function () {
        var guideData = TempData_1.TempData.getRoleGuideData();
        if (guideData.runningIndex >= this._NewerGuideList.length) {
            if (GameManager_1.gm.ui.newerGuideOp && GameManager_1.gm.ui.newerGuideOp.node.active) {
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDELOP);
            }
            this._guideID[guideData.guideID] && TempData_1.TempData.setRoleGuideDataEnd();
            if (4 == this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                GameManager_1.gm.data.mapCell_data.setRoleGuideData(13, 0);
                GameManager_1.gm.data.mapCell_data.async_write_data();
                return;
            }
            if (15 != this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                if (15 != this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                    if (this._NewerGuideList[this._NewerGuideList.length - 1].nextGuideID) {
                        GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay(0.5, this._NewerGuideList[this._NewerGuideList.length - 1].nextGuideID);
                    }
                    else {
                        GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                    }
                }
            }
            else {
                GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
            }
        }
        else {
            var event = this._NewerGuideList[guideData.runningIndex];
            if (1 == event.eventType) {
                if (GameManager_1.gm.ui.newerGuideOp && GameManager_1.gm.ui.newerGuideOp.node.active) {
                    GameManager_1.gm.ui.newerGuideOp.showBtnMask(this._NewerGuideList[guideData.runningIndex]);
                }
                else {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, this._NewerGuideList[guideData.runningIndex]);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDELOP);
                }
            }
            else {
                if (3 == event.eventType && event.circleWidth && 0 < event.circleWidth) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(event.circleWidth);
                }
                if (GameManager_1.gm.ui.newerGuideOp && GameManager_1.gm.ui.newerGuideOp.node.active) {
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDELOP);
                }
                GameManager_1.gm.ui.mapMainUI.moveMapPosForGuide(event.eventType, event.roleDire, event.circleWidth, this.setRuningIndex, this);
            }
            if (event.soundID) {
                GameManager_1.gm.audio.play_effect(event.soundID);
            }
            if (0 < event.guideSerial) {
                GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                    guideid: event.guideSerial,
                    guidedesc: cc.js.formatStr("%d.%s", event.guideSerial, event.guideDesc)
                });
            }
        }
    };
    EventScriptManager.prototype.setRuningIndex = function () {
        TempData_1.TempData.getRoleGuideData().runningIndex++;
        this.dispatchNewerGuideEvent();
    };
    EventScriptManager.prototype.getRuningIndex = function () {
        return TempData_1.TempData.getRoleGuideData().runningIndex;
    };
    EventScriptManager.prototype.getCurGuideID = function () {
        // Implementation needed
    };
    EventScriptManager.prototype.clearEventList = function () {
        var roleGuide = TempData_1.TempData.getRoleGuideData();
        this._NewerGuideList = [];
        roleGuide.runningIndex = 0;
        GameManager_1.gm.data.mapCell_data.setRoleGuideData(roleGuide.guideID, roleGuide.runningIndex);
        this._isFinish = true;
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDELOP);
    };
    var EventScriptManager_1;
    // @@
    EventScriptManager._instance = null;
    EventScriptManager = EventScriptManager_1 = __decorate([
        ccclass("EventScriptManager")
    ], EventScriptManager);
    return EventScriptManager;
}());
exports.EventScriptManager = EventScriptManager;

cc._RF.pop();