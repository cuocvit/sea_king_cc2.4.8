
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/HeroStarData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEhlcm9TdGFyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQW1DO0FBQ25DLDZDQUE0QztBQUU1QyxFQUFFO0FBQ0Y7SUFBa0MsZ0NBQVc7SUFNekMsSUFBSTtJQUNKO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBUkQsRUFBRTtRQUNLLG9CQUFjLEdBQTJCLEVBQUUsQ0FBQztRQUsvQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxDQUFDLGtCQUFrQjtRQUNyRCxLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzs7SUFDN0IsQ0FBQztJQUVELFFBQVE7SUFDRCxzQ0FBZSxHQUF0QixVQUEwQixRQUE0QjtRQUF0RCxpQkFTQztRQVJHLGlCQUFNLGVBQWUsWUFBQyxVQUFDLElBQU87WUFDMUIsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksUUFBUTtnQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUTtJQUNBLHVDQUFnQixHQUF4QjtRQUNJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQyxJQUFNLGNBQWMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUQsS0FBSyxJQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUU7Z0JBQzlCLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUNwRTthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNELHNDQUFlLEdBQXRCLFVBQXVCLE1BQWM7UUFDakMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRO0lBQ0Qsc0NBQWUsR0FBdEIsVUFBdUIsTUFBYztRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQU0sT0FBTyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxPQUFPLEVBQUU7WUFDbkMsT0FBTyxPQUFPLENBQUM7U0FDbEI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQsMkJBQTJCO0lBQ3BCLHVDQUFnQixHQUF2QixVQUF3QixRQUFxQjtRQUN6QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELGlCQUFNLGdCQUFnQixZQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUEzREQsSUFBSTtJQUNtQiw4QkFBaUIsR0FBVyxzQkFBc0IsQ0FBQztJQTJEOUUsbUJBQUM7Q0E3REQsQUE2REMsQ0E3RGlDLHlCQUFXLEdBNkQ1QztBQTdEWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxuaW1wb3J0IHsgU3RhckNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL3N0YXInO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5cclxuLy9cclxuZXhwb3J0IGNsYXNzIEhlcm9TdGFyRGF0YSBleHRlbmRzIFN0b3JhZ2VCYXNlIHtcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVZFTlRfREFUQV9DSEFOR0U6IHN0cmluZyA9IFwiaGVyb1N0YXJfZGF0YV9jaGFuZ2VcIjtcclxuICAgIC8vXHJcbiAgICBwdWJsaWMgaGVyb19zdGFyX2RhdGE6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU1RPUkFHRV9LRVkgPSBcIkhlcm9TdGFyRGF0YVwiOyAvLyAoZXh0ZW5kcyBzdXBlcilcclxuICAgICAgICB0aGlzLmhlcm9fc3Rhcl9kYXRhID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAhISFcclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s/OiAoZGF0YTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YSgoZGF0YTogVCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNfaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0SGVyb1N0YXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAICEhIVxyXG4gICAgcHJpdmF0ZSBpbml0SGVyb1N0YXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmhlcm9fc3Rhcl9kYXRhKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhckNvbmZpZ0xpc3QgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFN0YXJDZmdMaXN0KCk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHN0YXJDb25maWdMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhckNvbmZpZ0xpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19zdGFyX2RhdGFbcGFyc2VJbnQoa2V5KV0gPSBzdGFyQ29uZmlnTGlzdFtrZXldWzBdLnN0YXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAhISFcclxuICAgIHB1YmxpYyB1cGdyYWRlSGVyb1N0YXIoaGVyb0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5oZXJvX3N0YXJfZGF0YVtoZXJvSWRdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc3Rhcl9kYXRhW2hlcm9JZF0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAhISFcclxuICAgIHB1YmxpYyBnZXRIZXJvU3RhckRhdGEoaGVyb0lkOiBudW1iZXIpOiBTdGFyQ29uZmlnIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgaGVyb1N0YXIgPSB0aGlzLmhlcm9fc3Rhcl9kYXRhW2hlcm9JZF07XHJcbiAgICAgICAgY29uc3Qgc3RhckNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U3RhckNmZ0J5SUQoaGVyb0lkLCBoZXJvU3Rhcik7XHJcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gaGVyb1N0YXIgJiYgc3RhckNmZykge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhckNmZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAocHVibGljIG1vZGUgbm90IHVzZWQpXHJcbiAgICBwdWJsaWMgYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChIZXJvU3RhckRhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==