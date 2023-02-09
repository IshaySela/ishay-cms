import type { DatabaseContent, Content } from '../Models/Content'

export function sanitizeDbContentField(dbContent: DatabaseContent): Content {
    return {
        author: dbContent.author,
        bannerImage: dbContent.bannerImage,
        bannerImageAlt: dbContent.bannerImageAlt,
        description: dbContent.description,
        id: dbContent.id,
        markdownContent: dbContent.markdownContent,
        tags: dbContent.tags,
        title: dbContent.title
    }
}