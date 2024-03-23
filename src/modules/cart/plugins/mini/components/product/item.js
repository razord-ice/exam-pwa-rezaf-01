/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import Button from '@common_button';
import ButtonQty from '@common_buttonqty';
import Thumbor from '@common_image';
import Typography from '@common_typography';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';
import { useTranslation } from 'next-i18next';
import Badge from '@common/Badge';

const Item = (props) => {
    const {
        errorCartItems,
        quantity,
        custom_price,
        product,
        deleteCart,
        updateCart,
        id,
        configurable_options,
        bundle_options,
        customizable_options,
        SimpleMiniCustomizable,
        ConfigurableMiniCustomizable,
        aw_giftcard_option,
        storeConfig,
        currencyCache,
    } = props;
    const { t } = useTranslation(['common']);
    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    const handleUpdateCart = (qty) => {
        updateCart(id, qty);
    };

    return (
        <li className={cx('px-6', 'py-5 pb-0', 'swift-list-item-product')}>
            <div className={cx(
                'swift-minicart__item--wrapper flex',
                'tablet:max-desktop:py-4 tablet:max-desktop:pb-5 tablet:max-desktop:pt-2 desktop:pb-3',
                'flex-row gap-4 plugin-minicart-itemsProduct',
                'border-b-[1px]',
                'border-b-neutral-300',
            )}
            >
                <div className={cx('minicart__item--photo-wrapper', 'rounded-[4px]')}>
                    <Link
                        href="/[...slug]"
                        as={`/${product.url_key}`}
                        passHref
                        className={cx(
                            'swift-minicart__item--photo',
                            'tablet:h-[120px]',
                            'tablet:w-[120px]',
                            'mobile:max-tablet:h-[100px]',
                            'mobile:max-tablet:w-[100px]',
                            'block relative',
                        )}
                    >
                        <Thumbor
                            className="product-image-photo"
                            src={product.small_image.url}
                            alt={product.small_image.label}
                            width={120}
                            height={120}
                            storeConfig={storeConfig}
                        />
                        {custom_price?.row_total_incl_tax?.value === 0 ? (
                            <Badge className="absolute left-1 top-1" success label={t('common:title:free')} />
                        ) : null}
                    </Link>
                </div>
                <div className={cx('minicart__item--details', 'basis-full')}>
                    <div className={cx('minicart__item--details-child-wrapper', 'grid', 'grid-cols-1', 'gap-y-[10px]')}>
                        <div className={cx('minicart__item--details-child-top-wrapper', 'flex', 'flex-row', 'gap-3', 'justify-between')}>
                            <div className={cx('minicart__item--name-wrapper', 'tablet:max-desktop:basis-[176px]', 'desktop:basis-[320px]')}>
                                <Link href="/[...slug]" as={`/${product.url_key}`} className="swift-minicart__item--name">
                                    <Typography variant="bd-1b" className={cx('normal-case', 'mobile:max-tablet:text-base')}>
                                        {product.name}
                                    </Typography>
                                </Link>
                                <div className={cx('minicart__item--option-wrapper mt-2')}>
                                    {configurable_options && configurable_options.length ? (
                                        <Typography
                                            variant="bd-2b"
                                            letter="capitalize"
                                            className="font-normal mt-1 !text-neutral-500"
                                        >
                                            {configurable_options.map((item, idx) => `${item.value_label}${idx < configurable_options.length - 1 ? ', ' : ''}`)}
                                        </Typography>
                                    ) : null}
                                    {bundle_options && bundle_options.length ? (
                                        <div className="flex flex-col gap-2 mt-1">
                                            {bundle_options.map((value, idx) => (
                                                <div className="flex flex-col gap-1" key={idx}>
                                                    <Typography variant="bd-2b">{value.label}</Typography>
                                                    <div className="flex flex-col gap-1">
                                                        {value.values.map((item, idt) => (
                                                            <Typography variant="bd-2b" key={idt}>
                                                                {item.quantity}
                                                                {' '}
                                                                x
                                                                {item.label}
                                                                {' '}
                                                                +
                                                                {' '}
                                                                {formatPrice(item.price, 'IDR', currencyCache)}
                                                            </Typography>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {cartCustomOptions && cartCustomOptions.length ? (
                                        <div className="flex flex-col gap-1 mt-1">
                                            {cartCustomOptions.map((op, idx) => (
                                                <div className="flex flex-col tablet:flex-row" key={idx}>
                                                    <Typography variant="bd-2b">
                                                        {`${op.label}: `}
                                                    </Typography>

                                                    {op.values.map((item, idt) => (
                                                        <Typography variant="bd-2b" key={idt} className="option-item tablet:ml-1">
                                                            {item.label && item.label !== '' ? item.label : item.value}
                                                        </Typography>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {aw_giftcard_option && aw_giftcard_option.length ? (
                                        <div className="flex flex-col gap-3">
                                            {aw_giftcard_option.map((val, idx) => (
                                                <div className="flex flex-col" key={idx}>
                                                    <Typography variant="bd-1b">
                                                        {`${val.label} : `}
                                                    </Typography>

                                                    <Typography variant="bd-1b">
                                                        {val.value}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={cx('swift-minicart__item--delete-wrapper')}>
                                <Button
                                    className={cx(
                                        '!m-0',
                                        '!px-0',
                                        '!py-0',
                                        '!ml-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => deleteCart(props)}
                                    icon={<TrashIcon />}
                                    iconProps={{
                                        className: cx('mobile:max-tablet:w-[20px]', 'tablet:w-[24px]', 'text-neutral-500'),
                                    }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                            </div>
                        </div>
                        <div
                            className={cx(
                                'minicart__item--details-qty-price',
                                'tablet:max-desktop:grid',
                                'tablet:max-desktop:grid-cols-1',
                                'tablet:max-desktop:gap-y-2',
                                'desktop:flex',
                                'desktop:flex-row',
                            )}
                        >
                            <div className={cx('details-qty qty', 'desktop:basis-full')}>
                                <ButtonQty
                                    value={quantity}
                                    onChange={(newQty, trigger) => {
                                        // only update cart if user change qty via +- button
                                        if (trigger === 'button') {
                                            handleUpdateCart(newQty);
                                        }
                                    }}
                                    onBlur={handleUpdateCart}
                                />
                            </div>
                            <div
                                className={cx(
                                    'item-price',
                                    'desktop:basis-[74px]',
                                    'font-semibold',
                                    'text-lg',
                                    'text-neutral-800',
                                    'mobile:max-desktop:pt-1',
                                )}
                            >
                                {formatPrice(
                                    custom_price?.price_incl_tax?.value || 0,
                                    custom_price?.price_incl_tax?.currency || 'IDR',
                                    currencyCache,
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorCartItems && errorCartItems.length > 0 && errorCartItems[0] !== null && (
                <div className="error-status-qty">
                    <div className="bg-yellow-600 text-neutral-white p-2">{errorCartItems[0]}</div>
                </div>
            )}

            <style jsx>
                {`
                    .swift-list-item-product:last-child .swift-minicart__item--wrapper {
                        border-bottom: 0;
                    }
                `}
            </style>
        </li>
    );
};

export default Item;
