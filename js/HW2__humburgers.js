'use strict';

class Hamburger {
    constructor(cheese = false, salad = false, spice = false) {
        this.cheese = cheese;
        this.spice = spice;
        this.salad = salad;
    }

    addCheese() {
        this.cheese = true;
    }

    removeCheese() {
        this.cheese = false;
    }

    addSalad() {
        this.salad = true;
    }

    removeSalad() {
        this.salad = false;
    }

    addSpice() {
        this.spice = true;
    }

    removeSpice() {
        this.spice = false;
    }

    getToppings() {
        const { cheese, spice, salad } = this;
        return `${cheese && 'сыр '}${spice && 'приправы '}${salad && 'салат'}`;
    }

    calculatePrice() {
        let price = 200;
        if (this.cheese) price += 20;
        if (this.salad) price += 40;
        if (this.spice) price += 35;
        return price;
    }

    calculateCalories() {
        let ccal = 500;
        if (this.cheese) ccal += 100;
        if (this.salad) ccal += 20;
        return ccal;
    }
}

class BigHamburger extends Hamburger {
    constructor(cheese, salad, potato, spice) {
        super(cheese, salad, potato, spice);
    }

    calculatePrice() {
        return super.calculatePrice() * 1.3;
    }

    calculateCalories() {
        return super.calculateCalories() * 1.4;
    }
}

const hamburgers = [
    new Hamburger(true, true),
    new BigHamburger(true, false, true),
];

console.log(`Стоимость мал. гамбургера: ${hamburgers[0].calculatePrice()}, калорийность: ${hamburgers[0].calculateCalories()}`);
console.log(`Стоимость бол. гамбургера: ${hamburgers[1].calculatePrice()}, калорийность: ${hamburgers[1].calculateCalories()}`);