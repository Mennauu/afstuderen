# Image component

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)

![Video Demo](./_demo/video.gif)

## What does it do
* Lazyloads images when in view
* Adds `object-fit` polyfill

## Install
Import module
```javascript
import '@utilities/polyfills';
import '@components/image';
```

## How to use

### Default

```javascript
import '@utilities/polyfills';
import '@components/image';
```

```htmlmixed
{% from 'image.html' import image  %}

{{ image({
    preload: 'https://i.vimeocdn.com/video/301621689_10.jpg',
    image: 'https://i.vimeocdn.com/video/301621689_1024.jpg',
    srcset: 'https://i.vimeocdn.com/video/301621689_320.jpg 320w, https://i.vimeocdn.com/video/301621689_480.jpg 480w, https://i.vimeocdn.com/video/301621689_768.jpg 768w, https://i.vimeocdn.com/video/301621689_1024.jpg 1024w, https://i.vimeocdn.com/video/301621689_1280.jpg 1280w, https://i.vimeocdn.com/video/301621689_1440.jpg 1440w'
}) }}
```

### Object fit polyfill
For object fit, the image macro simply has a boolean option `objectFit` to turn it on or off.
If the polyfill is applied (Edge and IE), it will take the tablet image and make this a background image on the `figure` element, with `background-size: cover;`.

#### Use Objectfit without image component
If you somehow want to use the polyfill without the image component, it will work like this:
* Make sure your image has an attribute `js-hook-objectfit-img`.
* Make sure your image is wrapped in an block element with the attribute `js-hook-objectfit-container` (doesn't need to be a direct child).
* The JS will apply a class to the html node if the polyfill is applied, and based on that class the container will get a `background-size: cover;`.
* The JS will then first look for a `srcset` with an image of 1024px. If that isn't found it will use as fallback the image src param.
* That image will be applied as background image to your container element.


## Dependencies
* [In-view libary](/utilities/in-view/)
* [Events libary](/utilities/events/)
* [Closest polyfill](/polyfills/DOM/closest.js) (included in FE setup, make sure include it in the polyfills file)
* [Remove](polyfills/DOM/remove.js) (included in FE setup, make sure include it in the polyfills file)


## Developers
* [Jeroen Reumkens](mailto:jeroen-reumkens@tamtam.nl)
* [Adrian Klingen (co author)](mailto:adrian.klingen@deptagency.com)
