import { useForm } from 'react-hook-form';
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js';
import { useAuth } from '../../context/AuthContext';
import { useStateimport, useEffect, useState } from 'react';
import { getlists } from '../../api/auth.js';

import classes from './styles/create.module.css';
import Task from './Task';

function TasklistLoader({ handleSelectionChange, handleSelected }) {
	const { unregister, register, handleSubmit, watch } = useForm();
	const { user } = useAuth();

	const [tasklists, setTasklists] = useState([]);

	const getTaskLists = async (userId) => {
		setTasklists(await getlists(userId));
	};

	useEffect(() => {
		if (handleSelected == 2) getTaskLists(user.id);
	}, [handleSelected]);

	return (
		<div>
			<p>WORKS</p>
		</div>
	);
}

export default TasklistLoader;
