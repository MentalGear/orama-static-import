import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function snippet(hit) {
    const PADDING = 20;
    const PADDING_MARKER = '...';
    const isBeginning = hit.position.start < PADDING;
    const isEnd = hit.position.start + hit.position.length > hit.document.sectionContent.length - PADDING;
    const preMatch = hit.document.sectionContent.substring(isBeginning ? 0 : hit.position.start - PADDING, hit.position.start);
    const match = hit.document.sectionContent.substring(hit.position.start, hit.position.start + hit.position.length);
    const postMatch = hit.document.sectionContent.substring(hit.position.start + hit.position.length, hit.position.start + hit.position.length + PADDING);
    return /*#__PURE__*/ _jsxs("p", {
        children: [
            isBeginning ? '' : PADDING_MARKER,
            preMatch,
            /*#__PURE__*/ _jsx("u", {
                children: match
            }),
            postMatch,
            isEnd ? '' : PADDING_MARKER
        ]
    });
}
export function SearchResult({ hit  }) {
    return /*#__PURE__*/ _jsx("a", {
        className: "aa-ItemLink",
        href: hit.document.pageRoute,
        children: /*#__PURE__*/ _jsx("div", {
            className: "aa-ItemContent",
            children: /*#__PURE__*/ _jsxs("div", {
                className: "aa-ItemContentBody",
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "aa-ItemContentTitle",
                        children: /*#__PURE__*/ _jsx("h5", {
                            style: {
                                marginBottom: 0
                            },
                            children: hit.document.sectionTitle
                        })
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "aa-ItemContentDescription",
                        children: snippet(hit)
                    })
                ]
            })
        })
    });
}

//# sourceMappingURL=index.js.map