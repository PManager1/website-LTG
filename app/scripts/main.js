console.log('\'Allo \'Allo!');
$(document).ready(function() {
    $('#planselect').click(function() {
        console.log('click is called');
        console.log($('#planselect').val());
        $('#monthly').toggle();
        $('#yearly').toggle();
    });

    $('#btn-submit').click(function() {
        var txt = $('#subscribe_id').val();
        console.log(txt);
        $('#subscribe_id').val('');
        $.post('http://localhost:3000/subscribe/insert', {
            email: txt
        }, function(result) {
            $('#subscribe_form').hide();
            $('#successfully').html('<i class="fa fa-check fa-2x" aria-hidden="true"></i>' + result.message);
            $('#message').text('Thank You');
        });
    });
    $('#login_submit').click(function() {
        console.log('login submit is called');
        var Email = $('#inputEmail').val();
        var Password = $('#inputPassword').val();

        $.post('http://localhost:3030/authentication', {
            'email': Email,
            'password': Password,
            'strategy': 'local'
        }, function(result) {
            console.log(result);
            if (result) {
                localStorage.setItem('loginEmail', Email);
                window.location.href = 'http://localhost:9000/promo_profile.html';
            } else {
                $('#error').text('error');
            }
        });
    });
    $('#btn-submit-promo').click(function() {
        console.log('send promo button is clicked');
        var friendEmail = $('#friendEmail').val();
        var myEmail = localStorage.getItem('loginEmail');
        console.log(friendEmail);
        $.post('http://localhost:3030/promotions', {
            PromoName: 'first_20_user',
            ExpiryDate: new Date(),
            Send_from: myEmail,
            'Send_to': friendEmail
        }, function(result) {
            console.log(result);
            $('#friendEmail').val('');
            $('#showafteremail').text('Email Send Successfully');
        });
    });

    $('#signup_submit').click(function() {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        }
        var username = $('#username').val();
        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();
        var promo_id = $.urlParam('promo');        
        console.log(promo_id);
        $.post('http://localhost:3030/users', {
            'username': username,
            'email': email,
            'password': password,
            'role': 'user',
            'promo_id': promo_id,
            'strategy': 'local'
        }, function(result) {
            console.log(result);
            window.location.href = 'http://localhost:9000/login.html';
        });
    });
});