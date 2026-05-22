"use client";

import { submitManualPayment } from "@/src/hook/useOrder";
import { cartClear } from "@/src/redux/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


export default function ManualPaymentForm({ order, selectedManualMethod, manualMethods, setManualOrderStep }) {
  const [paymentInfo, setPaymentInfo] = useState({ senderNumber: "", transactionId: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();


  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const isValidBDPhone = (phone) => /^01[3-9]\d{8}$/.test(phone);

  const handleSubmitPayment = async () => {
    // Frontend Validation
    if (!paymentInfo.senderNumber || !paymentInfo.transactionId) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦° à¦à¦¬à¦‚ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦‰à¦­à¦¯à¦¼à¦‡ à¦¦à¦¿à¦¨");
      return;
    }
    if (paymentInfo.transactionId.length < 6) {
      toast.error("à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦•à¦®à¦ªà¦•à§à¦·à§‡ à§¬ à¦…à¦•à§à¦·à¦°à§‡à¦° à¦¹à¦¤à§‡ à¦¹à¦¬à§‡");
      return;
    }
    if (!isValidBDPhone(paymentInfo.senderNumber)) {
      toast.error("à¦¸à¦ à¦¿à¦• à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶à¦¿ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦¦à¦¿à¦¨ (01XXXXXXXXX) à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¨à¦®à§à¦¬à¦°à§‡à¦° à¦œà¦¨à§à¦¯");
      return;
    }
    if (!selectedManualMethod) {
      toast.error("à¦…à¦¨à§à¦—à§à¦°à¦¹ à¦•à¦°à§‡ à¦à¦•à¦Ÿà¦¿ à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦ªà¦¦à§à¦§à¦¤à¦¿ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨");
      return;
    }

    try {
      setIsSubmitting(true);

      const manualPaymentPayload = {
        orderId: order._id,
        provider: selectedManualMethod,
        senderNumber: paymentInfo.senderNumber,
        transactionId: paymentInfo.transactionId,
        paidFor: order.payment_type || "full", // Use order's payment_type, default to full
      };

      console.log("Submitting manual payment with payload:", manualPaymentPayload);
      await submitManualPayment(manualPaymentPayload);

      toast.success(
        `à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦œà¦®à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡à¥¤ à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨à§‡à¦° à¦•à¦¨à¦«à¦¾à¦°à§à¦®à§‡à¦¶à¦¨à§‡à¦° à¦…à¦ªà§‡à¦•à§à¦·à¦¾à¦¯à¦¼ à¦†à¦›à§‡à¥¤`
      );

      // Clear cart and update step
      dispatch(cartClear());
      setManualOrderStep('payment_submitted');

    } catch (err) {
      console.error("Manual payment submission error:", err);
      const msg = err?.response?.data?.message || err?.message || "à¦®à§à¦¯à¦¾à¦¨à§à¦¯à¦¼à¦¾à¦² à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦œà¦®à¦¾ à¦¦à¦¿à¦¤à§‡ à¦¬à§à¦¯à¦°à§à¦¥ à¦¹à¦¯à¦¼à§‡à¦›à§‡";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800 text-lg">à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿà§‡à¦° à¦¤à¦¥à§à¦¯ à¦œà¦®à¦¾ à¦¦à¦¿à¦¨</h3>
      <p className="text-sm text-gray-700">
        à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦•à¦°à¦¾à¦° à¦ªà¦°, à¦¨à¦¿à¦šà§‡à¦° à¦«à¦°à§à¦®à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° à¦à¦¬à¦‚ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ (Transaction ID) à¦œà¦®à¦¾ à¦¦à¦¿à¦¨à¥¤
      </p>

      {/* Manual Methods Display */}
      {selectedManualMethod && (
        <div className="bg-gray-100 p-3 rounded-lg text-sm border border-gray-200">
          <p className="font-semibold">{manualMethods.find(m => m.id === selectedManualMethod)?.name}:{' '}
            <span className="font-bold text-green-600">{manualMethods.find(m => m.id === selectedManualMethod)?.number}</span>
          </p>
          <p className="text-xs text-gray-500">Amount to send: à§³{order?.totalAmt?.toLocaleString()}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="à¦†à¦ªà¦¨à¦¾à¦° à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦¨à¦®à§à¦¬à¦° (à¦¯à§‡à¦‡ à¦¨à¦®à§à¦¬à¦° à¦¥à§‡à¦•à§‡ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦•à¦°à§‡à¦›à§‡à¦¨)"
        value={paymentInfo.senderNumber}
        onChange={(e) => handlePaymentInfoChange('senderNumber', e.target.value)}
        className="w-full px-3 py-2 border rounded-xl"
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="à¦Ÿà§à¦°à¦¾à¦¨à¦œà§à¦¯à¦¾à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ (Transaction ID)"
        value={paymentInfo.transactionId}
        onChange={(e) => handlePaymentInfoChange('transactionId', e.target.value)}
        className="w-full px-3 py-2 border rounded-xl"
        disabled={isSubmitting}
      />

      <button
        onClick={handleSubmitPayment}
        disabled={isSubmitting || !selectedManualMethod}
        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
      >
        {isSubmitting ? 'à¦œà¦®à¦¾ à¦¦à§‡à¦“à¦¯à¦¼à¦¾ à¦¹à¦šà§à¦›à§‡...' : 'à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦œà¦®à¦¾ à¦¦à¦¿à¦¨'}
      </button>
    </div>
  );
}
