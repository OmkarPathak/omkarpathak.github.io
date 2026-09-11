---
layout: post
title: "The Missing Primitive: Why Expenses and Income Weren't Enough"
date: 2026-09-11 
comments: true
description: How using TrackMyRupee myself exposed a gap in the data model, and why transfers needed to be their own concept
keywords: system design, data modeling, trackmyrupee, django, python
image: /public/img/blog-images/transfers.png
author: Omkar Pathak
tags: [System Design, TrackMyRupee, Data Modeling]
---

In my last post I wrote about why TrackMyRupee doesn't read your SMS or link to your bank account. This one picks up right after that decision, with the first real crack that showed up in the data model once I started using the app myself every day.

The first version of TrackMyRupee had exactly two tables that mattered: Expense and Income. That felt complete. Every rupee either came in or went out, so what else could there possibly be?

Within a couple of weeks of actually tracking my own money in it, that model started falling apart.

## The problem: moving your own money isn't income or an expense

Say you transfer 10,000 rupees from your salary account to a savings account. Or you pay off your credit card bill from your bank account. Or you move money into a fixed deposit. None of these are expenses, you haven't spent anything, the money is still yours, just sitting somewhere else. And none of them are income either, since nothing new came into your net worth.

I only had two buckets to put things in, so I had to force these somewhere, and both options were wrong:

- Logging the credit card payment as an Expense inflated my "monthly spending" and quietly broke budget tracking. A 15,000 rupee credit card payoff showed up as if I'd spent 15,000 rupees that month on top of everything else, when really that money was already spent earlier and this was just settling the bill.
- Skipping it entirely meant the numbers in each account stopped meaning anything. My "bank balance" inside the app would never match my real bank balance, because money leaving one account for another just vanished from the system.

Both paths led to the same place: the moment I had more than one account, expenses and income alone couldn't represent reality anymore.

## The fix: treating transfers as their own primitive

The fix wasn't clever, but it was necessary. Cash flow needs three kinds of events, not two:

- **Expense**: money leaves the system entirely (you buy something)
- **Income**: money enters the system from outside (salary, refund, interest)
- **Transfer**: money moves between two accounts you own, and your net worth doesn't change

The real difference between a transfer and the other two is that a transfer needs two accounts, not one. An expense just needs "which account did this come out of." A transfer needs "which account did this come out of, and which account did it land in."

Here's a simplified version of what the three models actually look like:

```python
class Expense(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    date = models.DateField()

class Income(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    source = models.CharField(max_length=255)
    date = models.DateField()

class Transfer(models.Model):
    from_account = models.ForeignKey(Account, related_name="transfers_out", on_delete=models.CASCADE)
    to_account = models.ForeignKey(Account, related_name="transfers_in", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateField()
```

Once Transfer existed as its own thing, the rules for how it should affect the numbers became simple and consistent:

- It should never count toward money spent this month
- It should never count toward money earned this month
- It should decrease the balance of `from_account` and increase the balance of `to_account` by the exact same amount

## The shortcut I didn't take

There was a simpler option on the table: don't add a new table at all, just log a transfer as a paired Expense and Income. One row of type Expense in an "Internal Transfer" category on the source account, and one row of type Income from an "Internal Transfer" source on the destination account.

This is less code, and it reuses tables that already exist. I still didn't go with it, for a few reasons:

- Every report that sums by category would now have to know to exclude "Internal Transfer" as a special case, forever, in every place that aggregates expenses or income
- Deleting or editing a transfer would mean finding and keeping two separate rows in sync instead of one
- It pollutes the category list with something that isn't really a spending category, which makes budgeting harder to reason about later

Modeling transfers as their own concept costs one more table and one more form. But it means total spent and total earned are always correct by construction, instead of correct only as long as every downstream query remembers to filter out a magic category.

## The short version

- A data model that looks complete on a whiteboard often only reveals its gaps once you use it for something real
- Expense and Income made perfect sense right up until I had more than one account to move money between
- The fix, in hindsight, followed a pattern I'd see again later: instead of forcing a new kind of event into an existing bucket, ask if it deserves to be its own concept, even if that means one more table

Transfers turned out to be the easy version of this lesson. The harder version showed up once accounts themselves needed to track exact balances instead of just a rough log of ins and outs, and that's where the real trouble started.
