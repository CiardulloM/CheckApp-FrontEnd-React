import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import classes from './styles/main.module.css';

//partials
import NavBar from './partials/Navbar';
import Create from './partials/Create';
import TasklistLoader from './partials/TasklistLoader';

function MainPage() {
	const [handleSelected, setHandleSelected] = useState(2);

	const handleSelectionChange = (newSelection) => {
		setHandleSelected(parseInt(newSelection));
		//console.log('new selection : ' + newSelection + ' handleSelected : ' + handleSelected);
	};

	return (
		<div className={classes.handleMainDiv}>
			<NavBar handleSelected={handleSelected} handleSelectionChange={handleSelectionChange} />
			<div className={classes.mainContent}>
				{handleSelected == 1 ? (
					<Create handleSelectionChange={handleSelectionChange} handleSelected={handleSelected} />
				) : (
					''
				)}
				{handleSelected == 2 ? (
					<TasklistLoader handleSelectionChange={handleSelectionChange} handleSelected={handleSelected} />
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default MainPage;
