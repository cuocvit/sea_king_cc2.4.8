"use strict";

export class BundleManager {
    public static _instance: BundleManager | null = null;
    static COMMON: string = "common";
    static LOADING: string = "loading";
    static START: string = "start";

    private _map: Record<string, { deps: any[] }> = {
        common: { deps: [] },
        loading: { deps: [] },
        start: { deps: [] }
    };

    constructor() { };

    public static get instance(): BundleManager {
        if (!this._instance) {
            this._instance = new BundleManager;
        }
        return this._instance;
    }

    private async_get_bundle(bundleName: string, callback: (bundle: cc.AssetManager.Bundle | null) => void) {
        const existingBundle = cc.assetManager.getBundle(bundleName);
        if (existingBundle) {
            callback(existingBundle);
        } else {
            this._map[bundleName];
            cc.assetManager.loadBundle(bundleName, (err, bundle) => {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    console.error("load " + bundleName + " bundle successfully.");
                    void callback(bundle);
                    return;
                }
            })
        }
    }
}