
# contre

Continuously release from git repos into a github-style directory structure.

_Due to a limitation of juliangruber/pushover, pushing multiple tags at once
doesn't work_

## Usage

```javascript
var Contre = require('contre');
var http = require('http');

var contre = Contre({
  from : __dirname + '/repos',
  to : __dirname + '/static'
});

http.createServer(contre.handle()).listen(3000);
```

Now push some repo with a file `foo.txt` to `contre`:

```bash
$ git push http://localhost:3000/test.git master
$ git push --tags http://localhost:3000/test.git
...
$ ls repos
test.git
$ tree static
static/
└── test
    ├── master
    │   └── foo.txt
    └── 0.0.1
        └── foo.txt
```

Tadaa!

## Installation

```bash
$ npm install contre
```

## API

### Contre(opts)

Required `opts`:

* `from`: Directory that contains all repos
* `to`: Directory in which the repos will be laid out in a github-style
directory structure

Returns an EventEmitter that emits a `release`-event whenever it is pushed to.

### Contre#handle()

Returns a new request handler to be passed to `http.createServer()` that does
all the stuff.

### Contre#release(push|tag)

Used internally by `Contre#handle()`. Use this if you need to do more on each
push/tag. See `examples/custom`.

`push`/`tag` comes directly from
[pushover](https://github.com/substack/pushover) or is an object with keys

* repo: relative path to the repo from repo root, see `from`
* branch/version: revision to check out 

## License

(MIT)

Copyright (c) 2012 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
