let providerDocRef = db.collection("products").doc("provider");

let setProvider = providerDocRef.set({
  id: "",
  name: "",
  urlBackend: "",
  url: ""
});
