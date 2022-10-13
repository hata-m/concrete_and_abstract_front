<script>
    import { push } from "svelte-spa-router";
    import { roomID, registeredSubjects, user, myAnswer } from "../../../store/store";
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
        } else {
            if (!alert("部屋が存在しません。RoomIDを確認してください。")) {
                push("/join-room");
            }
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
        <h1 class="room">{roomIdStr}</h1>
    </div>
    <h1>お題</h1>
    <h1>以下の単語を抽象化してね！</h1>
    <ul>
        {#each subjects as item}
            <li>
                <div class="problemItems">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>
                        {#if item.title.startsWith("https://")}
                            {item.title.substring(4, 30)}
                        {:else}
                            {item.title}
                        {/if}
                    </label>
                </div>
            </li>
        {/each}
    </ul>
    <form on:submit={handleSubmit}>
        <div>
            <input bind:value={answer} type="text" placeholder="解答欄" required />
        </div>
        <button type="submit">抽象化</button>
    </form>
</main>

<style>
    main {
        text-align: center;
        /* padding: 1em;
        max-width: 450px; */
        margin: 0 auto;
    }
    li {
        /* リストを横並びにする */
        display: inline-block;

        /* 見た目整える用 */
        padding: 15px;
        background: #ffdab9;
        height: auto;
        margin: 5px;
        border-radius: 10px;
    }
    ul {
        padding-left: 0ex;
    }
    .room {
        text-align: right;
    }
    input {
        margin: 5px;
    }
    .problemItems {
        font-size: xx-large;
        font-weight: bold;
        height: auto;
    }
</style>
