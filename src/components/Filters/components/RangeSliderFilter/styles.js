import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
    },
    textFiled: {
        '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        '& input[type=number]': {
            MozAppearance: 'textfield'
        },
    },
    title: {
        marginRight: 8
    },
    tooltipInner: {
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default styles;
