---
title: "Reliability Theatre"
layout: post
date: 2026-03-10 16:30
image: /assets/images/reliability_theatre.png
headerImage: true
tag:
- reliability
- systems-thinking
- engineering-practices
category: blog
author: bayneri
description: Dashboards stay green while users fail. How to tell genuine reliability work from its theatrical counterpart.
---

Many organizations claim that they run on SLOs. Their dashboards show healthy services. Their uptime numbers look excellent. Their users still experience outages.

This is what I call **Reliability Theatre**.

Reliability Theatre is the art of *looking* reliable without *being* reliable. It's like painting over mold. The wall looks fine. The problem keeps spreading.

I've seen this happen in big tech and small startups. It happens everywhere.

It's not always easy to distinguish genuine reliability work from its theatrical counterpart but there are always signs.

## Your SLOs measure something easier than the promise
Your API returns HTTP 200 99.97% of the time. Perfect! Meanwhile the response contains malformed JSON, indexes are stale, the checkout button swallows users' orders. The service is *up* but users' orders are gone.

This happens because SLOs are written by engineers with access to metrics, not by users experiencing the system. What gets measured is limited by whatever is already instrumented. Most of the time, what is instrumented is simply what was easiest to add. The gap between *what we measure* and *what users experience* can be huge. In Reliability Theatre, that gap is never seriously examined, because examining it requires admitting it exists.

So the SLO gets written around data, not the user. It passes. Dashboards look green. Error budgets are not exhausted. Meanwhile users experience failures and quietly churn.

## Your error budget is a political instrument
In [theory](https://sre.google/sre-book/embracing-risk/), error budgets create a forcing function. Burn too much, deployments are frozen until reliability is restored. It's elegant. It's supposed to make reliability self-enforcing.

In practice, error budgets get negotiated at the very first moment they become inconvenient. The team that burned its budget in February gets a *temporary exemption* in March. The budget that should've frozen feature development work gets overlooked to *unblock* an important launch. By April, everyone understands, without anyone saying it directly, that the error budget is merely a suggestion and suggestions don't apply when there is pressure.

The illusion is preserved. When the next incident happens, someone will say that the team "needs to take error budgets more seriously." And they will mean it. They may even be the same person who said the launch was too important to delay.

## Your dashboards are designed to reassure, not inform
Green is the default. Red requires justification. So the incentive is to define thresholds loosely enough or measure the *convenient thing* so that dashboards stay green. This is never stated but deeply understood. 

There's a particular species of Reliability Theatre dashboard that has every panel green, every graph trending upward, every metric in range. On the other hand, customers are actively unable to use the product. These dashboards are not lies, exactly. Every number is technically accurate. But they were built to produce a special outcome, an emotional one. They are there to ensure confidence, and a sense of control not to surface reliability problems.

The difference between a monitoring system and a reassurance system is subtle.
Until something goes wrong.
Then it's obvious.

## Your incident reviews produce documents, not change
The incident postmortem is written. It's thorough, attention to detail is top notch. Five whys, timelines, contributing factors. Follow-up items get assigned. Tickets are created with descriptive content and reasonable due dates.

Six months later, a similar failure happens. Someone pastes a link to the old postmortem, "we knew about this". That sentence is the sound of Reliability Theatre at its peak. Knowing about and fixing a problem are very different activities. They require a different kind of prioritization, accountability, and willingness to say "this is more important than the feature we had planned". Reliability Theatre consistently favors the former over the latter, because documentation is easy to produce and easy to point to, while actual fixes compete with the roadmap.

The postmortem becomes its own performance. A ritual of seriousness. A paper artifact proving that the organization takes reliability seriously.

## Your on-call rotation is a coping mechanism, not a reliability strategy 
Someone is paged at 3am. They fix the immediate problem. They go back to sleep. In the morning there's no time to address the root cause. There's a sprint review, three other fires, and the roadmap doesn't have room for reliability work right now.

Next week, the same page. Same person. Same fix. Same exhaustion.

On-call in a Reliability Theatre organization becomes a test of human endurance. The system is not actually stable. It's stabilized continuously by people absorbing its failures in real time. The fact that it hasn't fallen over isn't evidence that it's well-engineered. It's evidence that someone keeps catching it.

This might even get praised as *operational maturity*. It's not. It's operational debt with a pager.

---

In an organization doing real reliability work, bad metrics are signals. They create urgency. They reprioritize roadmaps. They generate difficult conversations with leadership.

In a theatrical one, bad metrics are *not a big deal*. The number gets explained, reframed, or quietly excluded from the next report. The dashboard gets a new filter. Someone proposes revisiting the measurement approach.

Reliability Theatre does not emerge from bad intentions. It emerges when reliability is defined by internal signals rather than user experience.
Dashboards stay green. Error budgets pass. Postmortems are written. Someone answers the page.
Meanwhile users experience something very different.

Reliability is not a property of dashboards or reports. It is a property of user experience. I wrote more about this idea in [Reliability is a Moral Property](https://halil.cetiner.me/reliability-moral-property/).

---

If your metrics are easier to satisfy than your promises, you don't have a reliability system.

You have Reliability Theatre.
