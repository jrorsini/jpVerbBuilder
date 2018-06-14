import React from 'react';

export default ({ searchVerb }) => (
	<form onSubmit={searchVerb}>
		<p>
			<input name="verbSearchBar" autoComplete="off" />
		</p>
	</form>
);
