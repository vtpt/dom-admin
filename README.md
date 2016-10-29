## dom-adminJS
dom-adminJS is an easy to use MutationObserver wrapper that lets you subscribe and unsubscribe to DOM change events.

## Usage
There are three event types to subscribe to:
* create
* modify
* delete

```javascript
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
  
  DomAdmin.off('create');
  
  DomAdmin.off('modify');
  
  DomAdmin.off('delete', document.querySelector('#parent'));
```

## Motivation

Using MutationObserver is tedious and repetive. Also, older browsers don't support it. dom-adminJS simplifies DOM watching tasks and falls back standard event listeners in environments where MutationOberserver isn't available.

## Installation
You can use dom-adminJS in one the following ways:
* Include directly in an HTML script tag:
```html
  <script type="text/javascript" src="dom-admin.js"></script>
```
* Using requireJS (or any AMD module loader library)
```javascript
  define([ "DomAdmin", function(DomAdmin) {  
    //use DomAdmin as usual
  });
```
```

## License

MIT
