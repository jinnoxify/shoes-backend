let colorDocRef = db.collection("products").doc("color");

let setColor = colorDocRef.set({
  id: "",
  name: "",
  hexcode: "",
});

export default setColor;
