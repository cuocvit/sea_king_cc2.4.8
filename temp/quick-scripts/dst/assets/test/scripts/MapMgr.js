
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/MapMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'daf1dGLuepP2JXCQwd0fpBF', 'MapMgr');
// test/scripts/MapMgr.ts

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
var MapEditor_1 = require("./MapEditor");
var MapItemVo_1 = require("./MapItemVo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapMgr = /** @class */ (function (_super) {
    __extends(MapMgr, _super);
    function MapMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.edit1 = null;
        _this.edit2 = null;
        _this.mapNode = null;
        _this.itemNode = null;
        _this.bigMapNode = null;
        _this.num1 = 0;
        _this.num2 = 0;
        _this._mapList = [];
        return _this;
    }
    MapMgr.prototype.onEnable = function () {
        var _this = this;
        this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            _this.bigMapNode.y += t.getDelta().y;
        }, this);
        this.itemNode.removeFromParent();
        this.clearAllNode();
        this._mapList = [];
        var map = cc.sys.localStorage.getItem("mapData_sailing");
        console.log("Map: ", map);
        if (map) {
            var data = JSON.parse(map);
            this.num1 = data.row;
            this.num2 = data.col;
            this._mapList = data.mapData;
            if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
                this.mapNode.width = 50 * this.num1, this.clearAllNode();
                for (var num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
                    for (var num1 = 0; num1 < this.num1; num1++) {
                        var instant = cc.instantiate(this.itemNode);
                        instant.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
                        instant.color = null == data.mapData[num2 * this.num1 + num1] ? cc.Color.WHITE : cc.Color.RED;
                        data.mapData[num2 * this.num1 + num1];
                        this.mapNode.addChild(instant);
                        this.mapNode.children[num2].targetOff(this);
                    }
                }
                for (var index = 0; index < this.mapNode.childrenCount; index++) {
                    (function (index) {
                        _this.mapNode.children[index].targetOff(_this);
                        _this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, function () {
                            if (_this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
                                _this.mapNode.children[index].color = cc.Color.RED;
                                var mapItemVo = new MapItemVo_1.MapItemVo;
                                mapItemVo.itemID = index;
                                mapItemVo.itemIndex = 0;
                                mapItemVo.itemImgIndex = 1;
                                mapItemVo.itemYOffset = 9;
                                mapItemVo.itemTreeId = 0;
                                mapItemVo.itemTreeX = 0;
                                mapItemVo.itemTreeY = 76;
                                mapItemVo.isObstruct = 0;
                                _this._mapList[index] = mapItemVo;
                            }
                            else {
                                _this.mapNode.children[index].color = cc.Color.WHITE;
                                _this._mapList[index] = null;
                            }
                        }, _this);
                    })(index);
                }
            }
        }
    };
    MapMgr.prototype.onDisable = function () { };
    MapMgr.prototype.clearAllNode = function () {
        var _this = this;
        this.mapNode.children.forEach(function (child) {
            child.targetOff(_this);
            child.destroy();
            child.removeFromParent();
        });
        this.mapNode.removeAllChildren();
        this.edit1.string = "0";
        this.edit2.string = "0";
    };
    MapMgr.prototype.onClickNewEdit = function () {
        var _this = this;
        this.num1 = parseInt(this.edit1.string);
        this.num2 = parseInt(this.edit2.string);
        if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
            this.mapNode.width = 50 * this.num1;
            this.clearAllNode();
            for (var num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
                for (var num1 = 0; num1 < this.num1; num1++) {
                    var o = cc.instantiate(this.itemNode);
                    o.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
                    o.color = cc.Color.WHITE;
                    this.mapNode.addChild(o);
                    this.mapNode.children[num2].targetOff(this);
                    this._mapList.push(null);
                }
            }
            this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
                _this.bigMapNode.y += t.getDelta().y;
            }, this);
            for (var index = 0; index < this.mapNode.childrenCount; index++) {
                (function (index) {
                    _this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, function () {
                        if (_this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
                            _this.mapNode.children[index].color = cc.Color.RED;
                            var mapItemVo = new MapItemVo_1.MapItemVo;
                            mapItemVo.itemID = index;
                            mapItemVo.itemIndex = 0;
                            mapItemVo.itemImgIndex = 1;
                            mapItemVo.itemYOffset = 9;
                            mapItemVo.itemTreeId = 0;
                            mapItemVo.itemTreeX = 0;
                            mapItemVo.itemTreeY = 76;
                            mapItemVo.isObstruct = 0;
                            mapItemVo.areaID = 0;
                            _this._mapList[index] = mapItemVo;
                        }
                        else {
                            _this.mapNode.children[index].color = cc.Color.WHITE;
                            _this._mapList[index] = null;
                        }
                    }, _this);
                })(index);
            }
        }
    };
    MapMgr.prototype.onClickCreateMap = function () {
        var itemIndex = 0;
        for (var i = 0; i < this._mapList.length; i++) {
            if (this._mapList[i]) {
                this._mapList[i].itemIndex = itemIndex;
                itemIndex++;
            }
        }
        console.log(this._mapList);
        var mapData = { row: this.num1, col: this.num2, mapData: this._mapList };
        cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(mapData));
        this.node.parent.getChildByName("MapEdit").getComponent(MapEditor_1.default).initData(this.num1, this.num2, this._mapList);
        this.node.parent.getChildByName("MapEdit").active = true;
        this.node.active = false;
    };
    __decorate([
        property(cc.EditBox)
    ], MapMgr.prototype, "edit1", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapMgr.prototype, "edit2", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "itemNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "bigMapNode", void 0);
    MapMgr = __decorate([
        ccclass
    ], MapMgr);
    return MapMgr;
}(cc.Component));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcTWFwTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUNwQyx5Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUIsMEJBQVk7SUFBakM7UUFBQSxxRUEwSkM7UUF4SlMsV0FBSyxHQUFlLElBQUksQ0FBQztRQUd6QixXQUFLLEdBQWUsSUFBSSxDQUFDO1FBR3pCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsY0FBUSxHQUF5QixFQUFFLENBQUM7O0lBd0k5QyxDQUFDO0lBdElXLHlCQUFRLEdBQWxCO1FBQUEsaUJBdURDO1FBdERDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENB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QUEwSkMsQ0ExSm9CLEVBQUUsQ0FBQyxTQUFTLEdBMEpoQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBFZGl0b3IgZnJvbSAnLi9NYXBFZGl0b3InO1xyXG5pbXBvcnQgeyBNYXBJdGVtVm8gfSBmcm9tICcuL01hcEl0ZW1Wbyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTWFwTWdyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICBwcml2YXRlIGVkaXQxOiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgcHJpdmF0ZSBlZGl0MjogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHByaXZhdGUgbWFwTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHByaXZhdGUgaXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBwcml2YXRlIGJpZ01hcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIG51bTE6IG51bWJlciA9IDA7XHJcbiAgcHJpdmF0ZSBudW0yOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX21hcExpc3Q6IChNYXBJdGVtVm8gfCBudWxsKVtdID0gW107XHJcblxyXG4gIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYmlnTWFwTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCAodCkgPT4ge1xyXG4gICAgICB0aGlzLmJpZ01hcE5vZGUueSArPSB0LmdldERlbHRhKCkueTtcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaXRlbU5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgdGhpcy5jbGVhckFsbE5vZGUoKTtcclxuICAgIHRoaXMuX21hcExpc3QgPSBbXTtcclxuXHJcbiAgICBjb25zdCBtYXAgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtYXBEYXRhX3NhaWxpbmdcIik7XHJcbiAgICBjb25zb2xlLmxvZyhcIk1hcDogXCIsIG1hcCk7XHJcbiAgICBpZiAobWFwKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKG1hcCk7XHJcbiAgICAgIHRoaXMubnVtMSA9IGRhdGEucm93O1xyXG4gICAgICB0aGlzLm51bTIgPSBkYXRhLmNvbDtcclxuICAgICAgdGhpcy5fbWFwTGlzdCA9IGRhdGEubWFwRGF0YTtcclxuXHJcbiAgICAgIGlmICghKDIwIDwgdGhpcy5udW0xIHx8IHRoaXMubnVtMSA8PSAwIHx8IDIzIDwgdGhpcy5udW0yIHx8IHRoaXMubnVtMiA8PSAwKSkge1xyXG4gICAgICAgIHRoaXMubWFwTm9kZS53aWR0aCA9IDUwICogdGhpcy5udW0xLCB0aGlzLmNsZWFyQWxsTm9kZSgpO1xyXG4gICAgICAgIGZvciAobGV0IG51bTIgPSB0aGlzLmJpZ01hcE5vZGUueSA9IDA7IG51bTIgPCB0aGlzLm51bTI7IG51bTIrKykge1xyXG4gICAgICAgICAgZm9yIChsZXQgbnVtMSA9IDA7IG51bTEgPCB0aGlzLm51bTE7IG51bTErKykge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW50ID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtTm9kZSk7XHJcbiAgICAgICAgICAgIGluc3RhbnQuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBudW0yICogdGhpcy5udW0xICsgbnVtMSArIFwiXCI7XHJcbiAgICAgICAgICAgIGluc3RhbnQuY29sb3IgPSBudWxsID09IGRhdGEubWFwRGF0YVtudW0yICogdGhpcy5udW0xICsgbnVtMV0gPyBjYy5Db2xvci5XSElURSA6IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgZGF0YS5tYXBEYXRhW251bTIgKiB0aGlzLm51bTEgKyBudW0xXTtcclxuICAgICAgICAgICAgdGhpcy5tYXBOb2RlLmFkZENoaWxkKGluc3RhbnQpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5bbnVtMl0udGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubWFwTm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAoKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXBOb2RlLmNoaWxkcmVuW2luZGV4XS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwTm9kZS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMubWFwTm9kZS5jaGlsZHJlbltpbmRleF0uY29sb3IudG9TdHJpbmcoKSA9PSBjYy5Db2xvci5XSElURS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwSXRlbVZvID0gbmV3IE1hcEl0ZW1Wb1xyXG4gICAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1JRCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtVm8uaXRlbUltZ0luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1Wby5pdGVtWU9mZnNldCA9IDk7XHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtVm8uaXRlbVRyZWVJZCA9IDA7XHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtVm8uaXRlbVRyZWVYID0gMDtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1Wby5pdGVtVHJlZVkgPSA3NjtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1Wby5pc09ic3RydWN0ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcExpc3RbaW5kZXhdID0gbWFwSXRlbVZvO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBMaXN0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgICAgfSkoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHsgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyQWxsTm9kZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubWFwTm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICBjaGlsZC50YXJnZXRPZmYodGhpcyk7XHJcbiAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgY2hpbGQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXBOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICB0aGlzLmVkaXQxLnN0cmluZyA9IFwiMFwiO1xyXG4gICAgdGhpcy5lZGl0Mi5zdHJpbmcgPSBcIjBcIjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25DbGlja05ld0VkaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm51bTEgPSBwYXJzZUludCh0aGlzLmVkaXQxLnN0cmluZyk7XHJcbiAgICB0aGlzLm51bTIgPSBwYXJzZUludCh0aGlzLmVkaXQyLnN0cmluZyk7XHJcblxyXG4gICAgaWYgKCEoMjAgPCB0aGlzLm51bTEgfHwgdGhpcy5udW0xIDw9IDAgfHwgMjMgPCB0aGlzLm51bTIgfHwgdGhpcy5udW0yIDw9IDApKSB7XHJcbiAgICAgIHRoaXMubWFwTm9kZS53aWR0aCA9IDUwICogdGhpcy5udW0xO1xyXG4gICAgICB0aGlzLmNsZWFyQWxsTm9kZSgpO1xyXG5cclxuICAgICAgZm9yIChsZXQgbnVtMiA9IHRoaXMuYmlnTWFwTm9kZS55ID0gMDsgbnVtMiA8IHRoaXMubnVtMjsgbnVtMisrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgbnVtMSA9IDA7IG51bTEgPCB0aGlzLm51bTE7IG51bTErKykge1xyXG4gICAgICAgICAgdmFyIG8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1Ob2RlKTtcclxuICAgICAgICAgIG8uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBudW0yICogdGhpcy5udW0xICsgbnVtMSArIFwiXCI7XHJcbiAgICAgICAgICBvLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICB0aGlzLm1hcE5vZGUuYWRkQ2hpbGQobyk7XHJcbiAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5bbnVtMl0udGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgICAgdGhpcy5fbWFwTGlzdC5wdXNoKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJpZ01hcE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgKHQpID0+IHtcclxuICAgICAgICB0aGlzLmJpZ01hcE5vZGUueSArPSB0LmdldERlbHRhKCkueTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5tYXBOb2RlLmNoaWxkcmVuQ291bnQ7IGluZGV4KyspIHtcclxuICAgICAgICAoKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMubWFwTm9kZS5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuQ29sb3IuV0hJVEUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubWFwTm9kZS5jaGlsZHJlbltpbmRleF0uY29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgY29uc3QgbWFwSXRlbVZvID0gbmV3IE1hcEl0ZW1WbztcclxuICAgICAgICAgICAgICBtYXBJdGVtVm8uaXRlbUlEID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1JbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1JbWdJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1ZT2Zmc2V0ID0gOTtcclxuICAgICAgICAgICAgICBtYXBJdGVtVm8uaXRlbVRyZWVJZCA9IDA7XHJcbiAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1UcmVlWCA9IDA7XHJcbiAgICAgICAgICAgICAgbWFwSXRlbVZvLml0ZW1UcmVlWSA9IDc2O1xyXG4gICAgICAgICAgICAgIG1hcEl0ZW1Wby5pc09ic3RydWN0ID0gMDtcclxuICAgICAgICAgICAgICBtYXBJdGVtVm8uYXJlYUlEID0gMDtcclxuICAgICAgICAgICAgICB0aGlzLl9tYXBMaXN0W2luZGV4XSA9IG1hcEl0ZW1WbztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5baW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgdGhpcy5fbWFwTGlzdFtpbmRleF0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgIH0pKGluZGV4KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ2xpY2tDcmVhdGVNYXAoKTogdm9pZCB7XHJcbiAgICBsZXQgaXRlbUluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWFwTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fbWFwTGlzdFtpXSkge1xyXG4gICAgICAgIHRoaXMuX21hcExpc3RbaV0uaXRlbUluZGV4ID0gaXRlbUluZGV4O1xyXG4gICAgICAgIGl0ZW1JbmRleCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9tYXBMaXN0KTtcclxuICAgIGNvbnN0IG1hcERhdGEgPSB7IHJvdzogdGhpcy5udW0xLCBjb2w6IHRoaXMubnVtMiwgbWFwRGF0YTogdGhpcy5fbWFwTGlzdCB9O1xyXG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWFwRGF0YV9zYWlsaW5nXCIsIEpTT04uc3RyaW5naWZ5KG1hcERhdGEpKTtcclxuICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJNYXBFZGl0XCIpLmdldENvbXBvbmVudChNYXBFZGl0b3IpLmluaXREYXRhKHRoaXMubnVtMSwgdGhpcy5udW0yLCB0aGlzLl9tYXBMaXN0KTtcclxuICAgIHRoaXMubm9kZS5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJNYXBFZGl0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==