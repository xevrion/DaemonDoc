import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Mail,
  MapPin,
  Link as LinkIcon,
  Settings,
  Zap,
  ShieldCheck,
  Code2,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthNavigation from "../components/AuthNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }
  // Stats based on your real developer journey
  const stats = [
    { label: "Active Projects", value: "4+", icon: <Code2 size={18} /> },
    {
      label: "AI Updates",
      value: "Enabled",
      icon: <Zap size={18} className="text-emerald-500" />,
    },
    {
      label: "Status",
      value: "Pro",
      icon: <ShieldCheck size={18} className="text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-50">
      <AuthNavigation />
      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* SECTION 1: HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[32px] p-8 mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* High-Resolution Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#2da44e] to-[#0969da] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <img
                src={user.avatarUrl}
                alt={user.githubUsername}
                className="relative w-32 h-32 rounded-full border-4 border-white shadow-sm object-cover"
              />
            </div>

            {/* Identity Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-[900] tracking-tighter text-slate-900">
                  Arman Thakur
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  First-Year B.Tech CSE
                </span>
              </div>
              <p className="text-lg font-medium text-slate-500 mb-6">
                @{user.githubUsername} • Full-Stack Developer & AI Enthusiast
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} /> India
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} /> Joined Jan 2026
                </span>
                <a
                  href={`https://github.com/${user.githubUsername}`}
                  target="_blank"
                  className="flex items-center gap-1.5 text-[#0969da] hover:underline"
                >
                  <Github size={16} /> github.com/{user.githubUsername}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: GRID CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STATS BENTO */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2 w-fit rounded-xl bg-slate-50 text-slate-400 mb-4 border border-slate-100">
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-slate-900 leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}

            {/* Auto-README Status Toggle Display */}
            <div className="sm:col-span-3 bg-white border border-slate-200 p-8 rounded-[24px] flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  DaemonDoc Orchestration
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm">
                  Your AI engine is currently{" "}
                  {user.autoReadmeEnabled
                    ? "automatically updating"
                    : "paused for"}{" "}
                  your README files.
                </p>
              </div>
              <div
                className={`p-4 rounded-full ${
                  user.autoReadmeEnabled
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-slate-50 text-slate-300"
                }`}
              >
                <Zap
                  size={32}
                  className={user.autoReadmeEnabled ? "animate-pulse" : ""}
                  fill="currentColor"
                />
              </div>
              {/* Subtle visual texture */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16" />
            </div>
          </div>

          {/* SIDEBAR: TECH STACK */}
          <div className="bg-white border border-slate-200 p-8 rounded-[32px] shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Code2 size={14} /> Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {["MERN", "TypeScript", "Next.js", "Redis", "DevOps"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <hr className="my-8 border-slate-100" />

            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Integrations
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Github size={18} />
                  <span className="text-xs font-bold">GitHub Linked</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
