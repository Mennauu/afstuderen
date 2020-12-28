# Modal component

## Table of contents

1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)

![Modal Demo](https://media.giphy.com/media/3BMtWjq6gBFu8iHqsS/giphy.gif)

## What does it do

- Create modalboxes with an easy to use macro.
- Open and close modalboxes.
- Bind custom events to DOM elements that should have modalbox behavior. (ie. Open and Close)

## Install

Import module

```javascript
import '@utilities/focus-trap'

moduleInit.async('[js-hook-modal]', () =>
  import(/* webpackChunkName: "Modal" */ '@components/modal'),
)
```

## How to use

### Default

Create modalbox in HTML.

```htmlmixed
{% from 'modal.html' import modal  %}

You can add the following options:
* `size` must be a string. Allows for custom width overrides.
* `mobileOnly` must be a boolean. If true, the modal will not set initial tabindex properties on tablet and bigger. Default false.
* `autoFocus` must be a boolean. If true, on activation the first focusable element will be auto focussed. Default true.
* `noBodyClass` must be a boolean. If true, there will be no body class set on activation of the modal. Default false.
* `closeAllOthers` must be a boolean. If true, forces all other modalboxes to close when this one opens. Default false.
* `noClose` must be a boolean. If true, will not render a close button allowing for custom close buttons. Default false.
* `keepScrollPosition` must be a boolean. If true, scroll position of body will be kept in place on mobile breakpoints. Especially handy for mobile menu's. Default false.

{% call modal({
    id : 'modal-example',
    size                : 'string',
    mobileOnly          : 'true',
    autoFocus           : 'true',
    closeAllOthers      : 'true',
    noBodyClass         : 'false',
    closeAllOthers      : 'false',
    noClose             : 'false',
    keepScrollPosition  : 'false'
}) %}

    Your content here.

{% endcall %}

<button type="button" aria-controls="modal-example" aria-label="Open modalbox">
    Open example modalbox
</button>

```

### Custom

Custom html element

```htmlmixed
<div id="modal-custom"
    data-modal-auto-focus="true"
    data-modal-close-all-others="true"
    data-modal-no-body-class="false"
    data-modal-keep-scroll-position="true"
    js-hook-modal>
    I am a custom modalbox

    <button type="button" js-hook-button-modal-close aria-label="Close modalbox">
        Close
    </button>
</div>

<button type="button" aria-controls="modal-custom" aria-label="Open modalbox">
    Open example modalbox
</button>

```

Bind custom html element to modal.

```javascript
Events.$trigger('modal::bind', { data: { hook: '#modal-custom' } })
```

## Dependencies

- [Events utility](/utilities/events/)
- [Focus trap utility](/utilities/focus-trap/)
- [Screen Dimensions](/utilities/screen-dimensions/README.md)
- [Set tabindex of children utility](/utilities/set-tabindex-of-children)
- [Dom elements utility](/utilities/dom-elements)

## Developers

- [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
- [Jeroen Reumkens (co author)](mailto:jeroen.reumkens@tamtam.nl)
