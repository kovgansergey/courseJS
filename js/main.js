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
  getSalaryAmountCheck: function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено');
      return;
    } else {appData.start();}
  },
  start: function() {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function() {incomePeriodValue.value = appData.calcPeriod();});
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
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getIncomeMonth: function() {
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    let target = Math.ceil(targetAmount.value / appData.budgetMonth);
    let result = target < 0 ? 'Цель не будет достигнута' : 'Цель будет достигнута за: ' + target + ' месяцев';
    return result;
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
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

      appData.percentDeposit = +percentDeposit;
      appData.moneyDeposit = +moneyDeposit;
    }
  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.getSalaryAmountCheck);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {periodAmount.textContent = periodSelect.value;});

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