import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: 'Brain',
      title: 'AI-Powered Credit Scoring',
      description: 'Advanced machine learning algorithms analyze utility bills and mobile recharge patterns to generate accurate credit scores for underserved populations.',
      color: 'primary',
      stats: '95% Accuracy'
    },
    {
      id: 2,
      icon: 'FileCheck',
      title: 'Income Verification',
      description: 'Seamless verification through electricity bills, water bills, gas bills, and mobile recharge data to establish reliable income patterns.',
      color: 'accent',
      stats: '3 Min Process'
    },
    {
      id: 3,
      icon: 'Zap',
      title: 'Digital Loan Sanctioning',
      description: 'Instant loan approval and sanctioning through automated risk assessment and digital document processing for faster financial access.',
      color: 'success',
      stats: '24/7 Available'
    },
    {
      id: 4,
      icon: 'BarChart3',
      title: 'Transparent Risk Bands',
      description: 'Clear risk categorization with detailed score breakdown showing repayment history, utility data analysis, and composite scoring methodology.',
      color: 'warning',
      stats: '100% Transparent'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary text-white',
      accent: 'bg-accent text-white',
      success: 'bg-success text-white',
      warning: 'bg-warning text-white'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getBgColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/5 border-primary/20',
      accent: 'bg-accent/5 border-accent/20',
      success: 'bg-success/5 border-success/20',
      warning: 'bg-warning/5 border-warning/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 px-4 lg:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Revolutionizing Credit Access
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our AI-powered platform transforms how underserved communities access credit through innovative technology and transparent processes.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`relative bg-white rounded-2xl p-8 border-2 ${getBgColorClasses(feature?.color)} hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${getColorClasses(feature?.color)} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={28} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                  {feature?.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {feature?.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center space-x-2 bg-muted px-3 py-1 rounded-full">
                  <Icon name="Star" size={14} className="text-warning" />
                  <span className="text-sm font-medium text-text-primary">
                    {feature?.stats}
                  </span>
                </div>
              </div>

              {/* Hover Effect Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute top-8 right-8 text-primary"
              >
                <Icon name="ArrowUpRight" size={20} />
              </motion.div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${getColorClasses(feature?.color)} rounded-full blur-2xl`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-6">
            Ready to experience the future of credit scoring?
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Icon name="ArrowDown" size={20} />
            <span className="font-medium">Discover Success Stories Below</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;