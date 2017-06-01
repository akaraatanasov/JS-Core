function interest(arr) {
    let [sum, interest, period, years] = arr;

    let result = sum * Math.pow((1 + (interest/100)/period), period * years);
    console.log(result);
}