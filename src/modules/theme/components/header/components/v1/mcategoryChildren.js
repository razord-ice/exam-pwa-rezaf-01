/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';
import { COLORS } from '@core/theme/vars';

const MenuChildren = ({ data, handleClick, generateLink, mainData }) => {
    const [active, setActive] = React.useState(0);
    const child = data[active];

    const chevronRight = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block relative right-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    `;

    return (
        <div className="main-content">
            {mainData && mainData.show_left_sidebar && (
                <div className="left-sidebar" style={{ width: mainData.left_sidebar_width }}>
                    <CmsRenderer content={mainData.left_sidebar_html} />
                </div>
            )}
            <div
                className={cx('nav-column swift-nav-column-left', 'min-w-[150px]', {
                    '!bg-neutral-white': mainData && mainData.dropdown_bgcolor === '',
                })}
            >
                {data.map((val, idx) => {
                    let label;
                    if (val.children.length > 0) {
                        label = `<div class="flex flex-1 justify-between"><span>${val.name}</span><span>${chevronRight}</span></div>`;
                    } else {
                        label = val.name;
                    }
                    return (
                        <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]} prefetch={false} legacyBehavior>
                            <a
                                onClick={() => handleClick(val)}
                                className={cx(
                                    active === idx ? 'active' : '',
                                    '!text-neutral-700',
                                    '!text-base',
                                    '!font-normal',
                                    '!leading-lg',
                                    'hover:!font-medium',
                                    '!px-2',
                                    '!py-[10px]',
                                    'swift-nav-menu-lv2',
                                )}
                                onMouseEnter={() => setActive(idx)}
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: label,
                                }}
                            />
                        </Link>
                    );
                })}
            </div>
            <div className={cx('nav-column', { 'swift-nav-column-right': child.children.length > 0 })}>
                <div className={`${child.image_path ? 'lg:basis-9/12' : 'lg:basis-full'} row`}>
                    {child.children.map((lvl3, id3) => (
                        <div className="lg:basis-3/12" key={id3}>
                            <Link href={generateLink(lvl3)[0]} as={generateLink(lvl3)[1]} prefetch={false} legacyBehavior>
                                <a
                                    onClick={() => handleClick(lvl3)}
                                    className={cx(
                                        '!text-neutral-700',
                                        'text-base',
                                        '!font-normal',
                                        '!leading-lg',
                                        '!px-4',
                                        '!py-[11px]',
                                        'swift-nav-menu-lv3',
                                    )}
                                >
                                    {lvl3.name}
                                </a>
                            </Link>
                            <ul className="list-item__menu">
                                {lvl3.children.map((lvl4, id4) => (
                                    <li key={id4}>
                                        <Link href={generateLink(lvl4)[0]} as={generateLink(lvl4)[1]} prefetch={false} legacyBehavior>
                                            <a
                                                onClick={() => handleClick(lvl4)}
                                                className={cx(
                                                    '!text-neutral-700',
                                                    'text-base',
                                                    '!font-normal',
                                                    '!leading-lg',
                                                    '!px-4',
                                                    '!py-[11px]',
                                                    'swift-nav-menu-lv4',
                                                )}
                                            >
                                                {lvl4.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {child.image_path ? (
                    <div className="lg:basis-3/12">
                        <Thumbor src={child.image_path} className="img_cat" width={960} height={577} quality={80} alt={child.name} />
                    </div>
                ) : null}
            </div>
            {mainData && mainData.show_right_sidebar && (
                <div className="right-sidebar" style={{ width: mainData.right_sidebar_width }}>
                    <CmsRenderer content={mainData.right_sidebar_html} />
                </div>
            )}
            <style jsx>
                {`
                    .row {
                        margin: 0;
                    }
                    .swift-nav-column-left {
                        background: ${mainData && mainData.dropdown_bgcolor ? mainData.dropdown_bgcolor : '#FFFFFF'};
                        padding: 16px;
                        border-radius: 8px !important;
                        border-right: 1px solid ${COLORS.neutral[50]}
                    }
                    .swift-nav-column-right {
                        padding: 16px 16px 16px 0;
                    }
                    .list-item__menu a {
                        font-weight: normal;
                        padding-bottom: 5px;
                        padding-top: 0px;
                    }
                `}
            </style>
        </div>
    );
};

export default MenuChildren;
