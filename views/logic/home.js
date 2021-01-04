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

function signIn(){

    firebase.auth().signInWithEmailAndPassword()
  .then(({user}) => {
      var id = user.uid;
    sessionStorage.setItem('manageHrSessionUID',`${id}`);
    location.href = 'home';
  })
  .catch((error) => {
    location.href = 'error';
  });
}