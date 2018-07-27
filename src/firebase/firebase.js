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
database
	.ref()
	.set({
		name: 'JR',
		age: 26,
		isSingle: true,
		location: { city: 'Tokyo', country: 'Japan' }
	})
	.then(data => console.log(data));

database.ref('age').set(27);
database.ref('location/city').set('Osaka');
database.ref('height').set(177);
database.ref('weight').set(69.5);
