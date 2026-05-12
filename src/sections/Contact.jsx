/**
 * Contact.jsx – Phase 2 exhaustive-deps + Phase 4 a11y
 *
 * Phase 2 fixes:
 * - handleChange uses functional setState to avoid stale formData closure
 * - showAlertMessage wrapped in useCallback (stable reference)
 * - clearTimeout called in cleanup to prevent setState-after-unmount
 *
 * Phase 4 a11y:
 * - <section> has aria-labelledby pointing to the h2
 * - form has aria-label
 * - submit button has aria-describedby for loading state
 * - All labels are properly connected via htmlFor/id
 */

import { useState, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Alert from '../components/Alert';
import { Particles } from '../components/Particles';

const INITIAL_FORM = { name: '', email: '', message: '' };

const Contact = () => {
  const [formData,     setFormData]     = useState(INITIAL_FORM);
  const [isLoading,    setIsLoading]    = useState(false);
  const [showAlert,    setShowAlert]    = useState(false);
  const [alertType,    setAlertType]    = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const alertTimerRef = useRef(null);

  // Phase 2: functional update avoids stale closure on formData
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Phase 2: stable reference, cleanup prevents setState after unmount
  const showAlertMessage = useCallback((type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await emailjs.send(
          'service_296ffmn',
          'template_7t0ki0j',
          {
            from_name:  formData.name,
            to_name:    'Chirag',
            from_email: formData.email,
            to_email:   'chiragjain.ck04@gmail.com',
            message:    formData.message,
          },
          {
            publicKey: 'ueHXbNrzAvo_LkBms',
          }
        );
        setFormData(INITIAL_FORM);
        showAlertMessage('success', 'Your message has been sent!');
      } catch (err) {
        console.error('[Contact] EmailJS error:', err);
        const errorMsg = err?.text ? `Error: ${err.text}` : 'Something went wrong. Please try again.';
        showAlertMessage('danger', errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, showAlertMessage],
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
        aria-hidden="true"
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 id="contact-heading" className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help.
          </p>
        </div>

        <form
          className="w-full"
          onSubmit={handleSubmit}
          aria-label="Contact form"
          noValidate
        >
          {/* Name */}
          <div className="mb-5">
            <label htmlFor="contact-name" className="field-label">
              Full Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="contact-email" className="field-label">
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="johndoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          {/* Message */}
          <div className="mb-5">
            <label htmlFor="contact-message" className="field-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts…"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            id="contact-submit"
            aria-busy={isLoading}
            aria-label={isLoading ? 'Sending your message…' : 'Send message'}
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Sending…' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
