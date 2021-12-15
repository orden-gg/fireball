import classNames from 'classnames';
import React from 'react';
import { ReactComponent as Placeholder } from '../../../assets/images/svgs/ghst.svg';

export default function GuildLogo({logo, className}) {

    return logo ? 
        <img src={logo} className={ className }></img> :
        <Placeholder className={ classNames(className, 'placeholder' ) } />
}
