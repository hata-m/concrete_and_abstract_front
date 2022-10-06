<script>
    import { push } from "svelte-spa-router";
    import { roomID } from "../../../store/store";
    import { makeRoom } from "../../../api/api";

    let subjects = [];
    let userName = "";
    let roomId = 0;

    async function onSubmit() {
        const [didSucceed, roomData] = await makeRoom();
        if (!didSucceed) {
            alert("部屋の作成に失敗しました");
            return;
        }
        roomID.set(roomData.id);
        push("/make-subjects");
    }
</script>

<main>
    <h3>ユーザ名を入力してください。</h3>
    <form on:submit={onSubmit}>
        <div>
            <input
                bind:value={userName}
                type="text"
                placeholder="ユーザ名"
                required
            />
        </div>
        <button type="submit"> 部屋を生成し、問題文を作成する </button>
    </form>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 450px;
        margin: 0 auto;
    }
</style>
