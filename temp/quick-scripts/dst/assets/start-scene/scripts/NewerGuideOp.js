
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NewerGuideOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5ld2VyR3VpZGVPcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YsNkNBQW1DO0FBQ25DLDJEQUEwRDtBQUMxRCx5Q0FBd0M7QUFHbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkIsZ0NBQVk7SUFBdkM7UUFBQSxxRUFzVkM7UUFwVlcsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBR25DLHVCQUFpQixHQUFtQixJQUFJLENBQUM7UUFHekMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsdUJBQWlCLEdBQXVCLElBQUksQ0FBQztRQUc3QyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBR3JDLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUdwQyxvQkFBYyxHQUF3QixJQUFJLENBQUM7UUFHM0MsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBR25DLGVBQVMsR0FBb0IsSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBR25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxZQUFNLEdBQW1CLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsY0FBUSxHQUE2QixJQUFJLENBQUM7UUFHMUMsZUFBUyxHQUE2QixJQUFJLENBQUM7UUFHM0MsV0FBSyxHQUFtQixJQUFJLENBQUM7UUFH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b3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTXZjRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi9NdmNFdmVudERpc3BhdGNoZXInO1xyXG5pbXBvcnQgeyBEYXRhRXZlbnQgfSBmcm9tICcuL0RhdGFFdmVudCc7XHJcbmltcG9ydCB7IEd1aWRlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvZ3VpZGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE5ld2VyR3VpZGVPcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFza05vZGVXaWQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFza0NpckNsZU5vZGVXaWQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2xpY2tFdmVudE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZ3VpZGVyTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBndWlkZXJSb2xlTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHByaXZhdGUgZ3VpZGVyUm9sZU5wY05vZGU6IHNwLlNrZWxldG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvbnRlbnRUeHROb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBwcml2YXRlIHR4dEJnU3ByRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbm9kZUFkZFBhbmVsOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICAgIHByaXZhdGUgZWZmZWN0VGlwc1Nob3c6IGNjLkFuaW1hdGlvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBjb250ZW50Tm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgZ3VpZGVyU3RyOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBmaW5nZXJOb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNsaWNrU2l6ZVNwcjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBmaW5nZXJDbGljazogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzYW5qaWFvTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtYXNrQmc6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBmYWNlU3ByaXRlOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUGFydGljbGVTeXN0ZW0pXHJcbiAgICBwcml2YXRlIHJvbGVMaXppOiBjYy5QYXJ0aWNsZVN5c3RlbSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QYXJ0aWNsZVN5c3RlbSlcclxuICAgIHByaXZhdGUgcm9sZUxpemkxOiBjYy5QYXJ0aWNsZVN5c3RlbSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0aXBzMTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0aXBzMjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2F0dGFjaE5vZGVBZGRUaW1lOiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX2F0dGFjaE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2F0dGFjaE5vZGVQYXJlbnQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2V2ZW50RGF0YTogR3VpZGVDb25maWcgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZ3VpZGVUeXBlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbmV4dEV2ZW50TmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX21hc2tDbGlja0NiOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGltZVRlbXA6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF90YXJnZXQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3RhcmdldGNiOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgTXZjRXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKERhdGFFdmVudC5HVUlERU5FV0VSR1VJREUpLmFkZEV2ZW50TGlzdGVuZXIoRGF0YUV2ZW50Lk5FV0VSR1VJREVPUEhJREUsIHRoaXMuaGlkZVBhbmVsLCB0aGlzKTtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSkuYWRkRXZlbnRMaXN0ZW5lcihEYXRhRXZlbnQuTkVXRVJHVUlERU9QU0hPVywgdGhpcy5zaG93UGFuZWwsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ndWlkZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGlwczEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aXBzMi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgZ3VpZGUgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUQ09JTk9QLmtleSkgYXMgR3VpZGVDb25maWc7XHJcbiAgICAgICAgdGhpcy5zaG93QnRuTWFzayhndWlkZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RGF0YS5pc1Nob3dUaXBMYmwgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVMaXppICYmIHRoaXMucm9sZUxpemkucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5yb2xlTGl6aTE/LnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFza0NsaWNrQ2IgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9hdHRhY2hOb2RlKSB0aGlzLnJldHVybkF0dGFjaE5vZGUoKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hdHRhY2hOb2RlUGFyZW50ID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fZXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZShEYXRhRXZlbnQuR1VJREVORVdFUkdVSURFKS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuX2V2ZW50RGF0YS5jaGlsZHJlbkV2ZW50MiwgdGhpcy5nZXRCdG5Qb3NBbmRDYlN1Y2MsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudERhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVmZmVjdFRpcHNTaG93Py50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgTXZjRXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKERhdGFFdmVudC5HVUlERU5FV0VSR1VJREUpLnJlbW92ZUV2ZW50TGlzdGVuZXIoRGF0YUV2ZW50Lk5FV0VSR1VJREVPUEhJREUsIHRoaXMuaGlkZVBhbmVsLCB0aGlzKTtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSkucmVtb3ZlRXZlbnRMaXN0ZW5lcihEYXRhRXZlbnQuTkVXRVJHVUlERU9QU0hPVywgdGhpcy5zaG93UGFuZWwsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0dXJuQXR0YWNoTm9kZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYXR0YWNoTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hOb2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hOb2RlUGFyZW50Py5hZGRDaGlsZCh0aGlzLl9hdHRhY2hOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGVQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5jbGlja1NpemVTcHIuc2NhbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1BhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuY2xpY2tTaXplU3ByLnNjYWxlID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWFza0NsaWNrRXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgY2MubG9nKFwib25NYXNrQ2xpY2tFdmVudFwiKTtcclxuICAgICAgICB0aGlzLnRpcHMxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGlwczIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F0dGFjaE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoTm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoTm9kZVBhcmVudD8uYWRkQ2hpbGQodGhpcy5fYXR0YWNoTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hOb2RlUGFyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2tDbGlja0NiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tDbGlja0NiKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRNYXNrU2l6ZUFuZGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudERhdGEuZGlzcGVhclBvcykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnROb2RlLndpZHRoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0V2ZW50Tm9kZS5oZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlclJvbGVOb2RlPy5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlclJvbGVOb2RlPy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuNSwgdGhpcy5fZXZlbnREYXRhLmRpc3BlYXJQb3MsIHRoaXMuZ3VpZGVyUm9sZU5vZGU/LnkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2hOb2RlQWRkVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZ20ubmV3ZXJHdWlkZU1nci5zZXRSdW5pbmdJbmRleCgpO1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGVBZGRUaW1lID0gLTE7XHJcbiAgICAgICAgICAgIGdtLm5ld2VyR3VpZGVNZ3Iuc2V0UnVuaW5nSW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrTWFzaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBldmVudE51bWJlciA9IHBhcnNlRmxvYXQodGhpcy5fZXZlbnREYXRhLmN1ckV2ZW50TmFtZSk7XHJcbiAgICAgICAgaWYgKCFpc05hTihldmVudE51bWJlcikgJiYgZXZlbnROdW1iZXIgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25NYXNrQ2xpY2tFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0TWFza1NpemVBbmRjYigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmluZ2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpbmdlckNsaWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tFdmVudE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2tDbGlja0NiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tDbGlja0NiID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TWFza1BhbmVsKHRhcmdldDogY2MuTm9kZSwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRQYXJlbnQoKSAhPSB0aGlzLm5vZGVBZGRQYW5lbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXR0YWNoTm9kZSkgdGhpcy5yZXR1cm5BdHRhY2hOb2RlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Y2IgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5tYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZ2VyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlV2lkLndpZHRoID0gdGhpcy5fZXZlbnREYXRhLmNpcmNsZVdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlV2lkLmhlaWdodCA9IHRoaXMuX2V2ZW50RGF0YS5jaXJjbGVXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5tYXNrQ2lyQ2xlTm9kZVdpZC53aWR0aCA9IHRoaXMubWFza05vZGVXaWQud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMubWFza0NpckNsZU5vZGVXaWQuaGVpZ2h0ID0gdGhpcy5tYXNrTm9kZVdpZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tFdmVudE5vZGUud2lkdGggPSB0aGlzLm1hc2tOb2RlV2lkLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnROb2RlLmhlaWdodCA9IHRoaXMubWFza05vZGVXaWQuaGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCBhID0gdGFyZ2V0LmdldFBhcmVudCgpLmdldFBhcmVudCgpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0YXJnZXQuZ2V0UGFyZW50KCkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlLnggPSB0aGlzLm1hc2tOb2RlLmdldFBhcmVudCgpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGEpLng7XHJcbiAgICAgICAgICAgIHRoaXMubWFza05vZGUueSA9IHRoaXMubWFza05vZGUuZ2V0UGFyZW50KCkuY29udmVydFRvTm9kZVNwYWNlQVIoYSkueTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0V2ZW50Tm9kZS5wb3NpdGlvbiA9IHRoaXMubWFza05vZGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGUgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGVQYXJlbnQgPSB0YXJnZXQuZ2V0UGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlQWRkUGFuZWwuYWRkQ2hpbGQodGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlQWRkUGFuZWwuc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlQWRkUGFuZWwuc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RUaXBzU2hvdy5ub2RlLnggPSArdGFyZ2V0Lng7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0VGlwc1Nob3cubm9kZS55ID0gK3RhcmdldC55O1xyXG4gICAgICAgICAgICB0aGlzLmZpbmdlck5vZGUueCA9IHRoaXMuZmluZ2VyTm9kZS54ICsgNDA7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tDbGlja0NiID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd01hc2tQYW5lbFdpdGhvdXRCdG4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ndWlkZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50RGF0YS5pc1Nob3dUaXBMYmwgPT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZXZlbnREYXRhLmd1aWRlSUQgPT0gMiAmJiB0aGlzLl9ldmVudERhdGEuZ3VpZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHMxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHMxLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudERhdGEuZ3VpZGVJRCA9PSAxNSAmJiB0aGlzLl9ldmVudERhdGEuZ3VpZGVJbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHMyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHMyLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tFdmVudE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0V2ZW50Tm9kZS53aWR0aCA9IDcyMDtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0V2ZW50Tm9kZS5oZWlnaHQgPSAxNTgwO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnROb2RlLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlclJvbGVOb2RlLnBvc2l0aW9uID0gY2MudjModGhpcy5fZXZlbnREYXRhLnJvbGVvZmZzZXR4LCB0aGlzLl9ldmVudERhdGEucm9sZW9mZnNldHksIDApO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlclJvbGVOcGNOb2RlPy5zZXRTa2luKHRoaXMuX2V2ZW50RGF0YS5za2luTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVyUm9sZU5wY05vZGU/LmFkZEFuaW1hdGlvbigwLCBcInN0YXlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX2V2ZW50RGF0YS50eHRvZmZzZXR4LCB0aGlzLl9ldmVudERhdGEudHh0b2Zmc2V0eSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5zY2FsZVkgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmFuZ2xlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50eHRCZ1NwckZyYW1lWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlclJvbGVOb2RlLnNjYWxlWCA9IHRoaXMuX2V2ZW50RGF0YS5yb2xlRGlyZSA9PSAxID8gLTEgOiAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuX2V2ZW50RGF0YS50eHREaXJlXCIsIHRoaXMuX2V2ZW50RGF0YS50eHREaXJlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50RGF0YS50eHREaXJlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnR4dEJnU3ByRnJhbWVbMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuZ2xlID0gNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWCA9IDAuNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoOCwgMTgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2V2ZW50RGF0YS50eHREaXJlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5nbGUgPSA1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoLTUwLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24gPSBjYy52MygtMTAsIDApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2V2ZW50RGF0YS50eHREaXJlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVYID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmFuZ2xlID0gMTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuZ2xlID0gMTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclggPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JZID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0ucG9zaXRpb24gPSBjYy52MygxNSwgMyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZXZlbnREYXRhLnR4dERpcmUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVZID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclggPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JZID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5nbGUgPSA1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5wb3NpdGlvbiA9IGNjLnYzKDcwLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24gPSBjYy52MygyMCwgMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZXZlbnREYXRhLnR4dERpcmUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5zY2FsZVkgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uYW5nbGUgPSAxMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmdsZSA9IDExO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5wb3NpdGlvbiA9IGNjLnYzKC0xNCwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBcIjxiPjxjb2xvcj0jMWQzZTRjPlwiICsgdGhpcy5fZXZlbnREYXRhLmNvbnRlbnQgKyBcIjwvY29sb3I+PC9iPlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dFZmZlY3RUaXBzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0VGlwc1Nob3cubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0VGlwc1Nob3c/LnBsYXkoKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hOb2RlQWRkVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RmluZ2VyQ2xpY2tMYXllcih0YXJnZXQ6IGNjLk5vZGUsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmdlck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgYSA9IHRhcmdldC5nZXRQYXJlbnQoKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja1NpemVTcHIud2lkdGggPSB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTaXplU3ByLmhlaWdodCA9IHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTaXplU3ByLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmdlck5vZGUueCA9IHRoaXMubWFza05vZGUuZ2V0UGFyZW50KCkuY29udmVydFRvTm9kZVNwYWNlQVIoYSkueDtcclxuICAgICAgICAgICAgdGhpcy5maW5nZXJOb2RlLnkgPSB0aGlzLm1hc2tOb2RlLmdldFBhcmVudCgpLmNvbnZlcnRUb05vZGVTcGFjZUFSKGEpLnk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Y2IgPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxvd0d1aWRlQ2xpY2tFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICBjYy5sb2coXCJvbkxvd0d1aWRlQ2xpY2tFdmVudFwiKTtcclxuICAgICAgICB0aGlzLnRpcHMxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGlwczIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hc2tDbGlja0NiKSB0aGlzLl9tYXNrQ2xpY2tDYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QnRuTWFzayhldmVudERhdGE6IEd1aWRlQ29uZmlnKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnREYXRhID0gZXZlbnREYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudERhdGEuY3VyRXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0RXZlbnROYW1lICE9PSBldmVudERhdGEuY2hpbGRyZW5FdmVudDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25leHRFdmVudE5hbWUgPSB0aGlzLl9ldmVudERhdGEuY2hpbGRyZW5FdmVudDE7XHJcbiAgICAgICAgICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSkuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLl9ldmVudERhdGEuY2hpbGRyZW5FdmVudDIsIHRoaXMuZ2V0QnRuUG9zQW5kQ2JTdWNjLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KERhdGFFdmVudC5HVUlERU5FV0VSR1VJREUsIG5ldyBEYXRhRXZlbnQodGhpcy5fbmV4dEV2ZW50TmFtZSwgdGhpcy5fZXZlbnREYXRhLmd1aWRlUGFybSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbmV4dEV2ZW50TmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01hc2tQYW5lbFdpdGhvdXRCdG4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCdG5Qb3NBbmRDYlN1Y2MoZXZlbnQ6IHsgZGF0YTogY2MuTm9kZSwgZGF0YTI6ICgpID0+IHt9IH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uZXh0RXZlbnROYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tZXZlbnREYXRhIE5VTEwtLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLl9ldmVudERhdGEuY2hpbGRyZW5FdmVudDIsIHRoaXMuZ2V0QnRuUG9zQW5kQ2JTdWNjLCB0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5fZXZlbnREYXRhLmlzU2hvd1RpcExibCA9PSAxKSB0aGlzLnNob3dNYXNrUGFuZWxXaXRob3V0QnRuKCk7XHJcbiAgICAgICAgdGhpcy5fbmV4dEV2ZW50TmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zaG93TWFza1BhbmVsKGV2ZW50LmRhdGEsIGV2ZW50LmRhdGEyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F0dGFjaE5vZGVBZGRUaW1lICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaE5vZGVBZGRUaW1lICs9IGRlbHRhVGltZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGFjaE5vZGVBZGRUaW1lID49IDEuMikgdGhpcy5zaG93RWZmZWN0VGlwcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbmV4dEV2ZW50TmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVRlbXAgKz0gZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lVGVtcCA+IDAuNSkge1xyXG4gICAgICAgICAgICAgICAgTXZjRXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSwgbmV3IERhdGFFdmVudCh0aGlzLl9uZXh0RXZlbnROYW1lLCB0aGlzLl9ldmVudERhdGEuZ3VpZGVQYXJtKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZW1wID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV3ZXJHdWlkZU9wOyJdfQ==