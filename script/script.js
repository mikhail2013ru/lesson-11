'use strict';

let start = document.getElementById('start');
let buttonPlusIncome = document.getElementsByTagName('button')[0];
let buttonPlusExpenses = document.getElementsByTagName('button')[1];
let buttonDeposit = document.querySelector('#deposit-check');
let salaryAmount = document.querySelectorAll('.salary-amount')[0];
let incomeInput = document.querySelectorAll('.income-title')[1];
let amountInput = document.querySelectorAll('.income-amount')[0];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
//let additionalInputncome2 = document.querySelectorAll('.additional_income-item')[1];
let expensesTitle = document.querySelectorAll('.expenses-title')[1];
let expensesAmount = document.querySelectorAll('.expenses-amount')[0];
let additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')[0];
let targetAmount = document.querySelectorAll('.target-amount')[0];
let budgetMonthValue = document.querySelectorAll('.result-total')[0];
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let expensesItems = document.querySelectorAll('.expenses-items');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

console.log(periodAmount);

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(n) {
  //return /[а-яА-ЯеЁ\s,]/g.test(n);
  return /^[a-zа-яё]+$/g.test(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addExpenses: [],
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 8,
  start: function() {
    // do {
    //   money = +prompt('“Ваш месячный доход?”');
    
    //   } while (!isNumber(parseFloat(money)));
      if(salaryAmount.value === ''){
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
      }
      appData.budget = +salaryAmount.value;
      console.log('salaryAmount.value: ', salaryAmount.value);

      appData.getExpenses();
      // appData.asking();
      appData.getExpensesMonth();
      appData.getBudget();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getIncome();
      appData.showResult();
  },

  showResult:function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();

    periodAmount.value.addEventListener('input', appData.getPeriodValue);
  },

  getPeriodValue: function(){
    //incomePeriodValue.value = appData.getRangePeriod();
    incomePeriodValue.value.textContent = appData.getRangePeriod();
  },

  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      buttonPlusExpenses.style.display = 'none';
    }
  },

  addIncomeBlock: function(){
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
      buttonPlusIncome.style.display = 'none';
    }
  },

  getExpenses: function(){
    expensesItems.forEach(function(item){
      console.log(item);
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
    });
  }, 

  getIncome: function(){
    //тоже что getexpenses только с доходами
    additionalIncomeItem.forEach(function(item){
        let itemIncome = item.value;
        console.log(itemIncome);
        let cashIncome = item.value;

        if(itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
    });

    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;

      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
      } while (!isString(itemIncome)); 

      let cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);

      while (!isNumber(cashIncome)) {
        cashIncome = +prompt('Сколько в месяц зарабатываете на этом?', 10000);
      }

      appData.income[itemIncome] = cashIncome;
    }

    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function(){
    return (Math.ceil(targetAmount.value / appData.budgetMonth));
  },

  getRangePeriod: function(){
    return periodAmount.textContent = periodSelect.value;
    //periodSelect.textContent.value = periodAmount.value;
  },

  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      console.log('“У вас высокий уровень дохода”');
    } else if (appData.budgetDay >= 600) {
      console.log('“У вас средний уровень дохода”');
    } else if (appData.budgetDay < 600) {
      console.log('“К сожалению у вас уровень дохода ниже среднего”');
    } else if (appData.budgetDay < 0) {
      console.log('“Что то пошло не так”');
    }
  },
  
  getInfoDeposit: function(){
    if(appData.deposit){

      do {
        let percentDeposit = prompt('Какой годовой процент?', '10');
        let moneyDeposit = prompt('Какая сумма заложена?', 10000);

        appData.percentDeposit = percentDeposit;
        appData.moneyDeposit = moneyDeposit;
        //console.log('Условие 3 проходит проверку!');

      } while (!isNumber(appData.percentDeposit) && appData.moneyDeposit !== null)
      
    }
  },

  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start);

buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);

buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getRangePeriod);

appData.getPeriodValue();

appData.getStatusIncome();

for (let key in appData) {
  //appData.expensesMonth += appData.expenses[key];
  //console.log(`"Наша программа включает в себя данные: " ${appData[key]}`);
}

appData.getInfoDeposit();