import { createTheme } from "@mui/material";

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
            default: '#2c2f36'
        },
        text: {
            primary: '#fff'
        },
        rarity: {
            common: 'rgb(128, 100, 255)',
            uncommon: 'rgb(51, 186, 204)',
            rare: 'rgb(89, 188, 255)',
            legendary: 'rgb(255, 195, 107)',
            mythical: 'rgb(255, 150, 255)',
            godlike: 'rgb(81, 255, 168)',
            drop: 'rgb(0, 0, 0)'
        },
        realm: {
            // humble: '#320fc7',
            humble: '#6c4bfb',
            reasonable: '#119773',
            spacious: '#8840b7',
            partner: '#bf91ff'
        },
        alchemica: {
            fud: 'rgb(0, 255, 0)',
            fomo: 'rgb(255, 30, 0)',
            alpha: 'rgb(55, 255, 255)',
            kek: '#fa34f3'
        },
        customColors: {
            lightGray: '#9A9EAA',
            grayBorder: '#C3C5CB',
            gray: '#94969a'
        },
        haunts: {
            h1: 'rgb(193, 95, 255)',
            h2: 'rgb(0, 224, 199)'
        }
    },
    typography: {
        fontFamily: "'Fira Code', monospace"
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1640
        }
    },
    shape: {
        borderRadiusSmaller: 2
    }
});