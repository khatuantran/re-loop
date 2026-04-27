import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PMarketplace from './screens/PMarketplace.jsx';
import PLotDetail from './screens/PLotDetail.jsx';
import PESG from './screens/PESG.jsx';
import PJourney from './screens/PJourney.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PMarketplace />} />
        <Route path="/lot/:id" element={<PLotDetail />} />
        <Route path="/esg" element={<PESG />} />
        <Route path="/journey" element={<PJourney />} />
      </Route>
    </Routes>
  );
}
