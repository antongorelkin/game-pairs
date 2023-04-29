(function () {
  // создание игрового меню
  const getGameSectionMenu = () => {
    // создание элементов (заголовка, игрового поля и кнопок выбора сложности)
    const gameTitle = document.createElement('h2');
    const gameContaier = document.querySelector('.game__section-container');

    gameContaier.innerHTML = '';
    gameTitle.innerHTML = 'Выбор сложности';
    gameTitle.classList.add('game__section-title');
    // создание функции, отвечающей за выбор сложности
    const chooseGameDifficult = (dificult) => {
      const gameButton = document.createElement('button');

      gameButton.classList.add('game__difficult-btn');
      gameButton.textContent = `${dificult} карт`;

      // на кнопку устанавливаем слушатель
      gameButton.addEventListener('click', () => startGame(dificult));
      return gameButton
    }

    // добавляем элементы на страницу
    gameContaier.append(
      gameTitle,
      chooseGameDifficult(16),
      chooseGameDifficult(18),
      chooseGameDifficult(20),
      chooseGameDifficult(22)
    )
  };
  const cardsApp = () => {
    getGameSectionMenu()

  }


  // функция, которая дублирует каждое значение в массиве
  const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []);

  // Функция создания массива парных чисел
  const cardsArray = (initialCount) => {

    const cards = [
      'h-square',
      'heartbeat',
      'bath',
      'medkit',
      'wheelchair',
      'stethoscope',
      'thermometer-full',
      'wifi',
      'mars',
      'venus',
    ];

    // конструкция switch case для выбора сложности игры
    switch (initialCount) {
      case 16:
        return cards.slice(0, 8);
      case 18:
        return cards.slice(0, 9);
      case 20:
        return cards.slice(0, 10);
      case 22:
        return cards;
      default:
        break
    }

    shuffle(cards);
  }

  // функция, с помощью которой создается карта
  const createCard = (defaultCard, flippedCardIcon) => {
    const card = document.createElement('div');
    card.classList.add('game__card');

    // создание элементов для перевернутой и неперевернутой карты
    const notFlippedCard = document.createElement('i');
    const flippedCard = document.createElement('i');

    notFlippedCard.classList.add('fa', `fa-${defaultCard}`);
    flippedCard.classList.add('fa', `fa-${flippedCardIcon}`);

    card.append(flippedCard, notFlippedCard);

    return (card)
  }

  // функция, отвечающая за начало игры
  const startGame = (dificult) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;

    const gameSection = document.querySelector('.game__section-container');
    const gameTable = document.createElement('div');

    const cardsIconsArray = cardsArray(dificult);
    const duplicateCardsIcons = duplicateArray(cardsIconsArray);
    const restartButton = document.createElement('button');

    gameSection.innerHTML = '';
    restartButton.textContent = 'Играть заново';
    gameTable.classList.add('playing__field');
    restartButton.classList.add('restart__btn');

    //  слушатель для кнопки рестарта игры
    restartButton.addEventListener('click', getGameSectionMenu);

    shuffle(duplicateCardsIcons);

    duplicateCardsIcons.forEach(icon => gameTable.append(createCard('question-circle', icon)));

    gameSection.append(gameTable, restartButton);

    const cards = document.querySelectorAll('.game__card');

    //  условия для переворачивания карт
    cards.forEach((card, index) => card.addEventListener('click', () => {
      card.classList.add('flip');
      if (firstCard != null && secondCard != null) {
        if (cards[firstCard].firstElementChild.className === cards[secondCard].firstElementChild.className) {
          cards[firstCard].classList.add('flip');
          cards[secondCard].classList.add('flip');
          cards[firstCard].classList.add('successfully');
          cards[secondCard].classList.add('successfully');
          firstCard = null;
          secondCard = null;
        }
      }

      if (firstCard != null && secondCard != null) {
        cards[firstCard].classList.remove('flip');
        cards[secondCard].classList.remove('flip');
        clickable == true;
        firstCard = null;
        secondCard = null;
      }

      if (firstCard == null) {
        firstCard = index;
      } else {
        if (secondCard == null) {
          secondCard = index;
        }
      }


    }));

  };



  // функция, которая перемешивает массив с числами
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  cardsApp();
})();
