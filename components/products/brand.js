let brandDocRef = db.collection("products").doc("brand");

let setBrand = brandDocRef.set({
  id: "",
  name: ""
});
