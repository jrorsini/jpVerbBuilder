import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<div className="header">
		<div className="container">
			<NavLink exact={true} className="header__link--home" to="/">
				<h1 className="header__title">JRpan</h1>
			</NavLink>
			<ul className="header__list">
				<li className="header__item">
					<NavLink
						exact={true}
						className="header__link"
						activeClassName="header__link--active"
						to="/search"
					>
						<i className="material-icons">search</i>
						Search
					</NavLink>
				</li>
				<li className="header__item">
					<NavLink
						className="header__link"
						activeClassName="header__link--active"
						to="/wordbook"
					>
						<i className="material-icons">filter_list</i>
						WordBook
					</NavLink>
				</li>
				{/* <li className="header__item">
					<NavLink
						className="header__link"
						activeClassName="header__link--active"
						to="/videos"
					>
						<i className="material-icons">videocam</i>
						Videos
					</NavLink>
				</li> */}
			</ul>
		</div>
	</div>
);

export default Header;
