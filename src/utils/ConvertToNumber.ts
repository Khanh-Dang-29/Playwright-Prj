export default class ConvertToNumber {
    async changeToNumber(str: string): Promise<number> {
        const numberOnly = str.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }
}