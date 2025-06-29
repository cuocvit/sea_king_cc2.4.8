// @@
import { GuideConfig } from '../../common/configs/guide';
import { gm } from './GameManager';
import { TempData } from './TempData';
const { ccclass } = cc._decorator;

@ccclass("EventScriptManager")
class EventScriptManager {
    // @@
    private static _instance: EventScriptManager = null;
    private _NewerGuideList: GuideConfig[];
    private _isFinish: boolean;
    private _guideID: Record<number, number>;

    // @@
    private constructor() {
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

    // @@
    public static get instance(): EventScriptManager {
        return this._instance || (this._instance = new EventScriptManager());
    }

    // @@
    public initEventList(): void {
        const guideData = TempData.getRoleGuideData();
        const guideID = gm.data.config_data.getGuideIDList(guideData.guideID);
        if (guideID) {
            this._NewerGuideList = guideID;
            this.dispatchNewerGuideEvent();
            if (8 == this._NewerGuideList[0].guideID) {
                gm.ui.mapMainUI.playGuideBarrelFly(4);
            }
        }
    }

    private dispatchNewerGuideEvent(): void {
        const guideData = TempData.getRoleGuideData();
        if (guideData.runningIndex >= this._NewerGuideList.length) {
            if (gm.ui.newerGuideOp && gm.ui.newerGuideOp.node.active) {
                gm.ui.async_hide_module(gm.const.GUIDELOP);
            }
            this._guideID[guideData.guideID] && TempData.setRoleGuideDataEnd();

            if (4 == this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                gm.data.mapCell_data.setRoleGuideData(13, 0);
                gm.data.mapCell_data.async_write_data();
                return;
            }
            if (15 != this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                if (15 != this._NewerGuideList[this._NewerGuideList.length - 1].guideID) {
                    if (this._NewerGuideList[this._NewerGuideList.length - 1].nextGuideID) {
                        gm.ui.mapMainUI.checkHandAnimDelay(0.5, this._NewerGuideList[this._NewerGuideList.length - 1].nextGuideID);
                    } else {
                        gm.ui.mapMainUI.checkHandAnimDelay();
                    }
                }

            } else {
                gm.ui.mapMainUI.checkGuideIsShow();
            }

        } else {
            const event = this._NewerGuideList[guideData.runningIndex];
            if (1 == event.eventType) {
                if (gm.ui.newerGuideOp && gm.ui.newerGuideOp.node.active) {
                    gm.ui.newerGuideOp.showBtnMask(this._NewerGuideList[guideData.runningIndex]);
                } else {
                    gm.ui.set_module_args(gm.const.GETCOINOP.key, this._NewerGuideList[guideData.runningIndex]);
                    gm.ui.show_panel(gm.const.GUIDELOP);
                }

            } else {
                if (3 == event.eventType && event.circleWidth && 0 < event.circleWidth) {
                    gm.data.mapCell_data.addBarrelNum(event.circleWidth);
                }
                if (gm.ui.newerGuideOp && gm.ui.newerGuideOp.node.active) {
                    gm.ui.async_hide_module(gm.const.GUIDELOP);
                }
                gm.ui.mapMainUI.moveMapPosForGuide(event.eventType, event.roleDire, event.circleWidth, this.setRuningIndex, this);
            }

            if (event.soundID) {
                gm.audio.play_effect(event.soundID);
            }

            if (0 < event.guideSerial) {
                gm.channel.report_event("ohayoo_game_guide", {
                    guideid: event.guideSerial,
                    guidedesc: cc.js.formatStr("%d.%s", event.guideSerial, event.guideDesc)
                });
            }
        }
    }

    public setRuningIndex(): void {
        TempData.getRoleGuideData().runningIndex++;
        this.dispatchNewerGuideEvent();
    }

    private getRuningIndex(): number {
        return TempData.getRoleGuideData().runningIndex
    }

    private getCurGuideID(): void {
        // Implementation needed
    }

    private clearEventList(): void {
        const roleGuide = TempData.getRoleGuideData();
        this._NewerGuideList = [];
        roleGuide.runningIndex = 0;
        gm.data.mapCell_data.setRoleGuideData(roleGuide.guideID, roleGuide.runningIndex);
        this._isFinish = true;
        gm.ui.async_hide_module(gm.const.GUIDELOP);
    }
}

export { EventScriptManager };