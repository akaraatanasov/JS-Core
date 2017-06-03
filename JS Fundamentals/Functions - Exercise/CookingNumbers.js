function cooking(arr) {
    let num = Number(arr[0]);

    for (let i = 1; i < arr.length; i++) {
        switch (arr[i]) {
            case 'chop':
                num /= 2;
                console.log(num);
                break;
            case 'dice':
                num = Math.sqrt(num);
                console.log(num);
                break;
            case 'spice':
                num += 1;
                console.log(num);
                break;
            case 'bake':
                num *= 3;
                console.log(num);
                break;
            case 'fillet':
                num *= 0.8;
                console.log(num);
                break;
            default: break;
        }
    }
}

cooking([9, 'dice', 'spice', 'chop', 'bake', 'fillet']);