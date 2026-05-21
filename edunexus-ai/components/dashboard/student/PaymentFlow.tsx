"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Lock, CheckCircle, Tag, ChevronRight,
  Building2, Smartphone, Shield, X, AlertCircle,
} from "lucide-react";

type PaymentStep = "method" | "details" | "review" | "success";
type MethodType  = "card" | "esewa" | "khalti" | "mypay" | "connectips" | "bank";

interface OrderSummary {
  orderNumber: string;
  service: string;
  subject: string;
  deadline: string;
  baseAmount: number;
  discount: number;
  processingFee: number;
}

const MOCK_ORDER: OrderSummary = {
  orderNumber:   "ENX-1052",
  service:       "Research Paper",
  subject:       "Computer Science — AI Ethics",
  deadline:      "2026-05-22",
  baseAmount:    19900,
  discount:      0,
  processingFee: 399,
};

const SAVED_CARDS = [
  { id: "c1", brand: "Visa",       last4: "4242", expiry: "04/28", isDefault: true  },
  { id: "c2", brand: "Mastercard", last4: "5555", expiry: "11/26", isDefault: false },
];

const COUPON_CODES: Record<string, number> = {
  "SAVE10":  10,
  "WELCOME": 15,
  "LOYAL20": 20,
};

export function PaymentFlow({ onClose }: { onClose?: () => void }) {
  const [step, setStep]           = useState<PaymentStep>("method");
  const [method, setMethod]       = useState<MethodType>("card");
  const [selectedCard, setCard]   = useState("c1");
  const [couponInput, setCoupon]  = useState("");
  const [couponApplied, setApply] = useState<{ code: string; pct: number } | null>(null);
  const [couponError, setCError]  = useState("");
  const [processing, setProcessing] = useState(false);
  const [newCard, setNewCard]     = useState({ number: "", expiry: "", cvc: "", name: "" });

  const order = MOCK_ORDER;
  const discount   = couponApplied ? Math.round(order.baseAmount * couponApplied.pct / 100 * 100) / 100 : order.discount;
  const total      = (order.baseAmount - discount + order.processingFee).toFixed(2);

  const applyCoupon = () => {
    const code = couponInput.toUpperCase().trim();
    if (!code) return;
    const pct = COUPON_CODES[code];
    if (pct) {
      setApply({ code, pct });
      setCError("");
    } else {
      setCError("Invalid coupon code");
      setApply(null);
    }
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2200);
  };

  const STEPS: PaymentStep[] = ["method", "details", "review", "success"];
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Complete Payment</h2>
          <p className="text-slate-400 text-sm mt-0.5">Order {order.orderNumber} — {order.service}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step progress */}
      {step !== "success" && (
        <div className="flex items-center gap-1">
          {(["method", "details", "review"] as const).map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center gap-1.5 ${stepIdx >= i ? "text-blue-400" : "text-slate-600"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                  stepIdx > i  ? "bg-blue-500 border-blue-500 text-white" :
                  stepIdx === i ? "border-blue-500 text-blue-400" :
                  "border-white/[0.12] text-slate-600"
                }`}>
                  {stepIdx > i ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-xs font-medium capitalize hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px mx-2 ${stepIdx > i ? "bg-blue-500" : "bg-white/[0.08]"}`} />}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* Step 1: Payment Method */}
            {step === "method" && (
              <motion.div key="method"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                className="space-y-4">
                <h3 className="text-white font-semibold">Select Payment Method</h3>
                <div className="space-y-2">
                  {([
                    { type: "esewa"      as MethodType, icon: Smartphone, label: "eSewa",        sub: "Nepal's most popular e-wallet",   color: "text-green-400"  },
                    { type: "khalti"     as MethodType, icon: Smartphone, label: "Khalti",       sub: "Fast digital wallet",              color: "text-purple-400" },
                    { type: "mypay"      as MethodType, icon: Smartphone, label: "MyPay",        sub: "Secure mobile payment",            color: "text-blue-400"   },
                    { type: "connectips" as MethodType, icon: Building2,  label: "ConnectIPS",   sub: "Interbank payment system",         color: "text-cyan-400"   },
                    { type: "card"       as MethodType, icon: CreditCard, label: "Debit / ATM Card", sub: "Visa, Mastercard — local banks",color: "text-slate-400"  },
                    { type: "bank"       as MethodType, icon: Building2,  label: "Bank Transfer", sub: "Direct bank — 1-2 business days",color: "text-slate-400"  },
                  ]).map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.type} onClick={() => setMethod(opt.type)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                          method === opt.type
                            ? "border-blue-500/60 bg-blue-500/10"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]"
                        }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          method === opt.type ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.05] text-slate-400"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium text-sm ${method === opt.type ? "text-white" : "text-slate-300"}`}>{opt.label}</p>
                          <p className="text-xs text-slate-500">{opt.sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          method === opt.type ? "border-blue-500" : "border-white/[0.2]"
                        }`}>
                          {method === opt.type && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setStep("details")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors shadow-lg shadow-blue-500/20">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment Details */}
            {step === "details" && (
              <motion.div key="details"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                className="space-y-4">
                <h3 className="text-white font-semibold">
                  {method === "card" ? "Card Details" :
                   method === "bank" ? "Bank Transfer" :
                   method === "esewa" ? "eSewa Payment" :
                   method === "khalti" ? "Khalti Payment" :
                   method === "mypay" ? "MyPay Payment" :
                   "ConnectIPS Payment"}
                </h3>

                {["esewa", "khalti", "mypay", "connectips"].includes(method) && (
                  <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
                      method === "esewa" ? "bg-green-500/20" :
                      method === "khalti" ? "bg-purple-500/20" :
                      method === "mypay" ? "bg-blue-500/20" : "bg-cyan-500/20"
                    }`}>
                      <Smartphone className={`w-8 h-8 ${
                        method === "esewa" ? "text-green-400" :
                        method === "khalti" ? "text-purple-400" :
                        method === "mypay" ? "text-blue-400" : "text-cyan-400"
                      }`} />
                    </div>
                    <div>
                      <p className="text-white font-medium capitalize">{
                        method === "esewa" ? "eSewa" :
                        method === "khalti" ? "Khalti" :
                        method === "mypay" ? "MyPay" : "ConnectIPS"
                      }</p>
                      <p className="text-slate-400 text-sm mt-1">Enter your registered mobile number to receive a payment request.</p>
                    </div>
                    <div className="text-left">
                      <label className="text-xs text-slate-400 mb-1.5 block">Registered Mobile Number</label>
                      <input type="tel" className="input-field" />
                    </div>
                  </div>
                )}

                {method === "card" && (
                  <div className="space-y-3">
                    {/* Saved cards */}
                    {SAVED_CARDS.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Saved Cards</p>
                        {SAVED_CARDS.map(card => (
                          <button key={card.id} onClick={() => setCard(card.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                              selectedCard === card.id
                                ? "border-blue-500/60 bg-blue-500/10"
                                : "border-white/[0.08] hover:border-white/[0.16]"
                            }`}>
                            <CreditCard className="w-5 h-5 text-slate-400" />
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{card.brand} •••• {card.last4}</p>
                              <p className="text-xs text-slate-500">Expires {card.expiry}{card.isDefault ? " · Default" : ""}</p>
                            </div>
                            {selectedCard === card.id && <CheckCircle className="w-4 h-4 text-blue-400" />}
                          </button>
                        ))}
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider pt-2">Or add new card</p>
                      </div>
                    )}
                    <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Cardholder Name</label>
                        <input value={newCard.name} onChange={e => setNewCard(p => ({ ...p, name: e.target.value }))}
                          placeholder="Alex Johnson" className="input-field" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">Card Number</label>
                        <input value={newCard.number} onChange={e => setNewCard(p => ({ ...p, number: e.target.value }))}
                          placeholder="4242 4242 4242 4242" maxLength={19} className="input-field font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-400 mb-1.5 block">Expiry</label>
                          <input value={newCard.expiry} onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))}
                            placeholder="MM / YY" maxLength={7} className="input-field" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 mb-1.5 block">CVC</label>
                          <input value={newCard.cvc} onChange={e => setNewCard(p => ({ ...p, cvc: e.target.value }))}
                            placeholder="•••" maxLength={4} className="input-field" type="password" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {method === "bank" && (
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3 text-sm">
                    {[
                      ["Account Name",   "ScholarSync Nepal Inc."],
                      ["Routing Number", "021000021"],
                      ["Account Number", "••••••••7823"],
                      ["Reference",      order.orderNumber],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-slate-500">{label}</span>
                        <span className="text-white font-mono font-medium">{value}</span>
                      </div>
                    ))}
                    <p className="text-xs text-amber-400 pt-2 border-t border-white/[0.06]">
                      ⚠ Include your order number as the payment reference.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep("method")}
                    className="flex-1 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] text-slate-300 font-medium text-sm transition-colors border border-white/[0.08]">
                    Back
                  </button>
                  <button onClick={() => setStep("review")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/20">
                    Review Order <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === "review" && (
              <motion.div key="review"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                className="space-y-4">
                <h3 className="text-white font-semibold">Review & Pay</h3>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-sm">
                  {[
                    ["Service",   order.service  ],
                    ["Subject",   order.subject  ],
                    ["Deadline",  order.deadline ],
                    ["Method",    method === "card" ? `Card •••• ${SAVED_CARDS.find(c => c.id === selectedCard)?.last4 ?? "new"}` : method === "esewa" ? "eSewa" : method === "khalti" ? "Khalti" : method === "mypay" ? "MyPay" : method === "connectips" ? "ConnectIPS" : "Bank Transfer"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-white font-medium capitalize">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        value={couponInput}
                        onChange={e => { setCoupon(e.target.value); setCError(""); }}
                        placeholder="Coupon code"
                        className="input-field pl-9 uppercase"
                      />
                    </div>
                    <button onClick={applyCoupon}
                      className="px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm border border-white/[0.08] transition-colors">
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                    </p>
                  )}
                  {couponApplied && (
                    <p className="flex items-center gap-1.5 text-xs text-green-400">
                      <CheckCircle className="w-3.5 h-3.5" /> {couponApplied.code} — {couponApplied.pct}% off applied!
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("details")}
                    className="flex-1 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] text-slate-300 font-medium text-sm transition-colors border border-white/[0.08]">
                    Back
                  </button>
                  <button onClick={handlePay} disabled={processing}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-medium text-sm transition-colors shadow-lg shadow-green-500/20">
                    {processing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <><Lock className="w-4 h-4" /> Pay रू {Number(total).toLocaleString("ne-NP")}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
                  <p className="text-slate-400 mt-1">Your order {order.orderNumber} is now active.</p>
                </div>
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-300">
                  Receipt has been sent to your email.
                </div>
                {onClose && (
                  <button onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-sm font-medium transition-colors">
                    Close
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        {step !== "success" && (
          <div className="lg:col-span-2">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-4 sticky top-4">
              <h4 className="text-white font-semibold text-sm">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service</span>
                  <span className="text-white">{order.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Base amount</span>
                  <span className="text-white">रू {order.baseAmount.toLocaleString("ne-NP")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({couponApplied?.pct}%)</span>
                    <span>−रू {discount.toLocaleString("ne-NP")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing fee</span>
                  <span className="text-white">रू {order.processingFee.toLocaleString("ne-NP")}</span>
                </div>
                <div className="border-t border-white/[0.08] pt-2 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-green-400 text-lg">रू {Number(total).toLocaleString("ne-NP")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-white/[0.06]">
                <Shield className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                256-bit SSL encryption. Your payment is secure.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
