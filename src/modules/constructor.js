export default function constructor(checkGet) {
  const constructor = document.querySelector('.constructor'),
    chambers = document.getElementById('myonoffswitch'),
    wellTwo = constructor.querySelector('.well-two'),
    wellOneDiameter = document.getElementById('well-one-diameter'),
    wellOneRings = document.getElementById('well-one-rings'),
    wellTwoDiameter = document.getElementById('well-two-diameter'),
    wellTwoRings = document.getElementById('well-two-rings'),
    wellsBottom = document.getElementById('myonoffswitch-two'),
    wellDistance = document.getElementById('well-distance'),
    calcResult = document.getElementById('calc-result');

  function totalAnimate(item) {
    let coin = 0;

    requestAnimationFrame(function totalAnim() {
      calcResult.value = coin;

      if (coin < item) {
        coin += Math.floor(item / 50);
        requestAnimationFrame(totalAnim);
      } else {
        calcResult.value = item;
      }
    });
  }

  function countSum() {
    let price = 10000,
      kwod = 1, // коэффициент диаметра первого колодца
      kwor = 1, // коэффициент количества колец первого колодца
      kwtd = 1, // коэффициент диаметра второго колодца
      kwtr = 1, // коэффициент количества колец второго колодца
      kwb = 0, // коэффициент наличия днища колодца
      total;

    if (wellOneDiameter.selectedIndex === 1) {
      kwod = 1.2;
    }
    
    if (wellOneRings.selectedIndex === 1) {
      kwor = 1.3;
    } else if (wellOneRings.selectedIndex === 2) {
      kwor = 1.5;
    }

    if (wellsBottom.checked) {
      kwb = 1000;
    }

    if (!chambers.checked) {
      price = 15000;

      if (wellTwoDiameter.selectedIndex === 1) {
        kwtd = 1.2;
      }
      
      if (wellTwoRings.selectedIndex === 1) {
        kwtr = 1.3;
      } else if (wellTwoRings.selectedIndex === 2) {
        kwtr = 1.5;
      }

      if (wellsBottom.checked) {
        kwb = 2000;
      }
    }

    total = price * kwod * kwor * kwtd * kwtr + kwb;
    totalAnimate(Math.floor(total));
  }

  constructor.addEventListener('change', event => {
    const target = event.target;

    if (target === chambers) {
      wellTwo.classList.toggle('hidden');
    }

    if (target !== wellDistance) {
      countSum();
    }
  });

  wellDistance.addEventListener('input', event => {
    const target = event.target;
    target.value = target.value.replace(/\D/, '');
  });

  function getCalcData() {
    const calcData = {};
    
    calcData.chambers = 1;
    calcData.wellOneDiameter = wellOneDiameter.value;
    calcData.wellOneRings = wellOneRings.value;
    calcData.wellsBottom = wellsBottom.checked;
    calcData.wellDistance = wellDistance.value;
    calcData.calcResult = calcResult.value;

    if (!chambers.checked) {
      calcData.chambers = 2;
      calcData.wellTwoDiameter = wellTwoDiameter.value;
      calcData.wellTwoRings = wellTwoRings.value;
    }

    return calcData;
  }

  if (!checkGet) {
    countSum();
  } else {
    return getCalcData();
  }
}