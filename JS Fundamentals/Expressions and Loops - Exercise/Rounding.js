function round(arr) {
    let [num, precision] = arr;
    let denominator = Math.pow(10, precision);

    console.log(Math.round(num * denominator) / denominator);
}