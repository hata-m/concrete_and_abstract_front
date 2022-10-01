<script>
    import { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer } from "./api/api";
    export let voteResult;
    export let itemName;
    export let userName;
    export let roomId;

    $: resultdata=voteResult;
    var reloadData=[]

    async function reloadButtonClick() {
            var didSucceed = await getVoteResult(roomId);
            reloadData = didSucceed;
            sort("count");
            userName;
            resultdata=reloadData;
    }
	
	$: sort = (column) => {
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = -1;
		
		let sort = (a, b) => 
			(a[column].count < b[column].count) 
			? -1 * sortModifier 
			: (a[column].count > b[column].count) 
			? 1 * sortModifier 
			: 0;
		
            reloadData = reloadData.sort(sort);
	}
</script>

<main>
    <h1 id="votedata">"{itemName}"に投票しました</h1>
    <div class="reload"> 
    <h2>現在の投票結果</h2>
    <button class="reloadbutton" on:click={reloadButtonClick}> 更新 </button>
    </div>
    <ul>
        {#each resultdata as item, index}
            <li>
                <div>
                    <span>{index+1}位  "{item.answer}" : {item.count}票</span>
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
        max-width: 500px;
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
    .reload {
        display: flex;
		justify-content: center;
        align-items: center;
    }
    .reloadbutton{
        max-height: 45px;
        margin: 10px;
    }
</style>
