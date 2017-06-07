function findVars(input) {
    let regex = /\b_([a-zA-Z0-9]+)\b/g;
    let result = [];
    let matches = input.match(regex);

    matches.forEach(x => result.push(x.substring(1)));
    console.log(result.join(','));
}

findVars('The _id and _age variables are both integers.');