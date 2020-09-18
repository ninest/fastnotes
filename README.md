# [Quick Note](https://quicknote.now.sh/)

> **📝 Note-taking PWA powered by `localStorage`**

![GitHub](https://img.shields.io/github/license/ninest/quick-note?style=flat-square)
[![BMAC](https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-orange.svg?style=flat-square)](https://www.buymeacoffee.com/ninest)
[![HitCount](http://hits.dwyl.com/quick-note/NextBusSG.svg)](http://hits.dwyl.com/quick-note/NextBusSG)

## ⚙️ Build setup

Clone or fork the repository, then run

```bash
npm i
npm run dev
```

to start a dev server.

### PWA config

_Coming soon_

### Hosting

To host a debug:

```
vc
```

To host production:

```
vc --prod
```

## Quicker note

Copy and paste the one-line `data:text/html` strings into your browser's address bar

### First variant

```
data:text/html,<body contenteditable autofocus>
```

<details>
<summary>Full HTML</summary>

```html
<body contenteditable autofocus></body>
```

</details>

## A better writing experience

```
data:text/html,<title>Quick note</title><style>*{margin:0;padding:0;box-sizing:border-box}article:focus{outline:none}</style><body style="height:100vh;margin: 0 auto;max-width: 850px;"><article contenteditable autofocus style="min-height: 100vh;padding:2rem;background:rgb(250,250,250); color:rgba(34,34,34)">
```

<details>
<summary>Full HTML</summary>

```html
<title>Quick note</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  article:focus {
    outline: none;
  }
</style>
<body style="height: 100vh;margin: 0 auto;max-width: 850px;">
  <article
    contenteditable
    autofocus
    style="min-height: 100vh;padding: 2rem; background: rgb(250,250,250); color: rgba(34,34,34)"
  ></article>
</body>
```

</details>

```
data:text/html,<title>Quick note</title><style>*{margin:0;padding:0;box-sizing:border-box}article:focus{outline:none}</style><body style="height:100vh;margin:  auto;max-width: 850px;background:black;color: rgb(238,238,238)"><article contenteditable autofocus style="min-height:100vh;padding:2rem;background:rgb(17,17,17)">
```

<details>

<summary> Full HTML</summary>

## The dark side

```html
<title>Quick note</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  article:focus {
    outline: none;
  }
</style>
<body
  style="height: 100vh;margin: 0 auto;max-width: 850px; background: black; color: rgb(238,238,238)"
>
  <article
    contenteditable
    autofocus
    style="min-height: 100vh;padding: 2rem; background: rgb(17,17,17)"
  ></article>
</body>
```

</details>

## Warn before closing

```
data:text/html,<title>Quick note</title><style>*{margin:0;padding:0;box-sizing:border-box}article:focus{outline:none}</style><body style="height:100vh;margin:0 auto;max-width: 850px;background:black;color:rgb(238,238,238)"><article contenteditable autofocus style="min-height: 100vh;padding: 2rem; background: rgb(17,17,17)"></article><script>window.onbeforeunload=function(){return "Unsaved data"}</script></body>
```

<details>

<summary>Full HTML</summary>

```html
<title>Quick note</title>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  article:focus {
    outline: none;
  }
</style>
<body
  style="height: 100vh;margin: 0 auto;max-width: 850px; background: black; color: rgb(238,238,238)"
>
  <article
    contenteditable
    autofocus
    style="min-height: 100vh;padding: 2rem; background: rgb(17,17,17)"
  ></article>
  <script>
    window.onbeforeunload = function () {
      return "Unsaved data";
    };
  </script>
</body>
```

</details>

## 📜 License

MIT
