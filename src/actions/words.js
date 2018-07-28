// import database from '../firebase/firebase';

export const addWord = word => ({
	type: 'ADD_WORD',
	word
});

export const removeWord = word => ({
	type: 'REMOVE_WORD',
	word
});

// export const startAddWord = word => {
// 	return dispatch => {
// 		database
// 			.ref('words')
// 			.push(word)
// 			.then(ref => {
// 				dispatch(
// 					addWord({
// 						id: ref.key,
// 						...word
// 					})
// 				);
// 			});
// 	};
// };
