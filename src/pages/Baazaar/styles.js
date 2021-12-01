import { alpha } from '@mui/system';

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    baazaar: {
        padding: 24,
        width: 'calc(100vw + 24px)'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

const baazaarBodyStyles = makeStyles( theme => ({
    baazaarBody: {
        padding: 30
    },
    pagination: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '& nav': {
            marginTop: 15,
            fontSize: '1.2rem'
        }
    },
    warning: {
        marginBottom: '15px'
    },
    noGoods: {
        fontSize: "1rem"
    }
}));

const baazaarItemStyles = makeStyles( theme => ({
    baazaarItem: {
        background: theme.palette.background.paper,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.palette.customColors.grayBorder,
        padding: 16,
        borderRadius: 8,
        '&.common': { borderColor: theme.palette.rarity.common },
        '&.uncommon': { borderColor: theme.palette.rarity.uncommon },
        '&.rare': { borderColor: theme.palette.rarity.rare },
        '&.legendary': { borderColor: theme.palette.rarity.legendary },
        '&.mythical': { borderColor: theme.palette.rarity.mythical },
        '&.godlike': { borderColor: theme.palette.rarity.godlike }
    },
    itemRarity: {
        width: '100%',
        display: 'block',
        textAlign: 'center',
        fontSize: '.625rem',
        fontWeight: 500,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        lineHeight: '.82rem',
        marginBottom: 12,
        '&.common': { color: theme.palette.rarity.common },
        '&.uncommon': { color: theme.palette.rarity.uncommon },
        '&.rare': { color: theme.palette.rarity.rare },
        '&.legendary': { color: theme.palette.rarity.legendary },
        '&.mythical': { color: theme.palette.rarity.mythical },
        '&.godlike': { color: theme.palette.rarity.godlike }
    },
    itemName: {
        fontWeight: 500,
        height: 32,
        fontSize: '.875rem',
        lineHeight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 12
    },
    itemStats: {
        display: 'block',
        fontSize: '.625rem',
        lineHeight: '.82rem',
        textAlign: 'center',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: 4
    },
    quantityAndSeller: {
        display: 'block',
        fontSize: '.625rem',
        lineHeight: '.82rem',
        textAlign: 'center',
        marginBottom: 20,
        '& > *': {
            display: 'inline'
        }
    },
    itemImg: {
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2px',
        marginBottom: 16,
        '& > img': {
            maxHeight: 100
        }
    },
    price: {
        maxWidth: '100%',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        padding: '3px 0',
        marginBottom: 8
    },
    priceText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 700,
        lineHeight: '1.476rem',
        fontSize: '1.125rem'
    },
    priceImg: {
        marginTop: 2,
        '& img': {
            width: 18,
            height: 18,
            marginRight: 7
        }
    },
    goToShopWrap: {
        display: 'flex',
        justifyContent: 'center'
    },
    goToShop: {
        borderRadius: 4,
        fontSize: '.875rem',
        boxShadow: 'none',
        letterSpacing: '.8px',
        background: alpha(theme.palette.customColors.lightGray, .24),
        '&:hover': {
            background: alpha(theme.palette.customColors.lightGray, .14),
        }
    }
}));

const paginationStyles = makeStyles( theme => ({
    wrap: {
        display: 'flex',
        marginTop: 20
    },
    button: {
        height: 36
    },
    current: {
        padding: '0 25px',
        height: 36,
        lineHeight: '36px',
        textAlign: 'center'
    }
}));

const baazaarSortingBodyStyles = makeStyles( theme => ({
    baazaarBody: {
        padding: 30
    },
    baazaarListItems: {
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill,minmax(192px,1fr))',
        gridGap: 12,
        width: '100%'
    },
    pagination: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '& nav': {
            marginTop: 15,
            fontSize: '1.2rem'
        }
    },
    warning: {
        marginBottom: '15px'
    },
    noGoods: {
        fontSize: "1rem"
    },
    ghstFooter: {
        marginTop: 5,
        marginBottom: 15
    },
    ghst: {
        width: 20
    },
    price: {
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        '& > div': {
            marginTop: 3
        }
    },
    carousel: {
        '& .carousel:not(.carousel-slider)': {
            display: 'none'
        },
        '& .control-dots': {
            display: 'none'
        },
        '& .carousel .slider-wrapper': {
            paddingTop: 10
        },
        '& .carousel-status': {
            top: -17
        }
    }
}));

export {
    styles as default,
    baazaarBodyStyles,
    baazaarItemStyles,
    paginationStyles,
    baazaarSortingBodyStyles
}
