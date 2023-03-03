import { Navigate, Route, Routes } from 'react-router-dom';

import { GuildsContextProvider } from './GuildsContext';
import { Guild } from './routes/Guild';
import { GuildsPreview } from './routes/GuildsPreview';

export function Guilds() {
  return (
    <GuildsContextProvider>
      <Routes>
        <Route path='' element={<GuildsPreview />} />
        <Route path=':name/*' element={<Guild />} />
        <Route path='*' element={<Navigate to='' replace />} />
      </Routes>
    </GuildsContextProvider>
  );
}
