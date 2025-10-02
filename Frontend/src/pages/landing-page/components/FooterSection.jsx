import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const ministryLogos = [
    {
      id: 1,
      name: 'Ministry of Finance',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop',
      url: '#'
    },
    {
      id: 2,
      name: 'Digital India',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=80&fit=crop',
      url: '#'
    },
    {
      id: 3,
      name: 'Government of India',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120&h=80&fit=crop',
      url: '#'
    },
    {
      id: 4,
      name: 'Make in India',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=80&fit=crop',
      url: '#'
    }
  ];

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Eligibility Criteria', path: '/eligibility' },
    { label: 'Documentation', path: '/documentation' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact Support', path: '/support' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Data Protection', path: '/data-protection' },
    { label: 'Grievance Redressal', path: '/grievance' },
    { label: 'Accessibility', path: '/accessibility' },
    { label: 'Disclaimer', path: '/disclaimer' }
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Helpline',
      value: '1800-XXX-XXXX',
      description: 'Toll-free support'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'support@creditlend.gov.in',
      description: 'General inquiries'
    },
    {
      icon: 'MapPin',
      label: 'Address',
      value: 'Ministry of Finance, New Delhi',
      description: 'Government of India'
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Ministry Logos Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-semibold mb-2">Backed by Government of India</h3>
            <p className="text-slate-400">Official initiative for financial inclusion</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
          >
            {ministryLogos?.map((ministry) => (
              <motion.a
                key={ministry?.id}
                href={ministry?.url}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-slate-800 transition-colors duration-300"
              >
                <div className="w-20 h-16 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={ministry?.logo}
                    alt={ministry?.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <span className="text-xs text-slate-400 text-center">{ministry?.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <Link to="/landing-page" className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Icon name="CreditCard" size={24} color="white" />
              </div>
              <div>
                <div className="text-2xl font-bold">CreditLend</div>
                <div className="text-sm text-primary font-medium">Pro</div>
              </div>
            </Link>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering underserved communities with AI-driven credit scoring and inclusive financial access through innovative technology.
            </p>

            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Secure • Transparent • Inclusive</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h4 className="text-lg font-semibold mb-6">Legal & Compliance</h4>
            <ul className="space-y-3">
              {legalLinks?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              {contactInfo?.map((contact) => (
                <div key={contact?.label} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-lg flex-shrink-0">
                    <Icon name={contact?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{contact?.value}</div>
                    <div className="text-sm text-slate-400">{contact?.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="font-medium mb-4">Follow Updates</h5>
              <div className="flex items-center space-x-3">
                {['Twitter', 'Facebook', 'Linkedin', 'Youtube']?.map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-lg hover:bg-primary transition-colors duration-300"
                  >
                    <Icon name={social} size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © {currentYear} CreditLend Pro. All rights reserved. Government of India Initiative.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={14} />
                <span>Available in English & Hindi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={14} />
                <span>Mobile Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;