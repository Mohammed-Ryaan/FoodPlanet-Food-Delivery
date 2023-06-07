import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/food-delivery-app-a85ec/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    // We are connection with server/routes/user.js file here
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });

    return res.data.data; // data : decodedValue
  } catch (err) {
    return null;
  }
};

export const updateCart = async (userId, cart) => {
  try {
    const res = await axios.post(`${baseURL}/api/cart/updateCart/${userId}`, {
      cart,
    });
    console.log(res.data);
    return res.data.cart;
  } catch (err) {
    console.log("Error : " + err);
    return null;
  }
};

export const getCart = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}/api/cart/getCart/${userId}`);
    //console.log(res.data.data);
    return await res.data.data;
  } catch (error) {
    console.log("Error : " + error);
    return null;
  }
};

export const clearCartInFB = async (userId) => {
  try {
    const res = await axios.delete(`${baseURL}/api/cart/clearCart/${userId}`);
    //console.log(res.data);
  } catch (error) {
    console.log("Error : " + error);
    return null;
  }
};

export const checkOut = async (userId, cart, resName) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/cart/create-checkout-session`,
      {
        cart,
        userId,
        resName,
      }
    );
    //console.log(res.data);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  } catch (error) {
    console.log(error);
  }
};

// add an item to cart
// add new items to the cart
export const addToCart = async (userId, item, restaurantId) => {
  try {
    const res = await axios.post(`${baseURL}/api/cart/addToCart/${userId}`, {
      item,
      restaurantId,
    });
    //console.log(res.data.data);
    //return res.data.data;
  } catch (error) {
    return null;
  }
};

export const removeFromCart = async (userId, item) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/cart/removeFromCart/${userId}`,
      {
        item,
      }
    );
    //console.log(res.data.data);
    //return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getOrders = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}/api/cart/orders/${userId}`);
    //console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderSts = async (orderId, sts, userId) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/cart/updateOrder/${orderId}`,
      null,
      { params: { sts: sts, userId: userId } }
    );

    return res.data.data;
  } catch (error) {
    return null;
  }
};

// export const getAllCartItems = async (user_id) => {
//   try {
//     const res = await axios.get(
//       `${baseURL}/api/products/getCartItems/${user_id}`
//     );
//     return res.data.data;
//   } catch (error) {
//     return null;
//   }
// };
