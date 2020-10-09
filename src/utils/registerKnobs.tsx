class Registry {
    static registry = {};

    static getKnobs() {
        return this.registry;
    }

    static registerKnobs(knobs): void {
        this.registry = knobs;
    }
}

export { Registry };
