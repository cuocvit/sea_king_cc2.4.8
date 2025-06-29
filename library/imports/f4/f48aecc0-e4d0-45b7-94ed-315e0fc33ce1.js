"use strict";
cc._RF.push(module, 'f48aezA5NBFt5TtMV4Pwzzh', 'HeroStarData');
// start-scene/scripts/HeroStarData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroStarData = void 0;
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
//
var HeroStarData = /** @class */ (function (_super) {
    __extends(HeroStarData, _super);
    // @
    function HeroStarData() {
        var _this = _super.call(this) || this;
        //
        _this.hero_star_data = {};
        _this.STORAGE_KEY = "HeroStarData"; // (extends super)
        _this.hero_star_data = {};
        return _this;
    }
    // @ !!!
    HeroStarData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.initHeroStarData();
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @ !!!
    HeroStarData.prototype.initHeroStarData = function () {
        if (Object.keys(this.hero_star_data).length === 0) {
            var starConfigList = GameManager_1.gm.data.config_data.getStarCfgList();
            for (var key in starConfigList) {
                if (starConfigList.hasOwnProperty(key)) {
                    this.hero_star_data[parseInt(key)] = starConfigList[key][0].star;
                }
            }
        }
    };
    // @ !!!
    HeroStarData.prototype.upgradeHeroStar = function (heroId) {
        if (this.hero_star_data[heroId] != undefined) {
            this.hero_star_data[heroId] += 1;
        }
        this.async_write_data();
    };
    // @ !!!
    HeroStarData.prototype.getHeroStarData = function (heroId) {
        var heroStar = this.hero_star_data[heroId];
        var starCfg = GameManager_1.gm.data.config_data.getStarCfgByID(heroId, heroStar);
        if (undefined !== heroStar && starCfg) {
            return starCfg;
        }
        else {
            return null;
        }
    };
    // @ (public mode not used)
    HeroStarData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(HeroStarData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    HeroStarData.EVENT_DATA_CHANGE = "heroStar_data_change";
    return HeroStarData;
}(StorageBase_1.StorageBase));
exports.HeroStarData = HeroStarData;

cc._RF.pop();