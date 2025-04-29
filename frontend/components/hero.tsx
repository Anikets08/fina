"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative max-w-3xl p-8 md:p-16 m-auto h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-5xl font-extrabold text-slate-800 leading-tight mb-6">
            Empower Smarter Lending{" "}
            <motion.span
              className="font-black text-6xl md:text-8xl tracking-tighter italic text-black block mt-1"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              Decisions
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Analyze borrower bank statements, predict repayment chances, and spot
          financial red flags — all in seconds.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              router.push("/analyze");
            }}
          >
            Analyze Statement
            <motion.span transition={{ duration: 0.2 }}>
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
