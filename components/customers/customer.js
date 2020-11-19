let quickStartCustomer = db => {
  let customerDocRef = db.collection("customers").doc("customer");

  let cityIdValue = db.doc("general/city.id");

  let setCustomer = customerDocRef.set({
    id: "",
    name: "",
    email: "",
    occupation: "",
    sex: "",
    wishlist: "",
    photo: "",
    preferences: [],
    birthDate: Date,
    gmailId: "",
    facebookId: "",
    phone: Number,
    cityId: cityIdValue,
    country: "",
    isActive: Boolean
  });
};

export default quickStartCustomer;
