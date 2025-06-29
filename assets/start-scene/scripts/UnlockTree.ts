// *-*
import { Utils } from './Utils';
import { SpecialEnum, BundleName, SetItemNumEnum } from './Constants';
import { gm } from './GameManager';
import { TaskConditionType } from './TaskData';
import { ReportData } from './NetUtils';
import { special } from './MapCellCfgData';
import { Special } from '../../common/configs/special';

const { ccclass, property } = cc._decorator;

@ccclass
class UnlockTree extends cc.Component {
    @property([cc.Node])
    private meterialNode: cc.Node[] = [];

    @property(cc.Label)
    private lblCoin: cc.Label | null = null;

    @property([cc.SpriteFrame])
    private btnSprList: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    private btnSpr: cc.Sprite | null = null;

    private _curSpecialCfg: Special | null = null;
    private _localdData: special | null = null;
    private _curFunID: number = SpecialEnum.SPIRIT_TYPE;
    private _clickIndex: number = 0;
    private _matraEnough: boolean = true;
    private _tempList: number[] = [];

    protected onEnable(): void {
        this.node.getComponent(cc.Animation).play();
        this._curSpecialCfg = gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    }

    private refreshPanel(): void {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (let t = 0; t < this.meterialNode.length; t++) {
                this.meterialNode[t].active = false;
            }
            for (let t = 0; t < this._curSpecialCfg.prop.length; t++) {
                const prop = this._curSpecialCfg.prop[t];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[t].active = true;
                    this.meterialNode[t].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[t];
                    const itemCfg = gm.data.config_data.getItemCfgByID(prop);
                    if (itemCfg) {
                        Utils.async_set_sprite_frame(this.meterialNode[t].children[0].getComponent(cc.Sprite), BundleName.MAP, "res/" + itemCfg.icon)
                    }

                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[t]) {
                        this._matraEnough = false;
                        this.meterialNode[t].color = cc.Color.WHITE;
                        this.meterialNode[t].children[2].active = true;
                        this.meterialNode[t].children[3].active = false;
                        this.meterialNode[t].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[t] * 80;
                        this.meterialNode[t].children[2].children[1].children[0].active = !gm.data.mapCell_data.getCoinNum(itemCfg.type, prop);
                    } else {
                        this.meterialNode[t].children[2].active = false;
                        this.meterialNode[t].children[3].active = true;
                        this.meterialNode[t].color = cc.Color.BLACK.fromHEX("#86cbB4e");
                    }
                }
            }
            this.refreshCoin();
        }
    }

    private onClickClose(): void {
        this.node.active = false;
    }

    private onClickAddMetrail(event: cc.Event, index: string): void {
        const idx = parseInt(index);
        gm.data.mapCell_data.onekeyGetAllSpecialMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    }

    private onClickWatchAd(event: cc.Event, index: string): void {
        this._clickIndex = parseInt(index);
        gm.channel.show_video_ad(this.watchAdCb, this);
    }

    private watchAdCb(): void {
        gm.data.mapCell_data.onekeyWatchAdGetSoul(this._curFunID, this._tempList[this._clickIndex]);
        this.refreshPanel();
    }

    private onClickUpgrade(): void {
        if (this._matraEnough && gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
            gm.ui.async_show_module(gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            gm.data.mapCell_data.specialList[SpecialEnum.SPIRIT_TYPE].state = 2;
            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            gm.ui.emit("open_special_fun", 223);
            gm.ui.emit("play_spriti_fly");
            gm.data.task_data.update_task_progress(TaskConditionType.UNLOCK_ELF);
            gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "精灵树")
            });
            ReportData.instance.report_once_point(10603);
            this.onClickClose();
            gm.data.mapCell_data.splitItemNum(31, 22008, 1);
            gm.data.mapCell_data.async_write_data();
            gm.ui.async_show_module(gm.const.POSEIDON);
        }
    }

    private refreshCoin(): void {
        this.lblCoin.string = this._curSpecialCfg.coin + "";
        this.lblCoin.node.color = cc.Color.RED;
        if (gm.data.mapCell_data.roleCoinData.coinNum >= this._curSpecialCfg.coin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    }

    protected onDisable(): void {
        gm.ui.off("coin_change", this.refreshCoin, this);
    }
}

export default UnlockTree;