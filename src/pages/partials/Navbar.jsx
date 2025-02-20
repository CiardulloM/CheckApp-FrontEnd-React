import classes from './styles/navbar.module.css';

import { useEffect, useState, useImperativeHandle, useRef } from 'react';
import { isContentEditable } from '@testing-library/user-event/dist/utils/index.js';

function NavBar({ handleSelected, handleSelectionChange }) {
	const [isClosed, setisClosed] = useState(true);
	const navbarRef = useRef(null);
	const btnRef = useRef(null);

	const toggleNavbar = () => {
		setisClosed(!isClosed);
	};

	const createBtnRef = useRef(null);
	const todoBtnRef = useRef(null);
	const scheduleBtnRef = useRef(null);
	const sharedBtnRef = useRef(null);

	return (
		<nav ref={navbarRef} className={`${classes.navbarHolder} ${isClosed ? classes.close : ''} `} id="navbar">
			<button
				ref={btnRef}
				onClick={toggleNavbar}
				className={`${classes.toggleBtn} ${isClosed ? classes.rotate : ''} `}
				id="toggle-navbar"
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
					<path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
				</svg>
			</button>
			<ul>
				<li className="navbar-logo">
					<span>
						<span>Check</span>App
					</span>
					<svg className="navbar-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>Todoist</title>
						<path d="M21 0H3C1.35 0 0 1.35 0 3v3.858s3.854 2.24 4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.608 8.136-4.675.279-.161.58-.107.748-.01.164.097.606.348.84.48.232.134.221.502.013.622l-9.712 5.59c-.346.2-.69.204-1.048.002C3.478 10.907.998 9.463 0 8.882v2.02l4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.609 8.136-4.676.279-.16.58-.106.748-.008.164.096.606.347.84.48.232.133.221.5.013.62-.208.121-9.288 5.346-9.712 5.59-.346.2-.69.205-1.048.002C3.478 14.951.998 13.506 0 12.926v2.02l4.098 2.38c.31.18.694.177 1.004 0 .26-.147 8.02-4.609 8.136-4.676.279-.16.58-.106.748-.009.164.097.606.348.84.48.232.133.221.502.013.622l-9.712 5.59c-.346.199-.69.204-1.048.001C3.478 18.994.998 17.55 0 16.97V21c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z" />
					</svg>
				</li>

				<li>
					<button
						ref={todoBtnRef}
						id={`${handleSelected == 2 ? classes.selected : ''}`}
						onClick={() => handleSelectionChange(2)}
					>
						<svg
							className="navbar-svg"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#e8eaed"
						>
							<path d="M80-160v-160h160v160H80Zm240 0v-160h560v160H320ZM80-400v-160h160v160H80Zm240 0v-160h560v160H320ZM80-640v-160h160v160H80Zm240 0v-160h560v160H320Z" />
						</svg>
						<span>To-do</span>
					</button>
				</li>
				<li>
					<button
						ref={scheduleBtnRef}
						id={`${handleSelected == 3 ? classes.selected : ''}`}
						onClick={() => handleSelectionChange(3)}
					>
						<svg
							className="navbar-svg"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#e8eaed"
						>
							<path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
						</svg>
						<span>Schedule</span>
					</button>
				</li>

				<li>
					<button
						ref={sharedBtnRef}
						id={`${handleSelected == 4 ? classes.selected : ''}`}
						onClick={() => handleSelectionChange(4)}
					>
						<svg
							className="navbar-svg"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#e8eaed"
						>
							<path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
						</svg>
						<span>Shared-list</span>
					</button>
				</li>

				<li>
					<button
						ref={createBtnRef}
						id={`${handleSelected == 1 ? classes.selected : ''}`}
						onClick={() => handleSelectionChange(1)}
					>
						<svg
							className="navbar-svg"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#e8eaed"
						>
							<path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
						</svg>
						<span>Create</span>
					</button>
				</li>

				<li>
					<button>
						<svg
							className="navbar-svg"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#e8eaed"
						>
							<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
						</svg>
						<span>Log-Out</span>
					</button>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
