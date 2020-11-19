let productSizeDocRef = db.collection("products").doc("productSize");

let providerIdValue = db.doc("products/provider.id");
let productIdValue = db.doc("products/product.id");

let setProductSize = productSizeDocRef.set({
  id: "",
  size: Number,
  cost: Number,
  isAvailable: Boolean,
  price: Number,
  providerId: providerIdValue,
  productId: productIdValue
});
