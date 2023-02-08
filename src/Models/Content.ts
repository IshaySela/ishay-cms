

/**
 * The interface Content describes a content item in the database.
 */
export interface Content {
    author: string;
    title: string;
    markdownContent: string;
    tags: string[];
    bannerImage: string; // Url to an image.
    bannerImageAlt: string; // Alt text to the image
    id: string;
    description: string;
}

export type DisplayContent = Omit<Content, "markdownContent">