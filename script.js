const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
   const app = new Vue({
      el: '#app',
      data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        searchLine: '',
        isVisibleCart: false,
        cartCount: 0,
      },
     
      methods: {
        makeGETRequest(url, callback) {
         
          var xhr;

          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
    
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              callback(xhr.responseText);
            }
          }
    
          xhr.open('GET', url, true);
          xhr.send();
        },

        addGoodsBasket(good) {
          let idBasket = this.basketGoods.find(product => product.id_product === good.id_product);
          console.log(idBasket);
          if (idBasket) {
            idBasket.quantity++;
            idBasket.totalPrice = idBasket.quantity * idBasket.price;
          }else {
            this.basketGoods.push(good);

            Vue.set(good, 'quantity', 1);
            Vue.set(good, 'totalPrice', good.price);
          }
          this.basketGoods.cartCount++;
       },

        removeGoodsBasket(good) {
          let idBasket = this.basketGoods.findIndex(product => product.id_product === good.id_product);
          console.log(idBasket);
          if (idBasket != -1) {
            if (this.basketGoods[idBasket].quantity > 1) {
                  this.basketGoods[idBasket].quantity--;   
                } else {
                  this.deleteGoodsBasket(good);
                }  
          }
        },

        calcGoodsBasket() {
          return this.basketGoods.reduce((total, good) => total += good.price * good.quantity , 0);
        },

        deleteGoodsBasket(good) {
          let idBasket = this.basketGoods.find(product => product.id_product === good.id_product);

          if (idBasket){
            this.basketGoods.splice(idBasket, 1);
          }
        },

        filterGoods() {
          this.filteredGoods = this.goods.filter(good =>
            good.product_name.includes(this.searchLine)
          );
        }
      },

      mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
        });
        this.filteredProducts = this.goods;
      }
    });

    Vue.component('goods-list', {
      props: ['goods'],
      template: `
        <div class="goods-list">
          <goods-item v-for="good in goods" :good="good"></goods-item>
        </div>
      `
    });

    Vue.component('goods-item', {
      props: ['good'],
    template: `
      <div class="goods-item" v-for="good in filteredGoods">
        <h3>{{ good.product_name }} </h3>
        <p>{{ good.price }} руб.</p>
        <button class="buy-btn" @click="addGoodsBasket(good)">Добавить</button>
      </div>`
        }); 