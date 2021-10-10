import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    mainTitle: {
        textAlign: 'center',
        fontSize: '28px !important',
        marginBottom: '30px !important',
        [theme.breakpoints.up('md')]: {
            fontSize: '34px !important',
            marginBottom: '50px !important'
        }
    },
    teamMember: {
        width: '100%',
        height: '100%',
        color: `${theme.palette.common.white} !important`,
        borderWidth: 0,
        background: 'transparent',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        boxShadow: 'none',
        // '& .gotchi-body': {
        //     filter: 'drop-shadow( 0px 0px 10px rgba(255,255,209,.5))',

        //     '&:hover': {
        //         textDecoration: 'none',
        //         filter: 'drop-shadow( 0px 0px 5px rgba(255,255,209,.2))'
        //     }
        // }
    },
    aavegotchiName: {
        fontSize: '18px !important',
        textAlign: 'center',
        padding: '25px 0 0',
        [theme.breakpoints.up('md')]: {
            fontSize: '25px !important',
            padding: '25px 0 10px',
        }
    },
    aavegotchiYouName: {
        color: theme.palette.primary.main,
        fontWeight: 500
    },
    aavegotchiAvatar: {
        width: '150px !important',
        height: '150px !important',
        '& > img': {
            width: 100,
            height: 100
        }
    }
}));