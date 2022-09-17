/** Cache used in usingPreviousSiblingAndCache */
const cache = new WeakMap();

window.indexOfElement = {
  /**
   * Call Array.prototype.indexOf directly.
   * https://stackoverflow.com/a/23528539
   */
  usingArrayIndexOf(element) {
    return Array.prototype.indexOf.call(
      element.parentElement.children,
      element
    );
  },
  /**
   * Convert parentElement.children to array and call indexOf.
   * https://stackoverflow.com/a/39395069
   */
  usingES6ArrayIndexOf(element) {
    return Array.from(element.parentElement.children).indexOf(element);
  },
  /**
   * Use element.previousElementSibling.
   * https://stackoverflow.com/a/5913984
   */
  usingPreviousSibling(element) {
    let index = 0;
    let currentChild = element.previousElementSibling;
    while (currentChild) {
      index++;
      currentChild = currentChild.previousElementSibling;
    }
    return index;
  },
  /**
   * Improved version of `usingPreviousSibling` with cache.
   */
  usingPreviousSiblingAndCache(element) {
    if (cache.has(element)) {
      return cache.get(element);
    }

    let index = 0;
    let currentChild = element.previousElementSibling;
    while (currentChild) {
      if (cache.has(currentChild)) {
        index += cache.get(currentChild) + 1;
        break;
      } else {
        index++;
      }

      currentChild = currentChild.previousElementSibling;
    }

    cache.set(element, index);
    return index;
  },
  /**
   * Binary search with compareDocumentPosition.
   * https://stackoverflow.com/a/44875786
   */
  usingBinarySearch(element) {
    const searchParent = element.parentElement;
    if (searchParent === null) {
      return -1;
    }

    const childElements = searchParent.children;
    let lo = -1;
    let mi;
    let hi = childElements.length;
    while (1 + lo !== hi) {
      mi = (hi + lo) >> 1;
      if (
        !(
          element.compareDocumentPosition(childElements[mi]) &
          Node.DOCUMENT_POSITION_PRECEDING
        )
      ) {
        hi = mi;
      } else {
        lo = mi;
      }
    }
    return childElements[hi] === element ? hi : -1;
  },
};
