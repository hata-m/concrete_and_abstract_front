<script>
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { getAnswersByRoomID, voteByID } from "../../../api/api";
    import { roomID, user, myVote } from "../../../store/store";

    let answers = [];
    let roomId;
    let userId;

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
    <h1 id="votedata">{label}</h1>
    <h2>解答内容</h2>
    <form id="radio_form">
        <ul>
            {#each answers as item, index}
                <li>
                    <div class="AnswerItems">
                        <input type="radio" name="vote" value={index} />
                        {item.answer}
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
        padding: 1em;
        max-width: 450px;
        margin: 0 auto;
    }
    ul {
        list-style-type: none;
        padding: 1em;
    }
    li {
        /* リストを横並びにする */
        /* list-style-type: none; */
        text-align: left;
        /* 見た目整える用 */
        background: #f0f8ff;
    }
</style>
