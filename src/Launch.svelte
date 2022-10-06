<script>
    import Router from "svelte-spa-router";
    import Welcome from "./components/game/welcome/Welcome.svelte";
    import CreateRoom from "./components/game/create-room/CreateRoom.svelte";
    import JoinRoom from "./components/game/join-room/JoinRoom.svelte";
    import MakeSubjects from "./components/game/make-subjects/MakeSubjects.svelte";
    import Problem from "./components/game/problem/Problem.svelte";
    import AnswerList from "./components/game/polling-place/AnswerList.svelte";
    import VotingResult from "./components/game/voting-result/VotingResult.svelte";
    // import { css,keyframes } from "emotion";

    const routes = {
        "/": Welcome,
        "/create-room": CreateRoom,
        "/join-room": JoinRoom,
        "/make-subjects": MakeSubjects,
        "/problem": Problem,
        "/answerlist": AnswerList,
        "/voting-result": VotingResult,
        "*": Welcome
    };
</script>

<Router {routes} />

<style>

    :global(button){
        color: white;
        margin: 5px;
        height: 100px;
        width: 500px;
        cursor: pointer;
        background-color: #635666;
        border: 0;
        font-size: xx-large;
    }

    :global(input){
        font-size: xx-large;
        width: 500px;
    }

    :global(body){
        background-color: #D3EBCD;
        display: flex;
        flex-flow:  column;
        justify-content: center;
        align-items: center;
    }

    :global(main){
        /* flex-flow:  column; */
        /* display: flex; */
        /* align-items: center; */
        /* align-content: center; */
        /* justify-content: center; */
        /* margin-top: ;
        margin-left: auto; */
        /* width: 500px; */
        /* height: 500px; */
        /* border-color:  black; */
        /* background-color: white; */
    }

    :global(button:hover){
        transition-duration: 500ms;
        background-color: #839AA8;
    }
    
</style>
