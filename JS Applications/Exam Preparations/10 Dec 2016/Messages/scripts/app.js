$(() => {
    showView('AppHome');

    // Attach event handlers
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#formRegister').submit(registerUser);
        $('#formLogin').submit(loginUser);
        $('#formSendMessage').submit(sendMessage);
        $('#linkMenuLogout').click(logoutUser);

        $('#linkUserHomeMyMessages').click(() => {
            showView('MyMessages');
            loadReceivedMessages();
        });

        $('#linkUserHomeSendMessage').click(() => {
            showView('SendMessages');
            loadAllUsers();
        });

        $('#linkUserHomeArchiveSent').click(() => {
            showView('ArchiveSent');
            loadSentMessages();
        });

        $('#linkMenuMyMessages').click(loadReceivedMessages);
        $('#linkMenuArchiveSent').click(loadSentMessages);
        $('#linkMenuSendMessage').click(loadAllUsers);
    })();

    // Shows one view/section at a time
    function showView(viewName) {
        $('main > section').hide();
        $('#view' + viewName).show();
    }

    // Navigator
    function navigateTo() {
        let viewName = $(this).attr('data-target');
        showView(viewName);
    }

    // Logged in/out check
    if (sessionStorage.getItem('authtoken') === null) {
        userLoggedOut();
    } else {
        userLoggedIn();
    }
    
    // Logged in actions
    function userLoggedIn() {
        $('.anonymous').hide();
        $('.useronly').show();
        let username = sessionStorage.getItem('username');
        $('#spanMenuLoggedInUser').text(`Welcome, ${username}!`);
        showView('UserHome');
    }

    // Logged out actions
    function userLoggedOut() {
        $('.anonymous').show();
        $('.useronly').hide();
        $('#spanMenuLoggedInUser').text('');
        showView('AppHome');
    }

    // Register user
    function registerUser(ev) {
        ev.preventDefault();
        let registerUsername = $('#registerUsername');
        let registerName = $('#registerName');
        let registerPassword = $('#registerPassword');

        let usernameVal = registerUsername.val();
        let nameVal = registerName.val();
        let passVal = registerPassword.val();

        auth.register(usernameVal, passVal, nameVal)
            .then((userInfo) => {
                saveSession(userInfo);
                registerUsername.val('');
                registerName.val('');
                registerPassword.val('');
                showInfo('User registration successful');
            }).catch(handleError);
    }

    // Login user
    function loginUser(ev) {
        ev.preventDefault();
        let inputUsername = $('#loginUsername');
        let inputPassword = $('#loginPasswd');

        let usernameVal = inputUsername.val();
        let passwordVal = inputPassword.val();

        auth.login(usernameVal, passwordVal)
            .then((userInfo) => {
                saveSession(userInfo);
                inputUsername.val('');
                inputPassword.val('');
                showInfo('Login successful');
            }).catch(handleError);
    }
    
    // Logout user
    function logoutUser() {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                showInfo('Logout successful.');
                userLoggedOut();
            }).catch(handleError);
    }

    // Send message form
    function loadAllUsers() {
        messagesService.loadAllUsers()
            .then((allUsers) => {
                displayUsersInList(allUsers);
            }).catch(handleError);
    }

    // Display all users
    function displayUsersInList(allUsers) {
        let usersContainer = $('#msgRecipientUsername');
        usersContainer.empty();
        for (let user of allUsers) {
            let username = user['username'];
            let fullName = formatSender(user['name'], username);
            if (username !== sessionStorage.getItem('username')) {
                usersContainer.append($(`<option value="${username}">${fullName}</option>>`));
            }
        }
    }

    // Send message
    function sendMessage(ev) {
        ev.preventDefault();
        let rUsernameInput = $('#msgRecipientUsername');
        let mTextInput = $('#msgText');
        let senderName = sessionStorage.getItem('name');
        let senderUsername = sessionStorage.getItem('username');
        let recipientUsername = rUsernameInput.val();
        let msgText = mTextInput.val();

        messagesService.sendMessage(senderUsername, senderName, recipientUsername, msgText)
            .then(() => {
                showInfo('Message sent');
                loadSentMessages();
            }).catch(handleError);
    }

    // Loads Sent messages
    function loadSentMessages() {
        let username = sessionStorage.getItem('username');
        messagesService.loadArchiveMessages(username)
            .then((myMessages) => {
                displayArchivedMessages(myMessages);
            }).catch(handleError);
    }

    // Displays Send messages
    function displayArchivedMessages(myMessages) {
        let messagesContainer = $('sentMessages');
        messagesContainer.empty();
        let messagesTable = $('<table>');
        messagesTable.append($('<thead>')
            .append($('<tr>')
                .append('<th>To</th>')
                .append('<th>Message</th>')
                .append('<th>Date Sent</th>')
                .append('<th>Actions</th>')));

        let tableBody = $('<tbody>');
        for (let msg of myMessages) {
            let tableRow = $('<tr>');

            let recipient = msg['recipient_username'];
            let msgText = msg['text'];
            let msgDate = formatDate(msg['_kmd']['lmt']);
            let deleteBtn = $(`<button value="${msg._id}">Delete</button>`).click(deleteMsg);

            tableRow.append($('<td>').text(recipient));
            tableRow.append($('<td>').text(msgText));
            tableRow.append($('<td>').text(msgDate));
            tableRow.append($('<td>').append(deleteBtn));

            tableBody.append(tableRow);
        }

        messagesTable.append(tableBody);
        messagesContainer.append(messagesTable);
    }

    // Deletes a message
    function deleteMsg() {
        let messageId = $(this).val();

        messagesService.deleteMessage(messageId)
            .then(() => {
                showInfo('Message deleted.');
                loadSentMessages();
            }).catch(handleError);
    }

    // Loads Received messages
    function loadReceivedMessages() {
        let username = sessionStorage.getItem('username');
        messagesService.loadMyMessages(username)
            .then((myMessages) => {
                displayAllMessages(myMessages);
            }).catch(handleError);
    }
    
    // Displays All messages
    function displayAllMessages(myMessages) {
        let messagesContainer = $('myMessages');
        messagesContainer.empty();
        let messagesTable = $('<table>');
        messagesTable.append($('<thead>')
            .append($('<tr>')
                .append('<th>From</th>')
                .append('<th>Message</th>')
                .append('<th>Date Received</th>')));

        let tableBody = $('<tbody>');
        for (let msg of myMessages) {
            let tableRow = $('<tr>');

            let sender = formatSender(msg['sender_name'], msg['sender_username']);
            let msgText = msg['text'];
            let msgDate = formatDate(msg['_kmd']['lmt']);

            tableRow.append($('<td>').text(sender));
            tableRow.append($('<td>').text(msgText));
            tableRow.append($('<td>').text(msgDate));

            tableBody.append(tableRow);
        }

        messagesTable.append(tableBody);
        messagesContainer.append(messagesTable);
    }

    // Saves session
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo['name']);
        userLoggedIn();
    }

    // Formats date
    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate())) {
            return '';
        } else {
            return date.getDate() + '.' + padZeros(date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());
        }
        
        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }
    
    // Formats sender
    function formatSender(name, username) {
        if (!name) {
            return username;
        } else {
            return username + ' (' + name + ')';
        }
    }

    // Shows info
    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }
    
    // Shows error
    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    // Gets error description
    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    // Shows loading box on document load
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()

    })
});