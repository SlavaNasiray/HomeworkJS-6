let buttons = document.getElementsByClassName('buttons');
let outputLacation = document.getElementById('outputLocation');
let outputLacationMini = document.getElementById('outputLocationMini');
let text = document.getElementById('text');
let radChecked = document.getElementById('radioButton1');
let num1 = 0;
let num2 = 0;
let operation;
let history = [];
let afterOperation = false;
let сlearHistory = false;
let secondParameter = false;

receiptOfOperation = (inputVariables) => {
    if (outputLacation.value !== ""){
        num1 = outputLocation.value;
    }   
    operation = inputVariables;
    if (secondParameter === false){
        outputLocationMini.value = outputLocation.value + " " + operation;  
    } else {
        outputLocationMini.value += " " + num2 + " " + operation;  
    }
    
    afterOperation = true;  
}

factorial = (n) => {
    return n ? n * factorial(n - 1) : 1;
}

historyСheck = () => {
    if (history.length > 2){
        history.shift();
    }   
    text.innerHTML = "";
    сlearHistory = false;    
}

var operations = {
    '+': (num1, num2) => (num1 * 10 + num2 * 10) / 10,  
    '-': (num1, num2) => (num1 * 10 - num2 * 10) / 10,    
    '*': (num1, num2) => (num1 * 10 * num2 * 10) / 100,    
    '/': (num1, num2) => (num1 * 10 / num2 * 10) / 100,    
    '%': (num1, num2) => num1 % num2,    
    '^': (num1, num2) => Math.pow(num1, num2),

    'Sin': (num1) => Math.sin(Number(num1)),  
    'Cos': (num1) => Math.cos(Number(num1)),    
    'Tan': (num1) => Math.tan(Number(num1)),    
    'Ctg': (num1) => 1/Math.tan(Number(num1)),    
    'Sqrt': (num1) => Math.sqrt(Number(num1)),    
    '!': (num1) => factorial(Number(num1)) 
};



inputOperation = (inputVariables) => {

    switch (inputVariables){   
        case "H": 
            if (сlearHistory === false){
                for (let i = 0; i < history.length; i ++){
                    text.innerHTML += `<p>${history[i]}</p>`;
                }
                сlearHistory = true;
            } else {
                text.innerHTML = "";
                сlearHistory = false;
            }            
                
            break;
        case "Clear":    
            outputLocation.value = 0;
            outputLocationMini.value = "";
            num1 = 0;
            num2 = 0;
            break;
        case "Back":    
            outputLocation.value = outputLocation.value.substring(0, outputLocation.value.length - 1);
            if (outputLocation.value === ""){
                outputLocation.value = 0;
            }
            break;
        case "+-":   
            outputLocation.value *= -1;
            break;
        case ".":
            if (outputLocation.value.includes(".") === false){
                outputLocation.value += ".";
            }            
            break
        case "+":
        case "-":
        case "*":
        case "/":
        case "%": 
        case "^":  
            if (secondParameter === true){
                num2 = outputLocation.value;
                outputLocation.value = operations[operation](Number(num1), Number(num2)); 
            }
            receiptOfOperation(inputVariables);
            secondParameter = true;
            break;
        case "Sin":
        case "Cos":
        case "Tan":
        case "Ctg":
        case "Sqrt":
        case "!":
            receiptOfOperation(inputVariables);
        case "=":
            secondParameter = false;
            
            if (outputLacation.value !== ""){
                num2 = outputLocation.value;
            }
            
            switch (operation){
                
                case "+":
                case "-":
                case "*":
                case "/":
                case "%": 
                case "^":                 
                    outputLocation.value = operations[operation](Number(num1), Number(num2)); 
                    if (operation == '/' && num2 == 0){
                        outputLocation.value = "Деление на 0";
                    }  
                    historyСheck();              
                    history.push(outputLocationMini.value + ' ' + num2 + ' = ' + outputLocation.value);    
                    break; 
                
                case "Sin":
                case "Cos":
                case "Tan":
                case "Ctg":               
                    if (radChecked.checked === true){
                        outputLocation.value = operations[operation](Number(num1)).toFixed(4);      
                    } else {
                        outputLocation.value = operations[operation](Number(num1)*Math.PI/180).toFixed(4); 
                    }
                    historyСheck();
                    history.push(operation + " " + num1 + ' = ' + outputLocation.value);  
                    
                    break; 
                case "Sqrt": 
                    outputLocation.value = operations[operation](Number(num1)).toFixed(6);
                    historyСheck(); 
                    history.push(operation + " " + num1 + ' = ' + outputLocation.value); 
                    
                    break; 
                case "!":
                    outputLocation.value = factorial(Number(num1));                    
                    historyСheck();             
                    history.push(operation + num1 + ' = ' + outputLocation.value);  
                    
                    break;    
            }
            outputLocationMini.value = "";
            num1 = num2;            
            afterOperation = true;
            break;
            
        default:
            if (outputLocation.value === "0" || afterOperation === true){
                outputLocation.value = "";
                afterOperation = false;
            }
            outputLocation.value += inputVariables;
            break;
    }
    console.log(history);
}

buttonsClick = (event) => inputOperation(event.currentTarget.innerHTML);

for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', buttonsClick);
}

