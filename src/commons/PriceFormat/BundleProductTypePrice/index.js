import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useMediaQuery from '@hook/useMediaQuery';
import cx from 'classnames';
import { useTranslation } from 'next-i18next';

const AsLowAsText = (textClassName) => {
    const { t } = useTranslation(['common']);
    return (
        <Typography variant="bd-3b" className={cx('price-text', 'text-neutral-500', textClassName)}>
            {` ${t('common:price:asLowAs')} `}
        </Typography>
    );
};

const BundleProductTypePrice = ({
    variant = 'lg', priceRange, additionalPrice, currencyCache, textClassName = '', priceView = 'PRICE_RANGE',
}) => {
    const { isDesktop } = useMediaQuery();
    const isVariantLg = variant === 'lg';
    const priceVariantDesktopLabel = isVariantLg ? 'bd-1c' : 'bd-1a';
    const priceVariantMobileLabel = isVariantLg ? 'h2' : 'bd-2';
    const priceLabelVariant = isDesktop ? priceVariantDesktopLabel : priceVariantMobileLabel;

    const priceVariantMobileLabelSub = isVariantLg ? 'bd-2b' : 'bd-3b';
    const priceVariantDesktopLabelSub = isVariantLg ? 'bd-2b' : 'bd-3b';
    const priceLabelSubVariant = isDesktop ? priceVariantDesktopLabelSub : priceVariantMobileLabelSub;
    const otherPrice = additionalPrice || 0;
    if (priceRange.maximum_price.final_price.value === priceRange.minimum_price.final_price.value) {
        return (
            <Typography variant={priceLabelVariant} className={cx('price-text', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
        );
    }

    if (priceView && priceView === 'AS_LOW_AS') {
        const regularPrice = priceRange?.minimum_price?.regular_price || 0;
        return (
            <div className="flex flex-col">
                <Typography variant={priceLabelVariant} className={cx('price-text', textClassName)}>
                    {formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}
                </Typography>
                <div>
                    <AsLowAsText textClassName={textClassName} />
                    <Typography variant={priceLabelSubVariant} className={cx('price-text', 'text-neutral-600', textClassName)}>
                        {formatPrice(
                            priceRange.minimum_price.final_price.value + otherPrice,
                            priceRange.minimum_price.final_price.value.currency, currencyCache,
                        )}
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('flex flex-row flex-wrap justify-center')}>
            <Typography variant={priceLabelVariant} className={cx('price-text-min', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.minimum_price.final_price.value + otherPrice, priceRange.minimum_price.final_price.currency, currencyCache)}
            </Typography>
            <Typography variant={priceLabelVariant} className={cx('price-text-seperate', 'text-neutral-400', 'mx-1')}>
                -
            </Typography>
            <Typography variant={priceLabelVariant} className={cx('price-text-max', 'text-neutral-400', textClassName)}>
                {formatPrice(priceRange.maximum_price.final_price.value + otherPrice, priceRange.maximum_price.final_price.currency, currencyCache)}
            </Typography>
        </div>
    );
};

export default BundleProductTypePrice;
