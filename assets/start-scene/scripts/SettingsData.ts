// @
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';

// @
export class SettingsData extends StorageBase {
  // @
  public static readonly EVENT_DATA_CHANGE: string = "settings_data_change";

  // @
  constructor() {
    super();
    this.STORAGE_KEY = "SettingsData"; // (extends super)
  }

  // @ !!!
  public async_read_data<T>(callback?: (data: T) => void): void {
    super.async_read_data((data: T) => {
      if (!this.is_init) {
        this.is_init = true;
        this.async_write_data();
      }
      if (callback) callback(data);
    });
  }

  
  // @
  public async_write_data(callback?: () => void): void {
    gm.data.event_emitter.emit(SettingsData.EVENT_DATA_CHANGE);
    super.async_write_data(callback);
  }
}
