'use strict';

const goods = [
    { title: 'T-shirt', price: 52.00, img: 'img/image_product1.png' },
    { title: 'Coat', price: 42.00, img: 'img/image_product2.png' },
    { title: 'Backpack', price: 62.00, img: 'img/image_product3.png' },
    { title: 'T-shirt', price: 72.00, img: 'img/image_product4.png' },
    { title: 'Hat', price: 82.00, img: 'img/image_product5.png' },
    { title: 'Bomber', price: 92.00, img: 'img/image_product6.png' },
    { title: 'Jacket', price: 32.00, img: 'img/image_product7.png' },
    { title: 'Jacket', price: 52.00, img: 'img/image_product8.png' },
];

const renderGoodsItem = ({ title, price, img }) => {
    return `<div class="col-md-4 product_item_group">
                <div class="product_item_img">
                    <img src="${img}" alt="photo">
                    <p class="product_name">
                        ${title}
                    </p>
                    <p class="product_cost">
                        $${price}
                    </p>
                    <button>
                        В корзину
                    </button>
                </div>
            </div>`
};

const renderGoodsList = () => {
    const goodsTemplates = goods.map(item => renderGoodsItem(item));
    document.querySelector('.product_item').innerHTML = goodsTemplates.join("");
}

renderGoodsList(goods);