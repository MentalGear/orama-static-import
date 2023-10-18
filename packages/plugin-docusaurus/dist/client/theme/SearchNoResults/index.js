import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorModeProvider } from '@docusaurus/theme-common/internal';
// @ts-expect-error Resolve at runtime
import { SearchBarFooter } from '@theme/SearchBarFooter';
export function SearchNoResults({ query  }) {
    return /*#__PURE__*/ _jsxs(ColorModeProvider, {
        children: [
            query && /*#__PURE__*/ _jsx("div", {
                className: "aa-NoResults",
                children: "No results found."
            }),
            /*#__PURE__*/ _jsx(SearchBarFooter, {})
        ]
    });
}

//# sourceMappingURL=index.js.map