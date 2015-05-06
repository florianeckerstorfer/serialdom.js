(function(window, factory) {
    'use strict';

    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        module.exports = factory();
    } else if (typeof define === 'function' && define['amd']) {
        // [2] AMD anonymous module
        define(['exports', 'require'], function() { return factory(); });
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        window.SerialDOM = factory();
    }
}(window, function factory() {

var SerialDOM = function (options) {
    this.options = this.constructor.defaultOptions;
    for (var attrname in options) {
        this.options[attrname] = options[attrname];
    }
};

SerialDOM.defaultOptions = {
    customProperties: [],
    defaultProperties: [
        'className', 'clientHeight', 'clientLeft', 'clientTop', 'clientWidth', 'scrollHeight', 'scrollLeft',
        'scrollTop', 'scrollWidth', 'tagName'
    ]
};

SerialDOM.prototype.serialize = function(node) {
    return JSON.stringify(this.simplifyElement(node));
};

SerialDOM.prototype.simplifyElement = function(element) {
    var simpleElement = {
            nodeType: element.nodeType
    };
    if (simpleElement.nodeType === Node.TEXT_NODE) {
        simpleElement.textContent = element.textContent;
    } else if (simpleElement.nodeType === Node.ELEMENT_NODE) {
        simpleElement.attributes = this.simplifyAttributes(element);
        simpleElement.children   = this.simplifyChildren(element);
        for (var i = 0; i < this.options.defaultProperties.length; i++) {
            if (element[this.options.defaultProperties[i]]) {
                simpleElement[this.options.defaultProperties[i]] = element[this.options.defaultProperties[i]];
            }
        }
        for (var i = 0; i < this.options.customProperties.length; i++) {
            if (element[this.options.customProperties[i]]) {
               simpleElement[this.options.customProperties[i]] = element[this.options.customProperties[i]];
            }
        }
    }

    return simpleElement;
};

SerialDOM.prototype.simplifyAttributes = function(element) {
    var simpleAttributes = [];
    if (element.attributes) {
        for (var i = 0; i < element.attributes.length; i++) {
            simpleAttributes.push({name: element.attributes[i].name, value: element.attributes[i].value});
        }
    }

    return simpleAttributes;
};

SerialDOM.prototype.simplifyChildren = function(element) {
    var simpleChildren = [];
    if (element.hasChildNodes()) {
        for (var i = 0; i < element.childNodes.length; i++) {
            simpleChildren.push(this.simplifyElement(element.childNodes[i]));
        }
    }

    return simpleChildren;
};

    return SerialDOM;
}));
