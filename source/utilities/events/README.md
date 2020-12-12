
# Javascript Event libary

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)


## What does it do
* Trigger events throughout Javascript modules.
* VueJS like event binding on DOM elements.

## Install
Import module
```javascript
// Without enabling logging
import '@utilities/polyfills';
import '@utilities/events';

// Optionally enable logging
import Events from '@utilities/events';
Events.logging = (!Environment.isProduction() && !Environment.isAcceptation());
```

## How to use
### Bind and listen to events in Javascript
```javascript

import Events from '@utilities/events';

// Listen to events
Events.$on('eventname', (e, data) => yourOwnFunction(data));

// Trigger events
const dataObject = {
    data: {
        your: 'data here',
        or: 'here'
    }
};
Events.$trigger('eventname', dataObject);

```
Passing data to the `$trigger` method always needs to be an object with a data object nested into that.
This is to prevent future breaking changes, if we need to send more parameters as a config to the `$trigger` method.

### Bind events on DOM node

Modules gives you the option to bind on events without the need to write Javascript for this.
`<button type="button" on:[event].[prevent|stop]>Click me</button>`. On the 'event' place you can put every native JS event.
You also have the option to automatically execute preventDefault of stopPropagation by adding `.prevent` or `.stop`.

You also have the option to pass a (string only!) parameter to the event as data:
`<button type="button" on:click.prevent="eventname(parameter)">Click me</button>`

The next code snippet will look for the video instance with '12' set as instance id and trigger its play event.
`<button type="button" on:click.prevent="video[12]::play">Play Video</button>`


```html

<button type="button" on:click="eventname">Click me</button>
<button type="button" on:click.prevent="eventname(parameter)">Click me</button>
<button type="button" on:click.prevent="video[12]::play">Play Video</button>

<input type="text" on:focus="focusEvent">

```

## Dependencies
* [Custom event polyfill](utilities/polyfills/custom-event.js)

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
