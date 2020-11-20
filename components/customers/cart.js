let cartDocRef = db.collection("customers").doc("cart");

let customerIdValue = db.doc("customers/customer.id");
let productsIdValue = db.doc("products/product.id");

let setCart = cartDocRef.set({
  customerId: customerIdValue,
  productsId: productsIdValue,
});

export default setCart;
