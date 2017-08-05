$(() => {
    const main = $('#main');

    let context = {
        contacts: [
            {firstName: "Ivan", lastName: "Ivanov", phone: "0888 838 832", email: "i.ivanov@gmail.com"},
            {firstName: "Maria", lastName: "Petrova", phone: "0892 838 832", email: "mar4eto@abv.bg"},
            {firstName: "Jordan", lastName: "Kirov", phone: "0875 858 822", email: "jordk@gmail.com"}
        ]
    };

    loadTemplates();

    async function loadTemplates() {
        const [contactSource, listSource] = await Promise.all([$.get('Contact.html'), $.get('ContactsList.html')]);
        Handlebars.registerPartial('contact', contactSource);
        let listTemplate = Handlebars.compile(listSource);
        let contactTemplate = Handlebars.compile(contactSource);

        main.html(listTemplate(context));
        $('#other').html(contactTemplate(context.contacts[1]));
    }
});