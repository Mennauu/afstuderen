
# Javascript screen dimensions libary

## Table of contents
1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Developers](#markdown-header-developers)


## What does it do
* Caches screen dimensions and breakpoints.

## Install
Import module
```javascript
import ScreenDimensions from '@utilities/screen-dimensions';
```

## How to use
You can configure the breakpoints according to your grid settings.

### Get dimensions
Get width / height of your screen.
Returns a string

```javascript

ScreenDimensions.screenWidth
ScreenDimensions.screenHeight

```

### Get breakpoint

Check if the screen matches a breakpoint. 
Returns a boolean.

```javascript

ScreenDimensions.isMobile
ScreenDimensions.isMobileAndBigger

ScreenDimensions.isMobilePlus
ScreenDimensions.isMobilePlusAndBigger

ScreenDimensions.isTabletPortrait
ScreenDimensions.isTabletPortraitAndBigger

ScreenDimensions.isTabletLandscape
ScreenDimensions.isTabletLandscapeAndBigger

ScreenDimensions.isLaptop
ScreenDimensions.isLaptopAndBigger

ScreenDimensions.isDesktop
ScreenDimensions.isDesktopAndBigger

ScreenDimensions.isWidescreen
ScreenDimensions.isWidescreenAndBigger

```

## Dependencies
* [Raf Throttle utility](/utilities/raf-throttle)

## Developers
* [Adrian Klingen](mailto:adrian.klingen@deptagency.com)
* [Dylan Vens](mailto:dylan.vens@deptagency.com)
