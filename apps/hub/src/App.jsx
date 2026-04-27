import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HDashboard from './screens/HDashboard.jsx';
import HDisassembly from './screens/HDisassembly.jsx';
import HMarketplace from './screens/HMarketplace.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HDashboard />} />
        <Route path="/disassembly" element={<HDisassembly />} />
        <Route path="/marketplace" element={<HMarketplace />} />
      </Route>
    </Routes>
  );
}
