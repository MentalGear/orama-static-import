import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { autocomplete } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic/dist/theme.min.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore Will fail in CJS compilation
import { useActiveVersion, useVersions } from '@docusaurus/plugin-content-docs/client';
import { useColorMode, useDocsPreferredVersion } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { create, load } from '@orama/orama';
import { searchWithHighlight } from '@orama/plugin-match-highlight';
import { ungzip } from 'pako';
import { Fragment, createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
// @ts-expect-error Resolve at runtime
import { SearchNoResults } from '@theme/SearchNoResults';
// @ts-expect-error Resolve at runtime
import { SearchResults } from '@theme/SearchResults';
// @ts-expect-error Resolve at runtime
import { SearchResult } from '@theme/SearchResult';
import { INDEX_FILE, PLUGIN_NAME, schema } from '../../../server/types.js';
export default function SearchBar() {
    const isBrowser = useIsBrowser();
    const { siteConfig  } = useDocusaurusContext();
    const containerRef = useRef(null);
    const { colorMode  } = useColorMode();
    const { searchData  } = usePluginData(PLUGIN_NAME);
    const [database, setDatabase] = useState();
    const searchBaseUrl = useBaseUrl(INDEX_FILE);
    const versions = useVersions(undefined);
    const activeVersion = useActiveVersion(undefined);
    const { preferredVersion  } = useDocsPreferredVersion();
    const version = useMemo(()=>{
        if (!isBrowser) {
            return undefined;
        } else if (activeVersion) {
            return activeVersion;
        } else if (preferredVersion) {
            return preferredVersion;
        }
        // Fallback - Return the latest version or the first one existing
        return versions.find((v)=>v.isLast) ?? versions[0];
    }, [
        isBrowser,
        activeVersion,
        preferredVersion,
        versions
    ]);
    const onKeyDown = useCallback(function(setIsOpen, event) {
        var _containerRef_current_querySelector, _containerRef_current, _event_key, _event_key1;
        const isOpen = ((_containerRef_current_querySelector = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.querySelector('[role="combobox"]')) === null || _containerRef_current_querySelector === void 0 ? void 0 : _containerRef_current_querySelector.getAttribute('aria-expanded')) === 'true';
        if (((_event_key = event.key) === null || _event_key === void 0 ? void 0 : _event_key.toLowerCase()) === 'escape' && isOpen || ((_event_key1 = event.key) === null || _event_key1 === void 0 ? void 0 : _event_key1.toLowerCase()) === 'k' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
    }, [
        containerRef
    ]);
    useEffect(()=>{
        if (!containerRef.current || !isBrowser || !database) {
            return undefined;
        }
        const search = autocomplete({
            placeholder: 'Search ...',
            container: containerRef.current,
            // @ts-expect-error render typing here is for preact, react also works
            renderer: {
                createElement,
                Fragment,
                render
            },
            openOnFocus: true,
            detachedMediaQuery: '',
            async getSources ({ query: term  }) {
                return [
                    {
                        sourceId: 'orama',
                        async getItems () {
                            const results = await searchWithHighlight(database, {
                                term,
                                properties: [
                                    'sectionTitle',
                                    'sectionContent',
                                    'type'
                                ]
                            });
                            const processed = results.hits.flatMap((hit)=>Object.values(hit.positions.sectionContent).flatMap((positions)=>positions.map((position)=>({
                                            ...hit,
                                            position
                                        }))));
                            return processed;
                        },
                        getItemUrl ({ item  }) {
                            return item.document.pageRoute;
                        },
                        templates: {
                            item ({ item  }) {
                                return /*#__PURE__*/ _jsx(SearchResult, {
                                    hit: item
                                });
                            }
                        }
                    }
                ];
            },
            render ({ sections , render  }, root) {
                render(/*#__PURE__*/ _jsx(SearchResults, {
                    sections: sections
                }), root);
            },
            renderNoResults ({ render , state  }, root) {
                render(/*#__PURE__*/ _jsx(SearchNoResults, {
                    query: state.query
                }), root);
            }
        });
        const handler = onKeyDown.bind(null, search.setIsOpen);
        window.addEventListener('keydown', handler);
        // Move keyboard instructions at the end - Apparently this is only possible manually
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const button = containerRef.current.querySelector('.aa-DetachedSearchButton');
        const icons = containerRef.current.querySelectorAll('kbd');
        for (const icon of Array.from(icons)){
            button.appendChild(icon.cloneNode(true));
        }
        return ()=>{
            window.removeEventListener('keydown', handler);
            search.destroy();
        };
    }, [
        isBrowser,
        siteConfig,
        database,
        colorMode,
        onKeyDown
    ]);
    useEffect(()=>{
        async function loadDatabase(version) {
            let buffer;
            if (searchData[version.name]) {
                buffer = searchData[version.name].data;
            } else {
                const searchResponse = await fetch(searchBaseUrl.replace('@VERSION@', version.name));
                if (searchResponse.status === 0) {
                    throw new Error(`Network error: ${await searchResponse.text()}`);
                } else if (searchResponse.status !== 200) {
                    throw new Error(`HTTP error ${searchResponse.status}: ${await searchResponse.text()}`);
                }
                buffer = await searchResponse.arrayBuffer();
            }
            const deflated = ungzip(buffer, {
                to: 'string'
            });
            const data = JSON.parse(deflated);
            const _db = await create({
                schema
            });
            const db = _db;
            await load(db, data);
            db.data.positions = data.positions;
            setDatabase(db);
        }
        if (!isBrowser || !version) {
            return;
        }
        loadDatabase(version).catch((error)=>{
            console.error('Cannot load search index.', error);
        });
    }, [
        isBrowser,
        searchData,
        searchBaseUrl,
        version
    ]);
    useEffect(()=>{
        colorMode === 'dark' ? document.body.classList.add(colorMode) : document.body.classList.remove('dark');
    }, [
        colorMode
    ]);
    return /*#__PURE__*/ _jsx("div", {
        ref: containerRef,
        children: /*#__PURE__*/ _jsxs("template", {
            children: [
                /*#__PURE__*/ _jsx("kbd", {
                    children: "⌘"
                }),
                /*#__PURE__*/ _jsx("kbd", {
                    children: "K"
                })
            ]
        })
    });
}

//# sourceMappingURL=index.js.map