// I need current order forms and previous orders
const orderFormElement = document.getElementById('orderForm');
const previousOrderElement = document.getElementById('orders');
const previousOrders = readOrders() || [];
// What is going to be on the form? Product and amount to purchase
for (let i = 0; i < previousOrders.length; i++) {
  let order = previousOrders[i];
  renderOrder(order);
}

function ProductOrder(productSelect, amount) {
    this.productSelect = productSelect;
    this.amount = amount;
}

function handleOrder(event) {
    event.preventDefault();

    const { productSelect, amount } = event.target;
    let orderFromForm = new ProductOrder(productSelect.value, amount.value);

    renderOrder(orderFromForm);
    saveOrders(orderFromForm);
}

orderFormElement.addEventListener('submit', handleOrder);

function renderOrder(orderFromForm) {
    let typeEl = document.createElement('h3');
    typeEl.innerText = orderFromForm.productSelect;
    let amountEl = document.createElement('p');
    amountEl.innerText = orderFromForm.amount;
    previousOrderElement.appendChild(typeEl);
    previousOrderElement.appendChild(amountEl);
}

function readOrders() {
    const jsonData = localStorage.getItem('orders');
    let parsedData = JSON.parse(jsonData);
    return parsedData;
}

function saveOrders(data) {
    previousOrders.push(data);
    let stringifiedData = JSON.stringify(previousOrders);

    localStorage.setItem('orders', stringifiedData);
}