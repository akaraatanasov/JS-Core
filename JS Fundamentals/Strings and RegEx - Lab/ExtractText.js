function extract(text) {
    let result = [];

    let open = text.indexOf('(');
    while (open !== -1) {
        let close = text.indexOf(')', open + 1);
        if (close === -1) break;
        result.push(text.substring(open + 1, close));

        open = text.indexOf('(', close + 1);
    }

    return result.join(', ');
}