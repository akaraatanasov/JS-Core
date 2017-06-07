function user(input) {
    let result = input.map(s => s.split('@'));
    result = result.map(([user, domain]) => user + '.' + domain.split('.').map(w => w[0]).join(''));
    console.log(result.join(', '));
}

user(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);