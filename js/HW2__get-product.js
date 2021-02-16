'use strict';


// Добавьте пустые классы для Корзины товаров и Элемента корзины товаров.Продумайте, какие методы понадобятся для работы с этими сущностями.

// Товар

class GoodsItem {
    constructor(img, title, price) {
        this.img = img;
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="col-md-4 product_item_group">
                    <div class="product_item_img">
                        <img src="${this.img}" alt="photo">
                        <p class="product_name">
                            ${this.title}
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

// Список товаров

class GoodsList {
    constructor() {
        this.goods = [];
    }
    // метод для заполнения списка
    fetchGoods() {
        this.goods = [
            { title: 'T-shirt', price: 52.00, img: 'img/image_product1.png' },
            { title: 'Coat', price: 42.00, img: 'img/image_product2.png' },
            { title: 'Backpack', price: 62.00, img: 'img/image_product3.png' },
            { title: 'T-shirt', price: 72.00, img: 'img/image_product4.png' },
            { title: 'Hat', price: 82.00, img: 'img/image_product5.png' },
            { title: 'Bomber', price: 92.00, img: 'img/image_product6.png' },
            { title: 'Jacket', price: 32.00, img: 'img/image_product7.png' },
            { title: 'Jacket', price: 52.00, img: 'img/image_product8.png' },
        ];
    }
    // вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку. 
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.img, good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.product_item').innerHTML = listHtml;
    }

    cost() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        document.querySelector('.product-sum').innerHTML = `Сумма всех товаров: $${sum}`;
    }
}

// чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод fetchGoods, чтобы записать список товаров в свойство goods, и вызвать render().

const list = new GoodsList();
list.fetchGoods();
list.render();
list.cost();




