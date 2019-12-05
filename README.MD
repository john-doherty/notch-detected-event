# notch-detected-event

[![Linked In](https://img.shields.io/badge/Linked-In-blue.svg)](https://www.linkedin.com/in/john-i-doherty) [![Twitter Follow](https://img.shields.io/twitter/follow/mrjohndoherty.svg?style=social&label=Twitter&style=plastic)](https://twitter.com/mrjohndoherty)

A 2k script that fires a `notch-detected` event if the device has a notch <i>(currently iPhone X, XS, XR, XS Max and Google Pixel 3)</i>. If detected `data-notch="true"` and `data-orientation="portrait|landscape"` will be added to the `<html>` element:

```html
<html data-notch="true" data-orientation="portrait">
```

This allows you to modify the UI at runtime using CSS, ideal for progressive web apps.

## Usage

Add [notch-detected-event.min.js](dist/notch-detected-event.min.js) to your page and update your CSS:

```css
/* make room for the notch at the top */
html[data-notch][data-orientation="portrait"] body {
  padding-top: 44px;
  height: calc(100% - 44px);
}

/* make room for the notch at the sides */
html[data-notch][data-orientation="landscape"] body {
  padding-left: 44px;
  padding-right: 44px;
  width: calc(100% - 44px - 44px);
}
```

Or listen for the event and execute some logic:

```js
window.addEventListener('mobile-notch-detected', function(e) {
  console.log("Notch detected, move shit around");
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

### Development

The project includes everything needed to develop/test. Run the following then visit [http://your-local-ip:8080](http://localhost:8080) on your mobile device or emulator.

```bash
git clone https://github.com/john-doherty/notch-detected-event
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

Star the repo if you find this as it helps me prioritize which open source bugs I should tackle first.

This script was inspired by SO thread [detecting mobile device “notch”](https://stackoverflow.com/questions/46318395/detecting-mobile-device-notch).


## History

For change-log, check [releases](https://github.com/john-doherty/notch-detected-event/releases).

## License

Licensed under [MIT License](LICENSE) &copy; [John Doherty](http://www.johndoherty.info)
