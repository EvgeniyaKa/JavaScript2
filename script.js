import module from './module';
const calc = module.calc;


Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item 
      v-for="good in goods" 
      :good="good" 
      :key="good.id_product"></goods-item>
    </div>`
});

Vue.component('goods-item', {
  props: ['good'],
template: `
  <div class="goods-item">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }} руб.</p>
    <button class="buy-btn" @click="$parent.$emit('add_product', good)">Добавить</button>
  </div>`
    }); 

    Vue.component('basket-products', {
      props: ['goods'],
      template: `
     <div class="basket-products">
  <basket-item
  v-for="good of goods"
  :good="good"
  :key="good.id_product"
  ></basket-item>
  </div>`
     });
  
    Vue.component('basket-item', {
      props: ['good'],
      template: `
          <div class="basket_item">
                <p>{{good.product_name}}: {{good.price * good.quantity}} руб.</p>
                <p>Количество:{{good.quantity}} шт.</p>
                <div class="basket-btn-block">
                    <button class="basket-btn"  @click="$parent.$emit('add_product', good)">+</button>
                    <button class="basket-btn" @click="$parent.$emit('rem_product', good)">-</button>
                    <button class="basket-btn" @click="$parent.$emit('del_product', good)">x</button>
                </div>
                
          </div>    
      `
    });
    
Vue.component('goods-search', {
  props: ['value'],
  template:`
  <input type="text" class="goods_search"
  v-bind:value="value"
  v-on:input="$emit('input', $event.target.value)">`
});    

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
         
          let xhr;

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
        makePOSTRequest(url, data, callback) {
          let xhr;

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
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

          xhr.send(data);
          xhr.send(JSON.stringify(data));
        
      },

        addGoodsBasket(good) {
          let idBasket = this.basketGoods.find(product => product.id_product === good.id_product);
          
          if (idBasket) {
            idBasket.quantity++;
            idBasket.totalPrice = idBasket.quantity * idBasket.price;
            
          }else {
            this.basketGoods.push(good);

            Vue.set(good, 'quantity', 1);
            Vue.set(good, 'totalPrice', good.price);
            
          }
          this.basketGoods.cartCount++;
          this.makePOSTRequest('/addToCart', idBasket);
       },

        removeGoodsBasket(good) {
          let idBasket = this.basketGoods.findIndex(product => product.id_product === good.id_product);
        
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
        this.makeGETRequest(`/catalogData`, (goods) => {
          this.goods = JSON.parse(goods);
          this.filteredGoods = JSON.parse(goods);
        });
      }
    });