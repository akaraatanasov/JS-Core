function dollars(n) {
    let line = '$';
    for (let i = 0; i < n; i++) {
        console.log(line);
        line += '$';
    }
}