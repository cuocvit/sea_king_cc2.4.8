"use strict";
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