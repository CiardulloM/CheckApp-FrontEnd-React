import { useForm } from 'react-hook-form';
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js';

import classes from './styles/create.module.css';

function Create() {
	const { register, handleSubmit, watch } = useForm();

	return (
		<div className={classes.formDiv}>
			<form className={classes.createForm} action="">
				<span>Create a Task-List</span>
				<input type="name" placeholder="Name" {...register('name', { required: true })} />
				<hr />
				<div>
					<span>Tasks</span>
					<ul>
						<li className={classes.task}>
							<div class={classes.checkboxWrapper15}>
								<input class={classes.inpCbx} id="cbx-15" type="checkbox" style={{ display: 'none' }} />
								<label class={classes.cbx} for="cbx-15">
									<span>
										<svg width="12px" height="9px" viewbox="0 0 12 9">
											<polyline points="1 5 4 8 11 1"></polyline>
										</svg>
									</span>
									<span>To-do</span>
								</label>
							</div>
						</li>
						<button> + </button>
					</ul>
				</div>
				<hr />
				<div className={classes.checkboxWrapper14}>
					<span>Repeat?</span>
					<label>
						<input id={`${classes.daily}`} type="checkbox" name="is_daily" value="d" /> <span>repeat daily?</span>
					</label>
					<label>
						<input id={`${classes.weekly}`} type="checkbox" name="is_weekly" value="w" /> <span>repeat weekly?</span>
					</label>
					<label>
						<input id={`${classes.monthly}`} type="checkbox" name="is_monthly" value="m" /> <span>repeat monthly?</span>
					</label>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
}

export default Create;
