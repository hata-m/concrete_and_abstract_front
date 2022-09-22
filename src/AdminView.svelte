<script>
    import ProblemView from "./ProblemView.svelte";
	import { getAnswers, postAnswer } from "./api/api";
	//　秦環境　テスト用
    export let hataTest;

	let array = [];
	let probleAcquired = true;
	let userName = ""
    let roomId =""

	function handleClick() {
		if (userName) {
			array = ["犬", "猿", "雉"];
			probleAcquired = false;
  		}
	}

</script>

<main>
	{#if probleAcquired}
		<h3>ユーザ名を入力してください。</h3>
		<form on:submit|preventDefault={handleClick}>
			<div>
				<input bind:value={userName} type="text" placeholder="ユーザ名" required>
			</div>
			<button type="submit"> 部屋を生成し、問題文を表示する </button>
		</form>
	{:else}
		<ProblemView  hataTest={hataTest} userName={userName} array= {array} roomId={roomId}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 450px;
		margin: 0 auto;
	}
</style>
