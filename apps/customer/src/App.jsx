import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScreenHome from './screens/ScreenHome.jsx';
import ScreenFlowA from './screens/ScreenFlowA.jsx';
import ScreenFlowB from './screens/ScreenFlowB.jsx';
import ScreenAuction from './screens/ScreenAuction.jsx';
import ScreenTracking from './screens/ScreenTracking.jsx';
import ScreenCert from './screens/ScreenCert.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/flow-a" element={<ScreenFlowA />} />
        <Route path="/flow-b" element={<ScreenFlowB />} />
        <Route path="/auction" element={<ScreenAuction />} />
        <Route path="/tracking" element={<ScreenTracking />} />
        <Route path="/cert" element={<ScreenCert />} />
      </Route>
    </Routes>
  );
}
