
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NodePoolManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7c28OSkv5PU5qwU0B5S7re', 'NodePoolManager');
// start-scene/scripts/NodePoolManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePoolManager = void 0;
var NodePoolItem_1 = require("./NodePoolItem");
var Utils_1 = require("./Utils");
//
var NodePoolManager = /** @class */ (function () {
    function NodePoolManager() {
        this._pools = {};
        // @ (not use)
        /* public size(bundleName: BundleName, prefabName: string): number | void {
            const poolKey: string = this.get_key(bundleName, prefabName);
            const pool: cc.NodePool = this._pools[poolKey];
            if (pool) {
                return pool.size();
            }
            cc.warn("pool does not exist");
        } */
        // @ (not use)
        /* public clear(bundleName: BundleName, prefabName: string): void {
            const poolKey: string = this.get_key(bundleName, prefabName);
            const pool: cc.NodePool = this._pools[poolKey];
            if (pool) {
                pool.clear();
            } else {
                cc.warn("pool does not exist");
            }
        } */
        // !!@ (not use)
        /* public check(): void {
            for (const poolKey in this._pools) {
                const pool = this._pools[poolKey]._pool;
                for (let i = 0; i < pool.length; i++) {
                    if (pool[i].parent) {
                        cc.log(pool[i]);
                    }
                }
            }
        } */
    }
    Object.defineProperty(NodePoolManager, "instance", {
        // @
        get: function () {
            if (!this._instance)
                this._instance = new NodePoolManager();
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    // @, type!!!
    NodePoolManager.prototype.init = function (bundleName, prefabName, component, initialSize, callback) {
        var _this = this;
        if (initialSize === void 0) { initialSize = 0; }
        if (callback === void 0) { callback = null; }
        var poolKey = this.get_key(bundleName, prefabName);
        var pool = this._pools[poolKey];
        if (pool || poolKey === "") {
            cc.log("do not repeat init pool " + prefabName);
            if (callback)
                callback();
        }
        else {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
            this.async_get_prefab(bundleName, prefabName, function () {
                for (var i = 0; i < initialSize; i++) {
                    pool.put(_this.get_instance_comp(bundleName, prefabName, component).node);
                }
                if (callback)
                    callback();
            });
        }
    };
    // @
    NodePoolManager.prototype.is_init = function (bundleName, prefabName) {
        var poolKey = this.get_key(bundleName, prefabName);
        return (!!this._pools[poolKey] || prefabName === "");
    };
    // @
    NodePoolManager.prototype.get_key = function (bundleName, prefabName) {
        return bundleName + "://" + prefabName;
    };
    // @
    NodePoolManager.prototype.async_get_prefab = function (bundleName, prefabName, callback) {
        Utils_1.Utils.async_get_bundle(bundleName, function (bundle) {
            var prefab = bundle.get(prefabName, cc.Prefab);
            if (prefab) {
                callback(prefab);
            }
            else {
                bundle.load(prefabName, cc.Prefab, function (error, loadedPrefab) {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        callback(loadedPrefab);
                    }
                });
            }
        });
    };
    // @, type ??? component: any): cc.Component | null
    NodePoolManager.prototype.get_instance_comp = function (bundleName, prefabName, component) {
        var bundle = cc.assetManager.getBundle(bundleName);
        var prefab = bundle === null || bundle === void 0 ? void 0 : bundle.get(prefabName, cc.Prefab);
        if (prefab) {
            // console.error(prefab._name, component);
            var instance = cc.instantiate(prefab).getComponent(component);
            if (instance) {
                instance.load_url = prefabName;
                instance.bundle_name = bundleName;
                return instance;
            }
            cc.error("prefab does not have component " + component);
        }
        cc.error("Make sure the resource has been loaded before calling");
        return null;
    };
    // @
    NodePoolManager.prototype.get = function (bundleName, prefabName, component) {
        var poolKey = this.get_key(bundleName, prefabName);
        var pool = this._pools[poolKey];
        if (!pool) {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
        }
        if (pool.size() > 0) {
            return pool.get().getComponent(component);
        }
        else {
            return this.get_instance_comp(bundleName, prefabName, component);
        }
    };
    // @
    // public async_get<T extends INotice & cc.Component>(bundleName: BundleName, prefabName: string, component: { prototype: T }, callback: (component: T | null) => void): void {
    NodePoolManager.prototype.async_get = function (bundleName, prefabName, component, callback) {
        var _this = this;
        var poolKey = this.get_key(bundleName, prefabName);
        var pool = this._pools[poolKey];
        if (!pool) {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
        }
        if (pool.size() > 0) {
            callback(pool.get().getComponent(component));
            return;
        }
        this.async_get_prefab(bundleName, prefabName, function () {
            // console.log("async_get", component);
            callback(_this.get_instance_comp(bundleName, prefabName, component));
        });
    };
    // @
    NodePoolManager.prototype.put = function (node) {
        if (node == null)
            return;
        var component = node.getComponent(NodePoolItem_1.NodePoolItem);
        if (!component)
            return;
        var poolKey = this.get_key(component.bundle_name, component.load_url);
        var pool = this._pools[poolKey];
        if (pool) {
            node.removeFromParent(true);
            pool.put(node);
        }
        else {
            cc.warn("pool does not exist");
        }
    };
    // @
    NodePoolManager.prototype.put_children = function (parentNode) {
        for (var i = parentNode.childrenCount - 1; i >= 0; i--) {
            this.put(parentNode.children[i]);
        }
    };
    // @
    NodePoolManager._instance = null;
    return NodePoolManager;
}());
exports.NodePoolManager = NodePoolManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5vZGVQb29sTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBOEM7QUFDOUMsaUNBQWdDO0FBR2hDLEVBQUU7QUFDRjtJQUFBO1FBR1ksV0FBTSxHQUFtQyxFQUFFLENBQUM7UUF5SXBELGNBQWM7UUFDZDs7Ozs7OztZQU9JO1FBRUosY0FBYztRQUNkOzs7Ozs7OztZQVFJO1FBRUosZ0JBQWdCO1FBQ2hCOzs7Ozs7Ozs7WUFTSTtJQUNSLENBQUM7SUF0S0csc0JBQWtCLDJCQUFRO1FBRDFCLElBQUk7YUFDSjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDNUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsYUFBYTtJQUNOLDhCQUFJLEdBQVgsVUFDSSxVQUFzQixFQUN0QixVQUFrQixFQUNsQixTQUFzRCxFQUN0RCxXQUF1QixFQUN2QixRQUFvQztRQUx4QyxpQkFzQkM7UUFsQkcsNEJBQUEsRUFBQSxlQUF1QjtRQUN2Qix5QkFBQSxFQUFBLGVBQW9DO1FBRXBDLElBQU0sT0FBTyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdELElBQUksSUFBSSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDeEIsRUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUNoRCxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxD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QUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBeklELElBQUk7SUFDVyx5QkFBUyxHQUEyQixJQUFJLENBQUM7SUEwSzVELHNCQUFDO0NBNUtELEFBNEtDLElBQUE7QUE1S1ksMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBJTm90aWNlIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XHJcblxyXG4vL1xyXG5leHBvcnQgY2xhc3MgTm9kZVBvb2xNYW5hZ2VyIHtcclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTm9kZVBvb2xNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wb29sczogeyBba2V5OiBzdHJpbmddOiBjYy5Ob2RlUG9vbCB9ID0ge307XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogTm9kZVBvb2xNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB0aGlzLl9pbnN0YW5jZSA9IG5ldyBOb2RlUG9vbE1hbmFnZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCwgdHlwZSEhIVxyXG4gICAgcHVibGljIGluaXQoXHJcbiAgICAgICAgYnVuZGxlTmFtZTogQnVuZGxlTmFtZSxcclxuICAgICAgICBwcmVmYWJOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgY29tcG9uZW50OiB7IHByb3RvdHlwZTogTm9kZVBvb2xJdGVtICYgY2MuQ29tcG9uZW50OyB9LFxyXG4gICAgICAgIGluaXRpYWxTaXplOiBudW1iZXIgPSAwLFxyXG4gICAgICAgIGNhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcG9vbEtleTogc3RyaW5nID0gdGhpcy5nZXRfa2V5KGJ1bmRsZU5hbWUsIHByZWZhYk5hbWUpO1xyXG4gICAgICAgIGxldCBwb29sOiBjYy5Ob2RlUG9vbCA9IHRoaXMuX3Bvb2xzW3Bvb2xLZXldO1xyXG4gICAgICAgIGlmIChwb29sIHx8IHBvb2xLZXkgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiZG8gbm90IHJlcGVhdCBpbml0IHBvb2wgXCIgKyBwcmVmYWJOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvb2wgPSBuZXcgY2MuTm9kZVBvb2woY29tcG9uZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fcG9vbHNbcG9vbEtleV0gPSBwb29sO1xyXG4gICAgICAgICAgICB0aGlzLmFzeW5jX2dldF9wcmVmYWIoYnVuZGxlTmFtZSwgcHJlZmFiTmFtZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9vbC5wdXQodGhpcy5nZXRfaW5zdGFuY2VfY29tcChidW5kbGVOYW1lLCBwcmVmYWJOYW1lLCBjb21wb25lbnQpLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGlzX2luaXQoYnVuZGxlTmFtZTogQnVuZGxlTmFtZSwgcHJlZmFiTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcG9vbEtleTogc3RyaW5nID0gdGhpcy5nZXRfa2V5KGJ1bmRsZU5hbWUsIHByZWZhYk5hbWUpO1xyXG4gICAgICAgIHJldHVybiAoISF0aGlzLl9wb29sc1twb29sS2V5XSB8fCBwcmVmYWJOYW1lID09PSBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGdldF9rZXkoYnVuZGxlTmFtZTogQnVuZGxlTmFtZSwgcHJlZmFiTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCR7YnVuZGxlTmFtZX06Ly8ke3ByZWZhYk5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGFzeW5jX2dldF9wcmVmYWIoYnVuZGxlTmFtZTogQnVuZGxlTmFtZSwgcHJlZmFiTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKHByZWZhYjogY2MuUHJlZmFiKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfZ2V0X2J1bmRsZShidW5kbGVOYW1lLCAoYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZWZhYjogY2MuUHJlZmFiID0gYnVuZGxlLmdldDxjYy5QcmVmYWI+KHByZWZhYk5hbWUsIGNjLlByZWZhYik7XHJcbiAgICAgICAgICAgIGlmIChwcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByZWZhYik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidW5kbGUubG9hZDxjYy5QcmVmYWI+KHByZWZhYk5hbWUsIGNjLlByZWZhYiwgKGVycm9yOiBFcnJvciwgbG9hZGVkUHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobG9hZGVkUHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEAsIHR5cGUgPz8/IGNvbXBvbmVudDogYW55KTogY2MuQ29tcG9uZW50IHwgbnVsbFxyXG4gICAgcHJpdmF0ZSBnZXRfaW5zdGFuY2VfY29tcDxUIGV4dGVuZHMgTm9kZVBvb2xJdGVtICYgY2MuQ29tcG9uZW50PihidW5kbGVOYW1lOiBCdW5kbGVOYW1lLCBwcmVmYWJOYW1lOiBzdHJpbmcsIGNvbXBvbmVudDogeyBwcm90b3R5cGU6IFQgfSk6IFQgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHByZWZhYjogY2MuUHJlZmFiID0gYnVuZGxlPy5nZXQ8Y2MuUHJlZmFiPihwcmVmYWJOYW1lLCBjYy5QcmVmYWIpO1xyXG5cclxuICAgICAgICBpZiAocHJlZmFiKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IocHJlZmFiLl9uYW1lLCBjb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZTogVCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYikuZ2V0Q29tcG9uZW50PFQ+KGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UubG9hZF91cmwgPSBwcmVmYWJOYW1lO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuYnVuZGxlX25hbWUgPSBidW5kbGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwicHJlZmFiIGRvZXMgbm90IGhhdmUgY29tcG9uZW50IFwiICsgY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZXJyb3IoXCJNYWtlIHN1cmUgdGhlIHJlc291cmNlIGhhcyBiZWVuIGxvYWRlZCBiZWZvcmUgY2FsbGluZ1wiKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBOb2RlUG9vbEl0ZW0gJiBjYy5Db21wb25lbnQ+KGJ1bmRsZU5hbWU6IEJ1bmRsZU5hbWUsIHByZWZhYk5hbWU6IHN0cmluZywgY29tcG9uZW50OiB7IHByb3RvdHlwZTogVCB9KTogVCB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHBvb2xLZXk6IHN0cmluZyA9IHRoaXMuZ2V0X2tleShidW5kbGVOYW1lLCBwcmVmYWJOYW1lKTtcclxuICAgICAgICBsZXQgcG9vbDogY2MuTm9kZVBvb2wgPSB0aGlzLl9wb29sc1twb29sS2V5XTtcclxuICAgICAgICBpZiAoIXBvb2wpIHtcclxuICAgICAgICAgICAgcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbChjb21wb25lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9wb29sc1twb29sS2V5XSA9IHBvb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvb2wuZ2V0KCkuZ2V0Q29tcG9uZW50PFQ+KGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2luc3RhbmNlX2NvbXA8VD4oYnVuZGxlTmFtZSwgcHJlZmFiTmFtZSwgY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgLy8gcHVibGljIGFzeW5jX2dldDxUIGV4dGVuZHMgSU5vdGljZSAmIGNjLkNvbXBvbmVudD4oYnVuZGxlTmFtZTogQnVuZGxlTmFtZSwgcHJlZmFiTmFtZTogc3RyaW5nLCBjb21wb25lbnQ6IHsgcHJvdG90eXBlOiBUIH0sIGNhbGxiYWNrOiAoY29tcG9uZW50OiBUIHwgbnVsbCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgcHVibGljIGFzeW5jX2dldDxUIGV4dGVuZHMgTm9kZVBvb2xJdGVtICYgY2MuQ29tcG9uZW50PihidW5kbGVOYW1lOiBCdW5kbGVOYW1lLCBwcmVmYWJOYW1lOiBzdHJpbmcsIGNvbXBvbmVudDogeyBwcm90b3R5cGU6IFQgfSwgY2FsbGJhY2s6IChjb21wb25lbnQ6IFQgfCBudWxsKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcG9vbEtleTogc3RyaW5nID0gdGhpcy5nZXRfa2V5KGJ1bmRsZU5hbWUsIHByZWZhYk5hbWUpO1xyXG4gICAgICAgIGxldCBwb29sOiBjYy5Ob2RlUG9vbCA9IHRoaXMuX3Bvb2xzW3Bvb2xLZXldO1xyXG4gICAgICAgIGlmICghcG9vbCkge1xyXG4gICAgICAgICAgICBwb29sID0gbmV3IGNjLk5vZGVQb29sKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvb2xzW3Bvb2xLZXldID0gcG9vbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhwb29sLmdldCgpLmdldENvbXBvbmVudDxUPihjb21wb25lbnQpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX2dldF9wcmVmYWIoYnVuZGxlTmFtZSwgcHJlZmFiTmFtZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFzeW5jX2dldFwiLCBjb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmdldF9pbnN0YW5jZV9jb21wPFQ+KGJ1bmRsZU5hbWUsIHByZWZhYk5hbWUsIGNvbXBvbmVudCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBwdXQobm9kZTogY2MuTm9kZSB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50OiBOb2RlUG9vbEl0ZW0gPSBub2RlLmdldENvbXBvbmVudChOb2RlUG9vbEl0ZW0pO1xyXG4gICAgICAgIGlmICghY29tcG9uZW50KSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcG9vbEtleTogc3RyaW5nID0gdGhpcy5nZXRfa2V5KGNvbXBvbmVudC5idW5kbGVfbmFtZSwgY29tcG9uZW50LmxvYWRfdXJsKTtcclxuICAgICAgICBjb25zdCBwb29sOiBjYy5Ob2RlUG9vbCA9IHRoaXMuX3Bvb2xzW3Bvb2xLZXldO1xyXG4gICAgICAgIGlmIChwb29sKSB7XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICAgICAgcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2Mud2FybihcInBvb2wgZG9lcyBub3QgZXhpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBwdXRfY2hpbGRyZW4ocGFyZW50Tm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwYXJlbnROb2RlLmNoaWxkcmVuQ291bnQgLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLnB1dChwYXJlbnROb2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAobm90IHVzZSlcclxuICAgIC8qIHB1YmxpYyBzaXplKGJ1bmRsZU5hbWU6IEJ1bmRsZU5hbWUsIHByZWZhYk5hbWU6IHN0cmluZyk6IG51bWJlciB8IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBvb2xLZXk6IHN0cmluZyA9IHRoaXMuZ2V0X2tleShidW5kbGVOYW1lLCBwcmVmYWJOYW1lKTtcclxuICAgICAgICBjb25zdCBwb29sOiBjYy5Ob2RlUG9vbCA9IHRoaXMuX3Bvb2xzW3Bvb2xLZXldO1xyXG4gICAgICAgIGlmIChwb29sKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb29sLnNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Mud2FybihcInBvb2wgZG9lcyBub3QgZXhpc3RcIik7XHJcbiAgICB9ICovXHJcblxyXG4gICAgLy8gQCAobm90IHVzZSlcclxuICAgIC8qIHB1YmxpYyBjbGVhcihidW5kbGVOYW1lOiBCdW5kbGVOYW1lLCBwcmVmYWJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwb29sS2V5OiBzdHJpbmcgPSB0aGlzLmdldF9rZXkoYnVuZGxlTmFtZSwgcHJlZmFiTmFtZSk7XHJcbiAgICAgICAgY29uc3QgcG9vbDogY2MuTm9kZVBvb2wgPSB0aGlzLl9wb29sc1twb29sS2V5XTtcclxuICAgICAgICBpZiAocG9vbCkge1xyXG4gICAgICAgICAgICBwb29sLmNsZWFyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2Mud2FybihcInBvb2wgZG9lcyBub3QgZXhpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSAqL1xyXG5cclxuICAgIC8vICEhQCAobm90IHVzZSlcclxuICAgIC8qIHB1YmxpYyBjaGVjaygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHBvb2xLZXkgaW4gdGhpcy5fcG9vbHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9vbCA9IHRoaXMuX3Bvb2xzW3Bvb2xLZXldLl9wb29sO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvb2wubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb29sW2ldLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhwb29sW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gKi9cclxufVxyXG4iXX0=