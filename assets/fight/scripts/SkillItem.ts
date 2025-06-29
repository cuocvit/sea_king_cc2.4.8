import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName } from '../../start-scene/scripts/Constants';
import { FightConstants } from '../../start-scene/scripts/FightConstants';
import { ParabolaPath } from '../../start-scene/scripts/ParabolaPath';
import { SkillConfig } from '../../common/configs/skill';
import { FightHeroItem } from './FightHeroItem';
import { FightBuildingItem } from './FightBuildingItem';
import { FightWallItem } from './FightWallItem';

const { ccclass } = cc._decorator;

export class SkillItemData {
  public id: number;
  public type: number;
  public skill_damage: number;
  public move_speed: number;

  constructor() {
    this.id = 0;
    this.type = 0;
    this.skill_damage = 0;
    this.move_speed = 100;
  }
}


@ccclass
export class SkillItem extends NodePoolItem {
  private _data: SkillItemData | null = null;
  private _is_move: boolean = false;
  private _hero_item: FightWallItem | null | FightBuildingItem | FightHeroItem = null;
  private _offset: cc.Vec3 | null = null;
  private _end_offset: cc.Vec3 | null = null;
  private _target_node: cc.Node | null = null;
  private _speed: number = 0;
  private _skill_node: cc.Node | null = null;
  private _is_fly_rotate: number = 0;
  private _callback: (() => void) | null = null;
  private _fly_callback: (() => void) | null = null;
  private _move_type: number = 0;
  private _path: ParabolaPath | null = null;

  get data(): SkillItemData | null {
    return this._data;
  }

  set data(value: SkillItemData | null) {
    this._data = value;
  }

  public reset(): void {
    this._data = null;
    this._is_move = false;
    this._hero_item = null;
    this._offset = null;
    this._end_offset = null;
    this._target_node = null;
    this._speed = 0;
    this._skill_node = null;
    this._is_fly_rotate = 0;
    this._callback = null;
    this._fly_callback = null;
    gm.pool.put_children(this.node);

    const skillItemArray = gm.data.fight_temp_data.skill_item_array;
    let index = skillItemArray.indexOf(this);
    if (- 1 < index) {
      const e = skillItemArray.splice(index, 1)[0];
      gm.pool.put(e.node);
    }
  }

  public unuse(): void {
    super.unuse();
    this.reset();
  }

  public reuse(): void {
    super.reuse();
  }

  public update(deltaTime: number): void {
    if (this._is_move) {
      if (this._move_type == 0) {
        const startPoint = gm.ui.fight.convert_to_scene_point(this._hero_item.node, this._offset);
        const endPoint = gm.ui.fight.convert_to_scene_point(this._target_node, this._end_offset);
        const direction = endPoint.sub(startPoint);
        let angle = Math.atan2(direction.y, direction.x) / Math.PI * 180;
        this._skill_node.angle = 0 < this._is_fly_rotate ? angle : 0;
        const currentPosition = this._skill_node.position.add(direction.normalize().mulSelf(deltaTime * this._speed * cc.director.getScheduler().getTimeScale()));

        if (currentPosition.sub(startPoint).mag() > direction.mag()) {
          this._skill_node.position = endPoint;
          this._is_move = false;
          if (this._fly_callback) {
            this._fly_callback();
          }
        } else {
          this._skill_node.position = currentPosition
        }


      } else if (this._move_type == 1) {
        if (this._path.time < this._path.totalTime) {
          const speedFactor = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? 60 : 20;
          this._path.time += deltaTime * speedFactor;
          this._skill_node.position = this._path.position;
          const direction = this._path.getPosition(this._path.time + deltaTime).sub(this._skill_node.position);
          this._skill_node.angle = 180 * Math.atan2(direction.y, direction.x) / Math.PI;

        } else {
          this._skill_node.position = this._path.end;
          this._is_move = false;
          if (this._fly_callback) {
            this._fly_callback();
          }
        }
      }
    }
  }

  public set_attack_target(heroItem: FightHeroItem, offset: cc.Vec3, endOffset: cc.Vec3, targetNode: number, skillType: cc.Node, callback: () => void): void {

    if (cc.isValid(skillType)) {
      const skillData = heroItem.data;
      gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skillData.fly_weapon_name, NodePoolItem, (t) => {
        this.node.addChild(t.node);
        this._is_move = true;
        this._move_type = targetNode;

        if (targetNode == 0) {
          const startPoint = gm.ui.fight.convert_to_scene_point(heroItem.node, offset);
          const scenePoint = gm.ui.fight.convert_to_scene_point(skillType, endOffset);
          const endPoint = scenePoint.sub(startPoint);
          const angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;

          this.node.position = startPoint;
          this.node.angle = angle;
          this._hero_item = heroItem;
          this._offset = offset;
          this._end_offset = endOffset;
          this._target_node = skillType;
          this._speed = FightConstants.FLY_WEAPON_SPEED;
          this._skill_node = this.node;
          this._callback = callback;
          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }

        } else if (targetNode == 1) {
          const startPoint = gm.ui.fight.convert_to_effect_point(heroItem.node, offset);
          const scenePoint = gm.ui.fight.convert_to_effect_point(skillType, endOffset);
          this.node.position = startPoint;
          this._skill_node = this.node;
          this._offset = offset, this._end_offset = endOffset;
          this._path = new ParabolaPath(startPoint, scenePoint, 16, -9.8);
          this._path.isClampStartEnd = true;
          const endPoint = this._path.getPosition(this._path.time + 1).sub(this._skill_node.position);
          this._skill_node.angle = 180 * Math.atan2(endPoint.y, endPoint.x) / Math.PI;
          this._callback = callback;
          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }

        }
      })
    }
  }

  public set_fly_skill_target(skill: SkillConfig, heroItem: FightHeroItem, offset: cc.Vec3, endOffset: cc.Vec3, targetNode: number, skillType: cc.Node, callback: () => void): void {

    if (cc.isValid(skillType)) {
      heroItem.data;
      gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skill.skill_name, NodePoolItem, (t) => {
        this.node.addChild(t.node);
        this._is_move = true;
        this._move_type = targetNode;
        if (targetNode == 0) {
          const startPoint = gm.ui.fight.convert_to_scene_point(heroItem.node, offset);
          const scenePoint = gm.ui.fight.convert_to_scene_point(skillType, endOffset);
          const endPoint = scenePoint.sub(startPoint);
          const angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;

          this.node.angle = 0 < skill.is_fly_rotate ? angle : 0;
          this.node.position = startPoint;
          this._hero_item = heroItem;
          this._offset = offset;
          this._end_offset = endOffset;
          this._target_node = skillType;
          this._speed = FightConstants.FLY_WEAPON_SPEED;
          this._skill_node = this.node;
          this._is_fly_rotate = skill.is_fly_rotate;
          this._callback = callback;
          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }

        } else if (targetNode == 1) {
          const startPoint = gm.ui.fight.convert_to_effect_point(heroItem.node, offset);
          const effectPoint = gm.ui.fight.convert_to_effect_point(skillType, endOffset);

          this.node.position = startPoint;
          this._skill_node = this.node;
          this._offset = offset;
          this._end_offset = endOffset;
          this._path = new ParabolaPath(startPoint, effectPoint, 16, -9.8);
          this._path.isClampStartEnd = true;

          const endPoint = this._path.getPosition(this._path.time + 1).sub(this._skill_node.position);
          this._skill_node.angle = 180 * Math.atan2(endPoint.y, endPoint.x) / Math.PI;
          this._callback = callback;

          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }
        }
      })
    }
  }

  public set_skill_target(skill: SkillConfig, targetNode: FightHeroItem, offset: cc.Vec3, endOffset: cc.Node, callback: () => void): void {

    gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skill.skill_name, NodePoolItem, (t) => {
      this.node.addChild(t.node);
      this.scheduleOnce(() => {
        callback();
        this.put_to_pool();
      }, skill.hit_time)
    })
  }

  public set_building_attack_target(building: FightBuildingItem | FightWallItem, offset: cc.Vec3, endOffset: cc.Vec3, targetNode: number, skillType: cc.Node, callback: () => void): void {

    if (cc.isValid(skillType)) {
      const data = building.data;
      gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + data.fly_weapon_name, NodePoolItem, (t) => {
        this.node.addChild(t.node);
        this._is_move = true;
        this._move_type = targetNode;

        if (targetNode == 0) {
          const startPoint = gm.ui.fight.convert_to_scene_point(building.node, offset);
          const endPoint = gm.ui.fight.convert_to_scene_point(skillType).sub(startPoint);
          const angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;

          this.node.position = startPoint;
          this.node.angle = angle;
          this._hero_item = building;
          this._offset = offset;
          this._move_type = 0;
          this._end_offset = cc.Vec3.ZERO;
          this._target_node = skillType;
          this._speed = FightConstants.FLY_WEAPON_SPEED;
          this._skill_node = this.node;
          this._callback = callback;
          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }

        } else if (targetNode == 1) {
          const startPoint = gm.ui.fight.convert_to_effect_point(building.node, offset);
          const endPoint = gm.ui.fight.convert_to_effect_point(skillType, endOffset);
          this.node.position = startPoint;
          this._skill_node = this.node;
          this._offset = offset;
          this._end_offset = endOffset;
          this._path = new ParabolaPath(startPoint, endPoint, 16, -9.8);
          this._path.isClampStartEnd = true;
          const positiom = this._path.getPosition(this._path.time + 1).sub(this._skill_node.position);
          this._skill_node.angle = 180 * Math.atan2(positiom.y, positiom.x) / Math.PI;
          this._callback = callback;
          this._fly_callback = () => {
            this._callback();
            this.put_to_pool();
          }
        }
      });
    }
  }

  public put_to_pool(): void {
    this.reset();
  }
}