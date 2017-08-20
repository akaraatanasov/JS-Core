$(() => {
    showView('Welcome');
    loadCatalog();

    // Attach event handlers
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#registerForm').submit(registerUser);
        $('#loginForm').submit(loginUser);
        $('#logout').click(logoutUser);
        $('#btnSubmitPost').click(submitPost);
        $('#btnEditPost').click(openEditPost);

        $('#linkMenuCatalog').click(() => {
            showView('Catalog');
            loadCatalog();
        });
        $('#linkMenuSubmit').click(() => {
            showView('Submit');
        });
        $('#linkMenuMyPosts').click(() => {
            showView('MyPosts');
            loadMyPosts();
        });


        $('.notification').click(function() {
            $(this).hide();
        })
    })();

    if (sessionStorage.getItem('authtoken') === null) {
        userLoggedOut();
    } else {
        userLoggedIn();
    }



    /*
    function loadPosts(username) {
        let endpoint = `messages?query={"recipient_username":"${username}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }
    */

    // Load Catalog and send it to displayCatalog
    function loadCatalog() {
        let username = sessionStorage.getItem('username');
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

        requester.get('appdata', endpoint, 'kinvey')
            .then((posts) => {
                displayCatalog(posts);
            }).catch(handleError);
    }

    // Display Catalog
    function displayCatalog(posts) {
        let catalogContainer = $('#allPosts');
        catalogContainer.empty();

        let rank = 1;
        for (let post of posts) {
            let postArticle = $('<article class="post">');

            let rankDiv = $('<div class="col rank">');
            rankDiv.append($(`<span>${rank++}</span>`));

            let imageDiv = $('<div class="col thumbnail">');
            imageDiv.append($(`<img src="${post.imageUrl}">`));

            let contentDiv = $('<div class="post-content">');
            let postTitle = $('<div class="title">');
            postTitle.append($(`<a href="${post.url}">${post.title}</a>`));
            let postDetails = $('<div class="details">');
            let timeAgo = calcTime(post._kmd.ect);
            postDetails.append($(`<div class="info">submitted ${timeAgo} ago by ${post.author}</div>`));

            let controlsDiv = $('<div class="controls">');
            let controlsDivList = $('<ul>');

            let commentsLink = $('<li class="action"><a class="commentsLink" href="#/comments" id="linkComments">comments</a></li>');
            commentsLink.click(() => loadComments(post)); // or post._id

            controlsDivList.append(commentsLink);
            let editLink = $('<li class="action"><a class="editLink" href="#/edit" id="linkEdit">edit</a></li>');
            editLink.click(() => openEditPost(post));
            controlsDivList.append(editLink);

            let deleteLink = $('<li class="action"><a class="deleteLink" href="#/delete" id="linkDelete">delete</a></li>');
            deleteLink.click(() => deletePost(post._id));
            controlsDivList.append(deleteLink);

            controlsDiv.append(controlsDivList);


            postDetails.append(controlsDiv);

            contentDiv.append(postTitle);
            contentDiv.append(postDetails);

            postArticle.append(rankDiv);
            postArticle.append(imageDiv);
            postArticle.append(contentDiv);

            catalogContainer.append(postArticle);
        }
    }

    function loadComments(post) {
        console.log('Load comments');
        console.log(post);
    }

    function openEditPost(post) {
        showView('Edit');
        editPost(post._id);
    }

    function editPost(ev, id) {
        ev.preventDefault();

        let form = $("#editPostForm");
        let author = localStorage.getItem('username');
        let title = $('#editTitle').val();
        let description = $('#editComment').val();
        let url = $('#editLink').val();
        let imageUrl = $('#editImage').val();
        //let id = form.find('input[name="id"]').val()

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (url.length === 0) {
            showError('URL cannot be empty');
            return;
        }

        let editedPost = {
            author: author,
            title: title,
            description: description,
            url: url,
            imageUrl: imageUrl
        };

        requester.update('appdata', 'posts/' + id, 'kinvey', newPost)
            .then(() => {
                showInfo('Post created');

                $('#formTitle').val('');
                $('#formUrl').val('');
                $('#formImage').val('');
                $('#formComment').val('');

                showView('MyPosts');
                loadMyPosts();
            }).catch(handleError);
    }

    function deletePost(id) {
        console.log('Delete');
        requester.remove('appdata', 'posts/' + id)
            .then(() => {
                showInfo('Post deleted');
                loadCatalog();
            }).catch(handleError);
    }

    function submitPost(ev) {
        ev.preventDefault();

        let author = localStorage.getItem('username');
        let title = $('#formTitle').val();
        let description = $('#formComment').val();
        let url = $('#formUrl').val();
        let imageUrl = $('#formImage').val();

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (url.length === 0) {
            showError('URL cannot be empty');
            return;
        }

        let newPost = {
            author: author,
            title: title,
            description: description,
            url: url,
            imageUrl: imageUrl
        };

        requester.post('appdata', 'posts', 'kinvey', newPost)
            .then(() => {
                showInfo('Post created');

                $('#formTitle').val('');
                $('#formUrl').val('');
                $('#formImage').val('');
                $('#formComment').val('');

                showView('MyPosts');
                loadMyPosts();
            }).catch(handleError);
    }

    function loadMyPosts() {
        let username = sessionStorage.getItem('username');
        let endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        requester.get('appdata', endpoint, 'kinvey')
            .then((posts) => {
                displayMyPosts(posts);
            }).catch(handleError);
    }

    function displayMyPosts(posts) {
        let myPostsContainer = $('#viewMyPosts');
        myPostsContainer.empty();

        myPostsContainer.append($('<div class="post post-content"><h1>Your Posts</h1></div>'));

        let rank = 1;
        for (let post of posts) {
            let postArticle = $('<article class="post">');

            let rankDiv = $('<div class="col rank">');
            rankDiv.append($(`<span>${rank++}</span>`));

            let imageDiv = $('<div class="col thumbnail">');
            imageDiv.append($(`<img src="${post.imageUrl}">`));

            let contentDiv = $('<div class="post-content">');
            let postTitle = $('<div class="title">');
            postTitle.append($(`<a href="${post.url}">${post.title}</a>`));
            let postDetails = $('<div class="details">');
            let timeAgo = calcTime(post._kmd.ect);
            postDetails.append($(`<div class="info">submitted ${timeAgo} ago by ${post.author}</div>`));

            let controlsDiv = $('<div class="controls">');
            let controlsDivList = $('<ul>');

            let commentsLink = $('<li class="action"><a class="commentsLink" href="#/comments" id="linkComments">comments</a></li>');
            commentsLink.click(() => loadComments(post)); // or post._id

            controlsDivList.append(commentsLink);
            let editLink = $('<li class="action"><a class="editLink" href="#/edit" id="linkEdit">edit</a></li>');
            editLink.click(() => openEditPost(post));
            controlsDivList.append(editLink);

            let deleteLink = $('<li class="action"><a class="deleteLink" href="#/delete" id="linkDelete">delete</a></li>');
            deleteLink.click(() => deletePost(post._id));
            controlsDivList.append(deleteLink);

            controlsDiv.append(controlsDivList);


            postDetails.append(controlsDiv);

            contentDiv.append(postTitle);
            contentDiv.append(postDetails);

            postArticle.append(rankDiv);
            postArticle.append(imageDiv);
            postArticle.append(contentDiv);

            myPostsContainer.append(postArticle);
        }
    }

    // LOGIC TO LOGOUT USER
    function logoutUser() {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                showInfo('Logout successful.');
                userLoggedOut();
            }).catch(handleError);
    }

    // LOGIC TO LOGIN USER
    function loginUser(ev) {
        ev.preventDefault();
        let inputUsername = $('#loginUsername');
        let inputPassword = $('#loginPass');

        let usernameVal = inputUsername.val();
        let passVal = inputPassword.val();

        // Validation
        let userRegex = /[a-zA-Z]{3,}/g;
        let passwordRegex = /[a-zA-Z0-9]{6,}/g;
        let usernameValid = false;
        let passwordValid = false;

        if (testRegex(usernameVal, userRegex)) {
            usernameValid = true;
        } else {
            showError('Username should be at least 3 characters long and should contain only english alphabet letters!')
        }

        if (testRegex(passVal, passwordRegex)) {
            passwordValid = true;
        } else {
            showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }

        if (usernameValid && passwordValid) {
            auth.login(usernameVal, passVal)
                .then((userInfo) => {
                    saveSession(userInfo);
                    inputUsername.val('');
                    inputPassword.val('');
                    showInfo('Login successful.');
                }).catch(handleError);
        }
    }

    // LOGIC TO REGISTER USER
    function registerUser(ev) {
        ev.preventDefault();
        let registerUsername = $('#registerUsername');
        let registerPassword = $('#registerPass');
        let registerPasswordRepeat = $('#registerPassRep');

        let usernameVal = registerUsername.val();
        let passVal = registerPassword.val();
        let repeatVal = registerPasswordRepeat.val();

        // Validation
        let userRegex = /[a-zA-Z]{3,}/g;
        let passwordRegex = /[a-zA-Z0-9]{6,}/g;
        let usernameValid = false;
        let passwordValid = false;
        let repeatPassValid = false;

        if (testRegex(usernameVal, userRegex)) {
            usernameValid = true;
        } else {
            showError('Username should be at least 3 characters long and should contain only english alphabet letters!')
        }

        if (testRegex(passVal, passwordRegex)) {
            passwordValid = true;
        } else {
            showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits.')
        }

        if (passVal === repeatVal) {
            repeatPassValid = true;
        } else {
            showError('Both passwords should match.');
        }

        if (usernameValid && passwordValid && repeatPassValid) {
            auth.register(usernameVal, passVal)
                .then((userInfo) => {
                    saveSession(userInfo);
                    registerUsername.val("");
                    registerPassword.val("");
                    registerPasswordRepeat.val("");
                    showInfo('User registration successful.');
                }).catch(handleError);
        }
    }

    function navigateTo() {
        let viewName = $(this).attr('data-target');
        showView(viewName);
    }

    // Shows one view/section at a time
    function showView(viewName) {
        $('section').hide();
        $('#view' + viewName).show();
    }

    function userLoggedOut() {
        $('#menu').hide();
        $('#profile').hide();
        showView('Welcome');
    }

    function userLoggedIn() {
        $('#menu').show();
        let username = sessionStorage.getItem('username');
        $('#profileUsername').text(username);
        $('#profile').show();
        showView('Catalog');
        //loadCatalog();
    }

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

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox>span');
        infoBox.text(message);
        $('#infoBox').show();
        setTimeout(() => $('#infoBox').fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox>span');
        errorBox.text(message);
        $('#errorBox').show();
        setTimeout(() => $('#errorBox').fadeOut(), 3000);
    }

    // Input validation
    function testRegex(stringToTest, regex) {
        let match = regex.exec(stringToTest);

        if (match !== null && match[0] === match.input) {
            return true;
        } else {
            return false;
        }
    }

    // Format time
    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    // Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });
});