<script>
    import { push } from "svelte-spa-router";
    import { roomID, registeredSubjects } from "../../../store/store";
    import { registerSubjects } from "../../../api/api";

    let roomId;

    roomID.subscribe((value) => {
        roomId = value;
    });

    let subject = "";

    function addSubject() {
        if(subject!=""){
            $registeredSubjects = [
                ...$registeredSubjects,
                {
                    roomId: Number(roomId),
                    title: subject,
                },
            ];
            subject="";
        }
    }

    async function onSubmit() {
        const ok = await registerSubjects($registeredSubjects);
        push("/problem");
    }
</script>

<main>
    <div>
        <ul>
            {#each $registeredSubjects as item}
                <li>
                    <div class="items">
                        {item.title}
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
                on:click|preventDefault={addSubject}>追加</button
            >
        </form>
    </div>
    <div>
        <button on:click={onSubmit}>登録</button>
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
