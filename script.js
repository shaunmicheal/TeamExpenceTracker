const form = document.getElementById('expenseForm');
const personNameInput = document.getElementById('personName');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expensesList = document.getElementById('expenseList');
const totalAmountDisplay = document.getElementById('totalAmount');
const totalCountDisplay = document.getElementById('totalCount');

let expenses = [];

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const personName = personNameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!personName || !amount || !category) {
    alert('Please fill in all fields');
    return;
  }
  
  const expense = {
    id: Date.now(),
    name: personName,
    amount: amount,
    category: category
  };

  expenses.push(expense);
  
  renderExpenses();
  updateTotals();
  
  
  form.reset();
  personNameInput.focus();
});

function renderExpenses() {

  expensesList.innerHTML = '';

  if (expenses.length === 0) {
    expensesList.innerHTML = '<li>No expenses recorded yet. Add one to get started!</li>';
    return;
  }

  expenses.forEach(function(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${expense.name}</strong> - ${expense.category}
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span>$${expense.amount.toFixed(2)}</span>
          <button class="delete-btn" data-id="${expense.id}" style="background: none; border: none; color: red; cursor: pointer; font-size: 18px;">✕</button>
        </div>
      </div>
    `;
    expensesList.appendChild(li);
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const expenseId = parseInt(this.getAttribute('data-id'));
      deleteExpense(expenseId);
    });
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(function(expense) {
    return expense.id !== id;
  });
  
  renderExpenses();
  updateTotals();
}

function updateTotals() {
  const totalAmount = expenses.reduce(function(sum, expense) {
    return sum + expense.amount;
  }, 0);
  
  totalAmountDisplay.textContent = '$' + totalAmount.toFixed(2);
  totalCountDisplay.textContent = expenses.length;
}