function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
import React from "react";
export function HighlightedDocument(param) {
    var hit = param.hit, _param_trim = param.trim, trim = _param_trim === void 0 ? 200 : _param_trim;
    var getHighlightedText = function(text, positions) {
        var highlightedText = "";
        var currentIndex = 0;
        positions.forEach(function(position) {
            var start = position.start;
            var length = position.length;
            highlightedText += text.slice(currentIndex, start) + '<span class="nx-text-primary-600">' + text.substr(start, length) + "</span>";
            currentIndex = start + length;
        });
        highlightedText += text.slice(currentIndex);
        return highlightedText;
    };
    var trimContent = function(content, maxLength) {
        if (content.length > maxLength) {
            return content.slice(0, maxLength) + "...";
        }
        return content;
    };
    var highlightDocument = function() {
        var highlightedDocument = _objectSpread({}, hit.document);
        for(var property in hit.positions){
            if (hit.positions[property]) {
                var positionsArray = Object.values(hit.positions[property]).flat();
                highlightedDocument[property] = getHighlightedText(highlightedDocument[property], positionsArray);
            }
        }
        highlightedDocument.content = trimContent(highlightedDocument.content, trim);
        return highlightedDocument;
    };
    var highlightedDocument = highlightDocument();
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "nx-text-base nx-font-semibold nx-leading-5",
        dangerouslySetInnerHTML: {
            __html: highlightedDocument.title
        }
    }), /*#__PURE__*/ React.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: highlightedDocument.content
        }
    }));
}
