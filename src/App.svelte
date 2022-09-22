<script>
	import ToDoInputForm from "./AnswerList.svelte";
	import { getAnswers, postAnswer } from "./api/api";
	let array = [];
	let probleAcquired = true;
	let answerEntered = false;
	let answer = "";
	let answerList = [];
	let problem = "問題文を取得前";
	let hataTest = false;

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

	function handleClick() {
		problem = "問題文を取得しました";
		array = ["犬", "猿", "雉"];
		probleAcquired = false;
	}
</script>

<main>
	<h1>アプリケーションへようこそ！</h1>
	{#if probleAcquired}
		<button on:click|once={handleClick}> 問題文を表示する </button>
	{:else if answerEntered}
		<ToDoInputForm answer={answerList} hataTest={hataTest}/>
	{:else}
		<h2>お題</h2>
		<h3>下記の単語に共通する単語を考えてください</h3>
		<ul>
			{#each array as item, index}
				<li>
					<div class="ProblemItems">
						<h3>{item}</h3>
					</div>
				</li>
			{/each}
		</ul>

		<h2>お題の回答を記入してください</h2>
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
</style>
