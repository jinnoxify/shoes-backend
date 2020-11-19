const fetch = require("node-fetch");

// let uri =
//   "https://www.footlocker.com/api/products/search?query=mens%20shoes&pageSize=2021";

// fetch(uri)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => console.log(err));

const jobProductList = async () => {
  const BRANDLIST = await brandModel.find();
  const FOOTLOCKER_URL = `https://www.footlocker.com/api/products/search`;
  let page = 0;
  let pages = 1;
  const PAGESIZE = 5000;
  const result = new Set();
  const productName = new Set();
  console.info("Get all product list");
  console.group();
  do {
    const response = await axios.get(FOOTLOCKER_URL, {
      params: {
        query: "shoes",
        currentPage: page,
        pageSize: PAGESIZE
      }
    });
    const {
      pagination: { totalPages },
      products
    } = response.data;
    pages = totalPages;
    await Promise.all(
      (products || []).map(async product => {
        /***
        		object Example
        		{
		            "badges": {
		                "isNewProduct": false,
		                "isSale": false
		            },
		            "baseOptions": [
		                {
		                    "selected": {
		                        "mapEnable": false,
		                        "style": "Black/White/Anthracite"
		                    }
		                }
		            ],
		            "baseProduct": "310688",
		            "images": [
		                {
		                    "format": "large",
		                    "url": "https://images.footlocker.com/is/image/EBFL2/Q8154001?wid=300&hei=300&fmt=png-alpha",
		                    "altText": "Q8154001_large"
		                }
		            ],
		            "name": "Nike Alpha Menace Varsity 2 - Men's",
		            "originalPrice": {
		                "value": 75,
		                "formattedValue": "$75.00"
		            },
		            "price": {
		                "value": 75,
		                "formattedValue": "$75.00"
		            },
		            "sku": "Q8154001",
		            "url": "Q8154001",
		            "imageSku": "Q8154001",
		            "variantOptions": [ // OPTIONAL
		                {
		                    "images": [
		                        {
		                            "format": "small",
		                            "url": "https://images.footlocker.com/is/image/EBFL2/Q8154100?wid=100&hei=100&fmt=png-alpha",
		                            "altText": "Q8154100_small"
		                        }
		                    ],
		                    "sku": "Q8154100",
		                    "imageSku": "Q8154100"
		                },
		                {
		                    "images": [
		                        {
		                            "format": "small",
		                            "url": "https://images.footlocker.com/is/image/EBFL2/Q8154300?wid=100&hei=100&fmt=png-alpha",
		                            "altText": "Q8154300_small"
		                        }
		                    ],
		                    "sku": "Q8154300",
		                    "imageSku": "Q8154300"
		                },
		                {
		                    "images": [
		                        {
		                            "format": "small",
		                            "url": "https://images.footlocker.com/is/image/EBFL2/Q8154600?wid=100&hei=100&fmt=png-alpha",
		                            "altText": "Q8154600_small"
		                        }
		                    ],
		                    "sku": "Q8154600",
		                    "imageSku": "Q8154600"
		                },
		                {
		                    "images": [
		                        {
		                            "format": "small",
		                            "url": "https://images.footlocker.com/is/image/EBFL2/Q8154700?wid=100&hei=100&fmt=png-alpha",
		                            "altText": "Q8154700_small"
		                        }
		                    ],
		                    "sku": "Q8154700",
		                    "imageSku": "Q8154700"
		                },
		                {
		                    "images": [
		                        {
		                            "format": "small",
		                            "url": "https://images.footlocker.com/is/image/EBFL2/Q8154800?wid=100&hei=100&fmt=png-alpha",
		                            "altText": "Q8154800_small"
		                        }
		                    ],
		                    "sku": "Q8154800",
		                    "imageSku": "Q8154800"
		                }
		            ],
		            "isSaleProduct": false,
		            "isNewProduct": false,
		            "launchProduct": false
		        },
        	***/
        const { url, name } = product;
        try {
          if (!productName.has(name)) {
            productName.add(name);
            const PRODUCTURL = `https://www.footlocker.com/api/products/pdp/${url}`;
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
    return new Promise(resolve =>
      setTimeout(async () => {
        try {
          const response = await axios.get(url);
          const product = response.data;
          /***
		    		object Example
		    		{
					    "brand": "Jordan",
					    "categories": [{
					        "code": "200000",
					        "name": "Men's"
					    }, {
					        "code": "200005",
					        "name": "Shoes"
					    }, {
					        "code": "200010",
					        "name": "Basketball"
					    }, {
					        "code": "200011",
					        "name": "Casual"
					    }, {
					        "code": "200041",
					        "name": "Jordan"
					    }, {
					        "code": "400003",
					        "name": "Casual Basketball Sneakers"
					    }],
					    "description": "<p><strong>Go Low on MJ&rsquo;s #1 Sneaker</strong><br />Based on Michael Jordan&rsquo;s 1985 multicolor signature basketball shoe, the Jordan AJ 1 Low has a clean, classic look for casual wear. Constructed with a combination of leather and synthetic materials that offer durability and support, this casual sneaker will provide years of comfortable wear. An Air-Sole unit in the midsole provides superior cushioning while the outsole flex grooves promote full mobility and flexibility.<br /><br /><strong>Jordan AJ 1 Low features:</strong><br />&bull;Genuine leather or suede upper provides a premium look.<br />&bull;Toe box perforations promote cooling airflow.<br />&bull;Encapsulated Air-Sole&reg; unit provides lightweight cushioning.<br />&bull;Solid-rubber outsole ensures firm traction.</p>",
					    "dropShip": false,
					    "freeShipping": false,
					    "giftCosts": [50, 100, 150, 200, 250],
					    "images": [{
					        "code": "22393258",
					        "variations": [{
					            "altText": "53558611_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558611/cart/53558611.jpeg"
					        }, {
					            "altText": "53558611_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558611/small/53558611.jpeg"
					        }, {
					            "altText": "53558611_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558611/large/53558611.jpeg"
					        }, {
					            "altText": "53558611_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558611/large_wide/53558611.jpeg"
					        }, {
					            "altText": "53558611_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558611/zoom/53558611.jpeg"
					        }]
					    }, {
					        "code": "21869783",
					        "variations": [{
					            "altText": "53558127_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558127/cart/53558127.jpeg"
					        }, {
					            "altText": "53558127_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558127/small/53558127.jpeg"
					        }, {
					            "altText": "53558127_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558127/large/53558127.jpeg"
					        }, {
					            "altText": "53558127_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558127/large_wide/53558127.jpeg"
					        }, {
					            "altText": "53558127_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558127/zoom/53558127.jpeg"
					        }]
					    }, {
					        "code": "21869935",
					        "variations": [{
					            "altText": "53558113_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558113/cart/53558113.jpeg"
					        }, {
					            "altText": "53558113_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558113/small/53558113.jpeg"
					        }, {
					            "altText": "53558113_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558113/large/53558113.jpeg"
					        }, {
					            "altText": "53558113_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558113/large_wide/53558113.jpeg"
					        }, {
					            "altText": "53558113_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558113/zoom/53558113.jpeg"
					        }]
					    }, {
					        "code": "21870082",
					        "variations": [{
					            "altText": "53558116_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558116/cart/53558116.jpeg"
					        }, {
					            "altText": "53558116_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558116/small/53558116.jpeg"
					        }, {
					            "altText": "53558116_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558116/large/53558116.jpeg"
					        }, {
					            "altText": "53558116_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558116/large_wide/53558116.jpeg"
					        }, {
					            "altText": "53558116_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558116/zoom/53558116.jpeg"
					        }]
					    }, {
					        "code": "21976803",
					        "variations": [{
					            "altText": "53558125_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558125/cart/53558125.jpeg"
					        }, {
					            "altText": "53558125_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558125/small/53558125.jpeg"
					        }, {
					            "altText": "53558125_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558125/large/53558125.jpeg"
					        }, {
					            "altText": "53558125_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558125/large_wide/53558125.jpeg"
					        }, {
					            "altText": "53558125_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558125/zoom/53558125.jpeg"
					        }]
					    }, {
					        "code": "22003274",
					        "variations": [{
					            "altText": "Q9446400_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/Q9446400/cart/Q9446400.jpeg"
					        }, {
					            "altText": "Q9446400_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/Q9446400/small/Q9446400.jpeg"
					        }, {
					            "altText": "Q9446400_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/Q9446400/large/Q9446400.jpeg"
					        }, {
					            "altText": "Q9446400_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/Q9446400/large_wide/Q9446400.jpeg"
					        }, {
					            "altText": "Q9446400_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/Q9446400/zoom/Q9446400.jpeg"
					        }]
					    }, {
					        "code": "22024016",
					        "variations": [{
					            "altText": "Q9447700_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/Q9447700/cart/Q9447700.jpeg"
					        }, {
					            "altText": "Q9447700_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/Q9447700/small/Q9447700.jpeg"
					        }, {
					            "altText": "Q9447700_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/Q9447700/large/Q9447700.jpeg"
					        }, {
					            "altText": "Q9447700_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/Q9447700/large_wide/Q9447700.jpeg"
					        }, {
					            "altText": "Q9447700_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/Q9447700/zoom/Q9447700.jpeg"
					        }]
					    }, {
					        "code": "22059577",
					        "variations": [{
					            "altText": "53558128_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558128/cart/53558128.jpeg"
					        }, {
					            "altText": "53558128_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558128/small/53558128.jpeg"
					        }, {
					            "altText": "53558128_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558128/large/53558128.jpeg"
					        }, {
					            "altText": "53558128_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558128/large_wide/53558128.jpeg"
					        }, {
					            "altText": "53558128_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558128/zoom/53558128.jpeg"
					        }]
					    }, {
					        "code": "22263306",
					        "variations": [{
					            "altText": "53558604_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558604/cart/53558604.jpeg"
					        }, {
					            "altText": "53558604_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558604/small/53558604.jpeg"
					        }, {
					            "altText": "53558604_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558604/large/53558604.jpeg"
					        }, {
					            "altText": "53558604_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558604/large_wide/53558604.jpeg"
					        }, {
					            "altText": "53558604_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558604/zoom/53558604.jpeg"
					        }]
					    }, {
					        "code": "22349419",
					        "variations": [{
					            "altText": "53558301_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558301/cart/53558301.jpeg"
					        }, {
					            "altText": "53558301_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558301/small/53558301.jpeg"
					        }, {
					            "altText": "53558301_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558301/large/53558301.jpeg"
					        }, {
					            "altText": "53558301_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558301/large_wide/53558301.jpeg"
					        }, {
					            "altText": "53558301_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558301/zoom/53558301.jpeg"
					        }]
					    }, {
					        "code": "21869782",
					        "variations": [{
					            "altText": "53558119_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558119/cart/53558119.jpeg"
					        }, {
					            "altText": "53558119_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558119/small/53558119.jpeg"
					        }, {
					            "altText": "53558119_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558119/large/53558119.jpeg"
					        }, {
					            "altText": "53558119_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558119/large_wide/53558119.jpeg"
					        }, {
					            "altText": "53558119_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558119/zoom/53558119.jpeg"
					        }]
					    }, {
					        "code": "22402236",
					        "variations": [{
					            "altText": "53558130_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558130/cart/53558130.jpeg"
					        }, {
					            "altText": "53558130_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558130/small/53558130.jpeg"
					        }, {
					            "altText": "53558130_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558130/large/53558130.jpeg"
					        }, {
					            "altText": "53558130_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558130/large_wide/53558130.jpeg"
					        }, {
					            "altText": "53558130_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558130/zoom/53558130.jpeg"
					        }]
					    }, {
					        "code": "22402237",
					        "variations": [{
					            "altText": "53558501_cart",
					            "format": "cart",
					            "url": "https://images.footlocker.com/pi/53558501/cart/53558501.jpeg"
					        }, {
					            "altText": "53558501_small",
					            "format": "small",
					            "url": "https://images.footlocker.com/pi/53558501/small/53558501.jpeg"
					        }, {
					            "altText": "53558501_large",
					            "format": "large",
					            "url": "https://images.footlocker.com/pi/53558501/large/53558501.jpeg"
					        }, {
					            "altText": "53558501_large_wide",
					            "format": "large_wide",
					            "url": "https://images.footlocker.com/pi/53558501/large_wide/53558501.jpeg"
					        }, {
					            "altText": "53558501_zoom",
					            "format": "zoom",
					            "url": "https://images.footlocker.com/pi/53558501/zoom/53558501.jpeg"
					        }]
					    }],
					    "isNewProduct": false,
					    "isSaleProduct": false,
					    "modelNumber": "310445",
					    "name": "Jordan AJ 1 Low - Men's",
					    "sellableUnits": [{
					        "attributes": [{
					            "id": "22350634",
					            "type": "size",
					            "value": "07.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674590",
					        "code": "22350634",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22393187",
					            "type": "size",
					            "value": "07.5"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235297",
					        "code": "22393187",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22402026",
					            "type": "size",
					            "value": "07.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123846",
					        "code": "22402026",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402030",
					            "type": "size",
					            "value": "07.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402030",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21979123",
					            "type": "size",
					            "value": "08.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152247970",
					        "code": "21979123",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22351453",
					            "type": "size",
					            "value": "08.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674606",
					        "code": "22351453",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22403184",
					            "type": "size",
					            "value": "08.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123853",
					        "code": "22403184",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403189",
					            "type": "size",
					            "value": "08.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403189",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22163712",
					            "type": "size",
					            "value": "08.5"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152247987",
					        "code": "22163712",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22263836",
					            "type": "size",
					            "value": "08.5"
					        }, {
					            "id": "22263306",
					            "type": "style",
					            "value": "Noble Red/Black/White"
					        }],
					        "barCode": "193154674798",
					        "code": "22263836",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350972",
					            "type": "size",
					            "value": "08.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674613",
					        "code": "22350972",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22402349",
					            "type": "size",
					            "value": "08.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123860",
					        "code": "22402349",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402353",
					            "type": "size",
					            "value": "08.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402353",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22351454",
					            "type": "size",
					            "value": "09.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674620",
					        "code": "22351454",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22393188",
					            "type": "size",
					            "value": "09.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235327",
					        "code": "22393188",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": true,
					        "sizeAvailableInStoresMessage": "Ships to the 48 contiguous United States. This item is not eligible for rush shipping or delivery to PO boxes.",
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403185",
					            "type": "size",
					            "value": "09.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123877",
					        "code": "22403185",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402031",
					            "type": "size",
					            "value": "09.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402031",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22043065",
					            "type": "size",
					            "value": "09.5"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248007",
					        "code": "22043065",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350635",
					            "type": "size",
					            "value": "09.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674637",
					        "code": "22350635",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393354",
					            "type": "size",
					            "value": "09.5"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235334",
					        "code": "22393354",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": true,
					        "sizeAvailableInStoresMessage": "Ships to the 48 contiguous United States. This item is not eligible for rush shipping or delivery to PO boxes.",
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402027",
					            "type": "size",
					            "value": "09.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123884",
					        "code": "22402027",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403190",
					            "type": "size",
					            "value": "09.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403190",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21994460",
					            "type": "size",
					            "value": "10.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248014",
					        "code": "21994460",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350973",
					            "type": "size",
					            "value": "10.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674644",
					        "code": "22350973",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393266",
					            "type": "size",
					            "value": "10.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235341",
					        "code": "22393266",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": true,
					        "sizeAvailableInStoresMessage": "Ships to the 48 contiguous United States. This item is not eligible for rush shipping or delivery to PO boxes.",
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403186",
					            "type": "size",
					            "value": "10.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123891",
					        "code": "22403186",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402354",
					            "type": "size",
					            "value": "10.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402354",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22163254",
					            "type": "size",
					            "value": "10.5"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248021",
					        "code": "22163254",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350974",
					            "type": "size",
					            "value": "10.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674651",
					        "code": "22350974",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393425",
					            "type": "size",
					            "value": "10.5"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235358",
					        "code": "22393425",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": true,
					        "sizeAvailableInStoresMessage": "Ships to the 48 contiguous United States. This item is not eligible for rush shipping or delivery to PO boxes.",
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402028",
					            "type": "size",
					            "value": "10.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123907",
					        "code": "22402028",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403191",
					            "type": "size",
					            "value": "10.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403191",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21870297",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "21869782",
					            "type": "style",
					            "value": "White/Gum Yellow/Hyper Pink"
					        }],
					        "barCode": "193145215818",
					        "code": "21870297",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "21870003",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "21869783",
					            "type": "style",
					            "value": "Sail/Gym Red/University Gold/Black"
					        }],
					        "barCode": "192499458698",
					        "code": "21870003",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22163401",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248038",
					        "code": "22163401",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22023943",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22003274",
					            "type": "style",
					            "value": "Sport Royal/Black/White"
					        }],
					        "barCode": "193153548489",
					        "code": "22023943",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22059573",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22059577",
					            "type": "style",
					            "value": "White/Black/Starfish"
					        }],
					        "barCode": "193152248397",
					        "code": "22059573",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22351735",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674668",
					        "code": "22351735",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393355",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235365",
					        "code": "22393355",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22401901",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123914",
					        "code": "22401901",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403192",
					            "type": "size",
					            "value": "11.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403192",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22163402",
					            "type": "size",
					            "value": "11.5"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248045",
					        "code": "22163402",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350636",
					            "type": "size",
					            "value": "11.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674675",
					        "code": "22350636",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393267",
					            "type": "size",
					            "value": "11.5"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235372",
					        "code": "22393267",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22403187",
					            "type": "size",
					            "value": "11.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123921",
					        "code": "22403187",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402032",
					            "type": "size",
					            "value": "11.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402032",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21869842",
					            "type": "size",
					            "value": "12.0"
					        }, {
					            "id": "21869782",
					            "type": "style",
					            "value": "White/Gum Yellow/Hyper Pink"
					        }],
					        "barCode": "193145215832",
					        "code": "21869842",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22350975",
					            "type": "size",
					            "value": "12.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674682",
					        "code": "22350975",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393356",
					            "type": "size",
					            "value": "12.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235389",
					        "code": "22393356",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22401902",
					            "type": "size",
					            "value": "12.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123938",
					        "code": "22401902",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402355",
					            "type": "size",
					            "value": "12.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22402355",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22350637",
					            "type": "size",
					            "value": "12.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "code": "22350637",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402351",
					            "type": "size",
					            "value": "12.5"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "code": "22402351",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22403188",
					            "type": "size",
					            "value": "12.5"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "code": "22403188",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22401907",
					            "type": "size",
					            "value": "12.5"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22401907",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22163255",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248076",
					        "code": "22163255",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22059711",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "22059577",
					            "type": "style",
					            "value": "White/Black/Starfish"
					        }],
					        "barCode": "193152248434",
					        "code": "22059711",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22351455",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674705",
					        "code": "22351455",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22393189",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235402",
					        "code": "22393189",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22402029",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123952",
					        "code": "22402029",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22401908",
					            "type": "size",
					            "value": "13.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22401908",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22263713",
					            "type": "size",
					            "value": "14.0"
					        }, {
					            "id": "22263306",
					            "type": "style",
					            "value": "Noble Red/Black/White"
					        }],
					        "barCode": "193154674897",
					        "code": "22263713",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22351736",
					            "type": "size",
					            "value": "14.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674712",
					        "code": "22351736",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22394637",
					            "type": "size",
					            "value": "14.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235419",
					        "code": "22394637",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22401903",
					            "type": "size",
					            "value": "14.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123969",
					        "code": "22401903",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403193",
					            "type": "size",
					            "value": "14.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403193",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22163403",
					            "type": "size",
					            "value": "15.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "barCode": "193152248090",
					        "code": "22163403",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22393190",
					            "type": "size",
					            "value": "15.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "barCode": "193658235426",
					        "code": "22393190",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "22401904",
					            "type": "size",
					            "value": "15.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "barCode": "193658123976",
					        "code": "22401904",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402350",
					            "type": "size",
					            "value": "16.0"
					        }, {
					            "id": "22402236",
					            "type": "style",
					            "value": "White/White/White"
					        }],
					        "code": "22402350",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22403194",
					            "type": "size",
					            "value": "16.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22403194",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21869839",
					            "type": "size",
					            "value": "17.0"
					        }, {
					            "id": "21869783",
					            "type": "style",
					            "value": "Sail/Gym Red/University Gold/Black"
					        }],
					        "code": "21869839",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21870290",
					            "type": "size",
					            "value": "17.0"
					        }, {
					            "id": "21869935",
					            "type": "style",
					            "value": "White/Black/Mystic Green"
					        }],
					        "code": "21870290",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22350976",
					            "type": "size",
					            "value": "17.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "code": "22350976",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22401906",
					            "type": "size",
					            "value": "17.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "code": "22401906",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }, {
					        "attributes": [{
					            "id": "21870150",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "21869782",
					            "type": "style",
					            "value": "White/Gum Yellow/Hyper Pink"
					        }],
					        "code": "21870150",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21870006",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "21869783",
					            "type": "style",
					            "value": "Sail/Gym Red/University Gold/Black"
					        }],
					        "code": "21870006",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21869835",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "21869935",
					            "type": "style",
					            "value": "White/Black/Mystic Green"
					        }],
					        "code": "21869835",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "21869831",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "21870082",
					            "type": "style",
					            "value": "White/Black/Gym Red"
					        }],
					        "code": "21869831",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22179276",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "21976803",
					            "type": "style",
					            "value": "White/Black/Court Purple"
					        }],
					        "code": "22179276",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22023945",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22003274",
					            "type": "style",
					            "value": "Sport Royal/Black/White"
					        }],
					        "code": "22023945",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22024124",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22024016",
					            "type": "style",
					            "value": "Metallic Gold/Black/White"
					        }],
					        "barCode": "193153548755",
					        "code": "22024124",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22263714",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22263306",
					            "type": "style",
					            "value": "Noble Red/Black/White"
					        }],
					        "code": "22263714",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22350639",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "code": "22350639",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22402352",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22393258",
					            "type": "style",
					            "value": "Gym Red/Gym Red/White"
					        }],
					        "code": "22402352",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }, {
					        "attributes": [{
					            "id": "22401910",
					            "type": "size",
					            "value": "18.0"
					        }, {
					            "id": "22402237",
					            "type": "style",
					            "value": "Court Purple/White/Black"
					        }],
					        "code": "22401910",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "inStock"
					    }],
					    "sizeChartGridMap": [{
					        "label": "MEN'S SHOE SIZE",
					        "sizes": ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "15", "16", "17", "18"]
					    }, {
					        "label": "WOMEN'S SHOE SIZE",
					        "sizes": ["5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16", "N/A", "N/A", "N/A"]
					    }, {
					        "label": "EUROPEAN",
					        "sizes": ["36", "36.5", "37.5", "38", "38.5", "39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "45.5", "46", "47", "47.5", "48", "48.5", "49.5", "50.5", "51.5", "52.5"]
					    }, {
					        "label": "UK",
					        "sizes": ["3.5", "4", "4.5", "5", "5.5", "6", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "14", "15", "16", "17"]
					    }, {
					        "label": "JAPANESE",
					        "sizes": ["23", "23.5", "23.5", "24", "24", "24.5", "25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29", "29.5", "30", "30.5", "31", "31.5", "32", "33", "34", "35", "36"]
					    }],
					    "sizeChartImage": "sizing_blank.jpg",
					    "sizeChartTipTx": "Unfortunately, there is no international sizing standard. Sizes vary from country to country. Please use the tables above only as a guide to help you in ordering the correct size. Please note that all sizes, are listed and sold in US sizes.|<p>Women's shoes are made on a narrower last (the foot-shaped form used in making shoes) than men's. In addition, the heel on a woman's shoe is narrower than the forefoot width. Men's shoes have the same width at the forefoot and heel. The medium width for women's shoes is B, while the medium width for men's shoes is D.</p>\n<p>Women can wear men's shoes by converting their size to men's by subtracting 1.5 from their numeric size. For example, if you are a size 8 in women's, you would try a 6.5 in men's sizes. This is a loose conversion and doesn't change the difference in width and forefoot-to-heel ratios.</p>|If you still have questions about fit or sizing please contact Customer Service.|If your measurements fall between two sizes, choose the smaller size for a tighter fit or the larger size for a looser fit.",
					    "variantAttributes": [{
					        "code": "22393258",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "isSelected": true,
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558611",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "21869783",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558127",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "21869935",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558113",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "21870082",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558116",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "21976803",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558125",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22003274",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "Q9446400",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22024016",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "Q9447700",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22059577",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558128",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22263306",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558604",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22349419",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558301",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "21869782",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558119",
					        "skuExclusions": false,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22402236",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558130",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }, {
					        "code": "22402237",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558501",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }]
					}
		    	***/
          const {
            brand,
            name,
            description,
            images,
            sellableUnits,
            variantAttributes
          } = product;
          //Find the brand
          let brandModelData = await BRANDLIST.find(brandData => {
            return brandData.name === brand.trim().toLowerCase();
          });
          if (!brandModelData) {
            let brandModelData = await brandModel.create({
              name: brand.trim().toLowerCase()
            });
          }
          // All images
          const imagesList = new Set();
          await Promise.all(
            (images || []).map(async variantProduct => {
              const { variations } = variantProduct;
              await Promise.all(
                (variations || []).map(async variant => {
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
              slugName
            },
            {
              brandId: brandModelData._id,
              name: name.trim().toLowerCase(),
              slugName,
              description: description,
              $addToSet: {
                photos: {
                  $each: [...imagesList]
                }
              }
            },
            {
              omitUndefined: true,
              upsert: true,
              new: true,
              lean: true
            }
          );
          //Update variants
          await Promise.all(
            (sellableUnits || []).map(async variantProduct => {
              /***
                		{
					        "attributes": [{
					            "id": "22350634",
					            "type": "size",
					            "value": "07.5"
					        }, {
					            "id": "22349419",
					            "type": "style",
					            "value": "Pine Green/Black/White"
					        }],
					        "barCode": "193154674590",
					        "code": "22350634",
					        "isBackOrderable": false,
					        "isPreOrder": false,
					        "isRecaptchaOn": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "singleStoreInventory": false,
					        "sizeAvailableInStores": false,
					        "stockLevelStatus": "outOfStock"
					    }

					    ======
					    {
					        "code": "22402237",
					        "displayCountDownTimer": false,
					        "fitVariant": "truesize.gif",
					        "freeShipping": true,
					        "freeShippingMessage": "Free Shipping",
					        "launchProduct": false,
					        "mapEnable": false,
					        "price": {
					            "currencyIso": "USD",
					            "formattedOriginalPrice": "$90.00",
					            "formattedValue": "$90.00",
					            "originalPrice": 90,
					            "value": 90
					        },
					        "recaptchaOn": false,
					        "riskified": false,
					        "shipToAndFromStore": false,
					        "shippingRestrictionExists": false,
					        "sku": "53558501",
					        "skuExclusions": true,
					        "stockLevelStatus": "inStock",
					        "webOnlyLaunch": false,
					        "width": "Width - D - Medium"
					    }
                	***/
              const { attributes, price } = variantProduct;
              const styleObject = (attributes || []).find(elem => {
                return elem.type === "style";
              });
              const sizeObject = (attributes || []).find(elem => {
                return elem.type === "size";
              });
              if (styleObject.id && styleObject.value && sizeObject.value) {
                const variantAttribute = (variantAttributes || []).find(
                  elem => {
                    return elem.code === styleObject.id;
                  }
                );
                if (variantAttribute) {
                  const imagesVariant = (images || []).find(img => {
                    return img.code === styleObject.id;
                  });
                  let imageVariant = null;
                  if (imagesVariant && imagesVariant.variations) {
                    const imageVariantFound = (
                      imagesVariant.variations || []
                    ).find(img => {
                      return img.format === "zoom";
                    });
                    if (imageVariantFound) {
                      imageVariant = imageVariantFound.url;
                    }
                  }
                  const imagesVariantList = [];
                  if (imageVariant) {
                    imagesVariantList.push(imageVariant);
                  }
                  const shoesVariantModelData = await variantShoesModel.findOneAndUpdate(
                    {
                      name: styleObject.value,
                      shoesId: shoesModelData._id
                    },
                    {
                      name: styleObject.value,
                      shoesId: shoesModelData._id,
                      $addToSet: {
                        photos: {
                          $each: [...imagesVariantList]
                        }
                      }
                    },
                    {
                      omitUndefined: true,
                      upsert: true,
                      new: true,
                      lean: true
                    }
                  );
                  //prices
                  const urlPage = `https://www.footlocker.com/product/${slugName}/${variantAttribute.sku}.html`;
                  const bulkOptions = variantShoesModel.collection.initializeOrderedBulkOp();
                  bulkOptions
                    .find({
                      name: styleObject.value,
                      shoesId: shoesModelData._id
                    })
                    .updateOne({
                      $pull: {
                        variations: {
                          market: "footlocker",
                          size: sizeObject.value
                        }
                      }
                    });
                  bulkOptions
                    .find({
                      name: styleObject.value,
                      shoesId: shoesModelData._id
                    })
                    .updateOne({
                      $addToSet: {
                        variations: {
                          $each: [
                            {
                              market: "footlocker",
                              size: sizeObject.value,
                              normalPrice: variantProduct.price.originalPrice,
                              price: variantProduct.price.value,
                              url: urlPage
                            }
                          ]
                        }
                      }
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
  geProductsList
};
