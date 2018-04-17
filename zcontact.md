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

<!-- For sending emails via JS -->
<script src="https://smtpjs.com/v2/smtp.js">
</script>

<!-- Tutorial from:https://blog.webjeda.com/google-form-customize/ -->
<form class="form scroll-effect">

      <label>Name</label>
      <input id="name" type="text" required/>

      <label>Email</label>
      <input type="email" id="email" required />

      <label>Message</label>
      <textarea id="message" rows="5" required></textarea>

      <input type="submit" value="Send" onclick="SendEmail()"/>

</form>

<script>
  function SendEmail() {
    // API: https://www.smtpjs.com/

    Email.send(document.getElementById("email").value,
    "omkarpathak27@gmail.com",
    "Message from: " + document.getElementById("name").value,
    document.getElementById("message").value,
    {token: "c82f279a-3729-445b-be7d-48ad3c9b85a4"});

    window.location.href = "/thank-you/";
  }
</script>
