// +-+
import { SetItemNumEnum, RewardIdEnum } from './Constants';
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

@ccclass
class SpecialGift extends cc.Component {
    @property(cc.Node)
    private caseNode: cc.Node | null = null;

    @property(cc.Label)
    private lblTips: cc.Label | null = null;

    @property([cc.Node])
    private giftItem: cc.Node[] = [];

    @property(cc.Node)
    private giftRodeNode: cc.Node | null = null;

    @property([cc.SpriteFrame])
    private giftFrame: cc.SpriteFrame[] = [];

    private _itemID: number = 0;
    private _cellID: number = 0;
    private _maxNumList: { [key: number]: number } = {
        13: 8,
        14: 5,
        19: 7
    };

    protected onEnable(): void {
        this.node.zIndex = gm.const.MAX_CELL_NUM + 3;
        if (this._cellID && this._itemID) {
            this.node.y = gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).y + 90;
            this.node.x = gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).x + 30;

            const itemConfig = gm.data.config_data.getItemCfgByID(this._itemID);
            if (itemConfig) {
                this.caseNode.position = this.giftItem[this._maxNumList[itemConfig.type] - 1].position,
                    this.caseNode.children[2].getComponent(cc.ParticleSystem).resetSystem();

                const maxNum = this._maxNumList[itemConfig.type];
                if (maxNum) {
                    if (13 == itemConfig.type) {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[0];
                    } else if (14 == itemConfig.type) {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[1];
                    } else {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[2];
                    }

                    const itemName = 13 == itemConfig.type ? "超级英雄" : 14 == itemConfig.type ? "超级炮塔" : "水精灵";
                    this.lblTips.string = "可合成" + itemName;

                    for (let index = 0; index < this.giftItem.length; index++) {
                        this.giftItem[index].active = false;
                        this.giftItem[index].active = itemConfig.lv - 2 >= index;
                        this.giftRodeNode.children[index].active = index < maxNum;
                    }

                    this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(() => {
                        this.giftItem[itemConfig.lv - 1].active = true;
                    }), cc.delayTime(1.5), cc.callFunc(() => {
                        if (itemConfig.lv == maxNum) {
                            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, itemConfig.number);
                            gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), itemConfig.number);
                        }
                        this.node.active = false;
                    })))
                }
            }
        } else {
            this.node.active = false;
        }
    }

    public initData(itemID: number, cellID: number): void {
        this.node.stopAllActions();
        this._itemID = itemID;
        this._cellID = cellID;
    }

    protected onDisable(): void {
        this.node.stopAllActions();
    }
}

export default SpecialGift;