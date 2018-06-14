import React from 'react';

const VerbItem = ({ kanji, hiragana, meaning, exampleList }) => {
	return (
		<div>
			<h2>
				{kanji} (<span>{hiragana}</span>)
				<button>Add</button>
			</h2>
			<p>{meaning.replace(/\、/g, ', ')}</p>
			{exampleList.map((example, exampleId) => {
				return (
					<div key={exampleId}>
						<p>{example.jp}</p>
						<p>{example.en}</p>
					</div>
				);
			})}
		</div>
	);
};

export default VerbItem;
