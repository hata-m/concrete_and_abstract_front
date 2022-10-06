<script>
    import { onMount } from "svelte";
    import { getVoteResultByRoomID } from "../../../api/api";
    import { myVote, roomID } from "../../../store/store";

    let myvote;
    let roomId;
    let voteResult = [];

    $: roomIdStr = "room: " + roomId;

    onMount(async () => {
        roomID.subscribe((value) => {
            roomId = value;
        });

        myVote.subscribe((value) => {
            myvote = value;
        });

        const [didSucceed, res] = await getVoteResultByRoomID(roomId);
        voteResult = res;
        sort("count");

        // myvote = "動物"
        // roomId = 38;
    });

    $: resultdata = voteResult;


    async function reloadButtonClick() {
        const [didSucceed, res] = await getVoteResultByRoomID(roomId);
        voteResult = res;
        sort("count");
    }

    $: sort = (column) => {
        // Modifier to sorting function for ascending or descending
        let sortModifier = -1;

        let sort = (a, b) =>
            a[column] < b[column]
                ? -1 * sortModifier
                : a[column] > b[column]
                ? 1 * sortModifier
                : 0;

                voteResult = voteResult.sort(sort);
    };
</script>

<main>
    <div>
        <h1 class="room">{roomIdStr}</h1>
    </div>
    {#if myvote!=""}
        <h1 class="votedata" id="votedata">"{myvote}"に投票しました</h1>
    {/if}
    <div class="reload">
        <h2>現在の投票結果</h2>
        <button class="reloadbutton" on:click={reloadButtonClick}>
            <span class="material-symbols-outlined">refresh</span>
        </button>
    </div>
    <ul>
        {#each resultdata as item, index}
            <li>
                <div>
                    <span>{index + 1}位 "{item.answer}" : {item.count}票</span>
                    <br />
                </div>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        text-align: center;
        /* padding: 1em; */
        /* max-width: 500px; */
        /* margin: 0 auto; */
        /* background-color: white; */
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
        /* margin: 2px; */
    }

    ul {
        list-style-type: none;
        font-size: xx-large;
        min-height: 200px;
        align-items: flex-start;
        margin: 10px;
        padding-left: 0ex;
    }
    .reload {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
    }
    .reloadbutton {
         /* max-width: 100px; */
         width: auto;
         height: auto;
    }
    .room {
        text-align: right;
    }
    .material-symbols-outlined {
        font-size: 50px;
    }

</style>
