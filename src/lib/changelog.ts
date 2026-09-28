export interface ChangelogEntry {
  version: string;
  date: string;
  body: string;
}

export interface ChangelogPreviewEntry {
  version: string;
  date: string;
  summary: string;
}

const HEADING_RE = /^##\s+(v?\S+)\s+—\s+(.+)$/gm;

/** Splits a product's changelog.md into one entry per `## vX.Y.Z — <date>` heading. */
export function splitChangelogEntries(markdown: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const matches = [...markdown.matchAll(HEADING_RE)];
  for (let i = 0; i < matches.length; i++) {
    const [, version, date] = matches[i];
    const bodyStart = matches[i].index! + matches[i][0].length;
    const bodyEnd = matches[i + 1]?.index ?? markdown.length;
    entries.push({
      version,
      date: date.trim(),
      // Each entry's own trailing "---" separator isn't part of its content.
      body: markdown.slice(bodyStart, bodyEnd).trim().replace(/\n?---\s*$/, ''),
    });
  }
  return entries;
}

/** Finds one version's entry, matching with or without a leading "v". */
export function findChangelogEntry(
  markdown: string,
  version: string,
): ChangelogEntry | undefined {
  const normalized = version.startsWith('v') ? version : `v${version}`;
  return splitChangelogEntries(markdown).find(
    (e) => e.version === normalized || e.version === version,
  );
}

const MAX_SUMMARY_LENGTH = 100;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

// A changelog entry's summary is its bullet's bold lead-in ("**Title**:
// rest...") when it has one, since that's already written as a short label —
// otherwise the first sentence of its first bullet/paragraph, truncated.
function summarize(body: string): string {
  const lines = body.split('\n').map((l) => l.trim());
  const firstContentLine = lines.find(
    (l) => l.length > 0 && !l.startsWith('#'),
  );
  if (!firstContentLine) return '';

  const bulletText = firstContentLine.replace(/^[-*]\s+/, '');
  const boldLead = bulletText.match(/^\*\*(.+?)\*\*:?\s*/);
  if (boldLead) return truncate(boldLead[1], MAX_SUMMARY_LENGTH);

  const plain = bulletText.replace(/\*\*/g, '').replace(/`/g, '');
  const firstSentence = plain.match(/^[^.]+\./);
  return truncate(firstSentence ? firstSentence[0] : plain, MAX_SUMMARY_LENGTH);
}

/**
 * The first `count` version entries out of a product's changelog.md, as
 * compact {version, date, summary} previews for /products — the changelog
 * body stays the single source of truth, so there's nothing else to keep in
 * sync when a new version ships.
 */
export function parseChangelogPreview(
  markdown: string,
  count = 3,
): ChangelogPreviewEntry[] {
  return splitChangelogEntries(markdown)
    .slice(0, count)
    .map(({ version, date, body }) => ({
      version,
      date,
      summary: summarize(body),
    }));
}
