// app/loading.tsx
"use client"; // <--- ADD THIS LINE

import * as React from 'react';
import { Spinner, makeStyles, tokens, Title2 } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalL,
  },
});

/**
 * Global Loading UI for Next.js App Router.
 * This will be shown while a route segment is loading data.
 */
export default function Loading(): React.ReactElement {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Fluent UI Spinner */}
      <Spinner size="huge" label="Loading content..." />
      <Title2>Preparing for you...</Title2>
    </div>
  );
}