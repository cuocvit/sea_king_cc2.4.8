//
import { gm } from './GameManager';
import { GameModule } from './GameModule';
import { Utils } from './Utils';
import { ItemTypeEnum, SetItemNumEnum, RewardIdEnum, PropTypeEnum } from './Constants';
import { ReportData } from './NetUtils';
import { TempData } from './TempData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BarrelMgr extends GameModule {
    @property(cc.Node)
    private saleNode: cc.Node | null = null;

    @property(cc.Label)
    private lblSaleNum: cc.Label | null = null;

    @property(cc.Node)
    private noSpaceNode: cc.Node | null = null;

    @property(cc.Node)
    private noBarrelNode: cc.Node | null = null;

    @property(cc.Node)
    private noBarrel2Node: cc.Node | null = null;

    @property(cc.Label)
    private lblFreeTime: cc.Label | null = null;

    @property(cc.Node)
    private barWidth: cc.Node | null = null;

    @property(cc.Label)
    private lblNum: cc.Label | null = null;

    @property(cc.Node)
    private barInfoNode: cc.Node | null = null;

    @property(cc.Node)
    private handAnim: cc.Node | null = null;

    @property(cc.Node)
    public guideNode: cc.Node | null = null;

    @property(cc.Label)
    private lblTips: cc.Label | null = null;

    private _timeContainer: number = 0;
    private _reciveTime: number = 0;
    private _soulID: number = 0;
    private isCd: boolean = false;


    protected onEnable(): void {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.getComponent(cc.Animation).play("btnBuy_open");
        gm.ui.on("item_move", this.on_move_item_move, this);
        gm.ui.on("item_move_end", this.on_move_item_hide, this);
        gm.ui.on("refresh_barrel_num", this.refreshBarrelNum, this);
        gm.ui.on("hide_barrel_ui", this.on_item_not_move_hide, this);
        gm.ui.on("show_hand_anim", this.showHandAnim, this);

        this._reciveTime = 0;
        const nextFreeBarrelTime = gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime;
        if (this._reciveTime < nextFreeBarrelTime) {
            this._reciveTime = gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            const value = gm.data.mapCell_data.roleBarrelData.maxBarrelNum - gm.data.mapCell_data.roleBarrelData.curBarrelNum;
            const newVal = Math.ceil(value / gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum) * gm.data.mapCell_data.roleBarrelData.freeBarrelCd;
            if (this._reciveTime > newVal) {
                gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
                gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + newVal;
            }
        }

        this.barInfoNode.active = true;
        this.lblFreeTime.node.active = true;
        this.lblNum.string = "";
        this.noSpaceNode.active = !gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !gm.data.mapCell_data.isGuide;
        this.refreshBarrelNum();
    }

    private playAnimEnd(type: string, state: cc.AnimationState): void {
        if ("btnBuySuol_open" == state.name) {
            this.node.getComponent(cc.Animation).play("btnBuySuol_normal");
        } else if ("btnBuySuol_close" == state.name) {
            this._soulID = 0;
        }
    }

    protected onDisable(): void {
        gm.ui.off("item_move", this.on_move_item_move, this);
        gm.ui.off("item_move_end", this.on_move_item_hide, this);
        gm.ui.off("refresh_barrel_num", this.refreshBarrelNum, this);
        gm.ui.off("hide_barrel_ui", this.on_item_not_move_hide, this);
        gm.ui.off("show_hand_anim", this.showHandAnim, this);
    }

    public refreshPanel(): void {
        this._reciveTime = 0;
        if (this._reciveTime < gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
            gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
        }

        this.lblNum.string = "";
        this.noSpaceNode.active = !gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !gm.data.mapCell_data.isGuide;
        this.showBarrelInfo();
    }

    protected update(time: number): void {
        if (0 < this._reciveTime) {
            this._timeContainer += time;
            if (1 <= this._timeContainer) {
                --this._timeContainer;
                this.showReciveTime();
            }
        }
    }

    private showReciveTime(): void {
        this._reciveTime--;
        if (this._reciveTime <= 0) {
            this.lblFreeTime.string = "";
            this._reciveTime = 0;
            if (this._reciveTime < gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                this._reciveTime = gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            }

            if (0 < gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
                if (this.saleNode?.active) {
                    this.barInfoNode.active = false;
                } else {
                    this.barInfoNode.active = true;
                }
                this.lblNum.node.active = true;
                this.lblNum.string = `${gm.data.mapCell_data.roleBarrelData.curBarrelNum}/${Math.max(gm.data.mapCell_data.roleBarrelData.maxBarrelNum, 40)}`;
                this.barWidth.width = Math.min(gm.data.mapCell_data.roleBarrelData.curBarrelNum / gm.data.mapCell_data.roleBarrelData.maxBarrelNum * 125, 125);
            } else {
                this.lblNum.node.active = false;
                this.barInfoNode.active = false;
            }
        } else {
            this.lblFreeTime.string = Utils.format_time_miunte(this._reciveTime) + "后获得" + gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum + "个桶";
        }
    }

    private on_move_item_move(event: cc.Vec2, _item: ItemTypeEnum, _id: number): void {
        if (!gm.data.mapCell_data.isGuide) {
            let cfgByID = gm.data.config_data.getItemCfgByID(_id);
            if (_item == ItemTypeEnum.ITEM_TYPE && cfgByID && cfgByID.type == PropTypeEnum.SOUL_TYPE && !this.saleNode?.active) {
                this.saleNode.active = true;
                this._soulID = cfgByID.id;
                this.barInfoNode.active = false;
                this.lblFreeTime.node.active = false;
                this.lblTips.string = cfgByID.lv < 3 ? "绿魂以上\n可召唤" : "召唤英雄\n雕像";
                this.node.getComponent(cc.Animation).play("btnBuySuol_open");
                return;
            }

            if (!this.saleNode?.active || _item == ItemTypeEnum.BUILD_TYPE) {
                this.saleNode.active = true;
                this.barInfoNode.active = false;
                this.lblFreeTime.node.active = false;

                if (_item == ItemTypeEnum.ITEM_TYPE) {
                    const cfgByID = gm.data.config_data.getItemCfgByID(_id);
                    if (cfgByID) {
                        this.lblSaleNum.string = cfgByID.price.toString();
                    }
                } else if (_item == ItemTypeEnum.HERO_TYPE) {
                    const cfgByID = gm.data.config_data.getHeroCfgByID(_id);
                    if (cfgByID) {
                        this.lblSaleNum.string = cfgByID.price.toString();
                    }
                }
            }
        }
    }

    private on_move_item_hide(event: cc.Vec2, cellID: number): void { // t: any, e: number
        if (!gm.data.mapCell_data.isGuide) {
            this.saleNode.active = false;
            this.barInfoNode.active = true;
            this.lblFreeTime.node.active = true;

            if (this.node._hitTest(event)) { // ???????
                if (0 < this._soulID) {
                    const cfgByID = gm.data.config_data.getItemCfgByID(this._soulID);
                    if (cfgByID && 0 < cfgByID.price) {
                        gm.data.mapCell_data.randomStoneHero(cellID, cfgByID.price, gm.const.heroRandomList[cfgByID.lv]);
                        gm.ui.emit("item_children_refresh", cellID);
                    }
                } else {
                    if (gm.data.mapCell_data.role_map_data[cellID].itemType == ItemTypeEnum.BUILD_TYPE) return;

                    const itemId = gm.data.mapCell_data.role_map_data[cellID].itemID;
                    gm.data.mapCell_data.delSingleSuperHeroCellID(itemId, cellID);
                    gm.data.mapCell_data.delCellItemByCellID(cellID);
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, parseInt(this.lblSaleNum.string));
                    gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), parseInt(this.lblSaleNum.string));

                    if (30000 < itemId) {
                        const heroConfig = gm.data.config_data.getHeroCfgByID(itemId);
                        if (heroConfig && 11 == heroConfig.occupation) {
                            gm.ui.emit("build_show_towerBuff");
                        }
                    }
                    gm.ui.emit("item_children_refresh", cellID);
                }
                this.noSpaceNode.active = !gm.data.mapCell_data.getMapHaveSpece();
            }
            if (0 < this._soulID) {
                this.node.getComponent(cc.Animation).play("btnBuySuol_close");
                this.barInfoNode.active = true;
                this.lblFreeTime.node.active = true;
                this._soulID = 0;
            }
        }
    }

    private on_item_not_move_hide(): void {
        if (!gm.data.mapCell_data.isGuide) {
            this.saleNode.active = false;
            this.barInfoNode.active = true;
            this.lblFreeTime.node.active = true;

            if (0 < this._soulID) {
                this.node.getComponent(cc.Animation).play("btnBuySuol_close");
                this.barInfoNode.active = true;
                this.lblFreeTime.node.active = true;
                this._soulID = 0;
            }
        }
    }

    private showHandAnim(active: boolean = true): void {
        TempData.map_have_hand = active;
        if (!gm.data.mapCell_data.isGuide) {
            this.handAnim.active = active;
        }
    }

    private refreshBarrelNum(): void {
        this.noSpaceNode.active = !gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !gm.data.mapCell_data.isGuide;

        const barrelData = gm.data.mapCell_data.roleBarrelData;

        if (gm.data.mapCell_data.isGuide) {
            this.barInfoNode.active = false;
            this.lblFreeTime.node.active = false;
            this.lblNum.string = barrelData.curBarrelNum.toString();
            this.lblFreeTime.string = "";
            this.handAnim.active = false;

            if (!gm.ui.newerGuideOp || !gm.ui.newerGuideOp.node.active) {
                if (gm.data.mapCell_data.roleGuideVO.guideID === 8) {
                    if (barrelData.curBarrelNum <= 3 && barrelData.curBarrelNum > 0) {
                        this.handAnim.active = true;
                    }
                } else {
                    this.handAnim.active = barrelData.curBarrelNum > 0;
                }
            }
            return;
        }

        if (barrelData.curBarrelNum >= barrelData.maxBarrelNum) {
            this.lblFreeTime.string = "";
        } else {
            this._reciveTime = 0;
            if (this._reciveTime < gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                this._reciveTime = gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            }
        }

        this.barWidth.width = Math.min(barrelData.curBarrelNum / barrelData.maxBarrelNum * 125, 125);

        if (0 < gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
            this.saleNode.active ? this.barInfoNode.active = false : this.barInfoNode.active = true;
            this.lblNum.node.active = true;
            this.lblNum.string = `${barrelData.curBarrelNum}/${Math.max(barrelData.maxBarrelNum, 40)}`;
        } else {
            this.lblNum.node.active = false;
            this.barInfoNode.active = false;
        }
    }

    private showBarrelInfo(): void {
        this.handAnim.active = false;
        const barrelData = gm.data.mapCell_data.roleBarrelData;

        this.noBarrelNode.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !gm.data.mapCell_data.isGuide;

        if (gm.data.mapCell_data.isGuide) {
            this.barInfoNode.active = false;
            this.lblFreeTime.node.active = false;
            this.lblNum.string = barrelData.curBarrelNum.toString();
            this.lblFreeTime.string = "";
            this.handAnim.active = false;

            if (!gm.ui.newerGuideOp || !gm.ui.newerGuideOp.node.active) {
                if (gm.data.mapCell_data.roleGuideVO.guideID === 8) {
                    if (barrelData.curBarrelNum <= 3 && barrelData.curBarrelNum > 0) {
                        this.handAnim.active = true;
                    }
                } else {
                    this.handAnim.active = barrelData.curBarrelNum > 0;
                }
            }
            return;
        }

        this._reciveTime = barrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1000);
        this.noSpaceNode.active = !gm.data.mapCell_data.getMapHaveSpece();
        this.barWidth.width = Math.min(barrelData.curBarrelNum / barrelData.maxBarrelNum * 125, 125);

        if (0 < barrelData.curBarrelNum) {
            this.saleNode.active ? this.barInfoNode.active = false : this.barInfoNode.active = true;
            this.lblNum.node.active = true;
            this.lblNum.string = `${barrelData.curBarrelNum}/${Math.max(barrelData.maxBarrelNum, 40)}`;
        } else {
            this.lblNum.node.active = false;
            this.barInfoNode.active = false;
        }

        if (barrelData.curBarrelNum >= barrelData.maxBarrelNum) {
            this.lblFreeTime.string = "";
        }
    }

    public onClickBuy(): void {
        if (gm.data.mapCell_data.isGuide) {
            this.handAnim.active = false;
        }
        console.log("TTTT");
        this.node.getComponent(cc.Animation).play("btnBuy_button");

        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (gm.audio.play_effect(gm.const.AUDIO_159_MUTONGLUODI), 0 < gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
                gm.data.mapCell_data.buyBarrelNumTimes++;
                gm.data.mapCell_data.reduceBarrelNum();
                gm.data.mapCell_data.addBarrelInMap();

                if (gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0) {
                    this.isCd = true;
                    this.unscheduleAllCallbacks();
                    this.scheduleOnce(() => {
                        this.isCd = false;
                    }, 1);
                }

                if (gm.data.mapCell_data.buyBarrelNumTimes <= 50) {
                    ReportData.instance.report_once_point(10200 + gm.data.mapCell_data.buyBarrelNumTimes);
                }

                gm.channel.report_event("buy_barrel", {
                    event_desc: "购买木桶",
                    buy_count: gm.data.mapCell_data.buyBarrelNumTimes,
                    task_desc: cc.js.formatStr("购买木桶%d次", gm.data.mapCell_data.buyBarrelNumTimes)
                });
            } else {
                if (gm.data.mapCell_data.isGuide) {
                    gm.ui.show_notice("Bạn có thể xem video và mua thùng khi hướng dẫn hoàn tất");
                    return;
                }

                if (this.isCd) {
                    gm.ui.show_notice("Không đủ thùng!!!");
                    return;
                }

                gm.channel.show_video_ad(() => {
                    gm.data.mapCell_data.watch_ad_buy_barrel_times++;
                    gm.data.mapCell_data.addBarrelNum(40);
                    ReportData.instance.report_point(10301);
                    ReportData.instance.report_once_point(10302);
                    gm.channel.report_event("video_buy_barrel", {
                        event_desc: "看视频购买木桶",
                        buy_count: gm.data.mapCell_data.watch_ad_buy_barrel_times,
                        task_desc: cc.js.formatStr("购买木桶%d次", gm.data.mapCell_data.watch_ad_buy_barrel_times)
                    });
                }, this);
            }
        } else {
            gm.ui.show_auto_merge_message();
        }

        this.showBarrelInfo();
    }
}