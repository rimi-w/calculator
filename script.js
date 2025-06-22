const button = document.getElementsByClassName(`button`);
const display = document.querySelector(`.display`);
const red = document.querySelector(`.red`);
const transparency = document.getElementById(`transparency`);
const container = document.getElementById(`container`); 

const btns = []; // button의 텍스트 요소로 가지는 배열을 생성
for (let i=0; i<button.length; i++) {
    btns.push(button[i].textContent);
}

let firstOperand = ``;
let secondOperand = ``;
let operator = null;

for (let i=0; i<button.length; i++) {
    button[i].addEventListener(`click`,()=> {
        
        // 클래스가 number인 경우
        if (button[i].classList.contains(`number`)){
            if (operator === null && (firstOperand === `` || firstOperand === `0`)) {
                Number(display.textContent) === 0 ? 
                display.textContent = btns[i] : 
                display.textContent += btns[i];
            } else {
                secondOperand += btns[i];
                display.textContent = secondOperand ;
            }
            console.log(btns[i]); // 숫자 클릭시 콘솔창에 출력
        } 
        
        // 클래스가 operator인 경우
        else if (button[i].classList.contains(`operator`)){
            if (operator === null) {
                firstOperand = display.textContent; // 첫번째 숫자 기억
                operator = button[i].textContent ; // 연산기호 기억
                secondOperand = ``;
                console.log (`firstOperand : ${firstOperand}, operator : ${operator}`);
            } else if (operator !== null || firstOperand === null) {
                secondOperand = display.textContent ;
                calculate(Number(firstOperand),Number(secondOperand));
                operator = button[i].textContent;
                secondOperand = ``;
                console.log (`firstOperand : ${firstOperand}, operator : ${operator}`);
            }
        } 
        
        // 클래스가 function인 경우
        else if (button[i].classList.contains(`function`)){
            switch (button[i].textContent) {
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
        
        // 그 외 (. , =)
        else {
            switch (button[i].textContent) {
                case `.` : {
                    hasDot();
                } break;
                case `=` : {
                    calculate (Number(firstOperand),Number(secondOperand));
                } break;
            }
        }
    })
}

const changeAbs = function () {
    if (operator === null) {
        display.textContent *= (-1);
        firstOperand = display.textContent;
    } else {
        display.textContent *= (-1);
        secondOperand = display.textContent;
    }
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
    if (operator === null ) {
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
                    num1 /= num2;
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
        operator = `%`; // 이것때문에 NaN이 생김.
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