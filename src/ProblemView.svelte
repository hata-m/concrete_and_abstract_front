<script>
	import AnswerList from "./AnswerList.svelte";
	import { getAnswers, postAnswer } from "./api/api";
	//　秦環境　テスト用
    export let hataTest;
    export let userName;
    export let array;
    export let roomId;

	let answerEntered = false;
	let answer = "";
	let answerList = [];

    $: roomIdStr = "room: " + roomId;

	async function handleSubmit() {
		if (answer) {
			answerEntered = true;
			// TODO subjectIdを動的に
			if(!hataTest){
				const didSucceed = await postAnswer(1, answer);
				const answers = await getAnswers(1);
				answerList = answers;
			}else{
				answerList = ["犬","猿"]
			}
		}
	}

</script>

<main>	
	{#if answerEntered}
		<AnswerList answer={answerList} hataTest={hataTest} userName={userName}/>
	{:else}
        <div>
            <h3 class="room">{roomIdStr}</h3>        
        </div>
		<h2>お題</h2>
		<h3>下記の単語に共通する単語を考えてください</h3>
		<ul>
			{#each array as item, index}
				<li>
					<div class="problemItems">
						<h3>{item}</h3>
					</div>
				</li>
			{/each}
		</ul>

		<h2>{userName} さんの回答を記入してください</h2>
		<form on:submit|preventDefault={handleSubmit}>
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
	{/if}
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
