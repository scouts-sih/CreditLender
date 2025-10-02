import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@creditlend.gov', password: 'Admin@123', role: 'System Administrator' },
    partner: { email: 'partner@bankofbaroda.com', password: 'Partner@456', role: 'Financial Partner' },
    officer: { email: 'officer@sbi.co.in', password: 'Officer@789', role: 'Lending Officer' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check credentials
    const validCredential = Object.values(mockCredentials)?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );
    
    if (validCredential) {
      // Store user session (in real app, this would be handled by auth service)
      localStorage.setItem('userSession', JSON.stringify({
        email: validCredential?.email,
        role: validCredential?.role,
        loginTime: new Date()?.toISOString()
      }));
      
      navigate('/admin-dashboard');
    } else {
      setErrors({
        general: `Invalid credentials. Please use:\nAdmin: admin@creditlend.gov / Admin@123\nPartner: partner@bankofbaroda.com / Partner@456\nOfficer: officer@sbi.co.in / Officer@789`
      });
    }
    
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error mb-1">Authentication Failed</p>
                <pre className="text-xs text-error/80 whitespace-pre-wrap font-mono">
                  {errors?.general}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your official email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-text-secondary hover:text-primary transition-smooth"
            disabled={isLoading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </Button>

        {/* Role Information */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-2">Access Levels</h4>
          <div className="space-y-2 text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-primary" />
              <span>System Administrator - Full platform access</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={14} className="text-accent" />
              <span>Financial Partner - Institution dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="User" size={14} className="text-secondary" />
              <span>Lending Officer - Beneficiary management</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;