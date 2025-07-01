const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY", "AED", "SGD"];

// Populate dropdowns
currencies.forEach(curr => {
  const option1 = document.createElement("option");
  option1.value = curr;
  option1.text = curr;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = curr;
  option2.text = curr;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount";
    return;
  }

  try {
    const apiKey = "4aad2963a165fc8424d01045e5353ae3"; // Replace if needed
    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching exchange rate";
    console.error(error);
  }
}
