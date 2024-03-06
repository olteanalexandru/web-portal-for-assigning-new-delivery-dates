// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = {
//   preprocess: [
//     preprocess({
//         postcss: true,
//     }),
// ],



  kit: {

    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        //prevent favicon errors:
        // if (path === '/favicon.ico') return false;
        // if (path === '/favicon.png') return false;
        // if (path === '/favicon.svg') return false;


      }
    },

adapter: adapter({
  pages: 'build',
  assets: 'build',
  fallback: 'index.html',
  static: 'static'
}),
prerender: { entries: [] }
  }
}

export default config;


