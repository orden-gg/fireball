import { Navigate, Route, Routes } from 'react-router-dom';

import { GuildForm } from './routes/GuildForm/GuildForm';
import { GuildsPreview } from './routes/GuildsPreview/GuildsPreview';

export function Guilds() {
  return (
    <Routes>
      <Route path='/form' element={<GuildForm />} />
      {/* <Route path=':name/*' element={<Guild />} /> */}
      <Route path='' element={<GuildsPreview />} />
      <Route path='*' element={<Navigate to='' replace />} />
    </Routes>
  );
}
