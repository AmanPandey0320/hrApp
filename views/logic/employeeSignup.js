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

  var storageRef = firebase.storage().ref();
  var image;
  var empData;

  function getFields(){
      var gender;
      if(document.getElementsByName('gender')[0].checked == true)
      gender = 'Male';
      else
      gender = 'Female';
      empData={
          empname:[$('#firstName').val().trim(),$('#middleName').val().trim(),$('#thirdName').val().trim()],
          image:image,
          dob:$('#dob').val(),
          employeePhone:$('#phoneNo').val().trim(),
          employeeEmail:$('#emailtxt').val().trim(),
          maritalStatus:$('#relationship').val().trim(),
          gender:gender,
          nationality:$('#nationalityTxt').val().trim(),
          adharNo:$('#adhaarTxt').val().trim(),
          address:[$('#address1').val().trim(),$('#address2').val().trim(),$('#address3').val().trim()],
          companyID:$('#companyID').val().trim(),
          position:$('#positionTxt').val().trim(),
          employeeID:$('#employeeID').val().trim(),
          department:$('#deptTxt').val().trim(),
          employmentType:$('#employmentType').val().trim(),
          workEmail:$('#workMailTxt').val().trim(),
          salary:$('#salaryTxt').val().trim(),
          workLocation:$('#workLocation').val().trim(),
          workPhone:$('#workPhoneTxt').val().trim(),
          startDate:$('#startDate').val().trim(),
          EmName:[$('#EnameTxt1').val().trim(),$('#EnameTxt2').val().trim(),$('#EnameTxt3').val().trim()],
          EmPhone:$('#EphoneTxt').val().trim(),
          EmAddress:[$('#Eaddress1').val().trim(),$('#Eaddress2').val().trim(),$('#Eaddress3').val().trim()],
          Emrelation:$('#Erelationship').val().trim(),
      };
    //   console.log(empData.empname);
  }

function getFile(){
    var file = document.getElementById("files").files[0];
    console.log(file);
    var d = new Date();
    var fname = d.getTime();
    console.log(fname);
    var thisRef = storageRef.child('employee').child(`${fname}`).child(file.name);
    thisRef.put(file).then((snapshot)=>{
        thisRef.getDownloadURL().then((url)=>{
            image = url;
            console.log(image);
        });
    }).catch((error)=>{
        console.log(error);
        location.href = `error?code=${error.code}&message=${error.message}`;
    });
}

$('#submitBtn').on('click',function(){
    getFields();
    var sender = JSON.stringify(empData);
    console.log(sender);
    var xhr = new XMLHttpRequest();
    xhr.open('POST','api/employee/post',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if(this.readyState == 4){
            console.log(this.response);
            // TODO: react according to server responce
        }
    };
    xhr.send(sender);
});