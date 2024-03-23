/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import getPath from '@helper_getpath';
import { getResolver, setResolver } from '@helper_localstorage';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useRef } from 'react';
import { COLORS } from '@core/theme/vars';
import genereateCmsMenu from '@core_modules/theme/components/header/components/v1/genereateCmsMenu';

const MenuChildren = dynamic(() => import('@common_header/components/v1/mcategoryChildren'), { ssr: true });

const Menu = (props) => {
    const {
        data, cmsMenu = '', className = '', t, useOthers = false,
    } = props;
    // WIP : Custom Header Menu
    // const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];
    let menu = data?.categories?.items[0]?.children;
    if (!menu) {
        menu = [];
    }

    if (cmsMenu) {
        const dataMenu = genereateCmsMenu(cmsMenu);
        if (dataMenu && dataMenu.length) {
            menu = [...menu, ...dataMenu];
        }
    }

    if (menu.filter((item) => item.include_in_menu).length > 7 && useOthers) {
        const firstMenu = menu.filter((item, key) => key < 8);
        const otherChildren = menu.filter((item, key) => key >= 8);
        const othersMenu = {
            uid: `NavOther-${Math.random(1000)}`,
            name: t('common:menu:others'),
            level: 2,
            path: '#',
            url_path: '#',
            url_key: '#',
            include_in_menu: otherChildren.length,
            children: otherChildren,
        };

        menu = [
            ...firstMenu,
            othersMenu,
        ];
    }

    const generateLink = (cat) => {
        const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
        if (cat.customLink) {
            return [`/${cat.url_path}`, `/${cat.url_path}`];
        }
        return ['/[...slug]', link];
    };
    const handleClick = async (cat) => {
        let link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;

        if (cat?.customLink) {
            link = cat.url_path;
        }

        const urlResolver = getResolver();
        // WIP : Custom Header Menu
        // if (storeConfig.pwa.ves_menu_enable) {
        //     if (cat.link_type === 'category_link') {
        //         urlResolver[link] = {
        //             type: 'CATEGORY',
        //             id: cat.category_id,
        //         };
        //         await setResolver(urlResolver);
        //     } else {
        //         const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
        //         if (cms) {
        //             urlResolver[link] = {
        //                 type: 'CMS_PAGE',
        //             };
        //             await setResolver(urlResolver);
        //         }
        //     }
        // } else {
        //     urlResolver[link] = {
        //         type: 'CATEGORY',
        //         id: cat.uid,
        //     };
        //     await setResolver(urlResolver);
        // }
        urlResolver[link] = {
            type: 'CATEGORY',
            id: cat.uid,
        };
        await setResolver(urlResolver);
    };

    const chevronDownSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline-block ml-1">
            <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
            />
        </svg>
    `;

    const linkEl = useRef([]);
    const megaMenuRef = useRef([]);

    return (
        <>
            <ul className={cx('nav swift-nav-menubar', className)} role="menubar" id="header-nav-menubar">
                {menu.map((val, idx) => {
                    if (val.include_in_menu && val.name) {
                        let prefix = '';

                        prefix += ` ${val.name} `;

                        if (val.children.length > 0) {
                            prefix += chevronDownSvg;
                        }

                        const generatedLink = generateLink(val);

                        return (
                            <li
                                key={idx}
                                role="menuitem"
                                id={`header-menuitem-${idx}`}
                                onMouseEnter={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current[idx].classList.add('animate__animated');
                                        megaMenuRef.current[idx].classList.add(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (megaMenuRef && val.dropdown_animation_in) {
                                        megaMenuRef.current[idx].classList.remove('animate__animated');
                                        megaMenuRef.current[idx].classList.remove(`animate__${val.dropdown_animation_in}`);
                                    }
                                }}
                                className={cx(
                                    'swift-nav-menu-lv1',
                                    'text-md',
                                    'font-medium',
                                    'tracking-normal',
                                    'px-4',
                                    'py-[28px]',
                                    'hover:text-primary-700',
                                )}
                            >
                                {val.link && val.link !== '#' ? (
                                    <>
                                        {val.before_html && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: val.before_html,
                                                }}
                                            />
                                        )}
                                        <Link
                                            href={{
                                                pathname: generatedLink[0],
                                                query: generatedLink[1],
                                            }}
                                            as={generatedLink[1]}
                                            prefetch={false}
                                            legacyBehavior
                                        >
                                            <a
                                                onClick={() => handleClick(val)}
                                                // eslint-disable-next-line no-return-assign
                                                ref={(el) => (linkEl.current[idx] = el)}
                                                dangerouslySetInnerHTML={{
                                                    __html: prefix !== '' ? `${prefix}` : val.name,
                                                }}
                                                onMouseEnter={() => {
                                                    if (val.caret) {
                                                        // eslint-disable-next-line max-len
                                                        linkEl.current[idx].innerHTML = linkEl.current[idx].innerHTML.replace(val.caret, val.hover_caret);
                                                    }
                                                }}
                                                onMouseLeave={() => {
                                                    if (val.hover_caret) {
                                                        // eslint-disable-next-line max-len
                                                        linkEl.current[idx].innerHTML = linkEl.current[idx].innerHTML.replace(val.hover_caret, val.caret);
                                                    }
                                                }}
                                            />
                                        </Link>
                                        {val.after_html && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: val.after_html,
                                                }}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]} prefetch={false} legacyBehavior>
                                        <a
                                            onClick={() => handleClick(val)}
                                            dangerouslySetInnerHTML={{
                                                __html: prefix !== '' ? `${prefix}` : val.name,
                                            }}
                                        />
                                    </Link>
                                )}

                                {val.children.length > 0 ? (
                                    <div
                                        className={cx(
                                            'mega-menu',
                                            'grid',
                                            'bg-neutral-white',
                                            'shadow-md',
                                            'grid-cols-1',
                                            'rounded-lg',
                                            'z-10',
                                            'swift-megamenu',
                                        )}
                                        aria-hidden="true"
                                        role="menu"
                                        // eslint-disable-next-line no-return-assign
                                        ref={(el) => (megaMenuRef.current[idx] = el)}
                                    >
                                        {val.show_header && (
                                            <div className="header-html grid">
                                                <CmsRenderer content={val.header_html} />
                                            </div>
                                        )}
                                        <MenuChildren data={val.children} handleClick={handleClick} generateLink={generateLink} mainData={val} />
                                        {val.show_footer && (
                                            <div className="footer-html grid">
                                                <CmsRenderer content={val.footer_html} />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                                {/* {styles} */}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <style jsx global>
                {`
                    .main-content {
                        display: flex;
                    }

                    /* menu list */
                    .nav > li {
                        float: left;
                    }

                    /* menu dropdown */
                    .mega-menu {
                        opacity: 0;
                        position: absolute;
                        transition: all 0.1s ease 0.1s;
                        visibility: hidden;
                        margin-left: -1%;
                        margin-top: 0px;
                    }
                    .menu-category li > a {
                        position:relative;
                    }
                    .menu-category ul.swift-nav-menubar li.swift-nav-menu-lv1:hover > a:after {
                        content: "";
                        border-bottom: 1px solid ${COLORS.neutral[600]};
                        width: 125%;
                        height: 1px;
                        bottom: -12px;
                        left: -10px;
                        position: absolute;
                    }
                    li:hover > .mega-menu {
                        opacity: 1;
                        overflow: visible;
                        visibility: visible;
                        margin-top: 30px;
                    }

                    /* menu content */
                    .nav-column a {
                        display: block;
                        font-weight: bold;
                        line-height: 1.75;
                        margin: 0;
                        padding: 7px;
                    }
                    .nav-column a:hover {
                        color: ${COLORS.neutral[900]} !important;
                    }
                `}
            </style>
        </>
    );
};

export default Menu;
