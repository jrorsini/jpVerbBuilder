// REACT
import React from 'react';
import { connect } from 'react-redux';

// UTILITIES
import { searchHandler } from '../utilities/search_handler';
import { capString } from '../utilities/eng_tokenizer';

const BreadCrumb = props => (
	<ul className="breadcrumb">
		{props.breadcrumb.panels.map((e, i) => {
			return (
				<li
					key={i}
					className={`breadcrumb__panel ${e.word ===
						props.breadcrumb.current.word && 'breadcrumb__panel--inactive'}`}
					onClick={() => {
						props.breadcrumb.panels.length > 1 &&
							e !== props.breadcrumb.current.word &&
							searchHandler(e.word, props);
					}}
				>
					<span>{capString(e.word)}</span>
				</li>
			);
		})}
	</ul>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(BreadCrumb);
