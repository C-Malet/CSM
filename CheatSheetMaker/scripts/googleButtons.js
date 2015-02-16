function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    document.getElementById('logOutButton').setAttribute('style', 'display:block');
    if (authResult['status']['method'] === "PROMPT") {
        $(".logInSuccess").fadeIn().delay('3000').fadeOut();
    }
  } else {
    document.getElementById('signinButton').setAttribute('style', 'display: block');
    document.getElementById('logOutButton').setAttribute('style', 'display:none');
    if (authResult['g-oauth-window'] !== undefined && authResult['error'] !== "access_denied") {
        $(".logOutSuccess").fadeIn().delay('3000').fadeOut();
    }
  }
}

  (function() {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  })();

  function logOutUser() {
      gapi.auth.signOut();
  }