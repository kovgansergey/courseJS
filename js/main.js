"use strict";

const start = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('[type="range"]');
const periodAmount = document.querySelector('.period-amount');
let nameItems = document.querySelectorAll('[placeholder="Наименование"]');
let summItems = document.querySelectorAll('[placeholder="Сумма"]');
const cancel = document.getElementById('cancel');

class AppData {
  constructor() {
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
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  start() {
    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    const data = document.querySelector('.data');
    const dataInputs = data.querySelectorAll('input[type=text]');
        
    dataInputs.forEach((item) => {
      item.disabled = true;
    });
  
    start.style.display = 'none';
    cancel.style.display = 'inline-block';
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {incomePeriodValue.value = this.calcPeriod();});
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const cloneExpensesItemInputs = cloneExpensesItem.querySelectorAll('input');
    cloneExpensesItemInputs.forEach((item) => {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    this.validation();
    expensesItems = document.querySelectorAll('.expenses-items');
  
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    const cloneIncomeItemInputs = cloneIncomeItem.querySelectorAll('input');
    cloneIncomeItemInputs.forEach((item) => {
      item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    this.validation();
    incomeItems = document.querySelectorAll('.income-items');
  
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
  
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
  
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    const target = Math.ceil(targetAmount.value / this.budgetMonth);
    const result = target < 0 ? `Цель не будет достигнута` : `Цель будет достигнута за: ${target} месяцев`;
    return result;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return `У вас высокий уровень дохода`;
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return `У вас средний уровень дохода`;
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return `К сожалению у вас уровень дохода ниже среднего`;
    } else {
      return `Что то пошло не так`;
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      let percentDeposit;
      let moneyDeposit;
  
      do {
        percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!this.isNumber(percentDeposit));
  
      do {
        moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!this.isNumber(moneyDeposit));
  
      this.percentDeposit = +percentDeposit;
      this.moneyDeposit = +moneyDeposit;
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  validation() {
    nameItems = document.querySelectorAll('[placeholder="Наименование"]');
    summItems = document.querySelectorAll('[placeholder="Сумма"]');

    nameItems.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^А-Яа-яЁё,.!?;: ]/,'');
      });
    });
    
    summItems.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/,'');
      });
    });
  }

  reset() {
    const textInputs = document.querySelectorAll('input[type=text]');

    textInputs.forEach((item) => {
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

  eventsListeners() {
    start.setAttribute('disabled', true);
  
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
      } else {
        start.setAttribute('disabled', true);
      }
    });
    
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', () => {periodAmount.textContent = periodSelect.value;});
    cancel.addEventListener('click', this.reset.bind(this));
    
    this.validation();
  }
}

const appData = new AppData();

appData.eventsListeners();

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