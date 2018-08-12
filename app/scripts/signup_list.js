$(document).ready(function() {
    console.log('jquery is ready');
    console.log(localStorage.getItem('loginEmail'));
    $('#loginUser').text(localStorage.getItem('loginEmail'));
    $.get('http://localhost:3030/promotions', {
            Send_from: localStorage.getItem('loginEmail'),
        }, function(result) {
            console.log(result);
            for(var i=0;i<=result.data.length;i++){
                var email = result.data[i].Send_to;
                var status = result.data[i].promo_accepted ? 'signed up':'Pending';
                var markup = '<tr>'+'<td>'+email +'</td>'+'<td>'+status +'</td>'+'</tr>';
                $('#tbody').append(markup);
            }
        });

    $('#logout').click(function(){
        localStorage.removeItem('loginEmail');
        window.location.href = 'http://localhost:9000/login.html';
    })
});