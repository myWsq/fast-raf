# Fast Raf

![GitHub package.json version](https://img.shields.io/github/package-json/v/myWsq/fast-raf) ![NPM](https://img.shields.io/npm/l/fast-raf)

A better requestAnimationFrame. Fast Raf can merge multiple requestAnimationframes into one for you. And the usage is the same as before.

# Live Demo

Check [this demo](https://mywsq.github.io/fast-raf/example/). Open your devtools - performance, take a recording for comparing.

**Fast Raf Disabled**

![disabled](./fast-raf-disabled.jpg)

**Fast Raf Enabled**

![enabled](./fast-raf-enabled.jpg)

## Installation

(Recommended) Use npm and bundler. Just import it on the top of you code.

```shell
$ npm install fast-raf
```

```js
import "fast-raf";
```

You can also use `script` tag

```html
<script src="https://unpkg.com/fast-raf@1.0.0/dist/fast-raf.js"></script>
```

## License

MIT License

Copyright (c) 2020 myWsq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
