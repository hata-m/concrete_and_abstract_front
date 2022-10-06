<!-- <script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
</script> -->
<script>
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { getAnswersByRoomID, voteByID } from "../../../api/api";
    import { roomID, user, myVote } from "../../../store/store";

    let answers = [];
    let roomId;
    let userId;

    $: roomIdStr = "room: " + roomId;

    user.subscribe((value) => {
        userId = value.id;
    });

    onMount(async () => {
        roomID.subscribe((value) => {
            roomId = value;
        });
        const [ok, res] = await getAnswersByRoomID(roomId);
        console.log(res);
        answers = res;
    });

    let voteResult = [];

    let labeldata = "投票前";
    $: label = labeldata;
    async function voteButtonClick() {
        let form = document.getElementById("radio_form");

        const voteAnswerIdx = form.vote.value;
        const voteAnswerObj = answers[voteAnswerIdx];
        if (voteAnswerIdx) {
            const didSucceed = await voteByID({
                userId: Number(userId),
                answerId: Number(voteAnswerObj.id),
            });
            if (didSucceed) {
                myVote.set(voteAnswerObj.answer);
            }
            push("/voting-result");
        } else {
            labeldata = "投票項目が選択されていません";
        }
    }

</script>

<main>
    <div>
        <h1 class="room">{roomIdStr}</h1>
    </div>
    <h1>解答内容</h1>
    <form id="radio_form">
       <ul>
            {#each answers as item, index}
                <li>
                    <div class="AnswerItems">
                        <input type="radio" id={index} name="vote" value={index} />
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label for={index}> {item.answer} </label>
                        <br />
                    </div>
                </li>
            {/each}
        </ul>
    </form>
    <button on:click={voteButtonClick}> 投票する </button>
</main>

<style>
    main {
        text-align: center;
        /* padding: 1em; */
        /* max-width: 450px; */
        /* margin: 0 auto; */
        /* background-color: rgba(99, 86, 102, 0.2);
        min-width: 600px;
        min-height: 600px; */
    }

    li {
        /* リストを横並びにする */
        /* list-style-type: none; */
        text-align: left;
        /* 見た目整える用 */
        /* background: #f0f8ff; */
        margin: 2px;
    }

    ul {
        list-style-type: none;
        font-size: xx-large;
        min-height: 200px;
        align-items: flex-start;
        margin: 5px;
        padding-left: 0ex;
    }

    input{
        width: auto;
        margin: 5px;
    }
    .room {
        text-align: right;
    }

    .AnswerItems{
        display: flex;
        align-items: center;
    }




</style>
