
const makeGETRequest = (url, callback) => {
  return new Promise((resolve, reject) => {

    let xhr;
       if (window.XMLHttpRequest) {
         xhr = new XMLHttpRequest();
       }else if (window.ActiveXObject) {
         xhr = new ActiveXObject("Microsoft.XMLHTTP");
       }
       
     xhr.open('GET', url, true);
     xhr.onload = () => resolve(callback(xhr.responseText));
     xhr.onerror = () => reject(xhr.statusText);
     xhr.send();
  });
}

   class GoodsItem {
     constructor(product_name, price) {
       this.product_name = product_name;
       this.price = price;
     }
     render() {
     return `<div class="goods-item"><h3>${this.product_name}</h3><p>Цена ${this.price}</p><div><button class='add-button'>Добавить</button></div></div>`;
     }
   }
   const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
   
   class GoodsList {
     constructor() {
       this.goods = [];
     }
     fetchGoods(cb) {
       makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
         this.goods = JSON.parse(goods);
         cb();
       })
     }
     render() {
       let listHtml = '';
       this.goods.forEach(good =>{
         const goodItem = new GoodsItem(good.product_name, good.price);
         listHtml += goodItem.render();
       });
       document.querySelector('.goods-list').innerHTML = listHtml;
     }
     sumGoodsAll() {
       let sumGoods = 0;
       this.goods.forEach((good) => {
         if(good.price !== undefined){
           sumGoods += good.price;
           console.log(sumGoods);
         }
       })
     }
   }

    const list = new GoodsList();
    list.fetchGoods(() => {
      list.render();
    });
    
    class GoodsBasketItem extends GoodsItem {
      render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>Цена ${this.price}</p></div>`;
      }
    }
    class GoodsBasket {
      constructor(){
        this.goods = [];
      }
      // Список товара в корзине
      getGoodsBasket(cb) {
        makeGETRequest(`${API_URL}/getBasket.json`, (goods) => {
          this.goods = JSON.parse(goods);
          cb();
         });
    }
    render() {
      let listHtml = '';
      this.goods.forEach(good =>{
        const goodBasketItem = new GoodsBasketItem(good.product_name, good.price);
        listHtml += goodBasketItem.render();
      });
      document.querySelector('.goodsBasket-list').innerHTML = listHtml;
    }
  }
    //   //Добавить товар в корзину
    //   addGoodsBasket() {

    //   }
    //   // Удаление товара из корзины 
    //   deleteGoodsBasket() {

    //   }
    //   // Сумма товаров в корзине
    //   calcGoodsBasket() {
   
    // }
    