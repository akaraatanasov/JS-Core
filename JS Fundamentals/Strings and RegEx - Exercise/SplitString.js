function splitString(string, spliter) {
    let result = string.split(spliter);
    console.log(result.join('\n'));
}

splitString('One-Two-Three-Four-Five', '-');