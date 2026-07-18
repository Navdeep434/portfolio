export const CURSOR_STYLES = [
  "ring",
  "terminal",
  "crosshair",
  "frame",
  "blob",
  "minimal",
  "icon",
] as const;

export type CursorStyle = (typeof CURSOR_STYLES)[number];

export const cursorStyleLabels: Record<CursorStyle, string> = {
  ring: "Dot + Ring",
  terminal: "Terminal Caret",
  crosshair: "Crosshair",
  frame: "Magnetic Frame",
  blob: "Elastic Blob",
  minimal: "Minimal Outline",
  icon: "Icon Swap",
};

const STORAGE_KEY = "cursor-style";
const EVENT_NAME = "cursorstylechange";

export function getCursorStyle(): CursorStyle {
  if (typeof window === "undefined") return "ring";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return (CURSOR_STYLES as readonly string[]).includes(stored ?? "")
    ? (stored as CursorStyle)
    : "ring";
}

export function setCursorStyle(style: CursorStyle) {
  window.localStorage.setItem(STORAGE_KEY, style);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: style }));
}

export function onCursorStyleChange(callback: (style: CursorStyle) => void) {
  const handler = (e: Event) => callback((e as CustomEvent<CursorStyle>).detail);
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

export function subscribeCursorStyle(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}
