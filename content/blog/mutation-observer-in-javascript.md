---
title: "Mutation observer in JavaScript!"
date: "2024-12-20"
excerpt: "Mutation Observer! It may seem like a new term, but this is a cool feature of JavaScript. What is it? MutationObserver is a JavaScript built......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/1_ndE1FVeIFoZmFkHSWk2jCw.png"
---

Mutation Observer! It may seem like a new term, but this is a cool feature of **JavaScript**. What is it? `MutationObserver` is a **JavaScript** built-in object that allows monitoring **DOM** changes. In a very simple word, it can be used to track changes in a **DOM** and fire certain things that we call **Callbacks**. The most interesting part is it can be configured according to need. It has `observe()` method, it has `disconnect()` method. What I like most about the `MutationObserver` is it can trigger notifications and you can have all queued notifications as an array using this `takeRecords()` method. I was working on an extension for one of the biggest e-commerce platforms in Bangladesh, [**Daraz**](https://daraz.com/). My idea was to have an extension that simplifies the process of getting coupons from stores. But I went through a problem. The problem was that **Daraz** renders multiple **iFrames** inside the **DOM**. And I don't know why but **Daraz** home page's size is almost **4.6 MB** and it takes sometimes more than 10-12 seconds to load the whole site properly. And I can't wait till the page loads because it can be delayed sometimes.

In case a user is using **3G** internet, we will delay more than usual. So I needed a technique to capture the coupon part of the product page and let my extension work after it can find that specific content. That's what `MutationObserver` does. I am simply copying the `MutationObserver` part from [**MDN JavaScript**](https://developer.mozilla.org/en-US/docs/Web/JavaScript) because I am currently writing on my **Windows** and the extension was coded in my **Linux Distro (Ubuntu)**.

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(\`The ${mutation.attributeName} attribute was modified.\`);
    }
  }
};

const observer = new MutationObserver(callback);

`callback` is the callback function for the observer and `observer` is the instance of `MutationObserver`. What can we do more with it? We can configure it like if it should watch `childLists` or `subtree` or `attributes`! For that, a variable can be passed into `observe()` method after the **targetNode**. 

const config = { attributes: true, childList: true, subtree: true };
observer.observe(targetNode, config);

Here's **targetNode** is the node that `MutationObserver` will look for. This object is very useful because, in many contexts, we can use it to get results. What about performance? 

For performance issues, I believe the callback function needs to be optimized properly because a `MutationObserver` can be fired 1000x times in 1 second. It's a **microtask** so it blocks further **DOM** processing also the page ends up causing **1-2 seconds** more loading time. And it's better to not let the `MutationObserver` callback use more than **1% CPU**. Also, it's better to let `subtree` **false** for recursive fire issues. Long story short, `MutationObserver` needs to be used properly and the [**devtools profiler**](https://developer.chrome.com/docs/devtools/?hl=en) is the thing that can help in this context. I will talk about the **devtools profiler** someday in my blogs.
