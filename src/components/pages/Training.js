import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Training = props => {
	return (
		<div className="container">
			<ul className="training_list">
				<li>
					<NavLink className="training_link" to="/practice/pronunciation">
						<button className="button WordItem__button">
							<span>Pronunciation</span>
						</button>
					</NavLink>
				</li>
				<li>
					<NavLink className="training_link" to="/practice/pronunciation">
						<button className="button WordItem__button">
							<span>FlashCard</span>
						</button>
					</NavLink>
				</li>
				<li>
					<NavLink className="training_link" to="/practice/conjugation">
						<button className="button WordItem__button">
							<span>Conjugation</span>
						</button>
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Training);
