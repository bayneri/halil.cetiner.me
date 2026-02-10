---
layout: page
---
<div class="hero-block">
  <p>
    Turning small keystrokes into software that holds, and notes that stay.
  </p>
  <p>
    I think in words and publish some of them here. The cadence isn’t intentional; the mix of topics and formats is.
  </p>  
  <!-- <div class="hero-actions">
    <a class="btn" href="{{ '/notes/' | relative_url }}">Read Notes</a>
  </div> -->
</div>

<h2>Latest Notes</h2>
<ul class="notes-compact">
  {% for post in site.posts limit:5 %}
    <li>
      <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }} · <span class="note-label">{% include note_label.html post=post %}</span></p>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
