// @ts-expect-error Resolve at runtime
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchBarFooter } from '@theme/SearchBarFooter';
import { ColorModeProvider } from '@docusaurus/theme-common/internal';
export function SearchResults({ sections  }) {
    return /*#__PURE__*/ _jsxs(ColorModeProvider, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "aa-PanelLayout aa-Panel--scrollable",
                children: sections
            }),
            /*#__PURE__*/ _jsx(SearchBarFooter, {})
        ]
    });
}

//# sourceMappingURL=index.js.map