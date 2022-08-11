const signUpButton = document.getElementById('signUp');
const signUpBackButton = document.getElementById('signUpBack');
const signInButton = document.getElementById('signIn');
const signInBackButton = document.getElementById('signInBack');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signUpBackButton.addEventListener('click', () => {
    const item = `/`;
    fetch(item, {
            method: 'get'
        }).then((data) => {
            window.location.href = item;
        })
        .catch((err) => {
            console.error(err)
        })
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
signInBackButton.addEventListener('click', () => {

    const item = '/';
    fetch(item, {
            method: 'get'
        }).then((data) => {
            window.location.href = item;
        })
        .catch((err) => {
            console.error(err)
        })

});