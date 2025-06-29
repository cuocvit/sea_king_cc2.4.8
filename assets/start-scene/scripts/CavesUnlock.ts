// +-+
import { Utils } from './Utils';
import { SpecialEnum, SetItemNumEnum, BundleName } from './Constants';
import { gm } from './GameManager';
import { TaskConditionType } from './TaskData';
import { ReportData } from './NetUtils';
import { Special } from "../../common/configs/special";
import { special } from './MapCellCfgData';

const { ccclass, property } = cc._decorator;

export interface LocalData {
    mertrail: { [key: number]: number };
}

@ccclass
class CavesUnlock extends cc.Component {
    @property([cc.Node])
    private meterialNode: cc.Node[] = [];

    @property(cc.Label)
    private lblCoin: cc.Label | null = {} as cc.Label;

    @property([cc.SpriteFrame])
    private btnSprList: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    private btnSpr: cc.Sprite | null = null;

    private _curSpecialCfg: Special | null = null;
    private _localdData: special | null = null;
    private _curFunID: SpecialEnum = SpecialEnum.CAVES_TYPE;
    private _matraEnough: boolean = true;
    private _tempList: number[] = [];

    protected onEnable(): void {
        gm.ui.on("coin_change", this.refreshCoin, this);
        this._curSpecialCfg = gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    }

    private refreshPanel(): void {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (let index = 0; index < this.meterialNode.length; index++) {
                this.meterialNode[index].active = true;
            }

            for (let index = 0; index < this._curSpecialCfg.prop.length; index++) {
                const prop = this._curSpecialCfg.prop[index];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[index].active = true;
                    this.meterialNode[index].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[index];
                    const heroCfg = gm.data.config_data.getHeroCfgByID(prop);
                    if (heroCfg) {
                        Utils.async_set_sprite_frame(this.meterialNode[index].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/heroCircleImg/" + heroCfg.icon);
                    }

                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[index]) {
                        this._matraEnough = false;
                        this.meterialNode[index].color = cc.Color.WHITE;
                        this.meterialNode[index].children[2].active = true;
                        this.meterialNode[index].children[3].active = false;
                        this.meterialNode[index].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[index] * 80;
                        this.meterialNode[index].children[2].children[1].children[0].active = !gm.data.mapCell_data.getHeroNum(heroCfg.occupation, heroCfg.heroid);

                    } else {
                        this.meterialNode[index].children[2].active = false;
                        this.meterialNode[index].children[3].active = true;
                        this.meterialNode[index].color = cc.Color.BLACK.fromHEX("#86cbB4e");
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
        gm.data.mapCell_data.onekeyGetAllSpecialHeroMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    }

    private onClickUpgrade(): void {
        if (this._matraEnough && gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
            gm.ui.async_show_module(gm.const.GETCOINOP);
            return;
        }

        if (this._matraEnough) {
            gm.data.mapCell_data.specialList[SpecialEnum.CAVES_TYPE].state = 2;
            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            gm.ui.emit("open_special_fun", 143);
            gm.ui.mapMainUI.roleBuildAnimNode.active = false;
            gm.data.mapCell_data.lockCaveAllInitCell(gm.const.CAVESAREAID);
            gm.data.task_data.update_task_progress(TaskConditionType.UNLOCK_CAVERN);
            gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "洞窟")
            });
            ReportData.instance.report_once_point(10604);
            this.onClickClose();
            gm.ui.set_module_args(gm.const.GOBATTLE.key, 2);
            gm.ui.async_show_module(gm.const.GOBATTLE);
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

// export default CavesUnlock;