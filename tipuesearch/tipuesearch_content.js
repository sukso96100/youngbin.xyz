---
---
var tipuesearch = {"pages": [
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
      "category" : "{{ post.category }}",
      "loc"     : "{{ post.url }}",
      "date"     : "{{ post.date }}"
    } {% if forloop.last %}{% else %},{% endif %}
  {% endfor %}
]};
