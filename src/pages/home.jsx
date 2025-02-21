import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
	const nav = useNavigate();

	const ClickToNav = () => {
		nav('/login');
	};
	return (
		<div>
			<button onClick={ClickToNav}>login</button>
		</div>
	);
}

export default HomePage;
