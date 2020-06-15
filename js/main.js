"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

function start() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
}

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 128000,
  period: 6,
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      let cashIncome;

      // проверка, что введенные данные - НЕ число и НЕ пустая строка
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?').trim();
      }
      while (isNumber(itemIncome) || itemIncome === '');

      // проверка, что введенные данные - число
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
      }
      while (!isNumber(cashIncome));
      
      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let expensesProperty;
      let expensesValue;

      do {
        expensesProperty = prompt('Введите обязательную статью расходов?').trim();
      }
      while (isNumber(expensesProperty) || expensesProperty === '');
      
      do {
        expensesValue = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(expensesValue));

      appData.expenses[expensesProperty] = +expensesValue;
    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    let target = Math.ceil(appData.mission / appData.budgetMonth);
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
        percentDeposit = prompt('Какой годовой процент?');
      }
      while (!isNumber(percentDeposit));

      do {
        moneyDeposit = prompt('Какая сумма заложена?');
      }
      while (!isNumber(moneyDeposit));

      appData.percentDeposit = +percentDeposit;
      appData.moneyDeposit = +moneyDeposit;
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}

for (let i = 0; i < appData.addExpenses.length; i++) {
  appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
}

console.log(appData.addExpenses.join(', '));