// +-+
import { Utils } from './Utils';
import { PropTypeEnum, BundleName, BuildTypeEnum } from './Constants';
import { gm } from './GameManager';
import { Build } from "../../common/configs/build";

const { ccclass, property } = cc._decorator;

@ccclass
class BuildInfo extends cc.Component {
    @property(cc.Label)
    private lblBuildName: cc.Label | null = null;

    @property(cc.Label)
    private lblBuildLvl: cc.Label | null = null;

    @property([cc.Node])
    private attrNode: cc.Node[] = [];

    @property(cc.Node)
    private btnGet: cc.Node | null = null;

    @property(cc.Label)
    private lblnum: cc.Label | null = null;

    @property(cc.Sprite)
    private productIconSpr: cc.Sprite | null = null;

    @property([cc.SpriteFrame])
    private btnSprframeList: cc.SpriteFrame[] = [];

    private _buildCfg: Build | null = null;
    private _buildID: number = 0;
    private _reciveTime: number = 0;
    private _curProductNum: number = 0;
    private timeContainer: number = 0;

    protected onEnable(): void {
        gm.audio.play_effect(gm.const.AUDIO_8_BUILDING_OPEN_CLOSE);
        this._buildID = gm.ui.get_module_args(gm.const.BUILDINFO.key) as number;
        this._buildCfg = gm.data.config_data.getBuildCfgByID(this._buildID);
        if (this._buildCfg) {
            this.lblBuildName.string = this._buildCfg.buildName;
            this.lblBuildLvl.string = "  Lv." + this._buildCfg.buildLv;
            this.refreshPanel();
        }
    }

    private refreshPanel(): void {
        for (let index = 0; index < this.attrNode.length; index++) {
            this.attrNode[index].active = false;
        }
        this.btnGet.active = false;
        if (0 < this._buildCfg.currency && 2 <= this._buildCfg.rate.length) {
            const cfgByID = gm.data.config_data.getItemCfgByID(this._buildCfg.currency);
            if (cfgByID) {
                this.attrNode[0].active = true;
                this.attrNode[0].children[1].getComponent(cc.Label).string = Utils.format_time(this._buildCfg.rate[1]);
                this.attrNode[0].children[2].getComponent(cc.Label).string = "Sản xuất " + this._buildCfg.rate[0] + " " + cfgByID.name;
                Utils.async_set_sprite_frame(this.attrNode[0].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_Time");
                this.attrNode[1].active = true;
                this.attrNode[1].children[1].getComponent(cc.Label).string = "0/" + this._buildCfg.capacity;
                this.attrNode[1].children[2].getComponent(cc.Label).string = "Lưu trữ tối đa";
                let currency = this._buildCfg.currency;

                if (cfgByID.type == PropTypeEnum.WOOD_TYPE) {
                    currency = 11004;
                } else if (cfgByID.type == PropTypeEnum.IRON_TYPE) {
                    (currency = 11005);
                }

                Utils.async_set_sprite_frame(this.attrNode[1].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/" + currency);
                this.attrNode[2].active = true;
                this.attrNode[2].children[1].getComponent(cc.Label).string = this._buildCfg.hp + "";
                this.attrNode[2].children[2].getComponent(cc.Label).string = "Sinh mạng";
                Utils.async_set_sprite_frame(this.attrNode[2].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_HP");
                this._reciveTime = 0;
                this._curProductNum = 0;
                const productData = gm.data.mapCell_data.buildData[this._buildCfg.buildType].productData;

                if (productData) {
                    if (0 == productData.fullTime) {
                        this._curProductNum = productData.curNum;
                    } else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                        if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                            this._curProductNum = productData.curNum;
                            this._reciveTime = productData.beginTime + productData.productCd - Math.floor(Date.now() / 1e3);
                        } else {
                            const _number = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd);
                            this._curProductNum = _number * productData.productNum;
                            this._reciveTime = productData.beginTime + (_number + 1) * productData.productCd - Math.floor(Date.now() / 1e3);
                        }
                    } else {
                        this._curProductNum = productData.maxNum;
                    }
                }

                if (this._buildCfg.buildType != BuildTypeEnum.WHARFTAX_TYPE) {
                    this.btnGet.active = true;
                    this.btnGet.children[0].getComponent(cc.Sprite).spriteFrame = 0 < this._curProductNum ? this.btnSprframeList[0] : this.btnSprframeList[1];
                    this.btnGet.children[0].getComponent(cc.Button).interactable = 0 < this._curProductNum;
                    Utils.async_set_sprite_frame(this.productIconSpr, BundleName.MAP, "res/" + this._buildCfg.currency);
                    this.attrNode[1].children[1].getComponent(cc.Label).string = this._curProductNum + "/" + this._buildCfg.capacity;
                    this.lblnum.string = "" + this._curProductNum;

                } else {
                    const roleBarrelData = gm.data.mapCell_data.roleBarrelData;
                    if (roleBarrelData) {
                        this.attrNode[1].children[1].getComponent(cc.Label).string = roleBarrelData.curBarrelNum + "/" + this._buildCfg.capacity;
                        if (roleBarrelData.curBarrelNum < roleBarrelData.maxBarrelNum && Math.floor(Date.now() / 1e3) < roleBarrelData.nextFreeBarrelTime) {
                            this._reciveTime = roleBarrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1e3);
                        }
                    }
                    this.attrNode[1].children[1].getComponent(cc.Label).string = gm.data.mapCell_data.roleBarrelData.curBarrelNum + "/" + gm.data.mapCell_data.roleBarrelData.maxBarrelNum;
                }
            }

        } else if (this._buildCfg.buildType == BuildTypeEnum.TOWER_TYPE) {
            this._reciveTime = 0;
            this.attrNode[0].active = 0 < this._buildCfg.hp;
            Utils.async_set_sprite_frame(this.attrNode[0].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_HP");
            this.attrNode[0].children[1].getComponent(cc.Label).string = this._buildCfg.hp + "";
            this.attrNode[0].children[2].getComponent(cc.Label).string = "Sinh mạng";
            this.attrNode[1].active = 0 < this._buildCfg.attack;
            Utils.async_set_sprite_frame(this.attrNode[1].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_Defense");
            this.attrNode[1].children[1].getComponent(cc.Label).string = this._buildCfg.attack + "";
            this.attrNode[1].children[2].getComponent(cc.Label).string = "Phòng thủ";
            this.attrNode[2].active = 0 < this._buildCfg.defense;
            Utils.async_set_sprite_frame(this.attrNode[2].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/attrIcon/Perk_Attackers");
            this.attrNode[2].children[1].getComponent(cc.Label).string = this._buildCfg.defense + "";
            this.attrNode[2].children[2].getComponent(cc.Label).string = "Tấn công";
        }

    }

    protected update(dt: number): void {
        if (0 < this._reciveTime) {
            this.timeContainer += dt;
            if (1 <= this.timeContainer) {
                --this.timeContainer;
                this._reciveTime--;
                if (this._reciveTime <= 0) {
                    if (this._buildCfg.buildType != BuildTypeEnum.WHARFTAX_TYPE) {
                        this._curProductNum = 0;
                        const productData = gm.data.mapCell_data.buildData[this._buildCfg.buildType].productData;
                        if (productData) {
                            if (0 == productData.fullTime) {
                                this._curProductNum = productData.curNum;
                            } else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                                if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                                    this._curProductNum = productData.curNum;
                                    this._reciveTime = productData.beginTime + productData.productCd - Math.floor(Date.now() / 1e3);
                                } else {
                                    const _number = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd);
                                    this._curProductNum = _number * productData.productNum;
                                    this._reciveTime = productData.beginTime + (_number + 1) * productData.productCd - Math.floor(Date.now() / 1e3);
                                }

                            } else {
                                this._curProductNum = productData.maxNum;
                            }
                        }
                        this.attrNode[1].children[1].getComponent(cc.Label).string = this._curProductNum + "/" + this._buildCfg.capacity;
                        this.lblnum.string = "" + this._curProductNum;
                    } else {
                        this._curProductNum = 0;
                        const roleBarrelData = gm.data.mapCell_data.roleBarrelData;
                        if (roleBarrelData) {
                            this.attrNode[1].children[1].getComponent(cc.Label).string = roleBarrelData.curBarrelNum + "/" + this._buildCfg.capacity;
                            if (roleBarrelData.curBarrelNum < roleBarrelData.maxBarrelNum && Math.floor(Date.now() / 1e3) < roleBarrelData.nextFreeBarrelTime) {
                                this._reciveTime = roleBarrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1e3);
                            }
                        }
                    }
                    if (0 < this._reciveTime) {
                        this.attrNode[0].children[1].getComponent(cc.Label).string = Utils.format_time(this._reciveTime);
                    } else {
                        this.attrNode[0].children[1].getComponent(cc.Label).string = Utils.format_time(this._buildCfg.rate[1]);
                    }
                } else {
                    this.attrNode[0].children[1].getComponent(cc.Label).string = Utils.format_time(this._reciveTime);
                }
            }
        }


    }

    private onClickClose(): void {
        gm.audio.play_effect(gm.const.AUDIO_8_BUILDING_OPEN_CLOSE);
        gm.ui.async_hide_module(gm.const.BUILDINFO);
    }

    private onClickGet(): void {
        gm.data.mapCell_data.getBuildProduct(this._buildCfg?.buildType);
        this.refreshPanel();
        gm.ui.show_coin_fly(this._buildCfg?.currency, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
        gm.ui.emit("item_children_refresh", gm.data.mapCell_data.buildData[this._buildCfg.buildType].cellID);
    }

    protected onDisable(): void { }
}

export default BuildInfo;