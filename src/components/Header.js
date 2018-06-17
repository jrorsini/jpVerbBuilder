import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<div className="container">
			<NavLink exact={true} className="header__link--home" to="/">
				<h1 className="header__title">Emotional Diary</h1>
			</NavLink>
			<ul className="header__list">
				<li className="header__item">
					<NavLink
						exact={true}
						className="header__link"
						activeClassName="header__link--active"
						to="/"
					>
						Home
					</NavLink>
				</li>
				<li className="header__item">
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
