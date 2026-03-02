import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import AdminDashboard from './pages/admin/DashboardPage';
import AdminUsers from './pages/admin/UsersPage';
import AdminDeposit from './pages/admin/DepositPage';
import AdminWithdraw from './pages/admin/WithdrawPage';
import ConvertionPage from './pages/public/ConversionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/deposit' element={<AdminDeposit />} />
        <Route path='/admin/withdraw' element={<AdminWithdraw />} />
        <Route path='/conversion' element={<ConvertionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;