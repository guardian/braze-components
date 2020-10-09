declare global {
    interface Window {
        registry: { [key: string]: string };
    }
}

class Registry {
    constructor() {
        this.getWindow().registry = {};
    }

    getKnobs() {
        return this.getWindow().registry;
    }

    registerKnobs(knobs): void {
        this.getWindow().registry = knobs;
    }

    getWindow() {
        if (window.self != window.top) {
            return window.parent;
        } else {
            return window;
        }
    }
}

const registry = new Registry();

export { registry };
