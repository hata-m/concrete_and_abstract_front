<script>
    import { registeredSubjects } from "./store/store";

    let subject = "";

    function registerSubject() {
        $registeredSubjects = [...$registeredSubjects, subject];
    }

    function onSubmit() {}
</script>

<main>
    <div class="item-box">
        {#each $registeredSubjects as sub}
            <div class="items">
                {sub}
                <br />
            </div>
        {/each}
    </div>
    <div class="box">
        <form class="subject-form">
            <div class="input-container">
                <input
                    class="inp"
                    type="text"
                    required=""
                    bind:value={subject}
                    placeholder="お題"
                />
            </div>
            <button
                type="button"
                class="btn"
                on:click|preventDefault={registerSubject}>追加</button
            >
        </form>
    </div>
    <div>
        <button type="button" class="btn" on:click={onSubmit}> 登録 </button>
    </div>
</main>

<style>
    .item-box {
        border: 3px solid #eee;
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .subject-form {
        display: flex;
    }

    .subject-form .input-container .inp {
        height: 50px;
    }

    .subject-form .btn {
        height: 50px;
    }
</style>
