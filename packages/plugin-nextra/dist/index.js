function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
import { searchWithHighlight } from "@orama/plugin-match-highlight";
import { useRouter } from "next/compat/router.js";
import NextLink from "next/link.js";
import React, { useEffect, useRef, useState } from "react";
import { HighlightedDocument } from "./components/HighlightedDocument.js";
import { createOramaIndex, groupDocumentsBy } from "./utils/index.js";
var indexes = {};
var defaultProps = {
    limitResults: 30,
    boost: {
        title: 2,
        description: 1,
        content: 1
    }
};
export function OramaSearch() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultProps;
    var router = useRouter();
    return (router === null || router === void 0 ? void 0 : router.isReady) ? /*#__PURE__*/ React.createElement(OramaSearchPlugin, _extends({}, props, {
        router: router
    })) : null;
}
function OramaSearchPlugin(_param) {
    var router = _param.router, props = _objectWithoutProperties(_param, [
        "router"
    ]);
    var _useState = _slicedToArray(useState(false), 2), setIndexing = _useState[1];
    var _useState1 = _slicedToArray(useState(""), 2), searchTerm = _useState1[0], setSearchTerm = _useState1[1];
    var _useState2 = _slicedToArray(useState(), 2), results = _useState2[0], setResults = _useState2[1];
    var _useState3 = _slicedToArray(useState({}), 2), groupedResults = _useState3[0], setGroupedResults = _useState3[1];
    var _useState4 = _slicedToArray(useState(false), 2), hasFocus = _useState4[0], setHasFocus = _useState4[1];
    var basePath = router.basePath, _router_locale = router.locale, locale = _router_locale === void 0 ? "en-US" : _router_locale, asPath = router.asPath;
    var inputRef = useRef(null);
    var wrapperRef = useRef(null);
    // As soon as the page loads, we create the index on the client-side
    useEffect(function() {
        setIndexing(true);
        createOramaIndex(basePath, locale).then(function(index) {
            indexes[locale] = index;
            setIndexing(false);
        });
    }, []);
    // If the locale changes, we create the index on the client-side
    useEffect(function() {
        if (!(locale in indexes)) {
            setIndexing(true);
            createOramaIndex(basePath, locale).then(function(index) {
                indexes[locale] = index;
                setIndexing(false);
            });
        }
    }, [
        basePath,
        locale
    ]);
    // If the user types something, we search for it
    useEffect(function() {
        if (searchTerm) {
            searchWithHighlight(indexes[locale], {
                term: searchTerm,
                limit: props.limitResults,
                boost: props.boost
            }).then(function(results) {
                setResults(results);
                setGroupedResults(groupDocumentsBy(results.hits, "title"));
            });
        }
    }, [
        searchTerm
    ]);
    // If the user presses ESC, we close the search box
    useEffect(function() {
        if (document.activeElement === inputRef.current) {
            setHasFocus(true);
        } else {
            setHasFocus(false);
        }
    }, []);
    useEffect(function() {
        var onKeyDownHandler = function(event) {
            if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
                var _inputRef_current;
                event.preventDefault();
                (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
                setHasFocus(true);
            }
        };
        window.addEventListener("keydown", onKeyDownHandler);
        return function() {
            window.removeEventListener("keydown", onKeyDownHandler);
        };
    }, []);
    // If the path changes, we close the search box
    useEffect(function() {
        setHasFocus(false);
        setSearchTerm("");
    }, [
        asPath
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "nextra-search nx-relative md:nx-w-64 nx-hidden md:nx-inline-block mx-min-w-[200px]"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "nx-relative nx-flex nx-items-center nx-text-gray-900 contrast-more:nx-text-gray-800 dark:nx-text-gray-300 contrast-more:dark:nx-text-gray-300"
    }, /*#__PURE__*/ React.createElement("input", {
        ref: inputRef,
        spellCheck: "false",
        type: "search",
        placeholder: "Search documentation...",
        className: "nx-block nx-w-full nx-appearance-none nx-rounded-lg nx-px-3 nx-py-2 nx-transition-colors nx-text-base nx-leading-tight md:nx-text-sm nx-bg-black/[.05] dark:nx-bg-gray-50/10 focus:nx-bg-white dark:focus:nx-bg-dark placeholder:nx-text-gray-500 dark:placeholder:nx-text-gray-400 contrast-more:nx-border contrast-more:nx-border-current",
        onChange: function(e) {
            return setSearchTerm(e.target.value);
        },
        value: searchTerm,
        onFocus: function() {
            return setHasFocus(true);
        },
        onBlur: function() {
            setHasFocus(false);
        }
    }), /*#__PURE__*/ React.createElement("kbd", {
        className: "nx-absolute nx-my-1.5 nx-select-none ltr:nx-right-1.5 rtl:nx-left-1.5 nx-h-5 nx-rounded nx-bg-white nx-px-1.5 nx-font-mono nx-text-[10px] nx-font-medium nx-text-gray-500 nx-border dark:nx-border-gray-100/20 dark:nx-bg-dark/50 contrast-more:nx-border-current contrast-more:nx-text-current contrast-more:dark:nx-border-current nx-items-center nx-gap-1 nx-transition-opacity nx-z-20 nx-flex nx-cursor-pointer hover:nx-opacity-70",
        title: "Clear"
    }, hasFocus ? "ESC" : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("span", {
        className: "nx-text-xs"
    }, "⌘"), " K"))), searchTerm && results && /*#__PURE__*/ React.createElement("div", {
        className: "nextra-scrollbar nx-border nx-border-gray-200 nx-bg-white nx-text-gray-100 dark:nx-border-neutral-800 dark:nx-bg-neutral-900 nx-absolute nx-top-full nx-z-20 nx-mt-2 nx-overflow-auto nx-overscroll-contain nx-rounded-xl nx-py-2.5 nx-shadow-xl nx-max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:nx-max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] nx-inset-x-0 ltr:md:nx-left-auto rtl:md:nx-right-auto contrast-more:nx-border contrast-more:nx-border-gray-900 contrast-more:dark:nx-border-gray-50 nx-w-screen nx-min-h-[100px] nx-max-w-[min(calc(100vw-2rem),calc(100%+20rem))]"
    }, results.count === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "nx-block nx-select-none nx-p-8 nx-text-center nx-text-sm nx-text-gray-400"
    }, "No results found."), results.count > 0 && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        ref: wrapperRef
    }, /*#__PURE__*/ React.createElement("ul", null, Object.keys(groupedResults).map(function(title) {
        return /*#__PURE__*/ React.createElement("li", {
            key: title,
            className: "nx-bg-primary-600"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "nx-mx-2.5 nx-mb-2 nx-mt-6 nx-select-none nx-border-b nx-border-black/10 nx-px-2.5 nx-pb-1.5 nx-text-xs nx-font-semibold nx-uppercase nx-text-gray-500 first:nx-mt-0 dark:nx-border-white/20 dark:nx-text-gray-300 contrast-more:nx-border-gray-600 contrast-more:nx-text-gray-900 contrast-more:dark:nx-border-gray-50 contrast-more:dark:nx-text-gray-50"
        }, title), /*#__PURE__*/ React.createElement("div", {
            className: "nx-block nx-scroll-m-12 nx-px-2.5 nx-py-2 nx-mb-2"
        }, /*#__PURE__*/ React.createElement("ul", {
            className: "nx-mt-1"
        }, groupedResults[title].map(function(param, i) {
            var document1 = param.document, positions = param.positions;
            return /*#__PURE__*/ React.createElement("li", {
                key: document1.url + i,
                className: "nx-p-4 nx-mx-2.5 nx-break-words nx-rounded-md hover:nx-bg-primary-500 nx-text-primary-600"
            }, /*#__PURE__*/ React.createElement(NextLink.default, {
                href: document1.url
            }, /*#__PURE__*/ React.createElement("div", {
                className: "excerpt nx-mt-1 nx-text-sm nx-leading-[1.35rem] nx-text-gray-600 dark:nx-text-gray-400 contrast-more:dark:nx-text-gray-50"
            }, /*#__PURE__*/ React.createElement(HighlightedDocument, {
                hit: {
                    document: document1,
                    positions: positions
                }
            }))));
        }))));
    })), /*#__PURE__*/ React.createElement("div", {
        className: "nx-sticky nx-p-4 nx-text-sm nx-bottom-0 nx-bg-gray-100 dark:nx-bg-neutral-900",
        style: {
            transform: "translate(0px, 11px)"
        }
    }, /*#__PURE__*/ React.createElement("p", {
        className: "nx-text-center nx-text-gray-600 contrast-more:dark:nx-bg-neutral-100"
    }, /*#__PURE__*/ React.createElement("b", null, results.count), " result", results.count > 1 && "s", " found in ", /*#__PURE__*/ React.createElement("b", null, results.elapsed.formatted), ". Powered by", " ", /*#__PURE__*/ React.createElement("a", {
        href: "https://oramasearch.com?utm_source=nextra_plugin",
        target: "_blank",
        className: "nx-text-primary-600"
    }, /*#__PURE__*/ React.createElement("b", null, "Orama"))))))));
}
