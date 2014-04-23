# store-supplant

  Interpolation plugin for **[datastore](http://github.com/bredele/datastore)**

## Installation

  Install with [component(](http://component.io):

    $ component install bredele/store-supplant

  Install with [nodejs)](http://nodejs.org):

    $ npm install store-supplant

## Idea

[Store](http://github.com/bredele/datastore) is a small library to create model/collection objects on both client and server sides. The idea is to have a template engine which doesn't depend of the implementation in order to be used with document objects (i.e in your browser) or in nodejs.

## API

```js
var supplant = require('store-supplant');

var store = new Store({
  repo: 'store'
});
store.use(supplant);
```

### .supplant(str, fn)

  Substitute string variables with store data and return result.

```js
var result = store.supplant('{{repo}}');
```

  Listen for changes on variables and return result.

```js
var result = store.supplant('{{repo}}', function(val){
  console.log(val);
});

store.set('repo', 'brick');
```

### .filter(name, fn)

  Apply filter(s) on variables.

```js
store.filter('upper', function(str) {
  return str.toUpperCase();
});
var result = store.supplant('{{repo} | upper }');
```

or

```js
store.filter({
  upper: function(str){
    return str.toUpperCase();
  },
  bang: function(str) {
    return str + '!'
  }
});
//chaining filters
var result = store.supplant('{{repo} | upper | bang }');
```

## License

  The MIT License (MIT)

  Copyright (c) 2014 <Olivier Wietrich> olivier.wietrich@gmail.com

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
