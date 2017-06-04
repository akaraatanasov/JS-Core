function addRemove(arr) {
    let result = [];
    let num = 1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'add') {
            result.push(num);
        } else if (arr[i] = 'remove') {
            result.pop();
        }

        num++;
    }

    if (result.length > 0) {
        result.forEach(r => console.log(r));
    } else {
        console.log('Empty');
    }

}

addRemove(['add', 'add', 'add', 'add']);