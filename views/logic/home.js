
var xhr = new XMLHttpRequest();

var uid =sessionStorage.getItem('manageHrSessionUID');
// console.log(uid);
if(uid == null){
    $('#newUser_span').css('display','inline-block');
}else{
    $('#oldUser_span').css('display','inline-block');
}
$('#exampleModal').on('show.bs.modal', event => {
    var button = $(event.relatedTarget);
    var modal = $(this);
    // Use above variables to manipulate the DOM
});
$('#sign_up_btn').click(()=>{
    location.href='signup';
});

$('#user_login_btn').click(()=>{
    var email  = $('#email_txt').val().trim();
    var password = $('#password_txt').val().trim();
    var type = 'employee';
    if($('#type_box').prop("checked") == true)
    type = 'company';
    if(email.length == 0 || password.length == 0){
        alert('Please fill all the details');
    }else if(password.length<6){
        alert('Password should have atleast 6 characters!');
    }else{
        signIn(email,password,type);
    }
});
$('#signout').on('click',function(){
    sessionStorage.removeItem('manageHrSessionUID');
    location.href = 'home';
});

function signIn(e,p,t){
    var data = {
        email:e,
        password:p,
        type:t
    };
    var sender = JSON.stringify(data);
    xhr.open('POST','signin',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                var uid = this.response;
                // console.log(uid);
                sessionStorage.setItem('manageHrSessionUID',uid);
                if(t == 'company')
                location.href ='home';
                else
                location.href ='employee/profile';
            }
        }
    };
    xhr.send(sender);
}