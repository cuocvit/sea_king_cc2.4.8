"use strict";
cc._RF.push(module, '19b05uz0pxFDrDwNcD29ik4', 'Login');
// login/scripts/Login.ts

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
exports.Login = void 0;
// qg ??????
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Constants_1 = require("../../start-scene/scripts/Constants");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nickname = null;
        _this.password = null;
        _this.login = null;
        _this.creat = null;
        _this.error = null;
        return _this;
    }
    Login.prototype.Login = function () {
        this.error.string = "";
        console.log(this.nickname.string, this.password.string);
        if (this.nickname.string == "") {
            this.error.string = "Chưa nhập tài khoản";
        }
        else if (this.password.string == "") {
            this.error.string = "Chưa nhập mật khẩu";
        }
        else {
            GameManager_1.gm.ui.Login = true;
            cc.director.loadScene("game");
        }
    };
    // @property(cc.Label)
    // private prompt_lbl: cc.Label | null = null;
    // @property(cc.ProgressBar)
    // private bar_node: cc.ProgressBar | null = null;
    // @property(cc.ProgressBar)
    // private bar_node_2: cc.ProgressBar | null = null;
    // @property(cc.Node)
    // private start_node: cc.Node | null = null;
    // @property(cc.Node)
    // private start_full_node: cc.Node | null = null;
    // @property(cc.Node)
    // private caves_node: cc.Node | null = null;
    // @property(cc.Node)
    // private reward_node: cc.Node | null = null;
    // @property(cc.Node)
    // private boat_node: cc.Node | null = null;
    // @property(cc.Animation)
    // private boat_anim: cc.Animation | null = null;
    // @property([cc.Node])
    // private hero_node_array: cc.Node[] = [];
    // @property(cc.Sprite)
    // private people_spr: cc.Sprite | null = null;
    // @property(cc.Sprite)
    // private people_text_spr: cc.Sprite | null = null;
    // private _low_speed: number = 20;
    // private _low_speed_2: number = 100;
    // private _total_len: number = 0;
    // private _total_len_2: number = 0;
    // private _high_speed: number = 500;
    // private _count: number = 0;
    // private _state: LoadingState;
    // private _last_state: LoadingState;
    // get state(): LoadingState {
    //     return this._state;
    // }
    // set state(value: LoadingState) {
    //     if (this._state != value) {
    //         this._last_state = this._state;
    //         this._state = value;
    //         if (this._state !== LoadingState.COMPLETE) {
    //             this.start_load();
    //         } else if (this._state === LoadingState.COMPLETE) {
    //             this.complete_load();
    //         }
    //     }
    // }
    Login.prototype.update = function (deltaTime) {
        // if (this._state == LoadingState.COMPLETE) {
        //     this._total_len += deltaTime * this._high_speed;
        //     this._total_len_2 += deltaTime * this._high_speed;
        //     this.bar_node!.progress = Math.floor(this._total_len) / 100;
        //     this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
        //     if (this._total_len >= 100) {
        //         this.node.active = false;
        //     }
        //     if (cc.sys.platform == cc.sys.OPPO_GAME) {
        //         qg.setLoadingProgress({ progress: this._total_len });
        //     }
        // } else {
        //     if (this._total_len < 90) {
        //         this._total_len += deltaTime * this._low_speed;
        //         this.bar_node!.progress = Math.floor(this._total_len) / 100;
        //     }
        //     this._total_len_2 += deltaTime * this._low_speed_2;
        //     this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
        // }
    };
    Login.prototype.start_load = function () {
        // this.node.active = true;
        // this.start_node!.active = this._state == LoadingState.START;
        // this.start_full_node!.active = this._state == LoadingState.START_FULL;
        // this.caves_node!.active = this._state == LoadingState.CAVES_FULL;
        // this.reward_node!.active = this._state == LoadingState.REWARD_FULL;
        // this.boat_node!.active =
        //     this._state == LoadingState.BOAT_IN ||
        //     this._state == LoadingState.BOAT_OUT;
        // if (this._state == LoadingState.BOAT_IN) {
        //     this.people_spr!.node.active = false;
        //     this.people_text_spr!.node.active = false;
        // } else if (this._state == LoadingState.BOAT_OUT) {
        //     const t: number = (this._count % 2) + 1;
        //     this.people_spr!.node.active = true;
        //     this.people_text_spr!.node.active = true;
        //     Utils.async_set_sprite_frame(
        //         this.people_spr!,
        //         BundleName.LOADING,
        //         `res/people_${t}`
        //     );
        //     Utils.async_set_sprite_frame(
        //         this.people_text_spr!,
        //         BundleName.LOADING,
        //         `res/people_text_${t}`
        //     );
        //     this._count++;
        // }
        // this._total_len = 0;
        // this._total_len_2 = 0;
        // if (this._state == LoadingState.BOAT_IN) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.boat_anim!.play("loding_ship_innormal");
        //     });
        //     this.boat_anim!.play("loding_ship_inopen");
        //     const aliveHeroDataArray =
        //         gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;
        //     for (let i = 0; i < this.hero_node_array.length; i++) {
        //         const heroData = aliveHeroDataArray[i];
        //         const heroNode = this.hero_node_array[i];
        //         this.load_hero_model(
        //             heroNode,
        //             heroData ? heroData.id : 0,
        //             i,
        //             aliveHeroDataArray.length
        //         );
        //     }
        // } else if (this._state == LoadingState.BOAT_OUT) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.boat_anim!.play("loding_ship_outnormal");
        //     });
        //     this.boat_anim!.play("loding_ship_outopen");
        //     const battleHeroArray = gm.data.fight_temp_data.battle_hero_array;
        //     for (let i = 0; i < this.hero_node_array.length; i++) {
        //         const heroData = battleHeroArray[i];
        //         const heroNode = this.hero_node_array[i];
        //         this.load_hero_model(
        //             heroNode,
        //             heroData ? heroData.itemID : 0,
        //             i,
        //             battleHeroArray.length
        //         );
        //     }
        // }
    };
    Login.prototype.load_hero_model = function (heroNode, heroId, index, total) {
        if (heroId > 0) {
            if (heroNode.childrenCount == 0) {
                if (index < total) {
                    heroNode.active = true;
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroId, NodePoolItem_1.NodePoolItem, function (item) {
                        if (!item)
                            return;
                        if (heroNode.childrenCount == 0) {
                            heroNode.addChild(item.node);
                            var skeleton = item.getComponent(sp.Skeleton);
                            if (skeleton) {
                                skeleton.setSkin("front");
                                skeleton.setAnimation(0, "stay", true);
                            }
                        }
                        else {
                            GameManager_1.gm.pool.put(item.node);
                        }
                    });
                }
            }
            else {
                heroNode.active = false;
                GameManager_1.gm.pool.put_children(heroNode);
            }
        }
    };
    Login.prototype.complete_load = function () {
        // if (this._last_state == LoadingState.BOAT_IN) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.do_complete_load();
        //     });
        //     this.boat_anim!.play("loding_ship_inclose");
        // } else if (this._last_state == LoadingState.BOAT_OUT) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.do_complete_load();
        //     });
        //     this.boat_anim!.play("loding_ship_outclose");
        // } else {
        //     this.do_complete_load();
        // }
    };
    Login.prototype.do_complete_load = function () {
        // for (let i = 0; i < this.hero_node_array.length; i++) {
        //     const heroNode = this.hero_node_array[i];
        //     heroNode.active = false;
        //     gm.pool.put_children(heroNode);
        // }
        // this.start_node!.active = false;
        // this.start_full_node!.active = false;
        // this.caves_node!.active = false;
        // this.reward_node!.active = false;
        // this.boat_node!.active = false;
        // this.node.active = false;
    };
    Login.prototype.onDisable = function () {
        // this.start_node!.active = false;
        // this.start_full_node!.active = false;
        // this.caves_node!.active = false;
        // this.reward_node!.active = false;
        // this.boat_node!.active = false;
        // if (cc.sys.platform == cc.sys.OPPO_GAME) {
        //     qg.loadingComplete({});
        // }
    };
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "nickname", void 0);
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "password", void 0);
    __decorate([
        property(cc.Button)
    ], Login.prototype, "login", void 0);
    __decorate([
        property(cc.Button)
    ], Login.prototype, "creat", void 0);
    __decorate([
        property(cc.Label)
    ], Login.prototype, "error", void 0);
    Login = __decorate([
        ccclass
    ], Login);
    return Login;
}(GameModule_1.GameModule));
exports.Login = Login;

cc._RF.pop();