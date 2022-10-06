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
        if($registeredSubjects.length>0){
            const ok = await registerSubjects($registeredSubjects);
            push("/voting-result");
        }else{
            alert("お題が登録されていません");
        }

    }
</script>

<main>
    <div class="box">
        <form class="subject-form">
            <input
                class="inp"
                type="text"
                required=""
                bind:value={subject}
                placeholder="具体"
            />
            <button
                type="button"
                class="btn"
                on:click|preventDefault={addSubject}>追加</button
            >
        </form>
    </div>

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

    li{
        margin: 5px;
    }

    main{
        width: 600px;
    }

    input{
        /* height: fit-content; */
        margin: 5px;
    }

    .startbtn {
        width:calc(100% - 10px);
        /* margin: 0px; */
    }
    .btn {
        width: 125px;
    }
</style>
