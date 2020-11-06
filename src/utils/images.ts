const ALLOWED_HOSTS = ['https://media.guim.co.uk/', 'https://i.guim.co.uk/'];

export const isImageUrlAllowed = (imageUrl: string): boolean =>
    ALLOWED_HOSTS.some((host) => imageUrl.startsWith(host));
