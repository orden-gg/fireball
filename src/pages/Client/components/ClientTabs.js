import React from 'react';
import { Box, Button } from '@mui/material';

import gotchiPlaceholder from '../../../assets/images/logo.png';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';

export default function ClientTabs({activeTab, setActiveTab, gotchisLength, warehouseLength, ticketsLength}) {

    return (
        <Box display='flex' alignItems='flex-start' flexWrap='wrap'>
            <Button
                disabled={!gotchisLength}
                variant={activeTab === 'gotchis' ? 'contained' : 'outlined'}
                size='large'
                startIcon={
                    <img src={gotchiPlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${gotchisLength}]`}
                sx={{ marginRight: '12px' }}
                onClick={() => setActiveTab('gotchis')}
            >
                Gotchis
            </Button>

            <Button
                disabled={!warehouseLength}
                variant={activeTab === 'warehouse' ? 'contained' : 'outlined'}
                size='large'
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${warehouseLength}]`}
                sx={{ marginRight: '12px' }}
                onClick={() => setActiveTab('warehouse')}
            >
                Warehouse
            </Button>

            <Button
                disabled={!ticketsLength}
                variant={activeTab === 'tickets' ? 'contained' : 'outlined'}
                size='large'
                startIcon={
                    <img src={ticketsPlaceholder} alt='gotchi' width={27} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${ticketsLength}]`}
                onClick={() => setActiveTab('tickets')}
            >
                Tickets
            </Button>
        </Box>
    );
}