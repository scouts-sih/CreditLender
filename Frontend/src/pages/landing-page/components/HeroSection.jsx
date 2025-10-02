import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-32 pb-20 px-4 lg:px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Icon name="Sparkles" size={16} />
              <span>AI-Powered Credit Scoring</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Unlock Credit Access with{' '}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Digital Intelligence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Empowering underserved communities with AI-driven credit scoring through utility bills and mobile recharge data. Fast, transparent, and inclusive financial access.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/borrower-portal">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Check Eligibility
                </Button>
              </Link>
              <Link to="/admin-partner-login">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Users"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Partner Login
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-6 mt-8 text-sm text-text-secondary"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Government Backed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-success" />
                <span>Instant Processing</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-border">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="CreditCard" size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">CreditLend Pro</h3>
                      <p className="text-sm text-text-secondary">Credit Assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary">750</div>
                    <div className="text-sm text-text-secondary">Credit Score</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-2xl font-bold text-success">₹2.5L</div>
                    <div className="text-sm text-text-secondary">Loan Limit</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Income Verification</span>
                    <span className="text-success font-medium">Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <Button variant="default" size="sm" fullWidth>
                  View Full Report
                </Button>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-success text-white p-3 rounded-full shadow-lg"
              >
                <Icon name="TrendingUp" size={20} />
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-primary text-white p-3 rounded-full shadow-lg"
              >
                <Icon name="Smartphone" size={20} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;