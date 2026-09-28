/** URL-safe slug for a post category, e.g. "Security" -> "security". */
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}
