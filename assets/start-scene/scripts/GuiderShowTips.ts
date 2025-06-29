// +-+
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

interface GuideTips {
    roleSkinName: string;
    roleDire: number;
    rolePos: cc.Vec3;
    textPos: cc.Vec3;
    content: string;
    textDire: number;
    txtColor: number
}

@ccclass
class GuiderShowTips extends cc.Component {
    @property(cc.Node)
    private guiderRoleNode: cc.Node | null = null;

    @property(sp.Skeleton)
    private guiderRoleNpcNode: sp.Skeleton | null = null;

    @property(cc.Node)
    private contentTxtNode: cc.Node | null = null;

    @property([cc.SpriteFrame])
    private txtBgSprFrame: cc.SpriteFrame[] = [];

    private curIndex: number = 0;
    private guideTipsArr: Record<number, GuideTips> = {
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

    protected onEnable(): void {
        this.curIndex = gm.ui.get_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key) as number;
        this.showMaskPanelWithoutBtn();
    }

    private showMaskPanelWithoutBtn(): void {
        const tip = this.guideTipsArr[this.curIndex];
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

        const textDirection = tip.textDire;
        if (textDirection == 0) {
            this.contentTxtNode.children[0].getComponent(cc.Sprite).spriteFrame = this.txtBgSprFrame[1];
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].anchorX = 0.5;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].position = cc.v3(8, 18);
        } else if (textDirection == 1) {
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].anchorX = 0;
            this.contentTxtNode.children[1].anchorY = 1;
            this.contentTxtNode.children[1].position = cc.v3(-19, 0);
        } else if (textDirection == 2) {
            this.contentTxtNode.children[0].scaleX = -1;
            this.contentTxtNode.children[0].color = cc.Color.WHITE;
            this.contentTxtNode.children[0].angle = 10;
            this.contentTxtNode.children[1].angle = 11;
            this.contentTxtNode.children[1].anchorX = 1;
            this.contentTxtNode.children[1].anchorY = 1;
            this.contentTxtNode.children[1].position = cc.v3(15, 3);
        } else if (textDirection == 3) {
            this.contentTxtNode.children[0].scaleX = -1;
            this.contentTxtNode.children[0].scaleY = -1;
            this.contentTxtNode.children[1].anchorX = 1;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].angle = 5;
            this.contentTxtNode.children[1].position = cc.v3(21, 0);
        } else if (textDirection == 4) {
            this.contentTxtNode.children[0].scaleY = -1;
            this.contentTxtNode.children[0].angle = 10;
            this.contentTxtNode.children[1].anchorX = 0;
            this.contentTxtNode.children[1].anchorY = 0;
            this.contentTxtNode.children[1].angle = 11;
            this.contentTxtNode.children[1].position = cc.v3(-14, -1);
        }

        const colorTag = tip.txtColor == 1 ? "<b><color=#1d3e4c>" : "<b><color=#ffffff>";
        this.contentTxtNode.children[1].getComponent(cc.RichText).string = colorTag + tip.content + "</color></b>";
    }

    protected onDisable(): void { }

    private onClosePanel(): void {
        gm.ui.async_hide_module(gm.const.GUIDE_SHOW_TIPS_OP);
    }
}

export default GuiderShowTips;