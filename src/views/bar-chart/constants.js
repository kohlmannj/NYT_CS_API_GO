export const BACKEND_ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs'
    : '/cs';
