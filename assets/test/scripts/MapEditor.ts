import { Utils } from '../../start-scene/scripts/Utils';
import MapItem from './MapItem';
import LandRes from './LandRes';
import { MapItemVo } from './MapItemVo';

const { ccclass, property } = cc._decorator;

@ccclass
class MapEditor extends cc.Component {
    @property(cc.Node)
    private delBtn: cc.Node = null;

    @property(cc.Node)
    private resNode: cc.Node = null;

    @property(cc.Node)
    private mapNode: cc.Node = null;

    @property(cc.Node)
    private mapContent: cc.Node = null;

    @property(cc.Prefab)
    private mapItem: cc.Prefab = null;

    @property(cc.Prefab)
    private treeItem: cc.Prefab = null;

    @property(cc.Label)
    private mapIDLbl: cc.Label = null;

    @property(cc.Label)
    private mapIndexLbl: cc.Label = null;

    @property(cc.EditBox)
    private mapImgIDEdit: cc.EditBox = null;

    @property(cc.EditBox)
    private mapY: cc.EditBox = null;

    @property(cc.EditBox)
    private treeID: cc.EditBox = null;

    @property(cc.EditBox)
    private treex: cc.EditBox = null;

    @property(cc.EditBox)
    private treey: cc.EditBox = null;

    @property(cc.Node)
    private isObtrustNode: cc.Node = null;

    @property(cc.Node)
    private selCombNode: cc.Node = null;

    @property(cc.Node)
    private selContent: cc.Node = null;

    @property(cc.Node)
    private attrNode: cc.Node = null;

    @property(cc.Node)
    private areaNode: cc.Node = null;

    @property(cc.Prefab)
    private landNode: cc.Prefab = null;

    private _tempIndex: number = 1;
    private _row: number = 0;
    private _col: number = 0;
    private _mapList: MapItemVo[] = [];
    private maxNum: number = 55;
    private _plantNum: number = 53;
    private _landNum: number = 42;
    private _curtxt: number = 0;
    private _curType: number = 0;
    private _curShowID: number = 0;
    private _mapItem: MapItem | null = null;

    public initData(row: number, col: number, mapList: MapItemVo[]): void {
        this._row = row;
        this._col = col;
        this._mapList = mapList;
    }

    private initMap(): void {
        this.mapNode.removeAllChildren();
        for (let index = 0; index < this._mapList.length; index++) {
            if (null != this._mapList[index]) {
                const column = index % this._row;
                const row = Math.floor(index / this._row);
                const mapItemNode = cc.instantiate(this.mapItem);

                mapItemNode.getComponent(MapItem).initData(this._mapList[index], this);
                this.mapNode.addChild(mapItemNode);
                mapItemNode.y = -95 - 51 * row - 20 * column;
                mapItemNode.x = 60 - 31 * row + 75 * column;
            }
        }

        for (let index = 0; index < this.areaNode.childrenCount; index++) {
            this.areaNode.children[index].children[0].children[1].getComponent(cc.Label).string = index + 1 + "";

        }
        for (let index = 0; index < this.maxNum; index++) {
            var n = cc.instantiate(this.landNode);
            this.selContent.addChild(n)
        }
    }

    private onClickAreaID(event: cc.Event, areaID: string): void {
        const parsedAreaID = parseInt(areaID);
        event.target.children[0].active = !event.target.children[0].active;
        for (let i = 0; i < this.mapNode.childrenCount; i++) {
            if (this.mapNode.children[i].getComponent(MapItem)._mapItemData.areaID == parsedAreaID) {
                this.mapNode.children[i].active = event.target.children[0].active;
            }
        }
    }

    protected onEnable(): void {
        this.initMap();
        this.attrNode.active = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            this.mapNode.setPosition(this.mapNode.position.x + event.getDelta().x, this.mapNode.position.y + event.getDelta().y);
        }, this);
    }

    private onClickShowSprItem(event: cc.Node, type: string): void {
        if (this.selCombNode.active) {
            this.selCombNode.active = false;
        }
        else {
            this.selCombNode.active = true;
            const num = "1" == type ? this._plantNum : this._landNum;

            this.selCombNode.y = "1" == type ? 110 : 175;
            this._curType = "1" == type ? 1 : 0;
            this._curtxt = "1" == type ? parseInt(this.treeID.string) + 1 : parseInt(this.mapImgIDEdit.string);

            for (let index = 0; index < this.selContent.childrenCount; index++) {
                this.selContent.children[index].active = index < num;
                if (this.selContent.children[index].active) {
                    this.selContent.children[index].getComponent(LandRes).initData(
                        parseInt(type),
                        0 == parseInt(type) ? index + 1 : 100 + index,
                        this.clickSelSprItem.bind(this), this);
                }
            }
            this.selContent.children[this._curtxt - 1].getComponent(LandRes).setSelectColor(true);
        }
    }

    private clickSelSprItem(index: number): void {
        if (0 == this._curType) {
            (this._mapItem.setLandImg(index),
                this.mapImgIDEdit.string = index + "",
                this.selContent.children[this._curtxt - 1].getComponent(LandRes).setSelectColor(false),
                this._curtxt = index)
        } else {
            if (0 == index) {
                this.treex.string = "0";
                this.treey.string = "0";
            }
            this.treeID.string = index.toString();
            this._mapItem.setTreeShowOrHide(index);
            this.selContent.children[this._curtxt - 1].getComponent(LandRes).setSelectColor(false);
            this._curtxt = index + 1;
        }
    }

    private onClickHideSprItem(): void {
        this.selCombNode.active = false;
    }

    private onClickChangeBg(event: cc.Node, bgID: string): void {
        if (this._curShowID != parseInt(bgID))
            for (let index = 0; index < this.mapNode.childrenCount; index++) {
                if (this.mapNode.children[index] && this.mapNode.children[index].getComponent(MapItem)) {
                    this.mapNode.children[index].getComponent(MapItem).setImgListBg(parseInt(bgID));
                }
            }
    }

    private onClickPlayAnim(): void {
        let plantID = "let plantID = [";
        let landImgID = "let landImgID = [";
        let landYOffset = "let landYOffset = [";
        let plantXOffset = "let plantXOffset = [";
        let plantYOffset = "let plantYOffset = [";
        for (let r = 0; r < this._mapList.length; r++) {
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
    }

    public onClickMapItem(item: MapItem, data: MapItemVo): void {
        this._mapItem = item;
        this.attrNode.active = true;
        this.onShowInfo(data);

        if (this.selCombNode.active) {
            const num = 1 == this._curType ? this._plantNum : this._landNum;
            for (var i = 0; i < this.selContent.childrenCount; i++) {
                this.selContent.children[i].active = i < num;
                if (this.selContent.children[i].active) {
                    this.selContent.children[i].getComponent(LandRes).initData(
                        this._curType,
                        0 == this._curType ? i + 1 : 100 + i,
                        this.clickSelSprItem.bind(this), this);
                }
            }

            this._curtxt = 0 == this._curType ? parseInt(this.mapImgIDEdit.string) : parseInt(this.treeID.string) + 1;
            this.selContent.children[this._curtxt - 1].getComponent(LandRes).setSelectColor(true);
        }
    }

    public onShowInfo(data: MapItemVo): void {
        if (this._mapList[data.itemID]) this._mapList[data.itemID] = data;
        this.mapIDLbl.string = "地块ID" + data.itemIndex;
        this.mapIndexLbl.string = "地图表ID：" + data.itemID;
        this.mapImgIDEdit.string = data.itemImgIndex.toString();
        this.mapY.string = data.itemYOffset.toString();
        this.treeID.string = data.itemTreeId.toString();
        this.treex.string = data.itemTreeX.toString();
        this.treey.string = data.itemTreeY.toString();
        this.isObtrustNode.children[1].active = data.isObstruct == 1;
    }

    private editItemLandImg(): void {
        const imgID = parseInt(this.mapImgIDEdit.string);
        if (imgID >= 0 && imgID <= 24) {
            this._mapItem.setLandImg(imgID);
        } else {
            console.log("没有对应的图片ID");
        }
    }

    private editItemLandY(): void {
        const yOffset = parseInt(this.mapY.string);
        this._mapItem.showMapImgY(yOffset);
    }

    private editItemTreeID(): void {
        const treeID = parseInt(this.treeID.string);
        if (treeID === 0) {
            this.treex.string = "0";
            this.treey.string = "0";
        }
        this._mapItem.setTreeShowOrHide(treeID);
    }

    private editItemTreeX(): void {
        const treeX = parseInt(this.treex.string);
        const treeY = parseInt(this.treey.string);
        if (parseInt(this.treeID.string) == 0) {
            this.treex.string = "0";
            this.treey.string = "0";
            return;
        }
        this._mapItem.setTreePos(treeX, treeY);
    }

    private showIsObtrust(): void {
        this.isObtrustNode.children[1].active = !this.isObtrustNode.children[1].active;
        this._mapItem.setIsObtrust(this.isObtrustNode.children[1].active);
    }

    private onClickSave(): void {
        const data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(data));
    }

    private onClickExport(): void {
        const data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        const jsonData = JSON.stringify(data);
        cc.sys.localStorage.setItem("mapData_sailing", jsonData);
        Utils.save_json_file("mapData_sailing.json", jsonData);
    }
}

export default MapEditor;