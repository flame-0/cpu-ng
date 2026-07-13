/**
 * load site settings from data/settings.json
 * imported at build time - no runtime fetch needed
 */
import settingsData from '../data/settings.json';

export interface SiteSettings {
    site_title: string;
    tagline: string;
    about_text: string;
    social_links: {
        twitter: string;
        facebook: string;
        email: string;
    };
}

export const settings: SiteSettings = settingsData;
