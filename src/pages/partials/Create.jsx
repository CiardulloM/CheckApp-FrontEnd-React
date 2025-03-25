import { useForm } from 'react-hook-form';
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { createList } from '../../api/auth.js';

import classes from './styles/create.module.css';
import Task from './Task';

function Create({ handleSelectionChange, handleSelected }) {
	const { unregister, register, handleSubmit, watch } = useForm();
	const { user } = useAuth();

	const [components, setComponents] = useState([]);

	const onCreateTask = () => {
		setComponents((prev) => [
			...prev,
			<Task key={Date.now()} id={Date.now()} onDelete={onDeleteTask} register={register} />,
		]);
	};

	const onDeleteTask = (taskId) => {
		unregister(taskId.toString());
		setComponents((prevComponents) => prevComponents.filter((Task) => parseInt(Task.key) !== taskId));
	};

	const onSubmit = async (values) => {
		console.log(user.id);
		const res = await createList(values, user.id);
		if (res == -1) {
		}
		handleSelectionChange(2);
	};

	return (
		<div className={classes.formDiv}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.createForm} action="">
				<span>Create a Task-List</span>
				<input type="name" placeholder="Name" {...register('name', { required: true })} />
				<hr />
				<div>
					<span>Tasks</span>
					<ul>
						{components.map((component, index) => (
							<li key={index}>{component}</li> // 🔹 Renderizar correctamente
						))}
					</ul>
					<button type="button" onClick={onCreateTask}>
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
							<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
						</svg>
					</button>
				</div>
				<hr />
				<div className={classes.checkboxWrapper14}>
					<span>Repeat?</span>
					<label>
						<input id={`${classes.daily}`} type="checkbox" name="is_daily" value="1" {...register('is_daily')} />{' '}
						<span>repeat daily?</span>
					</label>
					<label>
						<input id={`${classes.weekly}`} type="checkbox" name="is_weekly" value="1" {...register('is_weekly')} />{' '}
						<span>repeat weekly?</span>
					</label>
					<label>
						<input id={`${classes.monthly}`} type="checkbox" name="is_monthly" value="1" {...register('is_monthly')} />{' '}
						<span>repeat monthly?</span>
					</label>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
}

export default Create;
