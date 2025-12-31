import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.signinPanel}>
          <h1 className={styles.signinTitle}>Sign In</h1>
          <form onSubmit={handleSubmit} className={styles.signinForm}>
            <input
              type="email"
              placeholder="Email"
              className={styles.signinInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.signinInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.forgotPassword}>
              Forgot Your <span className={styles.passwordLink}>Password?</span>
            </div>
            <button type="submit" className={styles.signinButton}>
              SIGN IN
            </button>
          </form>
        </div>

        <div className={styles.welcomePanel}>
          <div className={styles.orangeCurve}></div>
          <div className={styles.welcomeContent}>
            <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
            <p className={styles.welcomeText}>
              Enter your personal account to explore amazing destinations
            </p>
            <Link href="/signup">
              <button className={styles.signupButton}>
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

