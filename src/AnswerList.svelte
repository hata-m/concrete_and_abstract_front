<script>
    export let hataTest;
    export let answer;
    export let userName;
    let labeldata =  "投票前";
    $: label = labeldata;
    function voteButtonClick() {
        labeldata = "押されました";
        let hoge = document.getElementById("foo");
		// var radioItem = element.vote;
        var itemName = hoge.vote.value;
        if(itemName!=""){
            labeldata = userName+"さんは \""
            if(!hataTest){
                labeldata = labeldata + answer[itemName].answer
            }else{
                labeldata = labeldata + answer[itemName]
            }
            labeldata = labeldata +"\" に投票しました"
            
        }else{
            labeldata = "投票項目が選択されていません" 
        }
	}
</script>

<main>
    <h2>解答内容</h2>
    <form id="foo">
    <ul>
        {#each answer as item, index}
            <li>
                <div class="AnswerItems">
                    <input type="radio" name="vote" value={index}>
                    {#if hataTest}
                        <span>{item}</span>
                    {:else}
                        <span>{item.answer}</span>
                    {/if}
                    
                    <br/>
                </div>
            </li>
        {/each}
    </ul>
    </form>
    <button on:click={voteButtonClick}> 投票する </button>
    <h1 id="votedata">{label}</h1>
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
