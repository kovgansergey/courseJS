"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Парашютные прыжки';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];
let mission = 128000;
let period = 6;

function start() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
}

start();

function showTypeOf(data) {
  return typeof data;
}

function getExpensesMonth() {
  let item;
  let sum = 0;

  for (let i = 0; i < 4; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    do {
      item = prompt('Во сколько это обойдется?');
    }
    while(!isNumber(item));

    sum += +item;
  }

  return sum;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

function getTargetMonth() {
  let target = Math.ceil(mission / accumulatedMonth);
  let result = target < 0 ? 'Цель не будет достигнута' : 'Цель будет достигнута за: ' + target + ' месяцев';
  return result;
}

function getStatusIncome() {
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

console.log('type "money": ', showTypeOf(money));
console.log('type "income": ', showTypeOf(income));
console.log('type "deposit": ', showTypeOf(deposit));
console.log(expenses);
console.log('Расходы за месяц: ', expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());