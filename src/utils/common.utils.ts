export class CommonUtils {
    public static formatNumber(number: number | string): string {
        return Number(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1\'');
    }

    public static formatPrice(number: number | string): string {
        return Number(number) % 1 === 0 ?
            this.formatNumberWithCommas(number) : number < 100 ?
                Number(number).toFixed(2) : this.formatNumberWithCommas(Number(number).toFixed(0));
    }

    public static capitalize(string: any): any {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    public static trimPriceToThreeDecimal(price: any): any {
        if (price % 1 === 0) {
            return price;
        } else {
            let cachedPrice = price.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];

            while (cachedPrice.charAt(cachedPrice.length-1) === '0') {
                cachedPrice = cachedPrice.substring(0, cachedPrice.length - 1);
            }

            return parseFloat(cachedPrice);
        }
    }

    public static formatNumberWithCommas(number: any): any {
        const options = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        };

        return Number(number).toLocaleString('en', options);
    }

    public static formatChance(chance: any, items: any): any {
        const percentage = (chance * 100).toFixed(1);

        return chance > items ? `x${items}` :
            chance > 1 ? `x${chance.toFixed(2)}` :
            chance > 0 ? `${percentage}% for 1` : 0;
    }

    public static cutAddress(address: any, symbol?: any): any {
        const splitter = symbol ? symbol : '~~';

        return address.slice(0, 4) + splitter + address.slice(38);
    }

    public static getSellerShortAddress(item: any): any {
        const sellerAddress = item.seller;

        return `${sellerAddress.substring(0, 4)}...${sellerAddress.substring(sellerAddress.length - 4, sellerAddress.length)}`;
    }

    public static sortByDirection(array: any, sortDir: any): any {
        return [...array].sort((a, b) => sortDir === 'asc' ? a - b : b - a);
    }

    public static basicSort<T = unknown>(array: T[], sortType: any, sortDir?: any): T[] {
        return [...array].sort((a, b) => sortDir === 'asc' ? a[sortType] - b[sortType] : b[sortType] - a[sortType]);
    }

    public static checkArrayForDuplicates(array: any): any {
        return new Set(array).size !== array.length;
    }

    public static convertFloatNumberToSuffixNumber(number: any): number | string {
        if (number < 100) {
            return Number(number.toFixed(2));
        }

        const roundedNumber = Math.floor(number);
        const digits = roundedNumber.toString().split('');
        let convertedNumber: number | string;
        let digitsString: string;

        switch (digits.length) {
            case 4:
                digitsString = `${digits[0]}.${digits[1]}${digits[2]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}k`;

                break;
            case 5:
                digitsString = `${digits[0]}${digits[1]}.${digits[2]}${digits[3]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}k`;

                break;
            case 6:
                digitsString = `${digits[0]}${digits[1]}${digits[2]}.${digits[3]}${digits[4]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}k`;

                break;
            case 7:
                digitsString = `${digits[0]}.${digits[1]}${digits[2]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}m`;

                break;
            case 8:
                digitsString = `${digits[0]}${digits[1]}.${digits[2]}${digits[3]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}m`;

                break;
            case 9:
                digitsString = `${digits[0]}${digits[1]}${digits[2]}.${digits[3]}${digits[4]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}m`;

                break;
            case 10:
                digitsString = `${digits[0]}.${digits[1]}${digits[2]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}bn`;

                break;
            case 11:
                digitsString = `${digits[0]}${digits[1]}.${digits[2]}${digits[3]}`;
                convertedNumber = `${CommonUtils.getCutStringZeroDigitsFromString(digitsString)}bn`;

                break;
            default:
                convertedNumber = Number(digits.join(''));
        }

        return convertedNumber;
    }

    private static getCutStringZeroDigitsFromString(digitsString: string): string {
        let digitsStringCopy = digitsString;

        while (digitsStringCopy.lastIndexOf('0') === digitsStringCopy.length - 1) {
            digitsStringCopy = CommonUtils.removeCharAt(digitsStringCopy, digitsStringCopy.length - 1);
        }

        if (digitsStringCopy[digitsStringCopy.length - 1] === '.') {
            digitsStringCopy = digitsStringCopy.slice(0, digitsStringCopy.length - 1);
        }

        return digitsStringCopy;
    }

    private static removeCharAt(targetString: string, indexToRemoveAt: number): string {
        const targetStringCopy = targetString.split('');

        targetStringCopy.splice(indexToRemoveAt , 1);

        return targetStringCopy.join('');
    }

    public static stringToKey(string: any, divider: string = ''): any {
        return string.replace(/’| /g, divider).replace(/ /g, divider).toLowerCase();
    }

    public static isEmptyObject(obj: any): any {
        return Object.keys(obj).length === 0;
    }

    public static summArray(array: number[]): number {
        return array.reduce((a, b) => a + b, 0);
    }

    public static generateRandomIntegerInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static isNumberInRange(x: number, min: number, max: number) {
        return x >= min && x <= max;
    }
}
