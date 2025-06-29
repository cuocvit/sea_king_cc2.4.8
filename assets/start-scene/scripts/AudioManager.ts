// @
export class AudioManager {
    private static _instance: AudioManager | null = null;
    private BUNDLE_NAME: string = "common";
    private _music_pool: { [key: string]: number } = {};
    private _effect_pool: { [key: string]: number } = {};
    private _music_volume: number = 1;
    private _music_volume_bak: number = 1;
    private _music_mute: boolean = false;
    private _effect_volume: number = 1;
    private _effect_volume_bak: number = 1;
    private _effect_mute: boolean = false;
    private _max_volume: number = 1;
    private _min_volume: number = 0;
    private _current_music_name: string = "";
    private _backup_music_name: string = "";
  
    private constructor() {}
  
    public static get instance(): AudioManager {
      return this._instance || (this._instance = new AudioManager());
    }
  
    // @
    private get root_path(): string {
      return "audios/";
    }
  
    // @
    private get cur_music_name(): string {
      return this._current_music_name;
    }
  
    // @
    public get music_volume(): number {
      return this._music_volume;
    }
  
    // @
    public set music_volume(value: number) {
      value = Math.min(Math.max(value, this._min_volume), this._max_volume);
      this._music_volume = value;
      for (const key in this._music_pool) {
        cc.audioEngine.setVolume(this._music_pool[key], this._music_volume);
      }
    }
  
    // @
    public get effect_volume(): number {
      return this._effect_volume;
    }
  
    // @
    public set effect_volume(value: number) {
      this._effect_volume = Math.min(Math.max(value, this._min_volume), this._max_volume);
    }
  
    // @
    public get music_mute(): boolean {
      return this._music_mute;
    }
  
    // @
    public set music_mute(value: boolean) {
      this._music_mute = value;
      if (this._music_mute) {
        if (this._current_music_name) {
          this._music_volume_bak = this.music_volume;
          this.music_volume = 0;
          this._backup_music_name = this._current_music_name;
          this.stop(this._current_music_name);
        }
      } else {
        if (this._backup_music_name) {
          this.music_volume = this._music_volume_bak;
          this._current_music_name = "";
          this.play_music(this._backup_music_name);
          this._backup_music_name = "";
        }
      }
    }
  
    // @
    public get effect_mute(): boolean {
      return this._effect_mute;
    }
  
    // @
    public set effect_mute(value: boolean) {
      this._effect_mute = value;
          if (this._effect_mute) {
              this._effect_volume_bak = this.effect_volume, 
              this.effect_volume = 0
          } else {
              this.effect_volume = this._effect_volume_bak
          }
    }
  
    // @
    private get mute(): boolean {
      return this.music_mute && this.effect_mute;
    }
  
    // @
    private set mute(value: boolean) {
      this.music_mute = value;
      this.effect_mute = value;
      if (value) this.stop_all();
    }
  
    // @
    public play_music(name: string): void {
      if (!name) return;
      if (this._music_mute) {
        this._backup_music_name = name;
      } else if (name !== this._current_music_name) {
        const path = this.root_path + name;
        this.async_get_audio_clip(path, (clip: cc.AudioClip) => {
          this.stop(this._current_music_name);
          const audioId = cc.audioEngine.play(clip, true, this._music_volume);
          this._music_pool[name] = audioId;
          this._current_music_name = name;
        });
      }
    }
  
    // @
    public play_effect(name: string, loop: boolean = false): void {
      if (this._effect_mute) return;
      const path = this.root_path + name;
      this.async_get_audio_clip(path, (clip: cc.AudioClip) => {
        const audioId = cc.audioEngine.play(clip, loop, this._effect_volume);
        this._effect_pool[name] = audioId;
      });
    }
  
    // @
    private pause(name: string): void {
      if (this._music_pool[name] >= 0) {
        cc.audioEngine.pause(this._music_pool[name]);
      }
    }
  
    // @
    private resume(name: string): void {
      if (this._music_pool[name] >= 0) {
        cc.audioEngine.resume(this._music_pool[name]);
      }
    }
  
    // @
    private stop(name: string): void {
      if (this._music_pool[name] >= 0) {
        cc.audioEngine.stop(this._music_pool[name]);
        this._current_music_name = "";
      }
    }
  
    // @
    private stop_effect(name: string): void {
      if (this._effect_pool[name] >= 0) {
        cc.audioEngine.stop(this._effect_pool[name]);
      }
    }
  
    // @
    private stop_all_effect(): void {
      for (const key in this._effect_pool) {
        if (this._effect_pool.hasOwnProperty(key) && this._effect_pool[key] >= 0) {
          cc.audioEngine.stop(this._effect_pool[key]);
        }
      }
    }
  
    // @
    private get_current_time(name: string): number {
      return this._music_pool[name] >= 0 ? cc.audioEngine.getCurrentTime(this._music_pool[name]) : 0;
    }
  
    // @
    private get_duration(name: string): number {
      return this._music_pool[name] >= 0 ? cc.audioEngine.getDuration(this._music_pool[name]) : 0;
    }
  
    // @
    private get_progress(name: string): number {
      const duration = this.get_duration(name);
      return duration > 0 ? this.get_current_time(name) / duration : 0;
    }
  
    // @
    private set_finish_callback(name: string, callback: Function): void {
      if (this._music_pool[name] >= 0) {
        cc.audioEngine.setFinishCallback(this._music_pool[name], callback);
      } else if (this._effect_pool[name] >= 0) {
        cc.audioEngine.setFinishCallback(this._effect_pool[name], callback);
      }
    }
  
    // @
    private get_state(name: string): number {
      if (this._music_pool[name] >= 0) {
        return cc.audioEngine.getState(this._music_pool[name]);
      } else if (this._effect_pool[name] >= 0) {
        return cc.audioEngine.getState(this._effect_pool[name]);
      }
      return cc.audioEngine.AudioState.ERROR;
    }
  
    // @
    private uncache(name: string): void {
      const path = this.root_path + name;
      this.async_get_audio_clip(path, (clip: cc.AudioClip) => {
        cc.audioEngine.uncache(clip);
      });
    }
  
    // @
    private stop_all(): void {
      cc.audioEngine.stopAll();
    }
  
    // @
    private pause_all(): void {
      cc.audioEngine.pauseAll();
    }
  
    // @
    private resume_all(): void {
      cc.audioEngine.resumeAll();
    }
  
    // @
    private uncache_all(): void {
      cc.audioEngine.uncacheAll();
    }
  
    // @
    private release(name: string): void {
      this.async_get_bundle(this.BUNDLE_NAME, (bundle: cc.AssetManager.Bundle) => {
        bundle.release(this.root_path + name);
      });
    }
  
    // @
    private release_all_music(): void {
      for (const key in this._music_pool) {
        const path = this.root_path + key;
        this.async_get_audio_clip(path, (clip: cc.AudioClip) => {
          cc.audioEngine.uncache(clip);
        });
        this.async_get_bundle(this.BUNDLE_NAME, (bundle: cc.AssetManager.Bundle) => {
          bundle.release(path);
        });
      }
    }
  
    // @
    private release_all_effect(): void {
      for (const key in this._effect_pool) {
        const path = this.root_path + key;
        this.async_get_audio_clip(path, (clip: cc.AudioClip) => {
          cc.audioEngine.uncache(clip);
        });
        this.async_get_bundle(this.BUNDLE_NAME, (bundle: cc.AssetManager.Bundle) => {
          bundle.release(path);
        });
      }
    }
  
    // @
    private async_get_audio_clip(path: string, callback: (clip: cc.AudioClip) => void): void {
      this.async_get_bundle(this.BUNDLE_NAME, (bundle: cc.AssetManager.Bundle) => {
        const clip = bundle.get<cc.AudioClip>(path, cc.AudioClip);
        if (clip) {
          callback(clip);
        } else {
          // bundle <=> cc.resources
          bundle.load(path, cc.AudioClip, (error: Error, loadedClip: cc.AudioClip) => {
            if (error) {
              cc.error(error);
            } else {
              callback(loadedClip);
            }
          });
        }
      });
    }
  
    // @
    private async_get_bundle(name: string, callback: (bundle: cc.AssetManager.Bundle) => void): void {
      const bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(name);
      if (bundle) {
        callback(bundle);
      } else {
        cc.assetManager.loadBundle(name, (error: Error, loadedBundle: cc.AssetManager.Bundle) => {
          if (error) {
            console.error(error);
          } else {
            console.log("load " + name + " bundle successfully.");
            callback(loadedBundle);
          }
        });
      }
    }
  }
  