// src/utils/formatDate.ts
export const formatDate = (
  isoDate?: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale = undefined,
): string => {
  if (!isoDate) return '';

  let date: Date;
  if (isoDate instanceof Date) {
    date = isoDate;
  } else {
    // try to parse; if invalid -> return original string
    date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return String(isoDate);
  }

  // Default formatting: "Sep 23, 2025"
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat(
    locale as any,
    options ?? defaultOptions,
  );
  return formatter.format(date);
};

/** Optional helper - returns "Today", "Yesterday" or formatted date. */
export const formatDateFriendly = (
  isoDate?: string | Date,
  locale = undefined,
): string => {
  if (!isoDate) return '';

  const date = isoDate instanceof Date ? isoDate : new Date(isoDate);
  if (Number.isNaN(date.getTime())) return String(isoDate);

  const today = new Date();
  const diffDays = Math.floor(
    (startOfDay(today).getTime() - startOfDay(date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  // otherwise use formatDate
  return formatDate(date, undefined, locale);
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
