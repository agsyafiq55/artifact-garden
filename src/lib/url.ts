const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site path with the deploy base (e.g. /artifact-garden). */
export const u = (path = '/') => `${base}/${path.replace(/^\//, '')}`;
