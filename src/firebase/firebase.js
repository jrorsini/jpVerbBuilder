import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyAqByuC07TEPz9F5rDTg2uD2QAgDLa_Flc',
	authDomain: 'jrpan-28272.firebaseapp.com',
	databaseURL: 'https://jrpan-28272.firebaseio.com',
	projectId: 'jrpan-28272',
	storageBucket: 'jrpan-28272.appspot.com',
	messagingSenderId: '224772553556'
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('notes/-LITS-wO9Tha3m18RatQ').remove();

// database.ref('notes').push({
// 	title: 'hello',
// 	content: 'myCOntent'
// });

// database.ref().on('value', snapshot => {
// 	console.log(snapshot.val());
// });

// database
// 	.ref('notes')
// 	.once('value')
// 	.then(snapshot => {
// 		// const val = snapshot.val();
// 		// console.log(val);
// 		const notes = [];
// 		snapchot.forEach(childSnapshot => {
// 			notes.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			});
// 		});
// 		console.log(notes);
// 	})
// 	.catch(e => console.log('error fetching data'));

// database.ref().set({
// 	name: 'JR',
// 	age: 26,
// 	isSingle: true,
// 	location: { city: 'Tokyo', country: 'Japan' }
// });

// database.ref('isSingle').remove();

// database.ref().update({
// 	name: 'Jean-Roger',
// 	job: 'Software engineer',
// 	'location/city': 'Osaka',
// 	'location/zipCode': '162-0032',
// 	age: 25
// });
