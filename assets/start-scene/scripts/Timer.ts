// @
type TimerCallback = (cur_count: number, total_count: number) => void;

// @
class Timer {
    private _timer_id: number = 0;
    private _interval: number = 0;
    private _cur_count: number = 0;
    private _total_count: number = 0;
    private _is_running: boolean = false;
    private _on_timer_handler?: TimerCallback;

    // @
    public get is_running(): boolean {
        return this._is_running;
    }

    // @
    public start(callback: TimerCallback, interval: number = 1000, total_count: number = 0): void {
        this._on_timer_handler = callback;
        this._interval = interval;
        this._total_count = total_count;
        this._cur_count = 0;
        this._is_running = true;
        this._on_timer_handler(this._cur_count, this._total_count);
        this.next();
    }

    // @
    public stop(): void {
        if (!this._is_running) return;
        if (this._timer_id > 0) {
            clearTimeout(this._timer_id);
            this._timer_id = 0;
        }
        this._interval = 0;
        this._cur_count = 0;
        this._total_count = 0;
        this._on_timer_handler = undefined;
        this._is_running = false;
    }

    // @
    private next(): void {
        if (this._is_running && (this._total_count === 0 || this._cur_count < this._total_count)) {
            clearTimeout(this._timer_id);
            this._timer_id = setTimeout(() => {
                if (this._on_timer_handler) {
                    this._cur_count++;
                    this._on_timer_handler(this._cur_count, this._total_count);
                    this.next();
                }
            }, this._interval);
        } else {
            this.stop();
        }
    }
}

export { Timer };
