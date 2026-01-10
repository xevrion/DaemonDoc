import React from "react";
import { motion } from "framer-motion";
import { Clock, RefreshCw, FileText, AlertCircle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const PainPoints = () => {
  const painPoints = [
    {
      icon: <Clock className="text-orange-500" />,
      text: "Writing READMEs is repetitive and time-consuming",
    },
    {
      icon: <RefreshCw className="text-blue-500" />,
      text: "READMEs go out of sync as code evolves",
    },
    {
      icon: <FileText className="text-emerald-500" />,
      text: "New repositories often ship without documentation",
    },
    {
      icon: <AlertCircle className="text-red-500" />,
      text: "Good documentation is important, but rarely prioritized",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-2 bg-slate-50 rounded-lg">{item.icon}</div>
              <p className="font-semibold text-slate-700">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;
