// JavaScript source code
let fnameStatus = false;
let lnameStatus = false;
let dateStatus = false;
let genderStatus = false;

function fnameValid() {
    let fname = document.getElementById("fname");
    let fnameError = document.getElementById("fnameError");
    let fnameValue = fname.value;
    let pattern = /\D/;
    if (fnameValue == "") {
        fnameError.innerHTML = "Last Name Empty";
        fnameError.style.color = "red";
        return false;
    }
    else if (!pattern.test(lnameValue)) {
        fnameError.innerHTML = "Last Name can't include number";
        fnameError.style.color = "red";
        return false;
    }
    else {
        fnameError.innerHTML = "Valid";
        fnameError.style.color = "green";
        return true;
    }
}

function lnameValid() {
    let lname = document.getElementById("lname");
    let lnameError = document.getElementById("lnameError");
    let lnameValue = lname.value;
    let pattern = /\D/;
    if (lnameValue == "") {
        lnameError.innerHTML="Last Name Empty";
        lnameError.style.color="red";
        return false;
    }
    else if (!pattern.test(lnameValue)) {
        lnameError.innerHTML = "Last Name can't include number";
        lnameError.style.color = "red";
        return false;
    }
    else {
        lnameError.innerHTML = "Valid";
        lnameError.style.color = "green";
        return true;
    }
}

function addressValid() {
    let addressValue = document.getElementById("addressInput");
    let addressError = document.getElementById("addressError");

    if (addressValue.value.trim() == "") {
        addressError.innerHTML = "Address empty";
        addressError.style.color = "red";
        return false;
    }
    else {
        addressError.innerHTML = "Valid";
        addressError.style.color = "green";
        return true;
    }
}

function emailValid() {
    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    const pattern = /^[A-Za-z0-9$@.-_]+@[a-z]+\.[a-z]+$/;
    if (email == "") {
        emailError.innerHTML = "Email Empty";
        emailError.style.color = "red";       
        return false;
    }
    else if (!pattern.test(email)) {
        emailError.innerHTML = "Email Invalid";
        emailError.style.color = "red";    
        return false;
    }
    else {
        emailError.innerHTML = "Valid";
        emailError.style.color = "green";    
        return true;
    }
}
function stateValid() {
    let state = document.getElementById("state");
    let stateError = document.getElementById("stateError");
    if (state.value == "Choose State") {
        stateError.innerHTML = "State empty";
        stateError.style.color="red"
        return false;
    }
    else {
        stateError.innerHTML = "Selected";
        stateError.style.color = "green";
        return true;
    }
}
function cityValid() {
    let city = document.getElementById("city");
    let cityError = document.getElementById("cityError");
    if (city.value == "Choose State") {
        cityError.innerHTML = "City empty";
        cityError.style.color = "red"
        return false;
    }
    else {
        cityError.innerHTML = "Selected";
        cityError.style.color = "green";
        return true;
    }
}
function userNameValid() {
    let userName = document.getElementById("userName").value;
    let userNameError = document.getElementById("userNameError");
    if (userName.trim() == "") {
        userNameError.innerHTML = "Username Empty";
        userNameError.style.color = "red";
        return false;
    }
    else if (isUserNameExist(userName)) {
        userNameError.innerHTML = "Username Empty";
        userNameError.style.color = "red";
        return false;
    }

    else {
        $(".userNameError").text("Valid").css("color", "green");
        return true;
    }
}
$(document).ready(function () {
    
   

    //fname validation
    $("#fname").blur(fnameValid);
    //lname validation
    $("#lname").blur(lnameValid);
    // date validation
   
    // address validation
    $("#addressInput").blur(addressValid);
    function dateValid() {
        if (dateStatus) {
            $(".dateError").text("");
            return true;
        }
        else {
            $(".dateError").text("Select Date").css("color", "red");
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
   
    
    function genderValid() {
        if (!genderStatus) {
            $(".genderError").text("Select gender").css("color", "red")
        } else {
            $(".genderError").text("");
        }
    }
    function addressValid() {
        //let addressValue = $("#addressInput").val().trim();
        let addressValue = document.getElementById("addressInput");
        let addressError = document.getElementById("addressError");
     
        if (addressValue.value.trim() == "") {
            //$("#addressInput").siblings("small").text("Address Empty").css("color", "red");
            addressError.innerHTML = "Address empty";
            return false;
        }
        else {
            $("#addressInput").siblings("small").text("Valid").css("color", "green");
            return true;
        }
    }
    function stateValid() {
        if ($("#state").val() == "Choose State") {
            $("#stateError").text("Select State").css("color", "red");
            return false;
        }
        else {
            $("#stateError").text("Selected").css("color", "green");
            return true;
        }
    }
    function cityValid() {
        if ($("#city").val() == "Choose City") {
            $("#cityError").text("Select City").css("color", "red");
            return false;
        }
        else {
            $("#cityError").text("Selected").css("color", "green");
            return true;
        }
    }
   
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
        $("#alertBox-container").css("display", "none");
    })

});