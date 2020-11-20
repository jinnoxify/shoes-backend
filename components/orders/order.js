let orderDocRef = db.collection("orders").doc("order");

let orderStatusIdValue = db.doc("orders/orderStatus.id");
let addressIdValue = db.doc("customers/address.id");
let customerIdValue = db.doc("customers/customer.id");

let setOrder = orderDocRef.set({
  id: "",
  productsId: [],
  orderQuantity: Number,
  placedDate: Date,
  orderDeliveryDate: Date,
  orderPayment: Number,
  orderStatusId: orderStatusIdValue,
  addressId: addressIdValue,
  customerId: customerIdValue,
  mercadoPagoToken: "",
});

export default setOrder;
