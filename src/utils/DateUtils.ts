export default class DateUtils {
    /**
     * Returns today's date as a formatted string.
     * The format used is: Month (long), Day (numeric), Year (numeric).
     *
     * @returns A string representing the current date in the format: "Month Day, Year".
     *
     * @example
     * GetDate.getDate() // returns "July 15, 2025"
     */

    static getToday(): string {
        const today: string = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return today;
    }
}
