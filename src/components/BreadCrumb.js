// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS

// ACTIONS
import { setCurrentPanel } from '../../actions/breadcrumb';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';

// UTILITIES
import search from '../../logic/search_handler';
import { tokenize, getTokenizer } from 'kuromojin';

const BreadCrumb = props => {
	const breadCrumbClickHandler = word => {
		const dispatch = props.dispatch;
		search(word)
			.then(res => {
				dispatch(setPreview({ ...JSON.parse(res) }));
				dispatch(setCurrentPanel({ ...JSON.parse(res) }));
				dispatch(setErrorTxt(null));
			})
			.catch(err => dispatch(setErrorTxt(err)));
	};

	return (
		<ul className="breadcrumb">
			{props.breadcrumb.panels.map((e, i) => {
				return (
					<li
						key={i}
						className={`breadcrumb__panel ${e.word ===
							props.breadcrumb.current.word && 'breadcrumb__panel--inactive'}`}
						onClick={() => {
							e !== props.breadcrumb.current.word &&
								breadCrumbClickHandler(e.word);
						}}
					>
						<span>{e.word}</span>
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(BreadCrumb);
