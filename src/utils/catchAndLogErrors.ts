export const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        const message = e instanceof Error ? e.message : e;
        console.log(`Error (${description}): `, message);
    }
};
