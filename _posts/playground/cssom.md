
```html
<div class="container">
<div class="progress"></div>
Hello CSSOM<span class="text"></span>
<button id="btn-run">RUN</button>
</div>
```

```css
.container .progress {
  height: 8px;
  margin: 8px 0;
}
```

```js
const style = document.createElement('style');
document.head.append(style);

let progress = 0;

function prgoressUp() {
  let textEl = document.querySelector('span.text');
  if (progress < 100) {
    progress = progress + 0.1;
    document.styleSheets[0].rules[0].style['background-size']=`${progress}%`
    setTimeout(() => {
      prgoressUp();
    }, 16);
  }
}

document.querySelector('#btn-run').onclick = () => {
  progress = 0;
  prgoressUp();
};

document.styleSheets[0].insertRule(`
  .progress {
    background-size: 0%;
    background-repeat: no-repeat;
    background-image: linear-gradient(65deg, #ff4594, #ff8426 66%, #ff4594);
    -webkit-text-fill-color: transparent;
  }
`);
```
