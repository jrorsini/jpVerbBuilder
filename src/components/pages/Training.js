import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Training = props => {
	return (
		<div className="container">
			<ul className="training_list">
				<li>
					<button className="button WordItem__button">
						<NavLink to="/practice/pronunciation">
							<span>Pronunciation</span>
						</NavLink>
					</button>
				</li>
				<li>
					<button className="button WordItem__button">
						<NavLink to="/practice/pronunciation">
							<span>FlashCard</span>
						</NavLink>
					</button>
				</li>
				<li>
					<button className="button WordItem__button">
						<NavLink to="/practice/conjugation">
							<span>Conjugation</span>
						</NavLink>
					</button>
				</li>
			</ul>
		</div>
	);
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Training);
