function score(input) {
    let result = '<table>\n';
    result += '  <tr><th>name</th><th>score</th></tr>\n';
    let scores = JSON.parse(input);

    for (let score of scores) {
        result += '   <tr>';
        result += `<td>${htmlEscape(score.name)}</td>`;
        result += `<td>${score.score}</td>`;
        result += `</tr>\n`;
    }

    result += '</table>';

    return result;

    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

console.log(score('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]'));