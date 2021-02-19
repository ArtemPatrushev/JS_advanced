'use strict';

const URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

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

// Список товаров

class GoodsList {
    constructor() {
        this.goods = [];
    }
    // метод для заполнения списка
    getGoods(goods) {
        makeGETRequest(`${URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            callback();
        });
    }

    // вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку. 
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.img, good.product_name, good.price);
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
list.fetchGoods(() => {
    list.render();
    list.cost();
});





