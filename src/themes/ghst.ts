import { createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        rarity: {
            common: string;
            uncommon: string;
            rare: string;
            legendary: string;
            mythical: string;
            godlike: string;
            drop: string;
            golden: string;
        };
        realm: {
            humble: string;
            reasonable: string;
            spacious: string;
            partner: string;
        };
        alchemica: {
            fud: string;
            fomo: string;
            alpha: string;
            kek: string;
            gltr: string;
        };
        customColors: {
            lightGray: string;
            grayBorder: string;
            gray: string;
            light: string;
        },
        haunts: {
            h1: string;
            h2: string;
        }
    }

    interface Palette {
        rarity: {
            common: string;
            uncommon: string;
            rare: string;
            legendary: string;
            mythical: string;
            godlike: string;
            drop: string;
            golden: string;
        };
        realm: {
            humble: string;
            reasonable: string;
            spacious: string;
            partner: string;
        };
        alchemica: {
            fud: string;
            fomo: string;
            alpha: string;
            kek: string;
            gltr: string;
        };
        customColors: {
            lightGray: string;
            grayBorder: string;
            gray: string;
            light: string;
        },
        haunts: {
            h1: string;
            h2: string;
        }
    }

    interface TypeBackground {
        secondary: string;
    }
}

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme { }
}

export const theme = createTheme({
    palette: {
        common: {
            white: '#fff'
        },
        mode: 'dark',
        primary: {
            main: '#fd9af9'
        },
        secondary: {
            main: '#2c2f36',
            dark: '#212429'
        },
        background: {
            paper: '#343740',
            default: '#2c2f36',
            secondary: '#272a30'
        },
        text: {
            primary: '#fff'
        },
        rarity: {
            common: '#7257FF',
            uncommon: '#33bacc',
            rare: '#00C0FF',
            legendary: '#ffc36b',
            mythical: '#FF67FF',
            godlike: '#00E994',
            drop: 'rgb(0, 0, 0)',
            golden: '#ffc36b'
        },
        realm: {
            humble: '#6c4bfb',
            reasonable: '#119773',
            spacious: '#8840b7',
            partner: '#bf91ff'
        },
        alchemica: {
            fud: 'rgb(0, 255, 0)',
            fomo: '#F37721',
            alpha: 'rgb(55, 255, 255)',
            kek: '#fa34f3',
            gltr: '#ffc800'
        },
        customColors: {
            lightGray: '#9A9EAA',
            grayBorder: '#C3C5CB',
            gray: '#94969a',
            light: '#c1ad87'
        },
        haunts: {
            h1: '#591F96',
            h2: '#04608C'
        }
    },
    typography: {
        fontFamily: '\'Fira Code\', monospace'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1640,
            // @ts-ignore
            hd: 1920
        }
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'inherit'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontSize: '0.875rem',
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em'
                }
            }
        }
    }
});
