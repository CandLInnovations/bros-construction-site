"use client";

import React, { useState } from 'react';
import styles from './quote.module.css';
import ContentLayout from '../../components/ContentLayout';
import TurnstileWidget from '../../components/TurnstileWidget';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  projectType: string;
  roofType: string;
  propertyType: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  hearAboutUs: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function QuotePage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    projectType: '',
    roofType: '',
    propertyType: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    hearAboutUs: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileError, setTurnstileError] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    // Turnstile validation
    if (!turnstileToken) {
      newErrors.turnstile = 'Please complete the security verification';
      setTurnstileError(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          projectType: '',
          roofType: '',
          propertyType: '',
          projectDescription: '',
          timeline: '',
          budget: '',
          hearAboutUs: ''
        });
        setTurnstileToken('');
        setTurnstileError(false);
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ContentLayout>
        <div className={styles.quoteContainer}>
          <h1 className={styles.pageTitle}>Get Your Free Quote</h1>
          <p className={styles.pageSubtitle}>
            Ready to transform your property? Fill out the form below and we'll provide you with a detailed quote for your roofing or siding project.
          </p>

          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              <h3>Something went wrong</h3>
              <p>We're sorry, but there was an error submitting your quote request. Please try again or call us directly at <a href="tel:+8018670576">(801) 867-0576</a>.</p>
            </div>
          )}

          <form className={styles.quoteForm} onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    required
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    required
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    required
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="(801) 555-0123"
                    required
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Property Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Property Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                  placeholder="123 Main Street"
                  required
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                    placeholder="Salt Lake City"
                    required
                  />
                  {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode" className={styles.label}>ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.zipCode ? styles.inputError : ''}`}
                    placeholder="84101"
                    required
                  />
                  {errors.zipCode && <span className={styles.errorText}>{errors.zipCode}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="propertyType" className={styles.label}>Property Type *</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className={`${styles.select} ${errors.propertyType ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select property type</option>
                  <option value="residential-single">Single Family Home</option>
                  <option value="residential-condo">Condominium</option>
                  <option value="residential-townhome">Townhome</option>
                  <option value="commercial-small">Small Commercial Building</option>
                  <option value="commercial-large">Large Commercial Building</option>
                  <option value="industrial">Industrial Facility</option>
                  <option value="other">Other</option>
                </select>
                {errors.propertyType && <span className={styles.errorText}>{errors.propertyType}</span>}
              </div>
            </div>

            {/* Project Details */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Project Details</h2>
              <div className={styles.formGroup}>
                <label htmlFor="projectType" className={styles.label}>Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={`${styles.select} ${errors.projectType ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select project type</option>
                  <option value="new-roof">New Roof Installation</option>
                  <option value="roof-replacement">Roof Replacement</option>
                  <option value="roof-repair">Roof Repair</option>
                  <option value="metal-siding">Metal Siding Installation</option>
                  <option value="siding-repair">Siding Repair</option>
                  <option value="gutters">Gutter Installation/Repair</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="consultation">Consultation Only</option>
                </select>
                {errors.projectType && <span className={styles.errorText}>{errors.projectType}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="roofType" className={styles.label}>Preferred Roofing Material</label>
                <select
                  id="roofType"
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select material (if applicable)</option>
                  <option value="metal-standing-seam">Metal Standing Seam</option>
                  <option value="metal-corrugated">Metal Corrugated</option>
                  <option value="asphalt-shingles">Asphalt Shingles</option>
                  <option value="synthetic-shake">Synthetic Shake</option>
                  <option value="wood-shake">Wood Shake</option>
                  <option value="tpo">TPO (Commercial)</option>
                  <option value="epdm">EPDM (Commercial)</option>
                  <option value="pvc">PVC (Commercial)</option>
                  <option value="not-sure">Not Sure</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="projectDescription" className={styles.label}>Project Description *</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${errors.projectDescription ? styles.inputError : ''}`}
                  placeholder="Please describe your project in detail. Include any specific requirements, concerns, or preferences..."
                  rows={4}
                  required
                />
                {errors.projectDescription && <span className={styles.errorText}>{errors.projectDescription}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="timeline" className={styles.label}>Project Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As Soon As Possible</option>
                    <option value="1-month">Within 1 Month</option>
                    <option value="2-3-months">2-3 Months</option>
                    <option value="6-months">Within 6 Months</option>
                    <option value="next-year">Next Year</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="budget" className={styles.label}>Estimated Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="hearAboutUs" className={styles.label}>How did you hear about us?</label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select option</option>
                  <option value="google">Search Engine</option>
                  <option value="referral">Referral from Friend/Family</option>
                  <option value="social-media">Social Media</option>
                  <option value="website">Company Website</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="previous-customer">Previous Customer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Bot Protection */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Security Verification</h2>
              <div className={styles.formGroup}>
                <TurnstileWidget
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError(false);
                    if (errors.turnstile) {
                      setErrors(prev => ({ ...prev, turnstile: '' }));
                    }
                  }}
                  onError={() => {
                    setTurnstileToken('');
                    setTurnstileError(true);
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                    setTurnstileError(true);
                  }}
                  className={turnstileError ? styles.turnstileError : ''}
                />
                {errors.turnstile && <span className={styles.errorText}>{errors.turnstile}</span>}
              </div>
            </div>

            <div className={styles.submitSection}>
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <h3>Thank you for your quote request!</h3>
                  <p>We've received your information and will contact you within 24 hours to discuss your project.</p>
                </div>
              )}
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
              </button>
              <p className={styles.submitNote}>
                * Required fields. We'll contact you within 24 hours to discuss your project and schedule a free on-site consultation.
              </p>
            </div>
          </form>
        </div>
      </ContentLayout>
    </div>
  );
}