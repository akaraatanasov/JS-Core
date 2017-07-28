$(() => { //onload
    const baseUrl = "https://phonebook-29f5a.firebaseio.com/phonebook";
    const list = $('#list');
    $('#btnCreate').on('click', create);
    loadContacts();

    function loadContacts() {
        let req = {
            url: baseUrl + ".json",
            success: displayContacts
        };
        $.ajax(req);
    }

    function displayContacts(data) {
        list.empty();
        for (let contact in data) {
            let html = $(`<li><span>${data[contact].name}: ${data[contact].phone} </span></li>`);
            html.append($('<button>Delete</button>').click(() => deleteContact(contact)));
            list.append(html);
        }
    }

    function create() {
        let name = $('#createtName').val();
        let phone = $('#createtPhone').val();
        if (name.length === 0) {
            notify('Name cannot be empty', 'error');
            return;
        }
        if (phone.length === 0) {
            notify('Phone cannot be empty', 'error');
            return;
        }

        $('#btnCreate').prop('disabled', true);

        let contact = {
            name,
            phone
        };

        let req = {
            url: baseUrl + ".json",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(contact),
            success: () => {
                $('#createtName').val('');
                $('#createtPhone').val('');
                notify('Created', 'success');
                loadContacts();
            },
            error: displayError,
            complete: () => $('#btnCreate').prop('disabled', false)
        };
        $.ajax(req);
    }
    
    function deleteContact(contact) {
        let req = {
            url: `${baseUrl}/${contact}.json`,
            method: "DELETE",
            success: () => { notify('Deleted', 'info'); loadContacts() },
            error: displayError
        };
        $.ajax(req);
    }

    function displayError(err) {
        notify('Error: ' + err.statusText, 'error');
    }

    function notify(message, type) {
        let toast = document.getElementById("notification");
        toast.textContent = message;
        toast.style.display = "block";
        switch (type) {
            case "error": toast.style.background = '#991111'; break;
            case "info": toast.style.background = '#111199'; break;
            case "success": toast.style.background = '#119911'; break;
        }

        setTimeout(() => toast.style.display = 'none', 2000);
    }
});
