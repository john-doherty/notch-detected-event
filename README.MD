# notch-detected-event

A 0.7k script that fires a `notch-detected` event if the device has a notch <i>(currently iPhone X, XS, XR, XS Max and Google Pixel 3)</i>. If detected a [HTML5 data attribute](http://html5doctor.com/html5-custom-data-attributes/) will be added to the `<html>` element:

```html
<html data-notch="true">
```

Allows you to modify the UI at runtime using CSS:

```css
/* make room for the notch at the top */
@media screen and (orientation: portrait) {
  html[data-notch="true"] {
    padding-top: 44px;
    height: calc(100% - 44px);
  }
}

/* make room for the notch at the sides */
@media screen and (orientation: landscape) {
  html[data-notch="true"] {
    padding-left: 44px;
    padding-right: 44px;
    width: calc(100% - 44px - 44px);
  }
}
```

Or listen for the **notch-detected** event and execute some logic:

```js
window.addEventListener('notch-detected', function(e) {
  console.log("Notch detected, move shit around");
});
```

## Install

Add [notch-detected-event.min.js](dist/notch-detected-event.min.js) to your app/page.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

### Development

The project includes everything needed to develop/test. Run the following then visit [http://your-local-ip:8080](http://localhost:8080) on your mobile device or emulator.

```bash
git clone https://github.com/orca-scan/notch-detected-event
cd notch-detected-event
npm install
npm start
```

### Update .min files

To create a new version of the minified [notch-detected-event.min.js](dist/notch-detected-event.min.js) file from source, tweak the version number in `package.json` and run the following:

```bash
npm run build
```

## Star the repo

Find this useful? Star the repo - it help us priorities open source tasks 🌟

## License

[MIT License](LICENSE) © Orca Scan - a [barcode app](https://orcascan.com) with simple [barcode tracking APIs](https://orcascan.com/guides?tag=for-developers).
