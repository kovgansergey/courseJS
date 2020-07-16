  export default function calculator(price = 100) {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = calcBlock.querySelector('.calc-type');
    const calccSquare = calcBlock.querySelector('.calc-square');
    const calcCount = calcBlock.querySelector('.calc-count');
    const calcDay = calcBlock.querySelector('.calc-day');
    const totalValue = calcBlock.querySelector('#total');

    calcBlock.addEventListener('input', event => {
      const target = event.target;

      if (target.tagName === 'INPUT') {
        target.value = target.value.replace(/\D/, '');
      }
    });

    const totalAnimate = item => {
      let coin = 0;

      requestAnimationFrame(function totalAnim() {
        totalValue.textContent = coin;

        if (coin < item) {
          coin += Math.floor(item / 100);
          requestAnimationFrame(totalAnim);
        } else {
          totalValue.textContent = item;
        }
      });
    };

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calccSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalAnimate(Math.floor(total));
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('.calc-item')) {
        countSum();
      }
    });
  }