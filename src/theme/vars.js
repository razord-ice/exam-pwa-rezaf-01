export const BREAKPOINTS = {
    xs: 0,
    xm: 480, // reminder to review or delete this later
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1280,
};

export const COLORS = {
    primary: {
        50: '#EAEDFF',
        100: '#BFC8FF',
        200: '#A0AEFF',
        300: '#7489FE',
        400: '#5972FE',
        500: '#304FFE',
        600: '#2C48E7',
        700: '#2238B4',
        800: '#1A2B8C',
        900: '#14216B',
        get DEFAULT() {
            return this[500];
        },
    },
    secondary: {
        50: '#F0EBFC',
        100: '#C4B1F1',
        200: '#784DD0',
        300: '#643BB5',
        400: '#4D2F82',
        500: '#2C1457',
        get DEFAULT() {
            return this[400];
        },
    },
    neutral: {
        50: '#EBECEE',
        100: '#C1C4C9',
        150: '#A3A8AF',
        200: '#A3A8AF',
        250: '#515A69',
        300: '#79808A',
        350: '#2B3544',
        400: '#5F6774',
        500: '#374151',
        600: '#323B4A',
        700: '#272E3A',
        800: '#1E242D',
        900: '#171B22',
        white: '#FFFFFF',
        black: '#000000',
        get DEFAULT() {
            return this[500];
        },
    },
    green: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B',
        get DEFAULT() {
            return this[500];
        },
    },
    yellow: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
        get DEFAULT() {
            return this[500];
        },
    },
    red: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
        get DEFAULT() {
            return this[500];
        },
    },
};
export const LINE_HEIGHT = {
    xs: '12px',
    sm: '16px',
    base: '20px',
    lg: '24px',
    xl: '28px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '36px',
    '5xl': '40px',
    '6xl': '64px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
    '10xl': '160px',
};
export const FONT_SIZE = {
    xs: '10px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '30px',
    '5xl': '36px',
    '6xl': '48px',
    '7xl': '60px',
    '8xl': '72px',
    '9xl': '96px',
    '10xl': '128px',
};
export const FONT_FAMILY = {
    sans: ['var(--font-inter)'],
    'pwa-default': ['var(--font-pwa-default_font)', 'var(--font-inter)'],
    'pwa-heading': ['var(--font-pwa-heading_font)', 'var(--font-inter)'],
};
export const SPACING = {
    'space-2': '2px',
    'space-4': '4px',
    'space-6': '6px',
    'space-8': '8px',
    'space-12': '12px',
    'space-16': '16px',
    'space-20': '20px',
    'space-24': '24px',
    'space-32': '32px',
    'space-40': '40px',
    'space-48': '48px',
    'space-64': '64px',
    'space-80': '80px',
    'space-96': '96px',
    'space-128': '128px',
};

export const ZINDEX = {
    'backdrop-loader': 1300,
    'scroll-to-top': 1099,
    toast: 1202,
    'backdrop-dialog': 1200,
    dialog: 1201,
    'backdrop-drawer': 1150,
    drawer: 1151,
};

export default {};
