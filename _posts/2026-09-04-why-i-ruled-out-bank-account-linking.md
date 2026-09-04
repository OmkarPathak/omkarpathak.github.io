---
layout: post
title: Why I Ruled Out Bank Account Linking From Day One
date: 2026-08-17
comments: true
description: The engineering and threat-modeling reasoning behind TrackMyRupee's no-SMS, no-bank-linking design decision
keywords: system design, privacy, threat modeling, trackmyrupee, personal finance, django, python
image: /public/img/blog-images/no-bank-linking.png
author: Omkar Pathak
tags: [System Design, TrackMyRupee, Security]
---

I've [written before](https://www.omkarpathak.in/2026/05/01/why-i-built-privacy-first-expense-tracker/) about why TrackMyRupee doesn't read your SMS or link to your bank account. That post was about why it matters to the user. This one is about the engineering side of the same decision: what it actually removes from the system, and what it costs me as the person building it.

When I started building [TrackMyRupee](https://trackmyrupee.com) in December 2025, the first real design decision I made had nothing to do with expenses, categories, or dashboards. It was about how the app gets its data in the first place.

## The obvious approach

Every popular personal finance app in India solves this the same way. They read your SMS inbox, or connect to your bank account directly, and parse your transactions automatically. It's an easy pitch: the user does nothing, and their expenses just show up.

To do that automatically, you need one of these:

- Read access to the user's SMS inbox, which on Android means a permission that can technically read every message on the device, not just bank ones
- Direct bank credentials or an aggregator API key, which means storing and refreshing access to someone's actual bank account
- Email access, which has the same problem as SMS but wider, since people forward all sorts of sensitive things to their inbox

I decided against all three. No SMS reading, no bank linking, no email parsing. Everything in TrackMyRupee is typed in by hand.

## Why I said no

Once you actually look at what supporting any of the above requires, the "convenience" starts looking expensive from an engineering point of view, not just a privacy one.

- **Bigger attack surface.** You're no longer storing what someone typed into a form. You're storing or brokering access to their real bank account. If that database or token ever leaks, it isn't "someone sees your expense categories," it's "someone can see your actual bank balance and transaction history."
- **SMS parsing is brittle.** Every bank formats its transaction SMS a little differently, and changes the format without warning. You end up maintaining a pile of regex patterns that quietly break the moment a bank tweaks its template.
- **A lot of spending never generates an SMS at all.** Cash, UPI to a friend that doesn't match any template you've written, a QR payment to a small vendor. An automatic tracker misses these silently, and the user has no way to know what got missed.
- **Trust is the actual product.** A privacy-first app only works if people believe their data stays theirs. Asking for SMS or bank access loses that trust with a chunk of your users immediately, no matter how good your privacy policy reads.

I work in security for a living, so this one wasn't a hard call for me. Every credential you don't store is a system you don't have to defend.

Here's roughly how the two approaches differ in what data actually flows where:

```
Aggregator model:
User's Bank / SMS inbox --> Third-party servers --> Parsed --> Categorized --> Dashboard
   (bank credentials or SMS read access shared with the app)

TrackMyRupee's model:
User types "tea at tapri 50" --> Parsed instantly in-browser --> Stored under the user's account
   (no bank credentials, no SMS access, no external data source at all)
```

## What this decision actually cost

None of this is free. Manual entry means the app lives or dies on how little friction it adds to logging a transaction. If typing an expense takes even a few seconds too long, people stop doing it within a week, and a tracker with gaps in it is worse than no tracker at all.

This is why so much of the early product work wasn't about budgets or dashboards. It was about making the natural language entry box, where you type "swiggy dinner 450" and get amount, category, and description parsed on its own, fast enough that logging an expense stopped feeling like a chore.

## The short version

- Skipping bank aggregation meant no parsers to maintain forever, no bank credentials to protect, and a threat model that stayed small on purpose
- It also meant the app's entire success now depended on manual entry being fast, which became its own multi-month problem to solve
- Every data modeling decision I made after this one had to work within this constraint, since there was no external source of truth to fall back on

If you're building something that touches financial data and you're tempted to add an integration for convenience, it's worth asking first what you're actually signing up to defend, not just what you're saving the user from typing.
