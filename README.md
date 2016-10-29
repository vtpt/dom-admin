# dom-adminJS
dom-adminJS is an easy to use MutationObserver wrapper that lets you subscribe and unsubscribe to DOM change events.

There are three event types to subscribe to:
* create
* modify
* delete

# Usage
<code>
  DomAdmin.on('create', function(record) {
      alert('a node was created somewhere in document');
  });

  DomAdmin.on('modify', function(record) {
      alert('a node was modified somewhere in document');
  });

  DomAdmin.on('delete', function(record) {
      alert('a node was removed somewhere in document');
  });

  DomAdmin.on('modify', function(record) {
      alert('a node was modified somewhere inside the DOM node with id: "parent"');
  }, document.querySelector('#parent'));
</code>
