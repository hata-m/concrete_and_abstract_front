import Welcome from "./components/game/welcome/Welcome.svelte";
import CreateRoom from "./components/game/create-room/CreateRoom.svelte";
import JoinRoom from "./components/game/join-room/JoinRoom.svelte";
import MakeSubjects from "./components/game/make-subjects/MakeSubjects.svelte";
import Problem from "./components/game/problem/Problem.svelte";
import AnswerList from "./components/game/polling-place/AnswerList.svelte";
import VotingResult from "./components/game/voting-result/VotingResult.svelte";

export const routes = {
    "/": Welcome,
    "/create-room": CreateRoom,
    "/join-room": JoinRoom,
    "/make-subjects": MakeSubjects,
    "/problem": Problem,
    "/answerlist": AnswerList,
    "/voting-result": VotingResult,
    "*": Welcome
};