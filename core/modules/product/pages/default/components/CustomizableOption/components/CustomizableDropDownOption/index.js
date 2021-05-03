/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { formatPrice } from '@helpers/currency';
import { useTranslation } from '@i18n';
import getPrice from '../../../../../../helpers/getPrice';
import View from './view';
import { getCustomizableDropDownOption } from '../../../../../../services/graphql/customizableSchema';

const CustomizableDropDownOption = ({
    url_key, option_id, customizableOptions, setCustomizableOptions,
    errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    stock_status, ...other
}) => {
    const { t } = useTranslation(['product']);
    const productPrice = getPrice(other.price);
    const [value, setValue] = useState([]);
    const [options, setOptions] = useState({});
    const [selected, setSelected] = useState('');

    // get values options customizable
    const { data, loading } = useQuery(getCustomizableDropDownOption(url_key), {
        skip: !url_key,
        fetchPolicy: 'no-cache',
    });

    const onChange = async (e) => {
        const val = e.target.value;
        let filterValues = [];
        let addPrice = 0;
        if (val && val !== '') {
            filterValues = value.filter((item) => {
                if (val === item.value) {
                    addPrice += item.price;
                }
                return val === item.value;
            });
        }
        if (customizableOptions && customizableOptions.length > 0) {
            let oldPrice = 0;
            const removeOldOptions = customizableOptions.filter((item) => {
                if (item.option_id === options.option_id) {
                    oldPrice += item.price;
                }
                return item.option_id !== options.option_id;
            });
            let newPrice = additionalPrice - oldPrice;
            if (newPrice <= 0) {
                newPrice = 0;
            }
            await setAdditionalPrice(newPrice);
            if (filterValues.length > 0) {
                setAdditionalPrice(newPrice + addPrice);
            }
            setCustomizableOptions([
                ...removeOldOptions,
                ...filterValues,
            ]);
        } else {
            setCustomizableOptions(filterValues);
            if (filterValues.length > 0) {
                setAdditionalPrice(additionalPrice + addPrice);
            } else {
                setAdditionalPrice(0);
            }
        }
        setSelected(val);
    };

    useMemo(() => {
        if (customizableOptions && customizableOptions.length > 0) {
            //
        }
    }, [customizableOptions]);

    useMemo(() => {
        if (data && data.products && data.products.items.length > 0) {
            const option = data.products.items[0].options.filter(
                (item) => item.option_id === option_id && item.__typename === 'CustomizableDropDownOption',
            );
            if (option && option.length > 0) {
                setOptions(option[0]);
            }
            if (option && option[0] && option[0].value && option[0].value.length > 0) {
                const newvalue = option[0].value.map((item) => {
                    let { price } = item;
                    if (item.price_type === 'PERCENT') {
                        price = (productPrice * price) / 100;
                    }
                    return {
                        ...item,
                        option_id: option[0].option_id,
                        label: `${item.title} + ${formatPrice(price)}`,
                        value: JSON.stringify(item.option_type_id),
                        price,
                    };
                });
                if (!option[0].required) {
                    newvalue.unshift({
                        label: t('common:title:none'),
                        price: 0,
                        value: '',
                    });
                }
                setValue(newvalue);
            }
        }
    }, [data]);

    let error = '';
    useMemo(() => {
        if (options.option_id && errorCustomizableOptions.length > 0) {
            const findError = errorCustomizableOptions.filter((op) => op.option_id === options.option_id);
            if (findError && findError.length > 0) {
                error = t('product:validate:fieldRequired');
            }
        }
    }, [options, errorCustomizableOptions]);

    if (loading || !data) {
        return <p>Loading...</p>;
    }

    return (
        <View
            {...other}
            data={value}
            selected={selected}
            onChange={onChange}
            error={error}
            disabled={stock_status === 'OUT_OF_STOCK'}
        />
    );
};

export default CustomizableDropDownOption;
