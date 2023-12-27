/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { useTranslation } from 'next-i18next';
import Alert from '@common_alert';
import classNames from 'classnames';
import React from 'react';
import gqlService from '@core_modules/checkout/services/graphql';
import Dialog from '@common_dialog';

const ModalSelectStore = ({
    open, setOpen, checkout, setCheckout,
    listStores = [],
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const [stores, setStores] = React.useState(listStores);
    const [search, setSearch] = React.useState('');
    const [setPickupStore] = gqlService.setPickupStore();
    const [selected, setSelected] = React.useState({
        key: null,
        item: null,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSelect = async (key, item) => {
        setSelected({
            key,
            item,
        });
    };

    const handleSave = async () => {
        await setLoading(true);
        if (Object.keys(checkout.pickupInformation).length > 0) {
            await setPickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                    code: selected.item.code,
                    extension_attributes: checkout.pickupInformation,
                    store_address: {
                        city: selected.item.city,
                        country_code: selected.item.country_id,
                        name: selected.item.name,
                        postcode: selected.item.postcode,
                        region: selected.item.region,
                        street: [selected.item.street],
                        telephone: selected.item.telephone,
                    },
                },
            }).then(async (res) => {
                const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));
                await setCheckout({
                    ...checkout,
                    data: {
                        ...checkout.data,
                        cart: {
                            ...checkout.data.cart,
                            ...res.data.setPickupStore,
                        },
                        paymentMethod,
                    },
                    selectStore: {
                        ...selected.item,
                    },
                    error: {
                        selectStore: false,
                        pickupInformation: false,
                    },
                });
                await setLoading(false);
                setOpen();
            }).catch((err) => {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: err.message.split(':')[1] || t('checkout:message:serverError'),
                });
                setLoading(false);
            });
        } else {
            await setCheckout({
                ...checkout,
                selectStore: {
                    ...selected.item,
                },
                error: {
                    ...checkout.error,
                    pickupInformation: true,
                },
            });

            await setLoading(false);
            setOpen();
        }
    };

    const getStyle = (key, index) => {
        let classname;
        const styleCard = 'w-full p-4 my-3 flex flex-col justify-between items-center border border-neutral-200 rouded-lg';
        const styleCardActive = '!border-primary';
        const styleCardLast = 'mb-10';
        if (selected.key && selected.key === key) {
            classname = classNames(styleCard, styleCardActive);
        } else if (Object.keys(checkout.selectStore).length > 0 && !selected.key) {
            if (key === checkout.selectStore.code) {
                classname = classNames(styleCard, styleCardActive);
            } else if (index === listStores.length - 1) {
                classname = classNames(styleCard, styleCardLast);
            } else {
                classname = styleCard;
            }
        } else if (index === listStores.length - 1 && key === selected.key) {
            classname = classNames(styleCard, styleCardActive, styleCardLast);
        } else if (index === listStores.length - 1) {
            classname = classNames(styleCard, styleCardLast);
        } else {
            classname = styleCard;
        }

        return classname;
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        const newItem = listStores.filter(
            ({ name }) => name.toLowerCase().search(value.toLowerCase()) > -1,
        );
        setSearch(value);
        setStores(newItem);
    };

    React.useEffect(() => {
        setStores(listStores);
    }, [listStores]);

    return (
        <Dialog
            open={open}
            closeOnBackdrop
            onClose={() => setOpen()}
            onClickCloseTitle={() => setOpen()}
            title={t('checkout:pickupInformation:selectStoreLocation')}
            useCloseTitleButton
            content={(
                <>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <TextField
                                label="Search"
                                value={search}
                                onChange={handleSearch}
                            />
                            {
                                stores.length > 0
                                    ? (
                                        stores.map((item, index) => (
                                            <div
                                                key={item.code}
                                                onClick={() => handleSelect(item.code, item)}
                                                className={getStyle(item.code, index)}
                                            >
                                                <Typography variant="bd-2" type="bold">
                                                    {item.name}
                                                </Typography>
                                                <Typography>
                                                    {item.street}
                                                    <br />
                                                    {item.city}
                                                    <br />
                                                    {item.region}
                                                    <br />
                                                    {item.country_id}
                                                    <br />
                                                    {item.postcode}
                                                    <br />
                                                    {item.telephone}
                                                </Typography>
                                            </div>
                                        ))
                                    ) : (
                                        <Alert className="m-15" severity="warning">
                                            {t('checkout:storesNotFound')}
                                        </Alert>
                                    )
                            }
                        </div>
                        <Button
                            loading={loading}
                            className="w-full"
                            classNameText="justify-center"
                            onClick={handleSave}
                            disabled={!stores || stores.length === 0}
                        >
                            {t('common:button:save')}
                        </Button>
                    </div>
                </>
            )}
        />
    );
};

export default ModalSelectStore;
