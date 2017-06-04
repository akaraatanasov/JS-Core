function extract(arr) {
    let currentBiggestNum = Number.NEGATIVE_INFINITY;

    for (let element of arr) {
        if(Number(element) > currentBiggestNum) {
            currentBiggestNum = element;
            console.log(element);
        }
    }
}

extract(['20', '2', '3', '4']);

