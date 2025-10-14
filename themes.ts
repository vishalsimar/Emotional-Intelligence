export interface ThemeProperties {
    [key: string]: string;
}

export interface Theme {
    name: string;
    isDark: boolean;
    properties: ThemeProperties;
}

export const emotionColors = ['red', 'blue', 'purple', 'yellow', 'green', 'orange', 'slate', 'teal', 'indigo', 'stone', 'lime', 'rose', 'cyan', 'sky'];

const generateEmotionColors = (colorName: string, colorValue: string, hoverColorValue: string, ringColorValue: string, textValue: string, isDark: boolean) => {
    const opacity = isDark ? 0.15 : 0.1;
    const hoverOpacity = isDark ? 0.25 : 0.2;
    const borderOpacity = isDark ? 0.3 : 0.2;
    const hoverBorderOpacity = isDark ? 0.4 : 0.3;

    // Convert hex to RGB
    const rgb = colorValue.startsWith('#') ? `${parseInt(colorValue.slice(1, 3), 16)}, ${parseInt(colorValue.slice(3, 5), 16)}, ${parseInt(colorValue.slice(5, 7), 16)}` : colorValue;
    const hoverRgb = hoverColorValue.startsWith('#') ? `${parseInt(hoverColorValue.slice(1, 3), 16)}, ${parseInt(hoverColorValue.slice(3, 5), 16)}, ${parseInt(hoverColorValue.slice(5, 7), 16)}` : hoverColorValue;
    
    return {
        [`--color-${colorName}-bg`]: `rgba(${rgb}, ${opacity})`,
        [`--color-${colorName}-border`]: `rgba(${rgb}, ${borderOpacity})`,
        [`--color-${colorName}-hover-bg`]: `rgba(${hoverRgb}, ${hoverOpacity})`,
        [`--color-${colorName}-hover-border`]: `rgba(${hoverRgb}, ${hoverBorderOpacity})`,
        [`--color-${colorName}-text`]: textValue,
        [`--color-${colorName}-ring`]: ringColorValue,
    };
};

const generateThemeColors = (isDark: boolean, palette: { [key: string]: { base: string, hover: string, text: string, ring: string } }): ThemeProperties => {
    let colors: ThemeProperties = {};
    for (const colorName of emotionColors) {
        const p = palette[colorName];
        Object.assign(colors, generateEmotionColors(colorName, p.base, p.hover, p.ring, p.text, isDark));
    }
    return colors;
};

const defaultLightPalette = {
    red:    { base: '239, 68, 68',   hover: '239, 68, 68',   text: '#ef4444', ring: '#f87171' },
    blue:   { base: '59, 130, 246',  hover: '59, 130, 246',  text: '#3b82f6', ring: '#60a5fa' },
    purple: { base: '168, 85, 247',  hover: '168, 85, 247',  text: '#a855f7', ring: '#c084fc' },
    yellow: { base: '234, 179, 8',   hover: '234, 179, 8',   text: '#eab308', ring: '#fde047' },
    green:  { base: '34, 197, 94',   hover: '34, 197, 94',   text: '#22c55e', ring: '#4ade80' },
    orange: { base: '249, 115, 22',  hover: '249, 115, 22',  text: '#f97316', ring: '#fb923c' },
    slate:  { base: '100, 116, 139', hover: '100, 116, 139', text: '#64748b', ring: '#94a3b8' },
    teal:   { base: '20, 184, 166',  hover: '20, 184, 166',  text: '#14b8a6', ring: '#2dd4bf' },
    indigo: { base: '99, 102, 241',  hover: '99, 102, 241',  text: '#6366f1', ring: '#818cf8' },
    stone:  { base: '120, 113, 108', hover: '120, 113, 108', text: '#78716c', ring: '#a8a29e' },
    lime:   { base: '132, 204, 22',  hover: '132, 204, 22',  text: '#84cc16', ring: '#a3e635' },
    rose:   { base: '244, 63, 94',   hover: '244, 63, 94',   text: '#f43f5e', ring: '#fb7185' },
    cyan:   { base: '6, 182, 212',   hover: '6, 182, 212',   text: '#06b6d4', ring: '#22d3ee' },
    sky:    { base: '14, 165, 233',  hover: '14, 165, 233',  text: '#0ea5e9', ring: '#38bdf8' },
};

const defaultDarkPalette = {
    red:    { base: '220, 38, 38',   hover: '220, 38, 38',   text: '#f87171', ring: '#f87171' },
    blue:   { base: '59, 130, 246',  hover: '59, 130, 246',  text: '#60a5fa', ring: '#60a5fa' },
    purple: { base: '168, 85, 247',  hover: '168, 85, 247',  text: '#c084fc', ring: '#c084fc' },
    yellow: { base: '234, 179, 8',   hover: '234, 179, 8',   text: '#facc15', ring: '#fde047' },
    green:  { base: '34, 197, 94',   hover: '34, 197, 94',   text: '#4ade80', ring: '#4ade80' },
    orange: { base: '249, 115, 22',  hover: '249, 115, 22',  text: '#fb923c', ring: '#fb923c' },
    slate:  { base: '100, 116, 139', hover: '100, 116, 139', text: '#94a3b8', ring: '#94a3b8' },
    teal:   { base: '20, 184, 166',  hover: '20, 184, 166',  text: '#2dd4bf', ring: '#2dd4bf' },
    indigo: { base: '99, 102, 241',  hover: '99, 102, 241',  text: '#818cf8', ring: '#818cf8' },
    stone:  { base: '120, 113, 108', hover: '120, 113, 108', text: '#a8a29e', ring: '#a8a29e' },
    lime:   { base: '132, 204, 22',  hover: '132, 204, 22',  text: '#a3e635', ring: '#a3e635' },
    rose:   { base: '244, 63, 94',   hover: '244, 63, 94',   text: '#fb7185', ring: '#fb7185' },
    cyan:   { base: '6, 182, 212',   hover: '6, 182, 212',   text: '#22d3ee', ring: '#22d3ee' },
    sky:    { base: '14, 165, 233',  hover: '14, 165, 233',  text: '#38bdf8', ring: '#38bdf8' },
};

const roseQuartzPalette = {
    red:    { base: '244, 63, 94',   hover: '244, 63, 94',   text: '#f43f5e', ring: '#fb7185' },
    blue:   { base: '96, 165, 250',  hover: '96, 165, 250',  text: '#60a5fa', ring: '#93c5fd' },
    purple: { base: '192, 132, 252', hover: '192, 132, 252', text: '#c084fc', ring: '#d8b4fe' },
    yellow: { base: '252, 211, 77',  hover: '252, 211, 77',  text: '#facc15', ring: '#fde047' },
    green:  { base: '74, 222, 128',  hover: '74, 222, 128',  text: '#4ade80', ring: '#86efac' },
    orange: { base: '251, 146, 60',  hover: '251, 146, 60',  text: '#fb923c', ring: '#fcd34d' },
    slate:  { base: '148, 163, 184', hover: '148, 163, 184', text: '#94a3b8', ring: '#cbd5e1' },
    teal:   { base: '45, 212, 191',  hover: '45, 212, 191',  text: '#2dd4bf', ring: '#5eead4' },
    indigo: { base: '129, 140, 248', hover: '129, 140, 248', text: '#818cf8', ring: '#a5b4fc' },
    stone:  { base: '168, 162, 158', hover: '168, 162, 158', text: '#a8a29e', ring: '#d6d3d1' },
    lime:   { base: '163, 230, 53',  hover: '163, 230, 53',  text: '#a3e635', ring: '#bef264' },
    rose:   { base: '251, 113, 133', hover: '251, 113, 133', text: '#fb7185', ring: '#fda4af' },
    cyan:   { base: '34, 211, 238',  hover: '34, 211, 238',  text: '#22d3ee', ring: '#67e8f9' },
    sky:    { base: '56, 189, 248',  hover: '56, 189, 248',  text: '#38bdf8', ring: '#7dd3fc' },
};

const oceanicPalette = defaultDarkPalette; // Can be customized further

const serenePalette = {
    red:    { base: '208, 135, 112', hover: '208, 135, 112', text: '#d08770', ring: '#d08770' },
    blue:   { base: '129, 161, 193', hover: '129, 161, 193', text: '#81a1c1', ring: '#81a1c1' },
    purple: { base: '180, 142, 173', hover: '180, 142, 173', text: '#b48ead', ring: '#b48ead' },
    yellow: { base: '235, 203, 139', hover: '235, 203, 139', text: '#ebcb8b', ring: '#ebcb8b' },
    green:  { base: '163, 190, 140', hover: '163, 190, 140', text: '#a3be8c', ring: '#a3be8c' },
    orange: { base: '208, 135, 112', hover: '208, 135, 112', text: '#d08770', ring: '#d08770' },
    slate:  { base: '216, 222, 233', hover: '216, 222, 233', text: '#4c566a', ring: '#d8dee9' },
    teal:   { base: '143, 188, 187', hover: '143, 188, 187', text: '#8fbcbb', ring: '#8fbcbb' },
    indigo: { base: '129, 161, 193', hover: '129, 161, 193', text: '#81a1c1', ring: '#81a1c1' },
    stone:  { base: '229, 233, 240', hover: '229, 233, 240', text: '#4c566a', ring: '#e5e9f0' },
    lime:   { base: '163, 190, 140', hover: '163, 190, 140', text: '#a3be8c', ring: '#a3be8c' },
    rose:   { base: '191, 97, 106',  hover: '191, 97, 106',  text: '#bf616a', ring: '#bf616a' },
    cyan:   { base: '136, 192, 208', hover: '136, 192, 208', text: '#88c0d0', ring: '#88c0d0' },
    sky:    { base: '136, 192, 208', hover: '136, 192, 208', text: '#88c0d0', ring: '#88c0d0' },
};

const evergreenPalette = {
    red:    { base: '191, 97, 106',  hover: '191, 97, 106',  text: '#bf616a', ring: '#bf616a' },
    blue:   { base: '129, 161, 193', hover: '129, 161, 193', text: '#81a1c1', ring: '#81a1c1' },
    purple: { base: '180, 142, 173', hover: '180, 142, 173', text: '#b48ead', ring: '#b48ead' },
    yellow: { base: '235, 203, 139', hover: '235, 203, 139', text: '#ebcb8b', ring: '#ebcb8b' },
    green:  { base: '163, 190, 140', hover: '163, 190, 140', text: '#a3be8c', ring: '#a3be8c' },
    orange: { base: '208, 135, 112', hover: '208, 135, 112', text: '#d08770', ring: '#d08770' },
    slate:  { base: '76, 86, 106',   hover: '76, 86, 106',   text: '#d8dee9', ring: '#d8dee9' },
    teal:   { base: '143, 188, 187', hover: '143, 188, 187', text: '#8fbcbb', ring: '#8fbcbb' },
    indigo: { base: '129, 161, 193', hover: '129, 161, 193', text: '#81a1c1', ring: '#81a1c1' },
    stone:  { base: '76, 86, 106',   hover: '76, 86, 106',   text: '#d8dee9', ring: '#d8dee9' },
    lime:   { base: '163, 190, 140', hover: '163, 190, 140', text: '#a3be8c', ring: '#a3be8c' },
    rose:   { base: '191, 97, 106',  hover: '191, 97, 106',  text: '#bf616a', ring: '#bf616a' },
    cyan:   { base: '136, 192, 208', hover: '136, 192, 208', text: '#88c0d0', ring: '#88c0d0' },
    sky:    { base: '136, 192, 208', hover: '136, 192, 208', text: '#88c0d0', ring: '#88c0d0' },
};

const sunsetPalette = {
    red:    { base: '255, 137, 137', hover: '255, 137, 137', text: '#ff8989', ring: '#ff8989' },
    blue:   { base: '119, 181, 254', hover: '119, 181, 254', text: '#77b5fe', ring: '#77b5fe' },
    purple: { base: '179, 157, 219', hover: '179, 157, 219', text: '#b39ddb', ring: '#b39ddb' },
    yellow: { base: '249, 215, 126', hover: '249, 215, 126', text: '#f9d77e', ring: '#f9d77e' },
    green:  { base: '110, 227, 208', hover: '110, 227, 208', text: '#6ee3d0', ring: '#6ee3d0' },
    orange: { base: '255, 171, 153', hover: '255, 171, 153', text: '#ffab99', ring: '#ffab99' },
    slate:  { base: '167, 180, 202', hover: '167, 180, 202', text: '#a7b4ca', ring: '#a7b4ca' },
    teal:   { base: '92, 225, 230',  hover: '92, 225, 230',  text: '#5ce1e6', ring: '#5ce1e6' },
    indigo: { base: '159, 168, 218', hover: '159, 168, 218', text: '#9fa8da', ring: '#9fa8da' },
    stone:  { base: '189, 189, 189', hover: '189, 189, 189', text: '#bdbdbd', ring: '#bdbdbd' },
    lime:   { base: '220, 237, 200', hover: '220, 237, 200', text: '#dcedc8', ring: '#dcedc8' },
    rose:   { base: '244, 143, 177', hover: '244, 143, 177', text: '#f48fb1', ring: '#f48fb1' },
    cyan:   { base: '128, 222, 234', hover: '128, 222, 234', text: '#80deea', ring: '#80deea' },
    sky:    { base: '144, 202, 249', hover: '144, 202, 249', text: '#90caf9', ring: '#90caf9' },
};


export const themes: { [key: string]: Theme } = {
    'default-light': {
        name: 'Default Light',
        isDark: false,
        properties: {
            '--bg-primary': '#f1f5f9',
            '--bg-secondary': '#ffffff',
            '--bg-tertiary': '#f8fafc',
            '--bg-hover': '#f1f5f9',
            '--text-primary': '#1e293b',
            '--text-secondary': '#64748b',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#e2e8f0',
            '--border-secondary': '#cbd5e1',
            '--accent-primary': '#8b5cf6',
            '--accent-primary-hover': '#7c3aed',
            '--accent-ring': '#a78bfa',
            '--shadow-color': 'rgba(0,0,0,0.1)',
            ...generateThemeColors(false, defaultLightPalette)
        },
    },
    'serene': {
        name: 'Serene',
        isDark: false,
        properties: {
            '--bg-primary': '#f5f7fa',
            '--bg-secondary': '#ffffff',
            '--bg-tertiary': '#eef2f7',
            '--bg-hover': '#eef2f7',
            '--text-primary': '#434c5e',
            '--text-secondary': '#6b7280',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#e2e8f0',
            '--border-secondary': '#cbd5e1',
            '--accent-primary': '#81a1c1',
            '--accent-primary-hover': '#5e81ac',
            '--accent-ring': '#88c0d0',
            '--shadow-color': 'rgba(45, 55, 72, 0.1)',
            ...generateThemeColors(false, serenePalette)
        },
    },
    'rose-quartz': {
        name: 'Rose Quartz',
        isDark: false,
        properties: {
            '--bg-primary': '#fdf2f8',
            '--bg-secondary': '#fffbff',
            '--bg-tertiary': '#fce7f3',
            '--bg-hover': '#fce7f3',
            '--text-primary': '#831843',
            '--text-secondary': '#9c7785',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#fbcfe8',
            '--border-secondary': '#f9a8d4',
            '--accent-primary': '#db2777',
            '--accent-primary-hover': '#be185d',
            '--accent-ring': '#f472b6',
            '--shadow-color': 'rgba(131, 24, 67, 0.1)',
            ...generateThemeColors(false, roseQuartzPalette)
        },
    },
    'default-dark': {
        name: 'Default Dark',
        isDark: true,
        properties: {
            '--bg-primary': '#020617',
            '--bg-secondary': '#0f172a',
            '--bg-tertiary': '#1e293b',
            '--bg-hover': '#1e293b',
            '--text-primary': '#e2e8f0',
            '--text-secondary': '#94a3b8',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#334155',
            '--border-secondary': '#475569',
            '--accent-primary': '#a78bfa',
            '--accent-primary-hover': '#c084fc',
            '--accent-ring': '#c084fc',
            '--shadow-color': 'rgba(0,0,0,0.5)',
            ...generateThemeColors(true, defaultDarkPalette)
        },
    },
    'evergreen': {
        name: 'Evergreen',
        isDark: true,
        properties: {
            '--bg-primary': '#1a201c',
            '--bg-secondary': '#222b25',
            '--bg-tertiary': '#2d3a31',
            '--bg-hover': '#2d3a31',
            '--text-primary': '#e5e9f0',
            '--text-secondary': '#8899a6',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#3a4a3f',
            '--border-secondary': '#4a5e52',
            '--accent-primary': '#a3be8c',
            '--accent-primary-hover': '#b4d0a1',
            '--accent-ring': '#a3be8c',
            '--shadow-color': 'rgba(0,0,0,0.5)',
            ...generateThemeColors(true, evergreenPalette)
        },
    },
     'sunset': {
        name: 'Sunset',
        isDark: true,
        properties: {
            '--bg-primary': '#202030',
            '--bg-secondary': '#2a2a40',
            '--bg-tertiary': '#353550',
            '--bg-hover': '#353550',
            '--text-primary': '#f5e6e8',
            '--text-secondary': '#c9bec9',
            '--text-on-accent': '#202030',
            '--border-primary': '#404060',
            '--border-secondary': '#505070',
            '--accent-primary': '#ff8c70',
            '--accent-primary-hover': '#ffa080',
            '--accent-ring': '#ff8c70',
            '--shadow-color': 'rgba(0,0,0,0.5)',
            ...generateThemeColors(true, sunsetPalette)
        },
    },
    'oceanic': {
        name: 'Oceanic',
        isDark: true,
        properties: {
            '--bg-primary': '#0c1425',
            '--bg-secondary': '#121d33',
            '--bg-tertiary': '#1a2a47',
            '--bg-hover': '#1a2a47',
            '--text-primary': '#e0f2fe',
            '--text-secondary': '#9cb3c9',
            '--text-on-accent': '#ffffff',
            '--border-primary': '#294065',
            '--border-secondary': '#395686',
            '--accent-primary': '#1fb2a6',
            '--accent-primary-hover': '#26d3c5',
            '--accent-ring': '#26d3c5',
            '--shadow-color': 'rgba(0,0,0,0.5)',
            ...generateThemeColors(true, oceanicPalette)
        },
    }
};