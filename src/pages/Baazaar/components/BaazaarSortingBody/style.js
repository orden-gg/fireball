import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    baazaarBody: {
        padding: 30
    },
    baazaarListItems: {
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill,minmax(192px,1fr))',
        gridGap: 12,
        width: '100%'
    },
    baazaarListItem: {
        maxWidth: 192,
        margin: 'auto'
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
