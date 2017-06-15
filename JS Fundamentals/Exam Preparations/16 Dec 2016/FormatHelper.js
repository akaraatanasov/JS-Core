function helper(input) {
    let text = input[0];

    let spaces =  /[ ]*([.,!?:;])[ ]*/g; //matches chars with space before or after them
    let digits = /\. (?=[0-9])/g; // matches chars with spaces and digits after them
    let quotes = /" *(.+?) *"/g; //matches quoted text with spaces between the quotes and the text
    let sequence = /([.,!?:;]) (?=[.,!?:;])/g; //matches chars with space after them followed by another char

    text = text.replace(spaces, (match, g1) => `${g1} `);
    text = text.replace(digits, (match) => '.');
    text = text.replace(quotes, (match, g1) => `"${g1}"`);
    text = text.replace(sequence, (match, g1) => g1);

    console.log(text);
}

helper(['Terribly formatted text . With chaotic spacings." Terrible quoting "! Also this date is pretty confusing : 20 . 12. 16 .']);