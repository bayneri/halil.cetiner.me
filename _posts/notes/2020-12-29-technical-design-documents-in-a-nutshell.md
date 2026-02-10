---
title: "Technical Design Documents in a Nutshell"
layout: post
date: 2020-12-29 00:00
image: /assets/images/baby-and-a-laptop.jpeg
headerImage: true
tag:
- technical-design
category: blog
author: bayneri
description: Writing — an often-ignored technical skill
---

Software Engineering is all about solving problems. There is no such company waiting out there to hire and pay a shit load of money to [code monkeys](https://www.urbandictionary.com/define.php?term=code%20monkey). It's quite natural wanting to jump straight into coding but it's also one of the most common mistakes in software engineering. It's the kind of mistake that the previous developer made.

**So what should we do?**

We should think through the problem, possible solutions, their own trade-offs, etc. Thinking on a problem, making research on it, discussing with colleagues… This is a process and to be fair, this is where engineering happens. We, as software engineers, all try to make our jobs look fancy but writing code is no different than being a blue-collar worker except it is easier and pays more most of the time. Actually solving problems is the sexy yet often-ignored part of our job, especially in the early years of our careers.
Technical problems and their solutions are not always quite straightforward. As I mentioned earlier, we might need to make some research and/or discuss with our fellow engineers to come up with a feasible solution. Writing design documents/proposals is the best way to share our findings and get other people's opinions, especially if the problem or the solution we are proposing might interest other parties.

# What is a Technical Design Document?
A technical design document describes a solution to a specific technical problem. Writing technical design docs and having that culture in a company has three major advantages I can list here:
1. Get other people's opinions on the solution you are proposing and communicate with teammates on what should be done and how.
2. It helps the person writing the document to think carefully and encourages them to make some research and make a better and more solid proposal covering many aspects of the problem and the solution which could've been forgotten or ignored.
3. Design documents are great sources of truth for old decision processes eg. how the project shaped so far, why some specific choices were made, etc. It's always good to have something like this in a company. I know blaming the previous developer is always the easiest but design docs allow us to put ourselves in their shoes and understand the circumstances back then.

Bonus point, especially for junior software engineers: Both writing and reading technical design proposals/documents is the best ways to learn something new in your daily job, at least it has always been for me.

![Product Developement Life Cycle](/assets/images/5-steps-product-development-lifecycle.png)
<figcaption class="caption">5-steps Product Development Life Cycle</figcaption>

Writing technical design documents is a key part of the product development cycle especially in structured and well-designed working environments. After product requirements and technical requirements are set, the technical design should be done before starting the implementation.

Before going into the next step on this cycle, a typical review should be done to avoid any mistakes before making the debt bigger and hard to pay. If any issues or ambiguities are detected, they should be resolved before proceeding to the next step. The reason this is not a linear process but a cycle is that in most environments, each feature is built on top of the previous one. Either earlier product requirements change or new feature requests come up all the time and this is not a bad thing. Indeed, that's the sign of being alive for a product in my opinion.

Even though I showed all those processes as separate, independent steps that's not always the case. For example;
* Step 3 and step 4 can be mixed if the feature has a lot of unknowns or if we are introducing absolutely new things into the codebase. If that's the case, implementing a POC would be necessary to finalize the technical design document.
* Also, step 2 and step 3 might look like they are almost the same thing which is not all wrong. Especially for small tasks, it's even wiser to merge those steps into one and produce a single document defining technical requirements and technical design.

![Planning Meeting](/assets/images/planning.jpg)
<figcaption class="caption">Photo by <a href="https://unsplash.com/@tool_inc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tool., Inc</a> on <a href="https://unsplash.com/s/photos/wireframe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>

# Writing the Technical Design Document

## Preliminary Work
Collecting the existing data of the problem itself and the components around it is the very first thing to do. Going through product requirements and technical requirements is the default way to do it but it might not be always enough. Reading the previous design documents which are related to the problem's domain, reading the existing code, making some research on technical details might also be necessary.

## Coming up with a Solution
Based on the information collected in the previous step now it's time to state the problem and come up with a solution. After stating the problem a few possible alternative solutions might come up to your mind to resolve it. Measure the upsides and downsides of the options and pick one of them. At this step, it can be really helpful to discuss it with teammates especially a more experienced engineer. It also might be good to get in touch with other teams such as security if you think your solution might interest them and/or you have some open questions related to their domain.

## Writing

After all those preliminary work and solution constructing process, now it's time to actually write a document. It's common practice to use a collaborative document editor such as Google Docs however this is not an absolute requirement.

I personally prefer using GitHub Gists (markdown ❤) and communicating through comments, especially for short documents. It might be a problem for long documents but it's also a possible sign for breaking up the document into smaller chunks. As it happens for code changes, documents can also grow out of proportion with several significant points and that makes documents really difficult to review.

**Add some sauce to your documents.** 5 pages plain text document is hard to read and it's hard to explain everything in words most of the time. Diagrams are quite helpful to express the solution we are proposing. I find [draw.io](https://draw.io) and [Excalidraw](https://excalidraw.com/) really useful but there are several both online and offline alternatives out there.

The document should be meticulously prepared by including all aspects of the problem and its solution. Always keep in mind that, we are not writing technical design documents only for ourselves. It's a new part of the collective knowledge base of the company. It's essential keeping it detailed yet simple to read and understand.

## Contents
There is no industry standard on how to structure your design documents or what to include in the document but there are some key common points I've seen. Also, it's good to start with a template to organise your thoughts.

Here is a template I use most of the time. Even though there is a company template this could give some insights about how to organise your thoughts and put them into a design document.

{% gist bayneri/fc513b12e00f3d10dd2f86618de360f9 %}

These are all optional sections and my personal take from my experiences. There is no best way to structure your design documents and there are several articles online about this topic. To be honest, I think some of them are quite inspiring and prepared by engineers more experienced than me. Reading at least a handful of those articles and creating your own recipe by mixing them and adding your experiences might be quite helpful in this case.

# Final Thoughts
I was expecting this story to be shorter. I hope it wasn't a boring read so far.

Before finalising this article I want to state a few more points to be sure that I won't cause any ambiguity on the readers' end:
* Technical design documents are not a reference to the whole project. It's likely for them to get out of date in a year in a growing company.
* Design docs collectively create a historical blueprint of the project's evolvement and I think this is an irreplaceable advantage of them.
* I'm no expert in this area and everything I mentioned is either based on my experiences or my researches.

<div class="breaker"></div>

I wanted to mention more about technical writing however this article already grew a lot out of the scope. Google has a great series of courses on this topic, if you want to learn more, checkout [Technical Writing Courses for Engineers](https://medium.com/r/?url=https%3A%2F%2Fdevelopers.google.com%2Ftech-writing).
I mentioned the previous developer a few times, here is a good article on that topic: [https://medium.com/things-developers-care-about/why-your-previous-developer-was-terrible-506a06ae35ea](https://medium.com/things-developers-care-about/why-your-previous-developer-was-terrible-506a06ae35ea)

<div class="breaker"></div>

Thanks for reading! If you have any questions or feedback, feel free to leave a comment or get in touch with me via [Twitter](https://twitter.com/bayneri).

*This article was originally published in [my medium account](https://cetiner.medium.com/technical-design-documents-in-a-nutshell-82f2eee299b7). Some of the links and references might work better there.*