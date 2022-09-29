<script>
    export let voteResult;
    export let itemName;
    export let userName;
    export let roomID
</script>

<main>

    <h1 id="votedata">{userName}さんは"{itemName}"に投票しました</h1>

    <h2>投票結果</h2>
    <ul>
        {#each voteResult as item, index}
            <li>
                <div>
                    <span>{index+1}位 {item.answer}: {item.votes}票</span>
                    <br />
                </div>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 450px;
        margin: 0 auto;
    }
    ul {
        /* リストを横並びにする */
        display: flex;
        flex-flow: column;
    }
    li {
        /* リストを横並びにする */
        list-style-type: none;
        padding: 0.5em;
        text-align: left;
        /* 見た目整える用 */
        background: #f0f8ff;
    }
</style>
