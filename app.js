let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById('from-currency-select');
const toDropDown = document.getElementById('to-currency-select');

// Create Dropdown from the currencies array
// For FromDropDown
currencies.forEach((currency) => {
  const option = document.createElement('option');
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});
// For ToDropDown
currencies.forEach((currency) => {
  const option = document.createElement('option');
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting defaut values 
fromDropDown.value = 'USD';
toDropDown.value = 'INR';

let convertCurrency = () => {
  //Create references
  const amount = document.getElementById('amount').value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If inout field is not  empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed()} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
}

document.getElementById('convert-button').addEventListener('click', convertCurrency);
window.addEventListener('load', convertCurrency);