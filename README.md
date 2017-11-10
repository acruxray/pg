# pg

Password generation

## How to use

### Ready interface

1. Set static keys: **key 1** and **key2** (optional).
2. Set dynamic key: **key 3** (optional).
3. Focus out **key 3** field.
4. Copy generated password to clipboard.

To see a live example, visit [the project page](https://acruxray.github.io/pg).

### Custom solution

Set to page body:

```html
<script src="./js/base64.js"></script>
<script src="./js/md5.js"></script>
<script src="./js/pg.js"></script>
```
To generate a password, use the following method:

```javascript
var password = pg(key1, key2, key3);
```

Here you can use one, two, or all keys:

```javascript
var password1 = pg('key 1', '', '');
var password2 = pg('key 1', 'key 2', '');
var password3 = pg('key 1', 'key 2', 'key 3');
var password4 = pg('', 'key 2', 'key 3');
var password5 = pg('', '', 'key 3');
var password6 = pg('key 1', '', 'key 3');
var password7 = pg('', 'key 2', '');
```


## Credits

1. [Clipboard.js](https://clipboardjs.com/)
2. [Base64 encode / decode](http://www.webtoolkit.info/)
3. [Calculate the md5 hash](http://www.webtoolkit.info/)

## License

[The MIT License](https://github.com/acruxray/pg/blob/master/LICENSE)
