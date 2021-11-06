window.addEventListener("load", init, false);

let firstName = document.getElementsByName('firstname')[0];
let phone = document.getElementsByName('tphone')[0];
let emailUser = document.getElementsByName('emailuser')[0];
let messageError = document.getElementById('message');
let btnSubmit = document.getElementById('btn_run');

// регистрация обработчиков событий
function init() {
    firstName.addEventListener('change', nameOnChange, false);
    phone.addEventListener('change', phoneOnChange, false);
    emailUser.addEventListener('change', emailUserOnChange, false);

    form0.onsubmit = onsubmiHandler;
};

// проверка  по регулярному выражению.
function validate(elem, pattern, messageErrorLocal, elementError) {
    let res = elem.value.search(pattern);

    if (res == -1) {
        elem.className = "invalid";
        elementError.innerHTML = messageErrorLocal;
        if (elem.value == '') {
            elem.className = "valid";
            elementError.innerHTML = '';
        }
    } else {
        elem.className = "valid";
        elementError.innerHTML = '';
    }
};

// обработчики событий изменения текста в окне.
function nameOnChange() {
    let pattern = /^[a-zA-Zа-яА-Я\-]+$/;
    let messageErrorLocal = 'Неверный формат имени';
    let elementError = document.querySelector('#error_name');
    validate(this, pattern, messageErrorLocal, elementError);
};

function phoneOnChange() {
    let pattern = /^[0-9\-]+$/;
    let messageErrorLocal = 'Неверный формат телефона';
    let elementError = document.querySelector('#error_tphone');
    validate(this, pattern, messageErrorLocal, elementError);
};

function emailUserOnChange() {
    let pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{1,3}\b/i;
    let messageErrorLocal = 'Неверный формат e-mail';
    let elementError = document.querySelector('#error_emailuser');
    validate(this, pattern, messageErrorLocal, elementError);
};

// событие при отправке формы на сервер.
function onsubmiHandler(e) {

    let invalid = false;

    for (let i = 0; i < form0.elements.length; ++i) {
        let e = form0.elements[i];

        if (phone.value == '') {
            invalid = true;
        }
        if (emailUser.value == '') {
            invalid = true;
        }
        if (e.className == "invalid") {
            invalid = true;
        }
    }

    if (invalid) { // отмена отправки формы.
        messageError.style.color = 'red';
        messageError.innerHTML = 'Заполните обязательные поля';
        e.preventDefault();
    }
}