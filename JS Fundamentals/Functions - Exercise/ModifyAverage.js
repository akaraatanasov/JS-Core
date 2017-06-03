function modify(num) {
    let result = `${num}`;
    let avrg = 0;

    while (true) {
        for (let i = 0; i < result.length; i++) {
            avrg += Number(result[i]);
        }
        avrg /= result.length;
        if(avrg > 5) {
            console.log(result);
            break;
        } else {
            result += '9';
            avrg = 0;
        }
    }
}

modify(101);