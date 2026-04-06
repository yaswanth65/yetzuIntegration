/**
 * Converts a relative thumbnail path to a full URL
 * @param thumbnail - Relative path like "uploads/1761927922860-902155308.png"
 * @returns Full URL like "https://productionyetzuapi.yetzu.com/uploads/1761927922860-902155308.png"
 */

// Array of study-related Unsplash images
const STUDY_IMAGES = [
    "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80", // MacBook Pro on blue table
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80", // Books and coffee
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", // Laptop and notepad
    "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=800&q=80", // Desk with books
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80", // Writing desk
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", // Study setup
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", // Book stack
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80", // Study materials
];

// Get a random study image based on course ID (consistent per course)
const getStudyImage = (courseId: string) => {
    if (!courseId) return STUDY_IMAGES[0];
    // Use course ID to generate consistent index
    const hash = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return STUDY_IMAGES[hash % STUDY_IMAGES.length];
};

export function getImageUrl(thumbnail: string | undefined): string {
    if (thumbnail?.length === 0) return getStudyImage(thumbnail || '123');
    // If it's already a full URL, return as is
    if (thumbnail?.startsWith('http://') || thumbnail?.startsWith('https://')) {
        return thumbnail;
    }

    // Remove leading slash if present
    const cleanPath = thumbnail?.startsWith('/') ? thumbnail.slice(1) : thumbnail;

    // Prepend the API base URL
    return `https://productionyetzuapi.yetzu.com/${cleanPath}` || getStudyImage(thumbnail || '123');
}
