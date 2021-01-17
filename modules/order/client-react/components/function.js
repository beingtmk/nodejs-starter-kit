// eslint-disable-next-line import/prefer-default-export
export function TotalPrice(cartArray) {
  var totalCartPrice = 0;
  cartArray &&
    cartArray.map(item => {
      totalCartPrice += item.cost * (item.orderOptions && item.orderOptions.quantity);
    });
  return totalCartPrice;
}
