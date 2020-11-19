let productDocRef = db.collection("products").doc("product");

let colorIdValue = db.doc("products/color.id");
let brandIdValue = db.doc("products/brand.id");

let setProduct = productDocRef.set({
  id: "",
  name: "",
  imagesList: [],
  colorId: colorIdValue,
  description: "",
  brandId: brandIdValue,
  startingFrom: "",
  url: "",
  SKU: Number,
  slugName: ""
});
