---
layout: post
title: Designing a Contact form in Jekyll
comments: true
description: How to setup Jekyll contact form easily that will send the response directly to your email
keywords: javascript, jekyll, contact form, jekyll contact, jekyll contact form, emailjs, jekyll emailjs contact form, jekyll omkar, omkar pathak jekyll, omkar pathak jekyll contact form, freelance web developer, omkar pathak freelancer pune, pune
image: /public/img/blog-images/jekyll.png
---

## Why do you need a Contact Form?

Not only portfolio websites, but also business websites need a contact us section for easy communication and customer interaction. Contact Forms are easy to handle and interact and prove a better way for communication. That is why today I am going to show you a method that you can use to create contact forms on Jekyll and send the response directly on you email!

Initially when I switched to Jekyll, I referred this website [Webdeja](https://blog.webjeda.com/jekyll-contact-form/) to create a contact form for my personal website. Webdeja has mentioned three methods in which you can create contact forms using SimpleForm, Formspree, and Google Forms. However, SimpleForm and Formspree have stopped their free plans and now are having only the paid options. So I had to go for Google Forms option. Having used Google forms for about three months, I was a bit confused about its usage. The reason behind that is, Google Forms sends an update email saying that 'Your form XYZ was updated' and gives a link to a Google sheet were all the responses are stored. I had to manually visit that link and had to fetch the new response every time. This is why, I was constantly searching for a better way to deal with it. But even Google search was not helping. But somehow, I managed to find a way and today I sharing with you the same.

## Steps

1. **Register on [EmailJS](https://www.emailjs.com/) and choose a free plan**

    First step is to register on above website and choosing their free plan. EmailJS is a website that provides a Javascript API for sending emails. Their free plan includes 200 emails per month which is more than enough for a portfolio website.

2. **Visit the [dashboard](https://dashboard.emailjs.com/)**

    After the registration process visit the dashboard and click on **Email Services** tab on the left and create a new service. If you want to receive emails on Gmail, select **Gmail** as your service provider. After selecting the service provider, you will be prompted to create a Service name and Service ID. Note this Service ID carefully as you will further need it. After entering all the information correctly click on the *Add Service* option.

3. **Next visit the *Email Templates* tab on the left menu**

    In email templates tab, you will create a template for your email response that you want to receive in your inbox. You can select a blank template and or their predefined templates. You can add custom text, media, etc in your templates. Once template is created click on your template name. You will see editable contents such as Subject, Content, etc. One fascinating thing about EmailJS is their *variable parameters*. These are the variable names enclosed in \{\{\}\} (double curly braces). These variables are passed using their api and are stored in your templates directly. Suppose in subject you want to pass the name of the person contacting. Then you can simply write {{name}}

4. **Note the Template ID and Service ID**

    Remember to note the Template ID and Service ID that you had created earlier. Next, add this code to your <head></head> tags.

    ```html
    <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script type="text/javascript">
       (function(){
          emailjs.init("<YOUR_UNIQUE_ID>");
       })();
    </script>
    ```

    where YOUR_UNIQUE_ID is the ID Unique ID provided for each user. You can get yours at this [link](https://dashboard.emailjs.com/integration)

5. **Now create a HTML Form**

    You can now create a sample HTML Form something like:

    ```html
    <form class="form scroll-effect" id="myForm">

          <label>Name</label>
          <input id="name" type="text" required/>

          <label>Email</label>
          <input type="email" id="email" required />

          <label>Message</label>
          <textarea id="message" rows="5" required></textarea>

          <input type="submit" id="submit" value="Send"/>

    </form>
    ```

    The main attribute that we will be needing is the **id** attribute. Therefore, give the value for *id* attribute accordingly.

6. **Last step to write some Javascript for sending our response email**

    You can now write the Javascript and use the EmailJS API to send an email response to your Gmail. My code looks like:

    ```html
    <script>
      function SendEmail() {
        // API: https://www.emailjs.com/
        emailjs.send(
          "gmail",
          "personal_website",
          {
            name: document.getElementById("name").value,
            message: document.getElementById("message").value,
            email: document.getElementById("email").value
          }
          );
      }

      document.getElementById("myForm").addEventListener("submit", function(event){
          event.preventDefault();
          SendEmail();
          setTimeout(function(){
            window.location = "/thank-you/";
           }, 3000);
          // alert('Done!');
      });
    </script>
    ```

    where `document.getElementById("name").value` will be capturing the value entered by user in the input field. Note that we are passing `name`, `message` and `email` to emailjs api. These are the variable parameters that we are capturing in our email templates in step 3. That's it, now can test your contact form and you will receive an email in your Gmail right away.

    Note: I have given a delay of 3 seconds in the above code bacause for some reason, emailjs takes some time before sending the request.


Hope this helps :)
Happy Coding!
