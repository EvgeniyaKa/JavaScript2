 const calc = () =>{
    return this.basketGoods.reduce((total, good) => total += good.price * good.quantity , 0);
  }
  export default {
    calc: calc
  };

