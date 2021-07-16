export type CountryGroupId =
    | 'GBPCountries'
    | 'UnitedStates'
    | 'AUDCountries'
    | 'EURCountries'
    | 'International'
    | 'NZDCountries'
    | 'Canada';

// Used to internationalise 'Support the Guardian' links
export type SupportRegionId = 'UK' | 'US' | 'AU' | 'EU' | 'INT' | 'NZ' | 'CA';

type IsoCurrency = 'GBP' | 'USD' | 'AUD' | 'EUR' | 'NZD' | 'CAD';

type CountryGroup = {
    name: string;
    currency: IsoCurrency;
    countries: string[];
    supportRegionId: SupportRegionId;
};

type CountryGroups = Record<CountryGroupId, CountryGroup>;

const countryGroups: CountryGroups = {
    GBPCountries: {
        name: 'United Kingdom',
        currency: 'GBP',
        countries: ['GB', 'FK', 'GI', 'GG', 'IM', 'JE', 'SH'],
        supportRegionId: 'UK',
    },
    UnitedStates: {
        name: 'United States',
        currency: 'USD',
        countries: ['US'],
        supportRegionId: 'US',
    },
    AUDCountries: {
        name: 'Australia',
        currency: 'AUD',
        countries: ['AU', 'KI', 'NR', 'NF', 'TV'],
        supportRegionId: 'AU',
    },
    EURCountries: {
        name: 'Europe',
        currency: 'EUR',
        countries: [
            'AD',
            'AL',
            'AT',
            'BA',
            'BE',
            'BG',
            'BL',
            'CH',
            'CY',
            'CZ',
            'DE',
            'DK',
            'EE',
            'ES',
            'FI',
            'FO',
            'FR',
            'GF',
            'GL',
            'GP',
            'GR',
            'HR',
            'HU',
            'IE',
            'IT',
            'LI',
            'LT',
            'LU',
            'LV',
            'MC',
            'ME',
            'MF',
            'IS',
            'MQ',
            'MT',
            'NL',
            'NO',
            'PF',
            'PL',
            'PM',
            'PT',
            'RE',
            'RO',
            'RS',
            'SE',
            'SI',
            'SJ',
            'SK',
            'SM',
            'TF',
            'TR',
            'WF',
            'YT',
            'VA',
            'AX',
        ],
        supportRegionId: 'EU',
    },
    International: {
        name: 'International',
        currency: 'USD',
        countries: [
            'AE',
            'AF',
            'AG',
            'AI',
            'AM',
            'AO',
            'AQ',
            'AR',
            'AS',
            'AW',
            'AZ',
            'BB',
            'BD',
            'BF',
            'BH',
            'BI',
            'BJ',
            'BM',
            'BN',
            'BO',
            'BQ',
            'BR',
            'BS',
            'BT',
            'BV',
            'BW',
            'BY',
            'BZ',
            'CC',
            'CD',
            'CF',
            'CG',
            'CI',
            'CL',
            'CM',
            'CN',
            'CO',
            'CR',
            'CU',
            'CV',
            'CW',
            'CX',
            'DJ',
            'DM',
            'DO',
            'DZ',
            'EC',
            'EG',
            'EH',
            'ER',
            'ET',
            'FJ',
            'FM',
            'GA',
            'GD',
            'GE',
            'GH',
            'GM',
            'GN',
            'GQ',
            'GS',
            'GT',
            'GU',
            'GW',
            'GY',
            'HK',
            'HM',
            'HN',
            'HT',
            'ID',
            'IL',
            'IN',
            'IO',
            'IQ',
            'IR',
            'JM',
            'JO',
            'JP',
            'KE',
            'KG',
            'KH',
            'KM',
            'KN',
            'KP',
            'KR',
            'KW',
            'KY',
            'KZ',
            'LA',
            'LB',
            'LC',
            'LK',
            'LR',
            'LS',
            'LY',
            'MA',
            'MD',
            'MG',
            'MH',
            'MK',
            'ML',
            'MM',
            'MN',
            'MO',
            'MP',
            'MR',
            'MS',
            'MU',
            'MV',
            'MW',
            'MX',
            'MY',
            'MZ',
            'NA',
            'NC',
            'NE',
            'NG',
            'NI',
            'NP',
            'NU',
            'OM',
            'PA',
            'PE',
            'PG',
            'PH',
            'PK',
            'PN',
            'PR',
            'PS',
            'PW',
            'PY',
            'QA',
            'RU',
            'RW',
            'SA',
            'SB',
            'SC',
            'SD',
            'SG',
            'SL',
            'SN',
            'SO',
            'SR',
            'SS',
            'ST',
            'SV',
            'SX',
            'SY',
            'SZ',
            'TC',
            'TD',
            'TG',
            'TH',
            'TJ',
            'TK',
            'TL',
            'TM',
            'TN',
            'TO',
            'TT',
            'TW',
            'TZ',
            'UA',
            'UG',
            'UM',
            'UY',
            'UZ',
            'VC',
            'VE',
            'VG',
            'VI',
            'VN',
            'VU',
            'WS',
            'YE',
            'ZA',
            'ZM',
            'ZW',
        ],
        supportRegionId: 'INT',
    },
    NZDCountries: {
        name: 'New Zealand',
        currency: 'NZD',
        countries: ['NZ', 'CK'],
        supportRegionId: 'NZ',
    },
    Canada: {
        name: 'Canada',
        currency: 'CAD',
        countries: ['CA'],
        supportRegionId: 'CA',
    },
};

type CountryNameMap = Record<string, string>;

const countryNames: CountryNameMap = {
    GB: 'the UK',
    US: 'the US',
    AU: 'Australia',
    CA: 'Canada',
    DE: 'Germany',
    NZ: 'New Zealand',
    FR: 'France',
    NL: 'the Netherlands',
    IE: 'Ireland',
    SE: 'Sweden',
    CH: 'Switzerland',
    NO: 'Norway',
    BE: 'Belgium',
    IT: 'Italy',
    IN: 'India',
    ES: 'Spain',
    DK: 'Denmark',
    SG: 'Singapore',
    AT: 'Austria',
    FI: 'Finland',
    HK: 'Hong Kong',
    LU: 'Luxembourg',
    PT: 'Portugal',
    AE: 'the UAE',
    MX: 'Mexico',
    BR: 'Brazil',
    ZA: 'South Africa',
    TW: 'Taiwan',
    IL: 'Israel',
    JP: 'Japan',
    CZ: 'the Czech Republic',
    GR: 'Greece',
    IS: 'Iceland',
    TH: 'Thailand',
    MY: 'Malaysia',
    RO: 'Romania',
    PL: 'Poland',
    HU: 'Hungary',
    TR: 'Turkey',
    KR: 'Korea',
    SI: 'Slovenia',
    CL: 'Chile',
    CO: 'Colombia',
    QA: 'Qatar',
    HR: 'Croatia',
    SK: 'Slovakia',
    ID: 'Indonesia',
    VN: 'Vietnam',
    CN: 'China',
    MT: 'Malta',
    AR: 'Argentina',
    KE: 'Kenya',
    PR: 'Puerto Rico',
    RU: 'Russia',
    EE: 'Estonia',
    CR: 'Costa Rica',
    PA: 'Panama',
};

const extendedCurrencySymbol = {
    GBPCountries: '£',
    UnitedStates: '$',
    AUDCountries: '$',
    Canada: 'CA$',
    EURCountries: '€',
    NZDCountries: 'NZ$',
    International: '$',
};

export const countryCodeToCountryGroupId = (countryCode: string): CountryGroupId => {
    const availableCountryGroupIds = Object.keys(countryGroups) as CountryGroupId[];

    const foundCountryGroupId = availableCountryGroupIds.find((countryGroupId) =>
        countryGroups[countryGroupId].countries.includes(countryCode),
    );

    return foundCountryGroupId || 'International';
};

export const inCountryGroups = (
    countryCode?: string,
    countryGroups: CountryGroupId[] = [],
): boolean => {
    // Always True if no locations set for the test
    if (countryGroups.length === 0) {
        return true;
    }

    // Always False if user location unknown but test has locations set
    if (!countryCode) {
        return false;
    }

    return countryGroups.includes(countryCodeToCountryGroupId(countryCode));
};

const defaultCurrencySymbol = '£';

// There's an interesting issue here where the default currency symbol (£) is
// returned if we don't have a geolocation. But if we do have a geolocation, but
// fail to map back to a country group then we'll fall back to 'USD'.
// We're not sure whether this is intentional or not yet but porting as is for now
export const getLocalCurrencySymbol = (geolocation?: string): string => {
    if (geolocation) {
        const countryGroupId = countryCodeToCountryGroupId(geolocation) as CountryGroupId;
        return extendedCurrencySymbol[countryGroupId];
    }

    return defaultCurrencySymbol;
};

export const getCountryName = (geolocation?: string): string | undefined => {
    if (geolocation) {
        return countryNames[geolocation];
    }

    return undefined;
};

const countryCodeToSupportRegionId = (countryCode: string): SupportRegionId =>
    countryGroups[countryCodeToCountryGroupId(countryCode)]?.supportRegionId;

export const addRegionIdToSupportUrl = (originalUrl: string, countryCode?: string): string => {
    if (countryCode) {
        const supportRegionId = countryCodeToSupportRegionId(countryCode);
        if (supportRegionId) {
            return originalUrl.replace(
                /(support.theguardian.com)\/(contribute|subscribe)/,
                (_, domain, path) => `${domain}/${supportRegionId.toLowerCase()}/${path}`,
            );
        }
    }

    return originalUrl;
};
