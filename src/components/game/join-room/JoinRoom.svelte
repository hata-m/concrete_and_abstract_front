<script>
    import { push } from "svelte-spa-router";
    import { createUser } from "../../../api/api";
    import { roomID, user } from "../../../store/store";

    let userName = "";
    let roomId = 0;

    user.subscribe((value) => {
        userName = value.name;
    });

    async function handleClick() {
        if (userName && roomId) {
            const [ok, userInfo] = await createUser({
                name: userName,
            });

            if (ok) {
                user.set({
                    id: userInfo.id,
                    name: userInfo.name,
                });
                roomID.set(roomId);
                push("/problem");
            } else {
            }

        }
        if(roomId==0){
            alert("RoomIDが0の部屋は存在しません。")
        }
    }
</script>

<main>
    <h3>ユーザ名とRoomIDを入力してください。</h3>
    <form on:submit={handleClick}>
        <div>
            <input
                bind:value={userName}
                type="text"
                placeholder="ユーザ名"
                required
            />
        </div>
        <div>
            <input
                bind:value={roomId}
                type="text"
                placeholder="RoomID"
                required
            />
        </div>
        <button type="submit"> 問題文を表示する </button>
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
