
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GuiderShowTips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEd1aWRlclNob3dUaXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFhNUM7SUFBNkIsa0NBQVk7SUFBekM7UUFBQSxxRUE4SEM7UUE1SFcsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLHVCQUFpQixHQUF1QixJQUFJLENBQUM7UUFHN0Msb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLG1CQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUVyQyxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGtCQUFZLEdBQThCO1lBQzlDLENBQUMsRUFBRTtnQkFDQyxZQUFZLEVBQUUsTUFBTTtnQkFDcEIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsbUZBQW1GO2dCQUM1RixRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUUsQ0FBQzthQUNkO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLFlBQVksRUFBRSxNQUFNO2dCQUNwQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSw4RUFBOEU7Z0JBQ3ZGLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFFBQVEs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QUM7WUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO1FBQ2pGLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUMvRyxDQUFDO0lBRVMsa0NBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUV2QixxQ0FBWSxHQUFwQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQTNIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUM0QjtJQUc5QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzZEQUMrQjtJQUdyRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUM0QjtJQUc5QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5REFDa0I7SUFYM0MsY0FBYztRQURuQixPQUFPO09BQ0YsY0FBYyxDQThIbkI7SUFBRCxxQkFBQztDQTlIRCxBQThIQyxDQTlINEIsRUFBRSxDQUFDLFNBQVMsR0E4SHhDO0FBRUQsa0JBQWUsY0FBYyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuaW50ZXJmYWNlIEd1aWRlVGlwcyB7XHJcbiAgICByb2xlU2tpbk5hbWU6IHN0cmluZztcclxuICAgIHJvbGVEaXJlOiBudW1iZXI7XHJcbiAgICByb2xlUG9zOiBjYy5WZWMzO1xyXG4gICAgdGV4dFBvczogY2MuVmVjMztcclxuICAgIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIHRleHREaXJlOiBudW1iZXI7XHJcbiAgICB0eHRDb2xvcjogbnVtYmVyXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEd1aWRlclNob3dUaXBzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBndWlkZXJSb2xlTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHByaXZhdGUgZ3VpZGVyUm9sZU5wY05vZGU6IHNwLlNrZWxldG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvbnRlbnRUeHROb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBwcml2YXRlIHR4dEJnU3ByRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGN1ckluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBndWlkZVRpcHNBcnI6IFJlY29yZDxudW1iZXIsIEd1aWRlVGlwcz4gPSB7XHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICByb2xlU2tpbk5hbWU6IFwibWFuNVwiLFxyXG4gICAgICAgICAgICByb2xlRGlyZTogMSxcclxuICAgICAgICAgICAgcm9sZVBvczogY2MudjMoMCwgMjUwKSxcclxuICAgICAgICAgICAgdGV4dFBvczogY2MudjMoMCwgLTIyMyksXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiTmfhu41uIGjhuqNpIMSRxINuZyBz4bq9IGNobyBi4bqhbiA8Y29sb3I9I2FhMjlkYz5t4buZdCB0aMO5bmcgZ+G7lzwvYz4gc2F1IG3hu5l0IGtob+G6o25nIHRo4budaSBnaWFuXCIsXHJcbiAgICAgICAgICAgIHRleHREaXJlOiAwLFxyXG4gICAgICAgICAgICB0eHRDb2xvcjogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICByb2xlU2tpbk5hbWU6IFwibWFuMlwiLFxyXG4gICAgICAgICAgICByb2xlRGlyZTogMSxcclxuICAgICAgICAgICAgcm9sZVBvczogY2MudjMoMCwgLTEwMCksXHJcbiAgICAgICAgICAgIHRleHRQb3M6IGNjLnYzKDAsIDM1MCksXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiS8OtY2ggaG/huqF0IDxjb2xvcj0jYWEyOWRjPmPDoW5oIHRheTwvYz4gbeG7m2nvvIw8Y29sb3I9I2FhMjlkYz504buVbmcgaOG7o3A8L2M+IGNow7puZyFcIixcclxuICAgICAgICAgICAgdGV4dERpcmU6IDAsXHJcbiAgICAgICAgICAgIHR4dENvbG9yOiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICAzOiB7XHJcbiAgICAgICAgICAgIHJvbGVTa2luTmFtZTogXCJtYW41XCIsXHJcbiAgICAgICAgICAgIHJvbGVEaXJlOiAxLFxyXG4gICAgICAgICAgICByb2xlUG9zOiBjYy52MygwLCAyNTApLFxyXG4gICAgICAgICAgICB0ZXh0UG9zOiBjYy52MygwLCAtMjIzKSxcclxuICAgICAgICAgICAgY29udGVudDogXCI8Y29sb3I9I2FhMjlkYz5C4bqjbyB24buHPC9jPiBow7JuIMSR4bqjbyBjaMO6bmcgdGHvvIxk4buDIG5nxINuIGNo4bq3biBjdeG7mWMgPGNvbG9yPSNhYTI5ZGM+dOG6pW4gY8O0bmc8L2M+IGPhu6dhIFNlYUtpbmcga2jDoWPvvIFcIixcclxuICAgICAgICAgICAgdGV4dERpcmU6IDAsXHJcbiAgICAgICAgICAgIHR4dENvbG9yOiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICA0OiB7XHJcbiAgICAgICAgICAgIHJvbGVTa2luTmFtZTogXCJtYW4xXCIsXHJcbiAgICAgICAgICAgIHJvbGVEaXJlOiAxLFxyXG4gICAgICAgICAgICByb2xlUG9zOiBjYy52MygwLCAtMTAwKSxcclxuICAgICAgICAgICAgdGV4dFBvczogY2MudjMoMCwgMzUwKSxcclxuICAgICAgICAgICAgY29udGVudDogXCJDaMO6bmcgdGEgY8OzIHRo4buDIHRodSA8Y29sb3I9I2FhMjlkYz50aeG7gW4gdGh1w6ogbmjDoDwvYz4gdOG7qyBuaMOgIGTDom4hXCIsXHJcbiAgICAgICAgICAgIHRleHREaXJlOiAwLFxyXG4gICAgICAgICAgICB0eHRDb2xvcjogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICByb2xlU2tpbk5hbWU6IFwibWFuM1wiLFxyXG4gICAgICAgICAgICByb2xlRGlyZTogMSxcclxuICAgICAgICAgICAgcm9sZVBvczogY2MudjMoMCwgMjUwKSxcclxuICAgICAgICAgICAgdGV4dFBvczogY2MudjMoMCwgLTYwKSxcclxuICAgICAgICAgICAgY29udGVudDogXCJOaOG6pXAgdsOgbyDDtCA8Y29sb3I9I2FhMjlkYz5tw6B1IHbDoG5nPC9jPiB2w6AgY2jhu41uIHbhu4sgdHLDrSBo4bqhIGPDoW5oIVwiLFxyXG4gICAgICAgICAgICB0ZXh0RGlyZTogMSxcclxuICAgICAgICAgICAgdHh0Q29sb3I6IDFcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gZ20udWkuZ2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdVSURFX1NIT1dfVElQU19PUC5rZXkpIGFzIG51bWJlcjtcclxuICAgICAgICB0aGlzLnNob3dNYXNrUGFuZWxXaXRob3V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93TWFza1BhbmVsV2l0aG91dEJ0bigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aXAgPSB0aGlzLmd1aWRlVGlwc0Fyclt0aGlzLmN1ckluZGV4XTtcclxuICAgICAgICB0aGlzLmd1aWRlclJvbGVOb2RlLnBvc2l0aW9uID0gdGlwLnJvbGVQb3M7XHJcbiAgICAgICAgdGhpcy5ndWlkZXJSb2xlTnBjTm9kZS5zZXRTa2luKHRpcC5yb2xlU2tpbk5hbWUpO1xyXG4gICAgICAgIHRoaXMuZ3VpZGVyUm9sZU5wY05vZGUuYWRkQW5pbWF0aW9uKDAsIFwic3RheVwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5wb3NpdGlvbiA9IHRpcC50ZXh0UG9zO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5hbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblswXS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnR4dEJnU3ByRnJhbWVbMF07XHJcbiAgICAgICAgdGhpcy5ndWlkZXJSb2xlTm9kZS5zY2FsZVggPSB0aXAucm9sZURpcmUgPT09IDEgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHREaXJlY3Rpb24gPSB0aXAudGV4dERpcmU7XHJcbiAgICAgICAgaWYgKHRleHREaXJlY3Rpb24gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50eHRCZ1NwckZyYW1lWzFdO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuZ2xlID0gNTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JYID0gMC41O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoOCwgMTgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dERpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5nbGUgPSA1O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclkgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoLTE5LCAwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRleHREaXJlY3Rpb24gPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzBdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uYW5nbGUgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmdsZSA9IDExO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclggPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLmFuY2hvclkgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoMTUsIDMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dERpcmVjdGlvbiA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVYID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVZID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5jaG9yWSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMV0uYW5nbGUgPSA1O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoMjEsIDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dERpcmVjdGlvbiA9PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uc2NhbGVZID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dE5vZGUuY2hpbGRyZW5bMF0uYW5nbGUgPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmNob3JZID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5hbmdsZSA9IDExO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeHROb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uID0gY2MudjMoLTE0LCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb2xvclRhZyA9IHRpcC50eHRDb2xvciA9PSAxID8gXCI8Yj48Y29sb3I9IzFkM2U0Yz5cIiA6IFwiPGI+PGNvbG9yPSNmZmZmZmY+XCI7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0Tm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGNvbG9yVGFnICsgdGlwLmNvbnRlbnQgKyBcIjwvY29sb3I+PC9iPlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5HVUlERV9TSE9XX1RJUFNfT1ApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHdWlkZXJTaG93VGlwczsiXX0=