import { GameObjectManager } from './GameObjectManager';

const { ccclass } = cc._decorator;

@ccclass
export class GameObject extends cc.Component {
    public __unique_id: number;
    private __create_time: number; // ?
    public __destroy_time: number;

    constructor() {
        super();
        this.__unique_id = GameObjectManager.unique_id;
        this.__create_time = Date.now();
        GameObjectManager.instance.add(this);
    }

    protected onDestroy(): void {
        this.__destroy_time = Date.now();
        GameObjectManager.instance.remove(this);
    }
}