function sortArray(arr, orderType) {
    if (orderType === 'asc') {
         return arr.sort((a, b) => { return a - b });
    } else {
        return arr.sort((a, b) => { return b - a });
    }
}