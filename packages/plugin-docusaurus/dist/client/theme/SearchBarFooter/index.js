// @ts-expect-error Resolve at runtime
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OramaLogoDark, OramaLogoLight } from '@theme/OramaLogo';
import { useColorMode } from '@docusaurus/theme-common';
function CommandIcon(props) {
    return /*#__PURE__*/ _jsx("svg", {
        width: "15",
        height: "15",
        "aria-label": props.ariaLabel,
        role: "img",
        children: /*#__PURE__*/ _jsx("g", {
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.2",
            children: props.children
        })
    });
}
export function SearchBarFooter({ translations ={}  }) {
    const { selectText ='to select' , selectKeyAriaLabel ='Enter key' , navigateText ='to navigate' , navigateUpKeyAriaLabel ='Arrow up' , navigateDownKeyAriaLabel ='Arrow down' , closeText ='to close' , closeKeyAriaLabel ='Escape key' , searchByText ='Search by'  } = translations;
    const { colorMode  } = useColorMode();
    return /*#__PURE__*/ _jsxs("footer", {
        className: "aa-Footer",
        children: [
            /*#__PURE__*/ _jsxs("ul", {
                className: "aa-FooterCommands",
                children: [
                    /*#__PURE__*/ _jsxs("li", {
                        children: [
                            /*#__PURE__*/ _jsx("kbd", {
                                children: /*#__PURE__*/ _jsx(CommandIcon, {
                                    ariaLabel: selectKeyAriaLabel,
                                    children: /*#__PURE__*/ _jsx("path", {
                                        d: "M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                children: selectText
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("li", {
                        children: [
                            /*#__PURE__*/ _jsx("kbd", {
                                children: /*#__PURE__*/ _jsx(CommandIcon, {
                                    ariaLabel: navigateDownKeyAriaLabel,
                                    children: /*#__PURE__*/ _jsx("path", {
                                        d: "M7.5 3.5v8M10.5 8.5l-3 3-3-3"
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsx("kbd", {
                                children: /*#__PURE__*/ _jsx(CommandIcon, {
                                    ariaLabel: navigateUpKeyAriaLabel,
                                    children: /*#__PURE__*/ _jsx("path", {
                                        d: "M7.5 11.5v-8M10.5 6.5l-3-3-3 3"
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                children: navigateText
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("li", {
                        children: [
                            /*#__PURE__*/ _jsx("kbd", {
                                children: /*#__PURE__*/ _jsx(CommandIcon, {
                                    ariaLabel: closeKeyAriaLabel,
                                    children: /*#__PURE__*/ _jsx("path", {
                                        d: "M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                children: closeText
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("a", {
                className: "aa-FooterSearchCredit",
                href: 'https://oramasearch.com',
                target: "_blank",
                rel: "noopener noreferrer",
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        children: searchByText
                    }),
                    colorMode === 'dark' ? /*#__PURE__*/ _jsx(OramaLogoDark, {}) : /*#__PURE__*/ _jsx(OramaLogoLight, {})
                ]
            })
        ]
    });
}

//# sourceMappingURL=index.js.map