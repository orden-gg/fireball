import { Navigate, Route, Routes } from 'react-router-dom';

import { Guild, GuildForm, GuildsPreview } from './routes';

export function Guilds() {
  return (
    <Routes>
      <Route path='create' element={<GuildForm />} />
      <Route path=':id/edit' element={<GuildForm />} />
      <Route path=':id/*' element={<Guild />} />
      <Route path='' element={<GuildsPreview />} />
      <Route path='*' element={<Navigate to='' replace />} />
    </Routes>
  );
}
