// *-*
import { TaskData } from './TaskData';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { TaskEntryItem } from './TaskEntryItem';
import { BundleName } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
export class TaskEntry extends NodePoolItem {
    @property(cc.Prefab)
    private task_entry_item_prefab: cc.Prefab | null = null;

    private task_entry_item_array: TaskEntryItem[] = [];

    constructor() {
        super();
    }

    protected onLoad(): void {
        const dailyTaskCount: number = gm.data.task_data.daily_task_count;
        for (let i: number = 0; i < dailyTaskCount; i++) {
            const item = gm.pool.get(BundleName.TASK, "prefabs/task_entry_item", TaskEntryItem);
            this.node.addChild(item.node);
            this.task_entry_item_array[i] = item;
        }
    }

    protected onEnable(): void {
        gm.data.event_emitter.on(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    private update_view(): void {
        const taskData = gm.data.task_data;
        for (let index = 0; index < this.task_entry_item_array.length; index++) {
            const data = taskData.task_data_array[index];
            if (data) {
                this.task_entry_item_array[index].node.active = true;
                this.task_entry_item_array[index].data = data;
            } else {
                this.task_entry_item_array[index].node.active = false;
            }
        }
    }
}