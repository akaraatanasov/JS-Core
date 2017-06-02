function uppercase(str) {
    let uppercase = str.toUpperCase();
    let words = uppercase.split(/\W+/);
    words = words.filter(w => w != '');
    return words.join(', ');
}