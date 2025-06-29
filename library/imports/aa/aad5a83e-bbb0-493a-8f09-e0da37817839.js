"use strict";
cc._RF.push(module, 'aad5ag+u7BJOo8J4No3gXg5', 'TempData');
// start-scene/scripts/TempData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideBuildMetrailItemVO = exports.GuideBuildMetrailVO = exports.TempGuideVO = exports.OfflineItemVO = exports.LocalHeroItemVO = exports.TempData = void 0;
//
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
//
var TempData = /** @class */ (function () {
    function TempData() {
    }
    // @
    TempData.setDefenseType = function (defenseType) {
        if (defenseType === void 0) { defenseType = 1; }
        this.is_defense_type = defenseType;
    };
    // @
    TempData.getDefenseType = function () {
        return this.is_defense_type;
    };
    // @
    TempData.initGuideTempData = function () {
        this.guideData = new TempGuideVO;
        this.guideData.guideID = GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd ? 0 : GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID;
        this.guideData.isEnd = GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd;
        this.guideData.runningIndex = 0;
    };
    // @
    TempData.setGuideTempData = function (guideID, runningIndex) {
        this.guideData = new TempGuideVO;
        this.guideData.guideID = guideID;
        this.guideData.isEnd = false;
        this.guideData.runningIndex = runningIndex;
    };
    // @
    TempData.setRoleGuideDataEnd = function () {
        this.guideData.isEnd = true;
        if (GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID == this.guideData.guideID) {
            GameManager_1.gm.data.mapCell_data.setRoleGuideDataEnd(this.guideData.guideID, this.guideData.runningIndex);
        }
    };
    // @
    TempData.getRoleGuideData = function () {
        return this.guideData;
    };
    // @
    TempData.addRoleGuideRunningIndex = function () {
        if (this.guideData)
            this.guideData.runningIndex++;
    };
    // @
    TempData.setBuildGuideMertaril = function (buildID, itemID, itemType, cellID, itemNum, needNum) {
        if (!this.guideBuildMetrailData) {
            this.guideBuildMetrailData = new GuideBuildMetrailVO;
            this.guideBuildMetrailData.buildID = buildID;
            this.guideBuildMetrailData.metrailList = [];
        }
        if (buildID != this.guideBuildMetrailData.buildID) {
            this.guideBuildMetrailData.buildID = buildID,
                this.guideBuildMetrailData.metrailList = [];
        }
        var GuideBuildMetrailItem = new GuideBuildMetrailItemVO;
        GuideBuildMetrailItem.cellID = cellID;
        GuideBuildMetrailItem.itemType = itemType;
        GuideBuildMetrailItem.itemID = itemID;
        GuideBuildMetrailItem.itemNum = itemNum;
        GuideBuildMetrailItem.needNum = needNum;
        this.guideBuildMetrailData.metrailList.push(GuideBuildMetrailItem);
    };
    // @
    TempData.getBuildGuideMertarilNumByID = function (buildID, itemID) {
        if (this.guideBuildMetrailData && this.guideBuildMetrailData.buildID === buildID) {
            for (var i = 0; i < this.guideBuildMetrailData.metrailList.length; i++) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (itemConfig && this.guideBuildMetrailData.metrailList[i].itemType === itemConfig.type) {
                    return this.guideBuildMetrailData.metrailList[i].itemNum;
                }
            }
        }
        return 0;
    };
    // @
    TempData.getBuildGuideMertarilData = function () {
        return this.guideBuildMetrailData;
    };
    // @
    TempData.addLockHeroID = function (heroID) {
        if (!this.heroLock.includes(heroID)) {
            this.heroLock.push(heroID);
        }
    };
    // @
    TempData.getInitAllHeroList = function (isDefense) {
        if (isDefense === void 0) { isDefense = false; }
        var heroData = GameManager_1.gm.data.mapCell_data.heroData;
        var heroMap = {};
        this.localHeroList = [];
        var superHeroData = GameManager_1.gm.data.mapCell_data.getAllSuperHeroData();
        //
        for (var key in heroData) {
            if (![0, 10, 11, 12].includes(parseInt(key))) {
                for (var j = 0; j < heroData[key].length; j++) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroData[key][j].itemID);
                    if (heroConfig) {
                        var hp = 0;
                        var isDead = false;
                        if (heroConfig.hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                            for (var k = 0; k < superHeroData.length; k++) {
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
                            if (!isDefense || !GameManager_1.gm.data.mapCell_data.getHeroIsDefanseByCellID(heroData[key][j].cellID)) {
                                if (heroMap[heroConfig.heroid]) {
                                    heroMap[heroConfig.heroid].heroNum++;
                                    heroMap[heroConfig.heroid].cellID.push(heroData[key][j].cellID);
                                    var mapData = GameManager_1.gm.data.mapCell_data.getMapdataByCellID(heroData[key][j].cellID);
                                    if (mapData !== 0) {
                                        heroMap[heroConfig.heroid].heroUID.push(mapData);
                                        heroMap[heroConfig.heroid].heroHp.push(hp);
                                    }
                                    else {
                                        cc.log("tempData getInitAllHeroList line170 heroUID =0  heroList[key][i].cellID =" + heroData[key][j].cellID);
                                    }
                                }
                                else {
                                    var newHero = {
                                        heroID: heroConfig.heroid,
                                        heroLvl: heroConfig.lv,
                                        heroNum: 1,
                                        cellID: [heroData[key][j].cellID],
                                        heroUID: [],
                                        heroHp: [hp],
                                        sortNum: heroConfig.sequence,
                                    };
                                    var mapData = GameManager_1.gm.data.mapCell_data.getMapdataByCellID(heroData[key][j].cellID);
                                    if (mapData) {
                                        newHero.heroUID.push(mapData);
                                        heroMap[heroConfig.heroid] = newHero;
                                    }
                                    else {
                                        cc.log("tempData getInitAllHeroList line183 heroUID =0  heroList[key][i].cellID =" + heroData[key][j].cellID);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var key in heroMap) {
            this.localHeroList.push(heroMap[key]);
        }
        Utils_1.Utils.sort_by_props(this.localHeroList, { sortNum: "ascending" });
    }; // end: getInitAllHeroList
    // @
    TempData.removeHeroByID = function (heroID) {
        for (var i = 0; i < this.localHeroList.length; i++) {
            if (this.localHeroList[i].heroID === heroID) {
                if (this.localHeroList[i].heroNum === 1) {
                    this.localHeroList.splice(i, 1);
                }
                else {
                    this.localHeroList[i].heroNum--;
                    this.localHeroList[i].cellID.shift();
                    this.localHeroList[i].heroUID.shift();
                    this.localHeroList[i].heroHp.shift();
                }
                break;
            }
        }
    };
    // @
    TempData.addHeroByID = function (heroID, cellID) {
        var found = false;
        for (var index = 0; index < this.localHeroList.length; index++) {
            if (this.localHeroList[index].heroID == heroID) {
                found = true;
                this.localHeroList[index].heroNum++;
                this.localHeroList[index].cellID.push(index);
                var mapData = GameManager_1.gm.data.mapCell_data.getMapdataByCellID(index);
                if (0 == mapData) {
                    cc.log("tempData getInitAllHeroList line224 heroUID =0  heroList[key][i].cellID =" + cellID);
                    return;
                }
                this.localHeroList[index].heroUID.push(mapData);
                var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
                if (heroCfg) {
                    if (heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                        var superHero = GameManager_1.gm.data.mapCell_data.getSuperHeroData(heroCfg.heroid, cellID);
                        if (superHero) {
                            this.localHeroList[index].heroHp.push(superHero.hp);
                        }
                    }
                    else {
                        this.localHeroList[index].heroHp.push(heroCfg.hp);
                    }
                }
                break;
            }
        }
        if (!found) {
            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
            if (heroCfg) {
                var localHeroItem = new LocalHeroItemVO;
                localHeroItem.heroID = heroCfg.heroid;
                localHeroItem.heroLvl = heroCfg.lv;
                localHeroItem.heroNum = 1;
                localHeroItem.cellID = [cellID];
                var mapData = GameManager_1.gm.data.mapCell_data.getMapdataByCellID(cellID);
                if (0 != mapData) {
                    localHeroItem.heroUID = [mapData];
                    if (heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                        var superHero = GameManager_1.gm.data.mapCell_data.getSuperHeroData(heroCfg.heroid, cellID);
                        if (superHero) {
                            localHeroItem.heroHp = [superHero.hp];
                        }
                    }
                    else {
                        localHeroItem.heroHp = [heroCfg.hp];
                    }
                    localHeroItem.sortNum = heroCfg.sequence;
                    this.localHeroList.push(localHeroItem);
                    Utils_1.Utils.sort_by_props(this.localHeroList, {
                        sortNum: "ascending"
                    });
                }
                else {
                    cc.log("tempData getInitAllHeroList line252 heroUID =0  heroList[key][i].cellID =" + cellID);
                }
            }
        }
    }; // end: addHeroByID
    // @
    TempData.getHeroList = function () {
        return this.localHeroList;
    };
    TempData.guideData = null;
    TempData.guideBuildMetrailData = null;
    TempData.heroLock = [];
    TempData.map_type = 1;
    TempData.localHeroList = [];
    TempData.is_defense_type = 1;
    TempData.is_need_open_barrkPanel = false;
    TempData.map_have_hand = false;
    TempData.task_have_hand = false;
    TempData.isShowOffline = false;
    TempData.mainFunShowLucky = true;
    TempData.mainFunShowGuide = false;
    TempData.mainFunShowSign = false;
    TempData.mainFunShowSuperHero = false;
    TempData.offline_time = 0;
    return TempData;
}());
exports.TempData = TempData;
var LocalHeroItemVO = /** @class */ (function () {
    function LocalHeroItemVO() {
    }
    return LocalHeroItemVO;
}());
exports.LocalHeroItemVO = LocalHeroItemVO;
var OfflineItemVO = /** @class */ (function () {
    function OfflineItemVO() {
    }
    return OfflineItemVO;
}());
exports.OfflineItemVO = OfflineItemVO;
var TempGuideVO = /** @class */ (function () {
    function TempGuideVO() {
    }
    return TempGuideVO;
}());
exports.TempGuideVO = TempGuideVO;
var GuideBuildMetrailVO = /** @class */ (function () {
    function GuideBuildMetrailVO() {
    }
    return GuideBuildMetrailVO;
}());
exports.GuideBuildMetrailVO = GuideBuildMetrailVO;
var GuideBuildMetrailItemVO = /** @class */ (function () {
    function GuideBuildMetrailItemVO() {
    }
    return GuideBuildMetrailItemVO;
}());
exports.GuideBuildMetrailItemVO = GuideBuildMetrailItemVO;

cc._RF.pop();