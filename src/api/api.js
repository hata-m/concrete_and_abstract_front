import axios from 'axios';

// TODO: .envファイルから読み込めないため、ここで指定
const URL_BASE = "http://localhost:3000/"

const getAnswers = async (subjectId) => {
    const url = URL_BASE + "database/" + subjectId;
    try {
        const res = await axios.get(url);
        const answers = res.data;
        return answers;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export { getAnswers }