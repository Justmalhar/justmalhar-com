function resolveImageUrl(imageUrl: string, pageUrl: string): string {
  try {
    return new URL(imageUrl, pageUrl).href;
  } catch {
    return imageUrl;
  }
}

function extractMetaContent(html: string, keys: string[]): string | undefined {
  for (const key of keys) {
    const patterns = [
      new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`, 'i'),
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) return match[1];
    }
  }

  return undefined;
}

export async function fetchOgImage(pageUrl: string): Promise<string | undefined> {
  try {
    const response = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; justmalhar-link-preview/1.0)' },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return undefined;

    const html = await response.text();
    const imageUrl = extractMetaContent(html, ['og:image', 'twitter:image']);

    if (!imageUrl) return undefined;

    return resolveImageUrl(imageUrl, pageUrl);
  } catch {
    return undefined;
  }
}
