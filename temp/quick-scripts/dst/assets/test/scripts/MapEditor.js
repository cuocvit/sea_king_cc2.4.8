
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/MapEditor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31039U0JJlPXaKM4yOJeoTn', 'MapEditor');
// test/scripts/MapEditor.ts

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
var Utils_1 = require("../../start-scene/scripts/Utils");
var MapItem_1 = require("./MapItem");
var LandRes_1 = require("./LandRes");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapEditor = /** @class */ (function (_super) {
    __extends(MapEditor, _super);
    function MapEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delBtn = null;
        _this.resNode = null;
        _this.mapNode = null;
        _this.mapContent = null;
        _this.mapItem = null;
        _this.treeItem = null;
        _this.mapIDLbl = null;
        _this.mapIndexLbl = null;
        _this.mapImgIDEdit = null;
        _this.mapY = null;
        _this.treeID = null;
        _this.treex = null;
        _this.treey = null;
        _this.isObtrustNode = null;
        _this.selCombNode = null;
        _this.selContent = null;
        _this.attrNode = null;
        _this.areaNode = null;
        _this.landNode = null;
        _this._tempIndex = 1;
        _this._row = 0;
        _this._col = 0;
        _this._mapList = [];
        _this.maxNum = 55;
        _this._plantNum = 53;
        _this._landNum = 42;
        _this._curtxt = 0;
        _this._curType = 0;
        _this._curShowID = 0;
        _this._mapItem = null;
        return _this;
    }
    MapEditor.prototype.initData = function (row, col, mapList) {
        this._row = row;
        this._col = col;
        this._mapList = mapList;
    };
    MapEditor.prototype.initMap = function () {
        this.mapNode.removeAllChildren();
        for (var index = 0; index < this._mapList.length; index++) {
            if (null != this._mapList[index]) {
                var column = index % this._row;
                var row = Math.floor(index / this._row);
                var mapItemNode = cc.instantiate(this.mapItem);
                mapItemNode.getComponent(MapItem_1.default).initData(this._mapList[index], this);
                this.mapNode.addChild(mapItemNode);
                mapItemNode.y = -95 - 51 * row - 20 * column;
                mapItemNode.x = 60 - 31 * row + 75 * column;
            }
        }
        for (var index = 0; index < this.areaNode.childrenCount; index++) {
            this.areaNode.children[index].children[0].children[1].getComponent(cc.Label).string = index + 1 + "";
        }
        for (var index = 0; index < this.maxNum; index++) {
            var n = cc.instantiate(this.landNode);
            this.selContent.addChild(n);
        }
    };
    MapEditor.prototype.onClickAreaID = function (event, areaID) {
        var parsedAreaID = parseInt(areaID);
        event.target.children[0].active = !event.target.children[0].active;
        for (var i = 0; i < this.mapNode.childrenCount; i++) {
            if (this.mapNode.children[i].getComponent(MapItem_1.default)._mapItemData.areaID == parsedAreaID) {
                this.mapNode.children[i].active = event.target.children[0].active;
            }
        }
    };
    MapEditor.prototype.onEnable = function () {
        var _this = this;
        this.initMap();
        this.attrNode.active = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.mapNode.setPosition(_this.mapNode.position.x + event.getDelta().x, _this.mapNode.position.y + event.getDelta().y);
        }, this);
    };
    MapEditor.prototype.onClickShowSprItem = function (event, type) {
        if (this.selCombNode.active) {
            this.selCombNode.active = false;
        }
        else {
            this.selCombNode.active = true;
            var num = "1" == type ? this._plantNum : this._landNum;
            this.selCombNode.y = "1" == type ? 110 : 175;
            this._curType = "1" == type ? 1 : 0;
            this._curtxt = "1" == type ? parseInt(this.treeID.string) + 1 : parseInt(this.mapImgIDEdit.string);
            for (var index = 0; index < this.selContent.childrenCount; index++) {
                this.selContent.children[index].active = index < num;
                if (this.selContent.children[index].active) {
                    this.selContent.children[index].getComponent(LandRes_1.default).initData(parseInt(type), 0 == parseInt(type) ? index + 1 : 100 + index, this.clickSelSprItem.bind(this), this);
                }
            }
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(true);
        }
    };
    MapEditor.prototype.clickSelSprItem = function (index) {
        if (0 == this._curType) {
            (this._mapItem.setLandImg(index),
                this.mapImgIDEdit.string = index + "",
                this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(false),
                this._curtxt = index);
        }
        else {
            if (0 == index) {
                this.treex.string = "0";
                this.treey.string = "0";
            }
            this.treeID.string = index.toString();
            this._mapItem.setTreeShowOrHide(index);
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(false);
            this._curtxt = index + 1;
        }
    };
    MapEditor.prototype.onClickHideSprItem = function () {
        this.selCombNode.active = false;
    };
    MapEditor.prototype.onClickChangeBg = function (event, bgID) {
        if (this._curShowID != parseInt(bgID))
            for (var index = 0; index < this.mapNode.childrenCount; index++) {
                if (this.mapNode.children[index] && this.mapNode.children[index].getComponent(MapItem_1.default)) {
                    this.mapNode.children[index].getComponent(MapItem_1.default).setImgListBg(parseInt(bgID));
                }
            }
    };
    MapEditor.prototype.onClickPlayAnim = function () {
        var plantID = "let plantID = [";
        var landImgID = "let landImgID = [";
        var landYOffset = "let landYOffset = [";
        var plantXOffset = "let plantXOffset = [";
        var plantYOffset = "let plantYOffset = [";
        for (var r = 0; r < this._mapList.length; r++) {
            if (this._mapList[r]) {
                plantID += this._mapList[r].itemTreeId + ",";
                landImgID += this._mapList[r].itemImgIndex + ",";
                landYOffset += this._mapList[r].itemYOffset + ",";
                plantXOffset += this._mapList[r].itemTreeX + ",";
                plantYOffset += this._mapList[r].itemTreeY + ",";
            }
        }
        plantID += "];";
        landImgID += "];";
        landYOffset += "];";
        plantXOffset += "];";
        plantYOffset += "];";
        console.log(plantID);
        console.log(landImgID);
        console.log(landYOffset);
        console.log(plantXOffset);
        console.log(plantYOffset);
    };
    MapEditor.prototype.onClickMapItem = function (item, data) {
        this._mapItem = item;
        this.attrNode.active = true;
        this.onShowInfo(data);
        if (this.selCombNode.active) {
            var num = 1 == this._curType ? this._plantNum : this._landNum;
            for (var i = 0; i < this.selContent.childrenCount; i++) {
                this.selContent.children[i].active = i < num;
                if (this.selContent.children[i].active) {
                    this.selContent.children[i].getComponent(LandRes_1.default).initData(this._curType, 0 == this._curType ? i + 1 : 100 + i, this.clickSelSprItem.bind(this), this);
                }
            }
            this._curtxt = 0 == this._curType ? parseInt(this.mapImgIDEdit.string) : parseInt(this.treeID.string) + 1;
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(true);
        }
    };
    MapEditor.prototype.onShowInfo = function (data) {
        if (this._mapList[data.itemID])
            this._mapList[data.itemID] = data;
        this.mapIDLbl.string = "地块ID" + data.itemIndex;
        this.mapIndexLbl.string = "地图表ID：" + data.itemID;
        this.mapImgIDEdit.string = data.itemImgIndex.toString();
        this.mapY.string = data.itemYOffset.toString();
        this.treeID.string = data.itemTreeId.toString();
        this.treex.string = data.itemTreeX.toString();
        this.treey.string = data.itemTreeY.toString();
        this.isObtrustNode.children[1].active = data.isObstruct == 1;
    };
    MapEditor.prototype.editItemLandImg = function () {
        var imgID = parseInt(this.mapImgIDEdit.string);
        if (imgID >= 0 && imgID <= 24) {
            this._mapItem.setLandImg(imgID);
        }
        else {
            console.log("没有对应的图片ID");
        }
    };
    MapEditor.prototype.editItemLandY = function () {
        var yOffset = parseInt(this.mapY.string);
        this._mapItem.showMapImgY(yOffset);
    };
    MapEditor.prototype.editItemTreeID = function () {
        var treeID = parseInt(this.treeID.string);
        if (treeID === 0) {
            this.treex.string = "0";
            this.treey.string = "0";
        }
        this._mapItem.setTreeShowOrHide(treeID);
    };
    MapEditor.prototype.editItemTreeX = function () {
        var treeX = parseInt(this.treex.string);
        var treeY = parseInt(this.treey.string);
        if (parseInt(this.treeID.string) == 0) {
            this.treex.string = "0";
            this.treey.string = "0";
            return;
        }
        this._mapItem.setTreePos(treeX, treeY);
    };
    MapEditor.prototype.showIsObtrust = function () {
        this.isObtrustNode.children[1].active = !this.isObtrustNode.children[1].active;
        this._mapItem.setIsObtrust(this.isObtrustNode.children[1].active);
    };
    MapEditor.prototype.onClickSave = function () {
        var data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(data));
    };
    MapEditor.prototype.onClickExport = function () {
        var data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        var jsonData = JSON.stringify(data);
        cc.sys.localStorage.setItem("mapData_sailing", jsonData);
        Utils_1.Utils.save_json_file("mapData_sailing.json", jsonData);
    };
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "delBtn", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "resNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "mapContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "mapItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "treeItem", void 0);
    __decorate([
        property(cc.Label)
    ], MapEditor.prototype, "mapIDLbl", void 0);
    __decorate([
        property(cc.Label)
    ], MapEditor.prototype, "mapIndexLbl", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "mapImgIDEdit", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "mapY", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treeID", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treex", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treey", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "isObtrustNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "selCombNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "selContent", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "attrNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "areaNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "landNode", void 0);
    MapEditor = __decorate([
        ccclass
    ], MapEditor);
    return MapEditor;
}(cc.Component));
exports.default = MapEditor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcTWFwRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUN4RCxxQ0FBZ0M7QUFDaEMscUNBQWdDO0FBRzFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdCLDZCQUFZO0lBQXBDO1FBQUEscUVBc1NDO1FBcFNXLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGtCQUFZLEdBQWUsSUFBSSxDQUFDO1FBR2hDLFVBQUksR0FBZSxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFlLElBQUksQ0FBQztRQUcxQixXQUFLLEdBQWUsSUFBSSxDQUFDO1FBR3pCLFdBQUssR0FBZSxJQUFJLENBQUM7UUFHekIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFFM0IsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsVUFBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGNBQVEsR0FBZ0IsRUFBRSxDQUFDO1FBQzNCLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFD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Q0YsU0FBUyxDQXNTZDtJQUFELGdCQUFDO0NBdFNELEFBc1NDLENBdFN1QixFQUFFLENBQUMsU0FBUyxHQXNTbkM7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgTWFwSXRlbSBmcm9tICcuL01hcEl0ZW0nO1xyXG5pbXBvcnQgTGFuZFJlcyBmcm9tICcuL0xhbmRSZXMnO1xyXG5pbXBvcnQgeyBNYXBJdGVtVm8gfSBmcm9tICcuL01hcEl0ZW1Wbyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTWFwRWRpdG9yIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBkZWxCdG46IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZXNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFwTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1hcENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIG1hcEl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgdHJlZUl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBtYXBJRExibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbWFwSW5kZXhMYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICAgIHByaXZhdGUgbWFwSW1nSURFZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICAgIHByaXZhdGUgbWFwWTogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIHRyZWVJRDogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIHRyZWV4OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICAgIHByaXZhdGUgdHJlZXk6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBpc09idHJ1c3ROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc2VsQ29tYk5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzZWxDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYXR0ck5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBhcmVhTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgbGFuZE5vZGU6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGVtcEluZGV4OiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBfcm93OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY29sOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWFwTGlzdDogTWFwSXRlbVZvW10gPSBbXTtcclxuICAgIHByaXZhdGUgbWF4TnVtOiBudW1iZXIgPSA1NTtcclxuICAgIHByaXZhdGUgX3BsYW50TnVtOiBudW1iZXIgPSA1MztcclxuICAgIHByaXZhdGUgX2xhbmROdW06IG51bWJlciA9IDQyO1xyXG4gICAgcHJpdmF0ZSBfY3VydHh0OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY3VyVHlwZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2N1clNob3dJRDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX21hcEl0ZW06IE1hcEl0ZW0gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBtYXBMaXN0OiBNYXBJdGVtVm9bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JvdyA9IHJvdztcclxuICAgICAgICB0aGlzLl9jb2wgPSBjb2w7XHJcbiAgICAgICAgdGhpcy5fbWFwTGlzdCA9IG1hcExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9tYXBMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9tYXBMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gaW5kZXggJSB0aGlzLl9yb3c7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5fcm93KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcEl0ZW1Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYXBJdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtTm9kZS5nZXRDb21wb25lbnQoTWFwSXRlbSkuaW5pdERhdGEodGhpcy5fbWFwTGlzdFtpbmRleF0sIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBOb2RlLmFkZENoaWxkKG1hcEl0ZW1Ob2RlKTtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1Ob2RlLnkgPSAtOTUgLSA1MSAqIHJvdyAtIDIwICogY29sdW1uO1xyXG4gICAgICAgICAgICAgICAgbWFwSXRlbU5vZGUueCA9IDYwIC0gMzEgKiByb3cgKyA3NSAqIGNvbHVtbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYXJlYU5vZGUuY2hpbGRyZW5Db3VudDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFOb2RlLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZGV4ICsgMSArIFwiXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5tYXhOdW07IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIG4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxhbmROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxDb250ZW50LmFkZENoaWxkKG4pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0FyZWFJRChldmVudDogY2MuRXZlbnQsIGFyZWFJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkQXJlYUlEID0gcGFyc2VJbnQoYXJlYUlEKTtcclxuICAgICAgICBldmVudC50YXJnZXQuY2hpbGRyZW5bMF0uYWN0aXZlID0gIWV2ZW50LnRhcmdldC5jaGlsZHJlblswXS5hY3RpdmU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hcE5vZGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcE5vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KE1hcEl0ZW0pLl9tYXBJdGVtRGF0YS5hcmVhSUQgPT0gcGFyc2VkQXJlYUlEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcE5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZXZlbnQudGFyZ2V0LmNoaWxkcmVuWzBdLmFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0TWFwKCk7XHJcbiAgICAgICAgdGhpcy5hdHRyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwTm9kZS5zZXRQb3NpdGlvbih0aGlzLm1hcE5vZGUucG9zaXRpb24ueCArIGV2ZW50LmdldERlbHRhKCkueCwgdGhpcy5tYXBOb2RlLnBvc2l0aW9uLnkgKyBldmVudC5nZXREZWx0YSgpLnkpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1Nob3dTcHJJdGVtKGV2ZW50OiBjYy5Ob2RlLCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxDb21iTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxDb21iTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsQ29tYk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgbnVtID0gXCIxXCIgPT0gdHlwZSA/IHRoaXMuX3BsYW50TnVtIDogdGhpcy5fbGFuZE51bTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsQ29tYk5vZGUueSA9IFwiMVwiID09IHR5cGUgPyAxMTAgOiAxNzU7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clR5cGUgPSBcIjFcIiA9PSB0eXBlID8gMSA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnR4dCA9IFwiMVwiID09IHR5cGUgPyBwYXJzZUludCh0aGlzLnRyZWVJRC5zdHJpbmcpICsgMSA6IHBhcnNlSW50KHRoaXMubWFwSW1nSURFZGl0LnN0cmluZyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuQ291bnQ7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsQ29udGVudC5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gaW5kZXggPCBudW07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW2luZGV4XS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbENvbnRlbnQuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChMYW5kUmVzKS5pbml0RGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQodHlwZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gcGFyc2VJbnQodHlwZSkgPyBpbmRleCArIDEgOiAxMDAgKyBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja1NlbFNwckl0ZW0uYmluZCh0aGlzKSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW3RoaXMuX2N1cnR4dCAtIDFdLmdldENvbXBvbmVudChMYW5kUmVzKS5zZXRTZWxlY3RDb2xvcih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGlja1NlbFNwckl0ZW0oaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICgwID09IHRoaXMuX2N1clR5cGUpIHtcclxuICAgICAgICAgICAgKHRoaXMuX21hcEl0ZW0uc2V0TGFuZEltZyhpbmRleCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcEltZ0lERWRpdC5zdHJpbmcgPSBpbmRleCArIFwiXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbENvbnRlbnQuY2hpbGRyZW5bdGhpcy5fY3VydHh0IC0gMV0uZ2V0Q29tcG9uZW50KExhbmRSZXMpLnNldFNlbGVjdENvbG9yKGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnR4dCA9IGluZGV4KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgwID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWV4LnN0cmluZyA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVleS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyZWVJRC5zdHJpbmcgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJdGVtLnNldFRyZWVTaG93T3JIaWRlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW3RoaXMuX2N1cnR4dCAtIDFdLmdldENvbXBvbmVudChMYW5kUmVzKS5zZXRTZWxlY3RDb2xvcihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnR4dCA9IGluZGV4ICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrSGlkZVNwckl0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxDb21iTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tDaGFuZ2VCZyhldmVudDogY2MuTm9kZSwgYmdJRDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1clNob3dJRCAhPSBwYXJzZUludChiZ0lEKSlcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubWFwTm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXBOb2RlLmNoaWxkcmVuW2luZGV4XSAmJiB0aGlzLm1hcE5vZGUuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChNYXBJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwTm9kZS5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KE1hcEl0ZW0pLnNldEltZ0xpc3RCZyhwYXJzZUludChiZ0lEKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tQbGF5QW5pbSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGxhbnRJRCA9IFwibGV0IHBsYW50SUQgPSBbXCI7XHJcbiAgICAgICAgbGV0IGxhbmRJbWdJRCA9IFwibGV0IGxhbmRJbWdJRCA9IFtcIjtcclxuICAgICAgICBsZXQgbGFuZFlPZmZzZXQgPSBcImxldCBsYW5kWU9mZnNldCA9IFtcIjtcclxuICAgICAgICBsZXQgcGxhbnRYT2Zmc2V0ID0gXCJsZXQgcGxhbnRYT2Zmc2V0ID0gW1wiO1xyXG4gICAgICAgIGxldCBwbGFudFlPZmZzZXQgPSBcImxldCBwbGFudFlPZmZzZXQgPSBbXCI7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLl9tYXBMaXN0Lmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBMaXN0W3JdKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFudElEICs9IHRoaXMuX21hcExpc3Rbcl0uaXRlbVRyZWVJZCArIFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgbGFuZEltZ0lEICs9IHRoaXMuX21hcExpc3Rbcl0uaXRlbUltZ0luZGV4ICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICBsYW5kWU9mZnNldCArPSB0aGlzLl9tYXBMaXN0W3JdLml0ZW1ZT2Zmc2V0ICsgXCIsXCI7XHJcbiAgICAgICAgICAgICAgICBwbGFudFhPZmZzZXQgKz0gdGhpcy5fbWFwTGlzdFtyXS5pdGVtVHJlZVggKyBcIixcIjtcclxuICAgICAgICAgICAgICAgIHBsYW50WU9mZnNldCArPSB0aGlzLl9tYXBMaXN0W3JdLml0ZW1UcmVlWSArIFwiLFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYW50SUQgKz0gXCJdO1wiO1xyXG4gICAgICAgIGxhbmRJbWdJRCArPSBcIl07XCI7XHJcbiAgICAgICAgbGFuZFlPZmZzZXQgKz0gXCJdO1wiO1xyXG4gICAgICAgIHBsYW50WE9mZnNldCArPSBcIl07XCI7XHJcbiAgICAgICAgcGxhbnRZT2Zmc2V0ICs9IFwiXTtcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhwbGFudElEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsYW5kSW1nSUQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxhbmRZT2Zmc2V0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwbGFudFhPZmZzZXQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBsYW50WU9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2tNYXBJdGVtKGl0ZW06IE1hcEl0ZW0sIGRhdGE6IE1hcEl0ZW1Wbyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuYXR0ck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uU2hvd0luZm8oZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlbENvbWJOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBudW0gPSAxID09IHRoaXMuX2N1clR5cGUgPyB0aGlzLl9wbGFudE51bSA6IHRoaXMuX2xhbmROdW07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGkgPCBudW07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW2ldLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsQ29udGVudC5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoTGFuZFJlcykuaW5pdERhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdGhpcy5fY3VyVHlwZSA/IGkgKyAxIDogMTAwICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja1NlbFNwckl0ZW0uYmluZCh0aGlzKSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnR4dCA9IDAgPT0gdGhpcy5fY3VyVHlwZSA/IHBhcnNlSW50KHRoaXMubWFwSW1nSURFZGl0LnN0cmluZykgOiBwYXJzZUludCh0aGlzLnRyZWVJRC5zdHJpbmcpICsgMTtcclxuICAgICAgICAgICAgdGhpcy5zZWxDb250ZW50LmNoaWxkcmVuW3RoaXMuX2N1cnR4dCAtIDFdLmdldENvbXBvbmVudChMYW5kUmVzKS5zZXRTZWxlY3RDb2xvcih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvd0luZm8oZGF0YTogTWFwSXRlbVZvKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcExpc3RbZGF0YS5pdGVtSURdKSB0aGlzLl9tYXBMaXN0W2RhdGEuaXRlbUlEXSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5tYXBJRExibC5zdHJpbmcgPSBcIuWcsOWdl0lEXCIgKyBkYXRhLml0ZW1JbmRleDtcclxuICAgICAgICB0aGlzLm1hcEluZGV4TGJsLnN0cmluZyA9IFwi5Zyw5Zu+6KGoSUTvvJpcIiArIGRhdGEuaXRlbUlEO1xyXG4gICAgICAgIHRoaXMubWFwSW1nSURFZGl0LnN0cmluZyA9IGRhdGEuaXRlbUltZ0luZGV4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5tYXBZLnN0cmluZyA9IGRhdGEuaXRlbVlPZmZzZXQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnRyZWVJRC5zdHJpbmcgPSBkYXRhLml0ZW1UcmVlSWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnRyZWV4LnN0cmluZyA9IGRhdGEuaXRlbVRyZWVYLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy50cmVleS5zdHJpbmcgPSBkYXRhLml0ZW1UcmVlWS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuaXNPYnRydXN0Tm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSBkYXRhLmlzT2JzdHJ1Y3QgPT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRJdGVtTGFuZEltZygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWdJRCA9IHBhcnNlSW50KHRoaXMubWFwSW1nSURFZGl0LnN0cmluZyk7XHJcbiAgICAgICAgaWYgKGltZ0lEID49IDAgJiYgaW1nSUQgPD0gMjQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwSXRlbS5zZXRMYW5kSW1nKGltZ0lEKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuayoeacieWvueW6lOeahOWbvueJh0lEXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRJdGVtTGFuZFkoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeU9mZnNldCA9IHBhcnNlSW50KHRoaXMubWFwWS5zdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW0uc2hvd01hcEltZ1koeU9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0SXRlbVRyZWVJRCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmVlSUQgPSBwYXJzZUludCh0aGlzLnRyZWVJRC5zdHJpbmcpO1xyXG4gICAgICAgIGlmICh0cmVlSUQgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy50cmVleC5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICAgICAgdGhpcy50cmVleS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwSXRlbS5zZXRUcmVlU2hvd09ySGlkZSh0cmVlSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdEl0ZW1UcmVlWCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmVlWCA9IHBhcnNlSW50KHRoaXMudHJlZXguc3RyaW5nKTtcclxuICAgICAgICBjb25zdCB0cmVlWSA9IHBhcnNlSW50KHRoaXMudHJlZXkuc3RyaW5nKTtcclxuICAgICAgICBpZiAocGFyc2VJbnQodGhpcy50cmVlSUQuc3RyaW5nKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZXguc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZXkuc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWFwSXRlbS5zZXRUcmVlUG9zKHRyZWVYLCB0cmVlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93SXNPYnRydXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNPYnRydXN0Tm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSAhdGhpcy5pc09idHJ1c3ROb2RlLmNoaWxkcmVuWzFdLmFjdGl2ZTtcclxuICAgICAgICB0aGlzLl9tYXBJdGVtLnNldElzT2J0cnVzdCh0aGlzLmlzT2J0cnVzdE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHJvdzogdGhpcy5fcm93LFxyXG4gICAgICAgICAgICBjb2w6IHRoaXMuX2NvbCxcclxuICAgICAgICAgICAgbWFwRGF0YTogdGhpcy5fbWFwTGlzdFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWFwRGF0YV9zYWlsaW5nXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tFeHBvcnQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLl9yb3csXHJcbiAgICAgICAgICAgIGNvbDogdGhpcy5fY29sLFxyXG4gICAgICAgICAgICBtYXBEYXRhOiB0aGlzLl9tYXBMaXN0XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBqc29uRGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm1hcERhdGFfc2FpbGluZ1wiLCBqc29uRGF0YSk7XHJcbiAgICAgICAgVXRpbHMuc2F2ZV9qc29uX2ZpbGUoXCJtYXBEYXRhX3NhaWxpbmcuanNvblwiLCBqc29uRGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hcEVkaXRvcjsiXX0=