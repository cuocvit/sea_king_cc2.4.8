//
import { GameObject } from './GameObject';

interface ObjectListEntry {
    map: Record<number, GameObject>;
    count: number;
}

export class GameObjectManager {
    private static _instance: GameObjectManager | null = null;
    private static _unique_id: number = 0;
    private _object_list: Record<string, ObjectListEntry> = {};

    private constructor() {}

    public static get instance(): GameObjectManager {
        this._instance || (this._instance = new GameObjectManager());
        return this._instance;
    }

    public static get unique_id(): number {
        return this._unique_id++;
    }

    public add(gObj: GameObject | null): void {
        if (gObj != null) {
            const className: string = cc.js.getClassName(gObj);
            let entry: ObjectListEntry | undefined = this._object_list[className];
            if (!entry) {
                entry = { map: {}, count: 0 };
                this._object_list[className] = entry;
            }
            entry.map[gObj.__unique_id] = gObj;
            entry.count++;
        }
    }

    public remove(gObj: GameObject | null): void {
        if (gObj != null) {
            const className: string = cc.js.getClassName(gObj);
            const entry: ObjectListEntry | undefined = this._object_list[className];
            if (entry) {
                const object: GameObject | undefined = entry.map[gObj.__unique_id];
                if (object) {
                    object.__destroy_time = Date.now();
                    delete entry.map[gObj.__unique_id];
                    entry.count--;
                }
            }
        }
    }

    public count(gObj: GameObject | null): number {
        if (gObj == null) {
            return 0;
        }
        const className: string = cc.js.getClassName(gObj);
        const entry: ObjectListEntry | undefined = this._object_list[className];
        return entry ? entry.count : 0;
    }

    public info(): void {
        let totalCount: number = 0;
        let log: string = "%c\n============== Game Object Info ==================";
        for (const className in this._object_list) {
            const entry: ObjectListEntry = this._object_list[className];
            totalCount += entry.count;
            log += `\n${className} count is ${entry.count}`;
        }
        log += `\n\nTotal count is ${totalCount}`;
        log += "\n\n============== Game Object Info ==================\n";
        console.log(log, "font-weight:bold;");
    }
}
