import axios from 'axios';

// NOTE: .envファイルから読み込めないため、ここで指定
// const URL_BASE = "https://concrete-and-abstract-nestjs-node.onrender.com/concrete-and-abstract/"
const URL_BASE = "https://concrete-and-abstract-nestjs-node.onrender.com/"

const getAnswers = async (subjectId) => {
    const url = URL_BASE + "answer/room/"+subjectId;
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
    const url = URL_BASE + "subject/room/"+subjectId;
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
    const url = URL_BASE + "result/room/"+subjectId;
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
    const url = URL_BASE + "answer";
    const reqBody = {
        subjectId: Number(subjectId),
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
    const url = URL_BASE + "vote";
    const reqBody = {
        subjectId: Number(subjectId),
        // user: user,
        userId: 1,
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


export { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer }