const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

router.get("/", async (req, res) => {
  return res.send("Inside temp");
});

router.post("/updateCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const cart = req.body.cart;
  console.log(cart);
  try {
    const updatedCart = await db
      .collection("users")
      .doc(`/${userId}/`)
      .collection("cart")
      .doc("cart")
      .set({ cart });

    return res.status(200).send({ success: true, data: cart, userId: userId });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: `Error :${error}` });
  }
});

// get all the cartitems for that user
router.get("/getCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  try {
    const cartDocRef = db
      .collection("users")
      .doc(userId)
      .collection("cart")
      .doc("cart");
    const cartDoc = await cartDocRef.get();

    // Check if the document exists
    if (cartDoc.exists) {
      //console.log(cartDoc.data());
      return res
        .status(200)
        .send({ success: true, msg: "Success", data: cartDoc.data() });
    } else {
      console.log(`User with userId "${userId}" does not exist.`);
      return res.send({
        success: false,
        msg: `Error: User with userId "${userId}" does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: `Error: ${error}` });
  }
});

router.delete("/clearCart/:userId", async (req, res) => {
  const userId = req.params.userId;

  //return res.send(userId);

  try {
    const cartDocRef = db
      .collection("users")
      .doc(userId)
      .collection("cart")
      .doc("cart");

    await cartDocRef.delete();

    return res
      .status(200)
      .send({ success: true, message: "Cart deleted successfully" });
  } catch (error) {
    return res
      .status(200)
      .send({ success: false, message: `Error : ${error}` });
  }
});

router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const item = req.body.item;
  const newRestaurantId = req.body.restaurantId;
  //console.log(userId);
  //console.log(cart);
  //res.status(200).send(cart);
  try {
    const doc = await db
      .collection("users")
      .doc(userId)
      .collection("cart")
      .doc("cart")
      .get();
    if (doc.data()) {
      //console.log(doc.data());

      let existingCart = doc.data();

      console.log(existingCart);

      let cartItems = existingCart.cartItems;
      let quantity = existingCart.quantity;
      let restaurantId = existingCart.restaurantId;
      let total = existingCart.total;

      if (newRestaurantId !== restaurantId) {
        const deleteCart = await db
          .collection("users")
          .doc(userId)
          .collection("cart")
          .doc("cart")
          .delete()
          .then((x) => {
            console.log("Old Restaurant Data deleted");
          });

        const cart = {
          cartItems: [item],
          total: item?.price ? item?.price / 100 : item?.defaultPrice / 100,
          restaurantId: newRestaurantId,
          quantity: 1,
        };
        const addItems = await db
          .collection("users")
          .doc(userId)
          .collection("cart")
          .doc("cart")
          .set(cart);
        return res.status(200).send({ success: true, data: addItems });
      }

      restaurantId = newRestaurantId;
      quantity += 1;
      total += item?.price ? item?.price / 100 : item?.defaultPrice / 100;

      const index = cartItems.findIndex((i) => {
        return i?.id === item?.id;
      });

      if (index === -1) {
        cartItems.push(item);
      } else {
        //Item already exists in cart
        cartItems[index].inStock = cartItems[index].inStock + 1;
      }

      const cart = {
        cartItems: cartItems,
        total: total,
        restaurantId: restaurantId,
        quantity: quantity,
      };

      const updatedCart = await db
        .collection("users")
        .doc(userId)
        .collection("cart")
        .doc("cart")
        .set(cart);

      console.log("Updated");

      return res.status(200).send({ success: true, data: updatedCart });

      // const quantity = doc.data().quantity + 1;
      // const updatedItem = await db
      //   .collection("cartItems")
      //   .doc(`/${userId}/`)
      //   .collection("items")
      //   .doc(`/${productId}/`)
      //   .update({ quantity });
      // return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const cart = {
        cartItems: [item],
        total: item?.price ? item?.price / 100 : item?.defaultPrice / 100,
        restaurantId: newRestaurantId,
        quantity: 1,
      };
      const addItems = await db
        .collection("users")
        .doc(userId)
        .collection("cart")
        .doc("cart")
        .set(cart);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.status(200).send({ success: false, message: `Error : ${err}` });
  }
});

router.post("/removeFromCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const item = req.body.item;
  //console.log(userId);
  //console.log(cart);
  //res.status(200).send(cart);
  try {
    const doc = await db
      .collection("users")
      .doc(userId)
      .collection("cart")
      .doc("cart")
      .get();

    if (doc.data()) {
      //console.log(doc.data());

      let existingCart = doc.data();

      //console.log(existingCart);

      let cartItems = existingCart.cartItems;
      let quantity = existingCart.quantity;
      let restaurantId = existingCart.restaurantId;
      let total = existingCart.total;

      // restaurantId = newRestaurantId;
      // quantity += 1;
      // total += item?.price ? item?.price / 100 : item?.defaultPrice / 100;
      const index = cartItems.findIndex((i) => {
        return i.id === item?.id;
      });
      if (index === -1)
        return res
          .status(200)
          .send({ success: false, msg: "Item doesn't exist" });

      cartItems[index].inStock = cartItems[index].inStock - 1;
      if (cartItems[index]?.inStock === 0) {
        cartItems.splice(index, 1);
      }
      quantity--;
      total -= item?.price ? item.price / 100 : item.defaultPrice / 100;

      if (cartItems?.length === 0 || quantity === 0 || total === 0) {
        await db
          .collection("users")
          .doc(userId)
          .collection("cart")
          .doc("cart")
          .delete()
          .then((x) => {
            console.log("Cart is Empty Now");
          });
        return res
          .status(200)
          .send({ success: "true", msg: "Cart is Empty Now" });
      }

      const cart = {
        cartItems: cartItems,
        total: total,
        restaurantId: restaurantId,
        quantity: quantity,
      };

      const updatedCart = await db
        .collection("users")
        .doc(userId)
        .collection("cart")
        .doc("cart")
        .set(cart);

      console.log("Updated");

      return res.status(200).send({ success: true, data: updatedCart });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "Data is not present" });
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.status(200).send({ success: false, message: `Error : ${err}` });
  }
});

// STRIPE API

router.post("/create-checkout-session", async (req, res) => {
  const cart = req.body.cart;

  const userId = req.body.userId;

  const resName = req.body.resName;
  const totalPrice = cart.total;

  const necessaryCart = cart.cartItems.map((item) => {
    return {
      name: item.name,
      price: item.price ? item.price : item.defaultPrice,
      inStock: item.inStock,
    };
  });

  console.log("Im here");
  //console.log(necessaryCart);

  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      cart: JSON.stringify(necessaryCart),
      resName: resName,
      total: totalPrice,
    },
  });

  const line_items = cart.cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.inStock,
    };
  });

  //console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 5000, currency: "inr" },
          display_name: "Delivery Charges",
          delivery_estimate: {
            minimum: { unit: "hour", value: 1 },
            maximum: { unit: "hour", value: 2 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkOutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
});

let endpointSecret;
//endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    console.log("Inside webhook");
    if (endpointSecret) {
      console.log("Inside webhook endpoint");
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }
    // Handle the event
    if (eventType === "checkout.session.completed") {
      console.log("Did I reach here");
      stripe.customers.retrieve(data.customer).then((customer) => {
        console.log("Customer Details : ", customer);
        console.log("Data : ", data);
        createOrder(customer, data, res);
      });
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.userId,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      restaurantName: customer.metadata.resName,
      sts: "preparing",
    };

    await db
      .collection("users")
      .doc(customer.metadata.userId)
      .collection("orders")
      .doc(`/${orderId}/`)
      .set(data);

    deleteCart(customer.metadata.userId);

    console.log("*****************************************");
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId) => {
  await db
    .collection("users")
    .doc(userId)
    .collection("cart")
    .doc("cart")
    .delete()
    .then((x) => {
      console.log("Cart is Empty Now");
    });
};

//   // orders
//   const userId = req.params.userId;
//   console.log("Inside orders");
//   (async () => {
//     try {
//       console.log("Inside try");
//       let query = await db.collection("users").doc(userId).collection("orders");
//       //console.log(query);
//       let response = [];
//       await query.get().then((querysnap) => {
//         querysnap.forEach((doc) => {
//           response.push({ ...doc.data() });
//           console.log(doc);
//         });
//         console.log(response);
//         return response;
//       });
//       return res.status(200).send({ success: true, data: response });
//     } catch (err) {
//       return res.send({ success: false, msg: `Error :${err}` });
//     }
//   })();
// });

router.get("/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("Inside orders ", userId);

  try {
    let querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("orders")
      .get();

    let response = [];

    querySnapshot.forEach((doc) => {
      response.push(doc.data());
      console.log(doc.data());
    });

    //  console.log(response);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

// update the order status
router.post("/updateOrder/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const sts = req.query.sts;
  const userId = req.query.userId;

  try {
    const updatedItem = await db
      .collection("users")
      .doc(userId)
      .collection("orders")
      .doc(`/${orderId}/`)
      .update({ sts });
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (error) {
    return res.send({ success: false, msg: `Error ,${error}` });
  }
});

module.exports = router;
