<script>
<<<<<<< HEAD
    export let answer    
    let array = ["a","v"]
=======
    export let answer;
>>>>>>> 46a60e89558eacdbf51993233baf5b17cd7564ee
</script>

<main>
<<<<<<< HEAD
    <h2>解答内容</h2> 
    <ul>
        {#each answer as item, index}
            <li>
                <div class="toDoItems">
                    <h3>{item}</h3>
                </div>
            </li>
        {/each} 
    </ul>
    
=======
    <h2>解答内容</h2>
    <h3>{answer}</h3>
>>>>>>> 46a60e89558eacdbf51993233baf5b17cd7564ee
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
        display:flex;
        flex-flow: column;

        /* 見た目整える用 */
        /* width: 100px; */
        height: 50px;
        background: #f0f8ff;

        margin-right: 5px;
    }
</style>