/* eslint-disable no-unused-vars */
import React from 'react';
import Skeleton from '@common_skeleton';
import GlobalPromoCarousel from '@core_modules/cms/components/cms-renderer/global-promo-carousel';
import cx from 'classnames';
import { features } from '@config';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';

const GlobalPromoMessage = (props) => {
    const {
        // prettier-ignore
        storeConfig,
        ...other
    } = props;
    const { key_cookies } = features.globalPromo;

    const { data, loading } = getCmsBlocks({
        identifiers: 'global_promo_message',
    });

    if (loading) {
        return (
            <div id="global-promo-message-skeleton">
                <Skeleton height={38} className={cx('!top-[10px]', '!left-[25%]', '!w-[50vw]')} />
            </div>
        );
    }

    if (!loading && data && data.cmsBlocks && data.cmsBlocks.items.length > 0 && data.cmsBlocks.items[0].content) {
        return (
            <>
                <div
                    id="global-promo-message"
                    className={cx(
                        'global-promo-message',
                        'h-[38px]',
                        'text-center',
                        'font-normal flex',
                        'tablet:text-base',
                        'mobile:max-tablet:text-sm',
                        'bg-primary-500',
                        'text-neutral-white',
                        'mobile:max-tablet:py-1',
                    )}
                >
                    {/* <GlobalPromoCarousel
                        className={cx('relative', 'flex', 'justify-center', 'tablet:max-w-screen-tablet', 'desktop:max-w-screen-desktop', 'mx-auto')}
                        content={data.cmsBlocks.items[0].content}
                        key_cookies={key_cookies}
                        storeConfig={storeConfig}
                        {...other}
                    /> */}
                    <div
                        className={cx(
                            'relative', 'flex', 'justify-center items-center',
                            'tablet:max-w-screen-tablet',
                            'desktop:max-w-screen-desktop',
                            'mx-auto',
                        )}
                    >
                        {storeConfig.welcome}
                    </div>
                </div>
            </>
        );
    }

    return null;
};

export default GlobalPromoMessage;
