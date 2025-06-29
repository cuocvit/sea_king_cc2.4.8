// +-+
import { GameObject } from './GameObject';

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/PlayAndStop")
export class PlayAndStop extends GameObject {
    @property(cc.Boolean)
    private auto_play_and_stop: boolean = true;

    private _ps: cc.ParticleSystem | null = null;
    private _anim: cc.Animation | null = null;
    private _spine: sp.Skeleton | null = null;
    private _anim_state: cc.AnimationState | null = null;
    private _spine_track: sp.spine.TrackEntry | null = null;

    protected onLoad(): void {
        this._ps = this.node.getComponent(cc.ParticleSystem);
        this._anim = this.node.getComponent(cc.Animation);
        this._spine = this.node.getComponent(sp.Skeleton);
    }

    protected onEnable(): void {
        if (this.auto_play_and_stop) {
            if (this._ps) {
                this._ps.resetSystem();
            }
            if (this._anim) {
                this._anim_state = this._anim.play();
            } else if (this._spine) {
                this._spine_track = this._spine.setAnimation(0, this._spine.defaultAnimation, false);
            }
        }
    }

    protected onDisable(): void {
        if (this.auto_play_and_stop) {
            if (this._ps) {
                this._ps.stopSystem();
            }
            if (this._anim) {
                this._anim.stop();
            } else if (this._spine) {
                this._spine.clearTrack(0);
            }
        }
    }

    private play(animationName: string, loop: boolean, time: number): void {
        if (this._anim) {
            this._anim_state = this._anim.play(animationName, time);
            if (this._anim_state) {
                this._anim_state.wrapMode = loop ? cc.WrapMode.Loop : cc.WrapMode.Default;
            }
        } else if (this._spine) {
            this._spine_track = this._spine.setAnimation(0, animationName, loop);
            if (this._spine_track) {
                this._spine_track.trackTime = time;
            }
        }
    }

    private stop(): void {
        if (this._anim) {
            this._anim.stop();
        } else if (this._spine) {
            this._spine.clearTrack(0);
        }
    }
}