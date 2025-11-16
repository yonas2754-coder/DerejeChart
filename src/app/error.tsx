// app/error.tsx
"use client"; // Must be a Client Component to handle runtime errors

import * as React from 'react';
import { Button, Title1, Text, makeStyles, tokens, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    textAlign: 'center',
    gap: tokens.spacingVerticalL,
  },
  errorTitle: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  details: {
    maxWidth: '600px',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ...shorthands.padding(tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  }
});

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary UI for Next.js App Router.
 * This is used to gracefully handle and recover from runtime errors.
 */
export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  const styles = useStyles();

  React.useEffect(() => {
    // Optionally log the error details to your error tracking service
    console.error("Global Route Error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <Title1 className={styles.errorTitle}>
        Something Went Wrong! 🚨
      </Title1>
      <Text size={500}>
        We encountered a critical error while loading the page.
      </Text>

      <div className={styles.details}>
        <Text size={300} style={{ marginBottom: tokens.spacingVerticalS, fontWeight: tokens.fontWeightSemibold }} block>
            Error Message:
        </Text>
        <Text size={200} block wrap>
          {error.message}
        </Text>
      </div>

      <Button
        appearance="primary"
        onClick={
          // Call reset() to attempt to re-render the segment and retry loading
          () => reset()
        }
      >
        Try Again
      </Button>
    </div>
  );
}