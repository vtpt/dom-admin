"use strict";

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        if (typeof root.DomAdmin === "undefined") {
            root.DomAdmin = new factory(root);
        }
    }
})(this, function DomAdmin() {
    var self = this;
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var eventListenerSupported = window.addEventListener;

    var eventTypeEnum = {
        'create': 'create',
        'modify': 'modify',
        'delete': 'delete'
    };

    var watcherHandlers = [];

    self.on = function on(eventType, handlerFunc, domNode) {
        if (eventType !== null && eventType !== undefined && eventTypeEnum[eventType] === undefined) {
            throw new Error('Event type unkown. Please use [create | modify | delete]');
        }

        var node = domNode ? domNode : document;

        if (MutationObserver) {
            var obs = new MutationObserver(function(mutations, observer) {
                switch (eventType) {
                    case 'create':
                        if (mutations[0].addedNodes.length) {
                            handlerFunc(mutations[0]);
                        }
                        break;
                    case 'modify':
                        if (mutations) {
                            handlerFunc(mutations[0]);
                        }
                        break;
                    case 'delete':
                        if (mutations[0].removedNodes.length) {
                            handlerFunc(mutations[0]);
                        }
                        break;
                    default:
                        break;
                };


            });

            obs.observe(node, { childList: true, subtree: true, attributes: true });

            watcherHandlers.push({
                domNode: domNode,
                handlerFunc: handlerFunc,
                eventType: eventType,
                observer: obs
            });
        } else if (eventListenerSupported) {
            switch (eventType) {
                case 'create':
                    obj.addEventListener('DOMNodeInserted', handlerFunc, false);
                    break;
                case 'modify':
                    obj.addEventListener('DOMAttrModified', handlerFunc, false);
                    obj.addEventListener('DOMAttributeNameChanged', handlerFunc, false);
                    obj.addEventListener('DOMCharacterDataModified', handlerFunc, false);
                    obj.addEventListener('DOMElementNameChanged', handlerFunc, false);
                    obj.addEventListener('DOMNodeInserted', handlerFunc, false);
                    obj.addEventListener('DOMNodeInsertedIntoDocument', handlerFunc, false);
                    obj.addEventListener('DOMNodeRemoved', handlerFunc, false);
                    obj.addEventListener('DOMNodeRemovedFromDocument', handlerFunc, false);
                    obj.addEventListener('DOMSubtreeModified', handlerFunc, false);
                    break;
                case 'delete':
                    obj.addEventListener('DOMNodeRemoved', callback, false);
                    break;
                default:
                    break;
            };
        }
    };

    self.off = function off(eventType, domNode) {
        for (var index = 0; index < watcherHandlers.length; index++) {
            var currWatcher = watcherHandlers[index];

            if (currWatcher.eventType === eventType && currWatcher.domNode === domNode) {
                if (currWatcher.observer) {
                    alert('Removing event watcher for: ' + currWatcher.eventType + ' ' + currWatcher.domNode);

                    currWatcher.observer.disconnect();

                    watcherHandlers.splice(index, 1);

                    return;
                }
            }
        }
    };
});