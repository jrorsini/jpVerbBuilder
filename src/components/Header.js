import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<div className="container">
			<NavLink exact={true} className="header__link--home" to="/">
				<h1 className="header__title">Vocab Builder</h1>
			</NavLink>
			<ul className="header__list">
				<li className="header__item">
					<NavLink
						exact={true}
						className="header__link"
						activeClassName="header__link--active"
						to="/"
					>
						<i class="material-icons">home</i>
						Home
					</NavLink>
				</li>
				<li className="header__item">
					<NavLink
						className="header__link"
						activeClassName="header__link--active"
						to="/list"
					>
						<i class="material-icons">list</i>
						List
					</NavLink>
				</li>
				<li className="header__item">
					<NavLink
						className="header__link"
						activeClassName="header__link--active"
						to="/videos"
					>
						<i class="material-icons">videocam</i>
						Videos
					</NavLink>
				</li>
			</ul>
		</div>
	</div>
);

export default Header;
