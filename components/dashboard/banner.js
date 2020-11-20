let bannerDocRef = db.collection("dashboard").doc("banner");

let setBanner = bannerDocRef.set({
  photoLink: "",
  title: "",
  descriptionOne: "",
  descriptionTwo: "",
  link: "",
  isActive: Boolean,
  position: "",
});

export default setBanner;
