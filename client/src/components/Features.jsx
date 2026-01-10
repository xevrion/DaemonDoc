import React from "react";
import { motion } from "framer-motion";
import {
  Key,
  FileText,
  Search,
  ShieldCheck,
  FolderPlus,
  Settings2,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Key />,
      title: "Secure OAuth",
      desc: "Enterprise-grade security using GitHub's official protocol.",
    },
    {
      icon: <FileText />,
      title: "Context-Aware",
      desc: "Our AI understands your code architecture, not just file names.",
    },
    {
      icon: <Search />,
      title: "Smart Scanning",
      desc: "No bloat. We only index what matters for documentation.",
    },
    {
      icon: <ShieldCheck />,
      title: "Safe Commits",
      desc: "We create PRs or direct commits based on your preference.",
    },
    {
      icon: <FolderPlus />,
      title: "Monorepo Support",
      desc: "Handles complex structures across multiple packages easily.",
    },
    {
      icon: <Settings2 />,
      title: "Fully Configurable",
      desc: "Exclude files, change tone, or use custom templates.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 italic">
            Everything you need.
          </h2>
          <div className="h-1.5 w-20 bg-slate-900 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-slate-100 rounded-3xl hover:border-slate-300 hover:bg-slate-50/50 transition-all"
            >
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
