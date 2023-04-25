import { Navigate, Route, Routes } from 'react-router-dom';

import { GotchiTypeNames } from 'pages/Guilds/constants';

import { GuildGotchis } from './GuildGotchis/GuildGotchis';

export function GuildGotchisContainer() {
  return (
    <Routes>
      <Route path={GotchiTypeNames.Owned} element={<GuildGotchis type={GotchiTypeNames.Owned} />} />
      <Route path={GotchiTypeNames.Borrowed} element={<GuildGotchis type={GotchiTypeNames.Borrowed} />} />
      <Route path='*' element={<Navigate to={GotchiTypeNames.Owned} replace />} />
    </Routes>
  );
}
