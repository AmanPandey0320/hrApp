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