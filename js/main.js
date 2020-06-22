"use strict";

let start = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('[type="range"]');
let periodAmount = document.querySelector('.period-amount');
let nameItems = document.querySelectorAll('[placeholder="Наименование"]');
let summItems = document.querySelectorAll('[placeholder="Сумма"]');
let cancel = document.getElementById('cancel');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function validation() {
  nameItems = document.querySelectorAll('[placeholder="Наименование"]');
  summItems = document.querySelectorAll('[placeholder="Сумма"]');

  nameItems.forEach(function(item) {
    item.addEventListener('input', function() {
      item.value = item.value.replace(/[^А-Яа-яЁё,.!?;: ]/,'');
    });
  });
  
  summItems.forEach(function(item) {
    item.addEventListener('input', function() {
      item.value = item.value.replace(/[^0-9]/,'');
    });
  });
}

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function() {
    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    let data = document.querySelector('.data');
    let inputsData = data.querySelectorAll('input[type=text]');

    inputsData.forEach(function(item) {
      item.disabled = true;
    });

    start.style.display = 'none';
    cancel.style.display = 'inline-block';
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {incomePeriodValue.value = this.calcPeriod();}.bind(appData));
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneExpensesItemInputs = cloneExpensesItem.querySelectorAll('input');
    cloneExpensesItemInputs.forEach(function(item) {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    validation();
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let cloneIncomeItemInputs = cloneIncomeItem.querySelectorAll('input');
    cloneIncomeItemInputs.forEach(function(item) {
      item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    validation();
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }, this);
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  getExpensesMonth: function() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },
  getIncomeMonth: function() {
    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function() {
    let target = Math.ceil(targetAmount.value / this.budgetMonth);
    let result = target < 0 ? 'Цель не будет достигнута' : 'Цель будет достигнута за: ' + target + ' месяцев';
    return result;
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function() {
    if (this.deposit) {
      let percentDeposit;
      let moneyDeposit;

      do {
        percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(percentDeposit));

      do {
        moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(moneyDeposit));

      this.percentDeposit = +percentDeposit;
      this.moneyDeposit = +moneyDeposit;
    }
  },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  reset: function() {
    let textInputs = document.querySelectorAll('input[type=text]');

    textInputs.forEach(function(item) {
      item.disabled = false;
      item.value = '';
    });

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    let n;
    n = incomeItems.length;
    while(n > 1) {
      incomeItems[n - 1].remove();
      n--;
    }

    n = expensesItems.length;
    while(n > 1) {
      expensesItems[n - 1].remove();
      n--;
    }

    incomePlus.style.display = '';
    expensesPlus.style.display = '';
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    start.style.display = '';
    cancel.style.display = '';
    start.setAttribute('disabled', true);
  }
};

start.setAttribute('disabled', true);
salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  } else {
    start.setAttribute('disabled', true);
  }
});

start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', function() {periodAmount.textContent = periodSelect.value;});
cancel.addEventListener('click', appData.reset.bind(appData));

validation();

/*
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}

for (let i = 0; i < appData.addExpenses.length; i++) {
  appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
}

console.log(appData.addExpenses.join(', '));
*/