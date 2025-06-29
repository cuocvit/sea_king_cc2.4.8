
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '741deT5u4NG0av4To4TirwK', 'AudioManager');
// start-scene/scripts/AudioManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
// @
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        this.BUNDLE_NAME = "common";
        this._music_pool = {};
        this._effect_pool = {};
        this._music_volume = 1;
        this._music_volume_bak = 1;
        this._music_mute = false;
        this._effect_volume = 1;
        this._effect_volume_bak = 1;
        this._effect_mute = false;
        this._max_volume = 1;
        this._min_volume = 0;
        this._current_music_name = "";
        this._backup_music_name = "";
    }
    Object.defineProperty(AudioManager, "instance", {
        get: function () {
            return this._instance || (this._instance = new AudioManager());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "root_path", {
        // @
        get: function () {
            return "audios/";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "cur_music_name", {
        // @
        get: function () {
            return this._current_music_name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "music_volume", {
        // @
        get: function () {
            return this._music_volume;
        },
        // @
        set: function (value) {
            value = Math.min(Math.max(value, this._min_volume), this._max_volume);
            this._music_volume = value;
            for (var key in this._music_pool) {
                cc.audioEngine.setVolume(this._music_pool[key], this._music_volume);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "effect_volume", {
        // @
        get: function () {
            return this._effect_volume;
        },
        // @
        set: function (value) {
            this._effect_volume = Math.min(Math.max(value, this._min_volume), this._max_volume);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "music_mute", {
        // @
        get: function () {
            return this._music_mute;
        },
        // @
        set: function (value) {
            this._music_mute = value;
            if (this._music_mute) {
                if (this._current_music_name) {
                    this._music_volume_bak = this.music_volume;
                    this.music_volume = 0;
                    this._backup_music_name = this._current_music_name;
                    this.stop(this._current_music_name);
                }
            }
            else {
                if (this._backup_music_name) {
                    this.music_volume = this._music_volume_bak;
                    this._current_music_name = "";
                    this.play_music(this._backup_music_name);
                    this._backup_music_name = "";
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "effect_mute", {
        // @
        get: function () {
            return this._effect_mute;
        },
        // @
        set: function (value) {
            this._effect_mute = value;
            if (this._effect_mute) {
                this._effect_volume_bak = this.effect_volume,
                    this.effect_volume = 0;
            }
            else {
                this.effect_volume = this._effect_volume_bak;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "mute", {
        // @
        get: function () {
            return this.music_mute && this.effect_mute;
        },
        // @
        set: function (value) {
            this.music_mute = value;
            this.effect_mute = value;
            if (value)
                this.stop_all();
        },
        enumerable: false,
        configurable: true
    });
    // @
    AudioManager.prototype.play_music = function (name) {
        var _this = this;
        if (!name)
            return;
        if (this._music_mute) {
            this._backup_music_name = name;
        }
        else if (name !== this._current_music_name) {
            var path = this.root_path + name;
            this.async_get_audio_clip(path, function (clip) {
                _this.stop(_this._current_music_name);
                var audioId = cc.audioEngine.play(clip, true, _this._music_volume);
                _this._music_pool[name] = audioId;
                _this._current_music_name = name;
            });
        }
    };
    // @
    AudioManager.prototype.play_effect = function (name, loop) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        if (this._effect_mute)
            return;
        var path = this.root_path + name;
        this.async_get_audio_clip(path, function (clip) {
            var audioId = cc.audioEngine.play(clip, loop, _this._effect_volume);
            _this._effect_pool[name] = audioId;
        });
    };
    // @
    AudioManager.prototype.pause = function (name) {
        if (this._music_pool[name] >= 0) {
            cc.audioEngine.pause(this._music_pool[name]);
        }
    };
    // @
    AudioManager.prototype.resume = function (name) {
        if (this._music_pool[name] >= 0) {
            cc.audioEngine.resume(this._music_pool[name]);
        }
    };
    // @
    AudioManager.prototype.stop = function (name) {
        if (this._music_pool[name] >= 0) {
            cc.audioEngine.stop(this._music_pool[name]);
            this._current_music_name = "";
        }
    };
    // @
    AudioManager.prototype.stop_effect = function (name) {
        if (this._effect_pool[name] >= 0) {
            cc.audioEngine.stop(this._effect_pool[name]);
        }
    };
    // @
    AudioManager.prototype.stop_all_effect = function () {
        for (var key in this._effect_pool) {
            if (this._effect_pool.hasOwnProperty(key) && this._effect_pool[key] >= 0) {
                cc.audioEngine.stop(this._effect_pool[key]);
            }
        }
    };
    // @
    AudioManager.prototype.get_current_time = function (name) {
        return this._music_pool[name] >= 0 ? cc.audioEngine.getCurrentTime(this._music_pool[name]) : 0;
    };
    // @
    AudioManager.prototype.get_duration = function (name) {
        return this._music_pool[name] >= 0 ? cc.audioEngine.getDuration(this._music_pool[name]) : 0;
    };
    // @
    AudioManager.prototype.get_progress = function (name) {
        var duration = this.get_duration(name);
        return duration > 0 ? this.get_current_time(name) / duration : 0;
    };
    // @
    AudioManager.prototype.set_finish_callback = function (name, callback) {
        if (this._music_pool[name] >= 0) {
            cc.audioEngine.setFinishCallback(this._music_pool[name], callback);
        }
        else if (this._effect_pool[name] >= 0) {
            cc.audioEngine.setFinishCallback(this._effect_pool[name], callback);
        }
    };
    // @
    AudioManager.prototype.get_state = function (name) {
        if (this._music_pool[name] >= 0) {
            return cc.audioEngine.getState(this._music_pool[name]);
        }
        else if (this._effect_pool[name] >= 0) {
            return cc.audioEngine.getState(this._effect_pool[name]);
        }
        return cc.audioEngine.AudioState.ERROR;
    };
    // @
    AudioManager.prototype.uncache = function (name) {
        var path = this.root_path + name;
        this.async_get_audio_clip(path, function (clip) {
            cc.audioEngine.uncache(clip);
        });
    };
    // @
    AudioManager.prototype.stop_all = function () {
        cc.audioEngine.stopAll();
    };
    // @
    AudioManager.prototype.pause_all = function () {
        cc.audioEngine.pauseAll();
    };
    // @
    AudioManager.prototype.resume_all = function () {
        cc.audioEngine.resumeAll();
    };
    // @
    AudioManager.prototype.uncache_all = function () {
        cc.audioEngine.uncacheAll();
    };
    // @
    AudioManager.prototype.release = function (name) {
        var _this = this;
        this.async_get_bundle(this.BUNDLE_NAME, function (bundle) {
            bundle.release(_this.root_path + name);
        });
    };
    // @
    AudioManager.prototype.release_all_music = function () {
        var _loop_1 = function (key) {
            var path = this_1.root_path + key;
            this_1.async_get_audio_clip(path, function (clip) {
                cc.audioEngine.uncache(clip);
            });
            this_1.async_get_bundle(this_1.BUNDLE_NAME, function (bundle) {
                bundle.release(path);
            });
        };
        var this_1 = this;
        for (var key in this._music_pool) {
            _loop_1(key);
        }
    };
    // @
    AudioManager.prototype.release_all_effect = function () {
        var _loop_2 = function (key) {
            var path = this_2.root_path + key;
            this_2.async_get_audio_clip(path, function (clip) {
                cc.audioEngine.uncache(clip);
            });
            this_2.async_get_bundle(this_2.BUNDLE_NAME, function (bundle) {
                bundle.release(path);
            });
        };
        var this_2 = this;
        for (var key in this._effect_pool) {
            _loop_2(key);
        }
    };
    // @
    AudioManager.prototype.async_get_audio_clip = function (path, callback) {
        this.async_get_bundle(this.BUNDLE_NAME, function (bundle) {
            var clip = bundle.get(path, cc.AudioClip);
            if (clip) {
                callback(clip);
            }
            else {
                // bundle <=> cc.resources
                bundle.load(path, cc.AudioClip, function (error, loadedClip) {
                    if (error) {
                        cc.error(error);
                    }
                    else {
                        callback(loadedClip);
                    }
                });
            }
        });
    };
    // @
    AudioManager.prototype.async_get_bundle = function (name, callback) {
        var bundle = cc.assetManager.getBundle(name);
        if (bundle) {
            callback(bundle);
        }
        else {
            cc.assetManager.loadBundle(name, function (error, loadedBundle) {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log("load " + name + " bundle successfully.");
                    callback(loadedBundle);
                }
            });
        }
    };
    AudioManager._instance = null;
    return AudioManager;
}());
exports.AudioManager = AudioManager;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEF1ZGlvTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJO0FBQ0o7SUFnQkk7UUFkUSxnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFDNUMsaUJBQVksR0FBOEIsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsd0JBQW1CLEdBQVcsRUFBRSxDQUFDO1FBQ2pDLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztJQUVqQixDQUFDO0lBRXhCLHNCQUFrQix3QkFBUTthQUExQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksbUNBQVM7UUFEckIsSUFBSTthQUNKO1lBQ0UsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBWSx3Q0FBYztRQUQxQixJQUFJO2FBQ0o7WUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLHNDQUFZO1FBRHZCLElBQUk7YUFDSjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSTthQUNKLFVBQXdCLEtBQWE7WUFDbkMsS0FBSyxHQUFHLElBQUks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LFVBQXlCLElBQVksRUFBRSxRQUFrRDtRQUN2RixJQUFNLE1BQU0sR0FBMkIsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxNQUFNLEVBQUU7WUFDVixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNMLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFDLEtBQVksRUFBRSxZQUFvQztnQkFDbEYsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLHVCQUF1QixDQUFDLENBQUM7b0JBQ3RELFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQTlTYyxzQkFBUyxHQUF3QixJQUFJLENBQUM7SUErU3ZELG1CQUFDO0NBaFRILEFBZ1RHLElBQUE7QUFoVFUsb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAXHJcbmV4cG9ydCBjbGFzcyBBdWRpb01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBdWRpb01hbmFnZXIgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgQlVORExFX05BTUU6IHN0cmluZyA9IFwiY29tbW9uXCI7XHJcbiAgICBwcml2YXRlIF9tdXNpY19wb29sOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbiAgICBwcml2YXRlIF9lZmZlY3RfcG9vbDogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfbXVzaWNfdm9sdW1lOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBfbXVzaWNfdm9sdW1lX2JhazogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgX211c2ljX211dGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2VmZmVjdF92b2x1bWU6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIF9lZmZlY3Rfdm9sdW1lX2JhazogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgX2VmZmVjdF9tdXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tYXhfdm9sdW1lOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBfbWluX3ZvbHVtZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRfbXVzaWNfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2JhY2t1cF9tdXNpY19uYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gIFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBBdWRpb01hbmFnZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IEF1ZGlvTWFuYWdlcigpKTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0IHJvb3RfcGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gXCJhdWRpb3MvXCI7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGdldCBjdXJfbXVzaWNfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudF9tdXNpY19uYW1lO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCBtdXNpY192b2x1bWUoKTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX211c2ljX3ZvbHVtZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzZXQgbXVzaWNfdm9sdW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgdGhpcy5fbWluX3ZvbHVtZSksIHRoaXMuX21heF92b2x1bWUpO1xyXG4gICAgICB0aGlzLl9tdXNpY192b2x1bWUgPSB2YWx1ZTtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fbXVzaWNfcG9vbCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZSh0aGlzLl9tdXNpY19wb29sW2tleV0sIHRoaXMuX211c2ljX3ZvbHVtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXQgZWZmZWN0X3ZvbHVtZSgpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZWZmZWN0X3ZvbHVtZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzZXQgZWZmZWN0X3ZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuX2VmZmVjdF92b2x1bWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgdGhpcy5fbWluX3ZvbHVtZSksIHRoaXMuX21heF92b2x1bWUpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCBtdXNpY19tdXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbXVzaWNfbXV0ZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzZXQgbXVzaWNfbXV0ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICB0aGlzLl9tdXNpY19tdXRlID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLl9tdXNpY19tdXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRfbXVzaWNfbmFtZSkge1xyXG4gICAgICAgICAgdGhpcy5fbXVzaWNfdm9sdW1lX2JhayA9IHRoaXMubXVzaWNfdm9sdW1lO1xyXG4gICAgICAgICAgdGhpcy5tdXNpY192b2x1bWUgPSAwO1xyXG4gICAgICAgICAgdGhpcy5fYmFja3VwX211c2ljX25hbWUgPSB0aGlzLl9jdXJyZW50X211c2ljX25hbWU7XHJcbiAgICAgICAgICB0aGlzLnN0b3AodGhpcy5fY3VycmVudF9tdXNpY19uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JhY2t1cF9tdXNpY19uYW1lKSB7XHJcbiAgICAgICAgICB0aGlzLm11c2ljX3ZvbHVtZSA9IHRoaXMuX211c2ljX3ZvbHVtZV9iYWs7XHJcbiAgICAgICAgICB0aGlzLl9jdXJyZW50X211c2ljX25hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgdGhpcy5wbGF5X211c2ljKHRoaXMuX2JhY2t1cF9tdXNpY19uYW1lKTtcclxuICAgICAgICAgIHRoaXMuX2JhY2t1cF9tdXNpY19uYW1lID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXQgZWZmZWN0X211dGUoKTogYm9vbGVhbiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9lZmZlY3RfbXV0ZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzZXQgZWZmZWN0X211dGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgdGhpcy5fZWZmZWN0X211dGUgPSB2YWx1ZTtcclxuICAgICAgICAgIGlmICh0aGlzLl9lZmZlY3RfbXV0ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2VmZmVjdF92b2x1bWVfYmFrID0gdGhpcy5lZmZlY3Rfdm9sdW1lLCBcclxuICAgICAgICAgICAgICB0aGlzLmVmZmVjdF92b2x1bWUgPSAwXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuZWZmZWN0X3ZvbHVtZSA9IHRoaXMuX2VmZmVjdF92b2x1bWVfYmFrXHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGdldCBtdXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdXNpY19tdXRlICYmIHRoaXMuZWZmZWN0X211dGU7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHNldCBtdXRlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgIHRoaXMubXVzaWNfbXV0ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLmVmZmVjdF9tdXRlID0gdmFsdWU7XHJcbiAgICAgIGlmICh2YWx1ZSkgdGhpcy5zdG9wX2FsbCgpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHBsYXlfbXVzaWMobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICBpZiAodGhpcy5fbXVzaWNfbXV0ZSkge1xyXG4gICAgICAgIHRoaXMuX2JhY2t1cF9tdXNpY19uYW1lID0gbmFtZTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lICE9PSB0aGlzLl9jdXJyZW50X211c2ljX25hbWUpIHtcclxuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5yb290X3BhdGggKyBuYW1lO1xyXG4gICAgICAgIHRoaXMuYXN5bmNfZ2V0X2F1ZGlvX2NsaXAocGF0aCwgKGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zdG9wKHRoaXMuX2N1cnJlbnRfbXVzaWNfbmFtZSk7XHJcbiAgICAgICAgICBjb25zdCBhdWRpb0lkID0gY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCB0cnVlLCB0aGlzLl9tdXNpY192b2x1bWUpO1xyXG4gICAgICAgICAgdGhpcy5fbXVzaWNfcG9vbFtuYW1lXSA9IGF1ZGlvSWQ7XHJcbiAgICAgICAgICB0aGlzLl9jdXJyZW50X211c2ljX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcGxheV9lZmZlY3QobmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgaWYgKHRoaXMuX2VmZmVjdF9tdXRlKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnJvb3RfcGF0aCArIG5hbWU7XHJcbiAgICAgIHRoaXMuYXN5bmNfZ2V0X2F1ZGlvX2NsaXAocGF0aCwgKGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvSWQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGxvb3AsIHRoaXMuX2VmZmVjdF92b2x1bWUpO1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdF9wb29sW25hbWVdID0gYXVkaW9JZDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHBhdXNlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICBpZiAodGhpcy5fbXVzaWNfcG9vbFtuYW1lXSA+PSAwKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UodGhpcy5fbXVzaWNfcG9vbFtuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgcmVzdW1lKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICBpZiAodGhpcy5fbXVzaWNfcG9vbFtuYW1lXSA+PSAwKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHN0b3AobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgIGlmICh0aGlzLl9tdXNpY19wb29sW25hbWVdID49IDApIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0pO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRfbXVzaWNfbmFtZSA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgc3RvcF9lZmZlY3QobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgIGlmICh0aGlzLl9lZmZlY3RfcG9vbFtuYW1lXSA+PSAwKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLl9lZmZlY3RfcG9vbFtuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgc3RvcF9hbGxfZWZmZWN0KCk6IHZvaWQge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9lZmZlY3RfcG9vbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9lZmZlY3RfcG9vbC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHRoaXMuX2VmZmVjdF9wb29sW2tleV0gPj0gMCkge1xyXG4gICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLl9lZmZlY3RfcG9vbFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0X2N1cnJlbnRfdGltZShuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbXVzaWNfcG9vbFtuYW1lXSA+PSAwID8gY2MuYXVkaW9FbmdpbmUuZ2V0Q3VycmVudFRpbWUodGhpcy5fbXVzaWNfcG9vbFtuYW1lXSkgOiAwO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBnZXRfZHVyYXRpb24obmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX211c2ljX3Bvb2xbbmFtZV0gPj0gMCA/IGNjLmF1ZGlvRW5naW5lLmdldER1cmF0aW9uKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0pIDogMDtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0X3Byb2dyZXNzKG5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5nZXRfZHVyYXRpb24obmFtZSk7XHJcbiAgICAgIHJldHVybiBkdXJhdGlvbiA+IDAgPyB0aGlzLmdldF9jdXJyZW50X3RpbWUobmFtZSkgLyBkdXJhdGlvbiA6IDA7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHNldF9maW5pc2hfY2FsbGJhY2sobmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgaWYgKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0gPj0gMCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0sIGNhbGxiYWNrKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9lZmZlY3RfcG9vbFtuYW1lXSA+PSAwKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RmluaXNoQ2FsbGJhY2sodGhpcy5fZWZmZWN0X3Bvb2xbbmFtZV0sIGNhbGxiYWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBnZXRfc3RhdGUobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgaWYgKHRoaXMuX211c2ljX3Bvb2xbbmFtZV0gPj0gMCkge1xyXG4gICAgICAgIHJldHVybiBjYy5hdWRpb0VuZ2luZS5nZXRTdGF0ZSh0aGlzLl9tdXNpY19wb29sW25hbWVdKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9lZmZlY3RfcG9vbFtuYW1lXSA+PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLmdldFN0YXRlKHRoaXMuX2VmZmVjdF9wb29sW25hbWVdKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2MuYXVkaW9FbmdpbmUuQXVkaW9TdGF0ZS5FUlJPUjtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgdW5jYWNoZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgY29uc3QgcGF0aCA9IHRoaXMucm9vdF9wYXRoICsgbmFtZTtcclxuICAgICAgdGhpcy5hc3luY19nZXRfYXVkaW9fY2xpcChwYXRoLCAoY2xpcDogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZShjbGlwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHN0b3BfYWxsKCk6IHZvaWQge1xyXG4gICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHBhdXNlX2FsbCgpOiB2b2lkIHtcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGwoKTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgcmVzdW1lX2FsbCgpOiB2b2lkIHtcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHVuY2FjaGVfYWxsKCk6IHZvaWQge1xyXG4gICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlQWxsKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHJlbGVhc2UobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgIHRoaXMuYXN5bmNfZ2V0X2J1bmRsZSh0aGlzLkJVTkRMRV9OQU1FLCAoYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgYnVuZGxlLnJlbGVhc2UodGhpcy5yb290X3BhdGggKyBuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHJlbGVhc2VfYWxsX211c2ljKCk6IHZvaWQge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9tdXNpY19wb29sKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMucm9vdF9wYXRoICsga2V5O1xyXG4gICAgICAgIHRoaXMuYXN5bmNfZ2V0X2F1ZGlvX2NsaXAocGF0aCwgKGNsaXA6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZShjbGlwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFzeW5jX2dldF9idW5kbGUodGhpcy5CVU5ETEVfTkFNRSwgKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgYnVuZGxlLnJlbGVhc2UocGF0aCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgcmVsZWFzZV9hbGxfZWZmZWN0KCk6IHZvaWQge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9lZmZlY3RfcG9vbCkge1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnJvb3RfcGF0aCArIGtleTtcclxuICAgICAgICB0aGlzLmFzeW5jX2dldF9hdWRpb19jbGlwKHBhdGgsIChjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGUoY2xpcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hc3luY19nZXRfYnVuZGxlKHRoaXMuQlVORExFX05BTUUsIChidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgICAgIGJ1bmRsZS5yZWxlYXNlKHBhdGgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGFzeW5jX2dldF9hdWRpb19jbGlwKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IChjbGlwOiBjYy5BdWRpb0NsaXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgdGhpcy5hc3luY19nZXRfYnVuZGxlKHRoaXMuQlVORExFX05BTUUsIChidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgICBjb25zdCBjbGlwID0gYnVuZGxlLmdldDxjYy5BdWRpb0NsaXA+KHBhdGgsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgaWYgKGNsaXApIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGNsaXApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBidW5kbGUgPD0+IGNjLnJlc291cmNlc1xyXG4gICAgICAgICAgYnVuZGxlLmxvYWQocGF0aCwgY2MuQXVkaW9DbGlwLCAoZXJyb3I6IEVycm9yLCBsb2FkZWRDbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNhbGxiYWNrKGxvYWRlZENsaXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBhc3luY19nZXRfYnVuZGxlKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgY29uc3QgYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShuYW1lKTtcclxuICAgICAgaWYgKGJ1bmRsZSkge1xyXG4gICAgICAgIGNhbGxiYWNrKGJ1bmRsZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUobmFtZSwgKGVycm9yOiBFcnJvciwgbG9hZGVkQnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgXCIgKyBuYW1lICsgXCIgYnVuZGxlIHN1Y2Nlc3NmdWxseS5cIik7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGxvYWRlZEJ1bmRsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgIl19