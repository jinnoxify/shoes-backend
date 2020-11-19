const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const shoesSchema = new Schema(
  {
    slugName: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    description: {
      type: String,
      required: false
    },
    photos: [
      {
        type: String,
        required: true
      }
    ],
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const variantShoesSchema = new Schema(
  {
    shoesId: {
      type: Schema.Types.ObjectId,
      ref: "Shoes",
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    photos: [
      {
        type: String,
        required: true
      }
    ],
    variations: [
      {
        market: {
          type: String,
          trim: true,
          required: true,
          index: true
        },
        size: {
          type: String,
          trim: true,
          required: true,
          index: true
        },
        normalPrice: {
          type: Number,
          required: true,
          index: true
        },
        price: {
          type: Number,
          required: true,
          index: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = {
  Brand: model("Brand", brandSchema),
  Shoes: model("Shoes", shoesSchema),
  VariantShoes: model("MarketShoes", variantShoesSchema)
};
