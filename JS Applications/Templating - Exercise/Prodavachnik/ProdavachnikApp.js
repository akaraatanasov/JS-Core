function startApp() {
    const adsDiv = $('#ads');
    const templates = {};

    loadTemplates();

    async function loadTemplates() {
        const [adsCatalogTemplate, adBoxTemplate]
            = await Promise.all([
                $.get('Catalog.html'),
                $.get('Partial.html')
        ]);

        templates['catalog'] =  Handlebars.compile(adsCatalogTemplate);
        Handlebars.registerPartial('adBox', adBoxTemplate);
    }

    $('header').find('a').show();

    function showView(view) {
        $('section').hide();

        switch (view) {
            case 'home': $('#viewHome').show(); break;
            case 'login': $('#viewLogin').show(); break;
            case 'register': $('#viewRegister').show(); break;
            case 'ads': $('#viewAds').show(); loadAds(); break;
            case 'create': $('#viewCreateAd').show(); break;
            case 'details': $('#viewDetailsAd').show(); break;
            case 'edit': $('#viewEditAd').show(); break;
        }
    }
    
    function navigateTo(e) {
        $('section').hide();
        let target = $(e.target).attr('data-target');
        $('#' + target).show();
    }

    // Attach event listeners
    $('#linkHome').click(() => showView('home'));
    $('#linkListAds').click(() => showView('ads'));
    $('#linkCreateAd').click(() => showView('create'));
    $('#buttonCreateAd').click(createAd);
    $('#linkRegister').click(() => showView('register'));
    $('#buttonRegisterUser').click(register);
    $('#linkLogin').click(() => showView('login'));
    $('#buttonLoginUser').click(login);
    $('#linkLogout').click(logout);

    // Notifications
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    $('#infoBox').click((event) => $(event.target).hide());
    $('#errorBox').click((event) => $(event.target).hide());

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(() => $('#infoBox').fadeOut(), 3000);
    }

    function showError(message) {
        $('#errorBox').text(message);
        $('#errorBox').show();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    let requester = (() => {
        const baseUrl = 'https://baas.kinvey.com/';
        const appKey = 'kid_ByoJ6sbPb';
        const appSecret = '89917b9928c44fb9a38f41aa2abc3dc2';

        function makeAuth(type) {
            if (type === 'basic') return 'Basic ' + btoa(appKey + ':' + appSecret);
            else return 'Kinvey ' + localStorage.getItem('authtoken');
        }

        function makeRequest(method, module, url, auth) {
            return req = {
                url: baseUrl + module + '/' + appKey + '/' + url,
                method,
                headers: {
                    'Authorization': makeAuth(auth)
                }
            };
        }

        function get(module, url, auth) {
            return $.ajax(makeRequest('GET', module, url, auth));
        }

        function post(module, url, data, auth) {
            let req = makeRequest('POST', module, url, auth);
            req.data = JSON.stringify(data);
            req.headers['Content-Type'] = 'application/json';
            return $.ajax(req);
        }

        function update(module, url, data, auth) {
            let req = makeRequest('PUT', module, url, auth);
            req.data = JSON.stringify(data);
            req.headers['Content-Type'] = 'application/json';
            return $.ajax(req);
        }

        function remove(module, url, auth) {
            return $.ajax(makeRequest('DELETE', module, url, auth));
        }

        return {
            get, post, update, remove
        }
    })();

    function userLoggedIn() {
        $('#loggedInUser').text(`Welcome, ${localStorage.getItem('username')}!`);
        $('#loggedInUser').show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkLogout').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
    }

    function userLoggedOut() {
        $('#loggedInUser').text('');
        $('#loggedInUser').hide();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkLogout').hide();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
    }

    if (localStorage.getItem('authtoken') !== null &&
        localStorage.getItem('username') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }
    showView('home');

    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn()
    }

    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let data = await requester.post('user', 'login', {username, password}, 'basic');
            showInfo('Logged in');
            saveSession(data);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let data = await requester.post('user', '', {username, password}, 'basic');
            showInfo('Registered');
            saveSession(data);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }
    
    async function logout() {
        try {
            let data = await requester.post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear();
            showInfo('Logged out');
            userLoggedOut();
            showView('home');
        } catch (err) {
            handleError(err);
        }
    }
    
    async function loadAds() {
        let content = $('#ads');
        content.empty();
        let ads = await requester.get('appdata', 'Offers');
        ads.forEach(a => {
            if(a._acl.creator === localStorage.getItem('id')) {
                a.isAuthor = true;
            }
        });
        let context = {
            ads
        };

        let html = templates['catalog'](context);
        content.html(html);

        let editButtons = $(content).find('.ad-box').find('.edit');
        let deleteButtons = $(content).find('.ad-box').find('.delete');

        editButtons.click(openEditAd);
        deleteButtons.click(deleteAd);
    }
    
    async function deleteAd() {
        let id = $(this).parent().attr('data-id');
        await requester.remove('appdata', 'Offers/' + id);
        showInfo('Ad deleted');
        showView('ads');
    }
    
    async function openEditAd() {
        let id = $(this).parent().attr('data-id');
        let ad = await requester.get('appdata', `Offers/${id}`, 'kinvey');
        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);
        form.find('textarea[name="description"]').val(ad.description);
        form.find('input[name="price"]').val(Number(ad.price));
        form.find('input[name="image"]').val(ad.imageUrl);

        let date = ad.date;
        let publisher = ad.publisher;

        form.find('#buttonEditAd').click(() => editAd(id, date, publisher));
        showView('edit');
    }

    async function editAd(id, date, publisher) {
        let form = $('#formEditAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="image"]').val();

        if (title.length === 0) {
            showError('Title cannot be empty!');
            return;
        }

        if (Number.isNaN(price)) {
            showError('Price cannot be empty!');
            return;
        }

        let editedAd = {
            title, description, price, imageUrl, date, publisher
        };

        try {
            await requester.update('appdata', 'Offers/' + id, editedAd);
            showInfo('Ad edited');
            $('#ads').empty();
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }
    
    async function createAd() {
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = Number(form.find('input[name="price"]').val());
        let imageUrl = form.find('input[name="image"]').val();
        let date = (new Date()).toString('yyyy-MM-dd');
        let publisher = localStorage.getItem('username');

        if (title.length === 0) {
            showError('Title cannot be empty!');
            return;
        }

        if (Number.isNaN(price)) {
            showError('Price cannot be empty!');
            return;
        }

        let newAd = {
            title, description, price, imageUrl, date, publisher
        };

        try {
            await requester.post('appdata', 'Offers', newAd);
            showInfo('Ad created');
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }
}