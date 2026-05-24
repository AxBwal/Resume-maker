/**
 * Turn user input (with or without protocol) into a full https URL.
 */
export function normalizeProfileUrl(input) {
  const trimmed = (input || "").trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

/**
 * Display text for resume header links (no protocol, no trailing slash).
 */
export function formatProfileLinkLabel(input) {
  const trimmed = (input || "").trim();
  if (!trimmed) return "";

  let label = trimmed
    .replace(/^https?:\/\//i, "")
    .replace(/^\/\//, "")
    .replace(/^www\./i, "");

  return label.replace(/\/+$/, "");
}
