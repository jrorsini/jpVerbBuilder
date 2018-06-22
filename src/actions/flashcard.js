/**
Take an object like this 
{
	jp: なになに
	en: Something
}
 */

export const setQuestion = question => ({
	type: 'SET_QUESTION',
	question
});
