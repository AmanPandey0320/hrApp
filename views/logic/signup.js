var xhr = new XMLHttpRequest();
$('#register_btn').click(()=>{
    $('#register_btn').attr('disabled',true);
    $('#reg_txt').text('Please wait...')
    $('#reg_lock').css('display','none');
    $('#reg_load').css('display','inline-block');
    registerUser();
});

function registerUser(){
    var name=$('#name_txt').val().trim();
    var email=$('#email_txt').val().trim();
    var companyName=$('#cmpname_txt').val().trim();
    var companyPhone=$('#cmpnumber').val().trim();
    var employeeCount = $('#empnumber').val().trim();
    var confirm =$('#confirm_password').val().trim();
    var password = $('#password').val().trim();
    
    if(name.lenght == 0 || email.lenght == 0 || companyName.lenght == 0 || companyPhone == 0 || employeeCount == 0 || confirm == 0 || password == 0 ){
        alert('Please fill all the details correctly!')
    }else{
        var data = {
            name:name,
            email:email,
            companyName:companyName,
            companyPhone:companyPhone,
            employeeCount:employeeCount,
            password:password,
        };
        var sender = JSON.stringify(data);
        console.log(sender);
        xhr.open('POST','register',true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function(){
            if(this.readyState == 4){
                console.log(this.response);
            }
        };
        xhr.send(sender);
    }
}