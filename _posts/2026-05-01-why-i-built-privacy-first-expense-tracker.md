---
layout: post
title: Why I Built a Privacy-First Expense Tracker (And Stopped Letting Apps Read My SMS)
comments: true
description: Privacy focused finance tracker dashboard
keywords: TrackMyRupee, privacy-first expense tracker, Walnut alternative India, build in public, personal finance, React, Python, indie hacker, omkar pathak, finance tracker, privacy focused expense tracker
image: /public/img/blog-images/trackmyrupee.png
tags: [django, python, web]
---

It seems like every personal finance app in India today wants the same thing: full access to your SMS inbox, your email, and sometimes even your bank login credentials. 

They promise convenience for automatic expense categorization, instant balance updates, and zero manual entry. But as a developer, I know exactly what happens behind the scenes. You aren't just trading a few minutes of manual entry for convenience; you are trading your entire financial footprint, vendor history, and spending habits to third-party data aggregators. 

I wanted a clean, minimalist dashboard to track my investments, mutual funds, and daily expenses. But I absolutely refused to hand over my SMS permissions to get it. 

When I set out on my 12-products-in-12-months building challenge this year, tackling this specific problem was at the top of my list. I needed a tool that respected user data above all else. Since I couldn't find a reliable one that didn't constantly nag me for permissions, I built it myself.

Enter **[TrackMyRupee, a privacy-first expense tracker](https://trackmyrupee.com)**.

### The "No-Bank-Access" Philosophy

TrackMyRupee is built on a very simple, non-negotiable premise: **Your data is yours.** There is zero SMS scraping. There is zero bank account linking. It is designed for professionals who actually want manual control over their financial data. 

When building this, I focused on three core pillars:
1. **Absolute Privacy:** We don't read your messages. We don't connect to your bank. You input what you want to track, and nothing else.
2. **Frictionless Manual Entry:** Manual tracking only works if the UI gets out of your way. I spent a lot of time refining the interface to ensure that logging an expense or updating your net worth takes seconds, not minutes.
3. **Enterprise-Grade Security:** Even though it's an indie product, it’s built with strict data isolation and privacy-first architectural patterns. 

### Why Manual Tracking Actually Works Better

There is a psychological benefit to manual expense tracking that automated apps completely miss. When an app silently categorizes a Swiggy order in the background, you don't feel the impact of that spending. 

When you have to take five seconds to log that expense yourself into a **[manual finance dashboard](https://trackmyrupee.com)**, you become hyper-aware of your cash flow. It shifts your mindset from passively *viewing* your expenses to actively *managing* your wealth. It's the same reason writing notes by hand helps you remember them better than typing.

### Try It Out

TrackMyRupee is live, and I am actively iterating on it based on community feedback. If you are tired of invasive apps and want to take back control of your financial data without the spreadsheet headaches, I'd love for you to give it a spin.

👉 **[Try TrackMyRupee here](https://trackmyrupee.com)** If you are a developer, a fellow indie hacker, or just someone passionate about data privacy, let me know what you think of the UI and the workflow. You can drop your feedback in the comments below or reach out to me directly!
