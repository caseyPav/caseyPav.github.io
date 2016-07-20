var btn = document.getElementById("about-me-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function() {

    $('#metadata-link').click(function(){
        $.ajax(
            {
                url:' href= /html/aboutMeModal',
                success: function(response){
                    //do what ever you want here to extract the part you want
                    $('#modal-div-content').html(adapted-response);
                    $('#modal').modal('show');
                }
            });
    });
});