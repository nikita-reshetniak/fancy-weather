export default class Time {
  static getDate() {
    const timestamp = new Date(Date.now());
    const year = timestamp.getFullYear();
    const monthDay = timestamp.getDate();
    const month = timestamp.getMonth();
    const hh = timestamp.getHours();
    const mm = timestamp.getMinutes();
    const date = new Date(year, month, monthDay, hh, mm);
    return date.toLocaleString('en', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  static getWeekDay(date, locale) {
    const datetime = new Date(date);
    return datetime.toLocaleDateString(locale, { weekday: 'long' });
  }
}