---
layout: post
title: The Day My Balance Field Started Lying to Me
date: 2026-09-24
comments: true
description: Why a single mutable balance field wasn't enough for a net worth product, and how I discovered it had quietly drifted from reality
keywords: system design, double entry ledger, accounting, data integrity, trackmyrupee, django
image: /public/img/blog-images/balance-field-lying.png
author: Omkar Pathak
tags: [System Design, TrackMyRupee, Ledger, best finance tracker India, bharat, rupee, track expenses, track income, finance operating system]
---

In the [last post](/2026/09/17/accounts-not-transactions/) I explained why I moved to a stored `balance` field on Account instead of computing it from history every time. That field carried the last row's promise with it: every write path touching money would have to update it correctly, forever. This post is about the first time that promise quietly broke.

## Why a balance field wasn't enough on its own

For a while, `Account.balance` was fine. Log an expense, subtract from balance. Log a transfer, subtract from one account and add to the other. It worked, right up until I wanted something a net worth product actually needs: a way to prove, after the fact, that the numbers on screen are correct, and a way to trace back what happened if they're not.

A single mutated field can't do that. It has no memory. If a bug decreases a balance by the wrong amount, or a migration touches it incorrectly, or a race condition applies the same expense twice, the field doesn't know anything went wrong. It just has whatever value it has. There's no audit trail, no way to replay history, and no way to ask "what should this number actually be, based on everything that happened."

The fix I reached for is the same one every real accounting system uses: double-entry bookkeeping. Instead of one mutable number, every transaction posts two lines that must always net to zero, a debit somewhere and a credit somewhere else.

```python
class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.CharField(max_length=255)
    source_type = models.CharField(max_length=50)   # 'expense', 'transfer', ...
    source_id = models.PositiveIntegerField()

class JournalLine(models.Model):
    entry = models.ForeignKey(JournalEntry, related_name="lines", on_delete=models.CASCADE)
    ledger_account = models.ForeignKey(LedgerAccount, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)  # signed
```

An expense of 500 rupees from a bank account becomes two lines: -500 against the bank account, +500 against an expense category account. Add them up and they cancel out, by construction. That's the whole point of the model: correctness isn't something you have to verify separately, it falls out of the arithmetic.

## Running both systems side by side

I didn't rip out `Account.balance` to build this. I ran the ledger alongside it, as a shadow system, updated on every write path in parallel. That felt safe: the old field kept working exactly as before, and the new ledger was purely additive.

Except "purely additive" was the assumption I hadn't tested. Both systems were supposed to represent the same underlying number. Nothing enforced that they actually did.

```
Account.balance  <-- updated directly by save()/delete() overrides
Ledger           <-- updated by a separate shadow_post_* call on the same event

If any single code path forgets one side, or if one side reverses
a transaction using a different amount than the other side applied,
the two numbers quietly stop agreeing. Nothing crashes. Nothing errors.
Both numbers keep looking perfectly valid on their own.
```

## Finding the drift

I added a `LedgerReconciliationReport` that stores both numbers side by side for every account: `account_balance`, `ledger_balance`, and a `drift_amount` computed as the difference. The fact that I needed a drift column at all was the tell. If the two systems genuinely couldn't diverge, there'd be nothing to store.

Once I actually ran it, some accounts had real, non-zero drift. Small amounts in most cases, but present, and growing over time as more transactions flowed through. Not a single bug I could point to and fix. A structural guarantee: two systems tracking the same money, written to independently, will disagree eventually. That's not a code review problem. It's what happens when there isn't one canonical source of truth.

## The short version

- A stored balance field has no memory of how it got to its current value. When something goes wrong, there's nothing to audit and nothing to replay.
- Double-entry bookkeeping fixes that by making correctness structural (every entry nets to zero) instead of something you have to trust.
- Running a new ledger alongside the existing balance field felt safe because it was additive, but "additive" quietly assumed both systems would always be updated in lockstep. They weren't.
- A `drift_amount` column that actually has non-zero values in it is proof that you have two sources of truth, not one, no matter how good either system looks in isolation.

Finding the drift was the easy part. Actually switching the app over to trust the ledger, on a database that was already running in production, turned out to be the harder problem. That's next.
