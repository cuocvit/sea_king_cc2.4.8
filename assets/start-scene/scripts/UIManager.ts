//
import { EventEmitter } from "./EventEmitter";
import { gm } from "./GameManager";
import {
    LayerType,
    BundleName,
    RewardIdEnum,
    ModuleType,
    INotice,
} from "./Constants";
import { Utils } from "./Utils";
import { CoinFlyAnim } from "./CoinFlyAnim";
import MainMapUI from "./MainMapUI";
import NewerGuideOp from "./NewerGuideOp";
import { ItemFly } from "./ItemFly";
import { LoadingState } from "./Launch";
import { MailDetailsArgs } from "../../mail/scripts/MailDetails";
import { DoubleOp } from "./GetDoubleRewardOp";
import { Loading } from "./Loading";
import { Mail } from "../../mail/scripts/Mail";
import Sign from "../../sign/scripts/Sign";
import { Task, TaskArgs } from "../../task/scripts/Task";
import { Ladder } from "../../ladder/scripts/Ladder";
import { Start } from "../../start/scripts/Start";
import { AutoMergeMessage } from "./AutoMergeMessage";
import OfflineOp from "./OfflineOp";
import { GuideConfig } from "../../common/configs/guide";
import SceneBookView from "../../book/scripts/SceneBookView";
import { GameModule } from "./GameModule";
import { Fight } from "../../fight/scripts/Fight";
import { Login } from "../../login/scripts/Login";

export interface ModuleAgrs {
    itemID: number;
    itemNum: number;
    buildType: number;
    buildItemID: number;
}

interface Notice extends GameModule {
    show_notice?: (message: string) => void;
    show_fly_notice?: (
        message: string,
        duration: number,
        position: cc.Vec3
    ) => void;
}

type Map =
    | Loading
    | Mail
    | MainMapUI
    | Sign
    | Task
    | Ladder
    | Start
    | AutoMergeMessage
    | OfflineOp
    | SceneBookView
    | Notice;
export type Mudule =
    | ModuleAgrs
    | number[]
    | MailDetailsArgs
    | number
    | DoubleOp
    | GuideConfig
    | boolean
    | TaskArgs;

export class UIManager extends EventEmitter {
    public MODULE_SHOW: string;
    public MODULE_HIDE: string;

    public Login: boolean;

    private static _instance: UIManager | null = null;
    private _current_module: INotice;
    private _scene_node: cc.Node;
    private _ui_node: cc.Node;
    private _top_node: cc.Node;
    private _drag_node: cc.Node;
    private _map_drag_node: cc.Node;
    private _args_map: Record<string, ModuleAgrs>;
    private _map: Record<string, Map>;
    private _stack: any[];
    private main_camera: cc.Camera;
    private _map_node: cc.Node;
    private _guide_node: cc.Node;

    protected constructor() {
        super();
        this.MODULE_SHOW = "module-show";
        this.MODULE_HIDE = "module-hide";
        this._args_map = {};
        this._map = {};
        this._stack = [];
        this.main_camera;
        this.Login = false;
    }

    public static get instance(): UIManager {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    public get current_module(): INotice {
        return this._current_module;
    }

    public get map_drag_node(): cc.Node {
        return this._map_drag_node;
    }

    public get mapMainUI(): MainMapUI | null {
        if (!gm.ui._map_node) {
            gm.ui._map_node = cc.find("Canvas/ui_node/mainUI");
        }
        return gm.ui._map_node ? gm.ui._map_node.getComponent(MainMapUI) : null;
    }

    public get newerGuideOp(): NewerGuideOp | null {
        if (!gm.ui._guide_node) {
            gm.ui._guide_node = cc.find("Canvas/ui_node/newerGuideOp");
        }
        return gm.ui._guide_node
            ? gm.ui._guide_node.getComponent(NewerGuideOp)
            : null;
    }

    public init(params: () => void): void {
        this.main_camera = cc
            .find("Canvas/Main Camera")
            .getComponent(cc.Camera);
        const canvasNode: cc.Node = cc.Canvas.instance.node;

        this._scene_node =
            cc.find("Canvas/scene_node") || new cc.Node("scene_node");
        canvasNode.addChild(this._scene_node);
        Utils.align_with_parent(this._scene_node);

        this._ui_node = cc.find("Canvas/ui_node") || new cc.Node("ui_node");
        canvasNode.addChild(this._ui_node);
        Utils.align_with_parent(this._ui_node);

        this._top_node = cc.find("Canvas/top_node") || new cc.Node("top_node");
        canvasNode.addChild(this._top_node);
        Utils.align_with_parent(this._top_node);

        this._drag_node =
            cc.find("Canvas/drag_node") || new cc.Node("drag_node");
        canvasNode.addChild(this._drag_node);
        Utils.align_with_parent(this._drag_node);

        this._map_drag_node =
            cc.find("Canvas/map_drag_node") || new cc.Node("map_drag_node");
        canvasNode.addChild(this._map_drag_node);
        Utils.align_with_parent(this._map_drag_node);
        if (gm.ui.Login) {
            this.async_show_module(gm.const.Loading, params);
        } else {
            this.async_show_module(gm.const.Login);
        }
        // this.async_show_module(gm.const.Loading, params);
    }

    public get drag_node(): cc.Node {
        return this._drag_node;
    }

    public get_layer_node(type: LayerType): cc.Node | null {
        switch (type) {
            case LayerType.SCENE:
                return this._scene_node;
            case LayerType.TOP:
                return this._top_node;
            case LayerType.DRAG:
                return this._drag_node;
            default:
                return this._ui_node;
        }
    }

    public get start(): Start {
        return this._map[gm.const.Start.key] as Start;
    }

    public get loading(): Loading {
        return this._map[gm.const.Loading.key] as Loading;
    }

    public get task(): Task {
        return this._map[gm.const.Task.key] as Task;
    }

    public get ladder(): Ladder {
        return this._map[gm.const.Ladder.key] as Ladder;
    }

    public get sign(): Sign {
        return this._map[gm.const.Sign.key] as Sign;
    }

    public get mail(): Mail {
        return this._map[gm.const.Mail.key] as Mail;
    }

    public get auto_merge_message(): AutoMergeMessage {
        return this._map[gm.const.AutoMergeMessage.key] as AutoMergeMessage;
    }

    public get offline_op(): OfflineOp {
        return this._map[gm.const.OFFLINEOP.key] as OfflineOp;
    }

    public get_module(data: INotice): SceneBookView {
        return this._map[data.key] as SceneBookView;
    }

    public set_module_args(key: string, data: any): void {
        this._args_map[key] = data;
    }

    public get_module_args(key: string): Mudule {
        return this._args_map[key];
    }

    private clear_module_args(): void {}

    public async_load_module(
        moduleNotice: INotice,
        callback: (success: boolean) => void
    ): void {
        if (this._map[moduleNotice.key]) {
            callback(true);
        } else {
            console.log(moduleNotice.bundle_name);
            Utils.async_get_bundle(moduleNotice.bundle_name, (bundle) => {
                bundle.load(
                    moduleNotice.load_url,
                    cc.Prefab,
                    (error, prefab: cc.Prefab) => {
                        if (error) {
                            cc.error(error);
                            this.show_notice(
                                cc.js.formatStr(
                                    "Không tải được Module %s",
                                    moduleNotice.key
                                )
                            );
                            if (this.loading) {
                                this.loading.state = LoadingState.COMPLETE;
                            }
                        } else {
                            if (this._map[moduleNotice.key]) {
                                callback(true);
                            } else {
                                const instantiatedNode = cc.instantiate(prefab);
                                instantiatedNode.active = false;
                                instantiatedNode.parent = this.get_layer_node(
                                    moduleNotice.layer_type
                                );

                                const component = instantiatedNode.getComponent(
                                    moduleNotice.key
                                );
                                if (component == null) {
                                    cc.error(
                                        `${moduleNotice.key} module need extend GameModule`
                                    );
                                }
                                this._map[moduleNotice.key] = component;
                                callback(false);
                            }
                        }
                    }
                );
            });
        }
    }

    private preload_module(event: INotice): void {
        Utils.async_get_bundle(event.bundle_name, (t) => {
            t.preload(event.load_url, cc.Prefab);
        });
    }

    public async_show_module(
        moduleNotice: INotice,
        callback?: (component: Map) => void
    ): void {
        console.log(moduleNotice.key);
        this.async_load_module(moduleNotice, () => {
            const map = this._map[moduleNotice.key];

            if (map) {
                this._current_module = moduleNotice;
                if (this._current_module.module_type == ModuleType.SCENE) {
                    for (
                        let index = this._stack.length - 1;
                        0 <= index;
                        index--
                    ) {
                        if (
                            this._stack[index] != gm.const.Loading &&
                            this._stack[index] != gm.const.Story &&
                            this._stack[index] != gm.const.Guide &&
                            this._stack[index] != gm.const.Login
                        ) {
                            const stack = this._stack.splice(index, 1)[0];
                            this._map[stack.key].node.active = false;
                        }
                    }
                } else if (!(moduleNotice.module_type != ModuleType.WINDOW)) {
                    const parentNode = map.node.parent;
                    if (parentNode) {
                        map.node.removeFromParent(false);
                        parentNode.addChild(map.node);
                    }
                }

                const index = this._stack.indexOf(moduleNotice);
                if (-1 < index) {
                    this._stack.splice(index, 1);
                }

                if (
                    moduleNotice != gm.const.FlyNotice &&
                    moduleNotice != gm.const.Notice
                ) {
                    this._stack.push(moduleNotice);
                }

                if (map.node.parent) {
                    Utils.align_with_parent(map.node);
                }

                // if (moduleNotice.key != "Ladder") {
                //     map.node.active = true;
                // }

                map.node.active = true;

                if (moduleNotice.has_open_effect) {
                    map.node.scale = 0;
                    const action = cc.sequence(
                        cc.scaleTo(0.1, 1),
                        cc.delayTime(0),
                        cc.callFunc(() => {
                            this.emit("module-show", map);
                            if (callback) {
                                callback(map);
                            }
                        })
                    );
                    map.node.runAction(action);
                } else {
                    this.emit("module-show", map);
                    if (callback) {
                        callback(map);
                    }
                }
            }
        });
    }

    public async_hide_module(notice: INotice): void {
        const item = this._map[notice.key];
        if (item) {
            const index = this._stack.indexOf(notice);
            if (index > -1) {
                this._stack.splice(index, 1);
                if (notice.has_open_effect) {
                    const action = cc.sequence(
                        cc.scaleTo(0.1, 0),
                        cc.callFunc(() => {
                            item.node.active = false;
                            item.node.scale = 1;
                            this.emit("module-hide", item);
                        })
                    );
                    item.node.runAction(action);
                } else {
                    item.node.active = false;
                    this.emit("module-hide", item);
                }
            }
        }
    }

    private hide_upper_module(notice: INotice): void {
        const index = this._stack.indexOf(notice);
        if (index > -1) {
            for (let a = this._stack.length - 1; a > index; a--) {
                this.async_hide_module(this._stack[a]);
            }
        }
    }

    private get_top_module(): Map | null {
        for (let t = this._stack.length - 1; t >= 0; t--) {
            const event = this._stack[t];
            if (event !== gm.const.Notice) {
                return this._map[event.key];
            }
        }
        return null;
    }

    private get notice(): Notice {
        return this._map[gm.const.Notice.key] as Notice;
    }

    private get fly_notice(): Notice {
        return this._map[gm.const.FlyNotice.key];
    }

    public get fight(): Fight {
        return this._map[gm.const.Fight.key] as Fight;
    }

    public show_notice_array(notices: string[]): void {
        this.async_show_module(gm.const.Notice, () => {
            for (let index = 0; index < notices.length; index++) {
                this.notice.show_notice(notices[index]);
            }
        });
    }

    public show_notice(message: string, callback?: () => void): void {
        this.async_show_module(gm.const.Notice, () => {
            this.notice.show_notice(message);
            if (callback) callback();
        });
    }

    private show_fly_notice(
        message: string,
        duration: number,
        targetNode: cc.Node,
        callback?: () => void
    ): void {
        this.async_show_module(gm.const.FlyNotice, () => {
            const worldPosition = targetNode.convertToWorldSpaceAR(
                cc.v3(0, (1 - targetNode.anchorY) * targetNode.height)
            );
            this.fly_notice.show_fly_notice(message, duration, worldPosition);
            if (callback) callback();
        });
    }

    public show_item_fly(
        itemId: number,
        startPosition: cc.Vec3,
        endPosition: cc.Vec3
    ): void {
        gm.pool.async_get(
            BundleName.MAP,
            gm.const.ItemFly.load_url,
            ItemFly,
            (component) => {
                if (!component) return;

                const itemFlyAnimation = component;
                itemFlyAnimation.init_fly_anim(
                    itemId,
                    startPosition,
                    endPosition
                );

                if (this.mapMainUI?.mapContent) {
                    this.mapMainUI.mapContent.addChild(component.node);
                }
            }
        );
    }

    public show_coin_fly(
        rewardType: RewardIdEnum,
        startPosition: cc.Vec3,
        count: number = 3,
        endPosition: cc.Vec3 = null
    ): void {
        gm.pool.async_get(
            BundleName.COMMON,
            gm.const.CoinFlyAnim.load_url,
            CoinFlyAnim,
            (CoinFly) => {
                CoinFly.init_fly_anim(
                    rewardType,
                    startPosition,
                    endPosition,
                    count
                );
                this.get_layer_node(LayerType.TOP).addChild(CoinFly.node);
            }
        );

        if (rewardType == RewardIdEnum.GOLD) {
            gm.audio.play_effect(gm.const.AUDIO_17_GOLD_FLY);
        } else if (rewardType == RewardIdEnum.DIAMOND) {
            gm.audio.play_effect(gm.const.AUDIO_162_DIAMOND_FLY);
        } else if (rewardType == RewardIdEnum.STAR) {
            gm.audio.play_effect(gm.const.AUDIO_25_LADDER_STAR_FLY);
        }
    }

    public show_start(callback?: () => void): void {
        const mapUI = this._map[gm.const.MAPUI.key];
        const startTime = Date.now();

        if (mapUI) {
            if (gm.data.fight_temp_data.play_type === 0) {
                gm.ui.loading.state = LoadingState.BOAT_IN;
                gm.ui.async_show_module(gm.const.MAPUI);
                setTimeout(() => {
                    gm.ui.loading.state = LoadingState.COMPLETE;
                    if (callback) callback();
                }, gm.const.MIN_LOADING_TIME);
            } else {
                gm.ui.async_show_module(gm.const.MAPUI);
                if (callback) callback();
            }
        } else {
            gm.ui.loading.state =
                gm.data.fight_temp_data.play_type === 0
                    ? LoadingState.BOAT_IN
                    : LoadingState.START_FULL;
            gm.ui.async_show_module(gm.const.MAPUI, () => {
                const elapsedTime = Date.now() - startTime;

                if (
                    gm.ui.loading.state !== LoadingState.BOAT_IN ||
                    elapsedTime > gm.const.MIN_LOADING_TIME
                ) {
                    gm.ui.loading.state = LoadingState.COMPLETE;
                    if (callback) callback();
                } else {
                    setTimeout(() => {
                        gm.ui.loading.state = LoadingState.COMPLETE;
                        if (callback) callback();
                    }, gm.const.MIN_LOADING_TIME - elapsedTime);
                }
            });
        }
    }

    public show_panel(notice: INotice): void {
        if (this._map[notice.key]) {
            console.log("Buy");
            gm.ui.async_show_module(notice);
        } else {
            gm.ui.loading.state = LoadingState.START;
            gm.ui.async_show_module(notice, () => {
                gm.ui.loading.state = LoadingState.COMPLETE;
            });
        }
    }

    public show_auto_merge_message(): void {
        if (this.mapMainUI && this.mapMainUI.autoCompose._stopTime > 0) {
            gm.ui.show_notice("Không đủ dung lượng bản đồ, vui lòng thử lại");
        } else if (
            this.auto_merge_message &&
            (!this.auto_merge_message ||
                !this.auto_merge_message.node.activeInHierarchy)
        ) {
            gm.ui.show_panel(gm.const.AutoMergeMessage);
        }
    }

    public show_fight(): void {
        const fightTempData = gm.data.fight_temp_data;
        const fightModule = gm.const.Fight;

        if (fightTempData.play_type === 0) {
            gm.ui.loading.state = LoadingState.BOAT_OUT;
        } else if (fightTempData.play_type === 1) {
            gm.ui.loading.state = LoadingState.REWARD_FULL;
        } else if (fightTempData.play_type === 2) {
            gm.ui.loading.state = LoadingState.CAVES_FULL;
            gm.audio.play_music(gm.const.AUDIO_92_LOADING_ISLAND_MUSIC);
        }

        const startTime = Date.now();
        gm.ui.async_show_module(fightModule, () => {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime > gm.const.MIN_LOADING_TIME) {
                gm.ui.loading.state = LoadingState.COMPLETE;
            } else {
                setTimeout(() => {
                    gm.ui.loading.state = LoadingState.COMPLETE;
                }, gm.const.MIN_LOADING_TIME - elapsedTime);
            }
        });
    }
}
