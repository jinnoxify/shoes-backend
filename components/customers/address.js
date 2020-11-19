let addressDocRef = db.collection("customers").doc("address");

let addressIdValue = db.doc("customers/customer.id");
let stateIdValue = db.doc("general/state.id");
let stateIdValue = db.doc("general/state.id");

let setAddress = addressDocRef.set({
  id: "",
  addressLine1: "",
  addressLine2: "",
  cityId: cityIdValue,
  stateId: stateIdValue,
  customerId: customerIdValue
});
