"use strict";
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