<script>
    import { push } from "svelte-spa-router";
    import { roomID, registeredSubjects } from "../../../store/store";
    import { registerSubjects, fetchNews } from "../../../api/api";

    let roomId;

    roomID.subscribe((value) => {
        roomId = value;
    });

    let subject = "";

    function addSubject() {
        if (subject != "") {
            $registeredSubjects = [
                ...$registeredSubjects,
                {
                    roomId: Number(roomId),
                    title: subject
                }
            ];
            subject = "";
        }
    }

    async function onSubmit() {
        if ($registeredSubjects.length > 0) {
            const ok = await registerSubjects($registeredSubjects);
            push("/voting-result");
        } else {
            alert("お題が登録されていません");
        }
    }

    function onDelete(idx) {
        $registeredSubjects.splice(idx, 1);
        $registeredSubjects = $registeredSubjects;
    }

    async function onFetchNews() {
        const news = await fetchNews();
        console.log(news);
        news.forEach((article) => {
            $registeredSubjects = [
                ...$registeredSubjects,
                {
                    roomId: Number(roomId),
                    title: article["url"]
                }
            ];
        });
    }
</script>

<main>
    <div class="box">
        <form class="subject-form">
            <input class="inp" type="text" required="" bind:value={subject} placeholder="具体" />
            <button type="button" class="btn" on:click|preventDefault={addSubject}>追加</button>
        </form>
    </div>

    <div class="box">
        <ul>
            {#each $registeredSubjects as item, index}
                <li class="subject-item">
                    <div class="items">
                        {#if item.title.startsWith("https://")}
                            <a href={item.title} target="_blank" rel="noreferrer noopener">{item.title}</a>
                        {:else}
                            {item.title}
                        {/if}
                        <br />
                    </div>
                    <div>
                        <button class="delete-button" on:click={() => onDelete(index)}> 削除 </button>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    <div>
        <button class="startbtn" on:click={onFetchNews}>ニュース記事を追加</button>
    </div>

    <div>
        <button class="startbtn" on:click={onSubmit}>登録</button>
    </div>
</main>

<style>
    .subject-form {
        display: flex;
    }

    ul {
        font-size: xx-large;
        min-height: 200px;
        align-items: flex-start;
    }

    li {
        margin: 5px;
    }

    .subject-item {
        display: flex;
        justify-content: space-between;
    }

    .subject-item::before {
        content: none;
    }

    main {
        width: 600px;
    }

    input {
        /* height: fit-content; */
        margin: 5px;
    }

    .startbtn {
        width: calc(100% - 10px);
        /* margin: 0px; */
    }
    .btn {
        width: 125px;
    }

    .delete-button {
        width: 3vw;
        height: 5vh;
        font-size: small;
    }

    .items {
        margin: auto 0;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
