class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
        this.previousNumberTextElement = previousNumberTextElement
        this.currentNumberTextElement = currentNumberTextElement
        this.clear()
    }

    clear() {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operation = undefined
    }

    backspace() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === "." && this.currentNumber.includes('.')) return
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentNumber === '') return
        if(this.previousNumber !== ''){
            this.computeCalc()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''
    }

    computeCalc() {
        let computation
        const prev = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentNumber = computation
        this.operation = undefined
        this.previousNumber = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(intergerDigits)) {
            intergerDisplay =''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentNumberTextElement.innerText = this.getDisplayNumber(this.currentNumber)

        if(this.operation != null) {
            this.previousNumberTextElement.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
        } else {
            this.previousNumberTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const backspaceButton = document.querySelector('[data-backspace]')
const previousNumberTextElement = document.querySelector('[data-previous-number]')
const currentNumberTextElement = document.querySelector('[data-current-number]')

const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.computeCalc()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

backspaceButton.addEventListener('click', button => {
    calculator.backspace()
    calculator.updateDisplay()
})