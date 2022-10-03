<script>
	import ProblemView from "./ProblemView.svelte";
	import Button from '@smui/button'
	import { getAnswers, postAnswer, getSubjects } from "./api/api";
    import { registeredUserName, registeredRoomId, registeredUserId } from "./store/store";
	let subjects = [];
	let probleAcquired = true;
	let userName = "";

	let roomId = 0;

	async function handleClick() {
		if (userName && roomId) {
			// const user = await createUserId(userName);	//userIdの生成
			// let userId = user.id 

			// registeredUserId.set(userId);
			registeredRoomId.set(roomId);
			registeredUserName.set(userName);


			const subjectArray = await getSubjects($registeredRoomId);
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
		<body class="text-center">
			<form on:submit|preventDefault={handleClick}>
		<!-- <img class="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
				<h1 class="h3 mb-3 font-weight-normal">ユーザ名とRoomIDを入力してください。</h1>
				<label for="inputUserName" class="sr-only">ユーザ名</label>
				<input bind:value={userName} type="text" id="inputUserName" class="form-control" placeholder="ユーザ名" required="" autofocus="">
				<label for="inputRoomID" class="sr-only">RoomID</label>
				<input bind:value={roomId} type="text" id="inputRoomID" class="form-control" placeholder="RoomID" required="">
				<br/>
				<Button class="btn btn-lg btn-primary btn-block" type="submit">問題文を表示する</Button>
			</form>
		
			<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script>
		window.jQuery || document.write('<script src="/docs/4.3/assets/js/vendor/jquery-slim.min.js"><\/script>')
		</script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script><script src="/docs/4.3/assets/js/vendor/anchor.min.js"></script>
		<script src="/docs/4.3/assets/js/vendor/clipboard.min.js"></script>
		<script src="/docs/4.3/assets/js/vendor/bs-custom-file-input.min.js"></script>
		<script src="/docs/4.3/assets/js/src/application.js"></script>
		<script src="/docs/4.3/assets/js/src/search.js"></script>
		<script src="/docs/4.3/assets/js/src/ie-emulation-modes-warning.js"></script> -->
	  
	
	</body>
	{:else}
		<ProblemView subjects={subjects}/>
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
