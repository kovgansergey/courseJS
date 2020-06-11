"use strict";

let money = +prompt('Ваш месячный доход?');
let income = 'Парашютные прыжки';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let mission = 128000;
let period = 6;
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

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
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

console.log('type "money": ', showTypeOf(money));
console.log('type "income": ', showTypeOf(income));
console.log('type "deposit": ', showTypeOf(deposit));
console.log('Расходы за месяц: ', getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome());