function starts(string, beg) {
    let result = string.match(beg);
    if (result != null) {
        console.log(true);
    } else {
        console.log(false);
    }
}

starts('How have you been?', 'how');