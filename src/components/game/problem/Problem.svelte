<script>
    import { push } from "svelte-spa-router";
    import {
        roomID,
        registeredSubjects,
        user,
        myAnswer,
    } from "../../../store/store";
    import { getSubjectsByRoomID, postAnswerByRoomID } from "../../../api/api";
    import { onMount } from "svelte";

    let roomId;
    let subjects = [];
    let userName;
    let answerObj;
    let answer = "";

    $: roomIdStr = "room: " + roomId;

    onMount(async () => {
        roomID.subscribe((value) => {
            roomId = value;
        });

        registeredSubjects.subscribe((value) => {
            subjects = value;
        });

        user.subscribe((value) => {
            userName = value.name;
        });

        myAnswer.subscribe((value) => {
            answerObj = value;
        });

        const [ok, res] = await getSubjectsByRoomID(roomId);
        if (ok) {
            subjects = res;
        }
    });

    async function handleSubmit() {
        if (answer) {
            myAnswer.set({ roomId: Number(roomId), answer: answer });
            const res = await postAnswerByRoomID(answerObj);
            push("/answerlist");
        }
    }
</script>

<main>
    <div>
        <h3 class="room">{roomIdStr}</h3>
    </div>
    <h2>お題</h2>
    <h3>下記の単語に共通する単語を考えてください</h3>
    <ul>
        {#each subjects as item}
            <li>
                <div class="problemItems">
                    <h3>{item.title}</h3>
                </div>
            </li>
        {/each}
    </ul>

    <h2>{userName} さんの回答を記入してください</h2>
    <form on:submit={handleSubmit}>
        <div>
            <input
                bind:value={answer}
                type="text"
                placeholder="解答欄"
                required
            />
        </div>
        <button type="submit">回答を登録する</button>
    </form>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 450px;
        margin: 0 auto;
    }
    li {
        /* リストを横並びにする */
        display: inline-block;

        /* 見た目整える用 */
        width: 100px;
        height: 50px;
        background: #fa8072;
        margin-right: 5px;
    }
    .room {
        text-align: right;
    }
</style>
