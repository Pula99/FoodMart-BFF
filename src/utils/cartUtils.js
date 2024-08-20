

const mapProductIdsWithProductDetails = (products, cartItems) => {
  return cartItems.map((cartItem) => {
    const product = products.find(
      (product) => product.id == cartItem.productId
    );
    return { product, quantity: cartItem.quantity };
  });
};

const CartUtilis = {
  mapProductIdsWithProductDetails,
};

export default CartUtilis;
