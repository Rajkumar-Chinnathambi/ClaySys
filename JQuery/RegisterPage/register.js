// JavaScript source code
$(document).ready(function () {
    let fnameStatus = false;
    let lnameStatus = false;
    let dateStatus = false;
    let genderStatus = false;
    
    //fname validation
    $("#fname").blur(fnameValid);
    //lname validation
    $("#lname").blur(lnameValid);  
    // date validation
    $("#date").datepicker({
        maxDate:new Date("2006-05-20"),
        onSelect: function (date, datepicker) {
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
            data: { "country": "India" },
            dataType: "json",
            success: function (res) {
                res.data[99].states.forEach(val => {

                    $("#state").append(`<option>${val.name}</option>`);
                })
            },
            error: function (xhr, txt, error) {
                console.log(error);
            }
        });       
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
        });
    });     
    function lnameValid() {
        let lnameValue = $("#lname").val();
        let pattern = /\D/;
        let small = $("#lname").parent().siblings("small");
        if (lnameValue == "") {
            small.text("Last Name Empty");
            return false;
        }
        else if (!pattern.test(lnameValue)) {
            small.text("Last Name can't include ");
            return false;
        }
        else {
            small.text("Valid").css("color","green");
            return true;
        }
    }
    function fnameValid() {
        let fnameValue = $("#fname").val();
        let pattern = /\D/;
        let small = $("#fname").parent().siblings("small");
        if (fnameValue == "") {
            small.text("First Name Empty");
            return false
        }
        else if (!pattern.test(fnameValue)) {
            small.text("First Name can't include ");
            return false
        }
        else {
            small.text("Valid").css("color","green");
            return true;
        }        
    }
    function genderValid() {
        if (!genderStatus) {
            $(".genderError").text("Select gender").css("color", "red")
        } else {
            $(".genderError").text("");
        }
    }
    function addressValid() {
        let addressValue = $("#addressInput").val().trim();
        if (addressValue == "") {
            $("#addressInput").siblings("small").text("Address Empty").css("color", "red");
            return false;
        }
        else {
            $("#addressInput").siblings("small").text("Valid").css("color","green");
            return true;
        }
    }
    function stateValid() {
        if ($("#state").val() == "Choose State") {
            $("#stateError").text("Select State").css("color", "red");
            return false;
        }
        else {
            $("#stateError").text("Selected").css("color","green");
            return true;
        }
    }
    function cityValid() {
        if ($("#city").val() == "Choose City") {
            $("#cityError").text("Select City").css("color", "red");
            return false;
        }
        else {
            $("#cityError").text("Selected").css("color","green");
            return true;
        }
    }
    $("[type='radio'][name='gender']").map((index, input) => {
        $(input).click(function () {
            genderStatus = true;
            $(".genderError").text("");
        })

    })
    //username validation
    $("#userName").blur(userNameValid);
    function userNameValid() {         
        let userName = $("#userName").val();       
        if (userName == "") {
            $(".userNameError").text("Username Empty").css("color", "red");
            return false;
        }
        else if (isUserNameExist(userName)) {
            $(".userNameError").text("Username already exist").css("color", "red");
            return false;
        }
        
        else {
            $(".userNameError").text("Valid").css("color", "green");
            return true;
        }       
    }
    function isUserNameExist(userName) {
        let storedUserNames = JSON.parse(localStorage.getItem("userDetails"));
        return storedUserNames.some((value) => {
            return value.uname == userName
        });
    }
    //password validation
    $("#pwd").blur(pwdValid);    
    function pwdValid() {
        let pwdValue = $("#pwd").val();
        const pwdPattern = /[a-z0-9A-Z][0-9]/;
        if (pwdValue == "") {
            $(".pwdError").text("Password Empty").css("color", "red");
            return false;
        }
        else if (pwdValue.length < 8) {
            $(".pwdError").text("Password can't less than 8 char").css("color", "red");
            return false;
        }
        else if (!pwdPattern.test(pwdValue)) {
            $(".pwdError").text("Password include letter,number and symbol").css("color", "red");
            return false;
        }
        else {
            $(".pwdError").text("Valid").css("color", "green");
            return true;
        }
    }
    //mobile validatation
    $("#email").blur(emailValid);
    function emailValid() {
        let email = $("#email").val();
        const pattern = /^[A-Za-z0-9$@.-_]+@[a-z]+\.[a-z]+$/;
        if (email == "") {
            $(".emailError").text("Email Empty").css("color", "red");
            return false;
        }
        else if (!pattern.test(email)) {
            $(".emailError").text("Email Invalid").css("color", "red");
            return false;
        }
        else {
            $(".emailError").text("Valid").css("color", "green");
            return true;
        }
    }
    $("#mobile").blur(mobileValid);
    function mobileValid() {
        let number = $("#mobile").val();
        if (number == "") {
            $(".mobileError").text("Mobile number empty").css("color", "red");
            return false;
        }
        else if (number.length != 10) {
            $(".mobileError").text("Mobile number must be 10 digit").css("color", "red");
            return false;
        }
        else {
            $(".mobileError").text("Valid").css("color", "green");
            return true;
        }

    }
    function errorClear() {
        $("small").map((i, input) => {
            $(input).text("");
        })
    }
    $("#submitBtn").click(function (e) {
        e.preventDefault();
        lnameValid();
        dateValid();
        addressValid();
        stateValid();
        cityValid();
        genderValid();
        emailValid();
        mobileValid();
        userNameValid();
        pwdValid();
        if (fnameValid() && lnameValid() && dateValid() && addressValid() && stateValid() && cityValid() && userNameValid() && pwdValid()) {
            if (!localStorage.getItem('userDetails')) {
                let array = [];
                let newData = {
                    fname: $("#fname").val(),
                    lname: $("#lname").val(),
                    uname: $("#userName").val(),
                    pwd: $("#pwd").val()
                }
                array.push(newData);
                try {
                    localStorage.setItem('userDetails', JSON.stringify(array));
                }
                catch {
                    console.log("error");
                }
            }
            else {
                let oldData = JSON.parse(localStorage.getItem('userDetails'));
                console.log(oldData);
                let newData = {
                    fname: $("#fname").val(),
                    lname: $("#lname").val(),
                    uname: $("#userName").val(),
                    pwd: $("#pwd").val()
                }
                oldData.push(newData);
                try {
                    localStorage.setItem('userDetails', JSON.stringify(oldData))
                }
                catch {
                    console.log("error");
                }
            }

            $("#alertBox-container").css("display", "flex");
            $(".form")[0].reset();
            errorClear();
        }
        
    });

    $("#msgCancel-icon").click(function () {
        $("#alertBox-container").css("display","none");
    })
    
});