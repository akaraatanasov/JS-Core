function delimiter(arr) {
    let delimiter = arr[arr.length - 1];
    arr.pop();

    let result = '' + arr[0];
    for (let i = 1; i < arr.length; i++) {
        result += delimiter + arr[i];
    }

    return result;
}

console.log(delimiter(['One', 'Two', 'Three', 'Four', 'Five', '-']));