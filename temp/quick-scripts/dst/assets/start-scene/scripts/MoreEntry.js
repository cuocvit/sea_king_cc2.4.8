
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MoreEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72b2eHM5phDSaibn7TQ4nkO', 'MoreEntry');
// start-scene/scripts/MoreEntry.ts

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
exports.MoreEntry = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var SettingsData_1 = require("./SettingsData");
var SignData_1 = require("./SignData");
var GameManager_1 = require("./GameManager");
var SettingsEntry_1 = require("./SettingsEntry");
var SignEntry_1 = require("./SignEntry");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreEntry = /** @class */ (function (_super) {
    __extends(MoreEntry, _super);
    function MoreEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entry_btn = null;
        _this.more_btn = null;
        _this.more_red_node = null;
        _this.mail_node = null;
        _this.settings_node = null;
        _this.close_btn = null;
        _this.extend_node = null;
        _this.sign_node = null;
        return _this;
    }
    MoreEntry.prototype.onEnable = function () {
        this.extend_node.active = false;
        this.node.x = 0;
        this.node.y = 0;
        this.show_settings_entry();
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    };
    MoreEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    };
    MoreEntry.prototype.update_red_view = function () {
        var isFreeRename = GameManager_1.gm.data.server_data.free_rename == 0;
        this.more_red_node.active = isFreeRename;
    };
    MoreEntry.prototype.show_settings_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.settings_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.SETTINGS, "prefabs/settings_entry", SettingsEntry_1.SettingsEntry, function (item) {
                var _a;
                if (!item)
                    return;
                if (((_a = _this.settings_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                    _this.settings_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
    };
    MoreEntry.prototype.show_sign_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.sign_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.SIGN, "prefabs/sign_entry", SignEntry_1.SignEntry, function (item) {
                var _a;
                if (!item)
                    return;
                if (((_a = _this.sign_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                    _this.sign_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
    };
    MoreEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b;
        if (event.target == this.entry_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Ladder);
        }
        else if (event.target == ((_a = this.more_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            this.extend_node.active = !this.extend_node.active;
        }
        else if (event.target == ((_b = this.close_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            this.extend_node.active = false;
        }
    };
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "entry_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "more_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "more_red_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "mail_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "settings_node", void 0);
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "extend_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "sign_node", void 0);
    MoreEntry = __decorate([
        ccclass
    ], MoreEntry);
    return MoreEntry;
}(NodePoolItem_1.NodePoolItem));
exports.MoreEntry = MoreEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1vcmVFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLCtDQUE4QztBQUM5Qyx5Q0FBeUM7QUFDekMsK0NBQThDO0FBQzlDLHVDQUFzQztBQUN0Qyw2Q0FBbUM7QUFDbkMsaURBQWdEO0FBQ2hELHlDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQiw2QkFBWTtJQUEzQztRQUFBLHFFQStFQztRQTdFVyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUduQyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxtQkFBYSxHQUFtQixJQUFJLENBQUM7UUFHckMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHakMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxlQUFTLEdBQW1CLElBQUksQ0FBQzs7SUF3RDdDLENBQUM7SUF0RGEsNEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFB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UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDdUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDc0I7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDMkI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDMkI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDdUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDeUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDdUI7SUF2QmhDLFNBQVM7UUFEckIsT0FBTztPQUNLLFNBQVMsQ0ErRXJCO0lBQUQsZ0JBQUM7Q0EvRUQsQUErRUMsQ0EvRThCLDJCQUFZLEdBK0UxQztBQS9FWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNldHRpbmdzRGF0YSB9IGZyb20gJy4vU2V0dGluZ3NEYXRhJztcclxuaW1wb3J0IHsgU2lnbkRhdGEgfSBmcm9tICcuL1NpZ25EYXRhJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2V0dGluZ3NFbnRyeSB9IGZyb20gJy4vU2V0dGluZ3NFbnRyeSc7XHJcbmltcG9ydCB7IFNpZ25FbnRyeSB9IGZyb20gJy4vU2lnbkVudHJ5JztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTW9yZUVudHJ5IGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGVudHJ5X2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgbW9yZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtb3JlX3JlZF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1haWxfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc19ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZXh0ZW5kX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc2lnbl9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5kX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSAwO1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gMDtcclxuICAgICAgICB0aGlzLnNob3dfc2V0dGluZ3NfZW50cnkoKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oU2lnbkRhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3JlZF92aWV3LCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oU2V0dGluZ3NEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV9yZWRfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNpZ25EYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV9yZWRfdmlldywgdGhpcyk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9mZihTZXR0aW5nc0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3JlZF92aWV3LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9yZWRfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0ZyZWVSZW5hbWUgPSBnbS5kYXRhLnNlcnZlcl9kYXRhLmZyZWVfcmVuYW1lID09IDA7XHJcbiAgICAgICAgdGhpcy5tb3JlX3JlZF9ub2RlLmFjdGl2ZSA9IGlzRnJlZVJlbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfc2V0dGluZ3NfZW50cnkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Nfbm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuU0VUVElOR1MsIFwicHJlZmFicy9zZXR0aW5nc19lbnRyeVwiLCBTZXR0aW5nc0VudHJ5LCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nc19ub2RlPy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzX25vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd19zaWduX2VudHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNpZ25fbm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuU0lHTiwgXCJwcmVmYWJzL3NpZ25fZW50cnlcIiwgU2lnbkVudHJ5LCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaWduX25vZGU/LmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbl9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuZW50cnlfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5MYWRkZXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMubW9yZV9idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5leHRlbmRfbm9kZS5hY3RpdmUgPSAhdGhpcy5leHRlbmRfbm9kZS5hY3RpdmU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5leHRlbmRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=