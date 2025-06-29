import { gm } from '../../start-scene/scripts/GameManager';
import { BarracksItem } from "./BarracksItem";
import { BuildTypeEnum } from '../../start-scene/scripts/Constants';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { Build } from '../../common/configs/build';

const { ccclass, property } = cc._decorator;

@ccclass
class BraraclList extends GameModule {
    @property([cc.Node])
    private heroItemList: cc.Node[];

    @property(cc.Node)
    private hero_list: cc.Node | null;

    @property(cc.Button)
    private btn_close: cc.Button | null;

    @property(cc.Button)
    private btn_book: cc.Button | null;

    @property(cc.Button)
    private btn_back: cc.Button | null;

    @property(cc.Label)
    private hp_lbl: cc.Label | null;

    @property(cc.Label)
    private lvl_lbl: cc.Label | null;

    private _mainbgStartRolation: number;
    private _endRotation: number;
    private _startX: number;
    private _endX: number;
    private _curIndex: number;
    private _max_list_count: number;
    private readonly ROTATION_PER_CARD: number;
    private _animation: cc.Animation | null;
    private readonly _posArr: cc.Vec3[];
    private _maxHeroCount: number;
    private _moveX: number;

    private constructor() {
        super();
        this.heroItemList = [];
        this.hero_list = null;
        this.btn_close = null;
        this.btn_book = null;
        this.btn_back = null;
        this.hp_lbl = null;
        this.lvl_lbl = null;
        this._mainbgStartRolation = 0;
        this._endRotation = 0;
        this._startX = 0;
        this._endX = 0;
        this._curIndex = 0;
        this._max_list_count = 0;
        this.ROTATION_PER_CARD = 15;
        this._animation = null;
        this._posArr = [
            cc.v3(-400, 1500), cc.v3(0, 1552), cc.v3(400, 1500),
            cc.v3(774, 1345), cc.v3(1100, 1096), cc.v3(1344, 776),
            cc.v3(1500, 404), cc.v3(1551, 2), cc.v3(1500, -403),
            cc.v3(1344, -776), cc.v3(1100, -1096), cc.v3(777, -1342),
            cc.v3(400, -1500), cc.v3(0, -1552), cc.v3(-400, -1500),
            cc.v3(-774, -1345), cc.v3(-1100, -1096), cc.v3(-1344, -776),
            cc.v3(-1500, -404), cc.v3(-1551, 2), cc.v3(-1500, 403),
            cc.v3(-1344, 776), cc.v3(-1100, 1096), cc.v3(-777, 1342)
        ];

        this._maxHeroCount = 0;
        this._moveX = 1;
    }

    protected onEnable(): void {
        this._maxHeroCount = gm.data.mapCell_data.barracks_unlock_data.length;
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.stop();
        this._animation.play("barracks_open");
        gm.audio.play_effect(gm.const.AUDIO_2_BARRACK_OPEN);
        gm.data.mapCell_data.sortTask(gm.data.mapCell_data.barracks_unlock_data);

        this._curIndex = 0;
        let firstUnlockedIndex = -1;
        for (let index = 0; index < gm.data.mapCell_data.barracks_unlock_data.length; ++index) {
            if (gm.data.mapCell_data.barracks_unlock_data[index].ani_state == 0 && gm.data.mapCell_data.barracks_unlock_data[index].state == 1 && firstUnlockedIndex == -1) {
                firstUnlockedIndex = index;
                this._curIndex = firstUnlockedIndex;
                break;
            }
        }
        const buildData = gm.data.mapCell_data.buildData[BuildTypeEnum.BARRACKS_TYPE];
        const buildConfigData = gm.config.get_row_data("BuildConfigData", buildData.buildID.toString()) as Build;

        this.hp_lbl.string = buildConfigData.hp + "";
        this.lvl_lbl.string = "Lv." + buildData.buildLvl;
        this.refreshPanel();

        this.hero_list.rotation = -this._curIndex * this.ROTATION_PER_CARD;
        this.hero_list.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    private refreshPanel(): void {
        this._curIndex;
        let heroIdx;
        const curIndex = this._curIndex;
        for (let index = 0; index < this.heroItemList.length; index++) {
            if (this._curIndex != 0 || index != 0) {
                if (this._curIndex == this._maxHeroCount - 1) {
                    if (index == 3 || index == 2) {
                        this.heroItemList[index].active = false;
                        continue;
                    }
                } else if (this._curIndex == this._maxHeroCount - 2 && index == 3) {
                    this.heroItemList[index].active = false;
                    continue;
                }

                heroIdx = this._curIndex + index;
                this.heroItemList[index].zIndex = 1 == index ? 5 : 3 - index + 1;
                this.heroItemList[index].active = true;
                this.heroItemList[index].position = this._posArr[heroIdx % 24];
                this.heroItemList[index].rotation = 15 * (curIndex + index - 1);
                this.heroItemList[index].getComponent(BarracksItem).update_view(gm.data.mapCell_data.barracks_unlock_data[this._curIndex + index - 1].heroId, 1 == index, this._curIndex + index - 1);

            } else {
                this.heroItemList[index].active = false;
            }
        }
    }


    protected onDisable(): void {
        this.hero_list.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    private onTouchStart(event: cc.Event.EventTouch): void {
        if (this.hero_list.getNumberOfRunningActions() > 0) {
            this.hero_list.stopAllActions();
            this.hero_list.rotation = this._endRotation, this.checkEndPos();
        }

        this._mainbgStartRolation = this.hero_list.rotation;
        this._startX = event.touch.getLocation().x;
        gm.audio.play_effect(gm.const.AUDIO_1_BARRACK_CARD_MOVE);
    }

    public changeItemRolation(): void { }

    private onTouchMove(event): void {
        if (Math.abs(event.touch.getLocation().x - event.touch._startPoint.x) >= 15) {
            this.hero_list.rotation = this._mainbgStartRolation + Math.floor((event.touch.getLocation().x - event.touch._startPoint.x) / 56);
            this._endX = event.touch.getLocation().x;
            console.log(this.hero_list.rotation);

            if (this.hero_list.rotation <= this._mainbgStartRolation - this.ROTATION_PER_CARD) {
                this.hero_list.rotation = this._mainbgStartRolation - this.ROTATION_PER_CARD;
            }
            if (this.hero_list.rotation >= this._mainbgStartRolation + this.ROTATION_PER_CARD) {
                this.hero_list.rotation = this._mainbgStartRolation + this.ROTATION_PER_CARD;
            }
            this.checkEndPos();
        }
    }

    private onTouchEnd(event): void {
        if (!(Math.abs(event.touch.getLocation().x - event.touch._startPoint.x) < 14)) {
            if (Math.abs(this.hero_list.rotation - this._mainbgStartRolation) < 5) {
                this.setMapChangeAnma(this._mainbgStartRolation);
            }
            else if (this.hero_list.rotation < this._mainbgStartRolation) {
                this.setMapChangeAnma(this._mainbgStartRolation - this.ROTATION_PER_CARD);
            }
            else if (this.hero_list.rotation > this._mainbgStartRolation) {
                this.setMapChangeAnma(this._mainbgStartRolation + this.ROTATION_PER_CARD);
            }
            else {
                this.setMapChangeAnma(this._mainbgStartRolation);
            }
        }
    }

    private setMapChangeAnma(num: number): void {
        this.hero_list.stopAllActions();
        var positionRotation = this.hero_list.rotation > num ? -1 : 1;
        this._moveX = positionRotation;
        this._endRotation = num;

        if (this._endRotation == 0) {
            this.setCurIndex(0);
        }
        else if (this._mainbgStartRolation != num) {
            this.setCurIndex(positionRotation);
        }
        else {
            this.setCurIndex(99);
        }

        this.refreshPanel();
        this.hero_list.runAction(cc.sequence(
            cc.rotateTo(0.2, num + 2 * positionRotation).easing(cc.easeSineOut()),
            cc.rotateTo(0.21, num + -1 * positionRotation).easing(cc.easeSineOut()),
            cc.rotateTo(0.3, num).easing(cc.easeCubicActionOut()),
            cc.callFunc(() => {
                this.hero_list.rotation = num;
                this.checkEndPos();
            })));
    }

    private checkEndPos(): void {
        this.hero_list.rotation = 0 < this.hero_list.rotation ? 0 : this.hero_list.rotation;
        this.hero_list.rotation = this.hero_list.rotation < -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD ? -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD : this.hero_list.rotation;
    }

    private setCurIndex(index: number): void {
        if (index != 0) {
            if (index != 99) {
                this._curIndex -= index;
                this._curIndex;
                this._maxHeroCount;
            }
        } else {
            this._curIndex = 0;
        }
    }


    private onTouchCancel(): void {
        if (this.hero_list.rotation < 0 && this.hero_list.rotation > -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD) {
            if (this._endX > this._startX) {
                this.hero_list.rotation = this._mainbgStartRolation + this.ROTATION_PER_CARD;
            } else {
                this._endX < this._startX && (this.hero_list.rotation = this._mainbgStartRolation - this.ROTATION_PER_CARD);
            }
        }

    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.btn_close.node || event.target == this.btn_back.node) {
            this._animation.stop();
            this._animation.play("barracks_close");
            this._animation.on("finished", () => {
                if ("barracks_close" == this._animation.currentClip.name) {
                    gm.ui.async_hide_module(gm.const.BARRACKS_LIST);
                }
            })
        }
        else {
            event.target;
            this.btn_book.node;
        }
    }
}
