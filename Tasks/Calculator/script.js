// JavaScript source code
const screen = document.getElementById('screen');
const submit = document.getElementById('result');

submit.addEventListener('click', Result);
document.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        Result();
    }
})

// display clear function

function clearDisplay() {
    screen.value = ""
}

// values display into screen

function display(e) {
    screen.value += e
}

// display result

function Result() {
    let value = screen.value;
    let total = 0;

    //addtion part 
    if (value.includes('+')) {
        for (let v of value.split('+')) {
            total = total + parseInt(v);
        }
    }

    // substract part
    else if (value.includes('-')) {
        let subValues = value.split('-');
        if (subValues.length == 2) {
            total = subValues[0] - subValues[1];
        }
        else {
            total = subValues[0];
            let nextValue = 0
            for (let v = 1; v < subValues.length; v++) {
                nextValue = nextValue + parseInt(subValues[v]);
            }
            total = total - nextValue;
        }
    }

    // mulitiplication part

    else if (value.includes('*')) {
        total = 1;
        for (let v of value.split('*')) {
            total = total * v;
        }
    }

    // divition part

    else if (value.includes('/')) {
        let divValue = value.split('/');

        if (divValue.length == 2) {
            total = divValue[0] / divValue[1];
        }
        else {
            total = divValue[0]
            for (let i = 1; i < divValue.length; i++) {
                total = total / divValue[i];
            }
        }
    }
    else {
        total = 'Error';
    }
    screen.value = total;
}
