"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeDbContentField = void 0;
function sanitizeDbContentField(dbContent) {
    return {
        author: dbContent.author,
        bannerImage: dbContent.bannerImage,
        bannerImageAlt: dbContent.bannerImageAlt,
        description: dbContent.description,
        id: dbContent.id,
        markdownContent: dbContent.markdownContent,
        tags: dbContent.tags,
        title: dbContent.title
    };
}
exports.sanitizeDbContentField = sanitizeDbContentField;
//# sourceMappingURL=santizieDbContentField.js.map