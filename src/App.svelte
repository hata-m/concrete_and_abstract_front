<script>
	import AdminView from "./AdminView.svelte"
	import UserView from "./UserView.svelte"

	
	let roomAcquired = true;
	let roomflag = true;

	//　秦環境　テスト用
	let hataTest = false;

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
		<AdminView hataTest={hataTest}/>
	{:else}
		<UserView hataTest={hataTest}/>
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
		display:flex;
		justify-content: center;
	}

	button{
		margin: 5px;
		height: 100px;
		width: 250px;
	}

</style>
