"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let expensesMonth;
let accumulatedMonth;
let budgetDay;

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
  mission: 128000,
  period: 6,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let property = prompt('Введите обязательную статью расходов?');
      let value;
      
      do {
        value = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(value));

      appData.expenses[property] = +value;
    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() {
    let item;
    let sum = 0;
  

  
    return sum;
  },
  getAccumulatedMonth: function() {
    return money - expensesMonth;
  },
  getTargetMonth: function() {
    let target = Math.ceil(appData.mission / accumulatedMonth);
    let result = target < 0 ? 'Цель не будет достигнута' : 'Цель будет достигнута за: ' + target + ' месяцев';
    return result;
  },
  getStatusIncome: function() {
    if (budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (budgetDay < 1200 && budgetDay >= 600) {
      return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  }
};

appData.asking();

expensesMonth = appData.getExpensesMonth();
accumulatedMonth = appData.getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);

console.log('expenses: ', appData.expenses);
console.log('Расходы за месяц: ', expensesMonth);
console.log(appData.getTargetMonth());
console.log('Бюджет на день: ', budgetDay);
console.log(appData.getStatusIncome());