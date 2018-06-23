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

export const setAnswer = answer => ({
	type: 'SET_ANSWER',
	answer
});
