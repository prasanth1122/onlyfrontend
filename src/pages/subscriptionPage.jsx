import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserSubscription } from "../store/redux/slices/userSubscription.jsx"; // Adjust the import path
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { lazy, Suspense } from "react";
import { toast } from "react-toastify"; // Import toast

// Lazy-load Navbar component
const Navbar = lazy(() => import("../components/navbar/navbar"));

// Lazy-load the FaCheckCircle icon
const LazyCheckCircleIcon = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaCheckCircle }))
);

import {
  createOrder,
  verifyPayment,
  createSubscription,
} from "../../Api/Api.js"; // Adjust the import path
import Sidebar from "../components/sidebar/sidebar.jsx";

const SubscriptionPage = () => {
  const dispatch = useDispatch();

  // Fetching subscription state from Redux store
  const { subscription } = useSelector((state) => state.subscriptionData);
  const { isSidebarOpen } = useGlobalContext();
  // Retrieve userId from localStorage
  const userId = localStorage.getItem("user");

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserSubscription(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

  const feature1 = [
    "Access to general articles",
    "Basic support",
    "1 user account",
  ];
  const feature2 = [
    "Access to general and premium articles",
    "Priority support",
    "5 user accounts",
  ];

  const handlePayment = async () => {
    const amount = 100 * 1; // Adjust based on your pricing logic

    try {
      const orderData = await createOrder(amount);
      toast.info("Order created. Proceeding to payment...");
      handlePaymentVerify(orderData);
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
    }
  };

  const handlePaymentVerify = async (orderData) => {
    const options = {
      key: "rzp_test_ZTBCgSo4BMBW4Y", // Replace with your actual Razorpay key
      amount: orderData.data.amount,
      currency: orderData.data.currency,
      name: "Devknus",
      description: "Test Mode",
      order_id: orderData.data.id, // Pass the order ID here
      handler: async (response) => {
        console.log("Payment Success Response", response);
        try {
          const verifyData = await verifyPayment({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });

          if (verifyData.success) {
            toast.success("Payment verified successfully!");

            // Create or update subscription on successful verification
            const subscriptionData = {
              userId,
              type: "premium", // Always "premium" for now as "basic" is free and "institutional" unavailable
              paymentStatus: "completed", // Payment is verified as completed
            };

            try {
              const result = await createSubscription(subscriptionData);
              toast.success("Subscription created/updated successfully!");

              // Refresh subscription details after creation
              dispatch(fetchUserSubscription(userId));
            } catch (subscriptionError) {
              toast.error("Failed to create/update subscription.");
            }
          } else {
            toast.error("Payment verification failed. Please try again.");
          }
        } catch (verificationError) {
          toast.error("Error verifying payment. Please contact support.");
        }
      },
      theme: {
        color: "#5f63b8",
      },
      modal: {
        ondismiss: () => {
          toast.warning("Payment modal dismissed!");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="w-full h-full flex flex-col items-center pb-4 justify-between  bg-gray-100 overflow-x-hidden lg:overflow-y-hidden  scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>
      <div className="w-mainWidth text-center mt-24">
        <div className="w-full bg-white p-2 rounded-lg flex flex-col md:flex-row items-start border-1 border-black-500 md:justify-between mb-2">
          <p className="text-lg font-bold">{subscription?.data.type}</p>
          <p>
            <span className="text-lg font-bold">Start Date: </span>
            {subscription?.data.startDate
              ? new Date(subscription?.data.startDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "N/A"}
          </p>
          <p>
            <span className="text-lg font-bold">End Date: </span>
            {subscription?.data.endDate
              ? new Date(subscription?.data.endDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "N/A"}
          </p>
          <p>
            <span className="text-lg font-bold">Status: </span>
            {subscription?.data.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <div className="w-mainWidth flex flex-col items-center gap-2 py-4 bg-white rounded-lg mt-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide mb-2">
          Choose Your Plan
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 p-4 text-black">
          <div
            className={`flex flex-col items-center justify-between rounded-xl p-8 shadow-xl transition-all duration-300 hover:scale-105  border-2 border-black relative`}
          >
            <h2 className="text-4xl font-bold text-important_text">Basic</h2>
            <p className="text-lg font-semibold mt-4">Free</p>
            <p className="text-lg mt-4 text-center">
              For individuals exploring our platform.
            </p>
            <ul className="mt-8 space-y-3 text-left">
              {feature1.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Suspense
                    fallback={
                      <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    }
                  >
                    <LazyCheckCircleIcon className="text-green-300 min-w-20" />
                  </Suspense>
                  {feature}
                </li>
              ))}
            </ul>
            <p className="px-4 py-2 bg-white rounded-xl mt-4 border-2 border-black">
              Access for All
            </p>
          </div>
          <div
            className={`flex flex-col items-center bg-terinary justify-between rounded-xl p-8 shadow-xl transition-all duration-300 hover:scale-105  border-2 border-black relative`}
          >
            <h2 className="text-3xl font-bold">Premium</h2>
            <p className="text-2xl font-semibold mt-4">10$/month</p>
            <p className="text-lg mt-4 text-center">
              For professionals who need more.
            </p>
            <ul className="mt-8 space-y-3 text-left">
              {feature2.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Suspense
                    fallback={
                      <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    }
                  >
                    <LazyCheckCircleIcon className="text-green-300 min-w-20" />
                  </Suspense>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 rounded-lg bg-secondary mt-4 font-bold text-white hover:shadow-cta_button_shadow"
              onClick={handlePayment}
            >
              Subscribe
            </button>
          </div>
          <div
            className={`flex flex-col items-center justify-between rounded-xl p-8 shadow-xl transition-all duration-300 hover:scale-105  border-2 border-black relative`}
          >
            <h2 className="text-3xl font-bold">Institutional</h2>
            <p className="text-2xl font-semibold mt-4">Verification Required</p>
            <p className="text-lg mt-4 text-center">
              For professionals exploring our platform.
            </p>
            <ul className="mt-8 space-y-3 text-left">
              <li className="flex items-center gap-2">
                <Suspense
                  fallback={
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  }
                >
                  <LazyCheckCircleIcon className="text-green-300 min-w-20" />
                </Suspense>
                Access to all content
              </li>
              <li className="flex items-center gap-2">
                <Suspense
                  fallback={
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  }
                >
                  <LazyCheckCircleIcon className="text-green-300 min-w-20" />
                </Suspense>
                Custom reports
              </li>
            </ul>
            <button className="px-4 py-2 rounded-lg bg-highlight_background mt-4">
              Not available
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
