"use strict";

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
let budgetDay;
let expenses1;
let expenses2;
let amount1;
let amount2;
let budgetMonth;
let time;

money = +prompt('Ваш месячный доход?');
income = 'Парашютные прыжки';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?');
budgetMonth = money - amount1 - amount2;
mission = 128000;
period = 6;
time = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth / 30);

console.log('type "money": ', typeof money);
console.log('type "income": ', typeof income);
console.log('type "deposit": ', typeof deposit);
console.log('length "addExpenses": ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за: ' + time + ' месяцев');
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}
