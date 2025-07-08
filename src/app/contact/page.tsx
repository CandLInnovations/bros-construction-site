"use client";

import React, { useState, useEffect } from 'react';
import styles from './contact.module.css';
import ContentLayout from '../../components/ContentLayout';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ObfuscatedEmailProps {
  className?: string;
  children?: React.ReactNode;
}

const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({ className, children }) => {
  const [email, setEmail] = useState<string>('');
  const [href, setHref] = useState<string>('#');

  useEffect(() => {
    // Decode the email on client side
    const user = 'jordan';
    const domain = 'bros-construction.com';
    const fullEmail = `${user}@${domain}`;
    setEmail(fullEmail);
    setHref(`mailto:${fullEmail}`);
  }, []);

  return (
    <a 
      href={href}
      className={className}
      data-email-obfuscated="true"
    >
      {children || email || 'Loading...'}
    </a>
  );
};

interface ObfuscatedPhoneProps {
  className?: string;
  children?: React.ReactNode;
}

const ObfuscatedPhone: React.FC<ObfuscatedPhoneProps> = ({ className, children }) => {
  const [displayPhone, setDisplayPhone] = useState<string>('');
  const [href, setHref] = useState<string>('#');

  useEffect(() => {
    // Decode the phone number on client side
    const phoneDigits = '8018670576';
    const formatted = `(${phoneDigits.slice(0,3)}) ${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`;
    const telLink = `+1${phoneDigits}`;
    setDisplayPhone(formatted);
    setHref(`tel:${telLink}`);
  }, []);

  return (
    <a 
      href={href}
      className={className}
      data-phone-obfuscated="true"
    >
      {children || displayPhone || 'Loading...'}
    </a>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone) {
      const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredContact: ''
        });
      } else {
        throw new Error('Failed to submit contact form');
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
        <div className={styles.contactContainer}>
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSubtitle}>
            Have a question or ready to discuss your roofing or siding project? Get in touch with our expert team at Bro's Construction.
          </p>

          {/* Contact Information Cards */}
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h3>Call Us</h3>
              <p>
                <ObfuscatedPhone className={styles.contactLink}>
                  (801) 867-0576
                </ObfuscatedPhone>
              </p>
              <span className={styles.contactNote}>Monday - Friday: 7AM - 6PM</span>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📧</div>
              <h3>Email Us</h3>
              <p>
                <ObfuscatedEmail className={styles.contactLink}>
                  jordan@bros-construction.com
                </ObfuscatedEmail>
              </p>
              <span className={styles.contactNote}>We respond within 24 hours</span>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📍</div>
              <h3>Service Area</h3>
              <p>Salt Lake City & The Wasatch Front</p>
              <span className={styles.contactNote}>Utah County & Surrounding Areas</span>
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              <h3>Something went wrong</h3>
              <p>We're sorry, but there was an error submitting your message. Please try again or call us directly at <ObfuscatedPhone>(801) 867-0576</ObfuscatedPhone>.</p>
            </div>
          )}

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Your Information</h2>
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
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="(801) 555-0123"
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="preferredContact" className={styles.label}>Preferred Contact Method</label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select preference</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                  <option value="either">Either Email or Phone</option>
                </select>
              </div>
            </div>

            {/* Message Section */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Your Message</h2>
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="project-question">Project Question</option>
                  <option value="estimate-request">Estimate Request</option>
                  <option value="existing-project">Existing Project</option>
                  <option value="warranty-claim">Warranty Claim</option>
                  <option value="emergency-repair">Emergency Repair</option>
                  <option value="partnership">Partnership/Business</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="Please tell us about your project, questions, or how we can help you..."
                  rows={5}
                  required
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
            </div>

            <div className={styles.submitSection}>
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <h3>Thank you for contacting us!</h3>
                  <p>We've received your message and will get back to you within 24 hours. For urgent matters, please call us at <ObfuscatedPhone>(801) 867-0576</ObfuscatedPhone>.</p>
                </div>
              )}
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
              <p className={styles.submitNote}>
                * Required fields. We typically respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </ContentLayout>
    </div>
  );
}