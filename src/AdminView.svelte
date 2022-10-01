<script>
	import ProblemView from "./ProblemView.svelte";
	import MakeSubjects from "./MakeSubjects.svelte";
	import { getAnswers, postAnswer, getSubjects, createRoomID, createUserId } from "./api/api";
	import { registeredUserName, registeredRoomId, registeredUserId } from "./store/store";

	let subjects = [];
	let probleAcquired = true;
	let userName = "";
	let userId = 0;
	let roomId = 0;

	async function handleClick() {
		if (userName) {
			// TODO subectIDを動的に
			// const subjectArray = await getSubjects(roomId);
			// subjects = subjectArray;
			// if (subjects) {
			// 	probleAcquired = false;
			// } else {
			// 	alert("nodata");
			// }
			
			// const user = await createUserId(userName);	//userIdの生成
			// userId = user.id 
			// const room = await createRoomID();			//roomIdの生成
			// roomId = room.id;
			
			// storeの変数に書き込み
			registeredUserId.set(userId);
			registeredUserName.set(userName);
			registeredRoomId.set(roomId);

			probleAcquired = false;
		}
	}
</script>

<main>
	{#if probleAcquired}
		<h3>ユーザ名を入力してください。</h3>
		<form on:submit|preventDefault={handleClick}>
			<div>
				<input
					bind:value={userName}
					type="text"
					placeholder="ユーザ名"
					required
				/>
			</div>
			<button type="submit"> 部屋を生成し、問題文を表示する </button>
		</form>
	{:else}
		<!-- <ProblemView {userName} {subjects} {roomId} /> -->
		<MakeSubjects />
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
