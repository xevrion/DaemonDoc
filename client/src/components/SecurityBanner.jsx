import React from "react";
import { motion } from "framer-motion";
import { Lock, EyeOff, Power, ShieldCheck } from "lucide-react";

const SecurityBanner = () => {
  const securityFeatures = [
    { icon: <Lock size={18} />, text: "Encryption at rest and in transit" },
    { icon: <EyeOff size={18} />, text: "Zero code storage policy" },
    { icon: <Power size={18} />, text: "Instant revocation of access" },
  ];

  return (
    <section id="security" className="py-12 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-5xl mx-auto bg-slate-900 rounded-[2rem] p-12 text-white relative overflow-hidden"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Your code stays yours. Period.
            </h2>
            <div className="space-y-4">
              {securityFeatures.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-slate-400"
                >
                  {s.icon} <span className="text-sm font-medium">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl border border-white/20 animate-pulse">
              <ShieldCheck size={64} className="text-emerald-400" />
            </div>
          </div>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/20 blur-[100px]" />
      </motion.div>
    </section>
  );
};

export default SecurityBanner;
