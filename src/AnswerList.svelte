<script>
    import VoteResult from "./VoteResult.svelte";
    import { getAnswers, postAnswer, getSubjects, getVoteResult, postVoteAnswer } from "./api/api";
    import { registeredUserName, registeredRoomId } from "./store/store";
    export let answer;

    
    let voteFlag = false;
    let voteResult=[];
    let voteItemName="";

    let labeldata = "投票前";
    $: label = labeldata;
    async function voteButtonClick() {
        let hoge = document.getElementById("radio_form");
        var itemName = hoge.vote.value;
        if (itemName != "") {
            voteItemName = answer[itemName].answer;
            const didVote = await postVoteAnswer($registeredRoomId,voteItemName, $registeredUserName)
            const didSucceed = await getVoteResult($registeredRoomId);
            voteResult = didSucceed;
            sort("count");
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
			(a[column].count < b[column].count) 
			? -1 * sortModifier 
			: (a[column].count > b[column].count) 
			? 1 * sortModifier 
			: 0;
		
		voteResult = voteResult.sort(sort);
	}
</script>

<main>
    {#if voteFlag}
        <!-- <VoteResult voteResult={voteResult} userName={userName} itemName={voteItemName} roomId={roomId}/> -->
        <VoteResult voteResult={voteResult} itemName={voteItemName}/>
	{:else}
        <h1 id="votedata">{label}</h1>
        <h2>解答内容</h2>
        <form id="radio_form">
            <ul>
                {#each answer as item, index}
                    <li>
                        <div class="AnswerItems">
                            <input type="radio" name="vote" value={index} /> {item.answer}
                            <br />
                        </div>
                    </li>
                {/each}
            </ul>
        </form>
        <button on:click={voteButtonClick}> 投票する </button>
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
