# ProperScroll

### Overflow Scrolling 101

iOS's Mobile Safari allows the webkit prefixed CSS property ```-webkit-overflow-scrolling```, which allows
a container to use iOS's native scrolling for any containers with overflowing content.

### The Problem

It is a common practice, when making web applications, to disable scrolling for the document, or window. However,
if any overflowing content is using ```-webkit-overflow-scrolling: touch``` and the document is preventing touch
move events, Mobile Safari will simply ignore touch events inside of any nodes that descend from the overflowing
container.

### Use ProperScroll

```
    new ProperScroll( ['.my-div', '.my-other-div'] );
```

Specify all elements that you want to scroll, via their CSS selector, in the creation of ProperScroll. **There is no
need to prevent scrolling on the document, as ProperScroll does this for you**.

### Future

There's still plenty to be done here, as I've just recently been in need of proper overflow scrolling, some of the to-dos:
- Methods for adding/removing new elements (for now, just use the ```scrollers``` array to add/remove els)
- Tests