import { RecordData } from '../../start-scene/scripts/RecordData';
import { gm } from '../../start-scene/scripts/GameManager';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Timer } from '../../start-scene/scripts/Timer';
import { Utils } from '../../start-scene/scripts/Utils';

const { ccclass, property } = cc._decorator;

@ccclass
class RecordEntry extends NodePoolItem {
  @property(cc.Button)
  private record_start_btn: cc.Button = null;

  @property(cc.Button)
  private record_stop_btn: cc.Button = null;

  @property(cc.Label)
  private time_lbl: cc.Label = null;

  private _time: Timer | null = null;

  protected onEnable(): void {
    gm.data.event_emitter.on(RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
    this.on_record_state_change_handler();
  }

  protected onDisable(): void {
    gm.data.event_emitter.off(RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
    if (this._time) this._time.stop();
  }

  private editor_on_button_click_handler(event: cc.Event): void {
    if (event.target == this.record_start_btn.node) {
      gm.ui.show_panel(gm.const.Record);
    } else if (event.target == this.record_stop_btn.node) {
      if (Math.floor((Date.now() - gm.data.record_data.record_timestamp) / 1e3) < RecordData.MIN_RECORD_TIME) {
        gm.ui.show_notice(cc.js.formatStr("Thời gian ghi không được ít hơn %d giây!!!", RecordData.MIN_RECORD_TIME))
      } else {
        this.stop_record();
      }
    }
  }

  private on_record_state_change_handler(): void {
    this.record_start_btn.node.active = 1 != gm.data.record_data.record_state;
    this.record_stop_btn.node.active = 1 == gm.data.record_data.record_state;
    if (1 == gm.data.record_data.record_type) {
      if (1 == gm.data.record_data.record_state) {
        if (!this._time) {
          this._time = new Timer;
        }

        if (!this._time.is_running) {
          this._time.start(() => {
            const elapsedTime = Math.floor((Date.now() - gm.data.record_data.record_timestamp) / 1e3);
            this.time_lbl.string = Utils.time_format(elapsedTime, "mm:ss");
            if (elapsedTime >= RecordData.AUTO_END_RECORD_TIME) {
              this._time.stop();
              this.stop_record();
            }
          }, 1e3, 0);
        }

      } else if (this._time) {
        this._time.stop();
      }
    }
  }

  private stop_record(): void {
    gm.channel.record_stop(false);
    gm.data.record_data.record_state = 2;
    gm.data.event_emitter.emit(RecordData.RECORD_STATE_CHANGE);
    gm.ui.show_panel(gm.const.Record);
  }
}