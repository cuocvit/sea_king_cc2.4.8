import { NodePoolManager } from './NodePoolManager';
import { DataManager } from './DataManager';
import { GameObjectManager } from './GameObjectManager';
import { Constants } from './Constants';
import { AudioManager } from './AudioManager';
import { UIManager } from './UIManager';
import { ChannelManager } from './ChannelManager';
import { ConfigManager } from './ConfigManager';
import { EventScriptManager } from './EventScriptManager';

export class GameManager {
    private static _instance: GameManager | null = null;

    public physics: cc.PhysicsManager | null = null;
    public const: Constants;
    public obj: GameObjectManager;
    public data: DataManager;
    public config: ConfigManager;
    public pool: NodePoolManager;
    public audio: AudioManager;
    public ui: UIManager;
    public channel: ChannelManager;
    public newerGuideMgr: EventScriptManager;
    

    private constructor() {
        // Kiểm tra Constants trước khi gán instance
        if (Constants) {
            this.const = Constants.instance;
            this.obj = GameObjectManager.instance;
            this.data = DataManager.instance;
            this.config = ConfigManager.instance;
            this.pool = NodePoolManager.instance;
            this.audio = AudioManager.instance;
            this.ui = UIManager.instance;
            this.channel = ChannelManager.instance;
            this.newerGuideMgr = EventScriptManager.instance;
        }
    }

    // Singleton Pattern để đảm bảo chỉ có một instance của GameManager
    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    public init(): void {
        this.physics = cc.director.getPhysicsManager();
    }
}

const gm = GameManager.instance;
export { gm };