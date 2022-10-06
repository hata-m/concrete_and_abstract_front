<script>
    import { push } from "svelte-spa-router";
</script>

<main>
    <h1>具体と抽象</h1>
    <div class="room">
        <form on:click={() => push("/create-room")}>
            <button> はじめる </button>
        </form>
        <form on:click={() => push("/join-room")}>
            <button> さんかする </button>
        </form>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 500px;
        margin: 0 auto;
    }

    /* .room {
        display: flex;
        justify-content: center;
    } */

    /* button {
        color: white;
        margin: 5px;
        height: 100px;
        width: 250px;
        cursor: pointer;
        background-color: #4ba3e3;
        border: 0;
    }

    button:hover {
        transition-duration: 500ms;
        background-color: #64beff;
    } */
</style>
