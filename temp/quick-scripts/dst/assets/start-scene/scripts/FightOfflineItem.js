
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FightOfflineItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30b28gQFndLy6SUApAArX6r', 'FightOfflineItem');
// start-scene/scripts/FightOfflineItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightOfflineItem = void 0;
// +-+
var ListViewItem_1 = require("./ListViewItem");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightOfflineItem = /** @class */ (function (_super) {
    __extends(FightOfflineItem, _super);
    function FightOfflineItem() {
        var _this = _super.call(this) || this;
        _this.heroColorSpr = null;
        _this.heroSpr = null;
        _this.HeroNumLbl = null;
        _this.heroLvlSpr = null;
        _this.isSuperHero = null;
        return _this;
    }
    Object.defineProperty(FightOfflineItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    FightOfflineItem.prototype.update_view = function () {
        this.isSuperHero.active = false;
        this.heroLvlSpr.spriteFrame = null;
        if (this._data.itemID > 30000) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this._data.itemID);
            if (!heroConfig)
                return;
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.itemID);
            Utils_1.Utils.async_set_sprite_frame(this.heroLvlSpr, Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
            this.isSuperHero.active = heroConfig && heroConfig.hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE;
            this.HeroNumLbl.string = this._data.heroNum.toString();
        }
        else {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this._data.itemID);
            if (!itemConfig)
                return;
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + itemConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.itemID);
        }
        this.HeroNumLbl.string = "x" + this.data.heroNum;
    };
    FightOfflineItem.prototype.reset = function () {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
        this.HeroNumLbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroColorSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroSpr", void 0);
    __decorate([
        property(cc.Label)
    ], FightOfflineItem.prototype, "HeroNumLbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightOfflineItem.prototype, "heroLvlSpr", void 0);
    __decorate([
        property(cc.Node)
    ], FightOfflineItem.prototype, "isSuperHero", void 0);
    FightOfflineItem = __decorate([
        ccclass
    ], FightOfflineItem);
    return FightOfflineItem;
}(ListViewItem_1.ListViewItem));
exports.FightOfflineItem = FightOfflineItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpZ2h0T2ZmbGluZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDOUMsaUNBQWdDO0FBQ2hDLHlDQUF1RDtBQUN2RCw2Q0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFRNUM7SUFBK0Isb0NBQVk7SUFnQnZDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaEJPLGtCQUFZLEdBQXFCLElBQUksQ0FBQztRQUd0QyxhQUFPLEdBQXFCLElBQUksQ0FBQztRQUdqQyxnQkFBVSxHQUFvQixJQUFJLENBQUM7UUFHbkMsZ0JBQVUsR0FBcUIsSUFBSSxDQUFDO1FBR3BDLGlCQUFXLEdBQW1CLElBQUksQ0FBQzs7SUFJM0MsQ0FBQztJQUVGLHNCQUFXLGtDQUFJO2FBQWY7WUFDSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLEtBQWU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT00sc0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO1lBQzNCLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPO1lBRXhCLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGVBQWEsVUFBVSxDQUFDLEVBQUksQ0FBQyxDQUFDO1lBQ2pHLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGtCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQVEsQ0FBQyxDQUFDO1lBQ25HLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHNCQUFVLENBQUMsR0FBRyxFQUFFLHVCQUFxQixVQUFVLENBQUMsRUFBSSxDQUFDLENBQUM7WUFFcEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxTQUFTLEtBQUssd0JBQVksQ0FBQyxlQUFlLENBQUM7WUFDOUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUQ7YUFBTTtZQUNILElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPO1lBRXhCLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGVBQWEsVUFBVSxDQUFDLEVBQUksQ0FBQyxDQUFDO1lBQ2pHLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGtCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQVEsQ0FBQyxDQUFDO1NBQ3RHO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sZ0NBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUF4REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswREFDMEI7SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDcUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDd0I7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDd0I7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDeUI7SUFkekMsZ0JBQWdCO1FBRHJCLE9BQU87T0FDRixnQkFBZ0IsQ0EyRHJCO0lBQUQsdUJBQUM7Q0EzREQsQUEyREMsQ0EzRDhCLDJCQUFZLEdBMkQxQztBQUVRLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW0gfSBmcm9tICcuL0xpc3RWaWV3SXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUsIEhlcm9UeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5pbnRlcmZhY2UgVHlwZURhdGEge1xyXG4gICAgaXRlbUlEOiBudW1iZXI7XHJcbiAgICBoZXJvTnVtOiBudW1iZXI7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0T2ZmbGluZUl0ZW0gZXh0ZW5kcyBMaXN0Vmlld0l0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb0NvbG9yU3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvU3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIEhlcm9OdW1MYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb0x2bFNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGlzU3VwZXJIZXJvOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgIHB1YmxpYyBnZXQgZGF0YSgpOiBUeXBlRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBUeXBlRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNTdXBlckhlcm8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oZXJvTHZsU3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEuaXRlbUlEID4gMzAwMDApIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5fZGF0YS5pdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm9Db25maWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvQ29sb3JTcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBgcmVzL2NvbG9yXyR7aGVyb0NvbmZpZy5sdn1gKTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9TcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBgcmVzL2hhbmRib29rLyR7dGhpcy5fZGF0YS5pdGVtSUR9YCk7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvTHZsU3ByLCBCdW5kbGVOYW1lLk1BUCwgYHJlcy9oZXJvL2hlcm9QaG90byR7aGVyb0NvbmZpZy5sdn1gKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNTdXBlckhlcm8uYWN0aXZlID0gaGVyb0NvbmZpZyAmJiBoZXJvQ29uZmlnLmhlcm9fdHlwZSA9PT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRTtcclxuICAgICAgICAgICAgdGhpcy5IZXJvTnVtTGJsLnN0cmluZyA9IHRoaXMuX2RhdGEuaGVyb051bS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuX2RhdGEuaXRlbUlEKTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtQ29uZmlnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb0NvbG9yU3ByLCBCdW5kbGVOYW1lLkNPTU1PTiwgYHJlcy9jb2xvcl8ke2l0ZW1Db25maWcubHZ9YCk7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvU3ByLCBCdW5kbGVOYW1lLkNPTU1PTiwgYHJlcy9oYW5kYm9vay8ke3RoaXMuX2RhdGEuaXRlbUlEfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5IZXJvTnVtTGJsLnN0cmluZyA9IGB4JHt0aGlzLmRhdGEuaGVyb051bX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9TcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVyb0x2bFNwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5IZXJvTnVtTGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEZpZ2h0T2ZmbGluZUl0ZW0gfSJdfQ==