---
title: "Scrapping product's review from Aliexpress"
date: "2024-11-15"
excerpt: "Recently, I worked on SAAS, a system through which users can receive visual directives about their car's windshield. So I was swamped but needed to wo..."
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/aliexpress.png"
---

Recently, I worked on SAAS, a system through which users can receive visual directives about their car's windshield. So I was swamped but needed to work on something else that one of my clients wanted from me. I have got ambition to develop Shopify apps but I never had the time for that. He was asking for something that would get reviews from [**Aliexpress**](https://www.aliexpress.com/) for the products he was selling on his site. Simply the concept was to scrape product reviews from **Aliexpress** for dropshippers. I was like, okay, the task is very cool because I would go through lots of things that I could implement in my next projects.

I searched on Google and found that some people already have this kind of project in their [**Github**](https://github.com/) repo but those were not what I wanted. I got a very good thing by exploring their projects that I could get **JSON** results from a specific endpoint of **Aliexpress**. 

https://feedback.aliexpress.com/pc/searchEvaluation.do

This endpoint takes lots of parameters that can filter the **JSON** results. Most importantly, the Product ID needs to be passed as a parameter to this endpoint. For an example, `1005001927450633` is a product ID. If I pass this product ID to the endpoint, it will return with all reviews available on the first page (considering all reviews are stored and paginated, so more reviews will take more pages). Here's the first review's result (not all pages')

{
    "aigc": false,
    "anonymous": false,
    "buyerAddFbDays": 0,
    "buyerCountry": "RU",
    "buyerEval": 100,
    "buyerFbType": {
        "crowdSourcingPersonName": "AliExpress Shopper",
        "sourceLang": "en",
        "typeTranslationAccepted": "crowdsourcing"
    },
    "buyerFeedback": "это кроссовки мечты! идеальные, бесподобные. супер упакованны. в коробке в пыльниках, еще и полустельки положили я не могу на них налюбоваться. на мою стопу 24,5 я взяла размер 40. подошли идеально. запас небольшой, но есть. вот прям в пору. не большие не маленькие. я редко в размер попадаю. обычно беру 40 е размеры и они прям на размер велики, но я беру так спеециально, что б точно не малы. с туфлями так попала взяла 39 и оказались малы, хотя выбирала по таблице и списывалась с продавцом, но по итогу туфли малы оказались поэтому и кросы взяла 40 й и о чудо мне  в пору) иак что я супер довольна. спасибо продавцу ❤️",
    "buyerName": "Р\*\*\*а",
    "buyerProductFeedBack": "",
    "downVoteCount": 0,
    "evalDate": "19 Sep 2024",
    "evaluationId": 50146099416942042,
    "evaluationIdStr": "50146099416942042",
    "images": \[
        "https://ae01.alicdn.com/kf/Adce9ac6cd8854fc0a4f8dc9d0cd64f39i.jpeg",
        "https://ae01.alicdn.com/kf/A93d1480755a24d8c815557f075fcd65cS.jpeg",
        "https://ae01.alicdn.com/kf/Abeee0936da424c79b9290e87a078afaeN.jpeg",
        "https://ae01.alicdn.com/kf/Ad5cd607abab745f495d1b16fe246d508Y.jpeg",
        "https://ae01.alicdn.com/kf/Ae2740abaa53246a0b840992344436d22B.jpeg",
        "https://ae01.alicdn.com/kf/A23832cd752fd47dfa9d58eb56f24e0c63.jpeg",
        "https://ae01.alicdn.com/kf/A79f20a08e53646a0bf5e21ccaf99dc94P.jpeg"
    ],
    "logistics": "AliExpress Standard Shipping",
    "selectedIcon": "https://ae01.alicdn.com/kf/S2df5f3fa0d8242b1a0bbb1cc92cab109P/221x221.png",
    "selectedReview": true,
    "sellerReply": "Thanks for purchasing in BEAUTODAY, your satisfaction is our goal, see you next time",
    "skuInfo": "Color:Beige Gray Logo Shoe Size:8.5 Ships From:CN ",
    "status": "1",
    "thumbnails": \[
        "https://ae01.alicdn.com/kf/Adce9ac6cd8854fc0a4f8dc9d0cd64f39i.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/A93d1480755a24d8c815557f075fcd65cS.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/Abeee0936da424c79b9290e87a078afaeN.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/Ad5cd607abab745f495d1b16fe246d508Y.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/Ae2740abaa53246a0b840992344436d22B.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/A23832cd752fd47dfa9d58eb56f24e0c63.jpeg_220x220.jpeg",
        "https://ae01.alicdn.com/kf/A79f20a08e53646a0bf5e21ccaf99dc94P.jpeg_220x220.jpeg"
    ],
    "trendyol": false,
    "upVoteCount": 0
}

A lot of information, right? But the problem was with the product ID. Programs are meant to be operated without critical actions. If users need to find product ID, then how does the program become efficient? That's where I thought about **Browser Extension**. Dropshippers get products from different vendors, and **Browser Extension** helps to collect product IDs with one click. IDs will be bound in a **CSV** or **Txt** file, and uploading this file will work, right?

The most interesting thing I found in the endpoint of **API** is feedback can be translated to any language. Reviews can be classified by star rating also like getting only 5-star reviews. `buyerEval` the property reflects star. `100` refers to `5`. **CDN**\-hosted images can be found also with the results if the reviewer uploads. This is how stuffs are generated. This thing can be turned into a business idea but think about this service, there are lots of people out there who want to show their customers real reviews of their products which they are dropshipping from **Aliexpress**. I have got this in my mind about this idea. I will write about it here in my blog someday
