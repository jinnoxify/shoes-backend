let quickStartWishlist = db => {
  let wishlistDocRef = db.collection("customers").doc("wishlist");

  let customerIdValue = db.doc("customers/customer.id");
  let productsIdValue = db.doc("products/product.id");

  let setWishlist = wishlistDocRef.set({
    productId: productsIdValue,
    customerId: customerIdValue,
    quantity: Number
  });
};
