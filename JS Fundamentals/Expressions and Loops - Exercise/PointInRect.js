function isInside(arr) {
    let [x,  y, xMin, xMax, yMin, yMax] = arr;

    if (x >= xMin && x <= xMax && y>= yMin && y <= yMax) {
        console.log('inside');
    } else {
        console.log('outside');
    }
}