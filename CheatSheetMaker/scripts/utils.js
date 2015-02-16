function closeAlert (type) {
    if (type === 'login') {
        $(".logInSuccess").fadeOut({queue:false});
    } else {
        $(".logOutSuccess").fadeOut({queue:false});
    }
}