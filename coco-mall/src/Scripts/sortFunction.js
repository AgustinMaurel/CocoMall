export function sortFunction(value, array) {
    switch (value) {
        case 'A-Z':
            return array.sort((a, b) => {
                if (a.productName > b.productName) {
                    return 1;
                }
                if (b.productName > a.productName) {
                    return -1;
                }
                return 0;
            });
        case 'Z-A':
            return array.sort((a, b) => {
                if (a.productName > b.productName) {
                    return -1;
                }
                if (b.productName > a.productName) {
                    return 1;
                }
                return 0;
            });

        default:
            return array;
    }
}
