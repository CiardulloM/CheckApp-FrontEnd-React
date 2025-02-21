import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './pages/ProtectedRoute';
import MainPage from './pages/MainPage';

import HomePage from './pages/home';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					{/*
					<Route element={<ProtectedRoute />}>
						<Route path="/main" element={<MainPage />} />
					</Route>
					*/}
					<Route path="/main" element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
