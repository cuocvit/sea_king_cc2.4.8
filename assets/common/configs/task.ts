import { rewardArr } from "./ladder_building";

export interface TaskConfig {
    type: number;
    lv: number;
    task_id: number;
    next_id: number;
    icon_id: number;
    name: string;
    content: string;
    condition_type: number;
    condition_value: number;
    timeout: number;
    times: number;
    reward_array: rewardArr[];

}
