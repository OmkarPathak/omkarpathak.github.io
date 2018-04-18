---
layout: page
title: CONTACT ME
permalink: /contact/
description: A computer geek and a Python enthusiast who loves to code. Huge fan of open source softwares and an active contributor on GitHub. Also love to sketch and read Agatha Christie's novels.
image: https://www.omkarpathak.in/public/img/about_me_1.jpg
---

<p class="message scroll-effect" style="margin-bottom: 20px;">
  Need help? Want to hire me as a freelancer for your work? Feel free to contact me and I would be happy to help!
  <br />
  Mail: <a href="mailto: omkarpathak27@gmail.com">omkarpathak27@gmail.com</a>
</p>

<!-- Tutorial from:https://blog.webjeda.com/google-form-customize/ -->
<form class="form scroll-effect" id="myForm">

      <label>Name</label>
      <input id="name" type="text" required/>

      <label>Email</label>
      <input type="email" id="email" required />

      <label>Message</label>
      <textarea id="message" rows="5" required></textarea>

      <input type="submit" id="submit" value="Send"/>

</form>

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
