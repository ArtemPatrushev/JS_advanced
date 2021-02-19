'use strict';

fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
    .then(response => response.json())
    .then(json => list.setGoods(json))
    .then(json => list.cost(json))
    .catch(err => alert(err));


// Товар

class GoodsItem {
    constructor(img, product_name, price) {
        this.img = img;
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="col-md-4 product_item_group">
                    <div class="product_item_img">
                        <img src="${this.img}" alt="photo">
                        <p class="product_name">
                            ${this.product_name}
                        </p>
                        <p class="product_cost">
                            $${this.price}
                        </p>
                        <button>
                            В корзину
                        </button>
                    </div>
                </div>`
    }
}

class CartGoodsItem {
    constructor(img, product_name, price) {
        this.img = img;
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="col-md-4 product_item_group">
                    <div class="product_item_img">
                        <img src="${this.img}" alt="photo">
                        <p class="product_name">
                            ${this.product_name}
                        </p>
                        <p class="product_cost">
                            $${this.price}
                        </p>
                        <button>
                            Удалить из корзины
                        </button>
                    </div>
                </div>`
    }
}

// Список товаров

class GoodsList {
    constructor() {
        this.goods = [];
    }
    // метод для заполнения списка
    setGoods(goods) {
        this.goods = goods; 
        this.render();
    }
    
    // вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку. 
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.img, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.product_item').innerHTML = listHtml;
        //здесь добавить addEventListener() для кнопок у каждого товара, а затем вызывать метод корзины add?
        const btns = document.querySelectorAll('button');
        btns.forEach((elem, i) => {
            elem.addEventListener('click', () => handleClick(this.goods[i]));
        });
    }

    cost() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });  
        document.querySelector('.product-sum').innerHTML = `Сумма всех товаров: $${sum}`;
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new CartGoodsItem(good.img, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        // const x = document.querySelector('.cart');
        document.querySelector('.cart').innerHTML = listHtml;
        document.querySelector('button').innerHTML = 'Удалить';

        // x.insertAdjacentHTML('afterbegin', good);
    }

    add(item) {
        this.goods.push(item);
    }

    remove(id) {
        this.goods = this.goods.filter((x) => x.id !== id);
    }

    show(predicat) {
        return this.goods.filter(predicat);
    }
}

const list = new GoodsList();
const cart = new Cart();

function handleClick(good) {
    cart.add(good);
    cart.render();
}


