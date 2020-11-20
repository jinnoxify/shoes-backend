import setColor from "./color";

let categoryDocRef = db.collection("products").doc("category");

let setCategory = categoryDocRef.set({
  id: "",
  name: "",
});

export default setCategory;
