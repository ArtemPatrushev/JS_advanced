BASE_URL = 'http://localhost:3000';


// очистка корзины
// quantity не отображается в разметке
// что-то типа allert
// есть много товара, он не весь показан, по кнопке - весь (это overflow?)


Vue.component('app-cart', {
    props: [
        'cartGoods',
    ],
    template: `<div class="products_block">
                    <div v-for="item in cartGoods">
                        <app-cart-item
                            v-bind:name="item.product_name"
                            v-bind:price="item.price"
                            v-bind:img="item.img"
                            v-bind:color="item.color"
                            v-bind:size="item.size"
                            v-bind:quantity="item.count"
                            @remove-from-cart="removeFromCart(item)"
                            @get-cost="getCost(item.price)">
                        </app-cart-item>
                    </div>
                </div>`,
    methods: {
        removeFromCart(item) {
            console.log(item);
            this.$emit('remove-from-cart', item);
        },
    },
})

Vue.component('app-cart-item', {
    props: ['name', 'price', 'quantity', 'img', 'color', 'size', 'cost'],
    template: `<div class="shopping_grid_row_product">
                    <div class="cart_product">
                        <img class="cart_img" :src="img" alt="photo">
                        <div class="cart_product_char">
                            <p class="cart_product_name">{{name}}</p>
                            <div class="cart_product_char_bottom">
                                <p class="cart_product_char_text">Color: <span>{{color}}</span></p>
                                <p class="cart_product_char_text">Size: <span>{{size}}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="product_information">
                        <div><span class="char_name">UNITY PRICE</span>
                            <p class="unity_price">$ {{price}}</p>
                        </div>
                        <div><span class="char_name">QUANTITY</span>
                            <p class="quantity">{{quantity}}</p>
                        </div>
                        <div><span class="char_name">SHIPPING</span>
                            <p class="shipping">FREE</p>
                        </div>
                        <div><span class="char_name">SUBTOTAL</span>
                            <p class="subtotal">{{price * quantity}}</p>
                        </div>
                        <div><span class="char_name">ACTION</span>
                            <div class="img_action" @click="removeFromCart"><img src="img/cart_product_action.jpg" alt="photo"></div>
                        </div>
                    </div>
                </div>`,
    methods: {
        removeFromCart() {
            this.$emit('remove-from-cart');
        },
    },
    mounted: () => {
        console.log('');
    },
})


Vue.component('goods-list', {
    props: [
        'goods',
    ],
    template: `<div class="goods-list-block">
                    <div v-if="goods.length" v-for="item in goods">
                        <app-goods-item
                        v-bind:name="item.product_name"
                        v-bind:price="item.price"
                        v-bind:img="item.img"
                        @add-to-cart="addToCart(item)">
                        </app-goods-item>
                    </div>
                    <div v-if="!goods.length">
                        <app-loader></app-loader>
                    </div>
                </div>`,
    methods: {
        addToCart(item) {
            this.$emit('add-to-cart', item);
        }
    },
});


Vue.component('app-loader', {
    template: `<div>
                    loading...
                </div>`,
})

Vue.component('app-goods-item', {
    props: ['name', 'price', 'img'],
    template: `<div class="product">
                    <div class="product_img">
                        <img :src="img" alt="photo">
                        <div class="back">
                            <button class="put" @click="addToCart"><img class="put-cart" src="img/cart_product.svg" alt="photo">Add to cart</button>
                        </div>
                    </div>
                    <div class="product_text">
                        <p class="product_text_top">
                            {{name}}
                        </p>
                        <p class="product_text_bottom">
                            $ {{price}}
                        </p>
                    </div>
                </div>`,
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        }
    },
    mounted: () => {
        console.log('');
    },
});



const app = new Vue({
    el: '#root',
    data: {
        goods: [],
        filteredGoods: [],
        searchGoods: '',
        cartGoods: [],
        filteredCartGoods: [],
        searchCartGoods: '',
        showCart: false,
        cost: 0,
        cartQuantity: 0,
        errorMessage: '',
    },
    methods: {

        cleanCart() {
            fetch(`${BASE_URL}/cart`, {
                method: 'DELETE',
            })
                .then(r => r.json())
                .then(r => {
                    this.cartGoods = r;
                    this.filteredCartGoods = this.cartGoods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },

        getCost() {
            let sum = 0;
            this.cartGoods.forEach(i => {
                sum += i.price * i.count;
            });
            this.cost = sum;
        },

        getGoods() {
            fetch(`${BASE_URL}/products`)
                .then(r => r.json())
                .then(r => {
                    this.goods = r;
                    this.filteredGoods = this.goods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },

        getCartGoods() {
            fetch(`${BASE_URL}/cart`)
                .then(r => r.json())
                .then(r => {
                    this.cartGoods = r;
                    this.filteredCartGoods = this.cartGoods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },

        filterGoods() {
            if (!this.goods.length) this.filteredGoods = [];
            if (!this.searchGoods) this.filteredGoods = this.goods;
            this.filteredGoods = this.goods.filter(i => i.product_name.toLowerCase().includes(this.searchGoods));
            console.log(this.goods);
        },

        filterCartGoods() {
            if (!this.cartGoods.length) this.filteredCartGoods = [];
            if (!this.searchCartGoods) this.filteredCartGoods = this.cartGoods;
            this.filteredCartGoods = this.cartGoods.filter(i => i.product_name.toLowerCase().includes(this.searchCartGoods));
            console.log(this.cartGoods);
        },

        addToCart(item) {
            fetch(`${BASE_URL}/cart`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({id: item.id_product})
            })
                .then(r => r.json())
                .then(r => {
                    this.cartGoods = r;
                    this.filterCartGoods();
                    // alert('Товар добавлен в корзину');
                })
                .catch(e => {
                    this.errorMessage = e;
                }); 
        },

        removeFromCart(item) {
            // http://localhost:3000/cart?id=3
            fetch(`${BASE_URL}/cart?id=${item?.id_product}`, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then(r => {
                    this.cartGoods = r;
                    this.filteredCartGoods = this.cartGoods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },

        toggleCart() {
            this.showCart = !this.showCart;
        },

    },
    mounted() {
        this.getGoods();
        this.getCartGoods();
    },
});

