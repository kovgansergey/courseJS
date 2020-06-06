let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
let budgetDay;

money = 31000;
income = 'Парашютные прыжки';
addExpenses = 'Транспорт на аэродром, Интернет, Подгузники ребенку, Ремонт машины';
deposit = true;
mission = 128000;
period = 5;
budgetDay = money / 30;

console.log('type "money": ', typeof money);
console.log('type "income": ', typeof income);
console.log('type "deposit": ', typeof deposit);
console.log('length "addExpenses": ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);