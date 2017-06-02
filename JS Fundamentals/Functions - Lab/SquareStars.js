function squareStars(n = 5) {
    for (let i = 1; i <= n; i++) {
        console.log("*" + ' *'.repeat(n-1));
    }
}

squareStars();