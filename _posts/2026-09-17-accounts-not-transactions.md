---
layout: post
title: "Accounts, Not Transactions: Rebuilding Around Where the Money Actually Sits"
date: 2026-09-17
comments: true
description: Why a log of expenses, income and transfers still couldn't answer a simple question, and what adding Account as a first-class entity fixed
keywords: system design, data modeling, trackmyrupee, django, python, net worth
image: /public/img/blog-images/accounts-not-transactions.png
author: Omkar Pathak
tags: [System Design, TrackMyRupee, Data Modeling]
---

In the [last post](/2026/09/11/the-missing-primitive-transfers/) I wrote about adding Transfer as a third primitive alongside Expense and Income. That fixed the immediate problem. It did not fix the next one, which showed up almost right away.

## The question three tables still couldn't answer

Once Expense, Income and Transfer existed, I had a complete log of every rupee moving in, out, and between places. What I still didn't have was a straight answer to the most basic question in personal finance: how much money do I actually have, right now, in my bank account.

Technically the answer was in there. You could sum every Income and Transfer-in for that account, subtract every Expense and Transfer-out, and get a number. But that meant re-deriving the balance from scratch on every page load, over every transaction that account had ever seen. And it had a worse problem hiding underneath it: it only worked if every single transaction since the beginning of time had been logged correctly. Miss one entry from three months ago, and the derived number is wrong forever, silently.

A log of movement is not the same thing as a record of position. I needed both.

## Introducing Account as its own entity

The fix was to stop treating "which bank account" as a label on a transaction and start treating it as a real entity with its own state. An Account carries its own balance. Every Expense, Income, and Transfer references one (or two, for a Transfer), and touches that stored balance directly when it's created, edited, or deleted.

```python
class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    account_type = models.CharField(max_length=20)  # CASH, BANK, CREDIT_CARD, ...
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
```

This turns "what's my balance" from a query over your entire history into reading one field. It also finally gave the app a place to put money that existed before you ever opened it. When you create an account, you tell it what's already sitting there as an opening balance, instead of being forced to reconstruct your last five years of banking history just to get today's number right.

## Why a stored balance instead of always computing it

There were two honest options here, and I want to be fair to the one I didn't pick.

**Option A: always compute the balance from transaction history.** This is the "obviously correct" option on paper. The balance can never drift from the transactions, because it *is* the transactions, summed. No stored state to get out of sync.

**Option B: store the balance and update it on every write.** Faster to read, and it gives you a real starting point (the opening balance) instead of requiring perfect historical data. But now there are two things that need to agree: the stored number, and what the transactions actually add up to.

I went with Option B, mainly because Option A doesn't actually solve the "money that existed before this app did" problem, and because a personal finance app that needs to re-sum years of history to render a dashboard is not going to feel fast to use.

Here's the trade-off laid out plainly:

| | Computed balance | Stored balance |
|---|---|---|
| Reading the balance | Sum over full history, every time | One field read |
| Opening balance support | Awkward, needs a fake backdated transaction | Native, just a starting number |
| Risk of drift | None, it's derived by definition | Real, if a write path forgets to update it |

That last row is the one that mattered later. Storing the balance meant I was implicitly promising that every code path touching money would update it correctly, forever. That promise didn't hold, and the crack it left behind is the subject of the next post.

## The short version

- A transaction log tells you what moved. It doesn't tell you where things stand right now, not without re-deriving it every time.
- Account became the anchor entity: everything else (Expense, Income, Transfer, and later FD, RD, loans) hangs off it and updates its balance.
- Storing the balance instead of computing it made the app fast and gave real accounts a real starting point, at the cost of now having a number that has to be kept honest by every single write path.

That cost showed up sooner than I expected, once a second system started tracking the same money in parallel.
