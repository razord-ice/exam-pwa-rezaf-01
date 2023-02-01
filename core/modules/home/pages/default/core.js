/* eslint-disable no-unused-vars */
import Layout from '@layout';
import { getHost } from '@helper_config';
import { setLocalStorage } from '@helper_localstorage';
import { keyLocalStorage } from '@config';
import Content from '@core_modules/home/pages/default/components';
import { currencyVar } from '@root/core/services/graphql/cache';
import Cookies from 'js-cookie';

const HomeCore = (props) => {
    // eslint-disable-next-line object-curly-newline
    const { pageConfig, storeConfig, ...other } = props;

    const homeKey = keyLocalStorage.home;
    const useCms = storeConfig?.pwa?.use_cms_page_enable;

    if (typeof window !== 'undefined' && storeConfig) {
        const appCurrency = Cookies.get('app_currency');
        currencyVar({
            currency: storeConfig.base_currency_code,
            locale: storeConfig.locale,
            enableRemoveDecimal: storeConfig?.pwa?.remove_decimal_price_enable,
            appCurrency,
        });
    }

    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const config = {
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
        ...pageConfig,
    };

    return (
        <>
            {
                useCms ? <Content cmsHome={config} storeConfig={storeConfig} homePageConfig={{ storeConfig }} {...other} />
                    : (
                        <Layout {...props} pageConfig={config} isHomepage>
                            <Content storeConfig={storeConfig} homePageConfig={{ storeConfig }} {...other} />
                        </Layout>
                    )
            }
        </>
    );
};

export default HomeCore;
