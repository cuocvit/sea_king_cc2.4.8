import { gm } from './GameManager';
import { BuildTypeEnum, SpecialEnum } from './Constants';
import { MapCell } from "../../common/configs/mapcell"
import { Build } from "../../common/configs/build";
import { ItemConfig } from "../../common/configs/item";
import { lvRandomConfig } from "../../common/configs/lv_random";
import { HeroConfig } from "../../common/configs/hero";
import { CaskConfig } from "../../common/configs/cask";
import { ShopConfig } from "../../common/configs/shop";
import { GuideConfig } from "../../common/configs/guide";
import { Special } from "../../common/configs/special";
import { SkillConfig } from "../../common/configs/skill";
import { MallConfig } from "../../common/configs/mall";
import { StarConfig } from "../../common/configs/star";


// @
export enum AttackType {
    NONE = 0,
    MELEE = 1,
    REMOTE = 2
}

// @
export enum SkillType {
    NONE = 0,
    IMMEDIATE = 1,
    FLY = 2,
    PASSIVE = 3
}

// @
export enum SkillPos {
    ENEMY_BODY = 0,
    SELF_BODY = 1,
    ALL_ENEMY_BODY = 2,
    ALL_SELF_BODY = 3,
    MAIN_CITY = 4,
    ONE_CIRCLE_GRID = 5,
    TWO_CIRCLE_GRID = 6
}

// @
export enum SkillEffectId {
    NONE = 0,
    REDUCE_DAMAGE = 1,
    ATTACK_SPEED_UP = 2,
    ATTACK_BONUS = 3,
    DIZZINESS = 4,
    DEFENSE_BONUS = 5,
    RESTORE_HP = 6,
    FIRE = 7,
    REDUCE_SPEED = 8
}


//
export class ConfigData {
    private _mapCfgList: MapCell[] = [];
    private _buildCfgList: Record<number, Build> = {};
    private _openSortCellCfgList: Record<number, Record<number, MapCell>> = {};
    private _itemCfgList: Record<number, ItemConfig> = {};
    private _itemTypeCfgList: Record<string, any> = {};
    private _randomConfigData: Record<number, Record<number, number>> = {};
    private _heroCfgList: Record<number, HeroConfig> = {};
    private _caskCfgList: number[] = [];
    private _shopCfgList: Record<number, ShopConfig> = {};
    private _guideCfgList: Record<number, GuideConfig[]> = {};
    private _specialCfgList: Record<number, Special> = {};
    private _skillCfgList: Record<number, SkillConfig[]> = {};
    private _buildSort: Record<number, string> = {};
    private _heroSkillArr: Record<number, SkillConfig[]> = {};
    private _cellIndexArr: Record<number, number> = {};
    private _dict: number[] = [-20, 1, 20, -1];
    private _tempDictList: number[] = [];
    private _storeArr: Record<string, MallConfig[]> = {};
    private _starListArr: Record<number, StarConfig[]> = {};

    // @
    public getCallDireCellID(idx: number): number[] {
        this._tempDictList = [];
        for (let e = 0; e < this._dict.length; e++) {
            const val = this._cellIndexArr[this._mapCfgList[idx].mapIndex + this._dict[e]];
            this._tempDictList.push(val ? val : -1);
        }
        return this._tempDictList;
    }

    // ???
    public initAllCfg(): void {
        this._buildSort = {};
        this._openSortCellCfgList = {};
        this._itemCfgList = {};
        this._heroSkillArr = {};
        this._cellIndexArr = {};
        this._starListArr = {};

        // ----------
        const mapCellConfig = gm.config.get_config_data("MapCellConfigData");
        if (mapCellConfig) {
            for (let e in mapCellConfig.data) {
                const mapcell = mapCellConfig.data[e] as MapCell;
                this._mapCfgList.push(mapcell);
                this._openSortCellCfgList[mapcell.areaID] || (this._openSortCellCfgList[mapcell.areaID] = {});
                this._cellIndexArr[mapcell.mapIndex] = mapcell.cellID;
                this._openSortCellCfgList[mapcell.areaID][mapcell.lock] = mapcell;
            }
        }
        
        // ----------
        const buildConfig = gm.config.get_config_data("BuildConfigData");
        if (buildConfig) {
            for (let e in buildConfig.data) {
                const build = buildConfig.data[e] as Build;
                build.rate = build.rate.split("|");
                build.consume = build.consume.split("|");
                build.num = build.num.split("|");
                build.reward = build.reward.split("|");
                build.amount = build.amount.split("|");
                build.showAreaID = build.showAreaID.split("|");
                //
                for (let i = 0; i < build.rate.length; i++) {
                    build.rate[i] = parseInt(build.rate[i].toString());
                }
                for (let i = 0; i < build.consume.length; i++) {
                    build.consume[i] = parseInt(build.consume[i].toString());
                }
                for (let i = 0; i < build.num.length; i++) {
                    build.num[i] = parseInt(build.num[i].toString());
                }
                if (Array.isArray(build.reward)) {
                    for (let i = 0; i < build.reward.length; i++) {
                        build.reward[i] = parseInt(build.reward[i].toString());
                    }
                }
                if (Array.isArray(build.amount)) {
                    for (let i = 0; i < build.amount.length; i++) {
                        build.amount[i] = parseInt(build.amount[i].toString());
                    }
                }
                if (Array.isArray(build.showAreaID)) {
                    for (let i = 0; i < build.showAreaID.length; i++) {
                        build.showAreaID[i] = parseInt(build.showAreaID[i].toString());
                    }
                }
                this._buildSort[build.lock] = build.buildName;
            }
            this._buildCfgList = buildConfig.data as Record<number, Build>;

        }

        // ----------
        const itemConfig = gm.config.get_config_data("ItemConfigData");
        if (itemConfig) {
            const item = itemConfig.data as Record<string, ItemConfig>;
            this._itemCfgList = item;
        }

        // ----------
        const lvRanDomConfig = gm.config.get_config_data("LvRandomConfigData");
        if (lvRanDomConfig) {
            for (let e in lvRanDomConfig.data) {
                const Lv = lvRanDomConfig.data[e] as lvRandomConfig;
                this._randomConfigData[Lv.castle_lv] || (this._randomConfigData[Lv.castle_lv] = {});
                this._randomConfigData[Lv.castle_lv][Lv.lighthouse_lv] = Lv.pool_id;
            }
        }

        // ----------
        const heroConfig = gm.config.get_config_data("HeroConfigData");
        if (heroConfig) {
            for (let e in heroConfig.data) {
                const hero = heroConfig.data[e] as HeroConfig;
                hero.nextLv = hero.nextLv.split("|");
                hero.nextNeedItem = hero.nextNeedItem.split("|");
                hero.nextNeedSort = hero.nextNeedSort.split("|");
                hero.itemType = hero.itemType.split("|");
                hero.itemNum = hero.itemNum.split("|");
                //
                for (let i = 0; i < hero.nextLv.length; i++) {
                    hero.nextLv[i] = parseInt(hero.nextLv[i].toString());
                }
                for (let i = 0; i < hero.nextNeedItem.length; i++) {
                    hero.nextNeedItem[i] = parseInt(hero.nextNeedItem[i].toString());
                }
                for (let i = 0; i < hero.nextNeedSort.length; i++) {
                    hero.nextNeedSort[i] = parseInt(hero.nextNeedSort[i].toString());
                }
                for (let i = 0; i < hero.itemType.length; i++) {
                    hero.itemType[i] = parseInt(hero.itemType[i].toString());
                }
                for (let i = 0; i < hero.itemNum.length; i++) {
                    hero.itemNum[i] = parseInt(hero.itemNum[i].toString());
                }
                this._heroCfgList[hero.heroid] = hero;
            }
        }

        // ----------
        const caskConfig = gm.config.get_config_data("CaskConfigData");
        if (caskConfig) {
            for (let e in caskConfig.data) {
                const cask = caskConfig.data[e] as CaskConfig
                this._caskCfgList.push(cask.drop);
            }
        }

        // ----------
        const shopConfig = gm.config.get_config_data("ShopConfigData");
        if (shopConfig) {
            const shop = shopConfig.data as Record<number, ShopConfig>;
            this._shopCfgList = shop
        }

        // ----------
        this._guideCfgList = {};
        const guideConfig = gm.config.get_config_data("GuideConfigData");
        if (guideConfig) {
            for (let e in guideConfig.data) {
                const guide = guideConfig.data[e] as GuideConfig
                this._guideCfgList[guide.guideID] || (this._guideCfgList[guide.guideID] = []);
                this._guideCfgList[guide.guideID].push(guide);
            }
        }

        // ----------
        const speciaConfig = gm.config.get_config_data("SpecialConfigData");
        if (speciaConfig) {
            for (let e in speciaConfig.data) {
                const special = speciaConfig.data[e] as Special;
                special.prop = special.prop.split("|");
                special.value = special.value.split("|");
                //
                for (let i = 0; i < special.prop.length; i++) {
                    special.prop[i] = parseInt(special.prop[i].toString());
                }
                for (let i = 0; i < special.value.length; i++) {
                    special.value[i] = parseInt(special.value[i].toString());
                }
                this._specialCfgList[special.id] = special;
            }
        }

        // ----------
        this._skillCfgList = {};
        const skillConfig = gm.config.get_config_data("SkillConfigData");
        if (skillConfig) {
            for (let e in skillConfig.data) {
                const skill = skillConfig.data[e] as SkillConfig
                this._skillCfgList[skill.id] || (this._skillCfgList[skill.id] = []);
                this._skillCfgList[skill.id].push(skill);
                if (skill.is_show === 1) {
                    this._heroSkillArr[skill.id] || (this._heroSkillArr[skill.id] = []);
                    this._heroSkillArr[skill.id].push(skill);
                }
            }
        }

        // ----------
        this._storeArr = {};
        const storeConfig = gm.config.get_config_data("StoreConfigData");
        if (storeConfig) {
            for (let e in storeConfig.data) {
                const store = storeConfig.data[e] as MallConfig
                this._storeArr[store.shop_type] || (this._storeArr[store.shop_type] = []);
                this._storeArr[store.shop_type].push(store);
            }
        }

        // ----------
        const starConfig = gm.config.get_config_data("StarConfigData");
        if (starConfig) {
            for (let e in starConfig.data) {
                const star = starConfig.data[e] as StarConfig
                this._starListArr[star.arms] || (this._starListArr[star.arms] = []);
                this._starListArr[star.arms].push(star);
            }
        }
    } // end: initAllCfg

    // @
    public getSortBuildName(): string | undefined {
        return this._buildSort[gm.data.mapCell_data.role_build_lock_num];
    }

    // @
    public getGuideIDList(key: number): GuideConfig[] | undefined {
        return this._guideCfgList[key];
    }

    // @
    public getCaskIDBySortId(index: number): number[] {
        return this._caskCfgList[index] < 30000 ? [1, this._caskCfgList[index]] : [3, this._caskCfgList[index]];
    }

    // @
    public getRandomID(): number {
        const t = gm.data.mapCell_data.buildData[BuildTypeEnum.TOWER_TYPE];
        const e = gm.data.mapCell_data.buildData[BuildTypeEnum.WHARFTAX_TYPE];
        const buildID = t && t.buildID > 51001 ? t.buildID : 51001;
        const wharfID = e && e.buildID > 59001 ? e.buildID : 59001;
        return this._randomConfigData[buildID][wharfID];
    }

    // @
    public getAreaIDList(key: number): Record<number, MapCell> | undefined {
        return this._openSortCellCfgList[key];
    }

    // @
    public getAreaNextOpenCellID(key1: number, key2: number): MapCell {
        return this._openSortCellCfgList[key1][key2];
    }

    // @
    private getBuildCfg(): Record<number, Build> {
        return this._buildCfgList;
    }

    // @
    public getBuildCfgByID(key: number): Build | null {
        return this._buildCfgList[key] || null;
    }

    // @
    public getMapCellCfg(): MapCell[] {
        return this._mapCfgList;
    }

    // @
    public getMapCellCfgByID(cellID: number): MapCell {
        return this._mapCfgList[cellID];
    }

    // @
    public getMapIndexByCellID(mapIndex: number): number {
        return this._mapCfgList[mapIndex].mapIndex;
    }

    // @
    public getItemCfgByID(key: number): ItemConfig {
        return this._itemCfgList[key];
    }

    // @
    public getHeroCfgByID(key: number): HeroConfig {
        return this._heroCfgList[key];
    }

    // @
    private getShopCfgByID(key: number): ShopConfig {
        return this._shopCfgList[key];
    }

    // @
    public getSpecialByID(key: SpecialEnum): Special {
        return this._specialCfgList[key];
    }

    // @
    public getSpecialList(): Record<number, Special> {
        return this._specialCfgList;
    }

    // @
    private getSkillByID(key: number): SkillConfig[] {
        return this._skillCfgList[key];
    }

    // @
    public getSkillList(): Record<number, SkillConfig[]> {
        return this._heroSkillArr;
    }

    // @
    public getStoreList(): Record<number, MallConfig[]> {
        return this._storeArr;
    }

    // @
    public getStarCfgList(): Record<string, StarConfig[]> {
        return this._starListArr;
    }

    // @
    public getStarCfgByID(key1: number, key2: number): StarConfig | null {
        const star = this._starListArr[key1];
        return star && star[key2] || null
    }
}
