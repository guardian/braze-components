// Note, this is okay because JS is single-threaded, but will cause issues once
// tests include async code so really it is not very robust.
export const withNowAs = <T>(now: Date, fn: () => T): T => {
    const old = Date.now;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Date.now = () => now.valueOf(); // override
    const got = fn();
    Date.now = old;

    return got;
};
