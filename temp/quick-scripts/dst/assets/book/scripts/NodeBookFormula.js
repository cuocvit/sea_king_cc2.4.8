
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/NodeBookFormula.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '345f1UlZ3hIDbZMy1TbH0UF', 'NodeBookFormula');
// book/scripts/NodeBookFormula.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NodeBookItem_1 = require("./NodeBookItem");
var SceneBookLogic_1 = require("./SceneBookLogic");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodeBookFormula = /** @class */ (function (_super) {
    __extends(NodeBookFormula, _super);
    function NodeBookFormula() {
        var _this = _super.call(this) || this;
        _this.node_lock = null;
        _this.node_unlock = null;
        _this.icon_1 = null;
        _this.icon_2 = null;
        _this.pos_3 = null;
        _this.lab_name = null;
        _this.node_root = null;
        _this.tBookItems = [];
        _this.iItemId = 0;
        return _this;
    }
    NodeBookFormula.prototype.init = function (itemId, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var isUnlocked = this.checkIsUnlock(itemId);
        this.node_lock.active = !isUnlocked;
        this.node_unlock.active = isUnlocked;
        this.iItemId = itemId;
        this.delayShow(delay);
        if (!isUnlocked)
            return;
        var itemData = GameManager_1.gm.config.get_row_data("BookConfigData", itemId.toString());
        this.lab_name.string = itemData.name;
        Utils_1.Utils.async_set_sprite_frame(this.icon_1, Constants_1.BundleName.COMMON, "res/handbook/" + itemData.unlock_formula[0]);
        Utils_1.Utils.async_set_sprite_frame(this.icon_2, Constants_1.BundleName.COMMON, "res/handbook/" + itemData.unlock_formula[1]);
        this.loadBookItem(function (bookItem) {
            _this.pos_3.addChild(bookItem.node);
            bookItem.init(itemId);
            bookItem.node.scale = 0.6;
        });
    };
    NodeBookFormula.prototype.delayShow = function (delay) {
        cc.Tween.stopAllByTarget(this.node_root);
        if (delay <= 0) {
            this.node_root.opacity = 255;
        }
        else {
            this.node_root.opacity = 0;
            cc.tween(this.node_root).delay(delay).to(0.42, { opacity: 255 }).start();
        }
    };
    NodeBookFormula.prototype.recyleNodes = function () {
        for (var i = 0; i < this.tBookItems.length; i++) {
            var bookItem = this.tBookItems[i];
            GameManager_1.gm.pool.put(bookItem.node);
        }
        this.tBookItems = [];
    };
    NodeBookFormula.prototype.loadBookItem = function (callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.BOOK, "prefabs/book_item", NodeBookItem_1.default, function (bookItem) {
            bookItem.reset();
            _this.tBookItems.push(bookItem);
            callback(bookItem);
        });
    };
    NodeBookFormula.prototype.checkIsUnlock = function (itemId) {
        return GameManager_1.gm.data.mapCell_data.checkBookItemIsUnlock(itemId);
    };
    NodeBookFormula.prototype.editor_on_button_click_handler = function (event, customData) {
        if (customData === void 0) { customData = null; }
        var itemData = GameManager_1.gm.config.get_row_data("BookConfigData", this.iItemId.toString());
        var logic = GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK).getLogic();
        if (itemData.sub_type == SceneBookLogic_1.default.SUB_TYPE_HERO) {
            var levelList = logic.getLvList(this.iItemId);
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_HERO_DETAIL.key, levelList);
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_HERO_DETAIL);
        }
        else if (itemData.sub_type == SceneBookLogic_1.default.SUB_TYPE_HERO_WALL) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_HERO_DETAIL.key, [this.iItemId]);
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_HERO_DETAIL);
        }
        else {
            var levelList = logic.getLvList(this.iItemId);
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_ITEM_DETAIL.key, levelList);
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_ITEM_DETAIL);
        }
    };
    NodeBookFormula.prototype.reset = function () {
        cc.Tween.stopAllByTarget(this.node_root);
        this.node_root.opacity = 255;
        this.recyleNodes();
    };
    __decorate([
        property(cc.Node)
    ], NodeBookFormula.prototype, "node_lock", void 0);
    __decorate([
        property(cc.Node)
    ], NodeBookFormula.prototype, "node_unlock", void 0);
    __decorate([
        property(cc.Sprite)
    ], NodeBookFormula.prototype, "icon_1", void 0);
    __decorate([
        property(cc.Sprite)
    ], NodeBookFormula.prototype, "icon_2", void 0);
    __decorate([
        property(cc.Node)
    ], NodeBookFormula.prototype, "pos_3", void 0);
    __decorate([
        property(cc.Label)
    ], NodeBookFormula.prototype, "lab_name", void 0);
    __decorate([
        property(cc.Node)
    ], NodeBookFormula.prototype, "node_root", void 0);
    NodeBookFormula = __decorate([
        ccclass
    ], NodeBookFormula);
    return NodeBookFormula;
}(NodePoolItem_1.NodePoolItem));
exports.default = NodeBookFormula;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcTm9kZUJvb2tGb3JtdWxhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlFQUFpRTtBQUNqRSxxRUFBMkQ7QUFDM0QsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCwrQ0FBMEM7QUFDMUMsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThCLG1DQUFZO0lBeUJ0QztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQTNCTyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQU85QixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7SUFDckIsQ0FBQztJQUVNLDhCQUFJLEdBQVgsVUFBWSxNQUFjLEVBQUUsS0FBaUI7UUFBN0MsaUJBZ0JDO1FBaEIyQixzQkFBQSxFQUFBLFNBQWlCO1FBQ3pDLElBQU0sVUFBVSxHQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsSUFB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LENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFFTSwrQkFBSyxHQUFaO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQW5HRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNrQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ2dCO0lBcEJoQyxlQUFlO1FBRHBCLE9BQU87T0FDRixlQUFlLENBdUdwQjtJQUFELHNCQUFDO0NBdkdELEFBdUdDLENBdkc2QiwyQkFBWSxHQXVHekM7QUFFRCxrQkFBZSxlQUFlLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29rQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvYm9va3MnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCBOb2RlQm9va0l0ZW0gZnJvbSAnLi9Ob2RlQm9va0l0ZW0nO1xyXG5pbXBvcnQgU2NlbmVCb29rTG9naWMgZnJvbSAnLi9TY2VuZUJvb2tMb2dpYyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTm9kZUJvb2tGb3JtdWxhIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub2RlX2xvY2s6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub2RlX3VubG9jazogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaWNvbl8xOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGljb25fMjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcG9zXzM6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGFiX25hbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbm9kZV9yb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRCb29rSXRlbXM6IE5vZGVCb29rSXRlbVtdO1xyXG4gICAgcHJpdmF0ZSBpSXRlbUlkOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudEJvb2tJdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaUl0ZW1JZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoaXRlbUlkOiBudW1iZXIsIGRlbGF5OiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNVbmxvY2tlZDogYm9vbGVhbiA9IHRoaXMuY2hlY2tJc1VubG9jayhpdGVtSWQpO1xyXG4gICAgICAgIHRoaXMubm9kZV9sb2NrLmFjdGl2ZSA9ICFpc1VubG9ja2VkO1xyXG4gICAgICAgIHRoaXMubm9kZV91bmxvY2suYWN0aXZlID0gaXNVbmxvY2tlZDtcclxuICAgICAgICB0aGlzLmlJdGVtSWQgPSBpdGVtSWQ7XHJcbiAgICAgICAgdGhpcy5kZWxheVNob3coZGVsYXkpO1xyXG4gICAgICAgIGlmICghaXNVbmxvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJvb2tDb25maWdEYXRhXCIsIGl0ZW1JZC50b1N0cmluZygpKSBhcyBCb29rQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubGFiX25hbWUuc3RyaW5nID0gaXRlbURhdGEubmFtZTtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaWNvbl8xLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBpdGVtRGF0YS51bmxvY2tfZm9ybXVsYVswXSk7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fMiwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgaXRlbURhdGEudW5sb2NrX2Zvcm11bGFbMV0pO1xyXG4gICAgICAgIHRoaXMubG9hZEJvb2tJdGVtKChib29rSXRlbTogTm9kZUJvb2tJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zXzMuYWRkQ2hpbGQoYm9va0l0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgIGJvb2tJdGVtLmluaXQoaXRlbUlkKTtcclxuICAgICAgICAgICAgYm9va0l0ZW0ubm9kZS5zY2FsZSA9IDAuNjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGF5U2hvdyhkZWxheTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMubm9kZV9yb290KTtcclxuICAgICAgICBpZiAoZGVsYXkgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfcm9vdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9yb290Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfcm9vdCkuZGVsYXkoZGVsYXkpLnRvKDAuNDIsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjeWxlTm9kZXMoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRCb29rSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYm9va0l0ZW0gPSB0aGlzLnRCb29rSXRlbXNbaV07XHJcbiAgICAgICAgICAgIGdtLnBvb2wucHV0KGJvb2tJdGVtLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRCb29rSXRlbXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRCb29rSXRlbShjYWxsYmFjazogKGJvb2tJdGVtOiBOb2RlQm9va0l0ZW0pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkJPT0ssIFwicHJlZmFicy9ib29rX2l0ZW1cIiwgTm9kZUJvb2tJdGVtLCAoYm9va0l0ZW0pID0+IHtcclxuICAgICAgICAgICAgYm9va0l0ZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgdGhpcy50Qm9va0l0ZW1zLnB1c2goYm9va0l0ZW0pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhib29rSXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0lzVW5sb2NrKGl0ZW1JZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmNoZWNrQm9va0l0ZW1Jc1VubG9jayhpdGVtSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LCBjdXN0b21EYXRhID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJvb2tDb25maWdEYXRhXCIsIHRoaXMuaUl0ZW1JZC50b1N0cmluZygpKSBhcyBCb29rQ29uZmlnO1xyXG4gICAgICAgIGNvbnN0IGxvZ2ljID0gZ20udWkuZ2V0X21vZHVsZShnbS5jb25zdC5CT09LKS5nZXRMb2dpYygpO1xyXG5cclxuICAgICAgICBpZiAoaXRlbURhdGEuc3ViX3R5cGUgPT0gU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVSTykge1xyXG4gICAgICAgICAgICBjb25zdCBsZXZlbExpc3QgPSBsb2dpYy5nZXRMdkxpc3QodGhpcy5pSXRlbUlkKTtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwua2V5LCBsZXZlbExpc3QpO1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbURhdGEuc3ViX3R5cGUgPT0gU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVST19XQUxMKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5CT09LX0hFUk9fREVUQUlMLmtleSwgW3RoaXMuaUl0ZW1JZF0pO1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsTGlzdCA9IGxvZ2ljLmdldEx2TGlzdCh0aGlzLmlJdGVtSWQpO1xyXG4gICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuQk9PS19JVEVNX0RFVEFJTC5rZXksIGxldmVsTGlzdCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQk9PS19JVEVNX0RFVEFJTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlX3Jvb3QpO1xyXG4gICAgICAgIHRoaXMubm9kZV9yb290Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5yZWN5bGVOb2RlcygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTm9kZUJvb2tGb3JtdWxhOyJdfQ==