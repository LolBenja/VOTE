import axios from "axios";
import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";

export const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "105.70",
          },
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,
        cancel_url: `${HOST}/cancel-order`,
      },
    };
    console.log("TITI", HOST)

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    console.log("TETE", PAYPAL_API_CLIENT, PAYPAL_API_SECRET)

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    console.log("TURE", PAYPAL_API, access_token)

    // make a request
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("LLEGO")

    return res.json(response.data);
  } catch (error) {
    console.log("TOTI")

    return res.status(500).json("Something goes wrong ");
  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );


    res.redirect("/payed.html");
  } catch (error) {
    console.log("TOTO")
    return res.status(500).json({ message: `Internal Server errordd${PAYPAL_API}` });
  }
};

export const cancelPayment = (req, res) => res.redirect("/");