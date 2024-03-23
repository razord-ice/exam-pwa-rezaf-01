/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-mixed-operators */
import cx from 'classnames';

import { useRouter } from 'next/router';

import { getCartId } from '@helper_cartid';
import { formatPrice } from '@helper_currency';

import { getCheckoutScv2Url } from '@core_modules/cart/services/graphql';

import ItemCart from '@plugin_minicart/components/product';
import Skeleton from '@plugin_minicart/components/skeleton';
import PaypalButtonView from '@plugin_paypalbutton';

import Button from '@common_button';
import CommonsDrawer from '@common_drawer';
import Typography from '@common_typography';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { useCallback } from 'react';

const MiniComponent = (props) => {
    const router = useRouter();
    const { open, setOpen, count, t, loading, data, deleteCart, updateCart, errorCart, storeConfig, currencyCache } = props;
    const errorCartItems = data?.errorItems?.length > 0;
    const disabled = errorCartItems || (errorCart && errorCart.length > 0);
    const subtotal_including_tax = data?.custom_total_price?.subtotal_including_tax?.value || 0;
    const subtotal_including_tax_currency = data?.custom_total_price?.subtotal_including_tax?.currency || 'IDR';
    const cartId = getCartId();
    const [getScv2Url, { loading: loaddingScv2Url }] = getCheckoutScv2Url();
    const [localOpen, setLocalOpen] = React.useState(open);

    const handleClose = () => {
        setLocalOpen(false);
        setTimeout(() => {
            setOpen(false);
        }, 500);
    };

    const handlingGoToCheckout = useCallback(() => {
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = data.custom_total_price.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;
        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(
                    minimumOrderAmount,
                    currencyCache,
                )}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
            setTimeout(() => {
                router.push('/checkout/cart');
            }, 3000);
        } else if (subtotal_including_tax) {
            if (
                    storeConfig.pwacheckout?.enable === '1' &&
                    storeConfig.pwacheckout?.version === 'V2' &&
                    cartId
            ) {
                getScv2Url({
                    variables: {
                        cartId,
                    },
                })
                    .then((res) => {
                        window.location.replace(res.data.generateScv2Url.scv2_url);
                    })
                    .catch(() => {
                        window.toastMessage({
                            open: true,
                            text: t('common:cart:cartError'),
                            variant: 'error',
                        });
                    });
            } else {
                setOpen();
                router.push('/checkout');
            }
        } else {
            window.toastMessage({
                open: true,
                text: t('common:cart:cartError'),
                variant: 'error',
            });
        }
    }, [cartId, data, storeConfig]);

    return (
        <>
            <CommonsDrawer
                open={localOpen}
                handleClose={handleClose}
                position="right"
                className={cx('mobile:max-tablet:w-[320px]', 'tablet:max-desktop:w-[396px]', 'desktop:w-[540px]', {
                    'mobile:max-tablet:right-[320px] tablet:max-desktop:right-[396px] desktop:right-[540px]': localOpen,
                    'mobile:max-tablet:animate-drawer-in-mobile tablet:max-desktop:animate-drawer-in-tablet  desktop:animate-drawer-in-desktop': localOpen,
                    'mobile:max-tablet:animate-drawer-out-mobile tablet:max-desktop:animate-drawer-out-tablet  desktop:animate-drawer-out-desktop': !localOpen,
                    'right-0': !localOpen,
                })}
            >
                <div>
                    <div className={cx('minicart__header--wrapper', 'tablet:pt-8', 'tablet:mx-6')}>
                        <div
                            className={cx(
                                'minicart__header--content',
                                'flex',
                                'flex-wrap',
                                'flex-column',
                                'justify-between',
                                'tablet:pb-4',
                                'border-b-[1px]',
                                'border-b-neutral-200',
                            )}
                        >
                            <div className={cx('minicart__header--info')}>
                                <Typography
                                    variant="p-1a"
                                    className={cx(
                                        'mobile:max-tablet:leading-[18px]',
                                        'mobile:max-tablet:font-semibold',
                                        'text-lg',
                                        'mobile:max-tablet:p-4',
                                    )}
                                >
                                    {`My Cart (${count})`}
                                </Typography>
                            </div>
                            <div className={cx('swift-minicart__header--close-action', 'text-right')}>
                                <Button
                                    className={cx(
                                        'tablet:m-0',
                                        'tablet:!px-0',
                                        'tablet:!py-0',
                                        'tablet:!ml-0',
                                        'mobile:max-tablet:mt-1',
                                        'mobile:max-tablet:p-2',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                        '!bg-neutral-black',
                                        '!rounded-full',
                                        'w-[24px]',
                                        'flex justify-center',
                                    )}
                                    onClick={handleClose}
                                    icon={<XMarkIcon />}
                                    iconProps={{ className: cx('w-[20px]', 'text-neutral-white') }}
                                    iconPosition="left"
                                    iconOnly
                                    variant="tertiary"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx(
                            'swift-minicart__items--wrapper',
                            'border-b-neutral-200',
                            !data.items || data.items.length === 0 ? '!border-none' : 'border-b-[1px]',
                        )}
                    >
                        {/* <Skeleton /> */}
                        {loading || !data.items ? (
                            <Skeleton />
                        ) : (
                            <ItemCart
                                t={t}
                                data={data.items}
                                deleteCart={deleteCart}
                                updateCart={updateCart}
                                storeConfig={storeConfig}
                                currencyCache={currencyCache}
                            />
                        )}
                        {data && data.total_quantity > 0 ? (
                            <div className={cx('absolute', 'left-0', 'min-h-[50px]', 'w-full', 'grid', 'grid-cols-1', 'gap-y-4')}>
                                <div className={cx('sub-total', 'px-6', 'flex', 'flex-row', 'justify-between', 'pt-4')}>
                                    <Typography variant="p-1" className={cx('normal-case text-lg')}>
                                        {t('common:cart:cardTotal')}:
                                    </Typography>
                                    <Typography
                                        variant="p-1a"
                                        className={cx(
                                            'normal-case',
                                            'text-neutral-800',
                                            'text-lg',
                                        )}
                                    >
                                        {data.custom_total_price
                                            ? formatPrice(subtotal_including_tax, subtotal_including_tax_currency, currencyCache)
                                            : '-'}
                                    </Typography>
                                </div>
                                {!disabled && (
                                    <div className={cx('checkout__wrapper', 'px-6', 'w-full')}>
                                        <Button
                                            className={cx(
                                                'checkout-button',
                                                '!px-0',
                                                '!py-[12px]',
                                                '!ml-0',
                                                'hover:shadow-none',
                                                'focus:shadow-none',
                                                'active:shadow-none',
                                                'active:shadow-none',
                                                '!bg-primary-500',
                                                'w-full',
                                                'rounded-md',
                                            )}
                                            loading={loaddingScv2Url}
                                            classNameText={cx('justify-center')}
                                            onClick={handlingGoToCheckout}
                                            variant="primary"
                                            id="plugin-minicart-checkoutBtn"
                                        >
                                            <Typography variant="p-1a" className={cx('!text-neutral-white', 'font-[700]')}>
                                                {t('common:button:goCheckout')}
                                            </Typography>
                                        </Button>
                                        <div
                                            id="plugin-minicart-editCartBtn"
                                            className={cx('pt-1')}
                                            onClick={() => {
                                                setOpen();
                                                router.push('/checkout/cart');
                                            }}
                                        >
                                            <Typography
                                                variant="p-2"
                                                className={cx(
                                                    '!text-primary-700',
                                                    'underline',
                                                    'text-center',
                                                    'font-[500]',
                                                    'hover:cursor-pointer',
                                                    'py-[10px]',
                                                )}
                                            >
                                                {t('common:button:viewandedit')}
                                            </Typography>
                                        </div>
                                        {!disabled && data && (
                                            <div className="btn-paypal">
                                                <PaypalButtonView cart={data} t={t} storeConfig={storeConfig} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            </CommonsDrawer>
        </>
    );
};

export default MiniComponent;
