let orderStatusDocRef = db.collection("orders").doc("orderStatus");

let setOrderStatus = orderStatusDocRef.set({
  id: "",
  name: "",
});

export default setOrderStatus;
