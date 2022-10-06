<script>
    import { push } from "svelte-spa-router";
    import { createUser } from "../../../api/api";
    import { roomID, user } from "../../../store/store";

    let userName = "";
    let roomId;

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
        if (roomId == 0) {
            alert("部屋が存在しません。");
        }
    }
</script>

<main>
    <!-- <h3>ユーザ名と部屋番号を入力してください。</h3> -->
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
                placeholder="部屋番号"
                required
            />
        </div>
        <button type="submit"> さんかする </button>
    </form>
</main>

<style>
    input{
        /* height: fit-content; */
        margin: 5px;
    }
</style>
