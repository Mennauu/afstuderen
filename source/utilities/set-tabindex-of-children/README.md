
# Set tabindex of children

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)


## What does it do
* Sets the tabindex of all tabbable children

## Install
Import utility
```javascript
import setTabIndexOfChildren from '@utilities/set-tabindex-of-children';
```

## How to use
### Use default selector values
```javascript
setTabIndexOfChildren(HTMLElement, -1);
```

### Extend the default values
```javascript
setTabIndexOfChildren(HTMLElement, -1, 'element:not([disabled])');
```


### Overwrite the default values
```javascript
setTabIndexOfChildren(HTMLElement, -1, 'element:not([disabled])', true);
```


## Dependencies
This package doesn't not have any dependencies.

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
