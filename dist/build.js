!function(t){var e={};function o(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);Vue.component("goods-list",{props:["goods"],template:'\n    <div class="goods-list">\n      <goods-item \n      v-for="good in goods" \n      :good="good" \n      :key="good.id_product"></goods-item>\n    </div>'}),Vue.component("goods-item",{props:["good"],template:'\n  <div class="goods-item">\n    <h3>{{ good.product_name }}</h3>\n    <p>{{ good.price }} руб.</p>\n    <button class="buy-btn" @click="$parent.$emit(\'add_product\', good)">Добавить</button>\n  </div>'}),Vue.component("basket-products",{props:["goods"],template:'\n     <div class="basket-products">\n  <basket-item\n  v-for="good of goods"\n  :good="good"\n  :key="good.id_product"\n  ></basket-item>\n  </div>'}),Vue.component("basket-item",{props:["good"],template:'\n          <div class="basket_item">\n                <p>{{good.product_name}}: {{good.price * good.quantity}} руб.</p>\n                <p>Количество:{{good.quantity}} шт.</p>\n                <div class="basket-btn-block">\n                    <button class="basket-btn"  @click="$parent.$emit(\'add_product\', good)">+</button>\n                    <button class="basket-btn" @click="$parent.$emit(\'rem_product\', good)">-</button>\n                    <button class="basket-btn" @click="$parent.$emit(\'del_product\', good)">x</button>\n                </div>\n                \n          </div>    \n      '}),Vue.component("goods-search",{props:["value"],template:'\n  <input type="text" class="goods_search"\n  v-bind:value="value"\n  v-on:input="$emit(\'input\', $event.target.value)">'});new Vue({el:"#app",data:{goods:[],filteredGoods:[],basketGoods:[],searchLine:"",isVisibleCart:!1,cartCount:0},methods:{makeGETRequest(t,e){let o;window.XMLHttpRequest?o=new XMLHttpRequest:window.ActiveXObject&&(o=new ActiveXObject("Microsoft.XMLHTTP")),o.onreadystatechange=function(){4===o.readyState&&e(o.responseText)},o.open("GET",t,!0),o.send()},makePOSTRequest(t,e,o){let n;window.XMLHttpRequest?n=new XMLHttpRequest:window.ActiveXObject&&(n=new ActiveXObject("Microsoft.XMLHTTP")),n.onreadystatechange=function(){4===n.readyState&&o(n.responseText)},n.open("POST",t,!0),n.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.send(e),n.send(JSON.stringify(e))},addGoodsBasket(t){let e=this.basketGoods.find(e=>e.id_product===t.id_product);e?(e.quantity++,e.totalPrice=e.quantity*e.price):(this.basketGoods.push(t),Vue.set(t,"quantity",1),Vue.set(t,"totalPrice",t.price)),this.basketGoods.cartCount++,this.makePOSTRequest("/addToCart",e)},removeGoodsBasket(t){let e=this.basketGoods.findIndex(e=>e.id_product===t.id_product);-1!=e&&(this.basketGoods[e].quantity>1?this.basketGoods[e].quantity--:this.deleteGoodsBasket(t))},calcGoodsBasket(){return this.basketGoods.reduce((t,e)=>t+e.price*e.quantity,0)},deleteGoodsBasket(t){let e=this.basketGoods.find(e=>e.id_product===t.id_product);e&&this.basketGoods.splice(e,1)},filterGoods(){this.filteredGoods=this.goods.filter(t=>t.product_name.includes(this.searchLine))}},mounted(){this.makeGETRequest("/catalogData",t=>{this.goods=JSON.parse(t),this.filteredGoods=JSON.parse(t)})}})}]);