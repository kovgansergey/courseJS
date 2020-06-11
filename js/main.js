"use strict";

let money;
let income = 'Парашютные прыжки';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];
let mission = 128000;
let period = 6;

function start() {
  money = +prompt('Ваш месячный доход?');
}

start();

function showTypeOf(data) {
  return typeof data;
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

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 4; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?')
    sum += +prompt('Во сколько это обойдется?');
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
  return Math.ceil(mission / accumulatedMonth);
}

console.log('type "money": ', showTypeOf(money));
console.log('type "income": ', showTypeOf(income));
console.log('type "deposit": ', showTypeOf(deposit));
console.log(expenses);
console.log('Расходы за месяц: ', expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());