// JavaScript source code
$(document).ready(function () {
    let fnameStatus = false;
    let lnameStatus = false;
    let dateStatus = false;
    //fname validation
    $("#fname").blur(fnameValid)
    //lname validation
    $("#lname").blur(lnameValid)
    
    // date validation
    $("#date").datepicker({
        onSelect: function (date, datepicker) {
            console.log(date)
            if (date != "") {
                dateStatus = true;
                $(".dateError").text("");
            }
            
        }
    })
    // address validation
    $("#addressInput").blur(addressValid);
    function dateValid() {
        if (dateStatus) {
            $(".dateError").text("");
            return true;
           
        }
        else {
            $(".dateError").text("Select Date").css("color","red");
            return false;
        }
    }
    $("#state").blur(stateValid);
    $("#city").blur(cityValid);
    $("#state").click(function () {
        $.ajax({
            url: 'https://countriesnow.space/api/v0.1/countries/states',
            type: "get",
            date: { "country": "India" },
            dataType: "json",
            success: function (res) {
                res.data[99].states.forEach(val => {

                    $("#state").append(`<option>${val.name}</option>`);
                })
            },
            error: function (xhr, txt, error) {
                console.log(error);
            }
        })

       
    });
    //get cities from api using ajax
    $("#city").click(function () {
        $.ajax({
            url: 'https://countriesnow.space/api/v0.1/countries',
            type: "get",
            date: { "country": "India" },
            dataType: "json",
            success: function (res) { 
                res.data[96].cities.forEach(val => {
                    $("#city").append(`<option>${val}</option>`);
                })
            },
            error: function (xhr, txt, error) {
                console.log(error);
            }
        })
    });
    function lnameValid() {
        let lnameValue = $("#lname").val();
        let pattern = /\D/;
        let small = $("#lname").parent().siblings("small");
        if (lnameValue == "") {
            $("#lname").css({ "border-color": "red" });
            $("#lname+.floating-label").css("color", "red");
            small.text("Last Name Empty");
            return false;
        }
        else if (!pattern.test(lnameValue)) {
            $("#lname").css({ "border-color": "red" });
            $("#lname+.floating-label").css("color", "red");
            small.text("Last Name can't include ");
            return false;
        }
        else {
            $("#lname").css({ "border-color": "green" });
            $("#lname+.floating-label").css("color", "green");
            small.text("");
            return true;

        }
    }
    function fnameValid() {
        let fnameValue = $("#fname").val();
        let pattern = /\D/;
        let small = $("#fname").parent().siblings("small");
        if (fnameValue == "") {
            $("#fname").css({ "border-color": "red" });
            $("#fname+.floating-label").css("color", "red");
            small.text("First Name Empty");
            return false
        }
        else if (!pattern.test(fnameValue)) {
            $("#fname").css({ "border-color": "red" });
            $("#fname+.floating-label").css("color", "red");
            small.text("First Name can't include ");
            return false
        }
        else {
            $("#fname").css({ "border-color": "green" });
            $("#fname+.floating-label").css("color", "green");
            small.text("");
            return true;
        }
        
    }
    function addressValid() {
        let addressValue = $("#addressInput").val();
        if (addressValue == "") {
            $("#addressInput").siblings("small").text("Address Empty").css("color", "red");
            return false;
        }
        else {
            $("#addressInput").siblings("small").text("");
            return true;
        }
    }
    function stateValid() {
        if ($("#state").val() == "Choose State") {
            $("#stateError").text("Select State").css("color", "red");
            return false;
        }
        else {
            $("#stateError").text("");
            return true;
        }
    }
    function cityValid() {
        if ($("#city").val() == "Choose City") {
            $("#cityError").text("Select City").css("color", "red");
            return false;
        }
        else {
            $("#cityError").text("");
            return true;
        }
    }

    $("#submitBtn").click(function (e) {
        e.preventDefault();
        lnameValid();
        dateValid();
        addressValid();
        stateValid();
        cityValid();
        if (fnameValid() && lnameValid() && dateValid() && addressValid() && stateValid() && cityValid()) {
            console.log("success");
        }
    });
});