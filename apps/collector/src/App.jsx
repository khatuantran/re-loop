import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import CInbox from './screens/CInbox.jsx';
import CRoute from './screens/CRoute.jsx';
import CPickup from './screens/CPickup.jsx';
import CEarnings from './screens/CEarnings.jsx';
import CProfile from './screens/CProfile.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CInbox />} />
        <Route path="/route" element={<CRoute />} />
        <Route path="/pickup" element={<CPickup />} />
        <Route path="/earnings" element={<CEarnings />} />
        <Route path="/profile" element={<CProfile />} />
      </Route>
    </Routes>
  );
}
