---
title: "A 43,000+ selling theme has got a very simple silly bug!"
date: "2025-04-10"
excerpt: "I wrote my last blog on 19th Feb 2025. Today is 12th April 2025—almost like 2 months. I was swamped during Ramadan month. Also, I had to go thro......"
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/ella-main-preview.jpg"
---

I wrote my last blog on **19th Feb 2025**. Today is **12th April 2025**—almost like 2 months. I was swamped during Ramadan month. Also, I had to go through some financial terms during that time. Let's not talk more about what happened and move on to the main topic. I have used the [**Ella theme**](https://themeforest.net/item/ella-multipurpose-shopify-theme-os-20/9691007?s_rank=1&gad_source=1&gbraid=0AAAAADf3e4GQcGsZ18Ste-DBKx5Nwatfj&gclid=CjwKCAjw--K_BhB5EiwAuwYoyqM0dATL9NoR4iT3U_Ga37zvV51SSFnPI5iSXxqRl4wWVklZsQh5YxoCfisQAvD_BwE) for two **Shopify** websites of my clients. Ella theme is a fully-featured e-commerce theme that will come up with everything you need for a store. Specifically, I like the features like **Multiple Languages**, **Multiple Currencies**, **Multi-level Categories**, etc. But the theme has got a very silly issue on the **product's image gallery**. 

The issue occurs when you add a video to a product's image gallery. Specifically, it occurs when the **Video Layout** is set to **Thumbnail**. 

 ![](https://old.jstales.com/storage/uploads/blobid1744406811791.png "Screenshot 2025-04-12 032620.png") 

# **So what's the problem?**

Here's a red mark in the screenshot that represents the issue.

![](https://old.jstales.com/storage/uploads/blobid1744409616205.png "Screenshot 2025-04-12 035722.png")

This is a video in a photo gallery of a product. **">"** this unwanted character appears in front of the video. And it's not like it's a bug of old versions. I am using **version 6.7.3**. I have seen this issue on old versions too! So what's the problem? The problem is in the code that retrieves `data-video-url` for the video. 

<div class\="productView-video mp4" data\-mp4 data\-type="mp4" data\-video-url="{{ media | video_tag: controls: true, image_size: 'master' }}"\>
    {{ media | video_tag: controls: true, image_size: 'master' }}
</div>

That unwanted character appears because of the value, `{{ media | video_tag: controls: true, image_size: 'master' }}`, which is set to the attribute, `data-video-url`. The interesting fact is, if `data-video-url` attribute and value are not provided, nothing happens and the bug just goes away!  
  
Another thing is if you put your video in the product's image gallery after one or several images, the video will play automatically if you select the video from thumbnails! But sometimes, you need to place the video at the first and want the video to be played automatically. That's where the theme lacks an option for that. If you put a video at the first of the image gallery of a product, it will never play automatically. It will play automatically when the video is after images!   
  
And here's a nice solution for this issue. Everything that needs to be done to solve this is to set an `autoplay:true` attribute to the media filter. I posted this solution also in the community forum of Shopify. 

![](https://old.jstales.com/storage/uploads/blobid1744411592316.png "Screenshot 2025-04-12 044534.png")Here's the link to the discussions: **[https://tinyurl.com/2p9py5n3](https://tinyurl.com/2p9py5n3)**

I would like to talk more about the **Ella theme** on my next blog where I will talk about some more features that can be added to enrich the theme more!
