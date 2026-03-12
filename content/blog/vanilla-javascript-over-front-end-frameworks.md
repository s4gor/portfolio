---
title: "Vanilla JavaScript over Front-end Frameworks!"
date: "2024-10-30"
excerpt: "I was amazed to hear that Netflix shifted to vanilla js from React then. Though they didn't shift fully. They used vanilla for client-side so that it...."
featuredImage: "https://old.jstales.com/storage/uploads/headerImages/javascript-illustration.png"
---

I was amazed to hear that [**Netflix**](https://www.netflix.com/) shifted to vanilla js from [**React**](https://react.dev/) then. Though they didn't shift fully. They used vanilla for client-side so that it can eliminate loading time of **React**. I realized that it was a good idea actually because **Netflix** almost reduced by 50% load times and reduced like 200kb size. Isn't it cool? You don't need any framework actually for front-end. I am not going to lie, I am also a fan of **React** but when I think about the project, I always prefer to pick the appropriate one. Complex frameworks are not needed especially for less interactive or static pages. For example, I worked on a project that simply beautifies [**Google Forms**](https://www.google.com/forms/about/). It wasn't a complicated project. at that time, I was in my third year and encountered a video where someone was talking about the Google form like how one can make it beautiful, etc etc. So I came up with the idea of making a **SAAS**.  I used **React** at that time which was unnecessary. I could use vanilla js there. Later I burnished the project by implementing vanilla js for the front-end. And it's quite simple. 

Let's use a public API from [**{JSON} Placeholder**](https://jsonplaceholder.typicode.com/) from which we can get some data and map it. 

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))

This simple async call fetches data from the server. It will return with this result

{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}

Mapping this data in HTML with some design will work out, right? What's about in a complicated case? Modern js is something different. I know it will be a burden to manipulate DOM every time, especially in large projects. For large project, framework fits best. But its not necessary to use framework for every part of the project. Some people think that frameworks are magic. But it's not like that. Yes, I agree that managing vanilla js can be a burden for big projects, but if the project is not reactive and you need some custom solution, then it's fine to go with vanilla js. I heard from a guy on **Reddit**, who said he made a front end with vanilla js. The backend was [**PrestaShop**](https://prestashop.com/). As his project was not reactive, but SSR, vanilla js was the perfect match for him. And he ended up building a lightweight e-commerce front-end.

Let's see this example between **vanilla js** and **Vue**. This is written in pure **JavaScript** 

const span = document.createElement('span');  
span.classList.add('my-span');  
const input = document.createElement('input');
input.id = 'my-input';
input.classList.add('my-class');  
input.addEventListener('input', $event => span.textContent = $event.target.value);

document.body.append(input, span);

And this is written in **Vue**. Other frameworks are more or less the same. 

<script setup>
import {ref} from 'vue';
const myInput = ref('');
</script>
<template\>
  <span class\="my-span"\>{{myInput}}</span\>
  <input id\="my-input" v-model\="myInput" class\="my-class"/>
</template\>

I am not against frameworks but I always prefer to use appropriate ones over the hyped ones. There were lots of times I ended up writing my own micro-library which was under **1kb** doing exactly the same task that can be done by frameworks with 10 times more loads. However, it fell apart later because of scalability! So simply there's no need to make the project complex where very simple things are needed. Rather than that, it would be wise to get advantages of both vanilla js and frameworks like **Netflix** does.
