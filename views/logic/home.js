var firebaseConfig = {
    apiKey: "AIzaSyAHeiSqmtWHA5qMKPyU6dNR0wXuAmxvfME",
    authDomain: "app2pcon2k20.firebaseapp.com",
    databaseURL: "https://app2pcon2k20.firebaseio.com",
    projectId: "app2pcon2k20",
    storageBucket: "app2pcon2k20.appspot.com",
    messagingSenderId: "502599994077",
    appId: "1:502599994077:web:6c985234b8b2ddf8d66934"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


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
    if(email.length == 0 || password.length == 0){
        alert('Please fill all the details');
    }else if(password.length<6){
        alert('Password should have atleast 6 characters!');
    }else{
        signIn(email,password);
    }
});
$('#signout').on('click',function(){
    sessionStorage.removeItem('manageHrSessionUID');
    location.href = 'home';
});

function signIn(e,p){

    firebase.auth().signInWithEmailAndPassword(e,p)
  .then(({user}) => {
      var id = user.uid;
    sessionStorage.setItem('manageHrSessionUID',`${id}`);
    location.href = 'home';
  })
  .catch((error) => {
    location.href = 'error';
  });
}