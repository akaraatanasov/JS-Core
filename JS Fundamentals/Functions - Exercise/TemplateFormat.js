function format(arr) {
    let line = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';

    for (let i = 0; i < arr.length; i+=2) {
        let question = arr[i];
        let answer = arr[i + 1];

        line += '  <question>\n';
        line += `    ${question}\n`;
        line += '  </question>\n';
        line += '  <answer>\n';
        line += `    ${answer}\n`;
        line += '  </answer>\n';
    }

    line += '</quiz>';
    return line;
}

console.log(format(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
));