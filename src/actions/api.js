const api = 'http://localhost:8080';
//const api = 'http://abbyyfrontend2020.azurewebsites.net'

function signIn(login, password) {
    let model = {
        'username' : login,
        'password' : password
    };

    let url = api + '/login';

    return fetch(url, {
        method : 'POST',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(model)
    });
}

function signUp(login, password) {
    let model = {
        'username': login,
        'password': password
    };

    let url = api + '/register';

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });
}

function getSelfUser() {
    let url = api + '/user';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
        }
    });
}

function getArticles() {
    let url = api + '/articles';

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
        }
    });
}

function getArticle(id) {
    let url = api + `/articles/${id}`;

    return fetch(url, {
        method : 'GET',
        headers : {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
        }
    });
}



function postArticle(content, title, imageUrl) {
    let model = {
        'image_url': imageUrl,
        'title': title,
        'content': content
    };

    let url = api + '/articles';

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem('token')
        },
        body: JSON.stringify(model)
    });
}

export { signIn, signUp, getSelfUser, getArticles, postArticle, getArticle }