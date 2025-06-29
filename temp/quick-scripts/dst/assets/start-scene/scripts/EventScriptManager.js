
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/EventScriptManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEV2ZW50U2NyaXB0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw2Q0FBbUM7QUFDbkMsdUNBQXNDO0FBQzlCLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBT0ksS0FBSztJQUNMO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztTQUNSLENBQUM7SUFDTixDQUFDOzJCQXpCQyxrQkFBa0I7SUE0QnBCLHNCQUFrQiw4QkFBUTtRQUQxQixLQUFLO2FBQ0w7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksb0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBRUQsS0FBSztJQUNFLDBDQUFhLEdBQXBCO1FBQ0ksSUFBTSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlDLElBQU0sT0FBTyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7WUFDL0IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QztTQUNKO0lBQ0wsQ0FBQztJQUVPLG9EQUF1QixHQUEvQjtRQUNJLElBQU0sU0FBUyxHQUFHLG1CQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDdkQsSUFBSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLElBQUksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksbUJBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5FLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUNwRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEMsT0FBTzthQUNWO1lBQ0QsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNyRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO3dCQUNuRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQzlHO3lCQUFNO3dCQUNILGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3FCQUN4QztpQkFDSjthQUVKO2lCQUFNO2dCQUNILGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3RDO1NBRUo7YUFBTTtZQUNILElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RCLElBQUksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxJQUFJLGdCQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUN0RCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7aUJBQ2hGO3FCQUFNO29CQUNILGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQzVGLGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkM7YUFFSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQ3BFLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN4RDtnQkFDRCxJQUFJLGdCQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksSUFBSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDdEQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzlDO2dCQUNELGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JIO1lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNmLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkM7WUFFRCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUN2QixnQkFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3pDLE9BQU8sRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDMUIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUM7aUJBQzFFLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDO0lBRU0sMkNBQWMsR0FBckI7UUFDSSxtQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLDJDQUFjLEdBQXRCO1FBQ0ksT0FBTyxtQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsWUFBWSxDQUFBO0lBQ25ELENBQUM7SUFFTywwQ0FBYSxHQUFyQjtRQUNJLHdCQUF3QjtJQUM1QixDQUFDO0lBRU8sMkNBQWMsR0FBdEI7UUFDSSxJQUFNLFNBQVMsR0FBRyxtQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDM0IsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7O0lBM0hELEtBQUs7SUFDVSw0QkFBUyxHQUF1QixJQUFJLENBQUM7SUFGbEQsa0JBQWtCO1FBRHZCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztPQUN4QixrQkFBa0IsQ0E2SHZCO0lBQUQseUJBQUM7Q0E3SEQsQUE2SEMsSUFBQTtBQUVRLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBAXHJcbmltcG9ydCB7IEd1aWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvZ3VpZGUnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4vVGVtcERhdGEnO1xyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzcyhcIkV2ZW50U2NyaXB0TWFuYWdlclwiKVxyXG5jbGFzcyBFdmVudFNjcmlwdE1hbmFnZXIge1xyXG4gICAgLy8gQEBcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRXZlbnRTY3JpcHRNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgX05ld2VyR3VpZGVMaXN0OiBHdWlkZUNvbmZpZ1tdO1xyXG4gICAgcHJpdmF0ZSBfaXNGaW5pc2g6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9ndWlkZUlEOiBSZWNvcmQ8bnVtYmVyLCBudW1iZXI+O1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX05ld2VyR3VpZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5faXNGaW5pc2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2d1aWRlSUQgPSB7XHJcbiAgICAgICAgICAgIDE6IDEsXHJcbiAgICAgICAgICAgIDI6IDEsXHJcbiAgICAgICAgICAgIDQ6IDEsXHJcbiAgICAgICAgICAgIDU6IDEsXHJcbiAgICAgICAgICAgIDY6IDEsXHJcbiAgICAgICAgICAgIDc6IDEsXHJcbiAgICAgICAgICAgIDg6IDEsXHJcbiAgICAgICAgICAgIDk6IDEsXHJcbiAgICAgICAgICAgIDEwOiAxLFxyXG4gICAgICAgICAgICAxMTogMSxcclxuICAgICAgICAgICAgMTI6IDEsXHJcbiAgICAgICAgICAgIDE1OiAxXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogRXZlbnRTY3JpcHRNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IEV2ZW50U2NyaXB0TWFuYWdlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGluaXRFdmVudExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZ3VpZGVEYXRhID0gVGVtcERhdGEuZ2V0Um9sZUd1aWRlRGF0YSgpO1xyXG4gICAgICAgIGNvbnN0IGd1aWRlSUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEd1aWRlSURMaXN0KGd1aWRlRGF0YS5ndWlkZUlEKTtcclxuICAgICAgICBpZiAoZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICB0aGlzLl9OZXdlckd1aWRlTGlzdCA9IGd1aWRlSUQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hOZXdlckd1aWRlRXZlbnQoKTtcclxuICAgICAgICAgICAgaWYgKDggPT0gdGhpcy5fTmV3ZXJHdWlkZUxpc3RbMF0uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnBsYXlHdWlkZUJhcnJlbEZseSg0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoTmV3ZXJHdWlkZUV2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGd1aWRlRGF0YSA9IFRlbXBEYXRhLmdldFJvbGVHdWlkZURhdGEoKTtcclxuICAgICAgICBpZiAoZ3VpZGVEYXRhLnJ1bm5pbmdJbmRleCA+PSB0aGlzLl9OZXdlckd1aWRlTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKGdtLnVpLm5ld2VyR3VpZGVPcCAmJiBnbS51aS5uZXdlckd1aWRlT3Aubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdVSURFTE9QKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9ndWlkZUlEW2d1aWRlRGF0YS5ndWlkZUlEXSAmJiBUZW1wRGF0YS5zZXRSb2xlR3VpZGVEYXRhRW5kKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoNCA9PSB0aGlzLl9OZXdlckd1aWRlTGlzdFt0aGlzLl9OZXdlckd1aWRlTGlzdC5sZW5ndGggLSAxXS5ndWlkZUlEKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRSb2xlR3VpZGVEYXRhKDEzLCAwKTtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoMTUgIT0gdGhpcy5fTmV3ZXJHdWlkZUxpc3RbdGhpcy5fTmV3ZXJHdWlkZUxpc3QubGVuZ3RoIC0gMV0uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKDE1ICE9IHRoaXMuX05ld2VyR3VpZGVMaXN0W3RoaXMuX05ld2VyR3VpZGVMaXN0Lmxlbmd0aCAtIDFdLmd1aWRlSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fTmV3ZXJHdWlkZUxpc3RbdGhpcy5fTmV3ZXJHdWlkZUxpc3QubGVuZ3RoIC0gMV0ubmV4dEd1aWRlSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrSGFuZEFuaW1EZWxheSgwLjUsIHRoaXMuX05ld2VyR3VpZGVMaXN0W3RoaXMuX05ld2VyR3VpZGVMaXN0Lmxlbmd0aCAtIDFdLm5leHRHdWlkZUlEKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuY2hlY2tIYW5kQW5pbURlbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0d1aWRlSXNTaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLl9OZXdlckd1aWRlTGlzdFtndWlkZURhdGEucnVubmluZ0luZGV4XTtcclxuICAgICAgICAgICAgaWYgKDEgPT0gZXZlbnQuZXZlbnRUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20udWkubmV3ZXJHdWlkZU9wICYmIGdtLnVpLm5ld2VyR3VpZGVPcC5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLm5ld2VyR3VpZGVPcC5zaG93QnRuTWFzayh0aGlzLl9OZXdlckd1aWRlTGlzdFtndWlkZURhdGEucnVubmluZ0luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5LCB0aGlzLl9OZXdlckd1aWRlTGlzdFtndWlkZURhdGEucnVubmluZ0luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HVUlERUxPUCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKDMgPT0gZXZlbnQuZXZlbnRUeXBlICYmIGV2ZW50LmNpcmNsZVdpZHRoICYmIDAgPCBldmVudC5jaXJjbGVXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShldmVudC5jaXJjbGVXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20udWkubmV3ZXJHdWlkZU9wICYmIGdtLnVpLm5ld2VyR3VpZGVPcC5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdVSURFTE9QKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5tb3ZlTWFwUG9zRm9yR3VpZGUoZXZlbnQuZXZlbnRUeXBlLCBldmVudC5yb2xlRGlyZSwgZXZlbnQuY2lyY2xlV2lkdGgsIHRoaXMuc2V0UnVuaW5nSW5kZXgsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuc291bmRJRCkge1xyXG4gICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZXZlbnQuc291bmRJRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgwIDwgZXZlbnQuZ3VpZGVTZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGd1aWRlaWQ6IGV2ZW50Lmd1aWRlU2VyaWFsLFxyXG4gICAgICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiJWQuJXNcIiwgZXZlbnQuZ3VpZGVTZXJpYWwsIGV2ZW50Lmd1aWRlRGVzYylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSdW5pbmdJbmRleCgpOiB2b2lkIHtcclxuICAgICAgICBUZW1wRGF0YS5nZXRSb2xlR3VpZGVEYXRhKCkucnVubmluZ0luZGV4Kys7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaE5ld2VyR3VpZGVFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UnVuaW5nSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gVGVtcERhdGEuZ2V0Um9sZUd1aWRlRGF0YSgpLnJ1bm5pbmdJbmRleFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q3VyR3VpZGVJRCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBJbXBsZW1lbnRhdGlvbiBuZWVkZWRcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyRXZlbnRMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvbGVHdWlkZSA9IFRlbXBEYXRhLmdldFJvbGVHdWlkZURhdGEoKTtcclxuICAgICAgICB0aGlzLl9OZXdlckd1aWRlTGlzdCA9IFtdO1xyXG4gICAgICAgIHJvbGVHdWlkZS5ydW5uaW5nSW5kZXggPSAwO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldFJvbGVHdWlkZURhdGEocm9sZUd1aWRlLmd1aWRlSUQsIHJvbGVHdWlkZS5ydW5uaW5nSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuX2lzRmluaXNoID0gdHJ1ZTtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5HVUlERUxPUCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEV2ZW50U2NyaXB0TWFuYWdlciB9OyJdfQ==