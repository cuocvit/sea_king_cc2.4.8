"use strict";
cc._RF.push(module, '3feb8UoQ4RFCZYENrfZQLja', 'GuiderShowTips');
// start-scene/scripts/GuiderShowTips.ts

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
// +-+
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuiderShowTips = /** @class */ (function (_super) {
    __extends(GuiderShowTips, _super);
    function GuiderShowTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guiderRoleNode = null;
        _this.guiderRoleNpcNode = null;
        _this.contentTxtNode = null;
        _this.txtBgSprFrame = [];
        _this.curIndex = 0;
        _this.guideTipsArr = {
            1: {
                roleSkinName: "man5",
                roleDire: 1,
                rolePos: cc.v3(0, 250),
                textPos: cc.v3(0, -223),
                content: "Ngọn hải đăng sẽ cho bạn <color=#aa29dc>một thùng gỗ</c> sau một khoảng thời gian",
                textDire: 0,
                txtColor: 1
            },
            2: {
                roleSkinName: "man2",
                roleDire: 1,
                rolePos: cc.v3(0, -100),
                textPos: cc.v3(0, 350),
                content: "Kích hoạt <color=#aa29dc>cánh tay</c> mới，<color=#aa29dc>tổng hợp</c> chúng!",
                textDire: 0,
                txtColor: 1
            },
            3: {
                roleSkinName: "man5",
                roleDire: 1,
                rolePos: cc.v3(0, 250),
                textPos: cc.v3(0, -223),
                content: "<color=#aa29dc>Bảo vệ</c> hòn đảo chúng ta，dể ngăn chặn cuộc <color=#aa29dc>tấn công</c> của SeaKing khác！",
                textDire: 0,
                txtColor: 1
            },
            4: {
                roleSkinName: "man1",
                roleDire: 1,
                rolePos: cc.v3(0, -100),
                textPos: cc.v3(0, 350),
                content: "Chúng ta có thể thu <color=#aa29dc>tiền thuê nhà</c> từ nhà dân!",
                textDire: 0,
                txtColor: 1
            },
            5: {
                roleSkinName: "man3",
                roleDire: 1,
                rolePos: cc.v3(0, 250),
                textPos: cc.v3(0, -60),
                content: "Nhấp vào ô <color=#aa29dc>màu vàng</c> và chọn vị trí hạ cánh!",
                textDire: 1,
                txtColor: 1
            }
        };
        return _this;
    }
    GuiderShowTips.prototype.onEnable = function () {
        this.curIndex = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key);
        this.showMaskPanelWithoutBtn();
    };
    GuiderShowTips.prototype.showMaskPanelWithoutBtn = function () {
        var tip = this.guideTipsArr[this.curIndex];
        this.guiderRoleNode.position = tip.rolePos;
        this.guiderRoleNpcNode.setSkin(tip.roleSkinName);
        this.guiderRoleNpcNode.addAnimation(0, "stay", true);
        this.contentTxtNode.children[0].position = cc.v3(0, 0, 0);
        this.contentTxtNode.position = tip.textPos;
        this.contentTxtNode.children[0].scaleX = 1;
        this.contentTxtNode.children[0].scaleY = 1;
        this.contentTxtNode.children[0].angle = 0;
        this.contentTxtNode.children[0].color = cc.Color.WHITE;
        this.contentTxtNode.children[0].getComponent(cc.Sprite).spriteFrame = this.txtBgSprFrame[0];
        this.guiderRoleNode.scaleX = tip.roleDire === 1 ? -1 : 1;
        var textDirection = tip.textDire;
        if (textDirection == 0) {
            this.contentTxtNode.children[0].getComponent(cc.Sprite).spriteFrame = this.txtBgSprFrame[1];
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].anchorX = 0.5;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].position = cc.v3(8, 18);
        }
        else if (textDirection == 1) {
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].anchorX = 0;
            this.contentTxtNode.children[1].anchorY = 1;
            this.contentTxtNode.children[1].position = cc.v3(-19, 0);
        }
        else if (textDirection == 2) {
            this.contentTxtNode.children[0].scaleX = -1;
            this.contentTxtNode.children[0].color = cc.Color.WHITE;
            this.contentTxtNode.children[0].angle = 10;
            this.contentTxtNode.children[1].angle = 11;
            this.contentTxtNode.children[1].anchorX = 1;
            this.contentTxtNode.children[1].anchorY = 1;
            this.contentTxtNode.children[1].position = cc.v3(15, 3);
        }
        else if (textDirection == 3) {
            this.contentTxtNode.children[0].scaleX = -1;
            this.contentTxtNode.children[0].scaleY = -1;
            this.contentTxtNode.children[1].anchorX = 1;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].position = cc.v3(21, 0);
        }
        else if (textDirection == 4) {
            this.contentTxtNode.children[0].scaleY = -1;
            this.contentTxtNode.children[0].angle = 10;
            this.contentTxtNode.children[1].anchorX = 0;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].angle = 11;
            this.contentTxtNode.children[1].position = cc.v3(-14, -1);
        }
        var colorTag = tip.txtColor == 1 ? "<b><color=#1d3e4c>" : "<b><color=#ffffff>";
        this.contentTxtNode.children[1].getComponent(cc.RichText).string = colorTag + tip.content + "</color></b>";
    };
    GuiderShowTips.prototype.onDisable = function () { };
    GuiderShowTips.prototype.onClosePanel = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
    };
    __decorate([
        property(cc.Node)
    ], GuiderShowTips.prototype, "guiderRoleNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], GuiderShowTips.prototype, "guiderRoleNpcNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuiderShowTips.prototype, "contentTxtNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GuiderShowTips.prototype, "txtBgSprFrame", void 0);
    GuiderShowTips = __decorate([
        ccclass
    ], GuiderShowTips);
    return GuiderShowTips;
}(cc.Component));
exports.default = GuiderShowTips;

cc._RF.pop();