const axios = require("axios");
const urlSlug = require("slug");
const brandModel = require("../products/shoesModel").Brand;
const shoesModel = require("../products/shoesModel").Shoes;
const variantShoesModel = require("../products/shoesModel").VariantShoes;
urlSlug.charmap["'"] = "";
const jobProductList = async () => {
  const BRANDLIST = await brandModel.find();
  const EASTBAY_URL = `https://www.eastbay.com/api/products/search`;
  let page = 0;
  let pages = 1;
  const PAGESIZE = 5000;
  const result = new Set();
  const productName = new Set();
  console.info("Get all product list");
  console.group();
  do {
    /* Get the queries for the endpoint */
    const response = await axios.get(EASTBAY_URL, {
      params: {
        query: "shoes",
        currentPage: page,
        pageSize: PAGESIZE,
      },
    });
    const {
      pagination: { totalPages },
      products,
    } = response.data;
    pages = totalPages;
    await Promise.all(
      (products || []).map(async (product) => {
        const { url, name } = product;
        try {
          if (!productName.has(name)) {
            productName.add(name);
            const PRODUCTURL = `https://www.eastbay.com/api/products/pdp/${url}`;
            result.add(PRODUCTURL);
          }
          // await Promise.all((variantOptions || []).map(async variantProduct => {
          //     const {
          //         sku
          //     } = variantProduct;
          //     result.add(`https://www.eastbay.com/api/products/pdp/${sku}`);
          // }));
        } catch (error) {
          console.log(error);
        }
      })
    );
    console.info(`Get product list ${page + 1} - ${pages}`);
    page += 1;
  } while (page < pages);
  console.groupEnd();
  console.info(`Get product information from ${result.size}`);
  console.group();
  const PRODUCTS = [];
  process.stdout.write(`  Product: ${0}/${result.size}`);
  /** TODO: DELETE tmpArray **/
  //const tmpArray = ["https://www.eastbay.com/api/products/pdp/53558611", "https://www.eastbay.com/api/products/pdp/24300657", "https://www.eastbay.com/api/products/pdp/55088062", "https://www.eastbay.com/api/products/pdp/D3463101", "https://www.eastbay.com/api/products/pdp/23498067", "https://www.eastbay.com/api/products/pdp/T5342007", "https://www.eastbay.com/api/products/pdp/54724066", "https://www.eastbay.com/api/products/pdp/52542087", "https://www.eastbay.com/api/products/pdp/D3463018", "https://www.eastbay.com/api/products/pdp/K5692600"]
  const DELAY = 500;
  const getProduct = async (url, indexProduct) => {
    return new Promise((resolve) =>
      setTimeout(async () => {
        try {
          const response = await axios.get(url);
          const product = response.data;
          /* define the product entity's attributes */
          const {
            id,
            brand,
            name,
            description,
            images,
            sellableUnits,
            variantAttributes,
          } = product;
          //Find the brand
          let brandModelData = await BRANDLIST.find((brandData) => {
            return brandData.name === brand.trim().toLowerCase();
          });
          //If brand does not exist, create one
          if (!brandModelData) {
            let brandModelData = await brandModel.create({
              name: brand.trim().toLowerCase(),
            });
          }
          // All images. Variants are the different images sizes for responsiveness
          const imagesList = new Set();
          await Promise.all(
            (images || []).map(async (variantProduct) => {
              const { variations } = variantProduct;
              /*Each variant consists on the format type and the url of the image. We only take formats equal to zoom,
					 and add the urls to our imageList */
              await Promise.all(
                (variations || []).map(async (variant) => {
                  const { format, url } = variant;
                  if (format === "zoom") {
                    imagesList.add(url);
                  }
                })
              );
            })
          );
          //Update shoes
          const slugName = urlSlug(name);
          const shoesModelData = await shoesModel.findOneAndUpdate(
            {
              slugName,
            },
            {
              brandId: brandModelData._id,
              name: name.trim().toLowerCase(),
              slugName,
              description: description,
              $addToSet: {
                photos: {
                  $each: [...imagesList],
                },
              },
            },
            {
              omitUndefined: true,
              upsert: true,
              new: true,
              lean: true,
            }
          );
          //Update variants
          await Promise.all(
            (sellableUnits || []).map(async (variantProduct) => {
              const { attributes, price } = variantProduct;
              // Find style and size of each variant and assign them to it if it exists
              const styleObject = (attributes || []).find((elem) => {
                return elem.type === "style";
              });
              const sizeObject = (attributes || []).find((elem) => {
                return elem.type === "size";
              });
              if (styleObject.id && styleObject.value && sizeObject.value) {
                const variantAttribute = (variantAttributes || []).find(
                  (elem) => {
                    return elem.code === styleObject.id;
                  }
                );
                if (variantAttribute) {
                  const imagesVariant = (images || []).find((img) => {
                    return img.code === styleObject.id;
                  });
                  let imageVariant = null;
                  if (imagesVariant && imagesVariant.variations) {
                    const imageVariantFound = (
                      imagesVariant.variations || []
                    ).find((img) => {
                      return img.format === "zoom";
                    });
                    // Find only images with format zoom and get the urls
                    if (imageVariantFound) {
                      imageVariant = imageVariantFound.url;
                    }
                  }
                  //create a list of all image variant
                  const imagesVariantList = [];
                  if (imageVariant) {
                    imagesVariantList.push(imageVariant);
                  }
                  //create the model of the shoes and assign the values according to the value and id
                  const shoesVariantModelData = await variantShoesModel.findOneAndUpdate(
                    {
                      name: styleObject.value,
                      shoesId: shoesModelData._id,
                    },
                    {
                      name: styleObject.value,
                      shoesId: shoesModelData._id,
                      $addToSet: {
                        photos: {
                          $each: [...imagesVariantList],
                        },
                      },
                    },
                    {
                      omitUndefined: true,
                      upsert: true,
                      new: true,
                      lean: true,
                    }
                  );
                  //prices
                  const urlPage = `https://www.eastbay.com/product/${slugName}/${variantAttribute.sku}.html`;
                  const bulkOptions = variantShoesModel.collection.initializeOrderedBulkOp();
                  bulkOptions
                    .find({
                      name: styleObject.value,
                      shoesId: shoesModelData._id,
                    })
                    .updateOne({
                      $pull: {
                        variations: {
                          market: "eastbay",
                          size: sizeObject.value,
                        },
                      },
                    });
                  bulkOptions
                    .find({
                      name: styleObject.value,
                      shoesId: shoesModelData._id,
                    })
                    .updateOne({
                      $addToSet: {
                        variations: {
                          $each: [
                            {
                              market: "eastbay",
                              size: sizeObject.value,
                              normalPrice: variantProduct.price.originalPrice,
                              price: variantProduct.price.value,
                              url: urlPage,
                            },
                          ],
                        },
                      },
                    });
                  await bulkOptions.execute();
                }
              }
            })
          );
        } catch (error) {
          console.error("Error ", url);
        }
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`  Product: ${indexProduct + 1}/${result.size}`);
        resolve();
      }, DELAY * (indexProduct + 1))
    );
  };
  // Cloud firestore config
  await Promise.all(
    Array.from(result).map(async (url, index) => {
      await getProduct(url, index);
    })
  );
  console.groupEnd();
  console.info("\n");
  return "Done";
};
const geProductsList = async (options = {}) => {
  jobProductList();
  return [];
};
module.exports = {
  geProductsList,
};
