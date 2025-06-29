import { gm } from "./GameManager";
import { GameModule } from "./GameModule";
import { MvcEventDispatcher } from "./MvcEventDispatcher";
import { Item } from "../../buy/scripts/Item";
import {
    BuildTypeEnum,
    SpecialEnum,
    BundleName,
    ItemTypeEnum,
    PropTypeEnum,
    RewardIdEnum,
    SetItemNumEnum,
} from "./Constants";
import { TaskEntry } from "./TaskEntry";
import { TaskMainEntry } from "./TaskMainEntry";
import { DataEvent } from "./DataEvent";
import AutoCompose from "./AutoCompose";
import { TaskConditionType } from "./TaskData";
import { NodePoolItem } from "./NodePoolItem";
import { LadderEntry } from "./LadderEntry";
import { TempData } from "./TempData";
import { SignEntry } from "./SignEntry";
import { MailEntry } from "./MailEntry";
import { GuideGiftEntry } from "./GuideGiftEntry";
import { AddDesktopEntry } from "./AddDesktopEntry";
import { MapItemDataVO } from "./MapCellCfgData";
import { Utils } from "./Utils";
import { ReportData } from "./NetUtils";
import WaterBarrelItem from "./WaterBarrelItem";
import HandAnim from "./HandAnim";
import { MoreEntry } from "./MoreEntry";
import { MapBuildUpgrade } from "./MapBuildUpgrade";
//
import SpecialGift from "./SpecialGift";
import ShowGift from "./ShowGift";
import ShipMgr from "./ShipMgr";
import LockCloudArea from "./LockCloudArea";
import BarrelMgr from "./BarrelMgr";
import MainMapItem from "./MainMapItem";
import BuildIconItem from "./BuildIconItem";
import { MapCell } from "../../common/configs/mapcell";
import Sign from "../../sign/scripts/Sign";
import { EventScriptManager } from "./EventScriptManager";

interface TypeBuildMeatril {
    max: number;
    id: number;
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMapUI extends GameModule {
    @property(cc.Node)
    public mapContent: cc.Node | null = null;

    @property(cc.Prefab)
    public mapItemPrefab: cc.Prefab | null = null;

    @property(cc.Node)
    private task_node: cc.Node | null = null;

    @property(cc.Node)
    private task_main_node: cc.Node | null = null;

    @property(cc.Node)
    public ladder_node: cc.Node | null = null;

    @property(cc.Node)
    private sign_node: cc.Node | null = null;

    @property(cc.Node)
    private guide_gift_node: cc.Node | null = null;

    @property(cc.Node)
    private vip_node: cc.Node | null = null;

    @property(cc.Node)
    private super_recruit_node: cc.Node | null = null;

    @property(cc.Node)
    private lucky_wheel_node: cc.Node | null = null;

    @property(cc.Node)
    private record_node: cc.Node | null = null;

    @property(cc.Node)
    private more_node: cc.Node | null = null;

    @property(cc.Node)
    private shop_node: cc.Node | null = null;

    @property(cc.Node)
    private mail_node: cc.Node | null = null;

    @property(cc.Node)
    private add_desktop_node: cc.Node | null = null;

    @property(cc.Node)
    private nextCompTimes: cc.Node | null = null;

    @property(cc.Prefab)
    public propItemPrefab: cc.Prefab | null = null;

    @property(cc.Prefab)
    public buildItemPrefab: cc.Prefab | null = null;

    @property(cc.Node)
    private caseOceanNode: cc.Node | null = null;

    @property(cc.Node)
    private moveItemNode: cc.Node | null = null;

    @property(cc.Node)
    private roleBuildUpgrade: cc.Node | null = null;

    @property(cc.Node)
    public barrelNode: cc.Node | null = null;

    @property(cc.Node)
    public ship: cc.Node | null = null;

    @property(cc.Node)
    public roleGuideBuildUpgrade: cc.Node | null = null;

    @property(cc.Node)
    private roleGuideBuildUpgradeBg: cc.Node | null = null;

    @property(cc.Node)
    private roleGuideUpgradeBtn: cc.Node | null = null;

    @property(cc.Node)
    private barrelParentNode: cc.Node | null = null;

    @property(cc.Node)
    private roleGuideBuildMertrailNode: cc.Node | null = null;

    @property(cc.Node)
    private buildUpAnim: cc.Node | null = null;

    @property(cc.Node)
    private mask: cc.Node | null = null;

    @property(cc.Node)
    private composeAnim: cc.Node | null = null;

    @property(cc.Node)
    public diamond_icon_node: cc.Node | null = null;

    @property(cc.Node)
    public gold_icon_node: cc.Node | null = null;

    @property(cc.Node)
    public handAnim: cc.Node | null = null;

    @property(cc.Node)
    public roleBuildAnimNode: cc.Node | null = null;

    @property(cc.Node)
    private mapUI: cc.Node | null = null;

    @property(cc.Node)
    private treeLock: cc.Node | null = null;

    @property(cc.Node)
    private cavesLock: cc.Node | null = null;

    @property(cc.Node)
    private red_btn_book: cc.Node | null = null;

    @property(cc.Node)
    private giftBar: cc.Node | null = null;

    @property(cc.Node)
    private specialGiftBar: cc.Node | null = null;

    @property(cc.Node)
    private lockAreaCloudList: cc.Node | null = null;

    @property(AutoCompose)
    public autoCompose: AutoCompose | null = null;

    private _mapCfgList: MapCell[] = [];
    private _row: number = 20;
    private _col: number = 22;
    private _mapDataList: any[] = [];
    private _widthHalf: number = 60;
    private _heightHalf: number = 95;
    private _isDragToBorderMoveSpeed: cc.Vec2 = cc.Vec2.ZERO;
    private _touch_position: cc.Vec2 = cc.Vec2.ZERO;
    private isShowSign: boolean = false;
    private isfightEnd: boolean = false;
    private moveToPos: cc.Vec2 = new cc.Vec2(0, 0);
    private isMoving: boolean = false;
    private followSpeed: number = 200;
    private _map_size: cc.Vec2 = new cc.Vec2(1500, 1500);
    private delayTime: number = 0;
    private curTimer: number = 0;
    private isBeginDelayTime: boolean = false;
    private guideID: number = 0;
    private guideScaleNode: /* cc.Component | null = null; */ BuildIconItem | null =
        null;
    private _nextOpenCell: any | null = null;
    private _buildID: number = 0;
    private _buildMeatril: TypeBuildMeatril[] = [];
    private _isLockMoveMap: boolean = false;

    constructor() {
        super();
    }

    private getBuildUpgradeCb(t: { data: number }): void {
        const buildData = gm.data.mapCell_data.buildData[t.data];
        MvcEventDispatcher.dispatchEvent(
            DataEvent.GUIDENEWERGUIDE,
            new DataEvent(
                DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS_SUC,
                this.mapContent
                    ?.getChildByName(buildData.cellID.toString())
                    .getComponent(MainMapItem)
                    .mapBuildNode.children[0].getComponent(
                        BuildIconItem
                    ).buildStateIcon.node,
                this.showBuildUpgrade.bind(
                    this,
                    buildData.buildID,
                    buildData.cellID
                )
            )
        );
    }

    private getBarrelCb(): void {
        MvcEventDispatcher.dispatchEvent(
            DataEvent.GUIDENEWERGUIDE,
            new DataEvent(
                DataEvent.GUIDE_CLICK_BARREL_POS_SUC,
                this.barrelNode.getComponent(BarrelMgr).guideNode,
                this.barrelNode
                    .getComponent(BarrelMgr)
                    .onClickBuy.bind(this.barrelNode.getComponent(BarrelMgr))
            )
        );
    }

    private getBuildUpCb(): void {
        MvcEventDispatcher.dispatchEvent(
            DataEvent.GUIDENEWERGUIDE,
            new DataEvent(
                DataEvent.GUIDE_CLICK_BUILD_UP_POS_SUC,
                this.roleGuideBuildUpgrade.children[1].children[2],
                this.onClickGuideUplvl.bind(this)
            )
        );
    }

    private guideDelItem(num: number): void {
        const itemNode = this.mapContent?.getChildByName(num.toString());
        if (itemNode) {
            itemNode.getComponent(MainMapItem).delItemNode();
        }
    }

    private getClickGoFightCb(): void {
        MvcEventDispatcher.dispatchEvent(
            DataEvent.GUIDENEWERGUIDE,
            new DataEvent(
                DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS_SUC,
                this.ship?.children[0].children[0].getChildByName(
                    "fightBtn"
                ).children[1],
                this.ship?.children[0]
                    .getComponent(ShipMgr)
                    .onClickShip.bind(
                        this.ship.children[0].getComponent(ShipMgr),
                        null,
                        1
                    )
            )
        );
    }

    public revenge(key: string): void {
        const shipComponent = this.ship.children[0].getComponent(ShipMgr);
        if (shipComponent) {
            shipComponent.revenge(key);
        }
    }

    private putAllItemToMapAuto(): void {
        const itemsToPut = gm.data.mapCell_data.putAllItemToMapCell();
        for (; 0 < gm.data.mapCell_data._needRefreshCellList.length; ) {
            var e = gm.data.mapCell_data._needRefreshCellList.shift();
            gm.ui.emit("item_children_refresh", e);
        }

        if (
            0 < this.ship.childrenCount &&
            this.ship.children[0].getComponent(ShipMgr)
        ) {
            this.ship.children[0].getComponent(ShipMgr).refreshItem();
        }

        for (let a = 0; a < itemsToPut.length; a++) {
            gm.ui.emit("set_new_item_alpha", itemsToPut[a]);
        }
    }

    public showGiftBar(itemId: number, cellId: number): void {
        const itemConfig = gm.data.config_data.getItemCfgByID(itemId);
        if (!itemConfig) return;
        if (
            itemConfig.type == 13 ||
            itemConfig.type == 14 ||
            itemConfig.type == 19
        ) {
            this.specialGiftBar.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            if (this.specialGiftBar?.active) {
                this.specialGiftBar.active = false;
            }

            this.specialGiftBar
                .getComponent(SpecialGift)
                .initData(itemId, cellId);
            this.specialGiftBar.active = true;
        } else {
            this.giftBar.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            if (this.giftBar?.active) {
                this.giftBar.active = false;
            }

            this.giftBar.getComponent(ShowGift).initData(itemId, cellId);
            this.giftBar.active = true;
        }
    }

    private getCookie(name: string) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }

    private deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }

    private checkPaymentStatus(): void {
        const storedPrice = localStorage.getItem("reward_price");
        const paymentStatus = this.getCookie("payment_status");
        if (paymentStatus === "success" && storedPrice) {
            console.log("Thanh toán thành công!!!!!");
            this.deleteCookie("payment_status");

            const parsedData = JSON.parse(storedPrice);
            localStorage.setItem("reward_price", null);
            console.log(parsedData);

            ReportData.instance.report_once_point(10833);
            const data = parsedData;
            const rewardIds: number[] = [];
            const rewardNums: number[] = [];
            const multiplier = 1;

            for (let i = 0; i < data.reward_array.length; i++) {
                const reward = data.reward_array[i];
                rewardIds.push(reward.reward_id);
                rewardNums.push(reward.reward_num * multiplier);

                if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                    gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
                } else if (reward.reward_id == RewardIdEnum.GOLD) {
                    gm.data.mapCell_data.setAddGameCoin(
                        SetItemNumEnum.ADD_ITEM_TYPE,
                        reward.reward_num * multiplier
                    );
                    gm.ui.show_coin_fly(
                        RewardIdEnum.GOLD,
                        this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
                    );
                } else if (reward.reward_id == RewardIdEnum.DIAMOND) {
                    gm.data.mapCell_data.setAddGameDiamond(
                        SetItemNumEnum.ADD_ITEM_TYPE,
                        reward.reward_num * multiplier
                    );
                    gm.ui.show_coin_fly(
                        RewardIdEnum.DIAMOND,
                        this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
                    );
                } else if (reward.reward_id == RewardIdEnum.BARREL) {
                    gm.data.mapCell_data.addBarrelNum(
                        reward.reward_num * multiplier
                    );
                } else {
                    const itemIds: number[] = [];
                    for (let j = 0; j < reward.reward_num * multiplier; j++) {
                        itemIds.push(reward.reward_id);
                    }
                    gm.data.mapCell_data.addWareHouseList(itemIds);
                }
            }

            gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                idList: rewardIds,
                numList: rewardNums,
            });
            gm.ui.async_show_module(gm.const.GETREWARDOP);
            data.state = multiplier == 1 ? 2 : 3;
            gm.data.sign_data.sign_state = data.state;
            gm.data.sign_data.async_write_data();
        }
    }
    protected onLoad(): void {
        this._mapCfgList = gm.data.config_data.getMapCellCfg();
        this.initMap();
        this.checkPaymentStatus();
        if (!gm.data.mapCell_data.isGuide) {
            this.popup_offline_op(() => {
                this.popup_sign(() => {
                    gm.ui.show_panel(gm.const.Mail);
                });
            });
        }
    }

    private popup_sign(callback: () => void): void {
        this.isShowSign = 0 == gm.data.sign_data.sign_state;
        if (this.isShowSign) {
            this.isShowSign = false;
            const call = (param: Sign) => {
                if (param == gm.ui.sign) {
                    gm.ui.off(gm.ui.MODULE_HIDE, call, this);
                    callback();
                }
            };
            gm.ui.on(gm.ui.MODULE_HIDE, call, this);
            gm.ui.async_show_module(gm.const.Sign);
        } else {
            callback();
        }
    }

    private popup_offline_op(callback: () => void): void {
        if (TempData.isShowOffline) {
            TempData.isShowOffline = false;
            const call = (param) => {
                if (param == gm.ui.offline_op) {
                    gm.ui.off(gm.ui.MODULE_HIDE, call, this);
                    callback();
                }
            };
            gm.ui.on(gm.ui.MODULE_HIDE, call, this);
            gm.ui.async_show_module(gm.const.OFFLINEOP);
        } else {
            callback();
        }
    }

    private addListener() {
        const self = this;
        gm.ui.on("item_move", this.on_move_item_move, this);
        gm.ui.on("item_move_end", this.on_move_item_hide, this);
        gm.ui.on("item_children_refresh", this.on_move_item_refresh, this);
        gm.ui.on("item_unlock_refresh", this.on_item_unlock_refresh, this);
        gm.ui.on("compostimeChange", this.showNextCellNode, this);
        gm.ui.on("unLockNewArea", this.unLockNewArea, this);
        gm.ui.on("build_upgrade", this.refreshBuildItem, this);
        gm.ui.on("item_compose_time_change", this.composeTimesChange, this);
        gm.ui.on("build_metarail_change", this.showBuildMertarilFull, this);
        gm.ui.on("guide_del_item", this.guideDelItem, this);
        gm.ui.on("bookRedStatus", this.refreshRedBtnBook, this);
        gm.ui.on("ship_goods_change", this.putAllItemToMapAuto, this);

        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).addEventListener(
            DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS,
            this.getBuildUpgradeCb,
            this
        );

        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).addEventListener(
            DataEvent.GUIDE_CLICK_BARREL_POS,
            this.getBarrelCb,
            this
        );

        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).addEventListener(
            DataEvent.GUIDE_CLICK_BUILD_UP_POS,
            this.getBuildUpCb,
            this
        );

        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).addEventListener(
            DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS,
            this.getClickGoFightCb,
            this
        );

        this.node.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                self.roleBuildUpgrade.active = false;
                self.setMapUiShow(true);
            },
            this
        );

        this.node.on(
            cc.Node.EventType.TOUCH_MOVE,
            (event: cc.Event.EventTouch) => {
                if (!gm.data.mapCell_data.isGuide) {
                    if (event.getTouches().length >= 2) {
                        const touch1 = event.getTouches()[0];
                        const touch2 = event.getTouches()[1];

                        const delta1 = touch1.getDelta();
                        const delta2 = touch2.getDelta();
                        const pos1 = touch1.getLocation();
                        const pos2 = touch2.getLocation();

                        const midPoint = cc.v3(
                            pos1.add(pos2).multiplyScalar(0.5)
                        );
                        const mapPoint =
                            self.mapContent?.convertToNodeSpaceAR(midPoint);

                        const distance = pos1.sub(pos2);
                        const delta = delta1.sub(delta2);
                        let scale = 1;

                        if (Math.abs(distance.x) > Math.abs(distance.y)) {
                            scale =
                                ((distance.x + delta.x) / distance.x) *
                                self.mapContent.scale;
                        } else {
                            scale =
                                ((distance.y + delta.y) / distance.y) *
                                self.mapContent.scale;
                        }

                        if (scale < 1) {
                            scale = 1;
                        } else if (scale > 2) {
                            scale = 2;
                        }

                        const scaleDiff = scale - self.mapContent.scale;
                        self.mapContent.scale = scale;

                        const newPos = mapPoint.multiplyScalar(scaleDiff);
                        self.mapContent.position =
                            self.mapContent?.position.sub(newPos);

                        self.treeLock.scale =
                            1 - 0.5 * (self.mapContent.scale - 1);
                        self.cavesLock.scale =
                            1 - 0.5 * (self.mapContent.scale - 1);
                        return;
                    } else {
                        if (!self._isLockMoveMap) {
                            self.mapContent.x += event.getDelta().x;
                            self.mapContent.y += event.getDelta().y;
                        }
                    }
                }
            },
            this
        );

        this.node._touchListener.setSwallowTouches(false);

        this.buildUpAnim?.getComponent(cc.Animation).on(
            cc.Animation.EventType.FINISHED,
            () => {
                gm.ui.emit("build_upgrade");
                const buildCfg = gm.data.config_data.getBuildCfgByID(
                    this._buildID
                );
                if (buildCfg) {
                    const buildData = gm.data.mapCell_data.getBuildDataByType(
                        buildCfg.buildType
                    );
                    if (buildData) {
                        this.buildUpAnim.active = false;
                        if (
                            buildCfg.buildType ==
                            BuildTypeEnum.SEAGOINGBOAT_TYPE
                        ) {
                            this.ship.opacity = 255;
                        } else {
                            this.mapContent
                                ?.getChildByName(buildData.cellID.toString())
                                .getComponent(MainMapItem)
                                .setBuildImgOpacity(255);
                        }
                        this.lockSenceMoveMap(116, 1.5);
                    }
                }
            },
            this
        );
    }

    private initMapUI(): void {
        this.composeAnim.active = false;
        this.handAnim.active = false;
        this.moveItemNode.active = false;
        this.roleBuildUpgrade.active = false;
        this.roleGuideBuildUpgrade.active = false;
        this.buildUpAnim.active = false;
        this.mask.active = false;
        this.handAnim.active = false;
        this.mapContent.scale = 1;
        this.mapContent.position = cc.v3(-94, 490, 0);
    }

    protected onEnable(): void {
        this.isfightEnd = false;
        this.addListener();
        this.initMapUI();
        this.showUnComposeCell();
        this.setBarrelNodeActive();
        this.initShip();
        this.lockMainUI();
        const fightTempData = gm.data.fight_temp_data;
        if (
            fightTempData.fight_result_data &&
            fightTempData.fight_result_data.result > 0
        ) {
            gm.data.task_data.update_task_progress(
                TaskConditionType.ATTACK_ISLAND
            );
            gm.audio.play_effect(gm.const.AUDIO_19_FIGHT_RETURN);
            gm.audio.play_music(gm.const.AUDIO_91_MAIN_MUSIC);
            for (
                let a = 0;
                a <
                fightTempData.fight_result_data.alive_hero_data_array.length;
                a++
            ) {
                gm.data.mapCell_data.checkIsPlayItemSound(
                    fightTempData.fight_result_data.alive_hero_data_array[a].id
                );
            }
            this.isfightEnd = true;
        }
        this.lockAreaCloud();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            if (
                1 == gm.data.mapCell_data.roleGuideVO.guideID ||
                2 == gm.data.mapCell_data.roleGuideVO.guideID ||
                (6 == gm.data.mapCell_data.roleGuideVO.guideID &&
                    gm.data.mapCell_data.roleGuideVO.isEnd)
            ) {
                this.randomShowCase();
            }
            if (this.isfightEnd) {
                gm.ui.emit("ship_play_anim", 2);
                if (
                    13 != gm.data.mapCell_data.roleGuideVO.guideID ||
                    !gm.data.mapCell_data.roleGuideVO.isEnd
                ) {
                    TempData.setRoleGuideDataEnd();
                    gm.data.mapCell_data.setRoleGuideData(15, 0);
                    gm.ui.mapMainUI.checkGuideIsShow();
                }
            }
            if (15 == gm.data.mapCell_data.roleGuideVO.guideID) {
                gm.ui.mapMainUI.checkGuideIsShow();
            }
            this.lockSenceMoveMap(116, 1.5, this.initMapPosSucc, this);
        }, 2);
        this.show_task_entry();
        this.show_task_main_entry();
        this.show_ladder_entry();
        this.show_sign_entry();
        this.show_super_recruit_node_entry();
        this.show_lucky_wheel_node_entry();
        this.show_record_entry();
        this.show_more_entry();
        this.show_shop_entry();
        this.show_mail_entry();
        this.show_guide_gift_entry();
        this.add_desktop_node.active = false;
        gm.channel.checkShortcut((num: number) => {
            if (num >= 2) {
                this.show_add_desktop_entry();
            }
        });
        this.refreshRedBtnBook();
        // this.autoCompose.autoAnim.node.active = !gm.data.mapCell_data.isGuide; // cũ là this.autoCompose.active
        this.autoCompose.node.active = !gm.data.mapCell_data.isGuide;
        gm.audio.play_music(gm.const.AUDIO_91_MAIN_MUSIC);
    }

    protected onDisable(): void {
        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).removeEventListener(
            DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS,
            this.getBuildUpgradeCb,
            this
        );
        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).removeEventListener(
            DataEvent.GUIDE_CLICK_BARREL_POS,
            this.getBarrelCb,
            this
        );
        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).removeEventListener(
            DataEvent.GUIDE_CLICK_BUILD_UP_POS,
            this.getBuildUpCb,
            this
        );
        MvcEventDispatcher.getInstance(
            DataEvent.GUIDENEWERGUIDE
        ).removeEventListener(
            DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS,
            this.getClickGoFightCb,
            this
        );
        gm.ui.off("item_move", this.on_move_item_move, this);
        gm.ui.off("item_move_end", this.on_move_item_hide, this);
        gm.ui.off("item_children_refresh", this.on_move_item_refresh, this);
        gm.ui.off("item_unlock_refresh", this.on_item_unlock_refresh, this);
        gm.ui.off("compostimeChange", this.showNextCellNode, this);
        gm.ui.off("unLockNewArea", this.unLockNewArea, this);
        gm.ui.off("build_upgrade", this.refreshBuildItem, this);
        gm.ui.off("item_compose_time_change", this.composeTimesChange, this);
        gm.ui.off("build_metarail_change", this.showBuildMertarilFull, this);
        gm.ui.off("guide_del_item", this.guideDelItem, this);
        gm.ui.off("bookRedStatus", this.refreshRedBtnBook, this);
        gm.ui.off("ship_goods_change", this.putAllItemToMapAuto, this);
        this.node.targetOff(this);
    }

    public lockMainUI(): void {
        const type: SpecialEnum[] = [SpecialEnum.CAVES_TYPE];
        this.mapUI.active = !gm.data.mapCell_data.isGuide;
        const position: cc.Vec3[] = [new cc.Vec3(-206, -900)];
        this.roleBuildAnimNode.active = !gm.data.mapCell_data.isGuide;
        if (this.roleBuildAnimNode?.childrenCount == 0) {
            if (this.roleBuildAnimNode.active) {
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/staticAnim4",
                    NodePoolItem,
                    (data) => {
                        if (!data) return;
                        if (this.roleBuildAnimNode?.childrenCount == 0) {
                            const e = gm.data.config_data.getSpecialByID(
                                type[0]
                            );
                            if (e) {
                                this.roleBuildAnimNode.addChild(data.node);
                                if (
                                    gm.data.mapCell_data.role_map_data[
                                        e.unlock
                                    ] &&
                                    gm.data.mapCell_data.specialList[
                                        SpecialEnum.CAVES_TYPE
                                    ].state == 2
                                ) {
                                    this.roleBuildAnimNode.active = false;
                                    gm.pool.put(data.node);
                                }
                            }
                        } else {
                            gm.pool.put(data.node);
                        }
                    }
                );
            }
            this.roleBuildAnimNode.zIndex = gm.const.MAX_CELL_NUM - 3;
            this.roleBuildAnimNode.position = position[0];
        }
    }

    private lockAreaCloud(): void {
        let isAreaLocked = false;
        for (const areaKey in gm.const.localCloudAreaList) {
            ((key) => {
                if (
                    gm.data.mapCell_data.isGuide ||
                    2 == gm.data.mapCell_data.lockArea[key] ||
                    gm.data.mapCell_data.getAreaIDIsUnLock(parseInt(key))
                ) {
                    gm.pool.put_children(
                        this.lockAreaCloudList.children[
                            gm.const.localCloudAreaList[key].index
                        ]
                    );
                } else {
                    isAreaLocked = true;
                    if (
                        0 ==
                        this.lockAreaCloudList.children[
                            gm.const.localCloudAreaList[key].index
                        ].childrenCount
                    ) {
                        gm.pool.async_get(
                            BundleName.MAP,
                            "prefabs/lockCloud_" + key,
                            LockCloudArea,
                            (LockCloud) => {
                                if (
                                    0 ==
                                    this.lockAreaCloudList.children[
                                        gm.const.localCloudAreaList[key].index
                                    ].childrenCount
                                ) {
                                    LockCloud.initType(parseInt(key));
                                    this.lockAreaCloudList.children[
                                        gm.const.localCloudAreaList[key].index
                                    ].addChild(LockCloud.node);
                                } else {
                                    gm.pool.put(LockCloud.node);
                                }
                            }
                        );
                    } else {
                        this.lockAreaCloudList.children[
                            gm.const.localCloudAreaList[key].index
                        ].children[0]
                            .getComponent(LockCloudArea)
                            .refreshPanel();
                    }
                }
            })(areaKey);
        }
        this.lockAreaCloudList.zIndex = isAreaLocked
            ? gm.const.MAX_CELL_NUM
            : 0;
    }

    private show_task_entry(): void {
        if (this.task_node?.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.TASK,
                "prefabs/task_entry",
                TaskEntry,
                (data) => {
                    if (this.task_node.childrenCount == 0 && data) {
                        this.task_node.addChild(data.node);
                    } else {
                        if (data) gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    private show_task_main_entry(): void {
        if (this.task_main_node?.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.TASK,
                "prefabs/task_main_entry",
                TaskMainEntry,
                (data) => {
                    if (!data) return;
                    if (this.task_main_node.childrenCount == 0) {
                        this.task_main_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    public show_task_main_entry_guide(): void {
        const data = this.task_main_node?.getComponentInChildren(TaskMainEntry);
        if (data) data.show_weak_guide(0);
    }

    private show_ladder_entry(): void {
        if (this.ladder_node?.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.LADDER,
                "prefabs/ladder_entry",
                LadderEntry,
                (data) => {
                    if (!data) return;
                    if (this.ladder_node.childrenCount == 0) {
                        this.ladder_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    public show_sign_entry(): void {
        if (TempData.mainFunShowSign) {
            this.sign_node.active = true;
            if (this.sign_node?.childrenCount == 0) {
                gm.pool.async_get(
                    BundleName.SIGN,
                    "prefabs/sign_entry",
                    SignEntry,
                    (data) => {
                        if (!data) return;
                        if (this.sign_node.childrenCount == 0) {
                            this.sign_node.addChild(data.node);
                        } else {
                            gm.pool.put(data.node);
                        }
                    }
                );
            }
        } else {
            this.sign_node.active = false;
        }
    }

    public show_super_recruit_node_entry(): void {
        if (TempData.mainFunShowSuperHero) {
            this.super_recruit_node.active = true;
            if (this.super_recruit_node?.childrenCount == 0) {
                gm.pool.async_get(
                    BundleName.SUPER_RECRUIT,
                    "prefabs/super_recruit_entry",
                    NodePoolItem,
                    (data) => {
                        if (!data) return;
                        if (this.super_recruit_node.childrenCount == 0) {
                            this.super_recruit_node.addChild(data.node);
                        } else {
                            gm.pool.put(data.node);
                        }
                    }
                );
            }
        } else {
            this.super_recruit_node.active = false;
        }
    }

    public show_lucky_wheel_node_entry(): void {
        if (TempData.mainFunShowLucky) {
            this.lucky_wheel_node.active = true;
            if (this.lucky_wheel_node?.childrenCount == 0) {
                gm.pool.async_get(
                    BundleName.LUCKY_WHEEL,
                    "prefabs/lucky_wheel_entry",
                    NodePoolItem,
                    (data) => {
                        if (!data) return;
                        if (this.lucky_wheel_node.childrenCount == 0) {
                            this.lucky_wheel_node.addChild(data.node);
                        } else {
                            gm.pool.put(data.node);
                        }
                    }
                );
            }
        } else {
            this.lucky_wheel_node.active = false;
        }
    }

    private show_record_entry(): void {
        // this.record_node.active = true;
        this.record_node.active = gm.channel.is_video_share;
        if (gm.channel.is_video_share && this.record_node?.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.RECORD,
                "prefabs/record_entry",
                NodePoolItem,
                (data) => {
                    if (!data) return;
                    if (this.record_node.childrenCount == 0) {
                        this.record_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    private show_more_entry() {
        this.more_node.active = true;
        if (this.more_node.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.LADDER,
                "prefabs/more_entry",
                MoreEntry,
                (data) => {
                    if (!data) return;
                    if (this.more_node.childrenCount == 0) {
                        this.more_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    private show_shop_entry(): void {
        this.shop_node.active = false;
        // this.shop_node.active = true;
    }

    private show_mail_entry(): void {
        if (0 == this.mail_node.childrenCount) {
            gm.pool.async_get(
                BundleName.MAIL,
                "prefabs/mail_entry",
                MailEntry,
                (data) => {
                    if (0 == this.mail_node.childrenCount) {
                        this.mail_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    public show_guide_gift_entry(): void {
        if (TempData.mainFunShowGuide) {
            this.guide_gift_node.active = true;
            if (this.guide_gift_node?.childrenCount == 0) {
                gm.pool.async_get(
                    BundleName.GUIDEGIFT,
                    "prefabs/guide_gift_entry",
                    GuideGiftEntry,
                    (data) => {
                        if (!data) return;
                        if (this.guide_gift_node.childrenCount == 0) {
                            this.guide_gift_node.addChild(data.node);
                        } else {
                            gm.pool.put(data.node);
                        }
                    }
                );
            }
        } else {
            this.guide_gift_node.active = false;
        }
    }

    private show_add_desktop_entry(): void {
        this.add_desktop_node.active = true;
        if (this.add_desktop_node?.childrenCount == 0) {
            gm.pool.async_get(
                BundleName.ADD_DESKTOP,
                "prefabs/add_desktop_entry",
                AddDesktopEntry,
                (data) => {
                    if (!data) return;
                    if (this.add_desktop_node.childrenCount == 0) {
                        this.add_desktop_node.addChild(data.node);
                    } else {
                        gm.pool.put(data.node);
                    }
                }
            );
        }
    }

    public setBarrelNodeActive(): void {
        if (gm.data.mapCell_data.isGuide) {
            this.barrelNode.y = -208;
            this.barrelNode.active =
                0 < gm.data.mapCell_data.roleBarrelData.curBarrelNum;
            if (this.barrelNode.active) {
                this.barrelNode.y = 105;
            }
        } else {
            this.barrelNode.active = true;
            this.barrelNode.y = 105;
            this.barrelNode.getComponent(BarrelMgr).refreshPanel();
        }
    }

    private initMapPosSucc(): void {
        if (!gm.data.mapCell_data.isGuide) return;
        this.checkGuideIsShow();
    }

    public checkGuideIsShow(): void {
        let newE = (this.handAnim.active = !1);
        if (gm.data.mapCell_data.isGuide) {
            const guildData = TempData.getRoleGuideData();
            if (0 < guildData.guideID && !guildData.isEnd) {
                newE = true;
                gm.newerGuideMgr.initEventList();
            }

            if (!newE) {
                this.checkHandAnimDelay();
            }
        } else {
            this.isBeginDelayTime = false;
        }
    }

    public update(num: number): void {
        if (this.isBeginDelayTime) {
            this.curTimer += num;
            if (this.curTimer >= this.delayTime) {
                this.isBeginDelayTime = false;
                this.delayTime = 0;
                this.curTimer = 0;
                this.checkHandAnim();
            }
        }
        if (
            !this._isDragToBorderMoveSpeed.equals(cc.Vec2.ZERO) &&
            this.moveItemNode?.activeInHierarchy
        ) {
            this.mapContent.x += this._isDragToBorderMoveSpeed.x * num;
            this.mapContent.y += this._isDragToBorderMoveSpeed.y * num;
            this.moveItemNode.position = cc.v3(
                this.mapContent?.convertToNodeSpaceAR(this._touch_position)
            );
        }
    }

    public checkHandAnimDelay(num01: number = 0, num02: number = 0): void {
        this.delayTime = num01 == undefined ? 0.3 : num01;
        this.guideID = num02;
        this.isBeginDelayTime = true;
    }

    private goboundary(): void {
        let num01: number = 0;
        let num02: number = 0;
        const visibleSize = cc.view.getVisibleSize();
        const i = Math.ceil(visibleSize.height / 1500);
        const mapScale = this.mapContent.scale;
        const point = this.mapContent.getAnchorPoint();
        if (
            visibleSize.width / 2 >
            this._map_size.x * point.x * mapScale -
                this.mapContent.getPosition().x
        ) {
            num01 =
                this._map_size.x * point.x * mapScale - visibleSize.width / 2;
            this.mapContent?.setPosition(num01, this.mapContent.y);
        }
        if (
            visibleSize.height / 2 >
            this._map_size.y * point.y * mapScale -
                this.mapContent.getPosition().y
        ) {
            num02 =
                this._map_size.y * point.y * mapScale - visibleSize.height / 2;
            this.mapContent?.setPosition(this.mapContent.x, num02);
        }
        if (
            visibleSize.width / 2 >
            this._map_size.x * (1 - point.x) * mapScale +
                this.mapContent.getPosition().x
        ) {
            num01 =
                visibleSize.width / 2 -
                this._map_size.x * (1 - point.x) * mapScale;
            this.mapContent?.setPosition(num01, this.mapContent.y);
        }
        if (
            visibleSize.height / 2 >
            this._map_size.y * (1 - point.y) * mapScale +
                this.mapContent.getPosition().y
        ) {
            num02 =
                visibleSize.height / 2 -
                this._map_size.y * (1 - point.y) * mapScale;
            this.mapContent?.setPosition(this.mapContent.x, num02);
        }
    }

    private initShip(): void {
        if (gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE]) {
            if (this.ship.childrenCount == 0) {
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/ship",
                    ShipMgr,
                    (data) => {
                        if (!data) return;
                        if (this.ship.childrenCount == 0) {
                            if (
                                gm.data.mapCell_data.buildData[
                                    BuildTypeEnum.WHARFTAX_TYPE
                                ]
                            ) {
                                const buildData =
                                    gm.data.mapCell_data.buildData[
                                        BuildTypeEnum.SEAGOINGBOAT_TYPE
                                    ];
                                const mapItemDataVo = new MapItemDataVO();
                                mapItemDataVo.cellID = buildData.cellID;
                                mapItemDataVo.cellState = 2;
                                mapItemDataVo.itemState = 2;
                                mapItemDataVo.itemType =
                                    ItemTypeEnum.BUILD_TYPE;
                                mapItemDataVo.itemID = buildData.buildID;
                                mapItemDataVo.heroUID = 0;
                                data.node
                                    .getComponent(BuildIconItem)
                                    .initData(mapItemDataVo);
                                const newE = buildData.cellID % this._row;
                                const newNum = Math.floor(
                                    buildData.cellID / this._row
                                );
                                this.ship.y =
                                    -this._heightHalf - 51 * newNum - 20 * newE;
                                this.ship.x =
                                    this._widthHalf - 31 * newNum + 75 * newE;
                                this.ship.zIndex = gm.const.MAX_CELL_NUM;
                                this.ship.addChild(data.node);
                            } else {
                                gm.pool.put(data.node);
                            }
                        }
                    }
                );
            } else if (
                gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE]
            ) {
                const buildData =
                    gm.data.mapCell_data.buildData[
                        BuildTypeEnum.SEAGOINGBOAT_TYPE
                    ];
                const mapItemDataVO = new MapItemDataVO();
                mapItemDataVO.cellID = buildData.cellID;
                mapItemDataVO.cellState = 2;
                mapItemDataVO.itemState = 2;
                mapItemDataVO.itemType = ItemTypeEnum.BUILD_TYPE;
                mapItemDataVO.itemID = buildData.buildID;
                mapItemDataVO.heroUID = 0;
                this.ship?.children[0]
                    .getComponent(BuildIconItem)
                    .initData(mapItemDataVO);
                const num = buildData.cellID % this._row;
                const newE = Math.floor(buildData.cellID / this._row);
                this.ship.y = -this._heightHalf - 51 * newE - 20 * num;
                this.ship.x = this._widthHalf - 31 * newE + 75 * num;
                this.ship.active = true;
            }
        }
    }

    private refreshBuildItem(): void {
        for (var key in (this.lockAreaCloud(),
        gm.data.mapCell_data.buildData)) {
            if (parseInt(key) == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                this.initShip();
            } else {
                const itemNode = this.mapContent.getChildByName(
                    gm.data.mapCell_data.buildData[key].cellID.toString()
                );
                if (itemNode) {
                    const itemComponent = itemNode.getComponent(MainMapItem);
                    if (itemComponent) {
                        itemComponent.showItemNode();
                    }
                }
            }
        }
        this.setBarrelNodeActive();
    }

    private on_item_unlock_refresh(name: number): void {
        if (this.ship?.active) this.showUnComposeCell();

        const itemNode = this.mapContent?.getChildByName(name.toString());
        if (itemNode) {
            const itemComponent = itemNode.getComponent(MainMapItem);
            if (itemComponent) {
                itemComponent.playUnlockUpAnim();
            }
        }
    }

    private on_move_item_refresh(num: number): void {
        if (num != 395 && num != 313 && num != null) {
            const itemNode = this.mapContent?.getChildByName(num.toString());
            if (itemNode) {
                const itemComponent = itemNode.getComponent(MainMapItem);
                if (itemComponent) {
                    itemComponent.showItemNode();
                }
            }
        }
    }

    private on_move_item_move(position: cc.Vec2, type: number, number: number) {
        if (!this.moveItemNode.active) {
            if (this.roleBuildUpgrade.active) {
                this.roleBuildUpgrade.active = false;
                this.setMapUiShow(true);
            }
            this.moveItemNode.active = true;
            this.moveItemNode.zIndex = gm.const.MAX_CELL_NUM + 2;

            if (type == ItemTypeEnum.HERO_TYPE) {
                this.moveItemNode.getComponent(cc.Sprite).enabled = false;
                gm.pool.async_get(
                    BundleName.COMMON,
                    "prefabs/model/" + number,
                    NodePoolItem,
                    (nodepool) => {
                        if (0 == this.moveItemNode.children[0].childrenCount) {
                            this.moveItemNode.children[0].addChild(
                                nodepool.node
                            );
                            const skeletonComponent = nodepool.getComponent(
                                sp.Skeleton
                            );
                            if (skeletonComponent) {
                                skeletonComponent.setSkin("front");
                                skeletonComponent.setAnimation(0, "stay", true);
                            }
                        } else {
                            gm.pool.put(nodepool.node);
                        }
                    }
                );
            } else if (type == ItemTypeEnum.BUILD_TYPE) {
                this.moveItemNode.getComponent(cc.Sprite).enabled = true;
                const buildConfig = gm.data.config_data.getBuildCfgByID(number);
                if (buildConfig) {
                    Utils.async_set_sprite_frame(
                        this.moveItemNode.getComponent(cc.Sprite),
                        BundleName.MAP,
                        "res/build/" + buildConfig.model
                    );
                    this.moveItemNode.scale = 0.6666667;
                }
            } else {
                const itemConfig = gm.data.config_data.getItemCfgByID(number);
                if (itemConfig) {
                    this.moveItemNode.scale = 1;
                    this.moveItemNode.getComponent(cc.Sprite).enabled = true;
                    Utils.async_set_sprite_frame(
                        this.moveItemNode.getComponent(cc.Sprite),
                        BundleName.MAP,
                        "res/" + itemConfig.icon
                    );
                    if (
                        gm.data.mapCell_data.isGuide &&
                        this.roleGuideBuildUpgrade.active
                    ) {
                        const buildConfig = gm.data.config_data.getBuildCfgByID(
                            this._buildID
                        );
                        if (buildConfig) {
                            const buildData =
                                gm.data.mapCell_data.buildData[
                                    buildConfig.buildType
                                ];
                            if (buildData) {
                                for (const materialType in buildData.metrailData) {
                                    if (
                                        itemConfig.type ==
                                        parseInt(materialType)
                                    ) {
                                        if (
                                            itemConfig.type ==
                                                PropTypeEnum.WOOD_TYPE ||
                                            itemConfig.type ==
                                                PropTypeEnum.IRON_TYPE
                                        ) {
                                            if (
                                                itemConfig.number ==
                                                buildData.metrailData[
                                                    materialType
                                                ].max
                                            ) {
                                                if (
                                                    buildConfig.buildType ==
                                                    BuildTypeEnum.SEAGOINGBOAT_TYPE
                                                ) {
                                                    this.ship.children[0]
                                                        .getComponent(
                                                            BuildIconItem
                                                        )
                                                        .playScaleAnim();
                                                    this.guideScaleNode =
                                                        this.ship.children[0].getComponent(
                                                            BuildIconItem
                                                        );
                                                } else {
                                                    this.mapContent
                                                        .getChildByName(
                                                            buildData.cellID.toString()
                                                        )
                                                        .getComponent(
                                                            MainMapItem
                                                        )
                                                        .playScaleAnim();
                                                    this.guideScaleNode =
                                                        this.mapContent
                                                            .getChildByName(
                                                                buildData.cellID.toString()
                                                            )
                                                            .getComponent(
                                                                MainMapItem
                                                            )
                                                            .mapBuildNode.children[0].getComponent(
                                                                BuildIconItem
                                                            );
                                                }
                                            }
                                        } else if (
                                            itemConfig.id ==
                                            buildData.metrailData[materialType]
                                                .id
                                        ) {
                                            if (
                                                buildConfig.buildType ==
                                                BuildTypeEnum.SEAGOINGBOAT_TYPE
                                            ) {
                                                this.ship.children[0]
                                                    .getComponent(BuildIconItem)
                                                    .playScaleAnim();
                                                this.guideScaleNode =
                                                    this.ship.children[0].getComponent(
                                                        BuildIconItem
                                                    );
                                            } else {
                                                this.mapContent
                                                    .getChildByName(
                                                        buildData.cellID.toString()
                                                    )
                                                    .getComponent(MainMapItem)
                                                    .playScaleAnim();
                                                this.guideScaleNode =
                                                    this.mapContent
                                                        .getChildByName(
                                                            buildData.cellID.toString()
                                                        )
                                                        .getComponent(
                                                            MainMapItem
                                                        )
                                                        .mapBuildNode.children[0].getComponent(
                                                            BuildIconItem
                                                        );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.moveItemNode.children[1].getComponent(cc.Label).string = "";
            const posV2 = this.mapContent.convertToNodeSpaceAR(position);
            this.moveItemNode.position = new cc.Vec3(posV2.x, posV2.y, 0);
        }
        const posV2 = this.mapContent.convertToNodeSpaceAR(position);
        this.moveItemNode.position = new cc.Vec3(posV2.x, posV2.y, 0);
        if (!gm.data.mapCell_data.isGuide) {
            if (this.moveItemNode.activeInHierarchy) {
                this._touch_position = new cc.Vec2(position.x, position.y);
                const nodeSize = this.node.getContentSize();
                const halfNodeSize = cc.size(
                    0.5 * nodeSize.width,
                    0.5 * nodeSize.height
                );
                const localPosition = this.node.convertToNodeSpaceAR(position);
                const moveSpeed = 150 * this.mapContent.scale;

                if (localPosition.x < 50 - halfNodeSize.width) {
                    this._isDragToBorderMoveSpeed.x = moveSpeed;
                } else if (localPosition.x > halfNodeSize.width - 50) {
                    this._isDragToBorderMoveSpeed.x = -moveSpeed;
                } else {
                    this._isDragToBorderMoveSpeed.x = 0;
                }

                if (localPosition.y < 50 - halfNodeSize.height) {
                    this._isDragToBorderMoveSpeed.y = moveSpeed;
                } else if (localPosition.y > halfNodeSize.height - 50) {
                    this._isDragToBorderMoveSpeed.y = -moveSpeed;
                } else {
                    this._isDragToBorderMoveSpeed.y = 0;
                }
            } else {
                this._isDragToBorderMoveSpeed.x = 0;
                this._isDragToBorderMoveSpeed.y = 0;
            }
        }
    }

    public hideMoveItemNode(): void {
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        gm.pool.put_children(this.moveItemNode.children[0]);
        if (
            gm.data.mapCell_data.isGuide &&
            this.roleGuideBuildUpgrade?.active &&
            this.guideScaleNode
        ) {
            this.guideScaleNode.stopScaleAnim(); // TODO: ???
        }
    }

    public hideMoveBuildItemNode(): void {
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        gm.pool.put_children(this.moveItemNode.children[0]);
    }

    private on_move_item_hide(event: cc.Vec2, number: number): void {
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        gm.pool.put_children(this.moveItemNode.children[0]);
        if (
            gm.data.mapCell_data.isGuide &&
            this.roleGuideBuildUpgrade?.active &&
            this.guideScaleNode
        ) {
            this.guideScaleNode.stopScaleAnim(); //
        }
        if (gm.data.fight_temp_data.open_battle_panel_state == 0) {
            for (let a = 0; a < this.mapContent.childrenCount; a++) {
                const component =
                    this.mapContent?.children[a].getComponent(MainMapItem);
                if (component && component.playSameItemAnimEnd(event, number))
                    return;
            }
        }
    }

    public onClickCase(): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (gm.data.mapCell_data.roleBarrelData.curBarrelNum > 0) {
                gm.data.mapCell_data.addBarrelInMap();
            } else {
                gm.channel.show_video_ad(() => {
                    gm.data.mapCell_data.watch_ad_buy_barrel_times++;
                    gm.data.mapCell_data.addBarrelNum(40);
                    ReportData.instance.report_point(10301);
                    ReportData.instance.report_once_point(10302);
                    gm.channel.report_event("video_buy_barrel", {
                        event_desc: "看视频购买木桶",
                        buy_count:
                            gm.data.mapCell_data.watch_ad_buy_barrel_times,
                        task_desc: cc.js.formatStr(
                            "购买木桶%d次",
                            gm.data.mapCell_data.watch_ad_buy_barrel_times
                        ),
                    });
                }, this);
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }

    private randomShowCase(): void {
        const waterBarrelList = gm.data.mapCell_data.waterBarrelList;
        if (waterBarrelList.length > 0) {
            this.barrelParentNode.zIndex = 400;
            for (let t = 0; t < waterBarrelList.length; t++) {
                const e = t;
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/barrelItem",
                    WaterBarrelItem,
                    (data) => {
                        if (!data) return;
                        const barrelItem = data as WaterBarrelItem;
                        barrelItem.initData(waterBarrelList[e], e);
                        this.barrelParentNode?.addChild(data.node);
                    }
                );
            }
        }
    }

    private initMapForTest(): void {
        this._mapCfgList = gm.data.config_data.getMapCellCfg();
        for (let i = 0; i < this._mapCfgList.length; i++) {
            if (this._mapCfgList[i]) {
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/item",
                    MainMapItem,
                    (data) => {
                        if (!data) return;
                        const num01 = this._mapCfgList[i].mapIndex % this._row;
                        const num02 = Math.floor(
                            this._mapCfgList[i].mapIndex / this._row
                        );
                        const mainMap = data as MainMapItem;
                        mainMap.initData(this._mapCfgList[i], 1, 0, false);
                        data.node.y =
                            -this._heightHalf - 51 * num02 - 20 * num01;
                        data.node.x = this._widthHalf - 31 * num02 + 75 * num01;
                        this.mapContent?.addChild(data.node);
                    }
                );
            }
        }
    }

    private initMap(): void {
        const roleMapTotalData = gm.data.mapCell_data.role_map_total_data;
        Utils.sort_by_props(roleMapTotalData, { itemID: "ascending" });
        for (let e = 0; e < roleMapTotalData.length; e++) {
            const roleMap = roleMapTotalData[e];
            if (this._mapCfgList[roleMap]) {
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/item",
                    MainMapItem,
                    (data) => {
                        if (!data) return;
                        const num01 =
                            this._mapCfgList[roleMap].mapIndex % this._row;
                        const num02 = Math.floor(
                            this._mapCfgList[roleMap].mapIndex / this._row
                        );
                        const mainMap = data as MainMapItem;
                        mainMap.initData(this._mapCfgList[roleMap], 1, 0);
                        data.node.y =
                            -this._heightHalf - 51 * num02 - 20 * num01;
                        data.node.x = this._widthHalf - 31 * num02 + 75 * num01;
                        this.mapContent?.addChild(data.node);
                    }
                );
            }
        }
    }

    private unLockNewArea(): void {
        if (this.roleBuildUpgrade.active) {
            this.roleBuildUpgrade.active = false;
            this.setMapUiShow(true);
        }

        this._mapCfgList = gm.data.config_data.getMapCellCfg();

        const areaUnlock = gm.data.mapCell_data.areaUnlockCellIDList;
        let count = 0;
        for (; 0 < gm.data.mapCell_data._curNewUnlockCellList.length; ) {
            const newUnlock =
                gm.data.mapCell_data._curNewUnlockCellList.shift();
            if (this._mapCfgList[newUnlock]) {
                if (
                    this.mapContent.getChildByName(
                        this._mapCfgList[newUnlock].cellID.toString()
                    )
                ) {
                    gm.pool.put(
                        this.mapContent.getChildByName(
                            this._mapCfgList[newUnlock].cellID.toString()
                        )
                    );
                }
                gm.pool.async_get(
                    BundleName.MAP,
                    "prefabs/item",
                    MainMapItem,
                    (mapItem) => {
                        const mapIndex =
                            this._mapCfgList[newUnlock].mapIndex % this._row;
                        const mapFloor = Math.floor(
                            this._mapCfgList[newUnlock].mapIndex / this._row
                        );

                        mapItem.initData(this._mapCfgList[newUnlock], 3, count);
                        mapItem.node.y =
                            -this._heightHalf - 51 * mapFloor - 20 * mapIndex;
                        mapItem.node.x =
                            this._widthHalf - 31 * mapFloor + 75 * mapIndex;
                        this.mapContent.addChild(mapItem.node);
                        count++;
                    }
                );
            }
            if (0 == gm.data.mapCell_data._curNewUnlockCellList.length) {
                gm.data.mapCell_data.async_write_data();
            }
        }
        let num = 0;
        if (0 < areaUnlock.length) {
            for (; 0 < areaUnlock.length; ) {
                const areaUnlock0 = areaUnlock.shift();
                if (this._mapCfgList[areaUnlock0]) {
                    gm.pool.async_get(
                        BundleName.MAP,
                        "prefabs/item",
                        MainMapItem,
                        (mapItem) => {
                            const mapIndex =
                                this._mapCfgList[areaUnlock0].mapIndex %
                                this._row;
                            const mapfloor = Math.floor(
                                this._mapCfgList[areaUnlock0].mapIndex /
                                    this._row
                            );
                            mapItem.initData(
                                this._mapCfgList[areaUnlock0],
                                2,
                                num
                            );
                            mapItem.node.y =
                                -this._heightHalf -
                                51 * mapfloor -
                                20 * mapIndex;
                            mapItem.node.x =
                                this._widthHalf - 31 * mapfloor + 75 * mapIndex;
                            this.mapContent.addChild(mapItem.node);
                            num++;
                            if (0 == areaUnlock.length) {
                                gm.data.mapCell_data.async_write_data();
                                this.showUnComposeCell();
                                const roleGuide = TempData.getRoleGuideData();
                                if (
                                    roleGuide &&
                                    6 == roleGuide.guideID &&
                                    !roleGuide.isEnd
                                ) {
                                    this.scheduleOnce(
                                        this.checkGuideIsShow,
                                        0.5 * num
                                    );
                                }
                            }
                        }
                    );
                }
            }
        } else {
            this.showUnComposeCell();
        }

        gm.ui.emit("build_show_stateIcon", true);
        this.scheduleOnce(this.checkGuideIsShow, Math.max(0.5 * num, 1.5));
    }

    private showUnComposeCell(): void {
        let count = 0;
        const areaUnlockCellIDs = gm.data.mapCell_data.areaUnlockCellIDList;
        if (0 < areaUnlockCellIDs.length) {
            for (; 0 < areaUnlockCellIDs.length; ) {
                const cellID = areaUnlockCellIDs.shift();
                if (this._mapCfgList[cellID]) {
                    gm.pool.async_get(
                        BundleName.MAP,
                        "prefabs/item",
                        MainMapItem,
                        (mapItem) => {
                            const columnIndex =
                                this._mapCfgList[cellID].mapIndex % this._row;
                            const rowIndex = Math.floor(
                                this._mapCfgList[cellID].mapIndex / this._row
                            );

                            mapItem.initData(
                                this._mapCfgList[cellID],
                                4,
                                count
                            );
                            mapItem.node.y =
                                -this._heightHalf -
                                51 * rowIndex -
                                20 * columnIndex;
                            mapItem.node.x =
                                this._widthHalf -
                                31 * rowIndex +
                                75 * columnIndex;
                            this.mapContent.addChild(mapItem.node);
                            count++;
                            if (0 == areaUnlockCellIDs.length) {
                                this.showNextCellNode();
                            }
                        }
                    );
                }
            }
        } else {
            this.showNextCellNode();
        }
    }

    private onHideOneHeroByCellID(): void {}

    private onHidShowHeroByCellID(): void {}

    private onHideGoBattle(): void {}

    public showNextCellNode(): void {
        this.nextCompTimes.active = false;
        const nextLockedCell = gm.data.mapCell_data.getNextLockCell();
        if (nextLockedCell) {
            if (
                this.mapContent.getChildByName(nextLockedCell.cellID.toString())
            ) {
                this.nextCompTimes.active = true;
                this.nextCompTimes.zIndex = gm.const.MAX_CELL_NUM + 1;
                this.nextCompTimes.y =
                    this.mapContent.getChildByName(
                        nextLockedCell.cellID.toString()
                    ).y + 90;
                this.nextCompTimes.x =
                    this.mapContent.getChildByName(
                        nextLockedCell.cellID.toString()
                    ).x + 30;
                this.nextCompTimes.children[2].children[0].width = Math.min(
                    (Math.floor(gm.data.mapCell_data.role_compose_times) /
                        nextLockedCell.comTimes) *
                        48,
                    48
                );
                this.nextCompTimes.children[2].children[0].width = Math.max(
                    this.nextCompTimes.children[2].children[0].width,
                    20
                );
                this.nextCompTimes.children[1].getComponent(cc.Label).string =
                    "";
            }
        } else {
            this._nextOpenCell = null;
        }
    }

    private showBuildMertarilFull(buildID: number): void {
        if (
            gm.data.mapCell_data.isGuide &&
            this.roleGuideBuildUpgrade.active &&
            buildID == this._buildID
        ) {
            this.mask.active = false;
            this.roleGuideUpgradeBtn.getComponent(cc.Button).interactable =
                false;

            let keys = 0;
            for (
                let index = 0;
                index < this.roleGuideBuildMertrailNode.childrenCount;
                index++
            ) {
                const materialNode =
                    this.roleGuideBuildMertrailNode.children[index];
                if (materialNode.active) {
                    const materialProgress =
                        Math.min(
                            this._buildMeatril[index].max,
                            TempData.getBuildGuideMertarilNumByID(
                                buildID,
                                this._buildMeatril[index].id
                            )
                        ) / this._buildMeatril[index].max;
                    materialNode.children[2].getComponent(cc.Label).string =
                        TempData.getBuildGuideMertarilNumByID(
                            buildID,
                            this._buildMeatril[index].id
                        ) +
                        "/" +
                        this._buildMeatril[index].max;
                    if (
                        materialProgress >
                        materialNode.children[1].children[0].scaleX
                    ) {
                        materialNode.children[1].children[0].runAction(
                            cc.scaleTo(0.2, materialProgress, 1)
                        );
                    }

                    if (
                        TempData.getBuildGuideMertarilNumByID(
                            buildID,
                            this._buildMeatril[index].id
                        ) >= this._buildMeatril[index].max
                    ) {
                        materialNode.children[4].active = false;
                        keys++;
                    }
                }
            }
            const buildConfig = gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                const buildData = gm.data.mapCell_data.getBuildDataByType(
                    buildConfig.buildType
                );
                if (
                    buildData &&
                    keys == Object.keys(buildData.metrailData).length
                ) {
                    this.roleGuideUpgradeBtn.getComponent(
                        cc.Button
                    ).interactable = true;
                }
            }
            this.checkHandAnimDelay();
        }
        var n, r;

        if (!gm.data.mapCell_data.isGuide && !this.roleBuildUpgrade.active) {
            const buildConfig = gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                const buildData = gm.data.mapCell_data.getBuildDataByType(
                    buildConfig.buildType
                );
                if (buildData) {
                    for (const metrail in buildData.metrailData) {
                        if (
                            buildData.metrailData[metrail].cur <
                            buildData.metrailData[metrail].max
                        ) {
                            return;
                        }
                    }
                    this.showBuildUpgrade(buildID, buildData.cellID);
                }
            }
        }
    }

    public playGuideBarrelFly(num: number): void {
        gm.ui.show_coin_fly(
            RewardIdEnum.BARREL,
            this.mapContent
                ?.getChildByName("186")
                .convertToWorldSpaceAR(cc.Vec3.ZERO),
            num,
            this.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO)
        );
    }

    private onClickGuideUplvl(): void {
        this.roleGuideBuildUpgrade.active = false;
        const cfgByID = gm.data.config_data.getBuildCfgByID(this._buildID);
        if (!cfgByID) return;
        gm.audio.play_effect(gm.const.AUDIO_6_JIANZUSHEGNJI);
        this.playBuildUpgradeAnim(this._buildID);
        gm.data.mapCell_data.upgradeBuild(cfgByID.buildID);
        this.handAnim.active = false;
    }

    public playBuildUpgradeAnim(buildID: number) {
        const buildConfig = gm.data.config_data.getBuildCfgByID(buildID);
        if (buildConfig) {
            Utils.async_set_sprite_frame(
                this.buildUpAnim.children[1].getComponent(cc.Sprite),
                BundleName.MAP,
                "res/build/" + buildConfig.buildID,
                () => {
                    Utils.async_set_sprite_frame(
                        this.buildUpAnim.children[2].getComponent(cc.Sprite),
                        BundleName.MAP,
                        "res/build/" + buildConfig.nextBuildID,
                        () => {
                            this.buildUpAnim.active = true;

                            if (
                                buildConfig.buildType !=
                                BuildTypeEnum.SEAGOINGBOAT_TYPE
                            ) {
                                const buildData =
                                    gm.data.mapCell_data.getBuildDataByType(
                                        buildConfig.buildType
                                    );

                                if (!buildData) {
                                    return;
                                }
                                Utils.async_set_sprite_frame(
                                    this.buildUpAnim.children[1].getComponent(
                                        cc.Sprite
                                    ),
                                    BundleName.MAP,
                                    "res/build/" + buildConfig.buildID
                                );
                                Utils.async_set_sprite_frame(
                                    this.buildUpAnim.children[2].getComponent(
                                        cc.Sprite
                                    ),
                                    BundleName.MAP,
                                    "res/build/" + buildConfig.nextBuildID
                                );

                                const worldPosition = this.mapContent
                                    .getChildByName(buildData.cellID.toString())
                                    .getComponent(MainMapItem)
                                    .mapBuildNode.children[0].convertToWorldSpaceAR(
                                        this.mapContent
                                            .getChildByName(
                                                buildData.cellID.toString()
                                            )
                                            .getComponent(MainMapItem)
                                            .mapBuildNode.children[0].getComponent(
                                                BuildIconItem
                                            ).itemImg.node.position
                                    );
                                const localPosition =
                                    this.node.convertToNodeSpaceAR(
                                        worldPosition
                                    );

                                this.buildUpAnim.position = localPosition;
                                this.mapContent
                                    .getChildByName(buildData.cellID.toString())
                                    .getComponent(MainMapItem)
                                    .setBuildImgOpacity(0);
                            } else {
                                const worldPosition =
                                    this.ship.children[0].convertToWorldSpaceAR(
                                        this.ship.children[0].getComponent(
                                            BuildIconItem
                                        ).itemImg.node.position
                                    );
                                const localPosition =
                                    this.node.convertToNodeSpaceAR(
                                        worldPosition
                                    );
                                this.buildUpAnim.position = localPosition;
                                this.ship.opacity = 0;
                            }

                            this.buildUpAnim.getComponent(cc.Animation).play();
                            this.buildUpAnim.scale = this.mapContent.scale;
                            gm.ui.async_show_module(gm.const.FIREWORKS);
                            this._buildID = buildConfig.nextBuildID;
                        },
                        this
                    );
                },
                this
            );
        }
    }

    public showBuildUpgrade(buildID: number, cellID: number): void {
        gm.ui.emit("build_show_stateIcon", false);
        if (gm.data.mapCell_data.isGuide) {
            this.roleGuideBuildUpgrade.zIndex = 400;
            this.roleGuideBuildUpgrade.active = true;
            this.roleGuideUpgradeBtn.getComponent(cc.Button).interactable =
                false;
            this.roleGuideBuildUpgrade.scale =
                1 - 0.5 * (this.mapContent.scale - 1);
            this._buildMeatril = [];

            for (
                let index = 0;
                index < this.roleGuideBuildMertrailNode.childrenCount;
                index++
            ) {
                this.roleGuideBuildMertrailNode.children[index].active = false;
            }

            const buildConfig = gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                this._buildID = buildID;
                let height = 0;
                const buildData = gm.data.mapCell_data.getBuildDataByType(
                    buildConfig.buildType
                );
                for (const metrail in buildData.metrailData) {
                    const metrailNode =
                        this.roleGuideBuildMertrailNode.children[height];
                    metrailNode.active = true;

                    const itemConfig = gm.data.config_data.getItemCfgByID(
                        buildData.metrailData[metrail].id
                    );
                    if (itemConfig) {
                        Utils.async_set_sprite_frame(
                            metrailNode.children[0].getComponent(cc.Sprite),
                            BundleName.MAP,
                            "res/" + itemConfig.id
                        );
                        metrailNode.children[4].active = true;
                        metrailNode.children[2].getComponent(cc.Label).string =
                            buildData.metrailData[metrail].cur +
                            "/" +
                            buildData.metrailData[metrail].max;
                        metrailNode.children[1].children[0].scaleX =
                            buildData.metrailData[metrail].cur /
                            buildData.metrailData[metrail].max;
                    }
                    this._buildMeatril.push(buildData.metrailData[metrail]);
                    height++;
                }

                this.roleGuideBuildUpgradeBg.height = 88 + 54 * height;
                this.roleGuideBuildUpgrade.children[3].x = 0;

                if (buildConfig.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                    this.roleGuideBuildUpgrade.y = this.ship.y + 10;
                    this.roleGuideBuildUpgrade.x = this.ship.x - 20;
                } else if (
                    buildConfig.buildType == BuildTypeEnum.WHARFTAX_TYPE
                ) {
                    this.roleGuideBuildUpgrade.y =
                        this.mapContent.getChildByName(cellID.toString()).y +
                        10;
                    this.roleGuideBuildUpgrade.x =
                        this.mapContent.getChildByName(cellID.toString()).x +
                        70;
                    this.roleGuideBuildUpgrade.children[3].x = -80;
                } else {
                    this.roleGuideBuildUpgrade.y =
                        this.mapContent.getChildByName(cellID.toString()).y +
                        20;
                    this.roleGuideBuildUpgrade.x =
                        this.mapContent.getChildByName(cellID.toString()).x;
                }

                if (
                    buildConfig.buildType == BuildTypeEnum.TOWER_TYPE &&
                    15 == gm.data.mapCell_data.roleGuideVO.guideID
                ) {
                    this.checkHandAnimDelay();
                }

                if (
                    buildConfig.buildType == BuildTypeEnum.TOWER_TYPE &&
                    0 == buildConfig.buildLv
                ) {
                    gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 21,
                        guidedesc: cc.js.formatStr(
                            "%d.点击%s升级标志",
                            21,
                            buildConfig.buildName
                        ),
                    });
                }

                let targetID = 116;
                if (
                    !(
                        buildConfig.buildType != BuildTypeEnum.WHARFTAX_TYPE &&
                        buildConfig.buildType !=
                            BuildTypeEnum.SEAGOINGBOAT_TYPE &&
                        buildConfig.buildType != BuildTypeEnum.TOWER_TYPE
                    )
                ) {
                    targetID = 117;
                }

                this.lockSenceMoveMap(targetID, 1.5);
            }
        } else {
            this.roleBuildUpgrade.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            this.roleBuildUpgrade
                .getComponent(MapBuildUpgrade)
                .initData(buildID, cellID);
            this.roleBuildUpgrade.active = !this.roleBuildUpgrade.active;
            if (this.roleBuildUpgrade.active) {
                this.setMapUiShow(false);
                const buildType =
                    395 == cellID || 313 == cellID ? "ship" : cellID.toString();
                this.roleBuildUpgrade.zIndex = gm.const.MAX_CELL_NUM + 3;

                const targetPosition =
                    this.mapContent.getChildByName(buildType).position;
                const adjustedPosition = cc.v3(
                    360 + -Math.abs(targetPosition.x) * this.mapContent.scale,
                    Math.abs(targetPosition.y) * this.mapContent.scale - 300
                );

                this.mapContent.position = adjustedPosition;
                this.roleBuildUpgrade.y =
                    this.mapContent.getChildByName(buildType).y + 88;
                this.roleBuildUpgrade.x =
                    this.mapContent.getChildByName(buildType).x + 5;
            }
        }
    }

    public setMapUiShow(active: boolean): void {
        if (active) this.mapUI.active = !gm.data.mapCell_data.isGuide;
    }

    private lockMap(): void {}

    public showBattleEndCoin(num: number): void {
        if (num > 0) {
            gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.ship?.position);
        }
    }

    private onClickLockBtn(data: cc.Button): void {
        data.target.children[0].active = !data.target.children[0].active;
        this._isLockMoveMap = data.target.children[0].active;
    }

    private onClickShop(): void {
        if (
            !gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE] ||
            gm.data.mapCell_data.buildData[BuildTypeEnum.STALL_TYPE].buildLvl <
                1
        ) {
            gm.ui.show_notice("Gian hàng vẫn chưa được mở khóa!!!!");
        } else {
            gm.ui.async_show_module(gm.const.Store);
        }
    }

    private composeTimesChange(): void {
        this.showNextCellNode();
    }

    public lockSenceMoveMap(
        targetID: number,
        scale: number = 1,
        callback: Function | null = null,
        context: TaskMainEntry | EventScriptManager | MainMapUI = null
    ): void {
        this.mask.active = true;
        if (scale === undefined) scale = 1;
        if (callback === undefined) callback = null;
        if (context === undefined) context = null;

        let childName = "";
        if (targetID == 395 || targetID == 313) {
            childName = "ship";
        } else {
            childName = targetID.toString();
        }
        const position = this.mapContent.getChildByName(childName).position;
        const targetPosition = new cc.Vec2(
            410 + -Math.abs(position.x) * scale,
            Math.abs(position.y) * scale + 100
        );
        this.mapContent?.stopAllActions();
        this.mapContent?.runAction(
            cc.sequence(
                cc.spawn(cc.scaleTo(1, scale), cc.moveTo(1, targetPosition)),
                cc.callFunc(() => {
                    this.mask.active = false;
                    if (callback) callback.apply(context);
                })
            )
        );
        if (this.roleGuideBuildUpgrade?.active) {
            this.roleGuideBuildUpgrade.runAction(
                cc.scaleTo(1, 1 - 0.5 * (scale - 1))
            );
        }
        if (this.roleBuildUpgrade?.active) {
            this.roleBuildUpgrade.runAction(
                cc.scaleTo(1, 1 - 0.5 * (scale - 1))
            );
        }
    }

    private onClickBook(): void {
        gm.ui.show_panel(gm.const.BOOK);
    }

    private onClickTestMove(): void {
        this.playGuideBarrelFly(5);
    }

    public playComposeAnim(number: number): void {
        gm.audio.play_effect(gm.const.AUDIO_161_COMPOSE);
        const position = this.mapContent
            ?.getChildByName(number.toString())
            .convertToWorldSpaceAR(
                this.mapContent
                    ?.getChildByName(number.toString())
                    .getComponent(MainMapItem).touchNode.position
            );
        this.composeAnim.position =
            this.mapContent?.convertToNodeSpaceAR(position);
        this.composeAnim.active = true;
        this.composeAnim.zIndex = 400;
        this.composeAnim.y =
            this.mapContent?.convertToNodeSpaceAR(position).y + 28;
        this.composeAnim?.getComponent(cc.Animation).play();
    }

    public moveMapPosForGuide(
        actionType: number,
        moveDistance: number,
        duration: number,
        callback: Function | null,
        context: EventScriptManager
    ): void {
        if (actionType == 0) {
            if (gm.data.mapCell_data.getBuildDataByType(moveDistance)) {
                this.lockSenceMoveMap(116, 0.1 * duration, callback, context);
            }
        } else if (actionType == 2) {
            this.mask.active = true;
            this.mapContent?.runAction(
                cc.sequence(
                    cc.moveBy(1, cc.v2(0, moveDistance)),
                    cc.callFunc(() => {
                        this.mask.active = false;
                        if (callback) callback.apply(context);
                    })
                )
            );
        } else if (actionType == 3) {
            this.barrelNode.active = true;
            this.barrelNode.y = moveDistance == 105 ? -208 : 105;
            this.mask.active = true;
            this.barrelNode?.runAction(
                cc.sequence(
                    cc.moveTo(1, cc.v2(0, moveDistance)),
                    cc.callFunc(() => {
                        this.mask.active = false;
                        if (callback) callback.apply(context);
                    })
                )
            );
        }
    }

    private guideItemToBuild(itemID: number, targetCellID: number): void {
        let cellID = 0;
        const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
        if (itemConfig) {
            const itemDataArray =
                gm.data.mapCell_data.itemData[itemConfig.type];
            if (itemDataArray) {
                let s = !1;
                for (let index = 0; index < itemDataArray.length; index++) {
                    if (itemDataArray[index].itemID == itemID && 0 == cellID) {
                        cellID = itemDataArray[index].cellID;
                        s = !0;
                        break;
                    }
                }

                if (12002 == itemID && !s)
                    for (let index = 0; index < itemDataArray.length; index++) {
                        if (
                            12003 == itemDataArray[index].itemID &&
                            0 == cellID
                        ) {
                            cellID = itemDataArray[index].cellID;
                            s = !0;
                            break;
                        }
                    }
            }
            if (cellID) {
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;
                const worldPosition = this.mapContent
                    .getChildByName(a.toString())
                    .convertToWorldSpaceAR(
                        this.mapContent
                            .getChildByName(a.toString())
                            .getComponent(MainMapItem).touchNode.position
                    );
                const localPosition =
                    this.mapContent.convertToNodeSpaceAR(worldPosition);
                let targetWorldPos;
                if (395 == targetCellID || 313 == targetCellID) {
                    targetWorldPos =
                        this.ship.children[0].convertToWorldSpaceAR(
                            this.ship.children[0].getComponent(BuildIconItem)
                                .itemImg.node.position
                        );
                } else {
                    targetWorldPos = this.mapContent
                        .getChildByName(targetCellID.toString())
                        .getComponent(MainMapItem)
                        .mapBuildNode.children[0].convertToWorldSpaceAR(
                            this.mapContent
                                .getChildByName(targetCellID.toString())
                                .getComponent(MainMapItem)
                                .mapBuildNode.children[0].getComponent(
                                    BuildIconItem
                                ).itemImg.node.position
                        );
                }
                const targetLocalPos =
                    this.mapContent.convertToNodeSpaceAR(targetWorldPos);
                this.handAnim.position = localPosition;
                this.handAnim.stopAllActions();
                this.handAnim.getComponent(HandAnim).onStop();

                const moveDuration = Math.floor(
                    targetLocalPos.sub(localPosition).mag() / 60
                );
                this.handAnim.runAction(
                    cc.repeatForever(
                        cc.sequence(
                            cc.moveTo(
                                0.7 + 0.1 * moveDuration,
                                cc.v2(targetLocalPos)
                            ),
                            cc.moveTo(
                                0.3 + 0.05 * moveDuration,
                                cc.v2(localPosition)
                            )
                        )
                    )
                );
            }
        }
    }

    private guideWaterBarrel(): void {
        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        const position = this.barrelParentNode.children[
            this.barrelParentNode.childrenCount - 1
        ].convertToWorldSpaceAR(
            this.barrelParentNode.children[
                this.barrelParentNode.childrenCount - 1
            ].children[2].position
        );
        const localPosition = this.mapContent.convertToNodeSpaceAR(position);
        this.handAnim.position = cc.v3(localPosition.x + 30, localPosition.y);
    }

    private guideLandBarrel(): void {
        const roleMapData = gm.data.mapCell_data.role_map_data;
        for (let item in roleMapData) {
            if (11006 == roleMapData[item].itemID) {
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;
                this.handAnim.position = cc.v3(
                    this.mapContent.getChildByName(item).x + 25,
                    this.mapContent.getChildByName(item).y + 88
                );
                break;
            }
        }
    }

    private guideHeroToCompse(heroID: number, itemID: number): void {
        this.handAnim.active = true;
        let heroCellID = 0;
        let heroCell = 0;

        if (0 != heroID) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
            if (heroConfig) {
                const heroListForRole =
                    gm.data.mapCell_data.heroData[heroConfig.occupation];
                for (const heroKey in heroListForRole) {
                    if (heroListForRole[heroKey].itemID == heroID) {
                        heroCellID = heroListForRole[heroKey].cellID;
                        break;
                    }
                }

                if (3e4 <= itemID) {
                    for (const heroKey in heroListForRole) {
                        if (
                            heroListForRole[heroKey].itemID == itemID &&
                            heroListForRole[heroKey].cellID != heroCellID
                        ) {
                            heroCell = heroListForRole[heroKey].cellID;
                            break;
                        }
                    }
                } else {
                    const itemConfig =
                        gm.data.config_data.getItemCfgByID(itemID);
                    const itemListByType =
                        gm.data.mapCell_data.itemData[itemConfig.type];
                    for (const itemKey in itemListByType) {
                        if (itemListByType[itemKey].itemID == itemID) {
                            heroCell = itemListByType[itemKey].cellID;
                            break;
                        }
                    }
                }

                if (0 != heroCell) {
                    this.handAnim.active = true;
                    this.handAnim.zIndex = 401;

                    const worldStartPos = this.mapContent
                        .getChildByName(heroCellID.toString())
                        .convertToWorldSpaceAR(
                            this.mapContent
                                .getChildByName(heroCellID.toString())
                                .getComponent(MainMapItem).touchNode.position
                        );
                    const localTargetPos =
                        this.mapContent.convertToNodeSpaceAR(worldStartPos);
                    const targetWorldPos = this.mapContent
                        .getChildByName(heroCell.toString())
                        .convertToWorldSpaceAR(
                            this.mapContent
                                .getChildByName(heroCell.toString())
                                .getComponent(MainMapItem).touchNode.position
                        );
                    const TargetPos =
                        this.mapContent.convertToNodeSpaceAR(targetWorldPos);

                    this.handAnim.position = localTargetPos;
                    this.handAnim.stopAllActions();
                    this.handAnim.getComponent(HandAnim).onStop();
                    const distanceFrames = Math.floor(
                        TargetPos.sub(localTargetPos).mag() / 60
                    );
                    this.handAnim.runAction(
                        cc.repeatForever(
                            cc.sequence(
                                cc.moveTo(
                                    0.7 + 0.1 * distanceFrames,
                                    cc.v2(TargetPos)
                                ),
                                cc.moveTo(
                                    0.3 + 0.05 * distanceFrames,
                                    cc.v2(localTargetPos)
                                )
                            )
                        )
                    );
                }
            }
        }
    }

    private checkHandAnim(): void {
        const guideID = this.guideID;
        this.handAnim.active = false;
        this.handAnim.stopAllActions();

        if (gm.data.mapCell_data.isGuide) {
            if (0 < guideID && 1 == guideID) {
                const buildeData = gm.data.mapCell_data.getBuildDataByType(1);
                if (0 == buildeData.buildLvl) {
                    this.guideItemToBuild((a = 16005), buildeData.cellID);
                }
            } else if (1 != gm.data.mapCell_data.roleGuideVO.guideID) {
                if (
                    2 == gm.data.mapCell_data.roleGuideVO.guideID ||
                    3 == gm.data.mapCell_data.roleGuideVO.guideID
                ) {
                    var a = 30001,
                        i = 18001;
                    if (1 == gm.data.mapCell_data.role_compose_total_times) {
                        a = 30001;
                        i = 18001;
                    } else if (
                        2 == gm.data.mapCell_data.role_compose_total_times
                    ) {
                        i = a = 31001;
                    }

                    this.guideHeroToCompse(a, i);
                    return;
                }

                if (4 == gm.data.mapCell_data.roleGuideVO.guideID) {
                    if (gm.data.mapCell_data.roleGuideVO.isEnd) {
                        this.guideNewBuildUpSort(BuildTypeEnum.TOWER_TYPE);
                    }
                } else if (6 != gm.data.mapCell_data.roleGuideVO.guideID) {
                    if (8 != gm.data.mapCell_data.roleGuideVO.guideID) {
                        if (9 == gm.data.mapCell_data.roleGuideVO.guideID) {
                            if (gm.data.mapCell_data.isFirstGetCoin) {
                                this.handAnim.active = true;
                                this.handAnim.zIndex = 401;
                                const cellID =
                                    gm.data.mapCell_data.buildData[
                                        BuildTypeEnum.PRIVATEHOUSING_TYPE
                                    ].cellID;
                                const position = this.mapContent
                                    .getChildByName(cellID.toString())
                                    .getComponent(MainMapItem)
                                    .mapBuildNode.children[0].convertToWorldSpaceAR(
                                        this.mapContent
                                            .getChildByName(cellID.toString())
                                            .getComponent(MainMapItem)
                                            .mapBuildNode.children[0].getComponent(
                                                BuildIconItem
                                            ).productNode.position
                                    );
                                const nodeSpace =
                                    this.mapContent.convertToNodeSpaceAR(
                                        position
                                    );
                                this.handAnim.position = cc.v3(
                                    nodeSpace.x + 40,
                                    nodeSpace.y
                                );
                            } else if (
                                gm.data.mapCell_data.role_openBarrel_Times < 14
                            ) {
                                if (
                                    gm.data.mapCell_data.roleBarrelData
                                        .curBarrelNum <= 0
                                ) {
                                    this.guideLandBarrel();
                                }
                            } else if (
                                gm.data.mapCell_data.role_compose_total_times <
                                9
                            ) {
                                a = 16002;
                                if (
                                    7 ==
                                    gm.data.mapCell_data
                                        .role_compose_total_times
                                ) {
                                    a = 16003;
                                } else if (
                                    8 ==
                                    gm.data.mapCell_data
                                        .role_compose_total_times
                                ) {
                                    a = 13001;
                                }
                                this.guideItemToCompse(a);
                            } else if (
                                9 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                this.guideNewBuildUpSort(
                                    BuildTypeEnum.SEAGOINGBOAT_TYPE
                                );
                            }
                        } else if (
                            10 == gm.data.mapCell_data.roleGuideVO.guideID
                        ) {
                            if (
                                gm.data.mapCell_data.role_openBarrel_Times < 20
                            ) {
                                if (
                                    gm.data.mapCell_data.roleBarrelData
                                        .curBarrelNum <= 0
                                ) {
                                    this.guideLandBarrel();
                                }
                            } else if (
                                gm.data.mapCell_data.role_compose_total_times <
                                12
                            ) {
                                this.guideHeroToCompse(
                                    (a = 30001),
                                    (i = 18001)
                                );
                            } else if (
                                12 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                this.guideNewBuildUpSort(
                                    BuildTypeEnum.SEAGOINGBOAT_TYPE
                                );
                            }
                        } else if (
                            11 == gm.data.mapCell_data.roleGuideVO.guideID
                        ) {
                            if (
                                gm.data.mapCell_data.roleGuideVO.isEnd &&
                                gm.data.mapCell_data.role_compose_total_times <
                                    12
                            ) {
                                this.guideHeroToCompse(
                                    (a = 30001),
                                    (i = 18001)
                                );
                            }
                        } else if (
                            12 == gm.data.mapCell_data.roleGuideVO.guideID
                        ) {
                            if (
                                gm.data.mapCell_data.roleGuideVO.isEnd &&
                                12 ==
                                    gm.data.mapCell_data
                                        .role_compose_total_times
                            ) {
                                this.guideHeroToCompse(
                                    (a = 31001),
                                    (i = 31001)
                                );
                            }
                        } else if (
                            15 == gm.data.mapCell_data.roleGuideVO.guideID &&
                            gm.data.mapCell_data.roleGuideVO.isEnd
                        ) {
                            if (
                                gm.data.mapCell_data.role_compose_total_times <
                                5
                            ) {
                                var o = [16004, 17002];
                                for (var n = 0; n < o.length; n++) {
                                    var r = o[n],
                                        s =
                                            gm.data.config_data.getItemCfgByID(
                                                r
                                            );
                                    if (
                                        s &&
                                        gm.data.mapCell_data.itemData[s.type]
                                    ) {
                                        for (
                                            var c = !1, l = 0;
                                            l <
                                            gm.data.mapCell_data.itemData[
                                                s.type
                                            ].length;
                                            l++
                                        )
                                            if (
                                                gm.data.mapCell_data.itemData[
                                                    s.type
                                                ][l].itemID >= r
                                            ) {
                                                c = !0;
                                                break;
                                            }
                                        if (!c) {
                                            this.guideItemToCompse(r - 1);
                                            break;
                                        }
                                    }
                                }
                            } else if (
                                5 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                this.guideNewBuildUpSort(
                                    BuildTypeEnum.TOWER_TYPE
                                );
                            }
                        }
                    } else {
                        if (gm.data.mapCell_data.role_openBarrel_Times < 10) {
                            if (
                                gm.data.mapCell_data.roleBarrelData
                                    .curBarrelNum <= 0
                            ) {
                                this.guideLandBarrel();
                            }
                        } else if (
                            gm.data.mapCell_data.role_compose_total_times < 6
                        ) {
                            a = 16002;
                            if (
                                4 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                a = 16003;
                            } else if (
                                5 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                a = 15001;
                            }
                            this.guideItemToCompse(a);
                        } else if (
                            6 == gm.data.mapCell_data.role_compose_total_times
                        ) {
                            this.guideNewBuildUpSort(
                                BuildTypeEnum.PRIVATEHOUSING_TYPE
                            );
                        }
                    }
                } else {
                    if (gm.data.mapCell_data.role_openBarrel_Times < 6) {
                        if (0 < this.barrelParentNode.childrenCount) {
                            this.guideWaterBarrel();
                        } else {
                            this.guideLandBarrel();
                        }
                    } else if (
                        6 == gm.data.mapCell_data.role_openBarrel_Times
                    ) {
                        if (
                            3 == gm.data.mapCell_data.role_compose_total_times
                        ) {
                            this.guideNewBuildUpSort(
                                BuildTypeEnum.WHARFTAX_TYPE
                            );
                        } else {
                            a = 16003;
                            if (
                                2 ==
                                gm.data.mapCell_data.role_compose_total_times
                            ) {
                                this.guideItemToCompse(a);
                            }
                        }
                    }
                }
            } else {
                if (gm.data.mapCell_data.role_openBarrel_Times < 3) {
                    if (0 < this.barrelParentNode.childrenCount) {
                        gm.channel.report_event("ohayoo_game_guide", {
                            guideid: 2,
                            guidedesc: "2.点击水上木桶",
                        });
                        this.guideWaterBarrel();
                    } else {
                        gm.channel.report_event("ohayoo_game_guide", {
                            guideid: 3,
                            guidedesc: "3.打开木桶",
                        });
                        this.guideLandBarrel();
                    }
                }
            }
        }
    }

    private guideItemToCompse(itemID: number) {
        this.handAnim.active = true;
        let firstCellID: number = 0;
        let secondCellID: number = 0;

        if (itemID === 0) return;
        let itemConfig = gm.data.config_data.getItemCfgByID(itemID);
        if (!itemConfig) return;
        let itemType = itemConfig.type;
        let itemList = gm.data.mapCell_data.itemData[itemType];

        for (let item of itemList) {
            if (item.itemID == itemID) {
                firstCellID == 0
                    ? (firstCellID = item.cellID)
                    : secondCellID === 0 && (secondCellID = item.cellID);
            }
        }

        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        let firstNode: cc.Node = this.mapContent.getChildByName(
            firstCellID.toString()
        );
        let secondNode: cc.Node = this.mapContent.getChildByName(
            secondCellID.toString()
        );

        if (firstNode && secondNode) {
            const firstNodePosition = firstNode.convertToWorldSpaceAR(
                firstNode.getComponent(MainMapItem).touchNode.position
            );
            const firstNode2 =
                this.mapContent?.convertToNodeSpaceAR(firstNodePosition);
            const secondNodePosition = secondNode.convertToWorldSpaceAR(
                secondNode.getComponent(MainMapItem).touchNode.position
            );
            const secondNode2 =
                this.mapContent?.convertToNodeSpaceAR(secondNodePosition);

            this.handAnim.position = new cc.Vec3(firstNode2.x, firstNode2.y);
            this.handAnim?.stopAllActions();
            this.handAnim?.getComponent(HandAnim).onStop();

            const distance = Math.floor(secondNode2.sub(firstNode2).mag() / 60);
            this.handAnim?.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveTo(0.7 + 0.1 * distance, cc.v2(secondNode2)),
                        cc.moveTo(0.3 + 0.05 * distance, cc.v2(firstNode2))
                    )
                )
            );
        }
    }

    private guideBuildUpBtn(buildID: number): void {
        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        let position;
        let buildIdentifier = "";

        if (buildID === 395 || buildID === 313) {
            buildIdentifier = "ship";
        } else {
            buildIdentifier = buildID.toString();
        }

        if (buildIdentifier === "ship") {
            position = this.ship?.children[0].convertToWorldSpaceAR(
                this.ship.children[0].getComponent(BuildIconItem).buildStateIcon
                    .node.position
            );
        } else {
            position = this.mapContent
                ?.getChildByName(buildIdentifier)
                .getComponent(MainMapItem)
                .mapBuildNode.children[0].convertToWorldSpaceAR(
                    this.mapContent
                        ?.getChildByName(buildIdentifier)
                        .getComponent(MainMapItem)
                        .mapBuildNode.children[0].getComponent(BuildIconItem)
                        .buildStateIcon.node.position
                );
        }

        position = this.mapContent?.convertToNodeSpaceAR(position);
        this.handAnim.position = position;
    }

    private guideBuildUpSort(buildType: number) {
        if (this.roleGuideBuildUpgrade?.active) {
            if (this.roleGuideBuildUpgrade.children[1].active) {
                this.handAnim.active = true;
                this.handAnim.stopAllActions();
                this.handAnim.zIndex = 401;
                let worldPosition =
                    this.roleGuideBuildUpgrade.children[1].children[2].convertToWorldSpaceAR(
                        cc.Vec3.ZERO
                    );
                worldPosition =
                    this.mapContent.convertToNodeSpaceAR(worldPosition);
                this.handAnim.position = cc.v3(
                    worldPosition.x + 40,
                    worldPosition.y
                );
            } else {
                let buildData =
                    gm.data.mapCell_data.getBuildDataByType(buildType);
                if (buildData) {
                    this.handAnim.active = true;
                    this.handAnim.zIndex = 401;
                    let materialData = TempData.getBuildGuideMertarilData();
                    for (let materialKey in buildData.metrailData) {
                        let materialExists = false;
                        if (materialData) {
                            for (
                                let r = 0;
                                r < materialData.metrailList.length;
                                r++
                            ) {
                                if (
                                    parseInt(materialKey) ===
                                    materialData.metrailList[r].itemType
                                ) {
                                    materialExists = true;
                                    break;
                                }
                            }
                        }
                        if (!materialExists) {
                            let itemID =
                                parseInt(materialKey) === PropTypeEnum.WOOD_TYPE
                                    ? 16004
                                    : buildData.metrailData[materialKey].id;
                            itemID =
                                parseInt(materialKey) === PropTypeEnum.IRON_TYPE
                                    ? 17002
                                    : itemID;
                            this.guideItemToBuild(itemID, buildData.cellID);
                            break;
                        }
                    }
                }
            }
        } else {
            const buildData =
                gm.data.mapCell_data.getBuildDataByType(buildType);
            if (buildData) this.guideBuildUpBtn(buildData.cellID);
        }
    }

    private guideNewBuildUpSort(buildType: number) {
        if (this.roleGuideBuildUpgrade?.active) {
            if (this.roleGuideBuildUpgrade.children[1].active) {
                const buildData =
                    gm.data.mapCell_data.getBuildDataByType(buildType);
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;

                let materialData = TempData.getBuildGuideMertarilData();
                let materialIndex = 0;

                for (let materialKey in buildData.metrailData) {
                    if (!materialData) {
                        let worldPosition =
                            this.roleGuideBuildMertrailNode.children[
                                materialIndex
                            ].children[4].convertToWorldSpaceAR(cc.Vec3.ZERO);
                        let localPosition =
                            this.mapContent.convertToNodeSpaceAR(worldPosition);
                        this.handAnim.position = cc.v3(
                            localPosition.x + 30,
                            localPosition.y
                        );
                        return;
                    }

                    let materialExceeded = false;
                    for (let c = 0; c < materialData.metrailList.length; c++) {
                        if (
                            this._buildMeatril[c].id ===
                                buildData.metrailData[materialKey].id &&
                            TempData.getBuildGuideMertarilNumByID(
                                buildData.buildID,
                                this._buildMeatril[c].id
                            ) >= this._buildMeatril[c].max
                        ) {
                            materialExceeded = true;
                            break;
                        }
                    }
                    if (!materialExceeded) {
                        let worldPosition =
                            this.roleGuideBuildMertrailNode.children[
                                materialIndex
                            ].children[4].convertToWorldSpaceAR(cc.Vec3.ZERO);
                        let localPosition =
                            this.mapContent.convertToNodeSpaceAR(worldPosition);
                        this.handAnim.position = cc.v3(
                            localPosition.x + 30,
                            localPosition.y
                        );
                        return;
                    }
                    materialIndex++;
                }

                this.handAnim.active = true;
                this.handAnim.stopAllActions();
                this.handAnim.zIndex = 401;

                let upgradeButtonWorldPosition =
                    this.roleGuideUpgradeBtn.convertToWorldSpaceAR(
                        cc.Vec3.ZERO
                    );
                let upgradeButtonLocalPosition =
                    this.mapContent.convertToNodeSpaceAR(
                        upgradeButtonWorldPosition
                    );
                this.handAnim.position = cc.v3(
                    upgradeButtonLocalPosition.x + 40,
                    upgradeButtonLocalPosition.y
                );
            }
        } else if (gm.data.mapCell_data.getBuildDataByType(buildType)) {
            const buildData =
                gm.data.mapCell_data.getBuildDataByType(buildType);
            this.guideBuildUpBtn(buildData.cellID);
        }
    }

    private onClickGuideOneKeyAddItem(event: cc.Event, index: string): void {
        const targetIndex = parseInt(index);
        const buildConfig = gm.data.config_data.getBuildCfgByID(this._buildID);
        if (!buildConfig) return;

        const buildData = gm.data.mapCell_data.getBuildDataByType(
            buildConfig.buildType
        );
        let currentIndex = 0;

        for (let materialKey in buildData.metrailData) {
            if (currentIndex === targetIndex) {
                const itemConfig = gm.data.config_data.getItemCfgByID(
                    buildData.metrailData[materialKey].id
                );
                if (itemConfig) {
                    gm.data.mapCell_data.onekeyGetGuideAllMertrail(
                        buildConfig.buildType,
                        itemConfig.type
                    );
                }
                break;
            }
            currentIndex++;
        }
    }

    public showSpiritLock(): void {
        this.treeLock.active = true;
        this.treeLock.zIndex = gm.const.MAX_CELL_NUM + 3;
        const cell = this.mapContent.getChildByName("223");
        this.treeLock.y = cell.y + 188;
        this.treeLock.x = cell.x + 5;
        this.treeLock.scale = 1 - 0.5 * (this.mapContent.scale - 1);
    }

    public showHeroUnlockAni(num: number): void {
        gm.ui.set_module_args(gm.const.NEWHEROANIM.key, num);
        gm.ui.show_panel(gm.const.NEWHEROANIM);
    }

    public showCavesLock(): void {
        this.cavesLock.active = true;
        this.cavesLock.zIndex = gm.const.MAX_CELL_NUM + 3;
        const node = this.mapContent.getChildByName("143");
        this.cavesLock.y = node.y + 188;
        this.cavesLock.x = node.x + 5;
        this.cavesLock.scale = 1 - 0.5 * (this.mapContent.scale - 1);
    }

    public playUnLockMainTowerMoveMap(towerName: string): void {
        this.mask.active = true;
        const targetNode = this.mapContent?.getChildByName(towerName);
        if (!targetNode) return;

        const targetPosition = targetNode.position;
        this.mapContent?.stopAllActions();

        this.mapContent?.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(2, 1.2),
                    cc.moveTo(
                        2,
                        cc.v2(360 - targetPosition.x, -targetPosition.y)
                    )
                ),
                cc.delayTime(1),
                cc.callFunc(() => {
                    this.mask.active = false;
                })
            )
        );
    }

    private playLockSenseMoveMapToFun(): void {
        this.mask.active = true;
        const positions = [
            this.mapContent.getChildByName("223").position,
            this.mapContent.getChildByName("215").position,
            this.mapContent.getChildByName("9").position,
            this.mapContent.getChildByName("1").position,
            this.mapContent.getChildByName("116").position,
        ];

        this.mapContent?.stopAllActions();
        this.mapContent?.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(2, 1.2),
                    cc.moveTo(2, cc.v2(360 - positions[0].x, -positions[0].y))
                ),
                cc.delayTime(2),
                cc.moveTo(2, cc.v2(360 - positions[1].x, -positions[1].y)),
                cc.delayTime(2),
                cc.moveTo(2, cc.v2(360 - positions[2].x, -positions[2].y)),
                cc.delayTime(2),
                cc.moveTo(2, cc.v2(360 - positions[3].x, -positions[3].y)),
                cc.delayTime(2),
                cc.moveTo(2, cc.v2(360 - positions[4].x, -positions[4].y)),
                cc.callFunc(() => {
                    this.mask.active = false;
                })
            )
        );
    }

    public setLockSenceMoveMap(
        elementName: string,
        duration: number = 1.5
    ): void {
        this.mask.active = true;
        const targetPosition =
            this.mapContent.getChildByName(elementName).position;
        this.mapContent.stopAllActions();
        this.mapContent.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(1, duration),
                    cc.moveTo(
                        1,
                        cc.v2(
                            -targetPosition.x * duration + 360,
                            -targetPosition.y * duration
                        )
                    )
                ),
                cc.callFunc(() => {
                    this.mask.active = false;
                    this.handAnim.active = true;
                    this.handAnim.zIndex = 401;

                    const nodePosition = this.mapContent
                        .getChildByName(elementName)
                        .getComponent(MainMapItem)
                        .touchNode.parent.convertToWorldSpaceAR(
                            this.mapContent
                                .getChildByName(elementName)
                                .getComponent(MainMapItem).touchNode.position
                        );
                    const position =
                        this.mapContent.convertToNodeSpaceAR(nodePosition);

                    this.handAnim.position = position;
                    gm.ui.emit("open_special_fun", parseInt(elementName));
                    if (42 == parseInt(elementName)) {
                        gm.ui.mapMainUI.roleBuildAnimNode[0].active = false;
                    } else if (27 == parseInt(elementName)) {
                        gm.ui.mapMainUI.roleBuildAnimNode[1].active = false;
                    }
                })
            )
        );

        if (this.roleGuideBuildUpgrade.active) {
            this.roleGuideBuildUpgrade.runAction(
                cc.scaleTo(1, 1 - 0.5 * (duration - 1))
            );
        }
        if (this.roleBuildUpgrade.active) {
            this.roleBuildUpgrade.runAction(
                cc.scaleTo(1, 1 - 0.5 * (duration - 1))
            );
        }
    }

    private refreshRedBtnBook(active: boolean | null = null): void {
        let newT = active === undefined ? null : active;
        if (newT === null) {
            newT = gm.data.mapCell_data.checkBookItemHaveUnlockReward();
        }
        this.red_btn_book.active = newT;
    }

    private test(): void {
        const mapCellCfg = gm.data.config_data.getMapCellCfg();
        let quyu = "let quyu = [";
        let plantID = "let plantID = [";
        let landImgID = "let landImgID = [";
        let landYOffset = "let landYOffset = [";
        let plantXOffset = "let plantXOffset = [";
        let plantYOffset = "let plantYOffset = [";

        for (let s = 0; s < mapCellCfg.length; s++) {
            quyu += `${mapCellCfg[s].areaID},`;
            plantID += `${mapCellCfg[s].plantID},`;
            landImgID += `${mapCellCfg[s].landImgID},`;
            landYOffset += `${mapCellCfg[s].landYOffset},`;
            plantXOffset += `${mapCellCfg[s].plantXOffset},`;
            plantYOffset += `${mapCellCfg[s].plantYOffset},`;
        }

        quyu += "];";
        plantID += "];";
        landImgID += "];";
        landYOffset += "];";
        plantXOffset += "];";
        plantYOffset += "];";

        console.log(quyu);
        console.log(plantID);
        console.log(landImgID);
        console.log(landYOffset);
        console.log(plantXOffset);
        console.log(plantYOffset);
    }
}
