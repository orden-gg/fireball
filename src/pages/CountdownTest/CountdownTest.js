import React from 'react';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import Countdown from '../../components/Countdown/Countdown';

export default function CountdownTest() {
    const date = DateTime.local(2021, 10, 11, 20, 17, { zone: 'utc' });

    return (
        <Box maxWidth={600} margin='auto' padding={4}>
            <Countdown date={date} format='dd:hh:mm:ss' />
        </Box>
    );
}
