'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { ThreeDBackground } from '@/components/3d/background';
import Link from 'next/link';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setIsSuccess(true);
      setEmail('');
      setName('');
      setUserType('individual');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', color: 'white' }}>
        <ThreeDBackground />
        <Navbar />
        <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>You're on the list! 🎉</h1>
            <p style={{ color: '#999', marginBottom: '20px' }}>Thank you for joining the LifeOS waitlist.</p>
            <Link href="/">
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #6C5CE7, #00F5D4)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '16px', cursor: 'pointer' }}>
                Return Home
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', color: 'white' }}>
      <ThreeDBackground />
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Column */}
            <div>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', marginBottom: '20px' }}>
                <span style={{ color: '#00F5D4' }}>⚡ Limited Spots Available</span>
              </div>
              
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
                Join the<br />
                <span style={{ background: 'linear-gradient(135deg, #6C5CE7, #00F5D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Waitlist</span>
              </h1>
              
              <p style={{ fontSize: '18px', color: '#999', marginBottom: '30px' }}>
                Be among the first to experience LifeOS - the AI-powered operating system that designs, executes, and optimizes your life.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(108,92,231,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#6C5CE7' }}>👥</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>5,000+ Already Joined</div>
                    <div style={{ color: '#999', fontSize: '14px' }}>And growing fast</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(0,245,212,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#00F5D4' }}>⚡</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Early Access Benefits</div>
                    <div style={{ color: '#999', fontSize: '14px' }}>Lifetime discount for first 10,000</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(157,123,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#9D7BFF' }}>🏆</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Shape the Product</div>
                    <div style={{ color: '#999', fontSize: '14px' }}>Direct feedback to founders</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '30px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>
                    Email Address <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>
                    Name (Optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* User Type - Fixed dropdown styling */}
                <div>
                  <label htmlFor="userType" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>
                    I am a...
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      id="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(20,20,30,0.9)',
                        border: '1px solid rgba(108,92,231,0.3)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        outline: 'none',
                      }}
                    >
                      <option value="individual" style={{ background: '#1a1a2e', color: 'white' }}>Individual</option>
                      <option value="professional" style={{ background: '#1a1a2e', color: 'white' }}>Professional</option>
                      <option value="enterprise" style={{ background: '#1a1a2e', color: 'white' }}>Enterprise</option>
                      <option value="student" style={{ background: '#1a1a2e', color: 'white' }}>Student</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6C5CE7',
                      pointerEvents: 'none',
                      fontSize: '12px'
                    }}>
                      ▼
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding: '12px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '8px' }}>
                    <p style={{ color: '#ff4444', fontSize: '14px', margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #6C5CE7, #00F5D4)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.5 : 1,
                    transition: 'opacity 0.3s'
                  }}
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist →'}
                </button>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px', color: '#666', fontSize: '12px' }}>
                  <span>✨ No spam</span>
                  <span>•</span>
                  <span>🔒 Privacy first</span>
                  <span>•</span>
                  <span>⚡ Unsubscribe anytime</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}