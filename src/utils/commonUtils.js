// eslint-disable-next-line import/no-anonymous-default-export
export default {
    formatNumber(number) {
        return Number(number).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1'");
    },

    formatPrice(number) {
        return number % 1 === 0 ? this.formatNumberWithCommas(number) : number < 100 ? Number(number).toFixed(2) : this.formatNumberWithCommas(number.toFixed(0));
    },

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    trimPriceToThreeDecimal(price) {
        if (price % 1 === 0) {
            return price;
        } else {
            let cachedPrice = price.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];

            while (cachedPrice.charAt(cachedPrice.length-1) === '0') {
                cachedPrice = cachedPrice.substring(0, cachedPrice.length - 1);
            }

            return parseFloat(cachedPrice);
        }
    },

    formatNumberWithCommas(number) {
        const options = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        };

        return Number(number).toLocaleString('en', options);
    },

    formatChance(chance, items) {
        const percentage = (chance * 100).toFixed(1);

        return chance > items ? `x${items}` :
            chance > 1 ? `x${chance.toFixed(2)}` :
            chance > 0 ? `${percentage}% for 1` : 0;
    },

    cutAddress(address, symbol) {
        let splitter = symbol ? symbol : '~~'
        return address.slice(0, 4) + splitter + address.slice(38);
    },

    getSellerShortAddress(item) {
        let sellerAddress = item.seller;

        return `${sellerAddress.substring(0, 4)}...${sellerAddress.substring(sellerAddress.length - 4, sellerAddress.length)}`;
    },

    sortByDirection(array, sortDir) {
        return [...array].sort((a, b) => sortDir === 'asc' ? a - b : b - a);
    },

    basicSort(array, sortType, sortDir) {
        return [...array].sort((a, b) => sortDir === 'asc' ? a[sortType] - b[sortType] : b[sortType] - a[sortType]);
    },

    checkArrayForDuplicates(array) {
        return new Set(array).size !== array.length;
    },

    convertFloatNumberToSuffixNumber(number) {
        const roundedNumber = Math.floor(number);
        const digits = roundedNumber.toString().split('');
        let convertedNumber;

        switch (digits.length) {
            case 4:
                convertedNumber = `${digits[0]}.${digits[1]}${digits[2]}K`;

                break;
            case 5:
                convertedNumber = `${digits[0]}${digits[1]}.${digits[2]}${digits[3]}K`;

                break;
            case 6:
                convertedNumber = `${digits[0]}${digits[1]}${digits[2]}.${digits[3]}${digits[4]}K`;

                break;
            case 7:
                convertedNumber = `${digits[0]}.${digits[1]}${digits[2]}${digits[3]}M`;

                break;
            case 8:
                convertedNumber = `${digits[0]}${digits[1]}.${digits[2]}${digits[3]}${digits[4]}M`;

                break;
            default:
                convertedNumber = digits.join('');
        }

        return convertedNumber;
    },

    stringToKey(string) {
        return string.replace(/’| /g, '').replace(/ /g, '').toLowerCase();
    },

    isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }
}
