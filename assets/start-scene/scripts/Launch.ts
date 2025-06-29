// @
import { ReportData } from "./NetUtils";

// @
export enum LoadingState {
    START = 0,
    START_FULL = 1,
    CAVES_FULL = 2,
    REWARD_FULL = 3,
    BOAT_OUT = 4,
    BOAT_IN = 5,
    COMPLETE = 6,
}

const { ccclass, property } = cc._decorator;

//
@ccclass("Launch")
export class Launch extends cc.Component {
    // @
    private static _instance: Launch = null;

    // @
    @property(cc.Node)
    private bg_node: cc.Node = null;

    // (not used) ???
    @property(cc.Node)
    protected notice_node: cc.Node = null;

    // (not used) ???
    @property(cc.RichText)
    protected notice_txt: cc.RichText = null;

    // (not used) ???
    @property(cc.Label)
    protected prompt_lbl: cc.Label = null;

    @property(cc.ProgressBar)
    private bar_node: cc.ProgressBar | null = null;

    @property(cc.ProgressBar)
    private bar_node_2: cc.ProgressBar | null = null;

    // @
    private _low_speed: number;
    private _low_speed_2: number;
    private _total_len: number;
    private _total_len_2: number;
    private _high_speed: number;
    private _state: LoadingState;

    // @
    private constructor() {
        super();
        this._low_speed = 20;
        this._low_speed_2 = 100;
        this._total_len = 0;
        this._total_len_2 = 0;
        this._high_speed = 500;
        // this._state = LoadingState.START
    }

    public static get instance(): Launch {
        if (this._instance === null) {
            console.error("Call after the singleton is instantiated");
        }
        return this._instance!;
    }

    protected onLoad(): void {
        Launch._instance = this;
        cc.director.once(
            cc.Director.EVENT_AFTER_DRAW,
            () => {
                this.scheduleOnce(() => {
                    this.after_first_draw();
                });
            },
            this
        );
        cc.game.on(cc.game.EVENT_HIDE, this.on_game_hide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.on_game_show, this);
    }

    private after_first_draw(): void {
        ReportData.instance.report_once_point(10010);
        this.state = LoadingState.START;
        cc.Canvas.instance.node.addComponent("GameMain");
    }

    protected onDestroy(): void {
        cc.game.off(cc.game.EVENT_HIDE, this.on_game_hide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.on_game_show, this);
    }

    private on_game_hide(): void {
        cc.log("Switch to the background and pause the game");
        cc.game.pause();
    }

    private on_game_show(): void {
        cc.log("Switch to the background and resume the game");
        cc.game.resume();
    }

    public get state(): LoadingState {
        return this._state;
    }

    public set state(value: LoadingState) {
        if (this._state !== value) {
            this._state = value;
        }
        if (value === LoadingState.COMPLETE) {
            this.bg_node!.active = false;
        }
    }

    update(deltaTime: number): void {
        if (this._state === LoadingState.COMPLETE) {
            this._total_len += deltaTime * this._high_speed;
            this._total_len_2 += deltaTime * this._high_speed;
            this.bar_node!.progress = Math.floor(this._total_len) / 100;
            this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
            if (this._total_len >= 100) {
                this.bg_node!.active = false;
            }
            /* if (cc.sys.platform === cc.sys.OPPO_GAME) {
                qg.setLoadingProgress({ progress: this._total_len });
            } */
        } else {
            if (this._total_len < 90) {
                this._total_len += deltaTime * this._low_speed;
                this.bar_node!.progress = Math.floor(this._total_len) / 100;
            }
            this._total_len_2 += deltaTime * this._low_speed_2;
            this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
        }
    }
}
