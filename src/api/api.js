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


const getSubjectsByRoomID = async (roomId) => {
    const url = URL_BASE + "subject/room/" + roomId;
    try {
        const res = await axios.get(url);
        console.log(res.data)
        if(res.data.length>0){
            return [true, res.data];
        }
        return [false,null];
        
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
const registerSubjects = async (subjects) => {
    const url = URL_BASE + "subject/bulk";
    try {
        const res = await axios.post(url, subjects);
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

export const fetchNews = async () => {
    const url = URL_BASE + "subject/news";
    try {
        const res = await axios.get(url);
        if (res.status !== 201 || !res.data) {
            throw "No Data";
        }
        const articles = res.data;
        const selectedArticles = [];
        let i = 0;
        let len = articles.length;
        while (i < 5) {
            if (len < 1) {
                break;
            }
            rand = Math.floor( Math.random() * len); 
            selectedArticles.push(articles[rand]);
            delete articles[rand];
            len = articles.length;
        }
        return selectedArticles;
        
    } catch (error) {
        console.log(error);
        return [
            {title: "NASA、小惑星周回軌道を32分変更に成功 – 旅行業界・航空業界 最新情報 - 航空新聞社", url: "https://www.jwing.net/news/57620"},
            {title: "京都縦貫自動車道 77歳女性運転の乗用車が逆走事故 2人死亡 - nhk.or.jp", url: "https://www3.nhk.or.jp/news/html/20221013/k10013857191000.html"}
        ];
    }
}

export { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer, getSubjectsByRoomID, makeRoom, registerSubjects, postAnswerByRoomID, getAnswersByRoomID, voteByID, getVoteResultByRoomID }