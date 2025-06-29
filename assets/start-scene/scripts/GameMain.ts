// +-+
import { gm } from './GameManager';
import { GameObject } from './GameObject';
import { NetUtils, ReportData } from './NetUtils';
import { BrowserUtils } from './BrowserUtils';
import { GraphicsUtils } from './GraphicsUtils';
import { Launch, LoadingState } from './Launch';

const { ccclass } = cc._decorator;

@ccclass("GameMain")
export class GameMain extends GameObject {
  private bg_node: cc.Node | null = null; // private ??
  private notice_node: cc.Node | null = null; // private ??
  private notice_txt: cc.RichText | null = null; // private ??

  // @ (lifecycle method)
  protected onLoad(): void {
    console.log("GameMain->onLoad", "xxxxxxxxxxxxxxxxxxxxxxxx");
    // @
    const self = this;
    this.bg_node = cc.find("Canvas/bg_node");
    this.notice_node = cc.find("Canvas/bg_node/notice_node");
    if (this.notice_node) {
      this.notice_txt = this.notice_node.getComponentInChildren(cc.RichText);
    }
    cc.macro.ENABLE_MULTI_TOUCH = true;
    cc.macro.CLEANUP_IMAGE_CACHE = true;
    cc.dynamicAtlasManager.enabled = false;
    cc.assetManager.force = true;
    cc.game.setFrameRate(30);
    console.log("Gamemanager -> init");
    gm.init();
    gm.channel.init();
    gm.data.catch_error_log();
    // @
    if (cc.sys.isBrowser) {
      console.log("--------------Browser debugging parameters start---------------\n\n");
      console.log("Version Number         version=1-n");
      console.log("Clear Save             clear=true|false");
      console.log("Combat Debugging       debug=true|false");
      console.log("\n--------------Browser debugging parameters end-----------------");
      const version = Number(BrowserUtils.get_url_param_value("version", 0));
      if (NetUtils.get_version() < version) {
        NetUtils.set_version(version.toString());
        if (BrowserUtils.get_url_param_value("clear", false)) {
          gm.data.clear_store_data();
        }
      }
    }
    // @
    console.log("GameMain->get_remote_config", 1111111111);
    gm.channel.get_remote_config(() => {
      console.log("GameMain->get_remote_config", 2222222222);
      gm.data.priority_init(() => {
        gm.data.event_emitter.on("connect_fail", self.on_connect_fail_handler, self);
        gm.channel.login(() => {
          ReportData.instance.report_once_point(10020);
          const uid: string = gm.data.server_data.uid;
          const storedUid: string | null = cc.sys.localStorage.getItem("P2_UID");
          if (!storedUid) {
            cc.sys.localStorage.setItem("P2_UID", uid);
          }
          if (uid !== storedUid) {
            cc.sys.localStorage.clear();
            self.scheduleOnce(() => {
              ReportData.instance.write_data();
              NetUtils.save_game_uuid();
              cc.sys.localStorage.setItem("P2_UID", uid);
              gm.data.main_data.clear();
              gm.data.main_data.async_write_data();
            });
          }
          //
          gm.ui.init(() => {
            Launch.instance.state = LoadingState.COMPLETE;
            gm.channel.report_event("ohayoo_game_init", {
              initid: 2,
              initname: "Resource loading started", // 资源加载开始
              network: gm.channel.get_network_state_name(),
              initresult: 0,
              initerror: "Resource loading started" // 资源加载开始
            });
            //
            gm.config.async_init(() => {
              gm.config.load_all_config(() => {
                gm.data.init(() => {
                  if (gm.data.server_data.nickname === "") {
                      gm.data.server_data.random_default_name((name: string) => {
                          gm.data.server_data.nickname = name;
                      });
                  }
                  //
                  gm.data.server_data.open_polling();
                  if (cc.sys.isBrowser) {
                    gm.data.fight_temp_data.is_debug = BrowserUtils.get_url_param_value("debug", false);
                    GraphicsUtils.show_debug_draw = gm.data.fight_temp_data.is_debug;
                  }
                  //
                  if (gm.data.fight_temp_data.is_debug) {
                    gm.data.fight_temp_data.map_id = 2;
                    gm.data.fight_temp_data.map_data_id = 1;
                    gm.data.fight_temp_data.play_type = 0;
                    gm.ui.show_fight();
                  } else {
                    gm.ui.show_start(function() {
                      gm.data.get_player_score_data_request();
                      ReportData.instance.report_once_point(10030);
                      gm.channel.report_event("ohayoo_game_init", {
                        initid: 3,
                        initname: "Enter the main interface", // 进入主界面
                        network: gm.channel.get_network_state_name(),
                        initresult: 0,
                        initerror: "Enter the main interface" // 进入主界面
                      });
                    });
                  }
                }); // end: gm.data.init
              }); // end: gm.config.load_all_config
            }); // end: gm.config.async_init
          }); // end: gm.ui.init
        }); // end: gm.channel.login
      }); // end: gm.data.priority_init
    }); // end: gm.channel.get_remote_config
  } // end: onLoad

  // @
  private on_connect_fail_handler(): void {
    if (this.notice_node) this.notice_node.active = true;
    if (this.notice_txt) {
      this.notice_txt.string = "Connection error, please check the network"; // 连接错误，请检查网络
    }
    ReportData.instance.report_once_point(10040);
  }
}
