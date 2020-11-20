let cityDocRef = db.collection("general").doc("city");

let stateIdValue = db.doc("general/state.id");

let setCity = cityDocRef.set({
  id: "",
  name: "",
  stateId: stateIdValue,
  latitude: Number,
  longitude: Number,
});

export default setCity;
