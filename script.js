
   class GoodsItem {
     constructor(title, price, img) {
       this.title = title;
       this.price = price;
       this.img = img;
     }
     render() {
     return `<div class="goods-item"><h3>${this.title}</h3><div class="good_img"><img src="${this.img}"></div><p>Цена ${this.price}</p><div><button class='add-button'>Добавить</button></div></div>`;
     }
   }

   class GoodsList {
     constructor() {
       this.goods = [];
     }
     fetchGoods() {
       this.goods = [
        { title: 'Shirt', price: 150, img: 'image/shirt.jpg'},
          { title: 'Socks', price: 50, img: 'image/socks.jpg'},
          { title: 'Jacket', price: 350, img: 'image/jacket.jpg'},
          { title: 'Shoes', price: 250, img: 'image/shoes.jpg'},
       ];
     }
     render() {
       let listHtml = '';
       this.goods.forEach(good =>{
         const goodItem = new GoodsItem(good.title, good.price, good.img);
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
    list.fetchGoods();
    list.render();
    
    class GoodsBasket {
      constructor(){
        this.goods = [];
      }
      // Добавление товара в корзину
      addGoodsBasket() {

      }
      // Удаление товара из корзины 
      deleteGoodsBasket() {

      }
      // Сумма и количество товаров в корзине
      calcGoodsBasket() {

      }
    }

    class GoodsBasketItem extends GoodsItem {
      render() {

      }
    }