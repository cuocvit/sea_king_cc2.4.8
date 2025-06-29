"use strict";
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