"use strict";
cc._RF.push(module, 'dc5e16xUp9AkY0FlPwX809+', 'NewerGuideOp');
// start-scene/scripts/NewerGuideOp.ts

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
var MvcEventDispatcher_1 = require("./MvcEventDispatcher");
var DataEvent_1 = require("./DataEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewerGuideOp = /** @class */ (function (_super) {
    __extends(NewerGuideOp, _super);
    function NewerGuideOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maskNode = null;
        _this.maskNodeWid = null;
        _this.maskCirCleNodeWid = null;
        _this.clickEventNode = null;
        _this.guiderNode = null;
        _this.guiderRoleNode = null;
        _this.guiderRoleNpcNode = null;
        _this.contentTxtNode = null;
        _this.txtBgSprFrame = [];
        _this.nodeAddPanel = null;
        _this.effectTipsShow = null;
        _this.contentNode = null;
        _this.guiderStr = null;
        _this.fingerNode = null;
        _this.clickSizeSpr = null;
        _this.fingerClick = null;
        _this.sanjiaoNode = null;
        _this.maskBg = null;
        _this.faceSprite = null;
        _this.roleLizi = null;
        _this.roleLizi1 = null;
        _this.tips1 = null;
        _this.tips2 = null;
        _this._attachNodeAddTime = -1;
        _this._attachNode = null;
        _this._attachNodeParent = null;
        _this._eventData = null;
        _this._guideType = 0;
        _this._nextEventName = "";
        _this._maskClickCb = null;
        _this.timeTemp = 0;
        _this._target = null;
        _this._targetcb = null;
        return _this;
    }
    NewerGuideOp.prototype.onEnable = function () {
        var _a;
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.NEWERGUIDEOPHIDE, this.hidePanel, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.NEWERGUIDEOPSHOW, this.showPanel, this);
        this.maskNode.active = false;
        this.guiderNode.active = false;
        this.tips1.active = false;
        this.tips2.active = false;
        var guide = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GETCOINOP.key);
        this.showBtnMask(guide);
        if (this._eventData.isShowTipLbl == 1) {
            this.roleLizi && this.roleLizi.resetSystem();
            (_a = this.roleLizi1) === null || _a === void 0 ? void 0 : _a.resetSystem();
        }
    };
    NewerGuideOp.prototype.onDisable = function () {
        var _a;
        this._maskClickCb = null;
        if (this._attachNode)
            this.returnAttachNode();
        this._attachNode = null;
        this._attachNodeParent = null;
        if (this._eventData) {
            MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
            this._eventData = null;
        }
        (_a = this.effectTipsShow) === null || _a === void 0 ? void 0 : _a.targetOff(this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.NEWERGUIDEOPHIDE, this.hidePanel, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.NEWERGUIDEOPSHOW, this.showPanel, this);
    };
    NewerGuideOp.prototype.returnAttachNode = function () {
        var _a;
        if (this._attachNode) {
            this._attachNode.removeFromParent(false);
            (_a = this._attachNodeParent) === null || _a === void 0 ? void 0 : _a.addChild(this._attachNode);
            this._attachNode = null;
            this._attachNodeParent = null;
        }
    };
    NewerGuideOp.prototype.hidePanel = function () {
        this.node.opacity = 0;
        this.clickSizeSpr.scale = 0;
    };
    NewerGuideOp.prototype.showPanel = function () {
        this.node.opacity = 255;
        this.clickSizeSpr.scale = 1;
    };
    NewerGuideOp.prototype.onMaskClickEvent = function () {
        var _this = this;
        var _a, _b, _c, _d;
        cc.log("onMaskClickEvent");
        this.tips1.active = false;
        this.tips2.active = false;
        if (this._attachNode) {
            this._attachNode.removeFromParent(false);
            (_a = this._attachNodeParent) === null || _a === void 0 ? void 0 : _a.addChild(this._attachNode);
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
            (_b = this.guiderRoleNode) === null || _b === void 0 ? void 0 : _b.stopAllActions();
            (_c = this.guiderRoleNode) === null || _c === void 0 ? void 0 : _c.runAction(cc.sequence(cc.moveTo(0.5, this._eventData.dispearPos, (_d = this.guiderRoleNode) === null || _d === void 0 ? void 0 : _d.y), cc.callFunc(function () {
                _this._attachNodeAddTime = -1;
                GameManager_1.gm.newerGuideMgr.setRuningIndex();
            })));
        }
        else {
            this._attachNodeAddTime = -1;
            GameManager_1.gm.newerGuideMgr.setRuningIndex();
        }
    };
    NewerGuideOp.prototype.onClickMask = function () {
        var eventNumber = parseFloat(this._eventData.curEventName);
        if (!isNaN(eventNumber) && eventNumber > 0) {
            this.onMaskClickEvent();
        }
    };
    NewerGuideOp.prototype.resetMaskSizeAndcb = function () {
        this.contentNode.active = false;
        this.fingerNode.active = false;
        this.fingerClick.active = false;
        this.clickEventNode.active = false;
        if (this._maskClickCb) {
            this._maskClickCb = null;
        }
    };
    NewerGuideOp.prototype.showMaskPanel = function (target, callback) {
        if (target && target.getParent() != this.nodeAddPanel) {
            if (this._attachNode)
                this.returnAttachNode();
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
            var a = target.getParent().getParent().convertToWorldSpaceAR(target.getParent().position);
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
    };
    NewerGuideOp.prototype.showMaskPanelWithoutBtn = function () {
        var _a, _b;
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
            (_a = this.guiderRoleNpcNode) === null || _a === void 0 ? void 0 : _a.setSkin(this._eventData.skinName);
            (_b = this.guiderRoleNpcNode) === null || _b === void 0 ? void 0 : _b.addAnimation(0, "stay", true);
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
            }
            else if (this._eventData.txtDire == 1) {
                this.contentTxtNode.children[1].angle = 5;
                this.contentTxtNode.children[1].anchorX = 0;
                this.contentTxtNode.children[1].anchorY = 1;
                this.contentTxtNode.children[1].position = cc.v3(-50, 0);
                this.contentTxtNode.children[0].position = cc.v3(-10, 0);
            }
            else if (this._eventData.txtDire == 2) {
                this.contentTxtNode.children[0].scaleX = -1;
                this.contentTxtNode.children[0].color = cc.Color.WHITE;
                this.contentTxtNode.children[0].angle = 10;
                this.contentTxtNode.children[1].angle = 11;
                this.contentTxtNode.children[1].anchorX = 1;
                this.contentTxtNode.children[1].anchorY = 1;
                this.contentTxtNode.children[1].position = cc.v3(15, 3);
            }
            else if (this._eventData.txtDire == 3) {
                this.contentTxtNode.children[0].scaleX = -1;
                this.contentTxtNode.children[0].scaleY = -1;
                this.contentTxtNode.children[1].anchorX = 1;
                this.contentTxtNode.children[1].anchorY = 0;
                this.contentTxtNode.children[1].angle = 5;
                this.contentTxtNode.children[1].position = cc.v3(70, 0);
                this.contentTxtNode.children[0].position = cc.v3(20, 0);
            }
            else if (this._eventData.txtDire == 4) {
                this.contentTxtNode.children[0].scaleY = -1;
                this.contentTxtNode.children[0].angle = 10;
                this.contentTxtNode.children[1].anchorX = 0;
                this.contentTxtNode.children[1].anchorY = 0;
                this.contentTxtNode.children[1].angle = 11;
                this.contentTxtNode.children[1].position = cc.v3(-14, -1);
            }
            this.contentTxtNode.children[1].getComponent(cc.RichText).string = "<b><color=#1d3e4c>" + this._eventData.content + "</color></b>";
        }
    };
    NewerGuideOp.prototype.showEffectTips = function () {
        var _a;
        this.effectTipsShow.node.active = true;
        (_a = this.effectTipsShow) === null || _a === void 0 ? void 0 : _a.play();
        this._attachNodeAddTime = 0;
    };
    NewerGuideOp.prototype.showFingerClickLayer = function (target, callback) {
        if (target) {
            this.maskNode.active = false;
            this.contentNode.active = false;
            this.fingerNode.active = true;
            var a = target.getParent().convertToWorldSpaceAR(target.position);
            this.clickSizeSpr.width = target.width;
            this.clickSizeSpr.height = target.height;
            this.clickSizeSpr.opacity = 0;
            this.fingerNode.x = this.maskNode.getParent().convertToNodeSpaceAR(a).x;
            this.fingerNode.y = this.maskNode.getParent().convertToNodeSpaceAR(a).y;
            this._target = target;
            this._targetcb = callback;
        }
    };
    NewerGuideOp.prototype.onLowGuideClickEvent = function () {
        cc.log("onLowGuideClickEvent");
        this.tips1.active = false;
        this.tips2.active = false;
        if (this._maskClickCb)
            this._maskClickCb();
    };
    NewerGuideOp.prototype.showBtnMask = function (eventData) {
        this._eventData = eventData;
        if (this._eventData.curEventName) {
            if (this._nextEventName !== eventData.childrenEvent1) {
                this._nextEventName = this._eventData.childrenEvent1;
                MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
                MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(this._nextEventName, this._eventData.guideParm));
            }
        }
        else {
            this._nextEventName = "";
            this.showMaskPanelWithoutBtn();
        }
    };
    NewerGuideOp.prototype.getBtnPosAndCbSucc = function (event) {
        if (!this._eventData) {
            this._nextEventName = "";
            console.log("----------------eventData NULL-----------------");
            return;
        }
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(this._eventData.childrenEvent2, this.getBtnPosAndCbSucc, this);
        if (this._eventData.isShowTipLbl == 1)
            this.showMaskPanelWithoutBtn();
        this._nextEventName = "";
        this.showMaskPanel(event.data, event.data2);
    };
    NewerGuideOp.prototype.update = function (deltaTime) {
        if (this._attachNodeAddTime != -1) {
            this._attachNodeAddTime += deltaTime;
            if (this._attachNodeAddTime >= 1.2)
                this.showEffectTips();
        }
        if (this._nextEventName != "") {
            this.timeTemp += deltaTime;
            if (this.timeTemp > 0.5) {
                MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(this._nextEventName, this._eventData.guideParm));
                this.timeTemp = 0;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "maskNodeWid", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "maskCirCleNodeWid", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "clickEventNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "guiderNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "guiderRoleNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], NewerGuideOp.prototype, "guiderRoleNpcNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "contentTxtNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NewerGuideOp.prototype, "txtBgSprFrame", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "nodeAddPanel", void 0);
    __decorate([
        property(cc.Animation)
    ], NewerGuideOp.prototype, "effectTipsShow", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Label)
    ], NewerGuideOp.prototype, "guiderStr", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "fingerNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "clickSizeSpr", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "fingerClick", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "sanjiaoNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "maskBg", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewerGuideOp.prototype, "faceSprite", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], NewerGuideOp.prototype, "roleLizi", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], NewerGuideOp.prototype, "roleLizi1", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "tips1", void 0);
    __decorate([
        property(cc.Node)
    ], NewerGuideOp.prototype, "tips2", void 0);
    NewerGuideOp = __decorate([
        ccclass
    ], NewerGuideOp);
    return NewerGuideOp;
}(cc.Component));
exports.default = NewerGuideOp;

cc._RF.pop();