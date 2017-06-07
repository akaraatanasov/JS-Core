function ends(string, end) {
    let result = string.match(end);
    if (result != null) {
        console.log(true);
    } else {
        console.log(false);
    }
}