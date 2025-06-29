//
import { gm } from './GameManager';
import { Utils } from './Utils';
import { HeroTypeEnum } from './Constants';

// @
export interface IGuideData {
  guideID: number;
  isEnd: boolean;
  runningIndex: number;
}

// @
interface LocalHeroItem {
  heroID: number;
  heroLvl: number;
  heroNum: number;
  cellID: number[];
  heroUID: number[];
  heroHp: number[];
  sortNum: number;
}



//
export class TempData {
  public static guideData: TempGuideVO | null = null;
  public static guideBuildMetrailData: GuideBuildMetrailVO | null = null;
  public static heroLock: number[] = [];
  public static map_type: number = 1;
  public static localHeroList: LocalHeroItem[] = [];
  public static is_defense_type: number = 1;
  public static is_need_open_barrkPanel: boolean = false;
  public static map_have_hand: boolean = false;
  public static task_have_hand: boolean = false;
  public static isShowOffline: boolean = false;
  public static mainFunShowLucky: boolean = true;
  public static mainFunShowGuide: boolean = false;
  public static mainFunShowSign: boolean = false;
  public static mainFunShowSuperHero: boolean = false;
  public static offline_time: number = 0;

  // @
  public static setDefenseType(defenseType: number = 1): void {
    this.is_defense_type = defenseType;
  }

  // @
  public static getDefenseType(): number {
    return this.is_defense_type;
  }

  // @
  public static initGuideTempData(): void {
    this.guideData = new TempGuideVO;
    this.guideData.guideID = gm.data.mapCell_data.roleGuideVO.isEnd ? 0 : gm.data.mapCell_data.roleGuideVO.guideID;
    this.guideData.isEnd = gm.data.mapCell_data.roleGuideVO.isEnd;
    this.guideData.runningIndex = 0;
  }

  // @
  public static setGuideTempData(guideID: number, runningIndex: number): void {
    this.guideData = new TempGuideVO;
    this.guideData.guideID = guideID;
    this.guideData.isEnd = false;
    this.guideData.runningIndex = runningIndex;
  }

  // @
  public static setRoleGuideDataEnd(): void {
    this.guideData.isEnd = true;
    if (gm.data.mapCell_data.roleGuideVO.guideID == this.guideData.guideID) {
      gm.data.mapCell_data.setRoleGuideDataEnd(this.guideData.guideID, this.guideData.runningIndex);
    }
  }

  // @
  public static getRoleGuideData(): IGuideData | null {
    return this.guideData;
  }

  // @
  public static addRoleGuideRunningIndex(): void {
    if (this.guideData) this.guideData.runningIndex++;
  }

  // @
  public static setBuildGuideMertaril(buildID: number, itemID: number, itemType: number, cellID: number, itemNum: number, needNum: number): void {
    if (!this.guideBuildMetrailData) {
      this.guideBuildMetrailData = new GuideBuildMetrailVO;
      this.guideBuildMetrailData.buildID = buildID;
      this.guideBuildMetrailData.metrailList = [];
    }

    if (buildID != this.guideBuildMetrailData.buildID) {
      this.guideBuildMetrailData.buildID = buildID,
        this.guideBuildMetrailData.metrailList = [];
    }
    const GuideBuildMetrailItem = new GuideBuildMetrailItemVO;
    GuideBuildMetrailItem.cellID = cellID;
    GuideBuildMetrailItem.itemType = itemType;
    GuideBuildMetrailItem.itemID = itemID;
    GuideBuildMetrailItem.itemNum = itemNum;
    GuideBuildMetrailItem.needNum = needNum;
    this.guideBuildMetrailData.metrailList.push(GuideBuildMetrailItem);
  }

  // @
  public static getBuildGuideMertarilNumByID(buildID: number, itemID: number): number {
    if (this.guideBuildMetrailData && this.guideBuildMetrailData.buildID === buildID) {
      for (let i = 0; i < this.guideBuildMetrailData.metrailList.length; i++) {
        const itemConfig = gm.data.config_data.getItemCfgByID(itemID);
        if (itemConfig && this.guideBuildMetrailData.metrailList[i].itemType === itemConfig.type) {
          return this.guideBuildMetrailData.metrailList[i].itemNum;
        }
      }
    }
    return 0;
  }

  // @
  public static getBuildGuideMertarilData(): GuideBuildMetrailVO | null {
    return this.guideBuildMetrailData;
  }

  // @
  public static addLockHeroID(heroID: number): void {
    if (!this.heroLock.includes(heroID)) {
      this.heroLock.push(heroID);
    }
  }

  // @
  public static getInitAllHeroList(isDefense: boolean = false): void {
    const heroData = gm.data.mapCell_data.heroData;
    const heroMap: { [key: number]: LocalHeroItem } = {};
    this.localHeroList = [];
    const superHeroData = gm.data.mapCell_data.getAllSuperHeroData();
    //
    for (const key in heroData) {
      if (![0, 10, 11, 12].includes(parseInt(key))) {
        for (let j = 0; j < heroData[key].length; j++) {
          const heroConfig = gm.data.config_data.getHeroCfgByID(heroData[key][j].itemID);
          if (heroConfig) {
            let hp = 0;
            let isDead = false;
            if (heroConfig.hero_type === HeroTypeEnum.SUPER_HERO_TYPE) {
              for (let k = 0; k < superHeroData.length; k++) {
                if (superHeroData[k].cellID === heroData[key][j].cellID && heroConfig.heroid === superHeroData[k].heroid) {
                  if (isDefense) {
                    hp = superHeroData[k].hp;
                    break;
                  }
                  if (superHeroData[k].hp <= 0) {
                    isDead = true;
                    break;
                  }
                  hp = superHeroData[k].hp;
                }
              }
            }
            if (!isDead && heroConfig.sequence !== 0) {
              if (!isDefense || !gm.data.mapCell_data.getHeroIsDefanseByCellID(heroData[key][j].cellID)) {
                if (heroMap[heroConfig.heroid]) {
                  heroMap[heroConfig.heroid].heroNum++;
                  heroMap[heroConfig.heroid].cellID.push(heroData[key][j].cellID);
                  const mapData = gm.data.mapCell_data.getMapdataByCellID(heroData[key][j].cellID);
                  if (mapData !== 0) {
                    heroMap[heroConfig.heroid].heroUID.push(mapData);
                    heroMap[heroConfig.heroid].heroHp.push(hp);
                  } else {
                    cc.log(`tempData getInitAllHeroList line170 heroUID =0  heroList[key][i].cellID =${heroData[key][j].cellID}`);
                  }
                } else {
                  const newHero: LocalHeroItem = {
                    heroID: heroConfig.heroid,
                    heroLvl: heroConfig.lv,
                    heroNum: 1,
                    cellID: [heroData[key][j].cellID],
                    heroUID: [],
                    heroHp: [hp],
                    sortNum: heroConfig.sequence,
                  };
                  const mapData = gm.data.mapCell_data.getMapdataByCellID(heroData[key][j].cellID);
                  if (mapData) {
                    newHero.heroUID.push(mapData);
                    heroMap[heroConfig.heroid] = newHero;
                  } else {
                    cc.log(`tempData getInitAllHeroList line183 heroUID =0  heroList[key][i].cellID =${heroData[key][j].cellID}`);
                  }
                }
              }
            }
          }
        }
      }
    }
    for (const key in heroMap) {
      this.localHeroList.push(heroMap[key]);
    }
    Utils.sort_by_props(this.localHeroList, { sortNum: "ascending" });
  } // end: getInitAllHeroList

  // @
  public static removeHeroByID(heroID: number): void {
    for (let i = 0; i < this.localHeroList.length; i++) {
      if (this.localHeroList[i].heroID === heroID) {
        if (this.localHeroList[i].heroNum === 1) {
          this.localHeroList.splice(i, 1);
        } else {
          this.localHeroList[i].heroNum--;
          this.localHeroList[i].cellID.shift();
          this.localHeroList[i].heroUID.shift();
          this.localHeroList[i].heroHp.shift();
        }
        break;
      }
    }
  }

  // @
  public static addHeroByID(heroID: number, cellID: number): void {
    let found = false;
    for (let index = 0; index < this.localHeroList.length; index++) {
      if (this.localHeroList[index].heroID == heroID) {
        found = true;
        this.localHeroList[index].heroNum++;
        this.localHeroList[index].cellID.push(index);
        const mapData = gm.data.mapCell_data.getMapdataByCellID(index);

        if (0 == mapData) {
          cc.log("tempData getInitAllHeroList line224 heroUID =0  heroList[key][i].cellID =" + cellID);
          return;
        }

        this.localHeroList[index].heroUID.push(mapData);
        const heroCfg = gm.data.config_data.getHeroCfgByID(heroID);
        if (heroCfg) {
          if (heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
            const superHero = gm.data.mapCell_data.getSuperHeroData(heroCfg.heroid, cellID);
            if (superHero) {
              this.localHeroList[index].heroHp.push(superHero.hp);
            }
          } else {
            this.localHeroList[index].heroHp.push(heroCfg.hp);
          }
        }
        break;
      }
    }

    if (!found) {
      const heroCfg = gm.data.config_data.getHeroCfgByID(heroID);
      if (heroCfg) {
        const localHeroItem = new LocalHeroItemVO;
        localHeroItem.heroID = heroCfg.heroid;
        localHeroItem.heroLvl = heroCfg.lv;
        localHeroItem.heroNum = 1;
        localHeroItem.cellID = [cellID];
        const mapData = gm.data.mapCell_data.getMapdataByCellID(cellID);
        if (0 != mapData) {
          localHeroItem.heroUID = [mapData];
          if (heroCfg.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
            const superHero = gm.data.mapCell_data.getSuperHeroData(heroCfg.heroid, cellID);
            if (superHero) {
              localHeroItem.heroHp = [superHero.hp];
            }
          } else {
            localHeroItem.heroHp = [heroCfg.hp];
          }
          localHeroItem.sortNum = heroCfg.sequence;
          this.localHeroList.push(localHeroItem);
          Utils.sort_by_props(this.localHeroList, {
            sortNum: "ascending"
          });
        } else {
          cc.log("tempData getInitAllHeroList line252 heroUID =0  heroList[key][i].cellID =" + cellID);
        }
      }
    }
  } // end: addHeroByID

  // @
 public static getHeroList(): LocalHeroItem[] {
    return this.localHeroList;
  }
}

export class LocalHeroItemVO {
  public heroID: number;
  public heroLvl: number;
  public heroNum: number;
  public cellID: number[];
  public heroUID: number[];
  public heroHp: number[];
  public sortNum: number;
}

export class OfflineItemVO { }

export class TempGuideVO {
  public guideID: number;
  public isEnd: boolean;
  public runningIndex: number
}

export class GuideBuildMetrailVO {
  public metrailList: GuideBuildMetrailItemVO[];
  public buildID: number;
}

export class GuideBuildMetrailItemVO {
  public needNum: number;
  public itemNum: number;
  public itemID: number;
  public itemType: number;
  public cellID: number;
}

