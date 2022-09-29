<script>
	import AdminView from "./AdminView.svelte";
	import UserView from "./UserView.svelte";

	let roomAcquired = true;
	let roomflag = true;

	function createRoomClick() {
		roomflag = true;
		roomAcquired = false;
	}

	function joinRoomClick() {
		roomflag = false;
		roomAcquired = false;
	}
</script>

<main>
	{#if roomAcquired}
		<h1>アプリケーションへようこそ！</h1>
		<div class="room">
			<form on:click={createRoomClick}>
				<button> 部屋を作成する </button>
			</form>
			<form on:click={joinRoomClick}>
				<button> 部屋に参加する </button>
			</form>
		</div>
	{:else if roomflag}
		<AdminView />
	{:else}
		<UserView />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 500px;
		margin: 0 auto;
	}

	.room {
		display: flex;
		justify-content: center;
	}

	button {
		color: white;
		margin: 5px;
		height: 100px;
		width: 250px;
		cursor: pointer;
		background-color: #3e3f46;
		border: 0;
	}

	button:hover {
		transition-duration: 500ms;
		background-color: #33a3ee;
	}
</style>
