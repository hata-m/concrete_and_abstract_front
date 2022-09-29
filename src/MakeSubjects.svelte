<script>
    let subjects = ["fsafa"];
    let subject = "";

    $: mutSubjects = subjects;

    function registerSubject() {
        subjects.push(subject);
    }
</script>

<main>
    <div>
        <ul>
            {#each mutSubjects as item, index}
                <li>
                    <div class="items">
                        {item}
                        <br />
                    </div>
                </li>
            {/each}
        </ul>
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
                on:click|preventDefault={registerSubject}>submit</button
            >
        </form>
    </div>
</main>

<style>
    main {
        display: flex;
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
