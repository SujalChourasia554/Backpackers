// Razorpay Payment Utility Functions
import { API_BASE_URL } from "./api";

/**
 * Load Razorpay SDK script
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Create Razorpay order on backend
 */
export const createPaymentOrder = async (orderData) => {
  const { totalBudget, itineraryId, packageName, customizations } = orderData;

  console.log("Creating order with amount:", totalBudget);

  const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: totalBudget,
      currency: "INR",
      itineraryId: itineraryId,
      packageName: packageName,
      customizations: customizations,
    }),
  });

  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Order created:", data);

  if (!data.success) {
    throw new Error(data.error || "Failed to create order");
  }

  return data.order;
};

/**
 * Verify payment on backend
 */
export const verifyPayment = async (paymentResponse) => {
  const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,
    }),
  });

  const result = await verifyResponse.json();

  if (!result.success) {
    throw new Error("Payment verification failed");
  }

  return result;
};

/**
 * Open Razorpay checkout modal
 */
export const openRazorpayCheckout = (options) => {
  if (!window.Razorpay) {
    throw new Error("Razorpay SDK not loaded");
  }

  const razorpay = new window.Razorpay(options);

  razorpay.on("payment.failed", function (response) {
    console.error("Payment Failed:", response.error);
    throw new Error(response.error.description);
  });

  razorpay.open();
};

/**
 * Main payment handler function
 */
export const initiatePayment = async ({
  totalBudget,
  itineraryId,
  packageData,
  customizedData,
  themeColor,
  onSuccess,
  onFailure,
  onDismiss,
}) => {
  try {
    // Step 1: Load Razorpay SDK
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error("Failed to load Razorpay SDK");
    }

    // Step 2: Create order on backend
    const order = await createPaymentOrder({
      totalBudget,
      itineraryId,
      packageName: packageData?.name,
      customizations: {
        hotel: customizedData?.hotel?.name || "Default",
        restaurant: customizedData?.restaurant?.name || "Default",
      },
    });

    // Step 3: Configure Razorpay options
    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Backpackers",
      description: `${packageData?.name || "Trip"} Package Booking`,
      order_id: order.id,

      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "+919999999999",
      },

      theme: {
        color: themeColor,
      },

      handler: async function (response) {
        try {
          // Verify payment
          await verifyPayment(response);
          onSuccess(response);
        } catch (error) {
          onFailure(error);
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment cancelled by user");
          onDismiss();
        },
      },
    };

    // Step 4: Open Razorpay checkout
    openRazorpayCheckout(options);
  } catch (error) {
    onFailure(error);
  }
};

