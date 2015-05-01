var SerialDOM = function (options) {
    this.options = this.constructor.defaultOptions;
    for (var attrname in options) {
        this.options[attrname] = options[attrname];
    }
};

SerialDOM.defaultOptions = {
    customElements: []
};

SerialDOM.prototype.serialize = function(node) {
    return JSON.stringify(this.simplifyElement(node));
};

SerialDOM.prototype.simplifyElement = function(element) {
    var simpleElement = {
        attributes: this.simplifyAttributes(element),
        children:   this.simplifyChildren(element),
        className:    element.className || null,
        clientHeight: element.clientHeight || null,
        clientLeft:   element.clientLeft || null,
        clientTop:    element.clientTop || null,
        clientWidth:  element.clientWidth || null,
        scrollHeight: element.scrollHeight || null,
        scrollLeft:   element.scrollLeft || null,
        scrollTop:    element.scrollTop || null,
        scrollWidth:  element.scrollWidth || null,
        textContent:  element.textContent || null,
        tagName:      element.tagName || null
    };
    for (var i = 0; i < this.options.customElements.length; i++) {
        console.log(this.options.customElements[i]);
        simpleElement[this.options.customElements[i]] = element[this.options.customElements[i]] || null;
    }

    return simpleElement;
};

SerialDOM.prototype.simplifyAttributes = function(element) {
    var simpleAttributes = [];
    for (var i = 0; i < element.attributes.length; i++) {
        simpleAttributes.push({name: element.attributes[i].name, value: element.attributes[i].value});
    }

    return simpleAttributes;
};

SerialDOM.prototype.simplifyChildren = function(element) {
    var simpleChildren = [];
    for (var i = 0; i < element.children.length; i++) {
        simpleChildren.push(this.simplifyElement(element.children[i]));
    }

    return simpleChildren;
};
