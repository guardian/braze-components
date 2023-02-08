const getEnvironment = () => {
    const hostname = window.location.hostname;
    switch (hostname) {
        case 'braze-components.local.dev-gutools.co.uk':
            return 'LOCAL';
        case 'braze-components.code.dev-gutools.co.uk':
            return 'CODE';
        case 'braze-components.gutools.co.uk':
            return 'PROD';
        default:
            throw `Could not determine environment for hostname ${hostname}`;
    }
};

const getImageSigningUrl = () => {
    switch (getEnvironment()) {
        case 'LOCAL':
            return 'https://image-url-signing-service.local.dev-gutools.co.uk';
        case 'CODE':
            return 'https://image-url-signing-service.code.dev-gutools.co.uk';
        case 'PROD':
            return 'https://image-url-signing-service.gutools.co.uk';
    }
};

const getGridUrl = () => {
    switch (getEnvironment()) {
        case 'LOCAL':
            return 'https://media.test.dev-gutools.co.uk';
        case 'CODE':
            return 'https://media.test.dev-gutools.co.uk';
        case 'PROD':
            return 'https://media.gutools.co.uk';
    }
};

const getLoginUrl = () => {
    switch (getEnvironment()) {
        case 'LOCAL':
            return 'https://login.local.dev-gutools.co.uk';
        case 'CODE':
            return 'https://login.code.dev-gutools.co.uk';
        case 'PROD':
            return 'https://login.gutools.co.uk';
    }
};

const getPreviewUrl = () => {
    switch (getEnvironment()) {
        case 'LOCAL':
            return 'https://preview.code.dev-gutools.co.uk/education/shortcuts/2015/may/27/ban-rubbing-out-professor-says-erasers-instrument-of-the-devil-guy-claxton';
        case 'CODE':
            return 'https://preview.code.dev-gutools.co.uk/education/shortcuts/2015/may/27/ban-rubbing-out-professor-says-erasers-instrument-of-the-devil-guy-claxton';
        case 'PROD':
            return 'https://preview.gutools.co.uk/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey';
    }
}

export { getGridUrl, getImageSigningUrl, getLoginUrl, getPreviewUrl };
