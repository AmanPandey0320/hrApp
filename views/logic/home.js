$('#in_toggler').click(function(){
    $('#in_modal').slideToggle(500);
});

//reset password
$('#resetBtn').click(()=>{
    alert('got');
});

$('#exampleModal').on('show.bs.modal', event => {
    var button = $(event.relatedTarget);
    var modal = $(this);
    // Use above variables to manipulate the DOM
    
  });