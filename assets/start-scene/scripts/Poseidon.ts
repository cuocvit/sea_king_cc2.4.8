//
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { BANNER_AD_TYPE } from './ChannelManager';
import { ReportData } from './NetUtils';
import { SkillConfig } from '../../common/configs/skill';

const { ccclass, property } = cc._decorator;

@ccclass
class Poseidon extends cc.Component {
    @property(cc.Node)
    private roleNode: cc.Node | null = null;

    @property(cc.Node)
    private skillNode: cc.Node | null = null;

    @property(cc.Label)
    private lblHeroName: cc.Label | null = null;

    @property(cc.Label)
    private lblSkillName: cc.Label | null = null;

    @property(cc.Label)
    private lblDesc: cc.Label | null = null;

    @property(cc.Label)
    private lblNeedNum: cc.Label | null = null;

    @property(cc.Label)
    private lblOwnNum: cc.Label | null = null;

    @property(cc.ProgressBar)
    private bar: cc.ProgressBar | null = null;

    @property(cc.Node)
    private btnUpgradeLvl: cc.Node | null = null;

    @property(cc.Node)
    private btnUpgrade: cc.Node | null = null;

    @property(cc.Node)
    private lockIcon: cc.Node | null = null;

    @property(cc.Node)
    private maxNode: cc.Node | null = null;

    @property(cc.Node)
    private handAnim: cc.Node | null = null;

    @property(cc.Animation)
    private upLvHandAnim: cc.Animation | null = null;

    private _SkillListCfg: Record<string, SkillConfig[]>;
    private _skillCfg: SkillConfig | null = null;
    private skillIDList: number[] = [];
    private heroIDList: number[] = [];
    private _curIndex: number = 0;
    private lastHeroID: number = 0;
    private needNum: number = 0;
    private POSEIDONNUM: number = 15;
    private POSEIDONID: number = 22001;
    private YELLOWCOLOR: cc.Color = cc.Color.BLACK.fromHEX("#FED025");

    protected onEnable(): void {
        this.handAnim.active = gm.data.mapCell_data.is_upgrade_skill == 0;
        this.upLvHandAnim.node.active = false;
        gm.data.mapCell_data.is_upgrade_skill = 1;
        gm.data.mapCell_data.async_write_data();
        this.skillIDList = [];
        this._curIndex = 0;
        gm.ui.on("update_soul_num", this.updateSoulNum, this);
        this._SkillListCfg = gm.data.config_data.getSkillList();
        for (let t in this._SkillListCfg) {
            if (gm.data.mapCell_data.getReelUnlcokHeroID(this._SkillListCfg[t][0].heroid)) {
                this.skillIDList.push(parseInt(t));
                this.heroIDList.push(this._SkillListCfg[t][0].heroid);
            }
        }
        this.refreshPanel();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private updateSoulNum(): void {
        const getMySoulNum: number = gm.data.mapCell_data.getMySoulNum();
        this.lblOwnNum.string = "Linh hồn hiện có: " + getMySoulNum;
    }

    private refreshPanel(): void {
        const skillID: number = this.skillIDList[this._curIndex];
        const skillData = gm.data.mapCell_data.getRoleSkillData(skillID);
        this._skillCfg = this._SkillListCfg[skillID][skillData.lvl];

        if (this._skillCfg) {
            if (this.lastHeroID != this._skillCfg.heroid) {
                this.lastHeroID = this._skillCfg.heroid;

                if (this.roleNode.childrenCount >= 0) {
                    gm.pool.put_children(this.roleNode);
                    gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + this._skillCfg.heroid, NodePoolItem, (component) => {
                        if (component) {
                            if (this.roleNode?.childrenCount == 0) {
                                this.roleNode?.addChild(component.node);
                                component.node.setPosition(0, -69, 0);
                                component.node.scale = 1.5;
                                const skeleton = component.getComponent(sp.Skeleton);
                                if (skeleton) {
                                    skeleton.setSkin("front");
                                    skeleton.setAnimation(0, "stay", true);
                                }
                            } else {
                                gm.pool.put(component.node);
                            }
                        }
                    });
                }
            }

            this.lblHeroName.string = this._skillCfg.name;
            this.lblSkillName.string = "lv." + skillData.lvl;
            this.lblDesc.string = this._skillCfg.desc;
            this.lockIcon.active = skillData.lvl <= 0;

            this.lblDesc.node.color = skillData.lvl <= 0 ? cc.Color.GRAY : this.YELLOWCOLOR;
            this.lblSkillName.node.color = skillData.lvl <= 0 ? cc.Color.GRAY : this.YELLOWCOLOR;

            if (skillData.lvl <= 0) {
                Utils.set_sprite_state(this.skillNode, cc.Sprite.State.GRAY);
            } else {
                Utils.set_sprite_state(this.skillNode, cc.Sprite.State.NORMAL);
            }

            Utils.async_set_sprite_frame(this.skillNode?.getComponent(cc.Sprite), BundleName.COMMON, "res/heroSkill/" + this._skillCfg.icon);

            this.maxNode.active = this._skillCfg.sea_soul > 0;
            this.needNum = 0;

            if (this.maxNode?.active) {
                const mySoulNum: number = gm.data.mapCell_data.getMySoulNum();
                this.lblNeedNum.string = "Linh hồn: " + skillData.num + "/" + this._skillCfg.sea_soul;
                this.bar.progress = skillData.num / this._skillCfg.sea_soul;
                this.lblOwnNum.string = "Linh hồn hiện có: " + mySoulNum;
                this.needNum = this._skillCfg.sea_soul - skillData.num;
                this.btnUpgrade.active = false;
                this.btnUpgradeLvl.active = false;

                if (skillData.num >= this._skillCfg.sea_soul) {
                    this.btnUpgradeLvl.active = true;
                } else {
                    this.btnUpgrade.active = true;
                }
            }
        }
    }

    private onClickUpgradeLvl(): void {
        const skillID: number = this.skillIDList[this._curIndex];
        gm.data.mapCell_data.upgradeRoleSkillData(skillID);

        const heroID: number = this.heroIDList[this._curIndex];
        const skillData = gm.data.mapCell_data.getRoleSkillData(skillID);

        if ([31001, 32001, 33001, 34001, 35001, 37001, 38001].includes(heroID)) {
            ReportData.instance.report_once_point(heroID + skillData.lvl - 1);
        }

        this.upLvHandAnim.node.active = true;
        this.upLvHandAnim?.play();
        this.refreshPanel();
    }

    private onClickAddSoul(): void {
        if (this.maxNode?.active && gm.data.mapCell_data.getMySoulNum() <= 0) {
            gm.ui.async_show_module(gm.const.GETPOSEIDONOP);
        } else {
            this.upLvHandAnim.node.active = true;
            this.upLvHandAnim?.play();
            gm.data.mapCell_data.addRoleSkillItemData(this.skillIDList[this._curIndex], this.needNum);
            this.handAnim.active = false;
            this.refreshPanel();
        }
    }

    private onClickLeft(): void {
        this._curIndex = this._curIndex == 0 ? this.skillIDList.length - 1 : this._curIndex - 1;
        this.refreshPanel();
    }

    private onClickRight(): void {
        this._curIndex = this._curIndex == this.skillIDList.length - 1 ? 0 : this._curIndex + 1;
        this.refreshPanel();
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.POSEIDON);
    }

    protected onDisable(): void {
        gm.ui.off("update_soul_num", this.updateSoulNum, this);
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }
}

export default Poseidon;