import { writable } from 'svelte/store';

export const roomID = writable(0);

export const user = writable({
    id: null,
    name: null
});

export const myAnswer = writable({
    roomId: null,
    answer: null
});

export const myVote = writable("");

/*

answerlist
list of 
{
    "id": answerID(int),
    "answer" answer(str)
}
*/
export const answerlist = writable([]);


/*
registeredSubjects
list of 
{
    "roomID": roomID(int),
    "title": subject(str),
}
*/

export const registeredSubjects = writable([]);