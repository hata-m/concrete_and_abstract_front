<script>
	import ProblemView from "./ProblemView.svelte";
	import { getAnswers, postAnswer, getSubjects } from "./api/api";

	let subjects = [];
	let probleAcquired = true;
	let userName = "";
	let roomId = 0;

	async function handleClick() {
		if (userName && roomId) {
			// TODO subjectIDを動的に
			const subjectArray = await getSubjects(roomId);
			subjects = subjectArray;
			if (subjects) {
				probleAcquired = false;
			} else {
				alert("nodata");
			}
		}
	}
</script>

<main>
	{#if probleAcquired}
		<h3>ユーザ名とRoomIDを入力してください。</h3>
		<form on:submit|preventDefault={handleClick}>
			<div>
				<input
					bind:value={userName}
					type="text"
					placeholder="ユーザ名"
					required
				/>
			</div>
			<div>
				<input
					bind:value={roomId}
					type="text"
					placeholder="RoomID"
					required
				/>
			</div>
			<button type="submit"> 問題文を表示する </button>
		</form>
	{:else}
		<ProblemView {userName} {subjects} {roomId} />
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
