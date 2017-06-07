function validate(email) {
    let regex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return regex.test(email) ? 'Valid' : 'Invalid';
}