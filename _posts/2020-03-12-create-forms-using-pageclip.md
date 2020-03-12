---
layout: post
title: Pageclip - A server for your HTML forms
comments: true
description: A step by step guide on how you can create forms for your static website
keywords: omkar pathak, jekyll blog, jekyll, forms, html, contact forms, html contact forms, pageclip, omkar pageclip, omkar pathak pageclip, pageclip blog
image: https://i.imgur.com/Jwx2XKL.png
tags: [website, forms, html, tutorial]
---

# Introduction

One thing that most of the developers struggle with is the creation of contact form for their static website. This site where you're reading this blog
is also a static website rendered using [Jekyll](https://jekyllrb.com/). Like every other portfolio website, I too needed a contact form on my website
using which people would contact me. I have already used tons of different services in order to achieve my goal. Today I am going to show one such 
interesting service called [pageclip](https://pageclip.co/) 

## Index

- [Why Pageclip?](#why-pageclip)
- [Setting Up](#setting-up)
- [Features](#features)

<a id="why-pageclip"></a>

## Why Pageclip?

[Pageclip](https://pageclip.co/) is a server for all your HTML form submissions. What this means is, you create your HTML forms and just point the form action attribute
to pageclip's provided URL. That's it. Pageclip takes care of all your submissions. That was simple, right? But here's more to it. Pageclip also provides you 
a beautiful dashboard to get all email submissions at one place. Not only that, you can also get those responses on your personal email. Now that's 
what I was exactly looking for.

<a id="setting-up"></a>

## Setting Up

Here are the steps you can follow to setup pageclip for your portfolio website:

**Step 1**: Create an account on [Pageclip](https://pageclip.co/signup)
**Step 2**: Once you signup, you'll be asked for your domain name
**Step 3**: Next step is to create a new form using the `+` symbol. Once you click on the `+` button, you'll get a prompt like this
  
  ![Imgur](https://i.imgur.com/5VSKf8i.png)

**Step 4**: Just give a meaningful form name for your reference
**Step 5**: You can tick the option to *specify addresses to email on each submission* where you can specify email IDs to which you want to send the responses to
**Step 6**: Click on create form and you'll see a form created with the name you specified in step 4
**Step 7**: Now you can click on your create form name from the left panel where you can find all the instructions to setup the HTML code. General steps would be:
  
**Step 7a**: First we have to add required Javascript in `<body>` and `</body>` tags
    
```html
<script src="https://s.pageclip.co/v1/pageclip.js" charset="utf-8"></script>
```
    
**Step 7b**: Now we have to add their custom CSS
    
```html
<link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen">
```
    
**Step 7c**: You can now add your custom form in your website. Note the action attribute provided on your dashboard, this is the URl where you post ypour data to 
    
```html
<form action="https://send.pageclip.co/<your_token>/<your_form_name>" class="pageclip-form" method="post">
  <!-- Replace these inputs with your own. Make sure they have a "name" attribute! -->
  <input type="text" name="name" value="Roscoe Jones" />
  <input type="email" name="email" value="roscoe@example.com" />

  <!-- This button will have a loading spinner. Keep the inner span for best results. -->
  <button type="submit" class="pageclip-form__submit">
    <span>Send</span>
  </button>
</form>
```

More information about the same can be found in [Docs](https://pageclip.co/docs#website-integration)

<a id="features"></a>

## Features

- REST API support
- Easy integrations
- Web hooks
- Simple and elegant dashboard
- Free plan that is very suitable for portfolio websites
