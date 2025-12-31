import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Signup.module.css';

export default function Signup() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 4 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP:', otpValue);
    // TODO: Add your signup/OTP verification logic here
    // After successful verification, redirect to home page
    // router.push('/');
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        {/* Left Panel - Jungle Background */}
        <div className={styles.junglePanel}>
          <div className={styles.jungleBackground}></div>
          <div className={styles.jungleOverlay}></div>
          <div className={styles.jungleContent}>
            <h1 className={styles.jungleTitle}>Hello, Backpacker!</h1>
            <p className={styles.jungleText}>
              Register with your personal account to explore amazing destinations
            </p>
            <Link href="/login">
              <button className={styles.backToLoginButton}>
                BACK TO LOGIN
              </button>
            </Link>
          </div>
        </div>

        {/* Right Panel - Create Account */}
        <div className={styles.createAccountPanel}>
          <h2 className={styles.createAccountTitle}>Create Account</h2>
          <form onSubmit={handleSubmit} className={styles.otpForm}>
            <div className={styles.otpInputs} onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  required
                />
              ))}
            </div>
            <label className={styles.verifyOtpLabel}>Verify OTP</label>
            <button type="submit" className={styles.signupSubmitButton}>
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

