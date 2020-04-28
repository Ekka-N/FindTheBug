
// Выбор уровня сложности

const level = {
    easy:  document.getElementById('level-easy'),
    normal: document.getElementById('level-normal'),
    hard: document.getElementById('level-hard'),
    getNumber: function() {
        let numberOfCards = (this.easy.checked) ? 3 :
        (this.normal.checked) ? 6 :
        (this.hard.checked) ? 10 : 3;
        return numberOfCards;
    }
};

level.easy.checked = true; // простой уровень по умолчанию

level.easy.addEventListener('click', () => {
    const current = level.easy;
    if (current.checked) {
        level.normal.checked = false;
        level.hard.checked = false;

        deleteActive();
        const label = current.parentElement;
        const item = label.parentElement;
        item.classList.add('level__checked');
    }
})

level.normal.addEventListener('click', () => {
    const current = level.normal;
    if (current.checked) {
        level.easy.checked = false;
        level.hard.checked = false;

        deleteActive();
        const label = current.parentElement;
        const item = label.parentElement;
        item.classList.add('level__checked');
    }
})

level.hard.addEventListener('click', () => {
    const current = level.hard;
    if (current.checked) {
        level.normal.checked = false;
        level.easy.checked = false;
       
        deleteActive();
        const label = current.parentElement;
        const item = label.parentElement;
        item.classList.add('level__checked');
    }
})

// Работа с кнопкой "Начать игру"

const button = document.getElementById('button-start');
button.addEventListener('click', event => {
    const menu = document.getElementById('menu');
    const game = document.getElementById('game');
    const numberOfCards = level.getNumber();

    createCards(numberOfCards);
    menu.classList.add('none');
    game.classList.remove('none');

    const back = document.querySelectorAll('.card__item_over')
    createBug([...back]);

    const card = document.querySelectorAll('.card__wrap');
    const arrayOfCards = [...card];
    const isFront = true;

    flipCard(arrayOfCards, isFront);
})

// Создание игрового поля

 function createCards(numberOfCards) {
    const game = document.getElementById('game');
    for (let i = 0; i < numberOfCards; ++i) {
        const card = document.createElement('div');
        const cardWrap = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');

        card.classList.add('card');
        cardWrap.classList.add('card__wrap')
        front.classList.add('card__item_over');
        back.classList.add('card__item_front');

        game.append(card);
        card.append(cardWrap);
        cardWrap.append(front);
        cardWrap.append(back);
     }
    isHard(numberOfCards);
 }

 const isHard = (numberOfCards) => {
    if (numberOfCards > 6) {
        game.classList.add('cards_hard');
    } else {
        game.classList.remove('cards_hard');
    }
 }

// Добавление бага на рандомную карту

function createBug(cards) {
    const length = cards.length;
    const bug = Math.floor(Math.random() * length);

    for (let i = 0; i<length; ++i) {
        if (i == bug) {
            cards[i].classList.remove('card__item_over');
            cards[i].classList.add('card__item_bug');
        }
    }
}


// Добавление переворота карты по щелчку
function flipCard(arrayOfCards, isFront) {
    
    arrayOfCards.forEach((card) => {    
        card.classList.add('card__wrap_hover');
        card.addEventListener('click', event => {
            if (isFront) {
                card.classList.add('card_click');
                card.classList.remove('card__wrap_hover');
                isFront = false;
            } else {
                menu.classList.remove('none');
                game.classList.add('none');        
                isFront = true;
                deleteElements();
            }
        });
    })
}

// Удаление карт
function deleteElements() {
    const game = document.getElementById('game');
    while (game.firstChild) {
       game.removeChild(game.firstChild);
       console.log('CLICK');
    }
    
}
// Удаление выделения активного пункта меню 
function deleteActive() {
    const level = document.getElementById('level');
    const length = level.children.length;
    console.log(level);

    for (let i = 0; i<length; ++i) {
        let current = level.children[i];
        current.classList.remove('level__checked');
    }
   
}

// Прелоадер

window.onload = () => {
    const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
}