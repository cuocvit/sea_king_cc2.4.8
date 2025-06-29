// +-+
import { gm } from './GameManager';
import { BundleName, HeroTypeEnum } from './Constants';
import { Utils } from './Utils';
import { NodePoolItem } from './NodePoolItem';
import { SkillConfig } from '../../common/configs/skill';
import { SuperHeroVO } from './MapCellCfgData';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class SuperHeroPanel extends cc.Component {
    @property(cc.Label)
    private lblLvl: cc.Label | null = null;

    @property(cc.Label)
    private lblName: cc.Label | null = null;

    @property(cc.Label)
    private lblDesc: cc.Label | null = null;

    @property(cc.Node)
    private attrNode: cc.Node | null = null;

    @property(cc.Node)
    private skillNode: cc.Node | null = null;

    @property(cc.Label)
    private reliveTime: cc.Label | null = null;

    @property(cc.Node)
    private btnSkillNode: cc.Node | null = null;

    @property(cc.Label)
    private bottomTips: cc.Label | null = null;

    @property(cc.Node)
    private heroNode: cc.Node | null = null;

    @property(cc.Node)
    private superHeroHp: cc.Node | null = null;

    @property(cc.Button)
    private receive_btn: cc.Button | null = null;

    private _heroCfg: HeroConfig | null = null;
    private _superHeroData: SuperHeroVO | null = null;
    private _heroId: number = 0;
    private _cellId: number = 0;
    private _is_show_receive: boolean = false;
    private _reciveTime: number = 0;
    private _timerContainer: number = 0;

   protected onEnable(): void {
        const args = gm.ui.get_module_args(gm.const.SUPERHEROOP.key);
        this._heroId = args[0];
        this._cellId = args[1];
        this._is_show_receive = !!args[2];
        this.superHeroHp.active = false;
        this.refreshPanel();
    }

   protected onDisable(): void {
        gm.pool.put_children(this.heroNode);
    }

    private  refreshPanel(): void {
        gm.pool.put_children(this.heroNode);
        this._heroCfg = gm.data.config_data.getHeroCfgByID(this._heroId);
        if (!this._heroCfg) return;
        this._reciveTime = 0;
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + this._heroId, NodePoolItem, (nodePoolItem) => {
            if (this.heroNode?.childrenCount === 0 && nodePoolItem) {
                this.heroNode.addChild(nodePoolItem.node);
                nodePoolItem.node.setPosition(0, 0);
                nodePoolItem.node.scale = 1.5;
                const skeleton = nodePoolItem.getComponent(sp.Skeleton);
                if (skeleton) {
                    skeleton.setSkin("front");
                    skeleton.setAnimation(0, "stay", true);
                }
            } else {
                if (nodePoolItem) gm.pool.put(nodePoolItem.node);
            }
        });

        if (this._heroCfg.hero_type === HeroTypeEnum.SUPER_HERO_TYPE) {
            this.bottomTips.string = "Có thể sở hữu nhiều anh hùng cùng lúc. Các anh hùng giống nhau có thể hợp nhất , đột phá lên cấp cao hơn!";
            this._superHeroData = gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
            if (this._superHeroData) {
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
            }
            this.superHeroHp.active = true;
            this.btnSkillNode.active = true;
        } else {
            this.bottomTips.string = this._heroCfg.occupation === 12 ? "Hợp nhất để tạo ra nhiều tháp phòng thủ mạnh hơn, nâng cao khả năng bảo vệ!" : "Hợp nhất để triệu hồi nhiều Thủy Tinh Linh cấp cao hơn, gia cố lá chắn bảo vệ thành trì!";
            this._superHeroData = gm.data.mapCell_data.getSuperHeroDataByID(this._heroId, this._cellId);
            this.btnSkillNode.active = false;
        }

        if (this._is_show_receive) {
            this.receive_btn.node.active = true;
            this.btnSkillNode.active = false;
        } else {
            this.receive_btn.node.active = false;
        }

        this.lblLvl.string = "Lv." + this._heroCfg.lv;
        this.lblName.string = this._heroCfg.name;
        this.lblDesc.string = "" + this._heroCfg.dec;

        const attributes: number[] = [this._heroCfg.hp, this._heroCfg.attack, this._heroCfg.defense, this._heroCfg.speed];
        for (let i = 0; i < this.attrNode.childrenCount; i++) {
            this.attrNode.children[i].active = attributes[i] > 0;
            if (this.attrNode?.children[i].active) {
                this.attrNode.children[i].children[1].getComponent(cc.Label).string = "" + attributes[i];
            }
        }

        for (let i = 0; i < this.skillNode.childrenCount; i++) {
            this.skillNode.children[i].active = false;
            const skillData = gm.config.get_row_data("SkillConfigData", this._heroCfg.skill_id + "", (i + 1) + "") as SkillConfig;
            if (skillData) {
                this.skillNode.children[i].active = true;
                this.skillNode.children[i].children[0].active = true;
                this.skillNode.children[i].children[0].children[0].getComponent(cc.Label).string ="Mở khóa cấp "+ (i + 1);
                this.skillNode.children[i].children[1].getComponent(cc.Label).string = "";
                Utils.async_set_sprite_frame(this.skillNode?.children[i].children[2].getComponent(cc.Sprite), BundleName.COMMON, "res/heroSkill/" + this._heroCfg.skill_id + "_" + (i + 1));
                this.skillNode.children[i].children[2].color = cc.Color.GRAY;

                if (this._heroCfg.lv > i) {
                    this.skillNode.children[i].children[0].active = false;
                    this.skillNode.children[i].children[1].getComponent(cc.Label).string = "" + skillData.desc;
                    this.skillNode.children[i].children[2].color = cc.Color.WHITE;
                }
            }
        }
        this.updateBtnDesc();
    }

    private updateBtnDesc(): void {
        if (this.btnSkillNode?.active && this._superHeroData) {
            this.btnSkillNode.children[3].getComponent(cc.Label).string = "(Hồi phục " + gm.const.SUPERHERORECIVEHP + " máu mỗi phút)";
            this.superHeroHp.children[0].children[0].scaleX = Math.min(this._superHeroData.hp / this._superHeroData.maxHp, 1);
            this.superHeroHp.children[1].getComponent(cc.Label).string = this._superHeroData.hp + "/ " + this._superHeroData.maxHp;

            if (this._superHeroData.heroState === 1) {
                this.superHeroHp.active = true;
                this.superHeroHp.children[0].children[0].scaleX = 0;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "Hồi sinh ngay";
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils.format_time_miunte(this._reciveTime);
            } else if (this._superHeroData.hp < this._superHeroData.maxHp) {
                this.superHeroHp.active = true;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "Khôi phục máu";
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils.format_time_miunte(this._reciveTime);
            } else {
                this.btnSkillNode.active = false;
                this.superHeroHp.children[0].children[0].scaleX = 1;
            }
        }
    }

    public update(deltaTime: number): void {
        if (this._reciveTime > 0) {
            this._timerContainer += deltaTime;
            if (this._timerContainer >= 1) {
                this._timerContainer--;
                this._reciveTime--;
                this.showreLiveTime();
            }
        }
    }

    private showreLiveTime(): void {
        this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils.format_time_miunte(this._reciveTime);
        if (this._superHeroData?.heroState === 1) {
            if (this._reciveTime <= 0) {
                this._superHeroData = gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "立即满血";
            }
            this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils.format_time_miunte(this._reciveTime);
        } else if (this._superHeroData?.heroState == 0 && this._reciveTime <= 0) {
            if (this._superHeroData.hp < this._superHeroData.maxHp) {
                this._superHeroData = gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils.format_time_miunte(this._reciveTime);
                this.superHeroHp.children[0].children[0].scale = Math.min(this._superHeroData.hp / this._superHeroData.maxHp, 1);
            } else {
                this._reciveTime = 0;
                this.btnSkillNode.active = false;
                this.superHeroHp.children[0].children[0].scale = 1;
            }
            this.superHeroHp.children[1].getComponent(cc.Label).string = this._superHeroData.hp + "/ " + this._superHeroData.maxHp;
        }
    }

    private onWatchAd(): void {
        gm.channel.show_video_ad(this.watchAdCD, this);
    }

    private watchAdCD(): void {
        if (this._superHeroData && this._superHeroData.heroState == 0) {
            gm.data.mapCell_data.setSuperHeroFullHpByID(this._heroId, this._cellId);
        } else {
            gm.data.mapCell_data.setSuperHeroReliveByID(this._heroId, this._cellId);
        }
        this.refreshPanel();
    }

    private onClosePanel(): void {
        gm.ui.async_hide_module(gm.const.SUPERHEROOP);
    }
}

export default SuperHeroPanel;