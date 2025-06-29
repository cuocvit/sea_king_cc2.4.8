
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/SceneBookView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcU2NlbmVCb29rVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBa0U7QUFDbEUsaUVBQWlFO0FBQ2pFLHFFQUEyRDtBQUMzRCxxREFBZ0Q7QUFDaEQsK0NBQTBDO0FBQzFDLG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBVTtJQWtEakQ7UUFBQSxZQUNJLGlCQUFPLFNBcUJWO1FBcEJHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx3QkFBYyxFQUFFLENBQUM7UUFDbkMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFDM0MsQ0FBQztJQUVTLDhCQUFNLEdBQWhCLGNBQTJCLENBQUM7SUFFbEIsZ0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUM7SUFDTixDQUFDO0lBRU0sZ0NBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0JBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhO2FBQ2xDLENBQUM7U0FDTDtRQUNELEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVTLGlDQUFTLEdBQW5CLGNBQThCLENBQUM7SUFFeEIsMkNBQW1CLEdBQTFCLFVBQTJCLEdBQVc7UUFDbEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFJLEdBQUcsWUFBUyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ3RHO0lBQ0wsQ0FBQztJQUVNLGtDQUFVLEdBQWpCLFVBQWtCLE1BQWMsRUFBRSxNQUFlO1FBQzdDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQzVDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQztvQkFBRSxNQUFNO2FBQzNCO1NBQ0o7SUFDTCxDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsS0FBZTtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0seUNBQWlCLEdBQXhCLFVBQXlCLEtBQWU7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsS0FBZTtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsS0FBZTtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsS0FBZTtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sdUNBQWUsR0FBdEIsVUFBdUIsS0FBZTtRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sbUNBQVcsR0FBbEIsVUFBbUIsS0FBZTtRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCLFVBQXdCLEtBQWU7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLDBDQUFrQixHQUExQixVQUEyQixLQUFlLEVBQUUsSUFBYTtRQUF6RCxpQkFXQztRQVZHLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3BDLEtBQUs7WUFDVixPQUFLLFlBQVksQ0FBQyxVQUFDLElBQUk7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7OztRQVBQLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFBaEQsS0FBSztTQVFiO0lBQ0wsQ0FBQztJQUVNLHVDQUFlLEdBQXRCLFVBQXVCLFFBQWtDO1FBQXpELGlCQWdCQztRQWZHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7Z0NBQ3BCLENBQUM7WUFDTixJQUFNLFNBQVMsR0FBRyxPQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO3dDQUNiLENBQUM7b0JBQ04sSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxPQUFLLGVBQWUsQ0FBQyxVQUFDLElBQUk7d0JBQ3RCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM5QixLQUFJLENBQUMsbUJBQW1CLElBQUksR0FBRyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDakQsQ0FBQyxDQUFDLENBQUM7O2dCQU5QLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTs0QkFBbkMsQ0FBQztpQkFPVDthQUNKOzs7UUFaTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO29CQUFwQyxDQUFDO1NBYVQ7SUFDTCxDQUFDO0lBRU8sa0NBQVUsR0FBbEIsVUFBbUIsS0FBZTtRQUM5QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7UUFDL0IsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUVELElBQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxvQ0FBWSxHQUFwQixVQUFxQixRQUFzQztRQUEzRCxpQkFNQztRQUxHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxzQkFBWSxFQUFFLFVBQUMsSUFBSTtZQUN2RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sdUNBQWUsR0FBdkIsVUFBd0IsUUFBeUM7UUFBakUsaUJBTUM7UUFMRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQVUsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUseUJBQWUsRUFBRSxVQUFDLElBQUk7WUFDN0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHVDQUFlLEdBQXRCO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QixnQkFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxzREFBOEIsR0FBdEMsVUFBdUMsS0FBZSxFQUFFLElBQWM7UUFDbEUsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLHNDQUFjLEdBQXRCLFVBQXVCLFFBQXVCLEVBQUUsS0FBcUI7UUFDakUsSUFBTSxVQUFVLEdBQUcsVUFBQyxVQUFrQjtZQUNsQyxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsSUFBSSxJQUFJLElBQUksY0FBYyxFQUFFO2dCQUN4QixRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBQyxDQUFDO29CQUNyQixJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQzNCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkM7b0JBQ0QsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUM7YUFDTDtRQUNMLENBQUMsQ0FBQTtRQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QixVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQTlQRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNxQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNvQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUN1QjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNtQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNtQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNvQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNxQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzttREFDUTtJQXpDWCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBaVFqQztJQUFELG9CQUFDO0NBalFELEFBaVFDLENBalEwQyx1QkFBVSxHQWlRcEQ7a0JBalFvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCBOb2RlQm9va0Zvcm11bGEgZnJvbSAnLi9Ob2RlQm9va0Zvcm11bGEnO1xyXG5pbXBvcnQgTm9kZUJvb2tJdGVtIGZyb20gJy4vTm9kZUJvb2tJdGVtJztcclxuaW1wb3J0IFNjZW5lQm9va0xvZ2ljIGZyb20gJy4vU2NlbmVCb29rTG9naWMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lQm9va1ZpZXcgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub2RlX3RhYnM6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBwYW5lbF9oZXJvOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcGFuZWxfaXRlbTogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHBhbmVsX2RlY29yYXRlOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcGFuZWxfZm9ybXVsYTogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxpc3Rfc3VwZXJfaGVyb3M6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsaXN0X2hlcm9zOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbGlzdF9kZWZlbmRzOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbGlzdF9XYWxsczogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxpc3Rfbm9ybWFsczogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxpc3Rfc3BlY2lhbHM6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsaXN0X3Jlc3M6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsaXN0X2RlY29yYXRlczogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgbGlzdF9sdnM6IGNjLk5vZGVbXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0Qm9va0l0ZW1zOiBOb2RlQm9va0l0ZW1bXTtcclxuICAgIHByaXZhdGUgdEJvb2tGb3JtdWxhczogTm9kZUJvb2tGb3JtdWxhW107XHJcbiAgICBwcml2YXRlIHRUYWJQYW5lbHM6IHsgW2tleTogc3RyaW5nXTogY2MuTm9kZSB8IG51bGwgfSB8IG51bGw7XHJcbiAgICBwcml2YXRlIGlGb3JtdWxhTGlzdEJlZ2luQ2Q6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcExvZ2ljOiBTY2VuZUJvb2tMb2dpYztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucExvZ2ljID0gbmV3IFNjZW5lQm9va0xvZ2ljKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3RhYnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGFuZWxfaGVybyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYW5lbF9pdGVtID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhbmVsX2RlY29yYXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhbmVsX2Zvcm11bGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGlzdF9zdXBlcl9oZXJvcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5saXN0X2hlcm9zID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxpc3RfZGVmZW5kcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5saXN0X1dhbGxzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxpc3Rfbm9ybWFscyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5saXN0X3NwZWNpYWxzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxpc3RfcmVzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5saXN0X2RlY29yYXRlcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5saXN0X2x2cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudEJvb2tJdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudEJvb2tGb3JtdWxhcyA9IFtdO1xyXG4gICAgICAgIHRoaXMudFRhYlBhbmVscyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pRm9ybXVsYUxpc3RCZWdpbkNkID0gMDtcclxuICAgICAgICB0aGlzLnNjZW5lQmluZExvZ2ljKHRoaXMsIHRoaXMucExvZ2ljKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudFRhYlBhbmVscyA9IHtcclxuICAgICAgICAgICAgYnRuX2hlcm86IHRoaXMucGFuZWxfaGVybyxcclxuICAgICAgICAgICAgYnRuX2l0ZW06IHRoaXMucGFuZWxfaXRlbSxcclxuICAgICAgICAgICAgYnRuX2RlY29yYXRlOiB0aGlzLnBhbmVsX2RlY29yYXRlLFxyXG4gICAgICAgICAgICBidG5fZm9ybXVsYTogdGhpcy5wYW5lbF9mb3JtdWxhLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExvZ2ljKCk6IFNjZW5lQm9va0xvZ2ljIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wTG9naWM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dUYWJQYW5lbCh0YWI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRUYWJQYW5lbHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRUYWJQYW5lbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBidG5faGVybzogdGhpcy5wYW5lbF9oZXJvLFxyXG4gICAgICAgICAgICAgICAgYnRuX2l0ZW06IHRoaXMucGFuZWxfaXRlbSxcclxuICAgICAgICAgICAgICAgIGJ0bl9kZWNvcmF0ZTogdGhpcy5wYW5lbF9kZWNvcmF0ZSxcclxuICAgICAgICAgICAgICAgIGJ0bl9mb3JtdWxhOiB0aGlzLnBhbmVsX2Zvcm11bGEsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMudFRhYlBhbmVscykge1xyXG4gICAgICAgICAgICB0aGlzLnRUYWJQYW5lbHNba2V5XS5hY3RpdmUgPSBrZXkgPT0gdGFiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hTZWxlY3RUYWJCdG4odGFiOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMubm9kZV90YWJzLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gY2hpbGQubmFtZS5lbmRzV2l0aCgnX2FjdGl2ZScpID8gYCR7dGFifV9hY3RpdmVgID09IGNoaWxkLm5hbWUgOiB0YWIgIT09IGNoaWxkLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWZyZXNoUmVkKHByZWZpeDogc3RyaW5nLCBhY3RpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMubm9kZV90YWJzLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubmFtZS5zdGFydHNXaXRoKHByZWZpeCkpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgICAgICAgICBpZiAoKytjb3VudCA+PSAyKSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdERlZmVuZExpc3QoaXRlbXM6IG51bWJlcltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRCb29rSXRlbXNUb0xpc3QoaXRlbXMsIHRoaXMubGlzdF9kZWZlbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdFN1cGVySGVyb0xpc3QoaXRlbXM6IG51bWJlcltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRCb29rSXRlbXNUb0xpc3QoaXRlbXMsIHRoaXMubGlzdF9zdXBlcl9oZXJvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRIZXJvTGlzdChpdGVtczogbnVtYmVyW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZEJvb2tJdGVtc1RvTGlzdChpdGVtcywgdGhpcy5saXN0X2hlcm9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdFdhbGxMaXN0KGl0ZW1zOiBudW1iZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkQm9va0l0ZW1zVG9MaXN0KGl0ZW1zLCB0aGlzLmxpc3RfV2FsbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0Tm9ybWFsTGlzdChpdGVtczogbnVtYmVyW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZEJvb2tJdGVtc1RvTGlzdChpdGVtcywgdGhpcy5saXN0X25vcm1hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0U3BlY2lhbExpc3QoaXRlbXM6IG51bWJlcltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRCb29rSXRlbXNUb0xpc3QoaXRlbXMsIHRoaXMubGlzdF9zcGVjaWFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRSZXNMaXN0KGl0ZW1zOiBudW1iZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkQm9va0l0ZW1zVG9MaXN0KGl0ZW1zLCB0aGlzLmxpc3RfcmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXREZWNvcmF0ZUxpc3QoaXRlbXM6IG51bWJlcltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRCb29rSXRlbXNUb0xpc3QoaXRlbXMsIHRoaXMubGlzdF9kZWNvcmF0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQm9va0l0ZW1zVG9MaXN0KGl0ZW1zOiBudW1iZXJbXSwgbGlzdDogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZExpc3QgPSB0aGlzLmZvcm1hdExpc3QoaXRlbXMpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmb3JtYXR0ZWRMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRCb29rSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLnpJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbGlzdC5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50Qm9va0l0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmluaXQoZm9ybWF0dGVkTGlzdFtpbmRleF0sIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRGb3JtdWxhTGlzdChmb3JtdWxhczogUmVjb3JkPHN0cmluZywgbnVtYmVyW10+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pRm9ybXVsYUxpc3RCZWdpbkNkID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdF9sdnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxOb2RlID0gdGhpcy5saXN0X2x2c1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybXVsYUl0ZW1zID0gZm9ybXVsYXNbaV07XHJcbiAgICAgICAgICAgIGlmIChmb3JtdWxhSXRlbXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb3JtdWxhSXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtdWxhID0gZm9ybXVsYUl0ZW1zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEZvcm11bGFJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsTm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlGb3JtdWxhTGlzdEJlZ2luQ2QgKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmluaXQoZm9ybXVsYSwgdGhpcy5pRm9ybXVsYUxpc3RCZWdpbkNkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvcm1hdExpc3QoaXRlbXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoICUgMyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZC5wdXNoKGl0ZW1zW2luZGV4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b0FkZCA9IDMgLSBsZW5ndGggJSAzO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0b0FkZDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBmb3JtYXR0ZWQucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRCb29rSXRlbShjYWxsYmFjazogKGl0ZW06IE5vZGVCb29rSXRlbSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQk9PSywgJ3ByZWZhYnMvYm9va19pdGVtJywgTm9kZUJvb2tJdGVtLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudEJvb2tJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRGb3JtdWxhSXRlbShjYWxsYmFjazogKGl0ZW06IE5vZGVCb29rRm9ybXVsYSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQk9PSywgJ3ByZWZhYnMvYm9va19mb3JtdWxhJywgTm9kZUJvb2tGb3JtdWxhLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudEJvb2tGb3JtdWxhcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjeWxlQm9va0l0ZW1zKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50Qm9va0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvb2tJdGVtc1tpXS5yZXNldCgpO1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLnRCb29rSXRlbXNbaV0ubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudEJvb2tJdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50Qm9va0Zvcm11bGFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvb2tGb3JtdWxhc1tpXS5yZXNldCgpO1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLnRCb29rRm9ybXVsYXNbaV0ubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudEJvb2tGb3JtdWxhcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCwgZGF0YTogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YXJnZXROYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgdGhpcy5wTG9naWMub25CdG5DbGljayh0YXJnZXROYW1lLCBkYXRhID09PSB1bmRlZmluZWQgPyBudWxsIDogZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzY2VuZUJpbmRMb2dpYyhpbnN0YW5jZTogU2NlbmVCb29rVmlldywgbG9naWM6IFNjZW5lQm9va0xvZ2ljKTogdm9pZCB7IFxyXG4gICAgICAgIGNvbnN0IGJpbmRNZXRob2QgPSAobWV0aG9kTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gaW5zdGFuY2VbbWV0aG9kTmFtZV07XHJcbiAgICAgICAgICAgIGlmIChudWxsICE9IG9yaWdpbmFsTWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVttZXRob2ROYW1lXSA9ICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bGwgIT0gbG9naWNbbWV0aG9kTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naWNbbWV0aG9kTmFtZV0uYXBwbHkobG9naWMsIFt0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTWV0aG9kLmFwcGx5KGluc3RhbmNlLCBbdF0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsb2dpYy5zZXRWaWV3KGluc3RhbmNlKTtcclxuICAgICAgICBiaW5kTWV0aG9kKFwib25Mb2FkXCIpO1xyXG4gICAgICAgIGJpbmRNZXRob2QoXCJvbkVuYWJsZVwiKTtcclxuICAgICAgICBiaW5kTWV0aG9kKFwib25EaXNhYmxlXCIpO1xyXG4gICAgfVxyXG59Il19