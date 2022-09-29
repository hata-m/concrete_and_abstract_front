<script>
    import VoteResult from "./VoteResult.svelte";
    import { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer } from "./api/api";
    export let answer;
    export let userName;
    export let roomId;
    
    let voteFlag = false;
    let voteResult=[];
    let voteItemName="";

    let labeldata = "投票前";
    $: label = labeldata;
    async function voteButtonClick() {
        labeldata = "押されました";
        let hoge = document.getElementById("foo");
        var itemName = hoge.vote.value;
        if (itemName != "") {
            voteItemName = answer[itemName];
            const didVote = await postVoteAnswer(1,voteItemName, userName)
            const didSucceed = await getVoteResult(1);
            voteResult = didSucceed;
            sort("votes");
            console.log("voteResult"+voteResult)
            voteFlag = true;
        } else {
            labeldata = "投票項目が選択されていません";
        }
    }
	
	$: sort = (column) => {
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		voteResult = voteResult.sort(sort);
	}
</script>

<main>
    {#if voteFlag}
        <VoteResult voteResult={voteResult} userName={userName} itemName={voteItemName} roomID={roomId}/>
        <!-- <VoteResult userName={userName} itemName={voteItemName}  roomID={roomId} /> -->
	{:else}
        <h2>解答内容</h2>
        <form id="foo">
            <ul>
                {#each answer as item, index}
                    <li>
                        <div class="AnswerItems">
                            <input type="radio" name="vote" value={index} />
                            <span>{item}</span>
                            <br />
                        </div>
                    </li>
                {/each}
            </ul>
        </form>
        <button on:click={voteButtonClick}> 投票する </button>
        <h1 id="votedata">{label}</h1>
	{/if}
    
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
