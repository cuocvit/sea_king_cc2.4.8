
import { NodePoolItem } from './NodePoolItem';
import { Utils } from './Utils';
import { BundleName, INotice } from "./Constants";

//
export class NodePoolManager {
    // @
    private static _instance: NodePoolManager | null = null;
    private _pools: { [key: string]: cc.NodePool } = {};

    // @
    public static get instance(): NodePoolManager {
        if (!this._instance) this._instance = new NodePoolManager();
        return this._instance;
    }

    // @, type!!!
    public init(
        bundleName: BundleName,
        prefabName: string,
        component: { prototype: NodePoolItem & cc.Component; },
        initialSize: number = 0,
        callback: (() => void) | null = null
    ): void {
        const poolKey: string = this.get_key(bundleName, prefabName);
        let pool: cc.NodePool = this._pools[poolKey];
        if (pool || poolKey === "") {
            cc.log("do not repeat init pool " + prefabName);
            if (callback) callback();
        } else {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
            this.async_get_prefab(bundleName, prefabName, () => {
                for (let i = 0; i < initialSize; i++) {
                    pool.put(this.get_instance_comp(bundleName, prefabName, component).node);
                }
                if (callback) callback();
            });
        }
    }

    // @
    public is_init(bundleName: BundleName, prefabName: string): boolean {
        const poolKey: string = this.get_key(bundleName, prefabName);
        return (!!this._pools[poolKey] || prefabName === "");
    }

    // @
    private get_key(bundleName: BundleName, prefabName: string): string {
        return `${bundleName}://${prefabName}`;
    }

    // @
    private async_get_prefab(bundleName: BundleName, prefabName: string, callback: (prefab: cc.Prefab) => void): void {
        Utils.async_get_bundle(bundleName, (bundle: cc.AssetManager.Bundle) => {
            const prefab: cc.Prefab = bundle.get<cc.Prefab>(prefabName, cc.Prefab);
            if (prefab) {
                callback(prefab);
            } else {
                bundle.load<cc.Prefab>(prefabName, cc.Prefab, (error: Error, loadedPrefab: cc.Prefab) => {
                    if (error) {
                        console.error(error);
                    } else {
                        callback(loadedPrefab);
                    }
                });
            }
        });
    }

    // @, type ??? component: any): cc.Component | null
    private get_instance_comp<T extends NodePoolItem & cc.Component>(bundleName: BundleName, prefabName: string, component: { prototype: T }): T | null {
        const bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        const prefab: cc.Prefab = bundle?.get<cc.Prefab>(prefabName, cc.Prefab);

        if (prefab) {
            // console.error(prefab._name, component);
            const instance: T = cc.instantiate(prefab).getComponent<T>(component);
            if (instance) {
                instance.load_url = prefabName;
                instance.bundle_name = bundleName;
                return instance;
            }
            cc.error("prefab does not have component " + component);
        }
        cc.error("Make sure the resource has been loaded before calling");
        return null;
    }

    // @
    public get<T extends NodePoolItem & cc.Component>(bundleName: BundleName, prefabName: string, component: { prototype: T }): T | null {
        const poolKey: string = this.get_key(bundleName, prefabName);
        let pool: cc.NodePool = this._pools[poolKey];
        if (!pool) {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
        }
        if (pool.size() > 0) {
            return pool.get().getComponent<T>(component);
        } else {
            return this.get_instance_comp<T>(bundleName, prefabName, component);
        }
    }

    // @
    // public async_get<T extends INotice & cc.Component>(bundleName: BundleName, prefabName: string, component: { prototype: T }, callback: (component: T | null) => void): void {
    public async_get<T extends NodePoolItem & cc.Component>(bundleName: BundleName, prefabName: string, component: { prototype: T }, callback: (component: T | null) => void): void {
        const poolKey: string = this.get_key(bundleName, prefabName);
        let pool: cc.NodePool = this._pools[poolKey];
        if (!pool) {
            pool = new cc.NodePool(component);
            this._pools[poolKey] = pool;
        }
        if (pool.size() > 0) {
            callback(pool.get().getComponent<T>(component));
            return;
        }
        this.async_get_prefab(bundleName, prefabName, () => {
            // console.log("async_get", component);
            callback(this.get_instance_comp<T>(bundleName, prefabName, component));
        });
    }

    // @
    public put(node: cc.Node | null): void {
        if (node == null) return;
        const component: NodePoolItem = node.getComponent(NodePoolItem);
        if (!component) return;
        const poolKey: string = this.get_key(component.bundle_name, component.load_url);
        const pool: cc.NodePool = this._pools[poolKey];
        if (pool) {
            node.removeFromParent(true);
            pool.put(node);
        } else {
            cc.warn("pool does not exist");
        }
    }

    // @
    public put_children(parentNode: cc.Node): void {
        for (let i = parentNode.childrenCount - 1; i >= 0; i--) {
            this.put(parentNode.children[i]);
        }
    }

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
