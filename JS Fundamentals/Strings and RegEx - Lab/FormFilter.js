function formFilter(user, email, phone, data) {
    data.forEach(line => {
        line = line.replace(/<![a-zA-Z]+!>/g, user);
        line = line.replace(/<@[a-zA-Z]+@>/g, email);
        line = line.replace(/<\+[a-zA-Z]+\+>/g, phone);
        console.log(line);
    });
}