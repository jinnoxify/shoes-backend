let categoryDocRef = db.collection("products").doc("category");

let setCategory = categoryDocRef.set({
  id: "",
  name: ""
});
