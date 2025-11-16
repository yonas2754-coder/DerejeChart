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
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
} from '@fluentui/react-components';
import {
    Home24Regular,
    ClipboardTaskListLtr24Regular,
    ChartMultipleRegular,
    Navigation24Regular,
    Dismiss24Regular,
    SignOut24Regular,
} from '@fluentui/react-icons';

// =======================
// 1. STYLES (CORRECTED)
// =======================
const useStyles = makeStyles({
    // Renamed headerContainer to appHeader for standard clarity
    appHeader: { 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        // Retain the visual branding color
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
    // Renamed navLinks to desktopNav for clarity
    desktopNav: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        '@media (max-width: 900px)': {
            display: 'none',
        },
    },
    navButton: {
        // ... (styles omitted for brevity)
    },
    active: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: tokens.colorNeutralForeground1Static,
    },
    // Renamed hamburger to mobileMenuToggle
    mobileMenuToggle: {
        display: 'none',
        '@media (max-width: 900px)': {
            display: 'flex',
            color: tokens.colorNeutralForeground1Static,
            ':hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
        },
    },
    profileMenu: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
    },
    // --- DRAWER STYLES ---
    drawerBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
        paddingTop: tokens.spacingVerticalM,
    },
    /**
     * **FIXED:** Added missing style definition for drawerProfile.
     */
    drawerProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
        marginBottom: tokens.spacingVerticalM,
    },
    /**
     * **FIXED:** Added missing style definition for drawerDivider.
     */
    drawerDivider: {
        height: '1px',
        backgroundColor: tokens.colorNeutralStroke2,
        ...shorthands.margin('0', '0', tokens.spacingVerticalM, '0'),
    },
    drawerLink: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        textDecorationLine: 'none',
        color: tokens.colorNeutralForeground1,
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    drawerActive: {
        backgroundColor: tokens.colorBrandBackgroundSelected,
        color: tokens.colorNeutralForegroundOnBrand,
        ':hover': {
            backgroundColor: tokens.colorBrandBackgroundSelected, // keep same color on hover when active
        },
    },
});


// =======================
// 2. TYPES
// =======================

/**
 * Defines the structure for authenticated user data.
 */
interface IAuthUser {
    name?: string | null; 
    email?: string | null;
    image?: string | null;
}

/**
 * Defines the structure for a primary navigation link.
 */
interface INavItem {
    title: string;
    href: string;
    icon: React.ReactElement;
}

/**
 * Defines the props for the TTNavBar component.
 */
interface ITTNavBarProps {
    user?: IAuthUser;
    /** Callback function to execute when the user initiates sign out. */
    onSignOut: () => void; 
}


// =======================
// 3. COMPONENT
// =======================

/**
 * TTNavBar Component
 * Renders the primary application header, including navigation, 
 * user profile menu, and a mobile-friendly drawer.
 */
export default function TTNavBar({ user, onSignOut }: ITTNavBarProps) {
    const styles = useStyles();
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const navItems: INavItem[] = [
        { title: 'New Ticket', href: '/Form', icon: <Home24Regular /> },
        { title: 'Ticket Results', href: '/TTResultsTable', icon: <ClipboardTaskListLtr24Regular /> },
        { title: 'Task Charts', href: '/TTchart', icon: <ChartMultipleRegular /> },
    ];

    const closeDrawer = () => setIsDrawerOpen(false);

    const handleSignOut = () => {
        closeDrawer();
        onSignOut();
    };

    const getInitials = (name?: string) => {
        if (!name) return '';
        const names = name.split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    };

    const avatarInitials = getInitials(user?.name ?? '');

    return (
        <>
            {/* Header */}
            <header className={styles.appHeader}>
                <div className={styles.topBar}>
                    
                    {/* Logo and Application Title */}
                    <div className={styles.logoArea}>
                        <img src="/photoDagm3.png" alt="Ethio Telecom Logo" />
                        <Text weight="semibold" size={400}>📡 FSAS&S Section</Text>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className={styles.desktopNav}>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <Button
                                    appearance="transparent"
                                    icon={item.icon}
                                    className={mergeClasses(styles.navButton, pathname === item.href && styles.active)}
                                >
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    {/* Right side: Profile Menu & Mobile Toggle */}
                    <div className={styles.profileMenu}>
                        
                        {/* Profile Dropdown (Desktop) */}
                        <Tooltip content={user?.name || 'Guest User'} relationship="label">
                            <Menu>
                                <MenuTrigger>
                                    <Button appearance="transparent" shape="circular" aria-label="User menu">
                                        {user?.image ? (
                                            <Avatar image={{ src: user.image }} size={32} />
                                        ) : (
                                            <Avatar name={avatarInitials} size={32} />
                                        )}
                                    </Button>
                                </MenuTrigger>
                                <MenuPopover>
                                    <MenuList>
                                        <MenuItem icon={<SignOut24Regular />} onClick={handleSignOut}>
                                            Sign Out
                                        </MenuItem>
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        </Tooltip>

                        {/* Mobile Menu Toggle */}
                        <Button
                            appearance="transparent"
                            icon={<Navigation24Regular />}
                            className={styles.mobileMenuToggle}
                            onClick={() => setIsDrawerOpen(true)}
                            aria-label="Open navigation menu"
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
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
                        📡 FSAS&S Section
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody className={styles.drawerBody}>
                    {/* Profile section in drawer */}
                    <div className={styles.drawerProfile}>
                        {user?.image ? (
                            <Avatar image={{ src: user.image }} size={40} />
                        ) : (
                            <Avatar name={avatarInitials} size={40} />
                        )}
                        <Text weight="semibold">{user?.name || 'Guest'}</Text>
                    </div>

                    <div className={styles.drawerDivider} />

                    {/* Navigation Links */}
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={mergeClasses(styles.drawerLink, pathname === item.href && styles.drawerActive)}
                            onClick={closeDrawer}
                        >
                            {item.icon}
                            {item.title}
                        </Link>
                    ))}

                    <div className={styles.drawerDivider} />

                    {/* Sign Out Button (Styled to look like a link) */}
                    <Button
                        appearance="transparent"
                        icon={<SignOut24Regular />}
                        className={styles.drawerLink}
                        onClick={handleSignOut}
                        style={{ justifyContent: 'flex-start' }}
                    >
                        Sign Out
                    </Button>
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