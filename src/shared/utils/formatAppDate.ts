/** Cómo formatear: solo fecha, o fecha con hora (minuto). */
export type FormatAppDateMode = "date" | "datetime";

const DEFAULT_LOCALE = "es-CO";
const DEFAULT_EMPTY = "—";

const DATE_PARTS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const TIME_PARTS: Pick<
  Intl.DateTimeFormatOptions,
  "hour" | "minute"
> = {
  hour: "2-digit",
  minute: "2-digit",
};

export type FormatAppDateOptions = {
  /**
   * `date`: solo día/mes/año. `datetime`: además hora:minuto (reloj 12h/24h según locale).
   * @default "datetime"
   */
  mode?: FormatAppDateMode;
  locale?: string;
  emptyPlaceholder?: string;
};

function toDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatAppDate(
  value: string | number | Date | null | undefined,
  options?: FormatAppDateOptions
): string {
  const {
    mode = "datetime",
    locale = DEFAULT_LOCALE,
    emptyPlaceholder = DEFAULT_EMPTY,
  } = options ?? {};

  if (value == null) return emptyPlaceholder;

  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return emptyPlaceholder;

  const intl: Intl.DateTimeFormatOptions =
    mode === "date" ? DATE_PARTS : { ...DATE_PARTS, ...TIME_PARTS };

  return d.toLocaleString(locale, intl);
}
