// import App from './App.svelte';

// const app = new App({
// 	target: document.body,
// });

// export default app;

import Launch from './Launch.svelte';
import Common from './Common.svelte';

const app = new Common({
	target: document.body,
});

export default app;