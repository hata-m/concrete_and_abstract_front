<script>
    import ProblemView from "./ProblemView.svelte";
	import { getAnswers, postAnswer, getSubjects} from "./api/api";
	//　秦環境　テスト用
    export let hataTest;

	let subjects = [];
	let probleAcquired = true;
	let userName = ""
    let roomId =""

	async function handleClick() {
		if (userName) {
            if(hataTest){
                subjects = ["犬", "猿", "雉"];
			    probleAcquired = false;
            }else{
                const subjectArray = await getSubjects(1);
                subjects = subjectArray
                if(subjects){
                    probleAcquired = false;
                }else{
                    alert("nodata")
                }
            }
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
		<ProblemView  hataTest={hataTest} userName={userName} subjects= {subjects} roomId={roomId}/>
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
