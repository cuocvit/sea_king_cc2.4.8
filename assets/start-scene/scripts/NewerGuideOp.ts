//
import { gm } from './GameManager';
import { MvcEventDispatcher } from './MvcEventDispatcher';
import { DataEvent } from './DataEvent';
import { GuideConfig } from '../../common/configs/guide';

const { ccclass, property } = cc._decorator;

@ccclass
class NewerGuideOp extends cc.Component {
    @property(cc.Node)
    private maskNode: cc.Node | null = null;

    @property(cc.Node)
    private maskNodeWid: cc.Node | null = null;

    @property(cc.Node)
    private maskCirCleNodeWid: cc.Node | null = null;

    @property(cc.Node)
    private clickEventNode: cc.Node | null = null;

    @property(cc.Node)
    private guiderNode: cc.Node | null = null;

    @property(cc.Node)
    private guiderRoleNode: cc.Node | null = null;

    @property(sp.Skeleton)
    private guiderRoleNpcNode: sp.Skeleton | null = null;

    @property(cc.Node)
    private contentTxtNode: cc.Node | null = null;

    @property([cc.SpriteFrame])
    private txtBgSprFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    private nodeAddPanel: cc.Node | null = null;

    @property(cc.Animation)
    private effectTipsShow: cc.Animation | null = null;

    @property(cc.Node)
    private contentNode: cc.Node | null = null;

    @property(cc.Label)
    private guiderStr: cc.Label | null = null;

    @property(cc.Node)
    private fingerNode: cc.Node | null = null;

    @property(cc.Node)
    private clickSizeSpr: cc.Node | null = null;

    @property(cc.Node)
    private fingerClick: cc.Node | null = null;

    @property(cc.Node)
    private sanjiaoNode: cc.Node | null = null;

    @property(cc.Node)
    private maskBg: cc.Node | null = null;

    @property(cc.Sprite)
    private faceSprite: cc.Sprite | null = null;

    @property(cc.ParticleSystem)
    private roleLizi: cc.ParticleSystem | null = null;

    @property(cc.ParticleSystem)
    private roleLizi1: cc.ParticleSystem | null = null;

    @property(cc.Node)
    private tips1: cc.Node | null = null;

    @property(cc.Node)
    private tips2: cc.Node | null = null;

    private _attachNodeAddTime: number = -1;
    private _attachNode: cc.Node | null = null;
    private _attachNodeParent: cc.Node | null = null;
    private _eventData: GuideConfig = null;
    private _guideType: number = 0;
    private _nextEventName: string = "";
    private _maskClickCb: (() => void) | null = null;
    private timeTemp: number = 0;
    private _target: cc.Node | null = null;
    private _targetcb: (() => void) | null = null;

    protected onEnable(): void {
        MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent.NEWERGUIDEOPHIDE, this.hidePanel, this);
        MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent.NEWERGUIDEOPSHOW, this.showPanel, this);
        this.maskNode.active = false;
        this.guiderNode.active = false;
        this.tips1.active = false;
        this.tips2.active = false;

        const guide = gm.ui.get_module_args(gm.const.GETCOINOP.key) as GuideConfig;
        this.showBtnMask(guide);
        if (this._eventData.isShowTipLbl == 1) {
            this.roleLizi && this.roleLizi.resetSystem();
            this.roleLizi1?.resetSystem();
        }
    }

    protected onDisable(): void {
        this._maskClickCb = null;
        if (this._attachNode) this.returnAttachNode();
        this._attachNode = null;
        this._attachNodeParent = null;
        if (this._eventData) {
            MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).removeEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
            this._eventData = null;
        }
        this.effectTipsShow?.targetOff(this);
        MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent.NEWERGUIDEOPHIDE, this.hidePanel, this);
        MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent.NEWERGUIDEOPSHOW, this.showPanel, this);
    }

    private returnAttachNode(): void {
        if (this._attachNode) {
            this._attachNode.removeFromParent(false);
            this._attachNodeParent?.addChild(this._attachNode);
            this._attachNode = null;
            this._attachNodeParent = null;
        }
    }

    private hidePanel(): void {
        this.node.opacity = 0;
        this.clickSizeSpr.scale = 0;
    }

    private showPanel(): void {
        this.node.opacity = 255;
        this.clickSizeSpr.scale = 1;
    }

    private onMaskClickEvent(): void {
        cc.log("onMaskClickEvent");
        this.tips1.active = false;
        this.tips2.active = false;
        if (this._attachNode) {
            this._attachNode.removeFromParent(false);
            this._attachNodeParent?.addChild(this._attachNode);
            this._attachNode = null;
            this._attachNodeParent = null;
        }
        if (this._maskClickCb) {
            this._maskClickCb();
            this.resetMaskSizeAndcb();
        }
        if (this._eventData.dispearPos) {
            this.clickEventNode.width = 0;
            this.clickEventNode.height = 0;
            this.guiderRoleNode?.stopAllActions();
            this.guiderRoleNode?.runAction(cc.sequence(cc.moveTo(0.5, this._eventData.dispearPos, this.guiderRoleNode?.y), cc.callFunc(() => {
                this._attachNodeAddTime = -1;
                gm.newerGuideMgr.setRuningIndex();
            })));
        } else {
            this._attachNodeAddTime = -1;
            gm.newerGuideMgr.setRuningIndex();
        }
    }

    private onClickMask(): void {
        const eventNumber = parseFloat(this._eventData.curEventName);
        if (!isNaN(eventNumber) && eventNumber > 0) {
            this.onMaskClickEvent();
        }
    }

    private resetMaskSizeAndcb(): void {
        this.contentNode.active = false;
        this.fingerNode.active = false;
        this.fingerClick.active = false;
        this.clickEventNode.active = false;
        if (this._maskClickCb) {
            this._maskClickCb = null;
        }
    }

    private showMaskPanel(target: cc.Node, callback: () => void): void {
        if (target && target.getParent() != this.nodeAddPanel) {
            if (this._attachNode) this.returnAttachNode();
            this._target = target;
            this._targetcb = callback;
            this.maskNode.active = true;
            this.clickEventNode.active = true;
            this.fingerNode.active = true;
            this.maskNodeWid.width = this._eventData.circleWidth;
            this.maskNodeWid.height = this._eventData.circleWidth;
            this.maskCirCleNodeWid.width = this.maskNodeWid.width;
            this.maskCirCleNodeWid.height = this.maskNodeWid.height;
            this.clickEventNode.width = this.maskNodeWid.width;
            this.clickEventNode.height = this.maskNodeWid.height;
            const a = target.getParent().getParent().convertToWorldSpaceAR(target.getParent().position);
            this.maskNode.x = this.maskNode.getParent().convertToNodeSpaceAR(a).x;
            this.maskNode.y = this.maskNode.getParent().convertToNodeSpaceAR(a).y;
            this.clickEventNode.position = this.maskNode.position;
            this._attachNode = target;
            this._attachNodeParent = target.getParent();
            target.removeFromParent(false);
            this.nodeAddPanel.addChild(target);
            this.nodeAddPanel.scaleX = 1;
            this.nodeAddPanel.scaleY = 1;
            this.effectTipsShow.node.x = +target.x;
            this.effectTipsShow.node.y = +target.y;
            this.fingerNode.x = this.fingerNode.x + 40;
            this._maskClickCb = callback;
        }
    }

    private showMaskPanelWithoutBtn(): void {
        this.guiderNode.active = true;
        if (this._eventData.isShowTipLbl == 1) {
            if (this._eventData.guideID == 2 && this._eventData.guideIndex == 2) {
                this.tips1.active = true;
                this.tips1.scaleX = -1;
            }
            if (this._eventData.guideID == 15 && this._eventData.guideIndex == 2) {
                this.tips2.active = true;
                this.tips2.scaleX = -1;
            }
            this.clickEventNode.active = true;
            this.clickEventNode.width = 720;
            this.clickEventNode.height = 1580;
            this.clickEventNode.position = cc.v3(0, 0, 0);
            this.guiderNode.active = true;
            this.guiderRoleNode.position = cc.v3(this._eventData.roleoffsetx, this._eventData.roleoffsety, 0);
            this.guiderRoleNpcNode?.setSkin(this._eventData.skinName);
            this.guiderRoleNpcNode?.addAnimation(0, "stay", true);
            this.contentTxtNode.children[0].position = cc.v3(0, 0, 0);
            this.contentTxtNode.position = cc.v3(this._eventData.txtoffsetx, this._eventData.txtoffsety, 0);
            this.contentTxtNode.children[0].scaleX = 1;
            this.contentTxtNode.children[0].scaleY = 1;
            this.contentTxtNode.children[0].angle = 0;
            this.contentTxtNode.children[0].color = cc.Color.WHITE;
            this.contentTxtNode.children[0].getComponent(cc.Sprite).spriteFrame = this.txtBgSprFrame[0];
            this.guiderRoleNode.scaleX = this._eventData.roleDire == 1 ? -1 : 1;
            console.log("this._eventData.txtDire", this._eventData.txtDire);
            if (this._eventData.txtDire == 0) {
                this.contentTxtNode.children[0].getComponent(cc.Sprite).spriteFrame = this.txtBgSprFrame[1];
                this.contentTxtNode.children[1].angle = 5;
                this.contentTxtNode.children[1].anchorX = 0.5;
                this.contentTxtNode.children[1].anchorY = 0;
                this.contentTxtNode.children[1].position = cc.v3(8, 18);
            } else if (this._eventData.txtDire == 1) {
                this.contentTxtNode.children[1].angle = 5;
                this.contentTxtNode.children[1].anchorX = 0;
                this.contentTxtNode.children[1].anchorY = 1;
                this.contentTxtNode.children[1].position = cc.v3(-50, 0);
                this.contentTxtNode.children[0].position = cc.v3(-10, 0);
            } else if (this._eventData.txtDire == 2) {
                this.contentTxtNode.children[0].scaleX = -1;
                this.contentTxtNode.children[0].color = cc.Color.WHITE;
                this.contentTxtNode.children[0].angle = 10;
                this.contentTxtNode.children[1].angle = 11;
                this.contentTxtNode.children[1].anchorX = 1;
                this.contentTxtNode.children[1].anchorY = 1;
                this.contentTxtNode.children[1].position = cc.v3(15, 3);
            } else if (this._eventData.txtDire == 3) {
                this.contentTxtNode.children[0].scaleX = -1;
                this.contentTxtNode.children[0].scaleY = -1;
                this.contentTxtNode.children[1].anchorX = 1;
                this.contentTxtNode.children[1].anchorY = 0;
                this.contentTxtNode.children[1].angle = 5;
                this.contentTxtNode.children[1].position = cc.v3(70, 0);
                this.contentTxtNode.children[0].position = cc.v3(20, 0);
            } else if (this._eventData.txtDire == 4) {
                this.contentTxtNode.children[0].scaleY = -1;
                this.contentTxtNode.children[0].angle = 10;
                this.contentTxtNode.children[1].anchorX = 0;
                this.contentTxtNode.children[1].anchorY = 0;
                this.contentTxtNode.children[1].angle = 11;
                this.contentTxtNode.children[1].position = cc.v3(-14, -1);
            }
            this.contentTxtNode.children[1].getComponent(cc.RichText).string = "<b><color=#1d3e4c>" + this._eventData.content + "</color></b>";
        }
    }

    private showEffectTips(): void {
        this.effectTipsShow.node.active = true;
        this.effectTipsShow?.play();
        this._attachNodeAddTime = 0;
    }

    private showFingerClickLayer(target: cc.Node, callback: () => void): void {
        if (target) {
            this.maskNode.active = false;
            this.contentNode.active = false;
            this.fingerNode.active = true;
            const a = target.getParent().convertToWorldSpaceAR(target.position);
            this.clickSizeSpr.width = target.width;
            this.clickSizeSpr.height = target.height;
            this.clickSizeSpr.opacity = 0;
            this.fingerNode.x = this.maskNode.getParent().convertToNodeSpaceAR(a).x;
            this.fingerNode.y = this.maskNode.getParent().convertToNodeSpaceAR(a).y;
            this._target = target;
            this._targetcb = callback;
        }
    }

    private onLowGuideClickEvent(): void {
        cc.log("onLowGuideClickEvent");
        this.tips1.active = false;
        this.tips2.active = false;
        if (this._maskClickCb) this._maskClickCb();
    }

    public showBtnMask(eventData: GuideConfig): void {
        this._eventData = eventData;
        if (this._eventData.curEventName) {
            if (this._nextEventName !== eventData.childrenEvent1) {
                this._nextEventName = this._eventData.childrenEvent1;
                MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).addEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
                MvcEventDispatcher.dispatchEvent(DataEvent.GUIDENEWERGUIDE, new DataEvent(this._nextEventName, this._eventData.guideParm));
            }
        } else {
            this._nextEventName = "";
            this.showMaskPanelWithoutBtn();
        }
    }

    private getBtnPosAndCbSucc(event: { data: cc.Node, data2: () => {} }): void {
        if (!this._eventData) {
            this._nextEventName = "";
            console.log("----------------eventData NULL-----------------");
            return;
        }
        MvcEventDispatcher.getInstance(DataEvent.GUIDENEWERGUIDE).removeEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
        if (this._eventData.isShowTipLbl == 1) this.showMaskPanelWithoutBtn();
        this._nextEventName = "";
        this.showMaskPanel(event.data, event.data2);
    }

    public update(deltaTime: number): void {
        if (this._attachNodeAddTime != -1) {
            this._attachNodeAddTime += deltaTime;
            if (this._attachNodeAddTime >= 1.2) this.showEffectTips();
        }
        if (this._nextEventName != "") {
            this.timeTemp += deltaTime;
            if (this.timeTemp > 0.5) {
                MvcEventDispatcher.dispatchEvent(DataEvent.GUIDENEWERGUIDE, new DataEvent(this._nextEventName, this._eventData.guideParm));
                this.timeTemp = 0;
            }
        }
    }
}

export default NewerGuideOp;