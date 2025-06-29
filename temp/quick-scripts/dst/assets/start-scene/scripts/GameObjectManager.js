
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GameObjectManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80ddeM5f3pBzZjKo52xhMEo', 'GameObjectManager');
// start-scene/scripts/GameObjectManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectManager = void 0;
var GameObjectManager = /** @class */ (function () {
    function GameObjectManager() {
        this._object_list = {};
    }
    Object.defineProperty(GameObjectManager, "instance", {
        get: function () {
            this._instance || (this._instance = new GameObjectManager());
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameObjectManager, "unique_id", {
        get: function () {
            return this._unique_id++;
        },
        enumerable: false,
        configurable: true
    });
    GameObjectManager.prototype.add = function (gObj) {
        if (gObj != null) {
            var className = cc.js.getClassName(gObj);
            var entry = this._object_list[className];
            if (!entry) {
                entry = { map: {}, count: 0 };
                this._object_list[className] = entry;
            }
            entry.map[gObj.__unique_id] = gObj;
            entry.count++;
        }
    };
    GameObjectManager.prototype.remove = function (gObj) {
        if (gObj != null) {
            var className = cc.js.getClassName(gObj);
            var entry = this._object_list[className];
            if (entry) {
                var object = entry.map[gObj.__unique_id];
                if (object) {
                    object.__destroy_time = Date.now();
                    delete entry.map[gObj.__unique_id];
                    entry.count--;
                }
            }
        }
    };
    GameObjectManager.prototype.count = function (gObj) {
        if (gObj == null) {
            return 0;
        }
        var className = cc.js.getClassName(gObj);
        var entry = this._object_list[className];
        return entry ? entry.count : 0;
    };
    GameObjectManager.prototype.info = function () {
        var totalCount = 0;
        var log = "%c\n============== Game Object Info ==================";
        for (var className in this._object_list) {
            var entry = this._object_list[className];
            totalCount += entry.count;
            log += "\n" + className + " count is " + entry.count;
        }
        log += "\n\nTotal count is " + totalCount;
        log += "\n\n============== Game Object Info ==================\n";
        console.log(log, "font-weight:bold;");
    };
    GameObjectManager._instance = null;
    GameObjectManager._unique_id = 0;
    return GameObjectManager;
}());
exports.GameObjectManager = GameObjectManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdhbWVPYmplY3RNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBO0lBS0k7UUFGUSxpQkFBWSxHQUFvQyxFQUFFLENBQUM7SUFFcEMsQ0FBQztJQUV4QixzQkFBa0IsNkJBQVE7YUFBMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUM3RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBa0IsOEJBQVM7YUFBM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVNLCtCQUFHLEdBQVYsVUFBVyxJQUF1QjtRQUM5QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxJQUFNLFNBQVMsR0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLEtBQUssR0FBZ0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN4QztZQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNuQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRU0sa0NBQU0sR0FBYixVQUFjLElBQXVCO1FBQ2pDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLElBQU0sU0FBUyxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQU0sS0FBSyxHQUFnQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQU0sTUFBTSxHQUEyQixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ25DLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDakI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVNLGlDQUFLLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBTSxTQUFTLEdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBTSxLQUFLLEdBQWdDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEUsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sZ0NBQUksR0FBWDtRQUNJLElBQUksVUFBVSxHQUFXLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBVyx3REFBd0QsQ0FBQztRQUMzRSxLQUFLLElBQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdkMsSUFBTSxLQUFLLEdBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsVUFBVSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUIsR0FBRyxJQUFJLE9BQUssU0FBUyxrQkFBYSxLQUFLLENBQUMsS0FBTyxDQUFDO1NBQ25EO1FBQ0QsR0FBRyxJQUFJLHdCQUFzQixVQUFZLENBQUM7UUFDMUMsR0FBRyxJQUFJLDBEQUEwRCxDQUFDO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQS9EYywyQkFBUyxHQUE2QixJQUFJLENBQUM7SUFDM0MsNEJBQVUsR0FBVyxDQUFDLENBQUM7SUErRDFDLHdCQUFDO0NBakVELEFBaUVDLElBQUE7QUFqRVksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgR2FtZU9iamVjdCB9IGZyb20gJy4vR2FtZU9iamVjdCc7XHJcblxyXG5pbnRlcmZhY2UgT2JqZWN0TGlzdEVudHJ5IHtcclxuICAgIG1hcDogUmVjb3JkPG51bWJlciwgR2FtZU9iamVjdD47XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lT2JqZWN0TWFuYWdlciB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VuaXF1ZV9pZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX29iamVjdF9saXN0OiBSZWNvcmQ8c3RyaW5nLCBPYmplY3RMaXN0RW50cnk+ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogR2FtZU9iamVjdE1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBHYW1lT2JqZWN0TWFuYWdlcigpKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdW5pcXVlX2lkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaXF1ZV9pZCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQoZ09iajogR2FtZU9iamVjdCB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ09iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZTogc3RyaW5nID0gY2MuanMuZ2V0Q2xhc3NOYW1lKGdPYmopO1xyXG4gICAgICAgICAgICBsZXQgZW50cnk6IE9iamVjdExpc3RFbnRyeSB8IHVuZGVmaW5lZCA9IHRoaXMuX29iamVjdF9saXN0W2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIGlmICghZW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5ID0geyBtYXA6IHt9LCBjb3VudDogMCB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0X2xpc3RbY2xhc3NOYW1lXSA9IGVudHJ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVudHJ5Lm1hcFtnT2JqLl9fdW5pcXVlX2lkXSA9IGdPYmo7XHJcbiAgICAgICAgICAgIGVudHJ5LmNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoZ09iajogR2FtZU9iamVjdCB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ09iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZTogc3RyaW5nID0gY2MuanMuZ2V0Q2xhc3NOYW1lKGdPYmopO1xyXG4gICAgICAgICAgICBjb25zdCBlbnRyeTogT2JqZWN0TGlzdEVudHJ5IHwgdW5kZWZpbmVkID0gdGhpcy5fb2JqZWN0X2xpc3RbY2xhc3NOYW1lXTtcclxuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmplY3Q6IEdhbWVPYmplY3QgfCB1bmRlZmluZWQgPSBlbnRyeS5tYXBbZ09iai5fX3VuaXF1ZV9pZF07XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0Ll9fZGVzdHJveV90aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZW50cnkubWFwW2dPYmouX191bmlxdWVfaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmNvdW50LS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvdW50KGdPYmo6IEdhbWVPYmplY3QgfCBudWxsKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoZ09iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbGFzc05hbWU6IHN0cmluZyA9IGNjLmpzLmdldENsYXNzTmFtZShnT2JqKTtcclxuICAgICAgICBjb25zdCBlbnRyeTogT2JqZWN0TGlzdEVudHJ5IHwgdW5kZWZpbmVkID0gdGhpcy5fb2JqZWN0X2xpc3RbY2xhc3NOYW1lXTtcclxuICAgICAgICByZXR1cm4gZW50cnkgPyBlbnRyeS5jb3VudCA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRvdGFsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGxvZzogc3RyaW5nID0gXCIlY1xcbj09PT09PT09PT09PT09IEdhbWUgT2JqZWN0IEluZm8gPT09PT09PT09PT09PT09PT09XCI7XHJcbiAgICAgICAgZm9yIChjb25zdCBjbGFzc05hbWUgaW4gdGhpcy5fb2JqZWN0X2xpc3QpIHtcclxuICAgICAgICAgICAgY29uc3QgZW50cnk6IE9iamVjdExpc3RFbnRyeSA9IHRoaXMuX29iamVjdF9saXN0W2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQgKz0gZW50cnkuY291bnQ7XHJcbiAgICAgICAgICAgIGxvZyArPSBgXFxuJHtjbGFzc05hbWV9IGNvdW50IGlzICR7ZW50cnkuY291bnR9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9nICs9IGBcXG5cXG5Ub3RhbCBjb3VudCBpcyAke3RvdGFsQ291bnR9YDtcclxuICAgICAgICBsb2cgKz0gXCJcXG5cXG49PT09PT09PT09PT09PSBHYW1lIE9iamVjdCBJbmZvID09PT09PT09PT09PT09PT09PVxcblwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxvZywgXCJmb250LXdlaWdodDpib2xkO1wiKTtcclxuICAgIH1cclxufVxyXG4iXX0=