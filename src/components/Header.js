import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<div className="container">
			<h1 className="header__title">Emotional Diary</h1>
			<ul>
				<li>
					<NavLink
						exact={true}
						className="header__link"
						activeClassName="header__link--active"
						to="/"
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className="header__link"
						activeClassName="header__link--active"
						to="/list"
					>
						List
					</NavLink>
				</li>
			</ul>
		</div>
	</div>
);

export default Header;
