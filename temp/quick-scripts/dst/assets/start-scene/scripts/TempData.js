
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TempData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRlbXBEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEVBQUU7QUFDRiw2Q0FBbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLHlDQUEyQztBQXNCM0MsRUFBRTtBQUNGO0lBQUE7SUFxUUEsQ0FBQztJQXBQQyxJQUFJO0lBQ1UsdUJBQWMsR0FBNUIsVUFBNkIsV0FBdUI7UUFBdkIsNEJBQUEsRUFBQSxlQUF1QjtRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSTtJQUNVLHVCQUFjLEdBQTVCO1FBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO0lBQ1UsMEJBQWlCLEdBQS9CO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUMvRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUk7SUFDVSx5QkFBZ0IsR0FBOUIsVUFBK0IsT0FBZSxFQUFFLFlBQW9CO1FBQ2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FB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QUUsQ0FBQztJQUNwQyx3QkFBZSxHQUFXLENBQUMsQ0FBQztJQUM1QixnQ0FBdUIsR0FBWSxLQUFLLENBQUM7SUFDekMsc0JBQWEsR0FBWSxLQUFLLENBQUM7SUFDL0IsdUJBQWMsR0FBWSxLQUFLLENBQUM7SUFDaEMsc0JBQWEsR0FBWSxLQUFLLENBQUM7SUFDL0IseUJBQWdCLEdBQVksSUFBSSxDQUFDO0lBQ2pDLHlCQUFnQixHQUFZLEtBQUssQ0FBQztJQUNsQyx3QkFBZSxHQUFZLEtBQUssQ0FBQztJQUNqQyw2QkFBb0IsR0FBWSxLQUFLLENBQUM7SUFDdEMscUJBQVksR0FBVyxDQUFDLENBQUM7SUFzUHpDLGVBQUM7Q0FyUUQsQUFxUUMsSUFBQTtBQXJRWSw0QkFBUTtBQXVRckI7SUFBQTtJQVFBLENBQUM7SUFBRCxzQkFBQztBQUFELENBUkEsQUFRQyxJQUFBO0FBUlksMENBQWU7QUFVNUI7SUFBQTtJQUE2QixDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUE3QixBQUE4QixJQUFBO0FBQWpCLHNDQUFhO0FBRTFCO0lBQUE7SUFJQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLGtDQUFXO0FBTXhCO0lBQUE7SUFHQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUhZLGtEQUFtQjtBQUtoQztJQUFBO0lBTUEsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFOWSwwREFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBIZXJvVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUd1aWRlRGF0YSB7XHJcbiAgZ3VpZGVJRDogbnVtYmVyO1xyXG4gIGlzRW5kOiBib29sZWFuO1xyXG4gIHJ1bm5pbmdJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBAXHJcbmludGVyZmFjZSBMb2NhbEhlcm9JdGVtIHtcclxuICBoZXJvSUQ6IG51bWJlcjtcclxuICBoZXJvTHZsOiBudW1iZXI7XHJcbiAgaGVyb051bTogbnVtYmVyO1xyXG4gIGNlbGxJRDogbnVtYmVyW107XHJcbiAgaGVyb1VJRDogbnVtYmVyW107XHJcbiAgaGVyb0hwOiBudW1iZXJbXTtcclxuICBzb3J0TnVtOiBudW1iZXI7XHJcbn1cclxuXHJcblxyXG5cclxuLy9cclxuZXhwb3J0IGNsYXNzIFRlbXBEYXRhIHtcclxuICBwdWJsaWMgc3RhdGljIGd1aWRlRGF0YTogVGVtcEd1aWRlVk8gfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIGd1aWRlQnVpbGRNZXRyYWlsRGF0YTogR3VpZGVCdWlsZE1ldHJhaWxWTyB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBzdGF0aWMgaGVyb0xvY2s6IG51bWJlcltdID0gW107XHJcbiAgcHVibGljIHN0YXRpYyBtYXBfdHlwZTogbnVtYmVyID0gMTtcclxuICBwdWJsaWMgc3RhdGljIGxvY2FsSGVyb0xpc3Q6IExvY2FsSGVyb0l0ZW1bXSA9IFtdO1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNfZGVmZW5zZV90eXBlOiBudW1iZXIgPSAxO1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNfbmVlZF9vcGVuX2JhcnJrUGFuZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc3RhdGljIG1hcF9oYXZlX2hhbmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc3RhdGljIHRhc2tfaGF2ZV9oYW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIHN0YXRpYyBpc1Nob3dPZmZsaW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIHN0YXRpYyBtYWluRnVuU2hvd0x1Y2t5OiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgc3RhdGljIG1haW5GdW5TaG93R3VpZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc3RhdGljIG1haW5GdW5TaG93U2lnbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzdGF0aWMgbWFpbkZ1blNob3dTdXBlckhlcm86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgc3RhdGljIG9mZmxpbmVfdGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0RGVmZW5zZVR5cGUoZGVmZW5zZVR5cGU6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNfZGVmZW5zZV90eXBlID0gZGVmZW5zZVR5cGU7XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyBnZXREZWZlbnNlVHlwZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNfZGVmZW5zZV90eXBlO1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdEd1aWRlVGVtcERhdGEoKTogdm9pZCB7XHJcbiAgICB0aGlzLmd1aWRlRGF0YSA9IG5ldyBUZW1wR3VpZGVWTztcclxuICAgIHRoaXMuZ3VpZGVEYXRhLmd1aWRlSUQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5pc0VuZCA/IDAgOiBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEO1xyXG4gICAgdGhpcy5ndWlkZURhdGEuaXNFbmQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5pc0VuZDtcclxuICAgIHRoaXMuZ3VpZGVEYXRhLnJ1bm5pbmdJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyBzZXRHdWlkZVRlbXBEYXRhKGd1aWRlSUQ6IG51bWJlciwgcnVubmluZ0luZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3VpZGVEYXRhID0gbmV3IFRlbXBHdWlkZVZPO1xyXG4gICAgdGhpcy5ndWlkZURhdGEuZ3VpZGVJRCA9IGd1aWRlSUQ7XHJcbiAgICB0aGlzLmd1aWRlRGF0YS5pc0VuZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ndWlkZURhdGEucnVubmluZ0luZGV4ID0gcnVubmluZ0luZGV4O1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0Um9sZUd1aWRlRGF0YUVuZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZ3VpZGVEYXRhLmlzRW5kID0gdHJ1ZTtcclxuICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEID09IHRoaXMuZ3VpZGVEYXRhLmd1aWRlSUQpIHtcclxuICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0Um9sZUd1aWRlRGF0YUVuZCh0aGlzLmd1aWRlRGF0YS5ndWlkZUlELCB0aGlzLmd1aWRlRGF0YS5ydW5uaW5nSW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Um9sZUd1aWRlRGF0YSgpOiBJR3VpZGVEYXRhIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5ndWlkZURhdGE7XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyBhZGRSb2xlR3VpZGVSdW5uaW5nSW5kZXgoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5ndWlkZURhdGEpIHRoaXMuZ3VpZGVEYXRhLnJ1bm5pbmdJbmRleCsrO1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0QnVpbGRHdWlkZU1lcnRhcmlsKGJ1aWxkSUQ6IG51bWJlciwgaXRlbUlEOiBudW1iZXIsIGl0ZW1UeXBlOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyLCBpdGVtTnVtOiBudW1iZXIsIG5lZWROdW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YSkge1xyXG4gICAgICB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YSA9IG5ldyBHdWlkZUJ1aWxkTWV0cmFpbFZPO1xyXG4gICAgICB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YS5idWlsZElEID0gYnVpbGRJRDtcclxuICAgICAgdGhpcy5ndWlkZUJ1aWxkTWV0cmFpbERhdGEubWV0cmFpbExpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYnVpbGRJRCAhPSB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YS5idWlsZElEKSB7XHJcbiAgICAgIHRoaXMuZ3VpZGVCdWlsZE1ldHJhaWxEYXRhLmJ1aWxkSUQgPSBidWlsZElELFxyXG4gICAgICAgIHRoaXMuZ3VpZGVCdWlsZE1ldHJhaWxEYXRhLm1ldHJhaWxMaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBHdWlkZUJ1aWxkTWV0cmFpbEl0ZW0gPSBuZXcgR3VpZGVCdWlsZE1ldHJhaWxJdGVtVk87XHJcbiAgICBHdWlkZUJ1aWxkTWV0cmFpbEl0ZW0uY2VsbElEID0gY2VsbElEO1xyXG4gICAgR3VpZGVCdWlsZE1ldHJhaWxJdGVtLml0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICBHdWlkZUJ1aWxkTWV0cmFpbEl0ZW0uaXRlbUlEID0gaXRlbUlEO1xyXG4gICAgR3VpZGVCdWlsZE1ldHJhaWxJdGVtLml0ZW1OdW0gPSBpdGVtTnVtO1xyXG4gICAgR3VpZGVCdWlsZE1ldHJhaWxJdGVtLm5lZWROdW0gPSBuZWVkTnVtO1xyXG4gICAgdGhpcy5ndWlkZUJ1aWxkTWV0cmFpbERhdGEubWV0cmFpbExpc3QucHVzaChHdWlkZUJ1aWxkTWV0cmFpbEl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QnVpbGRHdWlkZU1lcnRhcmlsTnVtQnlJRChidWlsZElEOiBudW1iZXIsIGl0ZW1JRDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YSAmJiB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YS5idWlsZElEID09PSBidWlsZElEKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ndWlkZUJ1aWxkTWV0cmFpbERhdGEubWV0cmFpbExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgIGlmIChpdGVtQ29uZmlnICYmIHRoaXMuZ3VpZGVCdWlsZE1ldHJhaWxEYXRhLm1ldHJhaWxMaXN0W2ldLml0ZW1UeXBlID09PSBpdGVtQ29uZmlnLnR5cGUpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YS5tZXRyYWlsTGlzdFtpXS5pdGVtTnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyBnZXRCdWlsZEd1aWRlTWVydGFyaWxEYXRhKCk6IEd1aWRlQnVpbGRNZXRyYWlsVk8gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmd1aWRlQnVpbGRNZXRyYWlsRGF0YTtcclxuICB9XHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgc3RhdGljIGFkZExvY2tIZXJvSUQoaGVyb0lEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oZXJvTG9jay5pbmNsdWRlcyhoZXJvSUQpKSB7XHJcbiAgICAgIHRoaXMuaGVyb0xvY2sucHVzaChoZXJvSUQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5pdEFsbEhlcm9MaXN0KGlzRGVmZW5zZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBjb25zdCBoZXJvRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmhlcm9EYXRhO1xyXG4gICAgY29uc3QgaGVyb01hcDogeyBba2V5OiBudW1iZXJdOiBMb2NhbEhlcm9JdGVtIH0gPSB7fTtcclxuICAgIHRoaXMubG9jYWxIZXJvTGlzdCA9IFtdO1xyXG4gICAgY29uc3Qgc3VwZXJIZXJvRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEFsbFN1cGVySGVyb0RhdGEoKTtcclxuICAgIC8vXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBoZXJvRGF0YSkge1xyXG4gICAgICBpZiAoIVswLCAxMCwgMTEsIDEyXS5pbmNsdWRlcyhwYXJzZUludChrZXkpKSkge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGVyb0RhdGFba2V5XS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaGVyb0RhdGFba2V5XVtqXS5pdGVtSUQpO1xyXG4gICAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgbGV0IGhwID0gMDtcclxuICAgICAgICAgICAgbGV0IGlzRGVhZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZy5oZXJvX3R5cGUgPT09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHN1cGVySGVyb0RhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdXBlckhlcm9EYXRhW2tdLmNlbGxJRCA9PT0gaGVyb0RhdGFba2V5XVtqXS5jZWxsSUQgJiYgaGVyb0NvbmZpZy5oZXJvaWQgPT09IHN1cGVySGVyb0RhdGFba10uaGVyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpc0RlZmVuc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBocCA9IHN1cGVySGVyb0RhdGFba10uaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKHN1cGVySGVyb0RhdGFba10uaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRGVhZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaHAgPSBzdXBlckhlcm9EYXRhW2tdLmhwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzRGVhZCAmJiBoZXJvQ29uZmlnLnNlcXVlbmNlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFpc0RlZmVuc2UgfHwgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEhlcm9Jc0RlZmFuc2VCeUNlbGxJRChoZXJvRGF0YVtrZXldW2pdLmNlbGxJRCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvTWFwW2hlcm9Db25maWcuaGVyb2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICBoZXJvTWFwW2hlcm9Db25maWcuaGVyb2lkXS5oZXJvTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgIGhlcm9NYXBbaGVyb0NvbmZpZy5oZXJvaWRdLmNlbGxJRC5wdXNoKGhlcm9EYXRhW2tleV1bal0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgbWFwRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldE1hcGRhdGFCeUNlbGxJRChoZXJvRGF0YVtrZXldW2pdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChtYXBEYXRhICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb01hcFtoZXJvQ29uZmlnLmhlcm9pZF0uaGVyb1VJRC5wdXNoKG1hcERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9NYXBbaGVyb0NvbmZpZy5oZXJvaWRdLmhlcm9IcC5wdXNoKGhwKTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coYHRlbXBEYXRhIGdldEluaXRBbGxIZXJvTGlzdCBsaW5lMTcwIGhlcm9VSUQgPTAgIGhlcm9MaXN0W2tleV1baV0uY2VsbElEID0ke2hlcm9EYXRhW2tleV1bal0uY2VsbElEfWApO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBuZXdIZXJvOiBMb2NhbEhlcm9JdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JRDogaGVyb0NvbmZpZy5oZXJvaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0x2bDogaGVyb0NvbmZpZy5sdixcclxuICAgICAgICAgICAgICAgICAgICBoZXJvTnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJRDogW2hlcm9EYXRhW2tleV1bal0uY2VsbElEXSxcclxuICAgICAgICAgICAgICAgICAgICBoZXJvVUlEOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSHA6IFtocF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydE51bTogaGVyb0NvbmZpZy5zZXF1ZW5jZSxcclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgbWFwRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldE1hcGRhdGFCeUNlbGxJRChoZXJvRGF0YVtrZXldW2pdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChtYXBEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SGVyby5oZXJvVUlELnB1c2gobWFwRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb01hcFtoZXJvQ29uZmlnLmhlcm9pZF0gPSBuZXdIZXJvO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhgdGVtcERhdGEgZ2V0SW5pdEFsbEhlcm9MaXN0IGxpbmUxODMgaGVyb1VJRCA9MCAgaGVyb0xpc3Rba2V5XVtpXS5jZWxsSUQgPSR7aGVyb0RhdGFba2V5XVtqXS5jZWxsSUR9YCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGhlcm9NYXApIHtcclxuICAgICAgdGhpcy5sb2NhbEhlcm9MaXN0LnB1c2goaGVyb01hcFtrZXldKTtcclxuICAgIH1cclxuICAgIFV0aWxzLnNvcnRfYnlfcHJvcHModGhpcy5sb2NhbEhlcm9MaXN0LCB7IHNvcnROdW06IFwiYXNjZW5kaW5nXCIgfSk7XHJcbiAgfSAvLyBlbmQ6IGdldEluaXRBbGxIZXJvTGlzdFxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyByZW1vdmVIZXJvQnlJRChoZXJvSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxvY2FsSGVyb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubG9jYWxIZXJvTGlzdFtpXS5oZXJvSUQgPT09IGhlcm9JRCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY2FsSGVyb0xpc3RbaV0uaGVyb051bSA9PT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5sb2NhbEhlcm9MaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5sb2NhbEhlcm9MaXN0W2ldLmhlcm9OdW0tLTtcclxuICAgICAgICAgIHRoaXMubG9jYWxIZXJvTGlzdFtpXS5jZWxsSUQuc2hpZnQoKTtcclxuICAgICAgICAgIHRoaXMubG9jYWxIZXJvTGlzdFtpXS5oZXJvVUlELnNoaWZ0KCk7XHJcbiAgICAgICAgICB0aGlzLmxvY2FsSGVyb0xpc3RbaV0uaGVyb0hwLnNoaWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIHN0YXRpYyBhZGRIZXJvQnlJRChoZXJvSUQ6IG51bWJlciwgY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubG9jYWxIZXJvTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgaWYgKHRoaXMubG9jYWxIZXJvTGlzdFtpbmRleF0uaGVyb0lEID09IGhlcm9JRCkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvY2FsSGVyb0xpc3RbaW5kZXhdLmhlcm9OdW0rKztcclxuICAgICAgICB0aGlzLmxvY2FsSGVyb0xpc3RbaW5kZXhdLmNlbGxJRC5wdXNoKGluZGV4KTtcclxuICAgICAgICBjb25zdCBtYXBEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TWFwZGF0YUJ5Q2VsbElEKGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKDAgPT0gbWFwRGF0YSkge1xyXG4gICAgICAgICAgY2MubG9nKFwidGVtcERhdGEgZ2V0SW5pdEFsbEhlcm9MaXN0IGxpbmUyMjQgaGVyb1VJRCA9MCAgaGVyb0xpc3Rba2V5XVtpXS5jZWxsSUQgPVwiICsgY2VsbElEKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9jYWxIZXJvTGlzdFtpbmRleF0uaGVyb1VJRC5wdXNoKG1hcERhdGEpO1xyXG4gICAgICAgIGNvbnN0IGhlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgaWYgKGhlcm9DZmcpIHtcclxuICAgICAgICAgIGlmIChoZXJvQ2ZnLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cGVySGVybyA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFN1cGVySGVyb0RhdGEoaGVyb0NmZy5oZXJvaWQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgIGlmIChzdXBlckhlcm8pIHtcclxuICAgICAgICAgICAgICB0aGlzLmxvY2FsSGVyb0xpc3RbaW5kZXhdLmhlcm9IcC5wdXNoKHN1cGVySGVyby5ocCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxIZXJvTGlzdFtpbmRleF0uaGVyb0hwLnB1c2goaGVyb0NmZy5ocCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChoZXJvSUQpO1xyXG4gICAgICBpZiAoaGVyb0NmZykge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsSGVyb0l0ZW0gPSBuZXcgTG9jYWxIZXJvSXRlbVZPO1xyXG4gICAgICAgIGxvY2FsSGVyb0l0ZW0uaGVyb0lEID0gaGVyb0NmZy5oZXJvaWQ7XHJcbiAgICAgICAgbG9jYWxIZXJvSXRlbS5oZXJvTHZsID0gaGVyb0NmZy5sdjtcclxuICAgICAgICBsb2NhbEhlcm9JdGVtLmhlcm9OdW0gPSAxO1xyXG4gICAgICAgIGxvY2FsSGVyb0l0ZW0uY2VsbElEID0gW2NlbGxJRF07XHJcbiAgICAgICAgY29uc3QgbWFwRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldE1hcGRhdGFCeUNlbGxJRChjZWxsSUQpO1xyXG4gICAgICAgIGlmICgwICE9IG1hcERhdGEpIHtcclxuICAgICAgICAgIGxvY2FsSGVyb0l0ZW0uaGVyb1VJRCA9IFttYXBEYXRhXTtcclxuICAgICAgICAgIGlmIChoZXJvQ2ZnLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1cGVySGVybyA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFN1cGVySGVyb0RhdGEoaGVyb0NmZy5oZXJvaWQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgIGlmIChzdXBlckhlcm8pIHtcclxuICAgICAgICAgICAgICBsb2NhbEhlcm9JdGVtLmhlcm9IcCA9IFtzdXBlckhlcm8uaHBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbEhlcm9JdGVtLmhlcm9IcCA9IFtoZXJvQ2ZnLmhwXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxvY2FsSGVyb0l0ZW0uc29ydE51bSA9IGhlcm9DZmcuc2VxdWVuY2U7XHJcbiAgICAgICAgICB0aGlzLmxvY2FsSGVyb0xpc3QucHVzaChsb2NhbEhlcm9JdGVtKTtcclxuICAgICAgICAgIFV0aWxzLnNvcnRfYnlfcHJvcHModGhpcy5sb2NhbEhlcm9MaXN0LCB7XHJcbiAgICAgICAgICAgIHNvcnROdW06IFwiYXNjZW5kaW5nXCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYy5sb2coXCJ0ZW1wRGF0YSBnZXRJbml0QWxsSGVyb0xpc3QgbGluZTI1MiBoZXJvVUlEID0wICBoZXJvTGlzdFtrZXldW2ldLmNlbGxJRCA9XCIgKyBjZWxsSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gLy8gZW5kOiBhZGRIZXJvQnlJRFxyXG5cclxuICAvLyBAXHJcbiBwdWJsaWMgc3RhdGljIGdldEhlcm9MaXN0KCk6IExvY2FsSGVyb0l0ZW1bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbEhlcm9MaXN0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsSGVyb0l0ZW1WTyB7XHJcbiAgcHVibGljIGhlcm9JRDogbnVtYmVyO1xyXG4gIHB1YmxpYyBoZXJvTHZsOiBudW1iZXI7XHJcbiAgcHVibGljIGhlcm9OdW06IG51bWJlcjtcclxuICBwdWJsaWMgY2VsbElEOiBudW1iZXJbXTtcclxuICBwdWJsaWMgaGVyb1VJRDogbnVtYmVyW107XHJcbiAgcHVibGljIGhlcm9IcDogbnVtYmVyW107XHJcbiAgcHVibGljIHNvcnROdW06IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZmxpbmVJdGVtVk8geyB9XHJcblxyXG5leHBvcnQgY2xhc3MgVGVtcEd1aWRlVk8ge1xyXG4gIHB1YmxpYyBndWlkZUlEOiBudW1iZXI7XHJcbiAgcHVibGljIGlzRW5kOiBib29sZWFuO1xyXG4gIHB1YmxpYyBydW5uaW5nSW5kZXg6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR3VpZGVCdWlsZE1ldHJhaWxWTyB7XHJcbiAgcHVibGljIG1ldHJhaWxMaXN0OiBHdWlkZUJ1aWxkTWV0cmFpbEl0ZW1WT1tdO1xyXG4gIHB1YmxpYyBidWlsZElEOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHdWlkZUJ1aWxkTWV0cmFpbEl0ZW1WTyB7XHJcbiAgcHVibGljIG5lZWROdW06IG51bWJlcjtcclxuICBwdWJsaWMgaXRlbU51bTogbnVtYmVyO1xyXG4gIHB1YmxpYyBpdGVtSUQ6IG51bWJlcjtcclxuICBwdWJsaWMgaXRlbVR5cGU6IG51bWJlcjtcclxuICBwdWJsaWMgY2VsbElEOiBudW1iZXI7XHJcbn1cclxuXHJcbiJdfQ==