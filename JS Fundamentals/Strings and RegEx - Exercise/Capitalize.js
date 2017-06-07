function capitalize(text) {
    let result = text.split(' ');
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].charAt(0).toUpperCase() + result[i].substring(1).toLowerCase();
    }

    return result.join(' ');
}

console.log(capitalize("Was that Easy? tRY thIs onE for SiZe!"));