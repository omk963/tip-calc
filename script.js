document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const peopleError = document.getElementById('people-error')
    const tipButtons = document.querySelectorAll('.tip-btn');
    const customTipInput = document.getElementById('custom-tip');
    const tipDisplay = document.getElementById('calc-tip');
    const totalDisplay = document.getElementById('calc-total');
    const resetButton = document.getElementById('reset');

    let billValue = 0;
    let peopleValue = 0;
    let tipValue = 0;

    const calculateTip = () => {
        if (billValue > 0 && peopleValue > 0 && tipValue >= 0) {
            const tipAmount = (billValue * (tipValue / 100)) / peopleValue;
            const totalAmount = (billValue / peopleValue) + tipAmount;
            updateDisplay(tipAmount, totalAmount)
        }
    }

    const updateDisplay = (tip, total) => {
        tipDisplay.textContent = `$${tip.toFixed(2)}`
        totalDisplay.textContent = `$${total.toFixed(2)}`
    }

    billInput.addEventListener('input', () => {
        billValue = parseFloat(billInput.value)
        calculateTip()
    })

    peopleInput.addEventListener('input', () => {
        peopleValue = parseInt(peopleInput.value)
        if (peopleValue === 0) {
            peopleError.classList.remove('hidden')
            peopleInput.classList.add('bg-red-100')
        } else {
            peopleError.classList.add('hidden')
            peopleInput.classList.remove('bg-red-100')
        }
        calculateTip()
    })

    tipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tipButtons.forEach(button => {
                if (button.classList.contains('active') || customTipInput.value >= 0) {
                    resetTip()
                }
            })
            btn.classList.add('active')
            btn.classList.replace('bg-teal-700', 'bg-teal-400')
            btn.classList.replace('text-white', 'text-teal-900')
            tipValue = parseFloat(btn.getAttribute('data-tip'))
            customTipInput.value = ''
            calculateTip()
        })
    })

    customTipInput.addEventListener('input', () => {
        resetTip()
        customTipInput.classList.add('border-2')
        customTipInput.classList.add('border-teal-700')
        tipValue = parseFloat(customTipInput.value) || 0
        calculateTip()
    })

    resetButton.addEventListener('click', () => {
        resetTip()
        tipValue = 0
        peopleError.classList.add('hidden')
        billInput.value = ''
        peopleInput.value = ''
        customTipInput.value = ''
        peopleInput.classList.remove('bg-red-100')
        updateDisplay(0, 0)
    })


    const resetTip = () => {
        tipButtons.forEach(btn => {
            btn.classList.remove('active')
            btn.classList.replace('bg-teal-400', 'bg-teal-700')
            btn.classList.replace('text-teal-900', 'text-white')
        })
        customTipInput.classList.remove('border-2');
        customTipInput.classList.remove('border-teal-700');
    }
})