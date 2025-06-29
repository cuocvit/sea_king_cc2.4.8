"use strict";
cc._RF.push(module, 'ac8d3BMEbpLQbDrrEFQDSMJ', 'SceneBookView');
// book/scripts/SceneBookView.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodeBookFormula_1 = require("./NodeBookFormula");
var NodeBookItem_1 = require("./NodeBookItem");
var SceneBookLogic_1 = require("./SceneBookLogic");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneBookView = /** @class */ (function (_super) {
    __extends(SceneBookView, _super);
    function SceneBookView() {
        var _this = _super.call(this) || this;
        _this.pLogic = new SceneBookLogic_1.default();
        _this.node_tabs = null;
        _this.panel_hero = null;
        _this.panel_item = null;
        _this.panel_decorate = null;
        _this.panel_formula = null;
        _this.list_super_heros = null;
        _this.list_heros = null;
        _this.list_defends = null;
        _this.list_Walls = null;
        _this.list_normals = null;
        _this.list_specials = null;
        _this.list_ress = null;
        _this.list_decorates = null;
        _this.list_lvs = [];
        _this.tBookItems = [];
        _this.tBookFormulas = [];
        _this.tTabPanels = null;
        _this.iFormulaListBeginCd = 0;
        _this.sceneBindLogic(_this, _this.pLogic);
        return _this;
    }
    SceneBookView.prototype.onLoad = function () { };
    SceneBookView.prototype.onEnable = function () {
        this.tTabPanels = {
            btn_hero: this.panel_hero,
            btn_item: this.panel_item,
            btn_decorate: this.panel_decorate,
            btn_formula: this.panel_formula,
        };
    };
    SceneBookView.prototype.getLogic = function () {
        return this.pLogic;
    };
    SceneBookView.prototype.showTabPanel = function (tab) {
        if (this.tTabPanels == null) {
            this.tTabPanels = {
                btn_hero: this.panel_hero,
                btn_item: this.panel_item,
                btn_decorate: this.panel_decorate,
                btn_formula: this.panel_formula,
            };
        }
        for (var key in this.tTabPanels) {
            this.tTabPanels[key].active = key == tab;
        }
    };
    SceneBookView.prototype.onDisable = function () { };
    SceneBookView.prototype.refreshSelectTabBtn = function (tab) {
        var children = this.node_tabs.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            child.active = child.name.endsWith('_active') ? tab + "_active" == child.name : tab !== child.name;
        }
    };
    SceneBookView.prototype.refreshRed = function (prefix, active) {
        var children = this.node_tabs.children;
        var count = 0;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.name.startsWith(prefix)) {
                child.getChildByName('red').active = active;
                if (++count >= 2)
                    break;
            }
        }
    };
    SceneBookView.prototype.initDefendList = function (items) {
        this.addBookItemsToList(items, this.list_defends);
    };
    SceneBookView.prototype.initSuperHeroList = function (items) {
        this.addBookItemsToList(items, this.list_super_heros);
    };
    SceneBookView.prototype.initHeroList = function (items) {
        this.addBookItemsToList(items, this.list_heros);
    };
    SceneBookView.prototype.initWallList = function (items) {
        this.addBookItemsToList(items, this.list_Walls);
    };
    SceneBookView.prototype.initNormalList = function (items) {
        this.addBookItemsToList(items, this.list_normals);
    };
    SceneBookView.prototype.initSpecialList = function (items) {
        this.addBookItemsToList(items, this.list_specials);
    };
    SceneBookView.prototype.initResList = function (items) {
        this.addBookItemsToList(items, this.list_ress);
    };
    SceneBookView.prototype.initDecorateList = function (items) {
        this.addBookItemsToList(items, this.list_decorates);
    };
    SceneBookView.prototype.addBookItemsToList = function (items, list) {
        var _this = this;
        var formattedList = this.formatList(items);
        var _loop_1 = function (index) {
            this_1.loadBookItem(function (item) {
                item.node.zIndex = index;
                list.addChild(item.node);
                _this.tBookItems.push(item);
                item.reset();
                item.init(formattedList[index], true);
            });
        };
        var this_1 = this;
        for (var index = 0; index < formattedList.length; index++) {
            _loop_1(index);
        }
    };
    SceneBookView.prototype.initFormulaList = function (formulas) {
        var _this = this;
        this.iFormulaListBeginCd = 0;
        var _loop_2 = function (i) {
            var levelNode = this_2.list_lvs[i];
            var formulaItems = formulas[i];
            if (formulaItems != null) {
                var _loop_3 = function (j) {
                    var formula = formulaItems[j];
                    this_2.loadFormulaItem(function (item) {
                        levelNode.addChild(item.node);
                        _this.iFormulaListBeginCd += 0.1;
                        item.init(formula, _this.iFormulaListBeginCd);
                    });
                };
                for (var j = 0; j < formulaItems.length; j++) {
                    _loop_3(j);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.list_lvs.length; i++) {
            _loop_2(i);
        }
    };
    SceneBookView.prototype.formatList = function (items) {
        var length = items.length;
        if (length % 3 <= 0) {
            return items;
        }
        var formatted = [];
        for (var index = 0; index < items.length; index++) {
            formatted.push(items[index]);
        }
        var toAdd = 3 - length % 3;
        for (var index = 0; index < toAdd; index++) {
            formatted.push(0);
        }
        return formatted;
    };
    SceneBookView.prototype.loadBookItem = function (callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.BOOK, 'prefabs/book_item', NodeBookItem_1.default, function (item) {
            item.reset();
            _this.tBookItems.push(item);
            callback(item);
        });
    };
    SceneBookView.prototype.loadFormulaItem = function (callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.BOOK, 'prefabs/book_formula', NodeBookFormula_1.default, function (item) {
            item.reset();
            _this.tBookFormulas.push(item);
            callback(item);
        });
    };
    SceneBookView.prototype.recyleBookItems = function () {
        for (var i = 0; i < this.tBookItems.length; i++) {
            this.tBookItems[i].reset();
            GameManager_1.gm.pool.put(this.tBookItems[i].node);
        }
        this.tBookItems = [];
        for (var i = 0; i < this.tBookFormulas.length; i++) {
            this.tBookFormulas[i].reset();
            GameManager_1.gm.pool.put(this.tBookFormulas[i].node);
        }
        this.tBookFormulas = [];
    };
    SceneBookView.prototype.editor_on_button_click_handler = function (event, data) {
        var targetName = event.target.name;
        this.pLogic.onBtnClick(targetName, data === undefined ? null : data);
    };
    SceneBookView.prototype.sceneBindLogic = function (instance, logic) {
        var bindMethod = function (methodName) {
            var originalMethod = instance[methodName];
            if (null != originalMethod) {
                instance[methodName] = function (t) {
                    if (null != logic[methodName]) {
                        logic[methodName].apply(logic, [t]);
                    }
                    originalMethod.apply(instance, [t]);
                };
            }
        };
        logic.setView(instance);
        bindMethod("onLoad");
        bindMethod("onEnable");
        bindMethod("onDisable");
    };
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "node_tabs", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "panel_hero", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "panel_item", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "panel_decorate", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "panel_formula", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_super_heros", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_heros", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_defends", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_Walls", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_normals", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_specials", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_ress", void 0);
    __decorate([
        property(cc.Node)
    ], SceneBookView.prototype, "list_decorates", void 0);
    __decorate([
        property([cc.Node])
    ], SceneBookView.prototype, "list_lvs", void 0);
    SceneBookView = __decorate([
        ccclass
    ], SceneBookView);
    return SceneBookView;
}(GameModule_1.GameModule));
exports.default = SceneBookView;

cc._RF.pop();