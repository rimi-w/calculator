const button = document.querySelectorAll(`.button`);
const display = document.querySelector(`.display`);
const red = document.querySelector(`.red`);
const transparency = document.getElementById(`transparency`);
const container = document.getElementById(`container`); 

let firstOperand = ``;
let secondOperand = ``;
let operator = null;

button.forEach(button => {
    button.addEventListener(`click`, () => {

        let btnText = button.textContent;
        // 클래스가 number인 경우
        if (button.classList.contains(`number`)){
            if (operator === null && firstOperand === ``) {
                Number(display.textContent) === 0 ? 
                display.textContent = btnText : 
                display.textContent += btnText;
            } else {
                secondOperand += btnText;
                display.textContent = secondOperand ;
            }
            console.log(button); // 숫자 클릭시 콘솔창에 출력
        }

        // 클래스가 operator인 경우
        else if (button.classList.contains(`operator`)){
            if (operator === null) {
                firstOperand = display.textContent; // 첫번째 숫자 기억
                operator = btnText ; // 연산기호 기억
                secondOperand = ``;
                console.log (`firstOperand : ${firstOperand}, operator : ${operator}`);
            } else if (operator !== null || firstOperand === null) {
                secondOperand = display.textContent ;
                calculate(Number(firstOperand),Number(secondOperand));
                operator = btnText;
                secondOperand = ``;
                console.log (`firstOperand : ${firstOperand}, operator : ${operator}`);
            }
        }

        // 클래스가 function인 경우
        else if (button.classList.contains(`function`)){
            switch (btnText) {
                case `C` : {
                    firstOperand = ``;
                    secondOperand = ``;
                    operator = null;
                    display.textContent = `0`;
                } break;
                case `±` : {
                    changeAbs();
                } break;
                case `%` : {
                    percentFunc();
                } break;
            }
        }

        else {
            switch (btnText) {
                case `.` : {
                    hasDot();
                } break;
                case `=` : {
                    calculate (Number(firstOperand),Number(secondOperand));
                } break;
            }
        }
    })
})

const changeAbs = function () {
    display.textContent *= (-1);
    secondOperand = display.textContent;
}

const hasDot = function() {
    if (display.textContent.includes(`.`)) {
        display.textContent += ``;
    } else if (secondOperand === ``) {
        display.textContent += `.`;
    } else {
        secondOperand = display.textContent;
        display.textContent += `.`;
        secondOperand += `.`;
    }
}

const calculate = function (num1, num2) {
    if (operator === null && firstOperand === ``) {
        firstOperand = display.textContent;
        display.textContent = firstOperand;
    } else if (operator === null) {
        firstOperand = display.textContent;
        display.textContent = firstOperand;
        secondOperand = ``;
    } else {
        switch (operator) {
            case `÷` : {
                if ( num2 === 0) {
                    display.textContent = `ERR : 0으로 나눌 수 없습니다.`;
                    console.log(`ERROR : 0으로 나눌 수 없습니다.`);
                } else {
                    num1 = (num1 / num2).toFixed(2);
                    display.textContent = num1;
                    secondOperand = ``;
                    firstOperand = num1;
                    operator = null;
                }
            } break;
            case `×` : {
                num1 *= num2;
                display.textContent = num1;
                secondOperand = ``;
                firstOperand = num1;
                operator = null;
            } break;
            case `−` : {
                num1 -= num2;
                display.textContent = num1;
                secondOperand = ``;
                firstOperand = num1;
                operator = null;
            } break;
            case `+` : {
                num1 += num2;
                display.textContent = num1;
                secondOperand = ``;
                firstOperand = num1;
                operator = null;
            } break;
            case `%` : {
                if (secondOperand !== ``) {
                    num1 %= num2;
                    display.textContent = num1;
                    secondOperand = ``;
                    firstOperand = num1;
                    operator = null;
                } else if (secondOperand === ``) {
                    num1 /= 100;
                    display.textContent = num1;
                    secondOperand = ``;
                    firstOperand = num1;
                    operator = null;
                } break;
            }
        }
    }
}

const percentFunc = function () {
    if (operator !== null) {
        secondOperand = firstOperand * (secondOperand / 100);
    } else {
        firstOperand = display.textContent;
        operator = `%`;
        secondOperand = ``;
        console.log(firstOperand);
    }
}


red.addEventListener(`click`, () => {
    window.close();
})

transparency.addEventListener(`input`,() => {
    container.style.opacity = transparency.value;
})