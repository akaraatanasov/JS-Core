function messenger(input) {
    let regexTo = /to="([a-zA-Z]+)"/g;
    let regexFrom = /from="([a-zA-Z]+)"/g;
    let regexMessage = />(.+)</g;

    let match = regexTo.exec(input);
    let recipient = match[1];
    match = regexFrom.exec(input);
    let sender = match[1];
    match = regexMessage.exec(input);
    let message = [];
    if (match !== null) {
        message.push(match[1]);
    } else {
        message = input.split(/[\n\r]/g);
        let beg = />(.+)/g;
        let end = /(.+)</g;
        let newMessage = [];
        for (let i = 0; i < message.length; i++) {
            if (i === 0) {
                match = beg.exec(message[i]);
                newMessage.push(match[1]);
            } else if (i === message.length - 1) {
                match = end.exec(message[i]);
                newMessage.push(match[1]);
            } else {
                newMessage.push(message[i]);
            }
        }
        message = newMessage;
    }

    let result = '<article>\n';
    result += `  <div>From: <span class="sender">${sender}</span></div>\n`;
    result += `  <div>To: <span class="recipient">${recipient}</span></div>\n`;
    result += '  <div>\n';
    for (let line of message) {
        result += `    <p>${line}</p>\n`;
    }
    result += '  </div>\n';
    result += '</article>';

    console.log(result);
}

messenger(`<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what's up?</message>`);
messenger(`<message to="MasterBlaster" from="TheAnimal" timestamp="1497254114">Same old, same old\nLet's go out for a beer</message>`);