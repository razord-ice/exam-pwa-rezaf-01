/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Header from '@core_modules/theme/components/header/components/v2/adaptive/desktop';
import cx from 'classnames';

import { BREAKPOINTS } from '@core/theme/vars';

const HeaderV2 = (props) => {
    const {
        //
        storeConfig,
        handleSearch,
        setValue,
        data,
        loading,
        t,
        isLogin,
        customer,
        handleLogout,
        deviceWidth,
        appName,
        installMessage,
        ...other
    } = props;

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            // handle sticky
            if (storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
                let isDesktop = false;
                // eslint-disable-next-line no-unused-vars
                let isTablet = false;
                let isMobile = false;
                const headerPromo = document.getElementById('global-promo-message');
                if (window.innerWidth >= BREAKPOINTS.xl) {
                    isDesktop = true;
                } else if (window.innerWidth >= BREAKPOINTS.md) {
                    isTablet = true;
                } else {
                    isMobile = true;
                }
                // apply on tablet and desktop only
                if (!isMobile) {
                    const header = document.querySelector('header');
                    const innerHeader = document.querySelector('#header-inner');
                    // eslint-disable-next-line max-len
                    const headerContent = document.querySelector('#header-inner .header-wrapper-main') || document.querySelector('#sticky-header .header-wrapper-main');
                    const sticky = document.querySelector('#sticky-header');
                    let headerHeight = 0;
                    let globalPromoheight = 0;
                    // eslint-disable-next-line no-unused-vars
                    let topHeaderheight = 0;
                    let midHeaderheight = 0;
                    // eslint-disable-next-line no-unused-vars
                    let bottomHeaderheight = 0;
                    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const handleScroll = () => {
                        const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
                        headerHeight = header.offsetHeight;
                        if (headerPromo) {
                            globalPromoheight = document.querySelector('#global-promo-message')?.offsetHeight;
                        }
                        topHeaderheight = isDesktop
                            ? document.querySelector('.desktop-header .top-header')?.offsetHeight || 0
                            : document.querySelector('#top-header-tablet')?.offsetHeight || 0;
                        midHeaderheight = isDesktop
                            ? document.querySelector('.desktop-header .middle-header')?.offsetHeight
                            : document.querySelector('.desktop-header .middle-header')?.offsetHeight;
                        bottomHeaderheight = isDesktop ? document.querySelector('.desktop-header .bottom-header')?.offsetHeight || 0 : 0;

                        if (scrollTopPosition > lastScrollTop) {
                            if (scrollTopPosition > headerHeight) {
                                sticky.style.top = '0px';
                                sticky.appendChild(headerContent);
                                header.style.height = `${globalPromoheight + midHeaderheight}px`;
                                sticky.style.top = '0px';
                            }
                        } else if (scrollTopPosition < lastScrollTop) {
                            if (scrollTopPosition > globalPromoheight) {
                                sticky.style.top = '0px';
                            } else {
                                sticky.style.top = '0px';
                                innerHeader.appendChild(headerContent);
                                innerHeader.style.marginTop = 0;
                                header.style.height = 'initial';
                            }
                        }
                        lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
                    };

                    if (storeConfig?.pwa?.enabler_sticky_header) {
                        window.addEventListener('scroll', handleScroll);
                        return () => window.removeEventListener('scroll', handleScroll);
                    }
                }
            }
        }
    }, []);

    return (
        <>
            <div
                id="sticky-header"
                className={cx(
                    'top-[-500px]', 'bg-neutral-white',
                    'transition-all', 'duration-500', 'ease-in-out', 'z-[999]', 'w-[100%]', {
                    '!fixed': storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header && deviceWidth >= 768,
                    '!relative': storeConfig && !storeConfig.pwa && !storeConfig.pwa.enabler_sticky_header,
                },
)}
            />
            <div
                id="header-inner"
                className={cx(
                    'top-0',
                    'bg-neutral-white',
                )}
            >
                <div className={cx('header-wrapper-main')}>
                    <div className="header-main">
                        <Header
                            t={t}
                            storeConfig={storeConfig}
                            isLogin={isLogin}
                            setValue={setValue}
                            handleSearch={handleSearch}
                            dataMenu={data}
                            loadingMenu={loading}
                            handleLogout={handleLogout}
                            customer={customer.customer}
                            deviceWidth={deviceWidth}
                            {...other}
                        />
                    </div>
                </div>
                <style jsx>
                    {`
                        .header-wrapper-main {
                            background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                        }
                        .menu-category {
                            width: fit-content;
                            display: block;
                        }
                    `}
                </style>
                <style global jsx>
                    {`
                        .hidden-submenu {
                            display: none !important;
                            transition: display 1s ease;
                        }
                        .header-small {
                            top: -45px !important;
                        }
                        @media (min-width: 1250px) {
                            .header-small {
                                height: 75px !important;
                            }
                            .hidden-submenu {
                                display: none !important;
                                transition: display 1s ease;
                            }
                        }
                    `}
                </style>
            </div>
        </>
    );
};

export default HeaderV2;
