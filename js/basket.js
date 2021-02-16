'use strict';

class Item {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const goods = [
    new Item(1, 'Маска', 1200),
    new Item(2, 'Ковер', 20000),
    new Item(3, 'Вазелин', 100500),
];

class Good extends Item {
    constructor(id, name, price, img) {
        super(id, name, price);
        this.img = img;
    }
}

class Basket {
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item);
    }

    remove(id) {
        this.items = this.items.filter((x) => x.id !== id);
    }

    show(predicat) {
        return this.items.filter(predicat);
    }
}

const basket = new Basket();
goods.forEach((good) => basket.add(good));

console.log('Все товары с ценой > 5000:', basket.show((x) => x.price > 5000));

basket.add(new Good(4, 'Car', 1000505005, 'google.com'));

console.log('Все товары:', basket.items);

basket.remove(2);

console.log('Удалили 2 элемент:', basket.items);