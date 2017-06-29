function getDollarFormatter(formatter) {
    return function (value) {
       return formatter(',', '$', true, value);
    }
}