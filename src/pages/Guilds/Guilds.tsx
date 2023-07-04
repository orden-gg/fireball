import { Navigate, Route, Routes } from 'react-router-dom';

import { Guild, GuildCreate, GuildEdit, GuildsPreview } from './routes';

export function Guilds() {
  return (
    <Routes>
      <Route path='create' element={<GuildCreate />} />
      <Route path=':id/edit' element={<GuildEdit />} />
      <Route path=':id/*' element={<Guild />} />
      <Route path='' element={<GuildsPreview />} />
      <Route path='*' element={<Navigate to='' replace />} />
    </Routes>
  );
}
