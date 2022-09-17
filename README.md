# What is the fastest way to get child element index?

Originally questioned in Stack Overflow: [Get child node index](https://stackoverflow.com/questions/5913927/get-child-node-index).

It was a question to ask a way to determine an element's index in its parent's children, but here I want to look for the fastest way to do it.

## Conclusion

The fastest way I found is using `previousElementSibling` + cache.

## Experiment

In the script [index.js](./index.js), methods to get a child element index are implemented. And [index.html](./index.html) performs a performance test for each of them by calling them 1000 times.

You can reproduce it by running a local server.

```
$ npx serve .
```

Here's a result on my end.

![Screen Shot 2022-09-17 at 17 55 35](https://user-images.githubusercontent.com/16313897/190849270-cad07cb3-5d20-403f-92db-8ede14af3cf1.png)

The method `'usingPreviousSiblingAndCache'` was the fastest.
