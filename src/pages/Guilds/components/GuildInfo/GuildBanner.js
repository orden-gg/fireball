import React, { useContext } from 'react';
import { guildBanner } from '../../styles';
// import ScrollAnimation from 'react-animate-on-scroll';
// import guildUtils from '../../../../../utils/guildUtils';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import { GuildsContext } from '../../../../contexts/GuildsContext';

export default function GuildBanner() {
    const classes = guildBanner();
    const { guildData, guildGotchis, Placeholder } = useContext(GuildsContext);

    const getImage = (guild) => {
        if(guild.logo) return <img src={ guild.logo } className={classes.guildLogoImage} />

        return <Placeholder className={classNames(classes.guildLogoImage, classes.guildLogoPlaceholder)} />
    }

    console.log(guildData.banner.length, classes.guildBannerIs);

    return (
        <Box className={classNames(classes.guildBanner, guildData.banner.length && classes.guildBannerIs ) } style={{ backgroundImage: `url(${guildData.banner})` }}>
            <div className={classes.guildBannerInner}>
                <Typography className={classNames(classes.guildMembers, classes.guildBannerText)}>
                    Members
                    <span>
                        {guildData.members?.length ? `(${guildData.members.length})` : '...'}
                    </span>
                </Typography>
                
                <div className={classes.guildLogo}>{getImage(guildData)}</div>

                <Typography className={classNames(classes.guildGotchis, classes.guildBannerText)}>
                    <span>
                        {guildGotchis?.length ? `(${guildGotchis.length})` : '...'}
                    </span>
                    Gotchis
                </Typography>
            </div>
            <Typography component='h1' className={classes.guildName}>{guildData?.name}</Typography>
        </Box>
    );
}
