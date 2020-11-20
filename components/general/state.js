let stateDocRef = db.collection("general").doc("state");

let setState = stateDocRef.set({
  id: "",
  name: "",
});

export default setState;
