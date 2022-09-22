import axios from 'axios';

// TODO: .envファイルから読み込めないため、ここで指定
const URL_BASE = "https://concrete-and-abstract-nestjs-node.onrender.com/"

const getAnswers = async (subjectId) => {
    const url = URL_BASE + "concrete-and-abstract/answers/";
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
    const url = URL_BASE + "concrete-and-abstract/subject";
    try {
        const res = await axios.get(url);
        const answers = res.data;
        return answers;
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

export { getAnswers, postAnswer, getSubjects }