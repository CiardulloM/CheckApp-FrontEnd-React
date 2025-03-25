import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, verifyToken, logoutRequest, sendEmail, createList } from '../api/auth.js';
import Cookies from 'js-cookie';

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	let verifyCodeId;

	const handleSign = async (user, accion) => {
		try {
			let res;
			if (accion === -1) {
				res = await registerRequest(user, verifyCodeId);
				if (res.status === 200) {
					setUser(res.data);
					setIsAuthenticated(true);
				} else {
					console.log('validation error');
					return -1;
				}
			} else if (accion === 1) {
				res = await loginRequest(user, verifyCodeId);
				console.log(res.status);
				if (res.status === 200) {
					setUser(res.data);
					setIsAuthenticated(true);
				} else {
					console.log('validation error');
					return -1;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		console.log('user logged out');
		const res = await logoutRequest();
		if (res.status == 200) {
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	const sendCode = async ({ email, accion }) => {
		const user = {
			email: email,
			accion: accion,
		};
		const res = await sendEmail(user);
		verifyCodeId = res.data.codeInsertId;
		verifyCodeId = parseInt(verifyCodeId);
		if (res.status == 200) {
			return 1;
		} else {
			return -1;
		}
	};

	useEffect(() => {
		async function checkLogin() {
			const cookies = Cookies.get();

			if (cookies.token) {
				try {
					const res = await verifyToken(cookies.token);
					if (!res) {
						setIsAuthenticated(false);
						return;
					} else {
						setIsAuthenticated(true);
						setUser(res.data);
						return;
					}
				} catch (error) {
					setIsAuthenticated(false);
					setUser(null);
				}
			} else return;
		}
		checkLogin();
	}, []);

	return (
		<AuthContext.Provider value={{ handleSign, user, isAuthenticated, sendCode, createList }}>
			{children}
		</AuthContext.Provider>
	);
};
