// @
import { rewardArr } from "../../common/configs/ladder_building";
import { BasePropItemData } from "./FightTempData";
import { SingletonBase } from "./SingletonBase";

// @
export class MailTempData extends SingletonBase {
    // @
    public mail_defense_log_data_array: MailLogItemData[];
    public mail_attack_log_data_array: MailLogItemData[];
    public mail_inbox_data_array: MailInboxItemData[];
    public target_uid: string;


    // @
    constructor() {
        super();
        this.mail_defense_log_data_array = [];
        this.mail_attack_log_data_array = [];
        this.mail_inbox_data_array = [];
        this.target_uid = "";
    }
} // end: MailTempData

// any type !!!!
export class MailLogItemData {
    public uid: string;
    public star: number;
    public target_star: number;
    public change_star: number;
    public target_change_star: number;
    public op_type: string;
    public target_uid: string;
    public target_nickname: string;
    public op_result: number;
    public replay_id: number;
    public is_deduct_loss_reward: number;
    public op_reward: BasePropItemData[];
    public op_loss_reward: BasePropItemData[];
    public op_battle: MailHeroItemData[];
    public target_op_battle: MailHeroItemData[];

    // @
    constructor() {
        this.uid = "";
        this.star = 0;
        this.target_star = 0;
        this.change_star = 0;
        this.target_change_star = 0;
        this.op_type = "";
        this.target_uid = "";
        this.target_nickname = "";
        this.op_result = 0;
        this.replay_id = 0;
        this.is_deduct_loss_reward = 0;
    }
} // end: MailLogItemData

// @
export class MailHeroItemData {
    // @
    public unique_id: number;
    public id: number;
    public hp: number;
    public enter_time: number;
    public enter_grid_index: number;

    // @
    constructor() {
        this.unique_id = 0;
        this.id = 0;
        this.hp = 0;
        this.enter_time = 0;
        this.enter_grid_index = 0;
    }
} // end: MailHeroItemData

// @, !!!type
export class MailInboxItemData {
    public mail_id: number;
    public mail_type: number;
    public mail_sender: string;
    public mail_title: string;
    public mail_text: string;
    public op_status: number;
    public reward_status: number;
    public send_time: number;
    public reward_array: rewardArr[];
    public reward: { rank: number };

    // @
    constructor() {
        this.mail_id = 0;
        this.mail_type = 0;
        this.mail_sender = "";
        this.mail_title = "";
        this.mail_text = "";
        this.op_status = 0;
        this.reward_status = 0;
        this.send_time = 0;
        this.reward_array = [];
    }
} // end: MailInboxItemData
