BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



// корзина не рендерится



Vue.component('app-cart', {
    props: [
        'cartGoods',
    ],
    template: `<div class="cart">
                    <div class="product_item_group" v-for="item in cartGoods">
                        <app-cart-item 
                            v-bind:name="item.product_name" 
                            v-bind:price="item.price"
                            v-bind:quantity="item.quantity"
                            @remove-from-cart="removeFromCart(item)">
                        </app-cart-item>
                    </div>
                </div>`,
    methods: {
        removeFromCart(item) {
            console.log(item);
            this.$emit('remove-from-cart', item);
        }
    },
})

Vue.component('app-cart-item', {
    props: ['name', 'price', 'quantity'],
    template: `
                        <div class="product_item_img">
                            <img alt="photo">
                            <p class="product_name">
                                {{name}}
                            </p>
                            <p class="product_cost">
                                {{price}} р
                            </p>
                            <p>Количество товара {{quantity}}</p>
                            <button @click="removeFromCart">
                                Удалить из корзины
                            </button>
                        </div>`,
    methods: {
        removeFromCart() {
            this.$emit('remove-from-cart');
        }
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
                    <div class="product_item_group" v-for="item in goods">
                        <div v-if="goods.length">
                            <app-goods-item 
                            v-bind:name="item.product_name" 
                            v-bind:price="item.price"
                            @add-to-cart="addToCart(item)"> 
                            </app-goods-item>
                        </div>
                        <div v-if="!goods.length">
                            <app-loader></app-loader>
                        </div>
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
    props: ['name', 'price'],
    template: `<div class="product_item_img">
                    <img src="${this.img}" alt="photo">
                    <p class="product_name">
                        {{name}}
                    </p>
                    <p class="product_cost">
                        {{price}} р
                    </p>
                    <button @click="addToCart">
                        В корзину
                    </button>
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
        errorMessage: '',
    },
    methods: {

        cleanCart() {
            this.cartGoods = [];
            this.filteredCartGoods = [];
        },

        getCost() {
            let sum = 0;
            this.cartGoods.forEach(i => {
                sum += i.price * i.quantity;
            });
            this.cost = sum;
        },

        getGoods() {
            fetch(`${BASE_URL}/catalogData.json`)
                .then(r => r.json())
                .then(r => {
                    this.goods = r;
                    this.filteredGoods = this.goods;
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
            console.log(item);
            let existant = false;
            for (const goodsItem of this.cartGoods) {
                if (goodsItem.id_product === item.id_product) {
                    existant = true;
                    goodsItem.quantity += 1;
                }
            }
            if (!existant) {
                this.cartGoods.push({ ...item, quantity: 1 })
            }
            this.filterCartGoods();
            console.log(this.cartGoods);
        },

        removeFromCart(item) {
            const index = this.cartGoods.findIndex(x => x.id_product === item.id_product);
            if (this.cartGoods[index].quantity > 1) {
                this.cartGoods[index].quantity--;
            } else {
                this.cartGoods = this.cartGoods.filter(x => x.id_product !== item.id_product);
            }
            this.filterCartGoods();
        },

        toggleCart() {
            this.showCart = !this.showCart;
        },

    },
    mounted() {
        this.getGoods();
    },
});

