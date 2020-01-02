`use strict`

let allCurrency = [];
let list1 = document.querySelector('#converted-currency');
let list2 = document.querySelector('#convetring-currency');

window.onload = () => {

    // definde date
    const x = new Date();
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    const date = y + m + d;
    const convertButton = document.querySelector('#convert-button');
    const resultField = document.querySelector('#result-field');
    let dataMain;

    // get NBU api
    let url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`;

    // using promises to process information 
    fetch(url)
        .then(res => {
            if (res) {
                try {
                    return res.json();
                } catch(e) {
                    console.error('response does not meet json format');
                }
            }
            return {};
        })
        .then(data => {
            fillLists(data);
            dataMain = data;
        })
    
        // converting currency
    convertButton.addEventListener('click', () => {
        let entryValue = document.querySelector('#amount').value;
        let convertedValue = document.querySelector('#converted-currency').value;
        let convertingValue = document.querySelector('#convetring-currency').value;
        let convertedAmount, convertingAmount;

        dataMain.forEach(item => {
            if (convertedValue === item.cc) {
                convertedAmount = item.rate;
            }
            if (convertingValue === item.cc) {
                convertingAmount = item.rate;
            }
        });
        if (convertedAmount === undefined) {
            convertedAmount = 1;
        }
        if (convertingAmount === undefined) {
            convertingAmount = 1;
        }
        console.log(convertedAmount);
        console.log(convertingAmount);
        resultField.value = (entryValue * (convertedAmount / convertingAmount)).toFixed(2);
    });
};


// fill in lists of currency
function fillLists(data) {
    data.forEach(item => {
        allCurrency.push(item.cc);
    });
    allCurrency.sort();
    for (let i = 0; i < allCurrency.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = allCurrency[i];
        list1.appendChild(option);
    }
    for (let i = 0; i < allCurrency.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = allCurrency[i];
        list2.appendChild(option);
    }
}

