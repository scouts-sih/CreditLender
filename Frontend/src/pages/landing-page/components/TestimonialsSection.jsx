import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Small Business Owner',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `CreditLend Pro changed my life! As a street vendor, I never had access to formal credit. Through my electricity bills and mobile recharge history, I got approved for ₹50,000 in just 2 hours. Now I've expanded my business and employ 3 people.`,rating: 5,loanAmount: '₹50,000',approvalTime: '2 hours'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',role: 'Auto Rickshaw Driver',location: 'Delhi, NCR',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',content: `I was skeptical about digital lending, but CreditLend Pro's transparent process won me over. They explained every step of my credit score calculation. Got ₹75,000 to buy a new rickshaw. The AI really understood my income pattern from my phone recharges.`,
      rating: 5,
      loanAmount: '₹75,000',
      approvalTime: '1.5 hours'
    },
    {
      id: 3,
      name: 'Sunita Devi',
      role: 'Domestic Worker',
      location: 'Bangalore, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `Traditional banks rejected me because I don't have salary slips. But CreditLend Pro saw my consistent utility bill payments and regular mobile recharges. Got ₹25,000 for my daughter's education. The process was so simple and respectful.`,
      rating: 5,
      loanAmount: '₹25,000',
      approvalTime: '3 hours'
    }
  ];

  const impactMetrics = [
    {
      id: 1,
      icon: 'Users',
      value: '2,50,000+',
      label: 'Beneficiaries Served',
      description: 'Underserved individuals empowered'
    },
    {
      id: 2,
      icon: 'TrendingUp',
      value: '₹500 Cr+',
      label: 'Loans Disbursed',
      description: 'Total credit access provided'
    },
    {
      id: 3,
      icon: 'Clock',
      value: '2.5 Hours',
      label: 'Average Approval Time',
      description: 'From application to sanction'
    },
    {
      id: 4,
      icon: 'Target',
      value: '94.2%',
      label: 'Approval Rate',
      description: 'Successful loan applications'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 px-4 lg:px-6 bg-gradient-to-br from-slate-50 to-blue-50">
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
            Real Stories, Real Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover how CreditLend Pro is transforming lives across India by providing inclusive financial access to underserved communities.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-2xl transition-all duration-300 border border-border"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-text-secondary mb-6 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{testimonial?.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial?.role}</p>
                  <p className="text-xs text-text-secondary flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {testimonial?.location}
                  </p>
                </div>
              </div>

              {/* Loan Details */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{testimonial?.loanAmount}</div>
                  <div className="text-xs text-text-secondary">Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">{testimonial?.approvalTime}</div>
                  <div className="text-xs text-text-secondary">Approval Time</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-border"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Our Impact in Numbers
            </h3>
            <p className="text-text-secondary">
              Measurable results that demonstrate our commitment to financial inclusion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics?.map((metric, index) => (
              <motion.div
                key={metric?.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={metric?.icon} size={28} className="text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                  {metric?.value}
                </div>
                <div className="text-lg font-semibold text-text-primary mb-1">
                  {metric?.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {metric?.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;