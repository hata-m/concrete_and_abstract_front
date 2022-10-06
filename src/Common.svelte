<script>
    import Router from "svelte-spa-router";
    import { routes } from "./routes";
</script>

<main>
    <section>
        <div class="circle">
            <i />
            <i />
            <i />
            <i />
        </div>
    </section>
    <Router {routes} />
</main>

<style>
    section {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        min-width: 100vw;
        background: linear-gradient(90deg, #49aeff, #ff4c89);
    }
    .circle {
        position: relative;
        width: 800px;
        height: 800px;
        background: linear-gradient(90deg, #49aeff, #ff4c89);
        border-radius: 50%;
    }
    .circle i {
        position: absolute;
        background: linear-gradient(90deg, #49aeff, #ff4c89);
        filter: blur(50px);
        z-index: 2;
        inset: 5px;
        border-radius: 50%;
    }
    .circle i:nth-child(4) {
        background: #fff;
        z-index: 3;
        inset: 5px;
    }
</style>
