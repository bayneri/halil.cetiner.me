---
title: "What is Parkinson's Law and how to overcome it?"
layout: post
date: 2022-07-15 19:31
image: /assets/images/project-deadline.jpg
headerImage: true
tag:
- project-management
- productivity
category: blog
author: bayneri
description: Cyril Northcote Parkinson stated that “work expands so as to fill the time available for its completion”, and coined the term explaining the aforementioned situation as Parkinson’s Law. What does it mean for the software projects and how we can overcome it?
---

Cyril Northcote Parkinson stated in his essay for The Economist  in 1955 that _"work expands so as to fill the time available for its completion"_<sup>[[1]](https://www.economist.com/news/1955/11/19/parkinsons-law)</sup>, and coined the term explaining the aforementioned situation as _Parkinson's Law_.

## What does this mean for the software projects?
You probably have been to a place where you were assigned to a simple bug task for a week-long sprint and it took you the entire week, if not more, to finish that task. Why? Maybe you wanted to use the extra time you have to fix another related issue. I'm not saying proactively fixing issues is a bad thing but does it serve our main goal in this context? Or, let's be honest, maybe you just procrastinated. Having more than enough time at our disposal often yields to us leaving it to the last minute and it increases the time to completion (TTC) of that task.

Deadlines are not always productivity boosters but estimations are when done right. Understanding Parkinson's Law and getting better at estimations might help us improve team productivity.

# How to overcome Parkinson's Law
Overcoming Parkinson's Law has two different sides. One is the things the project manager/owner/planner/whatever-you-call can do and the other one is how an individual contributor (IC) who actually does the task can manage their time effectively.

## What can be done on the project planning front?
A well-planned project timeline is key to delivering quality work on time. Estimations are one of the hardest things to do right in software projects and they usually fall short, especially in bottom-up organisations i.e. where an engineer owns a project from request to completion.

Even though it's _almost impossible_ to come up with accurate estimates, following a good strategy and aiming for the perfect estimates usually results in _good enough_ timelines. Here are my 4 suggestions to come up with better project plans: 

**1- Define the scope**

Defining what is in and out of the scope of the project during the project planning/kickoff would help your team to avoid falling into _the overfixing trap_.

**2- Divide the project into small chunks**

Ballpark estimates are often wrong. Estimating small tasks is a lot more painless and accurate than trying to come up with an estimate for the entire project.

**3- Use your experience**

The more you work on project planning the better you'll get on that. I usually have a simple mental model to come up with an estimate. When I need to estimate a task (or a project), I try to find a similar task I've seen before and compare them. Something like *"If that task took x days this could be done in y days"* usually works good enough.

**4- Use the PERT formula**

PERT (program evaluation and review technique)<sup>[[2]](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)</sup> is a simple yet effective tool to figure out how long a task will take. It's more than okay to have different ideas about the required time for a task but coming up with a final number can be quite challenging. The PERT formula solves that issue with a simple equation.

First, you need three estimates to come up with the final estimate:

* **Optimistic time (o):** the minimum possible time required to complete the task, assuming everything goes well 😇
* **Pessimistic time (p):** the maximum possible time required to complete the task, assuming everything goes wrong 🔥
* **Most likely time (m):** the best estimate of the time required to complete the task, assuming everything goes just normal 🥸

With these three estimate, now you can easily  calculate the **expected time (e)**:
```
e = (o + 4*m + p) / 6
```

**Bonus Point: Plan Ahead – Identify Risks and Priorities**

Things like changing requirements mid-project, unexpected delays, etc. happen all the time. Identifying possible risks and their mitigations, critical tasks of the project, least important components, etc. would save your project from going off schedule. Descoping a project to deliver the most important bits in time is usually better than delaying the entire project/feature.

> It always takes longer than you expect, even when you take into account Hofstadter's Law.<sup>[[3]](https://en.wikipedia.org/wiki/Hofstadter%27s_law)</sup>

## What a developer can do to overcome Parkinson's Law?
You can utilise your time and overcome Parkinson's Law with some strategies. It's worth noting that the goal is to be more efficient, not working more than normal which can result in burnout.  Here are my 4 bullet points for a developer to overcome Parkinson's Law:

**1- Plan your work**

Creating a plan for your tasks can help you manage your time more effectively. You are more likely to work efficiently if you plan your tasks ahead of time. This would also result in less procrastination which is the opposite of Parkinson's Law.

**2- Timebox yourself**

Instead of thinking of how much you have, if you think about more realistically how much a task would take, you can achieve more in less time. This can again also help you fight procrastination and have more control over your own work.

**3- Manage your own tasks**

Creating a to-do list, or using a fancier task management tool to organise your workday could help you stay on track.

You can also set priorities and goals so that you can avoid getting interrupted constantly by nonurgent or unimportant work. Eisenhower Method<sup>[[4]](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method)</sup> could be a good reference on this front.

![Eisenhower Matrix](/assets/images/eisenhower-matrix.png)
<figcaption class="caption">Eisenhower Matrix (source: https://slab.com/blog/eisenhower-matrix/)</figcaption>

**4- Use a productivity technique**

There are different personal time management strategies such as Pomodoro Technique<sup>[[5]](https://en.wikipedia.org/wiki/Pomodoro_Technique)</sup> which might help you focus on what matters and spend less time on busywork.

I, personally, haven't tried using Pomodoro Technique yet but only heard good things about it from the people practising the technique almost on daily basis.

# Takeaways

Parkinson's Law is just an observation about human behaviour but it's a correct and important observation. The first requirement of overcoming Parkinson's Law is understanding it. After that, it's down to fighting it using several proven strategies and useful tools to plan better and work in a more efficient manner.

# References

* \[1\] "Parkinson's Law" https://www.economist.com/news/1955/11/19/parkinsons-law
* \[2\] "Program Evaluation and Review Technique (PERT)" https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique
* \[3\] "Hofstadter’s Law" https://en.wikipedia.org/wiki/Hofstadter%27s_law
* \[4\] "The Eisenhower Method" https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method
* \[5\] "Pomodoro Technique" https://en.wikipedia.org/wiki/Pomodoro_Technique
* Cover Photo: Photo by [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/deadline?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
* [Project Management for the Unofficial Project Manager: A FranklinCovey Title](https://www.amazon.co.uk/Project-Management-Unofficial-Manager-FranklinCovey/dp/194163110X)
