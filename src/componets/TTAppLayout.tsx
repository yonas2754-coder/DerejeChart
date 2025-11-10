'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  makeStyles,
  tokens,
  shorthands,
  mergeClasses,
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  Text,
} from '@fluentui/react-components';
import {
  Home24Regular,
  ClipboardTaskListLtr24Regular,
  ChartMultipleRegular,
  Navigation24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons';

// ========================================
// 🔹 Styles (SharePoint-like, modern look)
// ========================================
const useStyles = makeStyles({
  headerContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: '#A5D166',
    boxShadow: tokens.shadow16,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalXXL),
    '@media (max-width: 900px)': {
      ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    },
  },

  logoArea: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: '18px',
    color: tokens.colorNeutralForeground1Static,
    gap: tokens.spacingHorizontalM,
    '& img': {
      height: '36px',
      width: 'auto',
      objectFit: 'contain',
    },
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },

  navButton: {
    fontWeight: tokens.fontWeightSemibold,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1Static,
    transition: 'background 0.2s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.15)',
      transform: 'translateY(-1px)',
    },
  },

  active: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: tokens.colorNeutralForeground1Static,
  },

  hamburger: {
    display: 'none',
    '@media (max-width: 900px)': {
      display: 'flex',
      color: tokens.colorNeutralForeground1Static,
      ':hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
    },
  },

  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
  },

  drawerLink: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
    textDecoration: 'none',
    fontWeight: tokens.fontWeightSemibold,
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      transform: 'translateX(4px)',
    },
  },

  drawerActive: {
    backgroundColor: '#A5D166',
    color: tokens.colorNeutralForegroundInverted,
    ':hover': {
      backgroundColor: '#9CCB5E',
    },
  },
});

// ========================================
// 🔹 Component
// ========================================
export default function TTNavBar() {
  const styles = useStyles();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const navItems = [
    { title: 'New Ticket', href: '/', icon: <Home24Regular /> },
    { title: 'Ticket Results', href: '/TTResultsTable', icon: <ClipboardTaskListLtr24Regular /> },
    { title: 'Task Charts', href: '/TTchart', icon: <ChartMultipleRegular /> },
  ];

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.topBar}>
          <div className={styles.logoArea}>
            <img src="/photoDagm3.png" alt="Ethio Telecom Logo" />
            <Text weight="semibold" size={400}>
              📡 Ethio Telecom TT Portal
            </Text>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Button
                  appearance="transparent"
                  icon={item.icon}
                  className={mergeClasses(
                    styles.navButton,
                    pathname === item.href && styles.active
                  )}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            appearance="transparent"
            icon={<Navigation24Regular />}
            className={styles.hamburger}
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
          />
        </div>
      </header>

      {/* Drawer Menu for Mobile */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={(_, data) => setIsDrawerOpen(data.open)}
        position="end"
        size="small"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                onClick={closeDrawer}
                aria-label="Close menu"
              />
            }
          >
            📡 Ethio Telecom TT Portal
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody className={styles.drawerBody}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={mergeClasses(
                styles.drawerLink,
                pathname === item.href && styles.drawerActive
              )}
              onClick={closeDrawer}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </DrawerBody>

        <DrawerFooter>
          <Button appearance="secondary" onClick={closeDrawer} style={{ width: '100%' }}>
            Close Menu
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
