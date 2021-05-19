declare global {
    interface Window {
        knobsData: { [key: string]: string };
    }
}

class KnobsData {
    constructor() {
        this.getWindow().knobsData = {};
    }

    get() {
        return this.getWindow().knobsData;
    }

    set(knobs: { [key: string]: string }): void {
        this.getWindow().knobsData = knobs;
    }

    getWindow() {
        if (window.self != window.top) {
            return window.parent;
        } else {
            return window;
        }
    }
}

const knobsData = new KnobsData();

export { knobsData };
