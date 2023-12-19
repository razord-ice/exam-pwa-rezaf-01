import { useReactiveVar } from '@apollo/client';
import CountrySelect from '@common_forms/PhoneInput/CountrySelect';
import Typography from '@common_typography';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import cx from 'classnames';
import ReactPhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneInput = (props) => {
    const {
        value, onChange, label = '', error = false, errorMessage = '', className = '',
        classNameField = '', classLabel = '', placeholder = '81234567890', ...restProps
    } = props;

    const pwaConfig = useReactiveVar(storeConfigVar);
    const defaultCountry = pwaConfig && pwaConfig.general_country_default;

    return (
        <div className={cx('flex', 'flex-col', className)} {...restProps}>
            {label ? (
                <label className="mb-2">
                    <Typography variant="h4" className={classLabel}>{label}</Typography>
                </label>
            ) : null}
            <ReactPhoneInput
                defaultCountry={defaultCountry}
                value={value}
                onChange={(e) => onChange(e)}
                className={cx(
                    'items-center',
                    'w-[320px]',
                    'bg-neutral-white',
                    'border-[1px]',
                    'border-neutral-100',
                    'rounded-lg',
                    'text-md',
                    'hover:border-primary-100',
                    'focus:border-0',
                    {
                        '!border-red hover:!border-red': error,
                    },
                    classNameField,
                )}
                numberInputProps={{
                    className: cx('pr-4', 'py-[10px]', ' focus-visible:outline-none', 'rounded-lg'),
                }}
                countrySelectComponent={CountrySelect}
                placeholder={placeholder}
            />
            {error && errorMessage ? (
                <Typography variant="bd-2b" className={cx('my-2', '!text-red')}>
                    {errorMessage}
                </Typography>
            ) : null}
        </div>
    );
};

export default PhoneInput;
