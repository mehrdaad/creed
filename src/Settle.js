'use strict';

import { silenceError }from './inspect';

export default class Settle {
    constructor(resolve, results) {
        this.done = false;
        this.pending = 0;
        this.results = results;
        this.resolve = resolve;
    }

    valueAt(x, i, promise) {
        this.settleAt(this.resolve(x), i, promise);
    }

    fulfillAt(p, i, promise) {
        this.settleAt(p, i, promise);
    }

    rejectAt(p, i, promise) {
        silenceError(p);
        this.settleAt(p, i, promise);
    }

    settleAt(p, i, promise) {
        this.results[i] = state;
        this.check(this.pending - 1, promise);
    }

    complete(total, promise) {
        this.done = true;
        this.check(this.pending + total, promise);
    }

    check(pending, promise) {
        this.pending = pending;
        if (this.done && pending === 0) {
            promise._fulfill(this.results);
        }
    }
}
