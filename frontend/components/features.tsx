import {
  ArrowRight,
  BarChart3,
  FileText,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
const FeatureSection = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Statement Analysis",
      description:
        "Automatically extract and analyze data from bank statements to identify patterns and anomalies.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Risk Assessment",
      description:
        "Advanced algorithms predict repayment probability based on spending habits and financial stability.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Fraud Detection",
      description:
        "Identify potential red flags and fraudulent activities with our advanced security checks.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Compatibility",
      description:
        "Support for multiple currencies and financial institutions across different regions.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Powerful Features for Lenders
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our technology does the heavy lifting so you can focus on making the
            right lending decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="border-t-2 border-blue-50 pt-6"
            >
              <div className="mb-5 text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center mx-auto gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            See All Features
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
