// app/login/LoginForm.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; 
import {
  Button, 
  Field, 
  Input, 
  Card, 
  CardHeader, 
  CardPreview, 
  Caption1, 
  Spinner,
} from '@fluentui/react-components';

// --- ENTERPRISE BRANDING & CSS VALUES ---
const BRAND_PRIMARY = '#A5D166'; // Primary Green 
const BRAND_HOVER = '#00AB4E';   // Darker Green for Hover (Strong visual feedback)
const TEXT_COLOR = '#333333';    // Standard Body Text
const BG_COLOR = '#FFFFFF';      // Card Background
const ERROR_COLOR = '#ED1C24';    // Error Red
const BORDER_COLOR = '#C8C8C8';  // Subtle Gray Separator

// --- Component Styles (Direct CSS for Stability) ---
const styles = {
  // Container: Light gray background, centered content (Classic Fluent look)
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f2f1', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,

  // Card: Elevated, refined login panel
  card: {
    width: '400px',
    padding: '32px 24px', // Increased vertical padding for more air
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.08)', // Soft, professional shadow
    borderRadius: '4px',
    backgroundColor: BG_COLOR,
    borderTop: `4px solid ${BRAND_PRIMARY}`, // Subtle, strong brand accent
  } as React.CSSProperties,

  // Title: Clear hierarchy
  title: {
    fontSize: '28px',
    fontWeight: 600,
    textAlign: 'left', // Aligning left for a cleaner, document-style look
    color: TEXT_COLOR,
    marginBottom: '16px', 
    paddingBottom: '16px',
    borderBottom: `1px solid ${BORDER_COLOR}`,
  } as React.CSSProperties,

  // Description area
  captionHeader: {
    textAlign: 'left',
    marginBottom: '16px',
    color: '#605E5C', // Fluent Neutral Secondary Text color
  } as React.CSSProperties,

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,

  // Primary Button Custom Styling (Must use className for proper hover/active)
  // Since we avoid makeStyles, we use a global class or a dedicated utility for hover.
  // For this direct styling, we focus on the base state:
  primaryButton: {
    marginTop: '16px', // Increased space above button
    backgroundColor: BRAND_PRIMARY, 
    color: TEXT_COLOR, 
    fontWeight: 600,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,

  error: {
    color: ERROR_COLOR,
    marginTop: '8px',
    textAlign: 'center',
    fontWeight: 600,
    padding: '8px',
    backgroundColor: '#FDE7E9', // Light red background for error message
    borderRadius: '2px',
    borderLeft: `3px solid ${ERROR_COLOR}`,
  } as React.CSSProperties,
};

// Component to handle applying the hover style to the button via inline style
const ButtonWithHover = (props: any) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const hoverStyle = {
    backgroundColor: isHovered ? BRAND_HOVER : BRAND_PRIMARY,
  };

  return (
    <Button 
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...styles.primaryButton, ...props.style, ...hoverStyle }}
    />
  );
};


export default function LoginForm() {
  const [error, setError] = React.useState('');
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError('');
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email, 
      password, 
      redirect: false,
    });
    
    setIsPending(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/'); 
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardHeader
          header={<div style={styles.title}>Welcome to the Portal</div>}
          description={<Caption1 style={styles.captionHeader}>Sign in securely with your credentials.</Caption1>}
        />
        <CardPreview>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Field label="Email Address" required>
              <Input name="email" type="email" required disabled={isPending} placeholder="name@company.com" />
            </Field>
            
            <Field label="Password" required>
              <Input name="password" type="password" required disabled={isPending} placeholder="Password" />
            </Field>
            
            {error && <div style={styles.error}>⚠️ **Authentication Failed.** {error}</div>}
            
            {/* Use the enhanced button component */}
            <ButtonWithHover
              type="submit" 
              appearance="primary" 
              disabled={isPending}
            >
              {isPending ? <Spinner size="tiny" label="Signing In..." labelPosition="after" /> : 'Continue to Dashboard'}
            </ButtonWithHover>
          </form>
        </CardPreview>
      </Card>
    </div>
  );
}