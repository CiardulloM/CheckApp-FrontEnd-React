import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import classes from './styles/login.module.css';

function LoginPage() {
	const { register, handleSubmit, watch } = useForm();
	const [handleForms, setHandleForms] = useState(1);
	const { handleSign, isAuthenticated, sendCode } = useAuth();

	const nav = useNavigate();

	const [isCodeSent, setIsCodeSent] = useState(false);
	const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
	const emailValue = watch('email');

	useEffect(() => {
		if (isAuthenticated) nav('/main');
	}, [isAuthenticated]);

	const onSubmit = async (values) => {
		const res = await handleSign(values, handleForms);
		if (res == -1) {
			setShowFeedbackMessage(true);
			setTimeout(() => {
				setShowFeedbackMessage(false);
			}, 3000);
		}
	};
	const onSendCode = async () => {
		if (emailValue) {
			const success = await sendCode({ email: emailValue, accion: handleForms });
			if (success == -1) {
				setIsCodeSent(false);
				setShowFeedbackMessage(true);
				setTimeout(() => {
					setShowFeedbackMessage(false);
				}, 3000);
			} else {
				setIsCodeSent(true);
				setShowFeedbackMessage(true);
				setTimeout(() => {
					setShowFeedbackMessage(false);
					setTimeout(() => {
						setIsCodeSent(false);
					}, 500);
				}, 3000);
			}
		}
	};

	return (
		<div className={classes.handleDiv}>
			<div
				className={`${classes.feedbackMessage} ${isCodeSent == true ? classes.success : classes.error}`}
				style={{ opacity: showFeedbackMessage == true ? 1 : 0 }}
			>
				{isCodeSent == true ? 'Code sent successfully!' : 'User not found'}
			</div>
			<h1 className={classes.title}>{handleForms === 1 ? 'Login' : 'Register'}</h1>
			<div className={classes.formConteiner}>
				{handleForms === 1 ? (
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="email" placeholder="Email" {...register('email', { required: true })} />
						<input type="password" placeholder="Password" {...register('password', { required: true })} />
						<div className={classes.codeContainer}>
							<input
								type="text"
								placeholder="Code"
								maxLength={6}
								{...register('verificationCode', { required: true })}
							/>
							<button className={classes.codeButton} onClick={onSendCode} type="button" disabled={!emailValue}>
								Send Code
							</button>
						</div>
						<button className={classes.submitButton} type="submit">
							Login
						</button>
					</form>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="text" placeholder="Username" {...register('username', { required: true })} />
						<input type="email" placeholder="Email" {...register('email', { required: true })} />
						<input type="password" placeholder="Password" {...register('password', { required: true })} />
						<div className={classes.codeContainer}>
							<input
								type="text"
								maxLength={6}
								placeholder="Code"
								{...register('verificationCode', { required: true })}
							/>
							<button className={classes.codeButton} onClick={onSendCode} type="button" disabled={!emailValue}>
								Send Code
							</button>
						</div>
						<button className={classes.submitButton} type="submit">
							Register
						</button>
					</form>
				)}
			</div>
			<hr className={classes.customHr} />
			<button
				className={classes.handleBtn}
				onClick={function () {
					setHandleForms(handleForms * -1);
				}}
			>
				{handleForms === 1 ? (
					<>
						Don't have an account? <span>Go register</span>
					</>
				) : (
					<>
						Have an account? <span>Go login</span>
					</>
				)}
			</button>
		</div>
	);
}

export default LoginPage;
