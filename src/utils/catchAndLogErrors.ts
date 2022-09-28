export const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        if (e instanceof Error) {
            console.log(`Error (${description}): `, e.message);
        }
    }
};
