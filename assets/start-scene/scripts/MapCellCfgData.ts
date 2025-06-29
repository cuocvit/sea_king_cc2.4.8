//
import { ItemTypeEnum, SetItemNumEnum, PropTypeEnum, RewardIdEnum, HeroTypeEnum, BuildTypeEnum } from './Constants';
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';
import { Utils } from './Utils';
import { TempData } from './TempData';
import { TaskConditionType } from './TaskData';
import MainMapItem from './MainMapItem';
import PropItem from './PropItem'; // js
import { ReportData } from './NetUtils';
import { PoolConfig } from '../../common/configs/pool';
import { HeroConfig } from '../../common/configs/hero';
import { ItemConfig } from '../../common/configs/item';
import { BookConfig } from '../../common/configs/books';
import { MapCell } from '../../common/configs/mapcell';

enum listTypeEnum {
    SHOW_AREA_TYPE = 1,
    MAP_TOTAL_TYPE = 2,
    NEW_UNLOCK_CELL_TYPE = 3,
    NEW_UNLOCK_AREA_TYPE = 4,
    AREA_LOCK_CELL_TYPE = 5,
    REPORT_CELL_TYPE = 6,
    SPACE_TYPE = 7
}

export interface BuildData {
    buildState: number;
    buildID: number;
    buildType: number;
    buildLvl: number;
    cellID: number;
    isCanMove: number;
    productData: RoleProductDataVO;
    metrailData: Record<number, metrail>;
    upNeedCoin: number;
}

interface metrail {
    id: number;
    cur: number;
    max: number;
};

interface BarracksUnlockData {
    unlockId: number;
    state: number;
    ani_state: number;
    heroId: number;
}

interface HeroSkill {
    lvl: number;
    num: number;
}

export interface special {
    mertrail?: Record<number, number> | metrail;
    state: number
}




export class MapCellCfgData extends StorageBase {
    private static EVENT_DATA_CHANGE: string = "mapcell_data_change";
    private role_cur_unlock_area_ID: number;
    private role_cur_unlock_area_sort: number;
    private roleShowAreaIDList: number[];
    private roleUnlockAreaIDList: number[];
    private _warehouseIsNewList: number[];
    private roleSpaceList: number[];
    private tUnlockData: Record<number, number[]>;
    private role_item_array: number;
    private nextDayTime: number;
    private heroSkillList: Record<number, HeroSkill>;
    private barracks_unlock_id_list: Record<number, number>;
    private defense_List: Record<string, any>;
    private _defenseList: Record<number, DefenseHeroItemVO>;
    private heroTotalNum: number;
    private superHeroData: SuperHeroVO[];
    private initOpenBarrelData: number;

    public STORAGE_KEY: string;
    public is_first_auto_compose: number;
    public role_compose_total_times: number;
    public role_compose_times: number;
    public role_map_data: Record<string, MapItemDataVO>;
    public role_map_total_data: number[];
    public role_map_report_data: number[];
    public areaUnlockCellIDList: number[];
    public _curNewUnlockCellList: number[];
    public role_openBarrel_Times: number;
    public roleBarrelData: RoleBarrelDataVO | null;
    public roleCoinData: roleCoinDataVO;
    public heroData: Record<number, roleMapItemVO[]>;
    public buildData: Record<number, BuildData>;
    public itemData: Record<string, roleMapItemVO[]>;
    public role_build_lock_num: number;
    public barracks_unlock_data: heroUnloockData[];
    public waterBarrelList: roleBarrelItemVO[];
    public _warehouseList: number[];
    public _needRefreshCellList: number[];
    public roleGuideVO: GuideVO | null;
    public isGuide: boolean;
    public isFirstGetCoin: boolean;
    public isFirstBattle: boolean;
    public specialList: Record<number, special>;
    public diamond_buy_barrel_times: number;
    public watch_ad_buy_barrel_times: number;
    public buyBarrelNumTimes: number;
    public guideGift: GuideGiftVO | null;
    public lockArea: Record<number, number>;
    public last_timestamp: number;
    public is_upgrade_skill: number;


    constructor() {
        super();
        this.STORAGE_KEY = "MapCellConfigData";
        this.is_first_auto_compose = 0;
        this.role_compose_total_times = 0;
        this.role_compose_times = 0;
        this.role_map_data = {};
        this.role_map_total_data = [];
        this.role_map_report_data = [];
        this.role_cur_unlock_area_ID = 1;
        this.role_cur_unlock_area_sort = 0;
        this.roleShowAreaIDList = [];
        this.roleUnlockAreaIDList = [];
        this.areaUnlockCellIDList = [];
        this._curNewUnlockCellList = [];
        this.role_item_array = 0;
        this.role_openBarrel_Times = 0;
        this.roleBarrelData = null;
        this.roleCoinData = null;
        this.heroData = {};
        this.buildData = {};
        this.itemData = {};
        this.role_build_lock_num = 0;
        this.barracks_unlock_data = [];
        this.waterBarrelList = [];
        this._warehouseList = [];
        this._warehouseIsNewList = [];
        this._needRefreshCellList = [];
        this.roleSpaceList = [];
        this.tUnlockData = {};
        this.roleGuideVO = null;
        this.isGuide = true;
        this.isFirstGetCoin = true;
        this.nextDayTime = 0;
        this.isFirstBattle = true;
        this.specialList = {};
        this.heroSkillList = {};
        this.diamond_buy_barrel_times = 0;
        this.watch_ad_buy_barrel_times = 0;
        this.buyBarrelNumTimes = 0;
        this.guideGift = null;
        this.lockArea = {};
        this.last_timestamp = 0;
        this.barracks_unlock_id_list = {};
        this.defense_List = {};
        this._defenseList = {};
        this.heroTotalNum = 1;
        this.is_upgrade_skill = 0;
        this.superHeroData = [];
        this.initOpenBarrelData = 37;
    }

    public setAutoComposeUsed(): void {
        this.is_first_auto_compose = 1;
        this.async_write_data();
    }

    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data.call(this, (t) => {
            if (this.is_init) {
                TempData.isShowOffline = 600 < Math.floor(Date.now() / 1e3) - gm.data.mapCell_data.last_timestamp;
                if (TempData.isShowOffline) {
                    TempData.offline_time = Math.floor(Date.now() / 1e3) - gm.data.mapCell_data.last_timestamp;
                }
                this.checkLocalData();

                if (this._warehouseList.length != this._warehouseIsNewList.length) {
                    this._warehouseIsNewList = [];
                    for (let index = 0; index < this._warehouseList.length; index++) {
                        this._warehouseIsNewList.push(1);
                    }
                }

                if (2 <= this.buildData[BuildTypeEnum.TOWER_TYPE].buildLvl &&
                    this.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE] &&
                    395 != this.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID) {
                    this.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID = 395;
                }

                if (0 == Object.keys(this.lockArea).length) {
                    this.initLockArea();
                }

                this.barracks_unlock_id_list = {};
                for (let index = 0; index < this.barracks_unlock_data.length; index++) {
                    if (0 < this.barracks_unlock_data[index].state) {
                        (this.barracks_unlock_id_list[this.barracks_unlock_data[index].unlockId] = 2);
                    }
                }

                for (let index = 0; index < this.roleUnlockAreaIDList.length; index++) {
                    if (this.roleUnlockAreaIDList[index] >= this.role_cur_unlock_area_ID) {
                        const areaIDs = gm.data.config_data.getAreaIDList(this.roleUnlockAreaIDList[index]);
                        if (areaIDs) {
                            if (this.roleUnlockAreaIDList[index] > this.role_cur_unlock_area_ID) {
                                for (const key in areaIDs) {
                                    if (10000 != areaIDs[key].comTimes) {
                                        this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaIDs[key].cellID);
                                    }
                                }
                            }
                            else {
                                for (const key in areaIDs) {
                                    if (parseInt(key) >= this.role_cur_unlock_area_sort) {
                                        this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaIDs[key].cellID);
                                    }
                                }
                            }
                        }
                    }
                }

                TempData.initGuideTempData();
                const time = new Date;
                const timestamp = Math.floor(time.getTime() / 1000);
                const adjustedTimestamp = timestamp - (timestamp - 60 * time.getTimezoneOffset()) % 86400;

                if (adjustedTimestamp >= this.nextDayTime) {
                    this.nextDayTime = 86400 + adjustedTimestamp;
                    this.isFirstBattle = true;
                }

                this.sortTask(this.barracks_unlock_data);
                if (!this.guideGift) {
                    this.guideGift = new GuideGiftVO;
                    this.guideGift.guideBeginTime = Math.floor(Date.now() / 1e3);
                    this.guideGift.guideIsGet = false;
                }

            } else {
                this.roleBarrelData = new RoleBarrelDataVO;
                this.roleBarrelData.curBarrelNum = 0;
                this.roleBarrelData.maxBarrelNum = 0;
                this.roleBarrelData.freeBarrelCd = 0;
                this.roleBarrelData.nextFreeBarrelNum = 0;
                this.roleBarrelData.nextFreeBarrelTime = 0;
                this.roleBarrelData.curFreeBarrelTime = 0;
                this.role_build_lock_num = 0;
                this.roleCoinData = new roleCoinDataVO;
                this.roleCoinData.coinNum = 80;
                this.roleCoinData.diamondNum = 10;
                this.roleShowAreaIDList = [this.role_cur_unlock_area_ID];
                this.openNewAreaByID(this.role_cur_unlock_area_ID);
                this.unlockNewAreaID(this.role_cur_unlock_area_ID);
                this.waterBarrelList = [];

                const vec3 = [cc.v3(221, -1003), cc.v3(281, -1025), cc.v3(377, -1e3)];
                for (let index = 0; index < vec3.length; index++) {
                    const barrelIte = new roleBarrelItemVO;
                    barrelIte.itemID = 11006;
                    barrelIte.itemIndex = index;
                    barrelIte.itemPos = vec3[index];
                    this.waterBarrelList.push(barrelIte);
                }

                this.guideGift = new GuideGiftVO;
                this.guideGift.guideBeginTime = Math.floor(Date.now() / 1e3);
                this.guideGift.guideIsGet = false;

                const heroCfg = gm.config.get_config_data("HeroConfigData");
                for (const key in heroCfg.data) {
                    const data = heroCfg.data[key] as HeroConfig;
                    if (0 < data.unlock) {
                        const heroUnloock = new heroUnloockData;
                        heroUnloock.heroId = data.heroid;
                        heroUnloock.unlockId = data.unlock;
                        heroUnloock.state = 0;
                        heroUnloock.ani_state = 0;
                        this.barracks_unlock_data.push(heroUnloock);
                    }
                }

                this.sortTask(this.barracks_unlock_data);
                const date = new Date;
                const timestamp = Math.floor(date.getTime() / 1e3);

                this.nextDayTime = timestamp - (timestamp - 60 * date.getTimezoneOffset()) % 86400 + 86400;
                this.isFirstBattle = true;
                this.is_init = true;
                this.initSpecialData();
                this.heroSkillList = {};
                this.initGuideData();
                this.initLockArea();
                this.reelUnlcokHero(23001);
                this.async_write_data();
            }

            if (callback) {
                callback(t);
            }
        });
    }

    public checkLocalData() {
        if (!this.isGuide) {
            const newArr: number[] = [];
            for (const buildKey in this.buildData) {
                const cellID = this.buildData[buildKey].cellID
                if (395 != cellID &&
                    313 != cellID &&
                    null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this.buildData[buildKey].buildID) {
                    newArr.push(cellID);
                    this.role_map_data[cellID].itemID = this.buildData[buildKey].buildID;
                    this.role_map_data[cellID].itemType = ItemTypeEnum.BUILD_TYPE;
                    this.role_map_data[cellID].heroUID = 0;
                }
            }

            if (this.role_map_data[999]) {
                delete this.role_map_data[999];
            }

            for (const heroKey in this.heroData) {
                for (let heroIndex = this.heroData[heroKey].length - 1; 0 <= heroIndex; heroIndex--) {
                    const cellID = this.heroData[heroKey][heroIndex].cellID;
                    const itemID = this.heroData[heroKey][heroIndex].itemID;
                    if (999 != cellID) {
                        if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != itemID) {
                            let isCheck = false;
                            for (let index = 0; index < newArr.length; index++) {
                                if (newArr[index] == cellID) {
                                    this.heroData[heroKey].splice(index, 1);
                                    isCheck = true;
                                    break;
                                }
                            }

                            if (!isCheck) {
                                newArr.push(cellID);
                                this.role_map_data[cellID].itemID = itemID;
                                this.role_map_data[cellID].itemType = ItemTypeEnum.HERO_TYPE;
                                this.role_map_data[cellID].heroUID = this.heroTotalNum;
                                this.heroTotalNum++;
                            }
                        }

                    } else {
                        this.heroData[heroKey].splice(heroIndex, 1);
                    }
                }
            }

            for (const itemKey in this.itemData) {
                for (let itemIndex = this.itemData[itemKey].length - 1; 0 <= itemIndex; itemIndex--) {
                    const cellID = this.itemData[itemKey][itemIndex].cellID;
                    const itemID = this.itemData[itemKey][itemIndex].itemID;

                    if (999 != cellID) {
                        if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != itemID) {
                            let isCheck = false;
                            for (let index = 0; index < newArr.length; index++)
                                if (newArr[index] == cellID) {
                                    this.itemData[itemKey].splice(index, 1);
                                    isCheck = true;
                                    break;
                                }

                            if (!isCheck) {
                                newArr.push(cellID);
                                this.role_map_data[cellID].itemID = itemID;
                                this.role_map_data[cellID].itemType = ItemTypeEnum.ITEM_TYPE;
                                this.role_map_data[cellID].heroUID = 0;
                            }
                        }

                    } else {
                        this.itemData[itemKey].splice(itemIndex, 1);
                    }
                }

            }

            for (const defense in this._defenseList) {
                const cellID = this._defenseList[defense].cellID;
                if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this._defenseList[defense].heroid) {
                    newArr.push(cellID);
                    delete this._defenseList[defense];
                }
            }

            for (let heroData = this.superHeroData.length - 1; 0 <= heroData; heroData--) {
                const cellID = this.superHeroData[heroData].cellID;
                if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this.superHeroData[heroData].heroid) {
                    newArr.push(cellID);
                    this.superHeroData.splice(heroData, 1);
                }
            }

            console.log("需要校正的格子" + newArr);
            if (0 < newArr.length) {
                newArr.sort();
                const uniqueCellIDs = [newArr[0]];
                for (let index = 1; index < newArr.length; index++) {
                    if (newArr[index] !== newArr[index - 1]) {
                        uniqueCellIDs.push(newArr[index]);
                    }
                }

                for (let index = 0; index < newArr.length; index++) {
                    gm.ui.emit("item_children_refresh", newArr[index]);
                }
            }
        }
    }

    public sortTask(tasks: BarracksUnlockData[]): void {
        tasks.sort((t, e) => {
            const rowA = gm.config.get_row_data("HeroConfigData", t.heroId.toString()) as HeroConfig;
            const rowB = gm.config.get_row_data("HeroConfigData", e.heroId.toString()) as HeroConfig;
            return t.state > e.state || !(t.state < e.state || rowA.sort > rowB.sort) ? -1 : 1;
        });
    }

    public reelUnlcokHero(heroId: number): void {
        this.addBarracksIDToList(heroId);
        for (let i = 0; i < this.barracks_unlock_data.length; i++) {
            if (heroId === this.barracks_unlock_data[i].unlockId && this.barracks_unlock_data[i].state === 0) {
                this.barracks_unlock_data[i].state = 1;
                this.barracks_unlock_data[i].ani_state = 0;
                break;
            }
        }
    }

    public getReelUnlcokHeroID(heroId: number): boolean {
        for (let i = 0; i < this.barracks_unlock_data.length; ++i) {
            if (heroId == this.barracks_unlock_data[i].heroId && this.barracks_unlock_data[i].state > 0) {
                return true;
            }
        }
        return false;
    }

    private compositeUnlockHero(heroId: number): void {
        for (let i = 0; i < this.barracks_unlock_data.length; ++i) {
            if (heroId === this.barracks_unlock_data[i].heroId && this.barracks_unlock_data[i].state == 1) {
                this.barracks_unlock_data[i].state = 2;
                this.barracks_unlock_data[i].ani_state = 0;
                break;
            }
        }
    }

    private initLockArea(): void {
        for (const key in gm.const.localCloudAreaList) {
            this.lockArea[key] = 1;
        }
    }


    public getCellIsWall(cellID: number): boolean {
        let heroCfg;
        return (!(!this.role_map_data[cellID] || this.role_map_data[cellID].itemType != ItemTypeEnum.HERO_TYPE)) &&
            !(!(heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[cellID].itemID)) || 10 != heroCfg.occupation)
    }

    public getMapdataByCellID(cellID: number): number {
        return this.role_map_data[cellID] && this.role_map_data[cellID].heroUID && this.role_map_data[cellID].heroUID > 0
            ? this.role_map_data[cellID].heroUID
            : 0;
    }

    public unlockSpecialArea(areaID: number): void {
        this.lockArea[areaID] = 2;
        this.async_write_data();
    }

    public getIsUnlock(areaID: number): boolean {
        for (let i = 0; i < this.role_map_total_data.length; i++) {
            if (areaID == this.role_map_total_data[i]) return true;
        }
        return false;
    }

    private initSpecialData(): void {
        this.specialList = {};
        const specialListConfig = gm.data.config_data.getSpecialList();

        for (const key in specialListConfig) {
            const areaID = parseInt(key);
            if (!this.specialList[areaID]) {
                this.specialList[areaID] = {} as special;
            }
            this.specialList[areaID].state = 1;
            for (let index = 0; index < specialListConfig[key].prop.length; index++) {
                if (0 < specialListConfig[key].prop[index]) {
                    if (!this.specialList[areaID].mertrail) {
                        this.specialList[areaID].mertrail = {};
                    }
                    this.specialList[areaID].mertrail[specialListConfig[key].prop[index]] = 0;
                }
            }
        }
    }

    public openNewAreaByID(areaID: number): void {
        this.addIndexToList(listTypeEnum.SHOW_AREA_TYPE, areaID);
        const areaConfig = gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            for (const key in areaConfig) {
                if (areaConfig[key].comTimes === 10000) {
                    if (areaID > 1) {
                        this.addIndexToList(listTypeEnum.NEW_UNLOCK_CELL_TYPE, areaConfig[key].cellID);
                    }
                    this.addIndexToList(listTypeEnum.MAP_TOTAL_TYPE, areaConfig[key].cellID);
                }
            }
        }
    }

    public getAreaIDIsUnLock(areaID: number): boolean {
        for (let index = 0; index < this.roleUnlockAreaIDList.length; index++) {
            if (areaID === this.roleUnlockAreaIDList[index]) return true;
        }
        return false;
    }

    public unlockNewAreaID(areaID: number, isSpecial: boolean = false): void {
        this.addIndexToList(listTypeEnum.SHOW_AREA_TYPE, areaID);
        const areaConfig = gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            let isCheck = false;
            this.addIndexToList(listTypeEnum.NEW_UNLOCK_AREA_TYPE, areaID);
            if (!this.getNextLockCell()) {
                const nextAreaID = this.role_cur_unlock_area_ID + 1;
                if (this.getAreaIDIsUnLock(nextAreaID)) {
                    this.role_cur_unlock_area_ID = nextAreaID;
                    this.role_cur_unlock_area_sort = 0;
                    isCheck = !(this.role_compose_times = 0);
                }
            }
            for (const key in areaConfig) {
                if (10000 == areaConfig[key].comTimes) {
                    if (1 < areaID && areaID != gm.const.CAVESAREAID) {
                        this.addIndexToList(listTypeEnum.NEW_UNLOCK_CELL_TYPE, areaConfig[key].cellID);
                        if (!(isSpecial && (areaID == gm.const.ICEAREAID || areaID == gm.const.FIREREAID))) {
                            this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                        }
                    }

                    if (1 == areaID) {
                        this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                    }

                    if (0 == areaConfig[key].isObstruct && areaID != gm.const.CAVESAREAID) {
                        const mapItemDataVO = new MapItemDataVO;
                        mapItemDataVO.cellState = 2;
                        mapItemDataVO.itemState = 2;
                        mapItemDataVO.itemID = areaConfig[key].itemID;
                        mapItemDataVO.cellID = areaConfig[key].cellID;
                        mapItemDataVO.heroUID = 0;
                        mapItemDataVO.itemType = areaConfig[key].itemType;
                        this.role_map_data[areaConfig[key].cellID] = mapItemDataVO;

                        if (0 < areaConfig[key].itemID) {
                            if (areaConfig[key].itemType == ItemTypeEnum.BUILD_TYPE) {
                                this.addBuild(areaConfig[key].itemID, areaConfig[key].cellID);
                            } else {
                                this.addRoleItem(areaConfig[key].itemID, areaConfig[key].cellID);
                                if (30000 < areaConfig[key].itemID) {
                                    this.role_map_data[areaConfig[key].cellID].heroUID = this.heroTotalNum;
                                    this.heroTotalNum++;
                                }
                            }

                        } else {
                            this.addRoleSpaceCellByID(areaConfig[key].cellID);
                        }

                        this.checkBuildIsActive(areaConfig[key].cellID);
                        if (1 < areaID) {
                            ReportData.instance.report_once_point(50000 + areaConfig[key].cellID);
                            gm.channel.report_event("unlock_map_cell", {
                                event_desc: "解锁地图格子",
                                cell_count: areaConfig[key].cellID,
                                desc: cc.js.formatStr("解锁地图格子%d", areaConfig[key].cellID)
                            });
                        }
                    }

                    if (!(!isCheck && 1 != areaID)) {
                        this.role_cur_unlock_area_sort++;
                    }

                } else {
                    this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaConfig[key].cellID);
                }
            }
            this.async_write_data();
        }
    }

    public lockCaveAllInitCell(areaID: number): void {
        const areaConfig = gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            for (const key in areaConfig) {
                if (10000 == areaConfig[key].comTimes) {
                    this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                    if (0 == areaConfig[key].isObstruct) {
                        const mapItemDataVO = new MapItemDataVO;
                        mapItemDataVO.cellState = 2;
                        mapItemDataVO.itemState = 2;
                        mapItemDataVO.itemID = areaConfig[key].itemID;
                        mapItemDataVO.cellID = areaConfig[key].cellID;
                        mapItemDataVO.heroUID = 0;
                        mapItemDataVO.itemType = areaConfig[key].itemType;
                        this.role_map_data[areaConfig[key].cellID] = mapItemDataVO;
                        if (0 < areaConfig[key].itemID) {
                            if (areaConfig[key].itemType == ItemTypeEnum.BUILD_TYPE) {
                                this.addBuild(areaConfig[key].itemID, areaConfig[key].cellID);
                            } else {
                                this.addRoleItem(areaConfig[key].itemID, areaConfig[key].cellID);
                            }

                        } else {
                            this.addRoleSpaceCellByID(areaConfig[key].cellID);
                        }

                        ReportData.instance.report_once_point(5e4 + areaConfig[key].cellID);
                        gm.channel.report_event("unlock_map_cell", {
                            event_desc: "解锁地图格子",
                            cell_count: areaConfig[key].cellID,
                            desc: cc.js.formatStr("解锁地图格子%d", areaConfig[key].cellID)
                        });
                    }
                }
            }
            this.async_write_data();
        }
    }

    private addRoleSpaceCellByID(cellID: number): void {
        this.addIndexToList(listTypeEnum.SPACE_TYPE, cellID);
    }

    public getRoleSkillData(skillID: number): HeroSkill {
        return this.heroSkillList[skillID] || { lvl: 0, num: 0 };
    }

    public upgradeRoleSkillData(skillID: number): void {
        if (this.heroSkillList[skillID]) {
            this.heroSkillList[skillID].lvl += 1;
            this.heroSkillList[skillID].num = 0;
            this.async_write_data();
        }
    }

    public getMySoulNum(): number {
        const soulData = this.itemData[PropTypeEnum.SOUL_TYPE];
        let totalSoulNum = 0;
        if (soulData) {
            for (let index = 0; index < soulData.length; index++) {
                const itemConfig = gm.data.config_data.getItemCfgByID(soulData[index].itemID);
                if (itemConfig) {
                    totalSoulNum += itemConfig.number;
                }
            }
        }
        return totalSoulNum;
    }

    public addRoleSkillItemData(skillID: number, requiredNum: number): void {
        if (!this.heroSkillList[skillID]) {
            this.heroSkillList[skillID] = {
                lvl: 0,
                num: 0
            };
        }

        for (let index = this.itemData[PropTypeEnum.SOUL_TYPE].length - 1; 0 <= index; index--) {
            const itemID = this.itemData[PropTypeEnum.SOUL_TYPE][index].itemID;
            if (this.role_map_data[this.itemData[PropTypeEnum.SOUL_TYPE][index].cellID].itemID != itemID) {
                this.itemData[PropTypeEnum.SOUL_TYPE].splice(index, 1);
            }
        }

        let totalAdded = 0;
        const soulData = this.itemData[PropTypeEnum.SOUL_TYPE];
        for (let index = soulData.length - 1; 0 <= index; index--) {
            const itemID = soulData[index].itemID;
            const itemCfg = gm.data.config_data.getItemCfgByID(itemID);
            const itemNum = itemCfg.number;
            if (!(totalAdded + itemNum <= requiredNum)) {
                this._needRefreshCellList.push(soulData[index].cellID);
                const remaining = requiredNum - totalAdded;
                this.heroSkillList[skillID].num += remaining;
                this.delCellItemByCellID(soulData[index].cellID);
                gm.data.task_data.update_task_progress(TaskConditionType.POSEIDON, remaining);
                this.splitItemNum(itemCfg.number - remaining, itemID);
                break;
            }

            this._needRefreshCellList.push(soulData[index].cellID);
            this.delCellItemByCellID(soulData[index].cellID);
            totalAdded += itemNum;
            this.heroSkillList[skillID].num += itemNum;
            gm.data.task_data.update_task_progress(TaskConditionType.POSEIDON, itemNum);
        }

        this.async_write_data();
    }

    private addIndexToList(type: number, id: number): void {
        let areaList = this.roleShowAreaIDList;
        if (type == listTypeEnum.SHOW_AREA_TYPE) {
            areaList = this.roleShowAreaIDList;
        } else if (type == listTypeEnum.MAP_TOTAL_TYPE) {
            areaList = this.role_map_total_data;
        } else if (type == listTypeEnum.NEW_UNLOCK_CELL_TYPE) {
            areaList = this._curNewUnlockCellList;
        } else if (type == listTypeEnum.NEW_UNLOCK_AREA_TYPE) {
            areaList = this.roleUnlockAreaIDList;
        } else if (type == listTypeEnum.AREA_LOCK_CELL_TYPE) {
            areaList = this.areaUnlockCellIDList;
        } else if (type == listTypeEnum.REPORT_CELL_TYPE) {
            areaList = this.role_map_report_data;
        } else if (type == listTypeEnum.SPACE_TYPE) {
            areaList = this.roleSpaceList;
        }

        for (let index = 0; index < areaList.length; index++) {
            if (id == areaList[index]) {
                return;
            }
        }

        areaList.push(id);
        if (type == listTypeEnum.SPACE_TYPE) {
            gm.ui.emit("refresh_barrel_num");
            gm.ui.emit("ship_goods_change");
        }
    }

    // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
    public clearWareHouseList(): void {
        this._warehouseList = [];
        gm.ui.emit("ship_goods_change");
    }

    private addWareHouseItem(item: number, isNew: number): void {
        if (this._warehouseList.length < 100) {
            this._warehouseList.push(item);
            this._warehouseIsNewList.push(isNew);
        }
    }

    public addWareHouseList(items: number[], isNew: number = 1): void {
        for (let i = 0; i < Math.min(100, items.length); i++) {
            this.addWareHouseItem(items[i], isNew);
        }
        gm.ui.emit("ship_goods_change");
    }

    public putAllItemToMapCell(): number[] {
        const result: number[] = [];
        while (this.roleSpaceList.length > 0 && this._warehouseList.length > 0) {
            const spaceID = this.getRoleSpceListShift();
            const item = this._warehouseList.shift();
            if (this._warehouseIsNewList.shift() == 1) {
                result.push(spaceID);
            }
            const itemType = item >= 30000 ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
            this.changeMapItemDataByID(spaceID, itemType, item);
            this.addRoleItem(item, spaceID);
            this._needRefreshCellList.push(spaceID);
            gm.ui.show_item_fly(
                item,
                gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO),
                gm.ui.mapMainUI.mapContent.getChildByName(spaceID.toString()).getComponent(MainMapItem).itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO)
            );
        }
        this.async_write_data();
        return result;
    }

    public getIsHaveSpeceCellID(): boolean {
        return this.roleSpaceList.length > 0;
    }

    public getRoleSpceListShift(): number {
        if (0 < this.roleSpaceList.length) {
            if (this.isGuide) {
                for (let index = 0; index < this.roleSpaceList.length; index++) {
                    const spaceID = this.roleSpaceList[index];
                    if (![118, 134, 152, 149, 167, 183, 130, 148, 135, 153, 196, 205].includes(spaceID)) {
                        this.roleSpaceList.splice(index, 1);
                        gm.ui.emit("refresh_barrel_num");
                        return spaceID;
                    }
                }
                const roleSpaceList = this.roleSpaceList.shift();
                gm.ui.emit("refresh_barrel_num");
                return roleSpaceList;
            }
            const roleSpaceList = this.roleSpaceList.shift();
            gm.ui.emit("refresh_barrel_num");
            return roleSpaceList;
        }
    }

    private initGuideData(): void {
        this.roleGuideVO = new GuideVO();
        this.roleGuideVO.guideID = 1;
        this.roleGuideVO.runningIndex = 0;
        this.roleGuideVO.isFinishAllGuide = 0;
        this.roleGuideVO.step = 0;
        this.roleGuideVO.isEnd = false;
        TempData.initGuideTempData();
    }

    public setRoleGuideData(guideID: number, runningIndex: number): void {
        if (this.roleGuideVO) {
            if (guideID == 0) {
                this.roleGuideVO.guideID = 0;
                this.roleGuideVO.isFinishAllGuide = 1;
            } else {
                if (runningIndex == 0) {
                    this.roleGuideVO.isEnd = false;
                }
                this.roleGuideVO.guideID = guideID;
                this.roleGuideVO.runningIndex = runningIndex;
                this.roleGuideVO.isFinishAllGuide = 0;
            }
            TempData.initGuideTempData();
            this.async_write_data();
        }
    }

    public setRoleGuideDataEnd(guideID: number, runningIndex: number): void {
        if (this.roleGuideVO) {
            this.roleGuideVO.guideID = guideID;
            this.roleGuideVO.runningIndex = runningIndex;
            this.roleGuideVO.isEnd = true;
            if (guideID == 15 && this.roleGuideVO.isEnd) {
                gm.ui.emit("build_show_stateIcon", true);
            }
            this.async_write_data();
        }
    }

    public addSuperRecruitItem(item: number, id: number): void {
        this.changeMapItemDataByID(id, ItemTypeEnum.ITEM_TYPE, item);
        this.addRoleItem(item, id);
        gm.ui.emit("item_children_refresh", id);
        this.async_write_data();
    }

    public getStarHeroNumByID(heroID: number): number {
        let count: number = 0;
        const heroConfig = gm.config.get_row_data("HeroConfigData", heroID.toString()) as HeroConfig;
        if (heroConfig) {
            const heroes = this.heroData[heroConfig.occupation];
            if (heroes && heroes.length > 0) {
                for (const hero of heroes) {
                    if (hero.itemID === heroID) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    public delStarHeroNumByID(heroID: number, count: number): void {
        let deletedCount = 0;
        const heroConfig = gm.config.get_row_data("HeroConfigData", heroID.toString()) as HeroConfig;
        if (heroConfig) {
            const heroes = this.heroData[heroConfig.occupation];
            if (heroes && heroes.length >= count) {
                for (let index = heroes.length - 1; 0 <= index; index--) {
                    if (deletedCount == count) return;
                    if (heroes[index].itemID == heroID) {
                        const cellID = heroes[index].cellID;
                        this.delCellItemByCellID(heroes[index].cellID);
                        gm.ui.emit("item_children_refresh", cellID);
                        deletedCount++;
                    }
                }
            }
        }
    }

    public addItem(itemID: number, quantity: number, cellID: number = -1): void {
        if (30000 < itemID) {
            const index = -1 == cellID ? this.getRoleSpceListShift() : cellID;
            this.changeMapItemDataByID(index, ItemTypeEnum.HERO_TYPE, itemID);
            this.addRoleItem(itemID, index);
            gm.ui.emit("item_children_refresh", index);

        } else {
            const itemConfig = gm.config.get_row_data("ItemConfigData", itemID.toString()) as ItemConfig;
            if (itemConfig.type == PropTypeEnum.COIN_TYPE) {
                this.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, quantity);
            } else if (itemConfig.type == PropTypeEnum.DIAMONDS_TYPE) {
                this.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, quantity);
            } else if (itemConfig.type == PropTypeEnum.WOOD_TYPE || itemConfig.type == PropTypeEnum.IRON_TYPE || itemConfig.type == PropTypeEnum.SHELL_MONEY_TYPE) {
                const index = itemConfig.type == PropTypeEnum.WOOD_TYPE ? 16008 : itemConfig.type == PropTypeEnum.IRON_TYPE ? 17008 : 25008;
                gm.data.mapCell_data.splitItemNum(quantity, index, 1);
            } else {
                this.addWareHouseItem(itemID, 1);
                gm.ui.emit("ship_goods_change");
            }
        }
        this.async_write_data();
    }

    public addBarrelInMap(barrelID?: number): void {
        let itemID: number;
        if (barrelID && 0 < barrelID) {
            itemID = barrelID;
        } else if (this.role_openBarrel_Times > this.initOpenBarrelData) {
            const rewardPool = gm.config.get_row_data_array("PoolConfigData", "1101") as PoolConfig[];
            const randomRewards: RoleItemDataVO[] = [];
            gm.data.setRandomReward(rewardPool, randomRewards, 1);
            itemID = randomRewards[0].itemID;
        } else {
            itemID = RewardIdEnum.BARREL;
        }
        const RoleSpceList = this.getRoleSpceListShift();
        console.log(this.roleSpaceList);
        this.changeMapItemDataByID(RoleSpceList, ItemTypeEnum.ITEM_TYPE, itemID);
        gm.ui.emit("item_children_refresh", RoleSpceList);
        gm.ui.emit("compose_anim", RoleSpceList);
        this.async_write_data();
    }

    public openWaterGirlCase(poolID: number, cellID: number): number {
        const poolData = gm.config.get_row_data_array("PoolConfigData", poolID + "") as PoolConfig[];
        const rewards: RoleItemDataVO[] = [];
        gm.data.setRandomReward(poolData, rewards, 1);
        this.delCellItemByCellID(cellID);
        this.addItem(rewards[0].itemID, 1, cellID);
        this.async_write_data();
        return rewards[0].itemID;
    }

    public openHeroGiftCase(poolID: number, cellID: number): number {
        const poolData = gm.config.get_row_data_array("PoolConfigData", poolID + "") as PoolConfig[];
        const rewards: RoleItemDataVO[] = [];
        gm.data.setRandomReward(poolData, rewards, 1);
        this.delCellItemByCellID(cellID);
        this.addSuperHeroData(rewards[0].itemID, cellID);
        this.async_write_data();
        return rewards[0].itemID;
    }

    public addSuperHeroData(heroID: number, cellID: number, hp: number = -1): void {
        for (let i = 0; i < this.superHeroData.length; i++)
            if (this.superHeroData[i].cellID == cellID && this.superHeroData[i].heroid == heroID) {
                this.superHeroData[i].hp = Math.max(0, hp);
                if (0 == hp) {
                    this.superHeroData[i].heroState = 1;
                    this.superHeroData[i].curReliveTime = Math.floor(Date.now() / 1e3);
                    this.superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1e3) + gm.const.SUPERHERORELIVETIME;

                } else if (!(0 != this.superHeroData[i].curReliveTime && 0 != this.superHeroData[i].nextReliveTime)) {
                    this.superHeroData[i].curReliveTime = Math.floor(Date.now() / 1e3);
                    this.superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1e3) + gm.const.SUPERHERORECIVETIME;
                }
                this.async_write_data();
                return;
            }

        const heroCfg = gm.data.config_data.getHeroCfgByID(heroID);
        if (heroCfg) {
            const superHeroVO = new SuperHeroVO;
            superHeroVO.heroid = heroID;
            superHeroVO.hp = heroCfg.hp;
            superHeroVO.heroState = 0;
            superHeroVO.curReliveTime = 0;
            superHeroVO.nextReliveTime = 0;
            superHeroVO.maxHp = heroCfg.hp;
            superHeroVO.cellID = cellID;
            this.superHeroData.push(superHeroVO);
            this.changeMapItemDataByID(cellID, ItemTypeEnum.HERO_TYPE, heroID);
            this.addRoleItem(heroID, cellID);
        }
        this.async_write_data();

    }

    public setSuperHeroFullHpByID(heroID: number, cellID: number): void {
        for (let index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData[index].curReliveTime = 0;
                this.superHeroData[index].nextReliveTime = 0;
                this.superHeroData[index].hp = this.superHeroData[index].maxHp;
                this.async_write_data();
                break;
            }
        }
    }

    public setSuperHeroReliveByID(heroID: number, cellID: number): void {
        for (let index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData[index].heroState = 0;
                this.superHeroData[index].hp = this.superHeroData[index].maxHp;
                this.superHeroData[index].curReliveTime = 0;
                this.superHeroData[index].nextReliveTime = 0;
                gm.ui.emit("refresh_super_hero_color", cellID, heroID);
                this.async_write_data();
                break;
            }
        }
    }

    public getSuperHeroData(heroID: number, cellID: number): SuperHeroVO {
        for (let index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                return this.superHeroData[index];
            }
        }
    }

    private removeSuperHeroData(heroID: number, cellID: number): void {
        for (let index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid === heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData.splice(index, 1);
                this.async_write_data();
                break;
            }
        }
    }

    public getAllSuperHeroData(): SuperHeroVO[] {
        return this.superHeroData;
    }



    private addRoleItem(itemID: number, cellID: number = -1): void {
        const itemType = 3e4 < itemID ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
        const newItem = new roleMapItemVO;
        newItem.heroUID = 0;
        newItem.itemID = itemID;
        newItem.cellID = cellID;

        if (itemType == ItemTypeEnum.ITEM_TYPE) {
            const itemCfg = gm.data.config_data.getItemCfgByID(itemID);
            if (!itemCfg) return;
            if (!this.itemData[itemCfg.type]) {
                this.itemData[itemCfg.type] = [];
            }
            newItem.itemType = itemCfg.type;
            this.itemData[itemCfg.type].push(newItem);

        } else if (itemType == ItemTypeEnum.HERO_TYPE) {
            const herofg = gm.data.config_data.getHeroCfgByID(itemID)
            if (!herofg) return;
            if (!this.heroData[herofg.occupation]) {
                this.heroData[herofg.occupation] = [];
            }
            newItem.itemType = herofg.occupation;
            this.heroData[herofg.occupation].push(newItem);
            if (11 == herofg.occupation) {
                gm.ui.emit("build_show_towerBuff");
            }
        }

        for (let index = 0; index < this.roleSpaceList.length; index++) {
            if (this.roleSpaceList[index] == cellID) {
                this.roleSpaceList.splice(index, 1);
                break;
            }
        }

        this.unlockBookItem(itemType, itemID);
    }

    private getHeroDataByID(heroID: number, cellID: number): roleMapItemVO[] | null {
        const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
        if (heroConfig) {
            if (!this.heroData[heroConfig.occupation] || Object.keys(this.heroData[heroConfig.occupation]).length <= 0) return null;

            for (let index = 0; index < this.heroData[heroConfig.occupation].length; index++) {
                if (this.heroData[heroConfig.occupation][index].cellID == cellID) {
                    return this.heroData[heroConfig.occupation];
                }
            }
        }
        return null;
    }

    public getSuperHeroDataByID(heroID: number, cellID: number): SuperHeroVO | null {
        for (let a = 0; a < this.superHeroData.length; a++) {
            if (this.superHeroData[a].cellID == cellID && this.superHeroData[a].heroid === heroID) {
                return this.superHeroData[a];
            }
        }
        return null;
    }

    public delete_hero(heroUID: number, heroID: number): void {
        const heroConfig = gm.data.config_data.getHeroCfgByID(heroID);
        if (heroConfig) {
            const occupationData = this.heroData[heroConfig.occupation];
            if (occupationData && Object.keys(occupationData).length > 0) {
                for (let i = 0; i < occupationData.length; i++) {
                    if (occupationData[i].heroUID === heroUID) {
                        this.delCellItemByCellID(occupationData[i].cellID);
                        gm.ui.emit("item_children_refresh", occupationData[i].cellID);
                        break;
                    }
                }
            }
        }
    }

    public getIsHeroTowerBuff(): boolean {
        return this.heroData[11] && this.heroData[11].length > 0;
    }

    private delRoleItem(itemID: number, cellID: number): void {
        this.changeMapItemDataByID(cellID, 0, 0);
        const itemType = 3e4 < itemID ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
        if (itemType == ItemTypeEnum.ITEM_TYPE) {
            const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
            if (!itemConfig) return;
            if (!this.itemData[itemConfig.type]) return;
            for (let index = 0; index < this.itemData[itemConfig.type].length; index++) {
                if (this.itemData[itemConfig.type][index].cellID == cellID) {
                    this.itemData[itemConfig.type].splice(index, 1);
                    this.addRoleSpaceCellByID(cellID);
                    break;
                }
            }
        } else if (itemType == ItemTypeEnum.HERO_TYPE) {
            const heroCfg = gm.data.config_data.getHeroCfgByID(itemID);
            if (heroCfg) {
                if (!this.heroData[heroCfg.occupation]) return;
                for (let index = 0; index < this.heroData[heroCfg.occupation].length; index++) {
                    if (this.heroData[heroCfg.occupation][index].cellID == cellID) {
                        this.heroData[heroCfg.occupation].splice(index, 1);
                        this.addRoleSpaceCellByID(cellID);
                        heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE && this.removeSuperHeroData(itemID, cellID);
                        break;
                    }
                }
            }
        }
        gm.ui.emit("refresh_barrel_num");
    }

    public getMertrailIDCount(itemID: number): number {
        const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
        if (itemConfig) {
            if (itemConfig.type == PropTypeEnum.COIN_TYPE) return this.roleCoinData.coinNum;
            if (itemConfig.type == PropTypeEnum.DIAMONDS_TYPE) return this.roleCoinData.diamondNum;
            let count = 0;
            if (!this.itemData[itemConfig.type]) return 0;
            for (let index = 0; index < this.itemData[itemConfig.type].length; index++) {
                count += gm.data.config_data.getItemCfgByID(this.itemData[itemConfig.type][index].itemID).number;
            }
            return count;
        }
        return 0;
    }

    public splitItemNum(itemID: number, itemCount: number, startID: number = 0): void {
        const i = 10 * Math.floor(.1 * itemCount) + 1;
        for (let o = itemCount; i <= o; o--) {
            const itemConfig = gm.data.config_data.getItemCfgByID(o);
            if (itemConfig)
                for (; itemID >= itemConfig.number;) {
                    1 == itemID ? itemID = 0 : itemID -= itemConfig.number;
                    this.addWareHouseItem(o, startID)
                }
        }
        gm.ui.emit("ship_goods_change");
    }

    public onekeyGetGuideAllMertrail(t: number, e: number) {
        let count = 0;
        const tempDataBuild = TempData.getBuildGuideMertarilData();
        for (const key in this.buildData[t].metrailData) {
            if (tempDataBuild) {
                for (let index = 0; index < tempDataBuild.metrailList.length; index++) {
                    if (gm.data.config_data.getItemCfgByID(tempDataBuild.metrailList[index].itemID).type == parseInt(key) && TempData.getBuildGuideMertarilNumByID(this.buildData[t].buildID, tempDataBuild.metrailList[index].itemID) >= tempDataBuild.metrailList[index].needNum) {
                        count++;
                        break
                    }
                }
            }
        }

        const buildDataII = this.buildData[t].metrailData[e];
        if (buildDataII && !(buildDataII.cur >= buildDataII.max)) {
            const minus = buildDataII.max - buildDataII.cur;
            Utils.sort_by_props(this.itemData[e], {
                itemID: "ascending"
            });

            if (e == PropTypeEnum.WOOD_TYPE || e == PropTypeEnum.IRON_TYPE || e == PropTypeEnum.SHELL_MONEY_TYPE) {
                for (let index = this.itemData[e].length - 1; 0 <= index; index--) {
                    const itemID = this.itemData[e][index].itemID;
                    const cellID = this.itemData[e][index].cellID;
                    const itemCfg = gm.data.config_data.getItemCfgByID(itemID);
                    if (0 + itemCfg.number == minus) {
                        const newP = gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                        const newH = newP.getComponent(MainMapItem);
                        if (newP && newH && newH.itemNode) {
                            if (t == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                gm.ui.show_item_fly(itemCfg.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));

                            } else {
                                const newU = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                const newM = newU.getComponent(MainMapItem);
                                if (newU && newM && newM.itemNode) {
                                    gm.ui.show_item_fly(itemCfg.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), newM.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                }
                            }

                            this.reportOnekeyAddMertrail(t, itemCfg.id, count);
                            TempData.setBuildGuideMertaril(this.buildData[t].buildID, itemCfg.id, itemCfg.type, cellID, itemCfg.number,
                                this.buildData[t].metrailData[itemCfg.type].max - this.buildData[t].metrailData[itemCfg.type].cur);
                            gm.ui.emit("build_metarail_change", this.buildData[t].buildID);
                            gm.ui.emit("guide_del_item", cellID);
                            gm.ui.mapMainUI.checkHandAnimDelay();
                        }
                    }
                }
            } else {
                for (let index = 0; index < this.itemData[e].length; index++) {
                    const itemID = this.itemData[e][index].itemID;
                    const cellID = this.itemData[e][index].cellID;
                    if (itemID == buildDataII.id) {
                        const newD = gm.data.config_data.getItemCfgByID(itemID);
                        if (newD) {
                            const newP = gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                            const newH = newP.getComponent(MainMapItem);
                            if (newP && newH && newH.itemNode) {
                                if (t == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    gm.ui.show_item_fly(newD.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                        gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));

                                } else {
                                    const newU = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                    const newM = newU.getComponent(MainMapItem);
                                    if (newU && newM && newM.itemNode) {
                                        gm.ui.show_item_fly(newD.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                            newM.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                    }
                                }
                            }
                            this.reportOnekeyAddMertrail(t, newD.id, count);
                            TempData.setBuildGuideMertaril(this.buildData[t].buildID, itemID, newD.type, cellID, 1,
                                this.buildData[t].metrailData[newD.type].max - this.buildData[t].metrailData[newD.type].cur);
                            gm.ui.emit("build_metarail_change", this.buildData[t].buildID);
                            gm.ui.emit("guide_del_item", cellID);
                            gm.ui.mapMainUI.checkHandAnimDelay();
                        }
                    }
                }
            }
        }
    }

    private reportOnekeyAddMertrail(t: number, e: number, a: number): void {
        let i: number = 0;
        if (0 == this.buildData[t].buildLvl && t == BuildTypeEnum.TOWER_TYPE) {
            i = 22;
        }
        const itemCfg = gm.data.config_data.getItemCfgByID(e)
        if (itemCfg) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: i += a,
                guidedesc: cc.js.formatStr("%d.一键添加材料%s", i, itemCfg.name)
            });
        }
    }

    public onekeyGetAllMertrail(t: number, e: number): void {
        let cellID = 0;
        const metrailData = this.buildData[t].metrailData[e];
        if (metrailData && !(metrailData.cur >= metrailData.max)) {
            const minus = metrailData.max - metrailData.cur;
            Utils.sort_by_props(this.itemData[e], {
                itemID: "descending"
            });

            if (e == PropTypeEnum.WOOD_TYPE || e == PropTypeEnum.IRON_TYPE || e == PropTypeEnum.SHELL_MONEY_TYPE) {
                let count = 0;
                for (let index = this.itemData[e].length - 1; 0 <= index; index--) {
                    const itemID = this.itemData[e][index].itemID;
                    cellID = this.itemData[e][index].cellID;
                    const itemCfg = gm.data.config_data.getItemCfgByID(itemID);

                    if (!(count + itemCfg.number <= minus)) {
                        this._needRefreshCellList.push(cellID);
                        const newH = minus - count;
                        this.addBuildMetrail(t, itemCfg.type, newH);
                        const childName = gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                        const mainMap = childName.getComponent(MainMapItem);
                        if (childName && mainMap && mainMap.itemNode) {
                            if (t == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                    gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));

                            } else {
                                const newD = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                const newP = newD.getComponent(MainMapItem);
                                if (newD && newP && newP.itemNode) {
                                    gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                        newP.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                }
                            }
                        }

                        this.itemData[e].splice(index, 1);
                        this.changeMapItemDataByID(cellID, 0, 0);
                        this.addRoleSpaceCellByID(cellID);
                        this.splitItemNum(itemCfg.number - newH, itemID);
                        break;
                    }
                    const childName = gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                    const mainMap = childName.getComponent(MainMapItem);

                    if (childName && mainMap && mainMap.itemNode) {
                        if (t == BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                            gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        } else {
                            const newD = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                            const newP = newD.getComponent(MainMapItem);
                            if (newD && newP && newP.itemNode) {
                                gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                    newP.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO))
                            }
                        }
                    }

                    this.itemData[e].splice(index, 1);
                    this.changeMapItemDataByID(cellID, 0, 0);
                    count += itemCfg.number;
                    this.addBuildMetrail(t, e, itemCfg.number);
                    this._needRefreshCellList.push(cellID);
                    this.addRoleSpaceCellByID(cellID);
                }
                this.async_write_data();

            } else {
                for (let index = 0; index < this.itemData[e].length; index++) {
                    const itemID = this.itemData[e][index].itemID;
                    const cellID = this.itemData[e][index].cellID;
                    if (itemID == metrailData.id) {
                        this._needRefreshCellList.push(itemID);
                        this.delRoleItem(itemID, cellID);
                        this.addBuildMetrail(t, e, 1);
                        this.async_write_data();
                        break;
                    }

                    if (itemID >= metrailData.id) {
                        this._needRefreshCellList.push(cellID);
                        this.delRoleItem(itemID, cellID);
                        const arr = [];
                        for (let f = itemID - 1; f >= metrailData.id; f--) {
                            arr.push(f);
                            if (f == metrailData.id) {
                                this.addBuildMetrail(t, e, 1);
                            }
                        }

                        this.addWareHouseList(arr, 0);
                        this.async_write_data();
                        break;
                    }
                }
            }
        }
    }

    public onekeyGetAllSpecialMertrail(t: number, e: number) {
        const speciafID = gm.data.config_data.getSpecialByID(t);
        if (speciafID) {
            let value = 0;
            for (let index = 0; index < speciafID.prop.length; index++) {
                if (speciafID.prop[index] == e) {
                    value = speciafID.value[index];
                    break;
                }
            }

            if (0 != value) {
                const special = this.specialList[t];
                if (special && !(special.mertrail[e] >= value)) {
                    const itemCfg = gm.data.config_data.getItemCfgByID(e);
                    if (itemCfg) {
                        const type = itemCfg.type;
                        const newC = value - special.mertrail[e];
                        Utils.sort_by_props(this.itemData[type], {
                            itemID: "descending"
                        });
                        if (type == PropTypeEnum.WOOD_TYPE || type == PropTypeEnum.IRON_TYPE || type == PropTypeEnum.SHELL_MONEY_TYPE) {
                            let count = 0;
                            for (let index = this.itemData[type].length - 1; 0 <= index; index--) {
                                const itemID = this.itemData[type][index].itemID;
                                const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
                                if (!(count + itemConfig.number <= newC)) {
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    const num = newC - count;
                                    this.specialList[t].mertrail[e] += count;
                                    this.delCellItemByCellID(this.itemData[type][index].cellID);
                                    this.splitItemNum(itemConfig.number - num, itemID);
                                    break;
                                }
                                this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                this.delCellItemByCellID(this.itemData[type][index].cellID);
                                count += itemConfig.number;
                                this.specialList[t].mertrail[e] += count;
                            }
                            this.async_write_data();

                        } else {
                            for (let index = 0; index < this.itemData[type].length; index++) {
                                if (this.itemData[type][index].itemID == e) {
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    this.delRoleItem(e, this.itemData[type][index].cellID);
                                    this.specialList[t].mertrail[e] += 1;
                                    this.async_write_data();
                                    break;
                                }
                                if (this.itemData[type][index].itemID >= e) {
                                    const itemID = this.itemData[type][index].itemID;
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    this.delRoleItem(this.itemData[type][index].itemID, this.itemData[type][index].cellID);

                                    const arr: number[] = [];
                                    for (let o = itemID - 1; e <= o; o--) {
                                        arr.push(o);
                                        if (o == e) {
                                            (this.specialList[t].mertrail[e] += 1);
                                        }
                                    }
                                    this.addWareHouseList(arr, 0);
                                    this.async_write_data();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public onekeyWatchAdGetSoul(t: number, e: number): void {
        if (gm.data.config_data.getSpecialByID(t)) {
            this.specialList[t].mertrail[e] += 1;
            this.async_write_data();
        }
    }

    public onekeyGetAllSpecialHeroMertrail(t: number, e: number) {
        const newA = gm.data.config_data.getSpecialByID(t);
        if (newA) {
            let value = 0;
            for (let index = 0; index < newA.prop.length; index++) {
                if (newA.prop[index] == e) {
                    value = newA.value[index];
                    break;
                }
            }

            if (0 != value) {
                const special = this.specialList[t];
                if (special && !(special.mertrail[e].cur >= value)) {
                    const heroConfig = gm.data.config_data.getHeroCfgByID(e)
                    if (heroConfig) {
                        const occupation = heroConfig.occupation;
                        const heroData = this.heroData[occupation];
                        if (heroData)
                            for (let index = heroData.length - 1; 0 <= index; index--)
                                if (heroData[index].itemID == e) {
                                    if (value == special.mertrail[e]) break;
                                    this._needRefreshCellList.push(heroData[index].cellID);
                                    this.delRoleItem(e, heroData[index].cellID);
                                    this.specialList[t].mertrail[e] += 1;
                                }
                        this.async_write_data();
                    }
                }
            }
        }
    }

    private addBuild(t: number, e: number): void {
        const buildCfg = gm.data.config_data.getBuildCfgByID(t);
        if (buildCfg && !this.getBuildDataByType(buildCfg.buildType)) {
            const roleBuildData = new RoleBuildDataVO;
            roleBuildData.buildState = 1;
            roleBuildData.buildID = buildCfg.buildID;
            roleBuildData.buildType = buildCfg.buildType;
            roleBuildData.buildLvl = buildCfg.buildLv;
            roleBuildData.cellID = e;
            roleBuildData.isCanMove = 0 < buildCfg.cellID ? 0 : 1;
            roleBuildData.productData = null;
            roleBuildData.metrailData = {};
            for (let n = roleBuildData.upNeedCoin = 0; n < buildCfg.consume.length; n++) {
                if (buildCfg.consume[n] == RewardIdEnum.GOLD) {
                    roleBuildData.upNeedCoin = buildCfg.num[n];

                } else {
                    const itemCfg = gm.data.config_data.getItemCfgByID(buildCfg.consume[n])
                    if (itemCfg) {
                        if (!roleBuildData.metrailData[itemCfg.type]) {
                            roleBuildData.metrailData[itemCfg.type] = {} as metrail;
                        }
                        roleBuildData.metrailData[itemCfg.type].id = buildCfg.consume[n];
                        roleBuildData.metrailData[itemCfg.type].max = buildCfg.num[n];
                        roleBuildData.metrailData[itemCfg.type].cur = 0;
                    }
                }
            }
            this.buildData[roleBuildData.buildType] = roleBuildData;
            if (59e3 == t) {
                this.addBuild(60001, gm.const.shipID);
            }
            this.async_write_data();
        }
    }

    public getBuildDataByType(t: number): BuildData {
        return this.buildData[t];
    }

    public upgradeBuild(t: number): void {
        const newE = gm.data.config_data.getBuildCfgByID(t);
        if (newE) {
            const newA = gm.data.config_data.getBuildCfgByID(newE.nextBuildID);
            if (newA) {
                let num = 0;
                const newO = this.buildData[newE.buildType];
                if (newO) {
                    gm.channel.report_event("building_upgrade", {
                        event_desc: "建筑升级",
                        building_name: newA.buildName,
                        level: newA.buildLv,
                        desc: cc.js.formatStr("%s%d级", newA.buildName, newA.buildLv)
                    });

                    gm.data.get_player_score_data_request(() => {
                        gm.data.update_player_score_data_request(gm.data.ladder_temp_data.total_star);
                    });

                    const newN = gm.const.REPORT_BUILDING_UPGRADE_MAP[newE.buildType];
                    if (0 < newA.buildLv && newA.buildLv < newN.length) {
                        const newS = newN[newA.buildLv - 1];
                        ReportData.instance.report_once_point(newS);
                    }

                    if (1 == newA.buildLv && newE.buildType == BuildTypeEnum.GARRISION_TYPE) {
                        cc.Canvas.instance.scheduleOnce(() => {
                            gm.ui.show_panel(gm.const.Ladder)
                        }, 2);

                    } else if (!(gm.data.mapCell_data.isGuide || newE.buildType == BuildTypeEnum.BARRACKS_TYPE)) {
                        (newE.buildType, BuildTypeEnum.WHARFTAX_TYPE);
                    }

                    if (!gm.data.mapCell_data.isGuide && 3 <= this.getBuildDataByType(BuildTypeEnum.TOWER_TYPE).buildLvl && newE.buildType != BuildTypeEnum.TOWER_TYPE) {
                        cc.Canvas.instance.scheduleOnce(() => {
                            gm.channel.checkShortcut((result: number) => {
                                if (2 <= result) {
                                    gm.ui.show_panel(gm.const.AddDesktop);
                                }
                            });
                        }, 2);
                    }

                    if (newE.buildType != BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                        this.role_map_data[newO.cellID].itemID = newA.buildID;
                    }

                    newO.buildID = newA.buildID;
                    newO.buildLvl = newA.buildLv;
                    if (0 < newA.currency && 2 <= newA.rate.length) {
                        if (!newO.productData) {
                            newO.productData = new RoleProductDataVO;
                            newO.productData.productCd = 0;
                            newO.productData.productNum = 0;
                            newO.productData.maxNum = 0;
                            newO.productData.fullTime = 0;
                            newO.productData.productID = 0;
                            newO.productData.beginTime = 0;
                            newO.productData.curNum = 0;
                        }
                        newO.productData.productID = newA.currency;
                        newO.productData.productCd = newA.rate[1];
                        newO.productData.productNum = newA.rate[0];
                        newO.productData.maxNum = newA.capacity;

                        if (newE.buildType == BuildTypeEnum.PRIVATEHOUSING_TYPE && 0 == newE.buildLv) {
                            newO.productData.curNum = 2;
                        }

                        newO.productData.beginTime = Math.floor(Date.now() / 1000);
                        if (0 == newO.productData.fullTime) {
                            newO.productData.fullTime = Math.floor(Date.now() / 1e3) + Math.round((newO.productData.maxNum - newO.productData.curNum) / newO.productData.productNum) * newO.productData.productCd;
                        }
                    }

                    newO.metrailData = {};
                    for (let index = newO.upNeedCoin = 0; index < newA.consume.length; index++) {
                        if (newA.consume[index] == RewardIdEnum.GOLD) {
                            newO.upNeedCoin = newA.num[index];
                        } else {
                            const itemCfg = gm.data.config_data.getItemCfgByID(newA.consume[index]);
                            if (itemCfg) {
                                if (!newO.metrailData[itemCfg.type]) {
                                    newO.metrailData[itemCfg.type] = {} as metrail;
                                }
                                newO.metrailData[itemCfg.type].id = newA.consume[index];
                                newO.metrailData[itemCfg.type].max = newA.num[index];
                                newO.metrailData[itemCfg.type].cur = 0;
                            }
                        }
                    }

                    if (this.isGuide || newA.buildType != BuildTypeEnum.WHARFTAX_TYPE || this.resetBarrelTime(newO.productData), 0 < newA.lockAreaID) {
                        let isCheck = false;
                        for (let index = 0; index < this.roleShowAreaIDList.length; index++) {
                            if (this.roleShowAreaIDList[index] == newA.lockAreaID) {
                                isCheck = true;
                                break;
                            }
                        }

                        if (!isCheck) {
                            this.openNewAreaByID(newA.lockAreaID);
                        }

                        if (!gm.const.localCloudAreaList[newA.lockAreaID]) {
                            this.unlockNewAreaID(newA.lockAreaID);
                        }
                    }

                    if (51001 == newA.buildID) {
                        gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID = 395;
                        const showAreaID = newA.showAreaID as number[];

                        for (let index = 0; index < showAreaID.length; index++) {
                            this.openNewAreaByID(showAreaID[index]);
                        }

                        this.isGuide = false;
                        gm.ui.mapMainUI.lockMainUI();
                        gm.ui.mapMainUI.show_task_main_entry_guide();
                        gm.data.mapCell_data.addBarrelNum(5);
                        gm.ui.mapMainUI.setBarrelNodeActive();
                        gm.ui.mapMainUI.playGuideBarrelFly(5);
                        num = 23;
                        gm.ui.mapMainUI.autoCompose.node.active = !gm.data.mapCell_data.isGuide;
                        gm.ui.emit("coin_change");

                    } else {
                        newA.buildID;
                    }

                    if (newE.buildType == BuildTypeEnum.WHARFTAX_TYPE && 0 == newE.buildLv) {
                        const buildCfg = gm.data.config_data.getBuildCfgByID(this.buildData[BuildTypeEnum.WHARFTAX_TYPE].buildID);
                        if (buildCfg && 2 <= buildCfg.rate.length && 2 <= buildCfg.rate.length) {
                            const roleProductData = new RoleProductDataVO;
                            roleProductData.productID = buildCfg.currency;
                            roleProductData.productCd = buildCfg.rate[1];
                            roleProductData.productNum = buildCfg.rate[0];
                            roleProductData.maxNum = buildCfg.capacity;
                            roleProductData.beginTime = Math.floor(Date.now() / 1e3);
                            roleProductData.fullTime = 0;
                            this.resetBarrelTime(roleProductData);
                            this.roleBarrelData.curBarrelNum += 10;
                            roleProductData.fullTime = 0;
                        }

                    } else if (newE.buildType == BuildTypeEnum.STALL_TYPE && 0 == newE.buildLv) {
                        gm.audio.play_effect(gm.const.AUDIO_15_UNLOCK_STORE);

                    } else if (newE.buildType == BuildTypeEnum.GARRISION_TYPE) {
                        if (0 == newE.buildLv) {
                            this.initDefanseData();
                            gm.data.ladder_temp_data.total_star = gm.data.ladder_data.ladder_star;
                            const newCc = gm.data.ladder_temp_data.total_star;
                            gm.data.update_player_data_request(() => {
                                gm.data.get_player_score_data_request(() => {
                                    console.log("1.update before:" + newCc + " update after:" + gm.data.ladder_temp_data.total_star);
                                });
                            });

                        } else {
                            gm.ui.async_show_module(gm.const.DEFENSE);
                        }
                    }

                    if (this.isGuide) {
                        gm.channel.report_event("ohayoo_game_guide", {
                            guideid: num,
                            guidedesc: cc.js.formatStr("%d.点击%s升级", num, newE.buildName)
                        });
                    }

                    this.role_build_lock_num++, gm.ui.emit("unLockNewArea");
                    const newHh = TempData.getBuildGuideMertarilData();

                    if (newHh && newHh.buildID == t && 0 < newHh.metrailList.length) {
                        for (let index = newHh.metrailList.length - 1; 0 <= index; index--) {
                            if (newHh.metrailList[index].itemNum > newHh.metrailList[index].needNum) {
                                this.splitItemNum(newHh.metrailList[index].itemNum - newHh.metrailList[index].needNum, newHh.metrailList[index].itemID);
                            }

                            this.delCellItemByCellID(newHh.metrailList[index].cellID);
                            gm.ui.emit("item_children_refresh", newHh.metrailList[index].cellID), newHh.metrailList.splice(index, 1);
                        }
                    }

                    if (newE.buildType == BuildTypeEnum.BARRACKS_TYPE && 0 <= newA.rate.length) {
                        for (let index = 0; index < newA.rate.length; index++) {
                            this.reelUnlcokHero(newA.rate[index]);
                        }
                    }

                    gm.data.task_data.update_build_task_progress(newA.buildType);
                    this.async_write_data();
                }
            }
        }
    }

    public getBuildProduct = function (t: number): void {
        if (this.buildData[t].productData && t != BuildTypeEnum.WHARFTAX_TYPE) {
            const productData = this.buildData[t].productData;
            let coin: number
            if (0 == productData.fullTime) {
                coin = productData.curNum;
            } else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                    coin = productData.curNum;
                } else {
                    coin = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd * productData.productNum);
                }
            } else {
                coin = productData.maxNum;
            }

            if (0 < coin) {
                const i = gm.data.config_data.getItemCfgByID(this.buildData[t].productData.productID);
                if (i) {
                    if (i.type == PropTypeEnum.COIN_TYPE) {
                        this.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, coin);
                    } else {
                        for (let o = 0; o < coin; o++) {
                            this.addWareHouseItem(productData.productID, 1);
                        }
                        gm.ui.emit("ship_goods_change");
                    }
                    this.buildData[t].productData.curNum = 0;
                    this.buildData[t].productData.beginTime = Math.floor(Date.now() / 1e3);
                    this.buildData[t].productData.fullTime = Math.floor(Date.now() / 1e3) + Math.round((productData.maxNum - productData.curNum) / productData.productNum) * productData.productCd;
                    this.async_write_data();
                }
            }
        }
    }

    private changeBuildCellPos(t: number, e: number): void {
        if (this.buildData[t]) {
            this.buildData[t].cellID = e;
        }
    }

    private addBuildMetrail(t: number, e: number, a: number): void {
        const buildData = this.buildData[t];
        if (buildData) {
            buildData.metrailData[e].cur += a;
        }
    }

    private addWaterBarrel(): void {
        this.waterBarrelList = [];
        const positions = [cc.v3(257, -1087), cc.v3(295, -1145), cc.v3(377, -1083)];
        for (let e = 0; e < positions.length; e++) {
            const a = new roleBarrelItemVO();
            a.itemID = 11006;
            a.itemIndex = e;
            a.itemPos = positions[e];
            this.waterBarrelList.push(a);
        }
        this.async_write_data();
    }

    public initBarrelTime(): void {
        if (!this.isGuide && this.roleBarrelData.curBarrelNum < this.roleBarrelData.maxBarrelNum) {
            if (this.roleBarrelData.nextFreeBarrelTime > this.roleBarrelData.curFreeBarrelTime) {
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + (this.roleBarrelData.nextFreeBarrelTime - this.roleBarrelData.curFreeBarrelTime);
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1e3);
            } else {
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1e3);
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + this.roleBarrelData.freeBarrelCd;
            }
        } else {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curFreeBarrelTime = 0;
        }
    }

    private resetBarrelTime(t: { maxNum: number; productNum: number; productCd: number }): void {
        this.roleBarrelData.maxBarrelNum = t.maxNum;
        this.roleBarrelData.nextFreeBarrelNum = t.productNum;
        this.roleBarrelData.freeBarrelCd = t.productCd;
    }

    public addBarrelNum(t: number): void {
        this.roleBarrelData.curBarrelNum += t;
        if (this.isGuide || this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
        } else {
            this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + this.roleBarrelData.freeBarrelCd;
        }
        this.async_write_data();
        gm.ui.emit("refresh_barrel_num");
    }

    private addFreeBarrel(): void {
        if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curBarrelNum = 0;
            return;
        }
        this.roleBarrelData.curBarrelNum = Math.min(this.roleBarrelData.curBarrelNum + this.roleBarrelData.nextFreeBarrelNum, this.roleBarrelData.maxBarrelNum);

        if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curFreeBarrelTime = 0;

        } else {
            this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + this.roleBarrelData.freeBarrelCd;
            this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
        }
        this.async_write_data();
    }

    public reduceBarrelNum(): void {
        this.roleBarrelData.curBarrelNum--;
        if (!this.isGuide) {
            if (this.roleBarrelData.curBarrelNum < this.roleBarrelData.maxBarrelNum && 0 == this.roleBarrelData.nextFreeBarrelTime) {
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + this.roleBarrelData.freeBarrelCd;
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
            } else if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
                this.roleBarrelData.nextFreeBarrelTime = 0;
                this.roleBarrelData.curFreeBarrelTime = 0;
            }
        }
        this.async_write_data();
    }

    public getMapHaveSpece(): boolean {
        return this.roleSpaceList.length > 0;
    }

    private changeMapItemDataByID(t: number, e: number, a: number, i: number = 0, o: boolean = true): void {
        if (this.role_map_data[t]) {
            if (0 == e && 0 == a && o) {
                this.delDefenseDataByID(this.role_map_data[t].heroUID);
            }
            this.role_map_data[t].itemID = a;
            this.role_map_data[t].itemType = e;
            this.role_map_data[t].heroUID = i;
            if (o && 0 < a && e == ItemTypeEnum.HERO_TYPE) {
                const n = gm.data.config_data.getHeroCfgByID(a);
                if (n && 0 < n.occupation && 10 != n.occupation && 11 != n.occupation && 12 != n.occupation) {
                    this.role_map_data[t].heroUID = this.heroTotalNum;
                    this.heroTotalNum++;
                }
            }
        }
    }

    public openCase(t: number, e: number): void {
        if (this.role_openBarrel_Times > this.initOpenBarrelData) {
            let a = 0;
            if (e == RewardIdEnum.BARREL) {
                const random = gm.data.config_data.getRandomID();
                const row = gm.config.get_row_data_array("PoolConfigData", random + "") as PoolConfig[];
                a = gm.config.get_random_case(row);
            } else if (e == RewardIdEnum.SILVER_BARREL) {
                a = 3101;
            } else if (e == RewardIdEnum.GOLD_BARREL) {
                a = 3001;
            }

            const rowData = gm.config.get_row_data_array("PoolConfigData", a + "") as PoolConfig[];
            if (e == RewardIdEnum.GOLD_BARREL) {
                const unlock = this.get_unlock_hero_array();
                for (let n = rowData.length - 1; 0 <= n; n--) {
                    if (unlock.indexOf(rowData[n].prop) <= -1) {
                        rowData.splice(n, 1);
                    }
                }
            }
            const arr: RoleItemDataVO[] = [];
            gm.data.setRandomReward(rowData, arr, 1);
            const itemID = arr[0].itemID;
            const itemType = arr[0].itemType;
            this.changeMapItemDataByID(t, itemType, itemID);
            this.checkIsPlayItemSound(itemID);
            this.addRoleItem(itemID, t);
        } else {
            const caskID = gm.data.config_data.getCaskIDBySortId(this.role_openBarrel_Times);
            this.changeMapItemDataByID(t, caskID[0], caskID[1]);
            this.checkIsPlayItemSound(caskID[1]);
            this.addRoleItem(caskID[1], t);
            if (e != RewardIdEnum.BARREL) {
                cc.log("引导阶段，打开桶的奖励走配置");
            }
        }

        ReportData.instance.report_point(30101);
        this.role_openBarrel_Times += 1;
        gm.data.task_data.update_task_progress(TaskConditionType.BREAK_BARREL);
        this.async_write_data();
    }

    public openStoneHero(t: number, e: number): void {
        const itemCfg = gm.data.config_data.getItemCfgByID(e);
        if (itemCfg) {
            this.delCellItemByCellID(t);
            this.addRoleItem(itemCfg.next, t);
            this.changeMapItemDataByID(t, ItemTypeEnum.HERO_TYPE, itemCfg.next);
        }
        this.async_write_data();
    }

    public randomStoneHero(t: number, e: number, a: number): void {
        const eData = gm.config.get_row_data_array("PoolConfigData", e + "") as PoolConfig[];
        const arr: RoleItemDataVO[] = [];
        gm.data.setRandomReward(eData, arr, a);

        for (let o = 0; o < arr.length; o++) {
            this.addWareHouseItem(arr[o].itemID, 1);
        }

        this.delCellItemByCellID(t);
    }

    public checkIsPlayItemSound(t: number): void {
        if (30000 <= t) {
            const row = gm.config.get_row_data("HeroConfigData", t + "") as HeroConfig;
            if (row && row.get_merge_audio) {
                gm.audio.play_effect(row.get_merge_audio.toString());
            } else {
                gm.audio.play_effect(gm.const.AUDIO_161_COMPOSE);
            }
        } else {
            const itemCfg = gm.data.config_data.getItemCfgByID(t);
            if (itemCfg) {
                if (itemCfg.soundID) {
                    gm.audio.play_effect(itemCfg.soundID);
                } else {
                    gm.audio.play_effect(gm.const.AUDIO_161_COMPOSE);
                }
            }
        }
    }

    private checkBuildState(t: number): number {
        const buildCfg = gm.data.config_data.getBuildCfgByID(t);
        return buildCfg && this.role_map_data[buildCfg.cellID] ? 2 : 1;
    }

    private changeCellID(t: number, e: number, a: number): void {
        if (t == ItemTypeEnum.ITEM_TYPE) {
            const itemConfig = gm.data.config_data.getItemCfgByID(this.role_map_data[e].itemID);

            if (itemConfig) {
                const itemData = this.itemData[itemConfig.type];
                if (itemData) {
                    for (let o = 0; o < itemData.length; o++)
                        if (itemData[o].cellID == e) {
                            itemData[o].cellID = a;
                            break;
                        }
                }
            }
        } else if (t == ItemTypeEnum.HERO_TYPE) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
            if (heroConfig) {
                const heroData = this.heroData[heroConfig.occupation];
                if (heroData) {
                    for (let o = 0; o < heroData.length; o++) {
                        if (heroData[o].cellID == e) {
                            heroData[o].cellID = a;
                            break;
                        }
                    }
                }
            }
        }
    }

    private setItemCellIDAndItemID(itemType: number, cellID: number, newCellID: number, itemID: number, optionalParam: number = 0): void {
        if (itemType == ItemTypeEnum.BUILD_TYPE) {
            const buildCfg = gm.data.config_data.getBuildCfgByID(itemID);
            if (buildCfg) {
                this.buildData[buildCfg.buildType].cellID = newCellID;
                return;
            }
        }

        if (0 != itemID) {
            const configID = 999 == cellID ? optionalParam : cellID;
            const type = 30000 < itemID ? ItemTypeEnum.HERO_TYPE : ItemTypeEnum.ITEM_TYPE;
            if (itemType == ItemTypeEnum.ITEM_TYPE) {
                if (type == ItemTypeEnum.ITEM_TYPE) {
                    const itemConfig = gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        const itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (let index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    if (gm.data.config_data.getItemCfgByID(itemID).type == itemConfig.type) {
                                        itemData[index].cellID = newCellID;
                                        itemData[index].itemID = itemID;
                                    } else {
                                        itemData.splice(index, 1);
                                        this.addRoleItem(itemID, newCellID);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                } else if (type == ItemTypeEnum.HERO_TYPE) {
                    const itemConfig = gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        const itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (let index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    itemData.splice(index, 1);
                                    this.addRoleItem(itemID, newCellID);
                                    break
                                }
                            }
                        }
                    }
                } else if (type == ItemTypeEnum.BUILD_TYPE) {
                    const itemConfig = gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        const itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (let index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    itemData[index].cellID = newCellID;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else if (itemType == ItemTypeEnum.HERO_TYPE) {
                if (type == ItemTypeEnum.ITEM_TYPE) {
                    const heroConfig = gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        const heroData = this.heroData[heroConfig.occupation];
                        if (heroData) {
                            for (let index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    heroData.splice(index, 1), this.addRoleItem(itemID, newCellID);
                                    break
                                }
                            }
                        }
                    }
                } else if (type == ItemTypeEnum.HERO_TYPE) {
                    const heroConfig = gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        const heroData = this.heroData[heroConfig.occupation];
                        if (heroData) {
                            for (let index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    if (gm.data.config_data.getHeroCfgByID(itemID).occupation == heroConfig.occupation) {
                                        heroData[index].cellID = newCellID;
                                        heroData[index].itemID = itemID;
                                    } else {
                                        heroData.splice(index, 1);
                                        this.addRoleItem(itemID, newCellID);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                } else if (type == ItemTypeEnum.BUILD_TYPE) {
                    const heroConfig = gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        const heroData = this.heroData[heroConfig.occupation]
                        if (heroData) {
                            for (let index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    heroData[index].cellID = newCellID;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private addBarracksIDToList(t: number): void {
        this.barracks_unlock_id_list[t] = 2;
    }

    private checkHeroIDIsUnLock(t: number): number {
        for (let e = 0; e < this.barracks_unlock_data.length; e++) {
            if (this.barracks_unlock_data[e].heroId == t) {
                return gm.data.mapCell_data.barracks_unlock_data[e].state;
            }
        }
        return 2;
    }

    private changeSingleSuperHeroCellID(t: number, e: number, a: number): void {
        if (30000 < t) {
            const i = gm.data.config_data.getHeroCfgByID(t);
            if (i && i.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                for (let o = 0; o < this.superHeroData.length; o++) {
                    if (this.superHeroData[o].heroid == t && this.superHeroData[o].cellID == e) {
                        this.superHeroData[o].cellID = a;
                        break
                    }
                }
            }
        }
    }

    public delSingleSuperHeroCellID(t: number, e: number): void {
        if (30000 < t) {
            const a = gm.data.config_data.getHeroCfgByID(t);
            if (a && a.hero_type === HeroTypeEnum.SUPER_HERO_TYPE) {
                for (let i = 0; i < this.superHeroData.length; i++) {
                    if (this.superHeroData[i].heroid === t && this.superHeroData[i].cellID === e) {
                        this.superHeroData.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    public changeCellData(t: number, e: number) {
        if (0 != this.role_map_data[t].itemID && 186 != e) {
            if (395 != e && 313 != e) {
                if (0 == this.role_map_data[e].itemID) {
                    if (this.role_map_data[t].itemType == ItemTypeEnum.BUILD_TYPE) {
                        const buildCfg = gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                        if (buildCfg) {
                            this.buildData[buildCfg.buildType].cellID = e;
                        }

                    } else {
                        this.changeCellID(this.role_map_data[t].itemType, t, e);
                    }

                    this.changeSingleSuperHeroCellID(this.role_map_data[t].itemID, t, e);
                    this.changeDefenseHeroUIDCell(this.role_map_data[t].heroUID, e);
                    this.changeMapItemDataByID(e, this.role_map_data[t].itemType, this.role_map_data[t].itemID, this.role_map_data[t].heroUID, false);
                    this.changeMapItemDataByID(t, 0, 0, 0, false);

                    for (let index = 0; index < this.roleSpaceList.length; index++) {
                        if (e == this.roleSpaceList[index]) {
                            this.roleSpaceList.splice(index, 1);
                            break;
                        }
                    }

                    this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                    this.addRoleSpaceCellByID(t);
                    gm.audio.play_effect(gm.const.AUDIO_160_CHANGEPOS);
                    this.async_write_data();
                    return;
                }

                if (this.role_map_data[e].itemType != ItemTypeEnum.BUILD_TYPE || this.role_map_data[t].itemType != ItemTypeEnum.HERO_TYPE) {
                    if (this.role_map_data[e].itemType != ItemTypeEnum.BUILD_TYPE || this.role_map_data[t].itemType != ItemTypeEnum.ITEM_TYPE) {
                        if (this.role_map_data[e].itemType == ItemTypeEnum.HERO_TYPE && this.role_map_data[t].itemType == ItemTypeEnum.ITEM_TYPE) {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID) as HeroConfig;
                            if (!heroCfg) return;
                            for (let index = 0; index < heroCfg.nextNeedItem.length; index++) {
                                if (0 < heroCfg.nextNeedItem[index] && heroCfg.nextNeedItem[index] == this.role_map_data[t].itemID) {
                                    const heroID = this.checkHeroIDIsUnLock(heroCfg.nextLv[index]);
                                    if (this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]] <= 0 || !this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]]) {
                                        gm.ui.show_notice("Nâng cấp doanh trại và kích hoạt cuộn giấy để tổng hợp anh hùng");
                                        return;
                                    }
                                    this.checkIsPlayItemSound(heroID);

                                    for (let i = 0; i < this.heroData[heroCfg.occupation].length; i++) {
                                        if (this.heroData[heroCfg.occupation][i].cellID == e) {
                                            this.heroData[heroCfg.occupation].splice(i, 1);
                                            this.addRoleItem(heroCfg.nextLv[index], e);
                                            break;
                                        }
                                    }

                                    const heroIS = this.getHeroIsDefanseByCellID(this.role_map_data[e].cellID);
                                    this.delDefenseDataByID(this.role_map_data[e].heroUID);
                                    this.delRoleItem(this.role_map_data[t].itemID, t);
                                    this.changeMapItemDataByID(e, ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);

                                    if (heroIS) {
                                        const defenseHeroItemVO = new DefenseHeroItemVO;
                                        defenseHeroItemVO.cellID = e;
                                        defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                        defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                        this.addDefenseDataByID(defenseHeroItemVO);
                                    }

                                    this.unlockBookItem(ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                    gm.data.task_data.update_task_progress(TaskConditionType.MERGE_HERO);
                                    gm.data.task_data.update_task_progress(TaskConditionType.MERGE);
                                    this.saveAddCompseTimes();

                                    if (1 == heroID) {
                                        this.compositeUnlockHero(heroCfg.nextLv[index]);
                                        gm.ui.mapMainUI.showHeroUnlockAni(heroCfg.nextLv[index]);
                                    }

                                    this.async_write_data();
                                    this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                                    void gm.ui.mapMainUI.playComposeAnim(e);
                                    return;
                                }
                            }
                        }
                        if (this.role_map_data[t].itemType == ItemTypeEnum.HERO_TYPE && this.role_map_data[e].itemType == ItemTypeEnum.ITEM_TYPE) {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (!heroCfg) return;

                            for (let index = 0; index < heroCfg.nextNeedItem.length; index++) {
                                if (0 < heroCfg.nextNeedItem[index] && heroCfg.nextNeedItem[index] == this.role_map_data[e].itemID) {
                                    const heroIS = this.checkHeroIDIsUnLock(heroCfg.nextLv[index]);
                                    if (this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]] <= 0 || !this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]]) {
                                        gm.ui.show_notice("Cần nâng cấp cấp doanh trại và kích hoạt cuộn giấy để tổng hợp");
                                        return;
                                    } else {
                                        this.checkIsPlayItemSound(heroIS);
                                        const HeroIsDefanseByCellID = this.getHeroIsDefanseByCellID(this.role_map_data[t].cellID);
                                        this.delRoleItem(this.role_map_data[t].itemID, t);
                                        this.delRoleItem(this.role_map_data[e].itemID, e);
                                        this.delDefenseDataByID(this.role_map_data[t].heroUID);
                                        this.changeMapItemDataByID(e, ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                        this.changeMapItemDataByID(t, 0, 0);
                                        this.addRoleItem(heroCfg.nextLv[index], e);

                                        if (HeroIsDefanseByCellID) {
                                            const defenseHeroItemVO = new DefenseHeroItemVO;
                                            defenseHeroItemVO.cellID = e;
                                            defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                            defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                            this.addDefenseDataByID(defenseHeroItemVO);
                                        }

                                        this.saveAddCompseTimes();
                                        if (1 == heroIS) {
                                            this.compositeUnlockHero(heroCfg.nextLv[index]);
                                        }

                                        this.unlockBookItem(ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                        gm.data.task_data.update_task_progress(TaskConditionType.MERGE_HERO);
                                        gm.data.task_data.update_task_progress(TaskConditionType.MERGE);
                                        this.async_write_data();
                                        this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                                        gm.ui.mapMainUI.playComposeAnim(e);

                                        if (1 == heroIS) {
                                            this.compositeUnlockHero(heroCfg.nextLv[index]);
                                            gm.ui.mapMainUI.showHeroUnlockAni(heroCfg.nextLv[index]);
                                        }

                                        return;
                                    }
                                }
                            }
                        }

                        if (this.role_map_data[e].itemType == ItemTypeEnum.HERO_TYPE && ItemTypeEnum.HERO_TYPE == this.role_map_data[t].itemType) {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (!heroCfg) return;
                            const HeroCfgByID = gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID)
                            if (!HeroCfgByID) return;
                            if (1 == this.role_compose_total_times) {
                                gm.ui.show_notice("Bạn cần hoàn thành phần vũ khí và hướng dẫn dân làng!");
                                return;
                            }

                            if (heroCfg.heroid == HeroCfgByID.heroid) {
                                if (0 == heroCfg.occupation) {
                                    gm.ui.show_notice("Dân làng cần tổng hợp vũ khí!!!");
                                    return;
                                }

                                if (11 == heroCfg.occupation || 12 == heroCfg.occupation || 1 == heroCfg.hero_type) {
                                    if (0 == heroCfg.nextLv[0]) {
                                        gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!!!");
                                        return;
                                    }
                                } else if (3 == heroCfg.lv) {
                                    gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!!!");
                                    return;
                                }

                                if (HeroCfgByID.occupation == heroCfg.occupation && 0 < heroCfg.nextNeedItem[0]) {
                                    for (let y = 0; y < heroCfg.nextNeedItem.length; y++) {
                                        if (heroCfg.nextNeedItem[y] == HeroCfgByID.heroid && this.checkHeroIDIsUnLock(HeroCfgByID.nextLv[y])) {
                                            if (HeroCfgByID.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                                                let n = 0;
                                                for (let r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid &&
                                                        this.superHeroData[r].cellID == t &&
                                                        0 == this.superHeroData[r].heroState ||
                                                        this.superHeroData[r].heroid == heroCfg.heroid &&
                                                        this.superHeroData[r].cellID == e &&
                                                        0 == this.superHeroData[r].heroState) {
                                                        n++;
                                                    }
                                                }

                                                if (n < 2) {
                                                    gm.ui.show_notice("Siêu anh hùng không thể tổng hợp trong quá trình hồi sinh");
                                                    return;
                                                }

                                                for (let r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid && this.superHeroData[r].cellID == e) {
                                                        this.superHeroData[r].heroid = HeroCfgByID.nextLv[y];
                                                        const heroCfg = gm.data.config_data.getHeroCfgByID(HeroCfgByID.nextLv[y]);
                                                        if (heroCfg) {
                                                            this.superHeroData[r].hp = heroCfg.hp;
                                                            this.superHeroData[r].maxHp = heroCfg.hp;
                                                            this.superHeroData[r].curReliveTime = 0;
                                                            this.superHeroData[r].nextReliveTime = 0;
                                                        }
                                                        break;
                                                    }
                                                }

                                                for (let r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid && this.superHeroData[r].cellID == t) {
                                                        this.superHeroData.splice(r, 1);
                                                        break;
                                                    }
                                                }
                                            }

                                            const heroIDI = this.checkHeroIDIsUnLock(HeroCfgByID.nextLv[y]);
                                            this.checkIsPlayItemSound(heroIDI);
                                            const heroIS = this.getHeroIsDefanseByCellID(this.role_map_data[t].cellID);
                                            if (!heroIS) {
                                                this.getHeroIsDefanseByCellID(this.role_map_data[e].cellID);
                                            }

                                            for (i = 0; i < this.heroData[heroCfg.occupation].length; i++) {
                                                if (this.heroData[heroCfg.occupation][i].cellID == e) {
                                                    this.heroData[heroCfg.occupation][i].itemID = HeroCfgByID.nextLv[y];
                                                    break;
                                                }
                                            }

                                            this.delRoleItem(this.role_map_data[t].itemID, t);
                                            this.delDefenseDataByID(this.role_map_data[e].heroUID);
                                            this.changeMapItemDataByID(e, ItemTypeEnum.HERO_TYPE, HeroCfgByID.nextLv[y]);

                                            if (heroIS) {
                                                const defenseHeroItemVO = new DefenseHeroItemVO;
                                                defenseHeroItemVO.cellID = e;
                                                defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                                defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                                this.addDefenseDataByID(defenseHeroItemVO);
                                            }

                                            this.saveAddCompseTimes();
                                            if (1 == heroIDI) {
                                                this.compositeUnlockHero(HeroCfgByID.nextLv[y]);
                                                gm.ui.mapMainUI.showHeroUnlockAni(HeroCfgByID.nextLv[y]);
                                            }

                                            this.unlockBookItem(ItemTypeEnum.HERO_TYPE, HeroCfgByID.nextLv[y]);
                                            gm.data.task_data.update_task_progress(TaskConditionType.MERGE_HERO);
                                            gm.data.task_data.update_task_progress(TaskConditionType.MERGE);
                                            this.async_write_data();
                                            gm.ui.mapMainUI.playComposeAnim(e);

                                            if (!(heroCfg.hero_type != HeroTypeEnum.SUPER_HERO_TYPE && 11 != heroCfg.occupation && 12 != heroCfg.occupation)) {
                                                gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [HeroCfgByID.nextLv[y], e]);
                                                gm.ui.async_show_module(gm.const.SUPERHEROOP);
                                            }
                                            return;
                                        }
                                    }
                                }
                            }
                        }

                        if (this.role_map_data[e].itemType == ItemTypeEnum.ITEM_TYPE && ItemTypeEnum.ITEM_TYPE == this.role_map_data[t].itemType) {
                            const itemCfg = gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                            if (!itemCfg) return;
                            const itemCfgID = gm.data.config_data.getItemCfgByID(this.role_map_data[e].itemID);
                            if (!itemCfgID) return;

                            if (itemCfgID.type == PropTypeEnum.WEAPON_TYPE && itemCfg.id == itemCfgID.id) {
                                gm.ui.show_notice("Vũ khí cần phải kết hợp với dân làng để trở thành anh hùng");
                                return;
                            }

                            if (0 == itemCfg.next && itemCfg.id == itemCfgID.id) {
                                gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!");
                                return;
                            }

                            if (itemCfgID.type == itemCfg.type && 0 < itemCfg.next && itemCfg.id == itemCfgID.id) {
                                for (i = 0; i < this.itemData[itemCfg.type].length; i++) {
                                    if (this.itemData[itemCfg.type][i].cellID == e) {
                                        this.itemData[itemCfg.type][i].itemID = itemCfgID.next;
                                        break;
                                    }
                                }

                                this.delRoleItem(this.role_map_data[t].itemID, t);
                                this.changeMapItemDataByID(e, ItemTypeEnum.ITEM_TYPE, itemCfgID.next);

                                if (itemCfgID.next == gm.const.HEROGIFTID) {
                                    gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒超级英雄",
                                        item_id: itemCfgID.next
                                    });
                                    ReportData.instance.report_once_point(10871);
                                    ReportData.instance.report_point(10872);

                                } else if (itemCfgID.next == gm.const.GIFTID) {
                                    gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒水精灵",
                                        item_id: itemCfgID.next
                                    });
                                    ReportData.instance.report_once_point(10875);
                                    ReportData.instance.report_point(10876);

                                } else if (itemCfgID.next == gm.const.PAGODAGIFTID) {
                                    gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒炮塔",
                                        item_id: itemCfgID.next
                                    });
                                    ReportData.instance.report_once_point(10873);
                                    ReportData.instance.report_point(10874);
                                }

                                this.saveAddCompseTimes();
                                this.unlockBookItem(ItemTypeEnum.ITEM_TYPE, itemCfgID.next);
                                gm.data.task_data.update_task_progress(TaskConditionType.MERGE);
                                this.async_write_data();

                                if (12 <= itemCfgID.type && itemCfgID.type <= 14 || 19 == itemCfgID.type) {
                                    gm.ui.mapMainUI.showGiftBar(itemCfgID.next, e);
                                }
                                gm.ui.mapMainUI.playComposeAnim(e);
                                return;
                            }
                        }

                        const itemID = this.role_map_data[e].itemID;
                        const itemType = this.role_map_data[e].itemType;
                        const heroUID = this.role_map_data[e].heroUID;

                        if (this.role_map_data[t].itemType == ItemTypeEnum.BUILD_TYPE) {
                            if (this.role_map_data[e].itemType == ItemTypeEnum.BUILD_TYPE) {
                                const buildCfg = gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                                if (!buildCfg) return;
                                const buildCfg1 = gm.data.config_data.getBuildCfgByID(this.role_map_data[e].itemID);
                                if (!buildCfg1) return;

                                if (buildCfg.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE || buildCfg.buildType == BuildTypeEnum.WHARFTAX_TYPE) return;
                                if (buildCfg1.buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE || buildCfg1.buildType == BuildTypeEnum.WHARFTAX_TYPE) return;
                                if (this.buildData[buildCfg.buildType].buildLvl <= 0) return;
                                if (this.buildData[buildCfg1.buildType].buildLvl <= 0) return;
                                this.buildData[buildCfg.buildType].cellID = e;
                                this.buildData[buildCfg1.buildType].cellID = t;

                            } else {
                                const buildCfg = gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                                if (!buildCfg) return;
                                if (this.buildData[buildCfg.buildType].buildLvl <= 0) return;
                                this.buildData[buildCfg.buildType].cellID = e;
                                this.changeCellID(this.role_map_data[e].itemType, e, t);
                                this.changeDefenseHeroUIDCell(this.role_map_data[e].heroUID, t);
                                this.setSuperHeroNewCellID(this.role_map_data[t].itemID, this.role_map_data[t].heroUID, e);
                            }
                        } else {
                            this.changeDefenseHeroUIDCell(this.role_map_data[t].heroUID, e);
                            this.changeDefenseHeroUIDCell(this.role_map_data[e].heroUID, t);
                            this.setItemCellIDAndItemID(this.role_map_data[t].itemType, t, 999, this.role_map_data[t].itemID);
                            this.setItemCellIDAndItemID(this.role_map_data[e].itemType, e, e, this.role_map_data[t].itemID);
                            this.setItemCellIDAndItemID(this.role_map_data[t].itemType, 999, t, this.role_map_data[e].itemID, t);
                            this.changeSuperHeroCellID(this.role_map_data[t].itemType, this.role_map_data[t].itemID, t, itemType, itemID, e);
                        }

                        this.changeMapItemDataByID(e, this.role_map_data[t].itemType, this.role_map_data[t].itemID, this.role_map_data[t].heroUID, false);
                        this.changeMapItemDataByID(t, itemType, itemID, heroUID, false);
                        gm.audio.play_effect(gm.const.AUDIO_160_CHANGEPOS);
                        this.async_write_data();

                        if (this.role_map_data[t].itemType == ItemTypeEnum.HERO_TYPE) {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (heroCfg && 10 == heroCfg.occupation) {
                                this.checkEmitWallEvent(this.role_map_data[t].itemID, t, e);
                            } else {
                                this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                            }

                        } else if (this.role_map_data[e].itemType == ItemTypeEnum.HERO_TYPE) {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
                            if (heroCfg && 10 == heroCfg.occupation) {
                                this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                            } else {
                                this.checkEmitWallEvent(this.role_map_data[t].itemID, t, e);
                            }
                        }

                    } else {
                        const itemCfg = gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                        const buildCfg = gm.data.config_data.getBuildCfgByID(this.role_map_data[e].itemID);
                        if (itemCfg && buildCfg) {
                            if (buildCfg.lock == this.role_build_lock_num) {
                                const buildData = this.buildData[buildCfg.buildType];
                                if (buildData.metrailData[itemCfg.type] && buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                    if (itemCfg.type == PropTypeEnum.WOOD_TYPE || itemCfg.type == PropTypeEnum.IRON_TYPE || itemCfg.type == PropTypeEnum.SHELL_MONEY_TYPE) {
                                        if (buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                            if (this.isGuide) {
                                                if (!gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                                    gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                                }

                                                if (itemCfg.number >= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                                    TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, itemCfg.number, buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur);
                                                    gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                                    gm.ui.emit("guide_del_item", t);
                                                }
                                                return;
                                            }

                                            if (itemCfg.number <= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                                buildData.metrailData[itemCfg.type].cur += itemCfg.number;
                                            } else {
                                                const metrailData = buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur;
                                                this.splitItemNum(metrailData, itemCfg.id);
                                                buildData.metrailData[itemCfg.type].cur = buildData.metrailData[itemCfg.type].max;
                                            }
                                            this.delRoleItem(itemCfg.id, t);
                                            gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        }

                                    } else {
                                        if (this.isGuide) {
                                            if (!gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                                gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                            }

                                            if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                                TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, 1, 1);
                                                gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                                gm.ui.emit("guide_del_item", t);
                                            }
                                            return;
                                        }

                                        if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                            buildData.metrailData[itemCfg.type].cur = 1;
                                            this.delRoleItem(itemCfg.id, t);
                                            this._needRefreshCellList.push(t);
                                            gm.ui.emit("build_metarail_change", buildCfg.buildID);

                                        } else if (itemCfg.id > buildData.metrailData[itemCfg.type].id) {
                                            this.delRoleItem(itemCfg.id, t);
                                            this._needRefreshCellList.push(t);
                                            const Num: number[] = [];
                                            for (let y = itemCfg.id - 1; y >= buildData.metrailData[itemCfg.type].id; y--) {
                                                Num.push(y);
                                                if (y == buildData.metrailData[itemCfg.type].id) {
                                                    buildData.metrailData[itemCfg.type].cur += 1;
                                                    break;
                                                }
                                            }
                                            this.addWareHouseList(Num, 0);
                                            gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        }
                                    }
                                }
                                this.async_write_data();
                            } else {
                                gm.ui.show_notice("Hãy nâng cấp tòa nhà " + gm.data.config_data.getSortBuildName() + "trước!!!");
                            }
                        }
                    }
                }
            } else {
                if (this.role_map_data[t].itemType == ItemTypeEnum.ITEM_TYPE) {
                    const itemCfg = gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                    if (!itemCfg) return;
                    const buildCfg = gm.data.config_data.getBuildCfgByID(this.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].buildID);
                    if (!buildCfg) return;
                    if (buildCfg.lock != this.role_build_lock_num) {
                        gm.ui.show_notice("Hãy nâng cấp tòa nhà " + gm.data.config_data.getSortBuildName() + "trước!!!");
                        return;
                    }

                    const buildData = this.buildData[buildCfg.buildType];
                    if (buildData.metrailData[itemCfg.type] && buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                        if (itemCfg.type == PropTypeEnum.WOOD_TYPE || itemCfg.type == PropTypeEnum.IRON_TYPE || itemCfg.type == PropTypeEnum.SHELL_MONEY_TYPE) {
                            if (buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                if (this.isGuide) {
                                    if (itemCfg.number >= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                        if (!gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                            gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                        }
                                        TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, itemCfg.number, buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur);
                                        gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        gm.ui.emit("guide_del_item", t);
                                    }
                                    return;
                                }

                                if (itemCfg.number <= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                    buildData.metrailData[itemCfg.type].cur += itemCfg.number, this.delRoleItem(itemCfg.id, t);
                                    gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                    return;
                                }

                                const metrailData = buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur;
                                this.splitItemNum(metrailData, itemCfg.id);
                                buildData.metrailData[itemCfg.type].cur = buildData.metrailData[itemCfg.type].max;
                                this.delRoleItem(itemCfg.id, t);
                                gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }

                        } else {
                            if (this.isGuide) {
                                if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                    if (!gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                        gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                    }
                                    TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, 1, 1);
                                    gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                    gm.ui.emit("guide_del_item", t);
                                }
                                return;
                            }

                            if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                buildData.metrailData[itemCfg.type].cur = 1;
                                this.delRoleItem(itemCfg.id, t);
                                this._needRefreshCellList.push(t);
                                void gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }

                            if (itemCfg.id > buildData.metrailData[itemCfg.type].id) {
                                this.delRoleItem(itemCfg.id, t), this._needRefreshCellList.push(t);
                                const Num: number[] = []
                                for (let y = itemCfg.id - 1; y >= buildData.metrailData[itemCfg.type].id; y--) {
                                    Num.push(y);
                                    if (y == buildData.metrailData[itemCfg.type].id) {
                                        (buildData.metrailData[itemCfg.type].cur += 1);
                                    }
                                }

                                this.addWareHouseList(Num, 0);
                                gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }
                        }
                    }
                }
                this.async_write_data();
            }
        }
    }

    private changeSuperHeroCellID(
        t: ItemTypeEnum,
        e: number,
        a: number,
        i: ItemTypeEnum,
        o: number,
        n: number
    ): void {
        if (t == ItemTypeEnum.HERO_TYPE && i != ItemTypeEnum.HERO_TYPE) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(e);
            if (heroConfig && heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                this.setSuperHeroNewCellID(e, a, n);
            }

        } else if (t != ItemTypeEnum.HERO_TYPE && i == ItemTypeEnum.HERO_TYPE) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(o);
            if (heroConfig && heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                this.setSuperHeroNewCellID(o, n, a);
            }

        } else if (t == ItemTypeEnum.HERO_TYPE && i == ItemTypeEnum.HERO_TYPE) {
            const heroConfig1 = gm.data.config_data.getHeroCfgByID(e);
            const heroConfig2 = gm.data.config_data.getHeroCfgByID(o);
            if (heroConfig1 && heroConfig2) {
                if (heroConfig1.hero_type != HeroTypeEnum.SUPER_HERO_TYPE || heroConfig2.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                    if (heroConfig1.hero_type == HeroTypeEnum.SUPER_HERO_TYPE || heroConfig2.hero_type != HeroTypeEnum.SUPER_HERO_TYPE) {
                        if (heroConfig1.hero_type == HeroTypeEnum.SUPER_HERO_TYPE && heroConfig2.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                            this.setSuperHeroNewCellID(e, a, 999);
                            this.setSuperHeroNewCellID(o, n, a);
                            this.setSuperHeroNewCellID(e, 999, n);
                        }
                        return;
                    }
                    this.setSuperHeroNewCellID(o, n, a)

                } else {
                    this.setSuperHeroNewCellID(e, a, n);
                }
            }
        }
    }

    private setSuperHeroNewCellID(t: number, e: number, a: number): void {
        for (let i = 0; i < this.superHeroData.length; i++) {
            if (this.superHeroData[i].cellID == e && this.superHeroData[i].heroid == t) {
                this.superHeroData[i].cellID = a;
                break;
            }
        }
    }

    private checkEmitWallEvent(t: number, e: number, a: number): void {
        if (30000 < t) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(t);
            if (heroConfig && 10 == heroConfig.occupation) {
                const calldire = gm.data.config_data.getCallDireCellID(e);
                for (let o = 0; o < calldire.length; o++) {
                    if (0 <= calldire[o] && this.getCellIsWall(calldire[o])) {
                        gm.ui.emit("updateWall", calldire[o]);
                    }
                }

                if (e != a) {
                    const calldire = gm.data.config_data.getCallDireCellID(a);
                    for (let o = 0; o < calldire.length; o++) {
                        if (0 <= calldire[o] && this.getCellIsWall(calldire[o])) {
                            gm.ui.emit("updateWall", calldire[o]);
                        }
                    }
                }
            }
        }
    }

    public setAddGameCoin(t: number, e: number): void {
        if (t == SetItemNumEnum.ADD_ITEM_TYPE) {
            this.roleCoinData.coinNum += e;
        } else if (t == SetItemNumEnum.REDUCE_ITEM_TYPE) {
            this.roleCoinData.coinNum -= e;
            this.roleCoinData.coinNum = Math.max(0, this.roleCoinData.coinNum);
        }

        gm.ui.emit("coin_change");
        this.async_write_data();
    }

    public setAddGameDiamond(t: number, e: number): void {
        if (t == SetItemNumEnum.ADD_ITEM_TYPE) {
            this.roleCoinData.diamondNum += e;
        } else if (t == SetItemNumEnum.REDUCE_ITEM_TYPE) {
            this.roleCoinData.diamondNum -= e;
            this.roleCoinData.diamondNum = Math.max(0, this.roleCoinData.diamondNum);
        }
        gm.ui.emit("coin_change");
        this.async_write_data();
    }

    public delCellItemByCellID(t: number): void {
        if (this.role_map_data[t]) {
            this.delRoleItem(this.role_map_data[t].itemID, t);
            this.async_write_data();
        }
    }

    public delCellItem(t: number, e: number): void {
        const rowData = gm.config.get_row_data("ItemConfigData", t.toString()) as ItemConfig;
        if (rowData.type == PropTypeEnum.COIN_TYPE) {
            this.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, e);

        } else if (rowData.type == PropTypeEnum.DIAMONDS_TYPE) {
            this.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, e);
        } else if (rowData.type == PropTypeEnum.WOOD_TYPE ||
            rowData.type == PropTypeEnum.IRON_TYPE ||
            rowData.type == PropTypeEnum.SHELL_MONEY_TYPE ||
            rowData.type == PropTypeEnum.KEY_TYPE ||
            rowData.type == PropTypeEnum.SHIPANCHORL_TYPE ||
            rowData.type == PropTypeEnum.HORN_TYPE ||
            rowData.type == PropTypeEnum.JAR_TYPE ||
            rowData.type == PropTypeEnum.SOUL_TYPE) {
            Utils.sort_by_props(this.itemData[rowData.type], {
                itemID: "descending"
            });

            let count = 0;
            for (let index = this.itemData[rowData.type].length - 1; 0 <= index; index--) {
                let itemID = this.itemData[rowData.type][index].itemID;
                const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
                if (!(count + itemConfig.number <= e)) {
                    this._needRefreshCellList.push(this.itemData[rowData.type][index].cellID);
                    itemID = e - count;
                    if (gm.ui.mapMainUI) {
                        const newR = gm.ui.mapMainUI.mapContent.getChildByName(this.itemData[rowData.type][index].cellID.toString());
                        const newS = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[BuildTypeEnum.STALL_TYPE].cellID.toString());
                        if (newR && newS) {
                            const newN = newS.getComponent(MainMapItem);
                            if (newN && newN.itemNode) {
                                gm.ui.show_item_fly(
                                    itemConfig.id,
                                    newR.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                    newN.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            }
                        }
                    }
                    this.delCellItemByCellID(this.itemData[rowData.type][index].cellID);
                    this.splitItemNum(itemConfig.number - itemID, itemConfig.id);
                    break;
                }

                this._needRefreshCellList.push(this.itemData[rowData.type][index].cellID);
                if (gm.ui.mapMainUI) {
                    const newR = gm.ui.mapMainUI.mapContent.getChildByName(this.itemData[rowData.type][index].cellID.toString());
                    const newS = gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[BuildTypeEnum.STALL_TYPE].cellID.toString());
                    if (newR && newS) {
                        const newN = newS.getComponent(MainMapItem);
                        if (newN && newN.itemNode) {
                            gm.ui.show_item_fly(
                                itemConfig.id,
                                newR.convertToWorldSpaceAR(cc.Vec3.ZERO),
                                newN.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        }
                    }
                }
                this.delCellItemByCellID(this.itemData[rowData.type][index].cellID);
                count += itemConfig.number;
            }
            this.async_write_data();

        } else if (rowData.type == PropTypeEnum.WEAPON_TYPE) {
            const itemData = this.itemData[rowData.type];
            Utils.sort_by_props(itemData, {
                itemID: "descending"
            });

            let d, p = 0;
            for (let o = itemData.length - 1; 0 <= o && !((d = itemData[o]).itemID == t && (this._needRefreshCellList.push(d.cellID), this.delCellItemByCellID(d.cellID), ++p >= e)); o--);
            this.async_write_data();
        }
    }

    public getCoinNum(t: number, e: number): boolean {
        if (t == PropTypeEnum.WOOD_TYPE || t == PropTypeEnum.IRON_TYPE || t == PropTypeEnum.SHELL_MONEY_TYPE) {
            return !!(this.itemData[t] && 0 < this.itemData[t].length);
        }
        if (this.itemData[t]) {
            for (let a = 0; a < this.itemData[t].length; a++) {
                if (this.itemData[t][a].itemID >= e) return true;
            }
        }
        return false;
    }

    public getHeroNum(t: number, e: number): boolean {
        if (this.heroData[t]) {
            for (let a = 0; a < this.heroData[t].length; a++) {
                if (this.heroData[t][a].itemID == e) {
                    return true;
                }
            }
        }
        return false;
    }

    public async_write_data(...argArray: any[]): void {
        this.last_timestamp = Math.floor(Date.now() / 1e3);
        gm.data.event_emitter.emit(MapCellCfgData.EVENT_DATA_CHANGE);
        super.async_write_data.call(this, argArray);
    }

    public getNextLockCell(): MapCell | null {
        return gm.data.config_data.getAreaNextOpenCellID(this.role_cur_unlock_area_ID, this.role_cur_unlock_area_sort) || null
    }

    private checkBuildIsActive(t: number): void {
        for (const key in this.buildData) {
            if (0 == this.buildData[key].buildLvl && 1 == this.buildData[key].buildState) {
                const buildCfg = gm.data.config_data.getBuildCfgByID(this.buildData[key].buildID);
                if (buildCfg && buildCfg.activeCellID == t) {
                    if (buildCfg.buildType == BuildTypeEnum.TOWER_TYPE) return;
                    this.buildData[key].buildState = 2;
                    gm.ui.emit("item_children_refresh", this.buildData[key].cellID);
                    break;
                }
            }
        }
    }

    private saveAddCompseTimes(): void {
        this.role_compose_times++;
        this.role_compose_total_times++;
        gm.ui.emit("item_compose_time_change", this.role_compose_total_times);

        const lockCell = this.getNextLockCell();
        if (lockCell) {
            if (this.role_compose_times >= lockCell.comTimes) {
                this.role_compose_times = 0;
                const mapCell = gm.data.config_data.getMapCellCfgByID(lockCell.cellID);
                if (this.role_compose_times == mapCell.isObstruct) {
                    const mapItemData = new MapItemDataVO;
                    mapItemData.cellID = lockCell.cellID;
                    mapItemData.cellState = 2;
                    mapItemData.itemState = 2;
                    mapItemData.itemID = mapCell.itemID;
                    mapItemData.heroUID = 0;
                    mapItemData.itemType = mapCell.itemType;
                    this.role_map_data[mapItemData.cellID] = mapItemData;

                    if (0 < this.role_map_data[mapItemData.cellID].itemID) {
                        if (mapItemData.itemType == ItemTypeEnum.BUILD_TYPE) {
                            this.addBuild(mapItemData.itemID, mapItemData.cellID);
                        } else {
                            this.addRoleItem(mapItemData.itemID, mapItemData.cellID);
                        }
                    } else {
                        this.addRoleSpaceCellByID(mapItemData.cellID);
                    }
                }

                this.addIndexToList(listTypeEnum.MAP_TOTAL_TYPE, lockCell.cellID);
                this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, lockCell.cellID);
                this.checkBuildIsActive(lockCell.cellID);
                gm.ui.emit("item_unlock_refresh", lockCell.cellID);
                this.role_cur_unlock_area_sort += 1;
                this.checkEmitWallEvent(mapCell.itemID, lockCell.cellID, lockCell.cellID);
                this.async_write_data();

                if (gm.const.funPosList[lockCell.cellID]) {
                    gm.ui.mapMainUI.setLockSenceMoveMap(gm.const.funPosList[lockCell.cellID].toString())
                }

                ReportData.instance.report_once_point(5e4 + lockCell.cellID);
                gm.channel.report_event("unlock_map_cell", {
                    event_desc: "解锁地图格子",
                    cell_count: lockCell.cellID,
                    desc: cc.js.formatStr("解锁地图格子%d", lockCell.cellID)
                });
                gm.ui.emit("compostimeChange");
                gm.ui.emit("build_show_stateIcon", true);
            }

        } else {
            const unlockArea = this.role_cur_unlock_area_ID + 1;
            for (let o = 0; o < this.roleUnlockAreaIDList.length; o++) {
                if (unlockArea == this.roleUnlockAreaIDList[o]) {
                    this.role_cur_unlock_area_ID = unlockArea;
                    const areaID = gm.data.config_data.getAreaIDList(unlockArea);
                    if (areaID) {
                        for (const key in this.role_cur_unlock_area_sort = 0, areaID) {
                            if (10000 == areaID[key].comTimes) {
                                this.role_cur_unlock_area_sort++;
                            }
                        }
                        this.role_compose_times = 0;
                        this.async_write_data();
                        gm.ui.mapMainUI.showNextCellNode();
                        break;
                    }
                }
            }
        }

        gm.ui.emit("show_hand_anim", false);
        if (1 == this.role_compose_total_times) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 5,
                guidedesc: "5.第1次合成1级鱼叉兵"
            });
            gm.ui.mapMainUI.checkHandAnimDelay();

        } else if (2 == this.role_compose_total_times) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 6,
                guidedesc: "6.第2次合成1级鱼叉兵"
            });
            gm.ui.mapMainUI.checkHandAnimDelay();

        } else if (3 == this.role_compose_total_times) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 7,
                guidedesc: "7.第1次合成2级鱼叉兵"
            });
            gm.data.mapCell_data.setRoleGuideData(13, 0);
            gm.ui.mapMainUI.checkGuideIsShow();

        } else if (4 == this.role_compose_total_times) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 19,
                guidedesc: "19.第1次合成4级木头"
            });
            gm.ui.mapMainUI.checkHandAnimDelay();

        } else if (5 == this.role_compose_total_times) {
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 20,
                guidedesc: "20.第1次合成2级铁矿"
            });
            gm.ui.mapMainUI.checkHandAnimDelay();
        }
    }

    private unlockBookItem(t: number, e: number): void {
        if (null != gm.config.get_config_data("BookConfigData").data[e] as BookConfig) {
            if (null == this.tUnlockData[t]) {
                this.tUnlockData[t] = {} as number[];
            }
            if (null == this.tUnlockData[t][e]) {
                const row = gm.config.get_row_data("BookConfigData", e.toString()) as BookConfig;
                this.tUnlockData[t][e] = row.reward <= 0 ? 1 : 0;
                gm.ui.emit("bookRedStatus", true);
            }
        }
    }

    public checkBookItemIsUnlock(t: number): boolean {
        for (const key in this.tUnlockData) {
            const unlock = this.tUnlockData[key]
            if (null != unlock && null != unlock[t]) return true;
        }
        return false;
    }

    public checkBookItemHaveUnlockReward(t: number | null = null): boolean {
        for (const key in this.tUnlockData) {
            const unlock = this.tUnlockData[key];
            if (null != unlock)
                if (null != t) {
                    if (null != unlock[t]) return 0 == unlock[t];
                } else {
                    for (const i in unlock) {
                        if (0 == unlock[i]) return true;
                    }
                }
        }
        return false;
    }

    public setBookItemGainUnlockReward(t: number): void {
        for (const key in this.tUnlockData) {
            const unlock = this.tUnlockData[key]
            if (null != unlock && null != unlock[t]) {
                unlock[t] = 1;
                break
            }
        }
        this.async_write_data();
    }

    private get_unlock_hero_array(): number[] {
        const t = this.tUnlockData[ItemTypeEnum.HERO_TYPE];
        const e: number[] = [];
        if (t) {
            for (const a in t) {
                e.push(parseInt(a));
            }
        }
        return e;
    }

    private changeDefenseHeroUIDCell(t: number, e: number): void {
        if (Object.keys(this._defenseList).length < 0 || this._defenseList[t]) {
            this._defenseList[t].cellID = e;
        }
    }

    public delDefenseDataByID(t: number): void {
        if (!(Object.keys(this._defenseList).length < 0 || !this._defenseList[t])) {
            const defense = this._defenseList[t].cellID;
            delete this._defenseList[t];
            gm.ui.emit("updateDefenseHero", defense, false);
            gm.data.update_player_data_request();
        }
    }

    public addDefenseDataByID(t: DefenseHeroItemVO): void {
        const buildData = this.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        if (!(!buildData || buildData.buildLvl < 1)) {
            this._defenseList[t.heroUID] = t;
            gm.ui.emit("updateDefenseHero", t.cellID, true);
            gm.data.update_player_data_request();
        }
    }

    private initDefanseData(): void {
        const buildData = this.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        if (buildData && !(buildData.buildLvl < 1)) {
            TempData.getInitAllHeroList(true);
            this.defense_List = {};

            const heroList = TempData.getHeroList();
            const buildCfg = gm.data.config_data.getBuildCfgByID(buildData.buildID);
            if (buildCfg) {
                let o = 0;
                let count = 0;
                for (let r = 0; r < buildCfg.capacity; r++) {
                    if (o == buildCfg.capacity) return;
                    if (heroList.length > r) {
                        for (let s = 0; s < heroList[r].cellID.length; s++) {
                            if (o == buildCfg.capacity) return;
                            if (gm.data.config_data.getHeroCfgByID(heroList[r].heroID).hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                                if (1 == this.getDefenseSuperNum()) continue;
                                0 == count && count++;
                            }

                            const defenseHeroItem = new DefenseHeroItemVO;
                            defenseHeroItem.cellID = heroList[r].cellID[s];
                            defenseHeroItem.heroid = heroList[r].heroID;
                            defenseHeroItem.heroUID = heroList[r].heroUID[s];
                            this._defenseList[heroList[r].heroUID[s]] = defenseHeroItem;
                            o++;
                        }
                    }
                }
                for (const i in this._defenseList) {
                    gm.ui.emit("updateDefenseHero", this._defenseList[i].cellID, true);
                }
            }
        }
    }

    public getDefanseHeroData(): Record<number, DefenseHeroItemVO> {
        return this._defenseList;
    }

    public getDefenseSuperNum(): number {
        let count = 0;
        for (const ket in this._defenseList) {
            if (gm.data.config_data.getHeroCfgByID(this._defenseList[ket].heroid).hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                count++;
            }
        }
        return count;
    }

    public getHeroIsDefanseByCellID(t: number): boolean {
        return !(this.role_map_data[t] && 0 == this.role_map_data[t].heroUID || !(0 < Object.keys(this._defenseList).length && this.role_map_data[t] && this._defenseList[this.role_map_data[t].heroUID]))
    }

    public getHeroDefanseDataByHeroUID(t: number) {
        return Object.keys(this._defenseList).length <= 0 ? null : this._defenseList[t]
    }

    public autoOpenCase(): boolean {
        for (const t in this.role_map_data) {
            if (this.role_map_data[t].itemID == RewardIdEnum.BARREL ||
                this.role_map_data[t].itemID == RewardIdEnum.SILVER_BARREL ||
                this.role_map_data[t].itemID == RewardIdEnum.GOLD_BARREL) {
                gm.ui.mapMainUI.mapContent.getChildByName(this.role_map_data[t].cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem).onOpenBarrel();
                return true;
            }
        }
        return false;
    }

    public autoCompose(): boolean {
        for (const key in this.itemData) {
            const propTypeID = parseInt(key);
            if (propTypeID == PropTypeEnum.STONE_HERO_TYPE) {
                for (let index = 0; index < this.itemData[key].length; index++) {
                    const cellID = this.itemData[key][index].cellID;
                    if (this.role_map_data[cellID].itemID == this.itemData[key][index].itemID) {
                        if (!gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                            !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem) ||
                            0 == gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.childrenCount ||
                            !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem)) continue;

                        gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem).onClickOpenHero();
                        return true;
                    }
                }

            } else {
                if (propTypeID == PropTypeEnum.STATUE_TYPE || propTypeID == PropTypeEnum.SHELL_TYPE || propTypeID == PropTypeEnum.FOUNTAIN_TYPE) {
                    for (let index = 0; index < this.itemData[key].length; index++) {
                        const cellID = this.itemData[key][index].cellID;
                        const itemCfg = gm.data.config_data.getItemCfgByID(this.itemData[key][index].itemID);

                        if (itemCfg && itemCfg.next <= 0 && this.role_map_data[cellID].itemID == this.itemData[key][index].itemID) {
                            if (itemCfg.id == gm.const.HEROGIFTID) {
                                if (!gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                                    !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem) ||
                                    0 == gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.childrenCount ||
                                    !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem)) continue;

                                gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem).onOpenSuperHeroCase();
                                return true;
                            }

                            if (itemCfg.id == gm.const.GIFTID || itemCfg.id == gm.const.PAGODAGIFTID) {
                                if (!gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                                    !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem) ||
                                    0 == gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.childrenCount ||
                                    !gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem)) continue;

                                gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem).itemNode.children[0].getComponent(PropItem).onOpenGiftCase();
                                return true;
                            }
                        }
                    }
                }

                for (let index = 0; index < this.itemData[key].length; index++) {
                    const itemCfg = gm.data.config_data.getItemCfgByID(this.itemData[key][index].itemID);
                    if (itemCfg && 0 < itemCfg.next) {
                        for (let intemIndex = 0; intemIndex < this.itemData[key].length; intemIndex++) {
                            if (this.itemData[key][intemIndex].itemID == itemCfg.id && this.itemData[key][intemIndex].cellID != this.itemData[key][index].cellID) {
                                const aa = this.itemData[key][index].cellID;
                                const ii = this.itemData[key][intemIndex].cellID;

                                if (this.role_map_data[aa].itemID == itemCfg.id && this.role_map_data[ii].itemID == this.itemData[key][intemIndex].itemID) {
                                    gm.ui.emit("close_new_anim", ii);
                                    this.changeCellData(aa, ii);
                                    gm.ui.emit("item_children_refresh", ii);
                                    gm.ui.emit("item_children_refresh", aa);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        for (const key in this.heroData) {
            const propTypeID = parseInt(key);
            for (let heroIndex = 0; heroIndex < this.heroData[propTypeID].length; heroIndex++) {
                const heroCfg = gm.data.config_data.getHeroCfgByID(this.heroData[propTypeID][heroIndex].itemID);
                if (heroCfg) {
                    for (let lvIndex = 0; lvIndex < heroCfg.nextLv.length; lvIndex++) {
                        if (0 < heroCfg.nextLv[lvIndex]) {
                            if (heroCfg.nextNeedItem[lvIndex] <= 30000 && 0 < this.barracks_unlock_id_list[heroCfg.nextNeedSort[lvIndex]]) {
                                if (0 == this.itemData[PropTypeEnum.WEAPON_TYPE].length) continue;

                                for (let intemIndex = 0; intemIndex < this.itemData[PropTypeEnum.WEAPON_TYPE].length; intemIndex++) {
                                    if (this.itemData[PropTypeEnum.WEAPON_TYPE][intemIndex].itemID == heroCfg.nextNeedItem[lvIndex]) {
                                        const aa = this.heroData[propTypeID][heroIndex].cellID;
                                        const ii = this.itemData[PropTypeEnum.WEAPON_TYPE][intemIndex].cellID;
                                        if (this.role_map_data[aa].itemID == heroCfg.heroid && this.role_map_data[ii].itemID == this.itemData[PropTypeEnum.WEAPON_TYPE][intemIndex].itemID) {
                                            gm.ui.emit("close_new_anim", ii);
                                            this.changeCellData(aa, ii);
                                            gm.ui.emit("item_children_refresh", ii);
                                            gm.ui.emit("item_children_refresh", aa);
                                            return true;
                                        }
                                    }
                                }

                            } else if (heroCfg.nextNeedItem[lvIndex] == heroCfg.heroid && 0 < heroCfg.occupation) {
                                if (0 == this.heroData[heroCfg.occupation].length) continue;

                                const surperHero = this.getSuperHeroData(heroCfg.heroid, this.heroData[propTypeID][heroIndex].cellID);
                                if (heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE && surperHero && 1 == surperHero.heroState) continue;

                                for (let s = 0; s < this.heroData[propTypeID].length; s++) {
                                    if (this.heroData[propTypeID][s].itemID == heroCfg.heroid && this.heroData[propTypeID][s].cellID != this.heroData[propTypeID][heroIndex].cellID) {
                                        const aa = this.heroData[propTypeID][heroIndex].cellID;
                                        const ii = this.heroData[propTypeID][s].cellID;

                                        if (this.role_map_data[aa].itemID == heroCfg.heroid && this.role_map_data[ii].itemID == this.heroData[propTypeID][s].itemID) {
                                            const heroCfgID = gm.data.config_data.getHeroCfgByID(this.role_map_data[ii].itemID);
                                            const superHeroData = this.getSuperHeroData(heroCfg.heroid, this.heroData[propTypeID][s].cellID);

                                            if (heroCfgID.hero_type == HeroTypeEnum.SUPER_HERO_TYPE && superHeroData && 1 == superHeroData.heroState) continue;
                                            gm.ui.emit("close_new_anim", ii);
                                            this.changeCellData(aa, ii);
                                            gm.ui.emit("item_children_refresh", ii);
                                            gm.ui.emit("item_children_refresh", aa);
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

}

export class roleCoinDataVO {
    public coinNum: number;
    public diamondNum: number;

    constructor() {
        this.coinNum = 1000;
        this.diamondNum = 100;
    }
}

export class roleMapItemVO {
    public heroUID: number;
    public itemID: number;
    public cellID: number;
    public itemType: number;
}

export class MapItemDataVO {
    public cellID: number;
    public cellState: number;
    public itemState: number;
    public itemType: ItemTypeEnum;
    public itemID: number;
    public heroUID: number;
}

export class RoleBuildDataVO implements BuildData {
    public buildState: number;
    public buildID: number;
    public buildType: number;
    public buildLvl: number;
    public cellID: number;
    public isCanMove: number;
    public productData: RoleProductDataVO;
    public upNeedCoin: number;
    public metrailData: Record<number, metrail>;
}

export class roleGoBattleItemVO {
    public cellID: number;
    public hp: number;
    public itemID: number;
    public itemType: number;
    public maxHp: number;
}

export class RoleItemDataVO {
    public itemID: number;
    public itemType: number;
}

export class RoleProductDataVO {
    public productCd: number;
    public productNum: number;
    public maxNum: number;
    public fullTime: number;
    public productID: number;
    public beginTime: number;
    public curNum: number;
}

export class RoleBarrelDataVO {
    public curBarrelNum: number;
    public maxBarrelNum: number;
    public freeBarrelCd: number;
    public nextFreeBarrelNum: number;
    public nextFreeBarrelTime: number;
    public curFreeBarrelTime: number;
}

export class roleBarrelItemVO {
    public itemID: number;
    public itemIndex: number;
    public itemPos: cc.Vec3;
}

export class heroUnloockData {
    public heroId: number;
    public unlockId: number;
    public state: number;
    public ani_state: number;
}

export class GuideVO {
    public guideID: number;
    public runningIndex: number;
    public isFinishAllGuide: number;
    public step: number;
    public isEnd: boolean;
}

export class GuideGiftVO {
    public guideBeginTime: number;
    public guideIsGet: boolean;
}

export class SuperHeroVO {
    public heroid: number;
    public hp: number;
    public heroState: number;
    public curReliveTime: number;
    public nextReliveTime: number;
    public maxHp: number;
    public cellID: number;
}

export class DefenseHeroItemVO {
    public cellID: number;
    public heroid: number;
    public heroUID: number;
}



