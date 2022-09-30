import axios from 'axios';

// NOTE: .envファイルから読み込めないため、ここで指定
const URL_BASE = "https://concrete-and-abstract-nestjs-node.onrender.com/"

const getAnswers = async (subjectId) => {
    const url = URL_BASE + "concrete-and-abstract/answers";
    try {
        const res = await axios.get(url);
        const answers = res.data;
        return answers;
    } catch (error) {
        console.log(error);
    }
    return null;
}

const getSubjects = async (subjectId) => {
    const url = URL_BASE + "concrete-and-abstract/subjects";
    try {
        const res = await axios.get(url);
        const answers = res.data;
        return answers;
    } catch (error) {
        console.log(error);
    }
    return null;
}

const getVoteResult = async (subjectId) => {
    const url = URL_BASE + "concrete-and-abstract/results";
    try {
        const res = await axios.get(url);
        const results = res.data;
        return results;
    } catch (error) {
        console.log(error);
    }
    return null;
}

const postAnswer = async (subjectId, answer) => {
    const url = URL_BASE + "concrete-and-abstract/answers";
    const reqBody = {
        subjectId: subjectId,
        answer: answer
    }
    try {
        const res = await axios.post(url, reqBody);
        return res.status === 201
    } catch (error) {
        console.log(error);
        return false
    }
}

const postVoteAnswer = async (subjectId, answer, user) => {
    const url = URL_BASE + "concrete-and-abstract/vote";
    const reqBody = {
        subjectId: subjectId,
        user: user,
        answer: answer
    }
    try {
        const res = await axios.post(url, reqBody);
        return res.status === 201
    } catch (error) {
        console.log(error);
        return false
    }
}


const getSubjectsByRoomID = async (roomId) => {
    const url = URL_BASE + "subject/room/" + roomId;
    try {
        const res = await axios.get(url);
        return [true, res.data];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

export const createUser = async (userObj) => {
    const url = URL_BASE + "user";
    try {
        const res = await axios.post(url, userObj);
        return [true, res.data];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

const makeRoom = async () => {
    const url = URL_BASE + "room";
    try {
        const res = await axios.post(url);
        return [true, res.data];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

/*
NOTE: 現在はAPI側がsubjectを1つずつしか登録できないため、単体登録前提. Svelteの方でループを回して登録
TODO: API側が複数登録に対応できたらいっぺんに送る処理に変更
*/
const registerSubjects = async (subject) => {
    const url = URL_BASE + "subject";
    try {
        const res = await axios.post(url, subject);
        return res.status === 201
    } catch (error) {
        console.log(error);
        return false;
    }
}


const postAnswerByRoomID = async (answerObj) => {
    const url = URL_BASE + "answer";
    try {
        const res = await axios.post(url, answerObj);
        return res.status === 201;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const getAnswersByRoomID = async (roomId) => {
    const url = URL_BASE + "answer/room/" + roomId;
    try {
        const res = await axios.get(url);
        return [true, res.data];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}


const voteByID = async (voteObj) => {
    const url = URL_BASE + "vote";
    try {
        const res = await axios.post(url, voteObj);
        return res.status === 201;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getVoteResultByRoomID = async (roomId) => {
    const url = URL_BASE + "vote/room/" + roomId;
    try {
        const res = await axios.get(url);
        return [true, res.data];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
}

export { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer, getSubjectsByRoomID, makeRoom, registerSubjects, postAnswerByRoomID, getAnswersByRoomID, voteByID, getVoteResultByRoomID }