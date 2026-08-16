---
layout: page
---
<div class="home-intro">
  <p>
    Turning small keystrokes into software that holds, and notes that stay.
  </p>
  <p>
    I think in words and publish some of them here. The cadence isn’t intentional; the mix of topics and formats is.
  </p>  
</div>

<section class="home-writing" aria-labelledby="notes-heading">
  <h2 id="notes-heading">Notes</h2>

  <ol class="home-writing-list">
    {% for post in site.posts limit:5 %}
      <li>
        <a href="{{ post.url | relative_url }}">
          <span class="home-writing-title">{{ post.title }}</span>
          <span class="home-writing-leader" aria-hidden="true"></span>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b, %Y" }}</time>
        </a>
      </li>
    {% endfor %}
  </ol>

  <a class="home-writing-more" href="{{ '/notes/' | relative_url }}">View all notes <span aria-hidden="true">→</span></a>
</section>
