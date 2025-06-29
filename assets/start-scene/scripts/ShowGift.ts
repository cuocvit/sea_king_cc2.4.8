// +-+
import { SetItemNumEnum, RewardIdEnum } from './Constants';
import { gm } from './GameManager';

const { ccclass, property } = cc._decorator;

@ccclass
class ShowGift extends cc.Component {
    @property(cc.Node)
    private bar1: cc.Node | null = null;

    @property(cc.Node)
    private bar2: cc.Node | null = null;

    @property(cc.Node)
    private widthBg: cc.Node | null = null;

    @property(cc.Node)
    private widthBg1: cc.Node | null = null;

    @property([cc.Node])
    private giftItem: cc.Node[] = [];

    private _itemID: number | null = null;
    private _cellID: number | null = null;
    private _maxNumList: { [key: number]: number } = {
        12: 8,
        13: 8,
        14: 5
    };

    protected onEnable(): void {
        this.bar2.stopAllActions();
        this.node.zIndex = gm.const.MAX_CELL_NUM + 3;
        if (this._cellID && this._itemID) {
            this.node.y = gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).y + 90;
            this.node.x = gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).x + 30;

            const itemConfig = gm.data.config_data.getItemCfgByID(this._itemID);
            if (itemConfig) {
                const maxNum = this._maxNumList[itemConfig.type];
                if (maxNum) {
                    this.bar1.width = 30 * maxNum - 10;
                    this.bar2.width = 30 * maxNum - 10;
                    this.bar1.x = .5 * -this.bar1.width;
                    this.bar2.x = .5 * -this.bar2.width;
                    this.widthBg.width = 30 * maxNum + 15;
                    this.widthBg1.width = 30 * maxNum + 15;

                    for (let index = 0; index < this.giftItem.length; index++) {
                        this.giftItem[index].active = index < maxNum;
                        this.giftItem[index].color = itemConfig.lv - 2 >= maxNum - 1 - index ? cc.Color.GREEN : cc.Color.WHITE;
                    }

                    this.bar1.scaleX = 1;
                    this.bar2.scaleX = (itemConfig.lv - 2) / (maxNum - 1);

                    this.bar2.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.4, (itemConfig.lv - 1) / (maxNum - 1), 1),
                        cc.callFunc(() => {
                            this.giftItem[maxNum - 1 - (itemConfig.lv - 1)].color = cc.Color.GREEN
                        }), cc.delayTime(2),
                        cc.callFunc(() => {
                            if (itemConfig.lv == maxNum) {
                                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, itemConfig.number);
                                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), itemConfig.number);
                            }
                            this.node.active = false;
                        })));
                }
            }
        } else {
            this.node.active = false;
        }
    }

    public initData(itemID: number, cellID: number): void {
        this.bar2?.stopAllActions();
        this._itemID = itemID;
        this._cellID = cellID;
    }

    protected onDisable(): void {
        this.bar2.stopAllActions();
    }
}

export default ShowGift;