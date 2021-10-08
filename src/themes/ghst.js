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
            drop: 'rgb(238, 232, 170)'
        },
        accounts: {
            color1: '#E76F51',
            color2: '#2A9D8F',
            color3: '#D00000',
            color4: '#8338EC',
            color5: '#000000',
            color6: '#E500A4',
            color7: '#8AC926',
            color8: '#5b6d5b',
            color9: '#161d6f',
            color10: '#219EBC'
        },
        customColors: {
            lightGray: '#9A9EAA',
            grayBorder: '#C3C5CB',
            gray: '#94969a'
        },
        haunt: {
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