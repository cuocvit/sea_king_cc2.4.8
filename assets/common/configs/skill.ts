export interface SkillConfig {
    id: number;
    skill_lv: number;
    name: string;
    desc: string;
    is_show: number;
    sea_soul: number;
    icon: number;
    heroid: number;
    skill_range: number;
    skill_type: number;
    fly_type: number;
    is_fly_rotate: number;
    skill_pos: number;
    fire_time: number;
    prepare_skill_anim_time: number;
    skill_name: string;
    skill_anim_time: number;
    hit_time
    skill_anim_loop: number;
    hit_name: string;
    hit_range: number;
    hp_add: number;
    damage_ratio: number;
    defense_ratio: number;
    effect_array: Effect[];
    
}
interface Effect {
    skill_effect_id: number
    trigger_ratio: number
    value: number;
    duration: number;
}
