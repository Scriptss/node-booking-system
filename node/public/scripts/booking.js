$( document ).ready(function() {

    //intercept the form submit and send a post request manually
    $("#booking").submit(function(e){
        //prevent submission of form
        e.preventDefault();

        //create the post body
        let obj = {};
        obj.surname = $('#surname').val();
        obj.partySize = parseInt($('#party-size').val());
        obj.phoneNumber = $('#phone-number').val();
        obj.bookingDate = $('#booking-date').val();

        //send the post request and output response
        $.ajax({
            type: "POST",
            url: "booking/new",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON"
        }).done(function(data){
            alert(data.message);
        }).fail(function(errMsg) {
            alert(JSON.parse(errMsg));
        });
    });

});