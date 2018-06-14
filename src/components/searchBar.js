import React from 'react';

export default ({ searchVerb }) => (
	<form onSubmit={searchVerb}>
		<p>
			<input
				name="verbSearchBar"
				autoComplete="off"
				value="食べる"
				onChange={() => {}}
			/>
		</p>
	</form>
);
