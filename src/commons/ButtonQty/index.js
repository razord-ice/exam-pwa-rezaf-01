/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable radix */
import React from 'react';
import cx from 'classnames';

const ButtonActionQty = ({
    disabled,
    onClick,
    label,
    className,
}) => (
    <button
        type="button"
        onClick={disabled ? () => {} : onClick}
        className={
            cx(
                'button-qty-minus',
                'p-[6px]',
                'w-[32px]',
                'h-[32px]',
                'rounded-[6px]',
                'flex',
                'items-center',
                'justify-center',
                'gap-[24px]',
                'duration-500',
                'hover:bg-neutral-50 hover:text-primary-300',
                disabled && 'text-neutral-300 hover:text-neutral-300 cursor-default',
                className,
            )
        }
    >
        {label}
    </button>
);

const ButtonQty = ({
    value = 1,
    onChange,
    onBlur,
    max = 100,
    disabled = false,
    width = 120,
    classNameBtnMinus,
    classNameBtnPlus,
    classNameInput,
    classNameInputContainer,
}) => {
    const [localValue, setLocalValue] = React.useState(value);
    const disabledMin = disabled || localValue === 1;
    const disableMax = disabled || localValue === max;
    const inputRef = React.useRef();

    // to distinguish onChange event are triggered by +- button or by input
    const trigger = {
        BUTTON: 'button',
        INPUT: 'input',
    };

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleMinus = () => {
        if (!disabled && localValue > 1 && localValue <= max) {
            if (onChange) {
                onChange(localValue - 1, trigger.BUTTON);
            }
            setLocalValue(parseInt(localValue, 0) - 1);
        }
    };
    const handlePlus = () => {
        if (!disabled && localValue > 0 && localValue < max) {
            if (onChange) {
                onChange(localValue + 1, trigger.BUTTON);
            }
            setLocalValue(parseInt(localValue, 0) + 1);
        }
    };

    const handleLocalChange = (event) => {
        const val = parseInt(event.target.value, 0);
        if (val < 1) {
            window.toastMessage({
                open: true,
                text: 'Min input 1',
                variant: 'error',
            });
        } else if (val > max) {
            window.toastMessage({
                open: true,
                text: `Max input ${max}`,
                variant: 'error',
            });
        } else {
            if (onChange) {
                onChange(val, trigger.INPUT);
            }
            setLocalValue(parseInt(val, 0));
        }
    };

    const handleBlur = (event) => {
        const val = parseInt(event.target.value, 0);
        if (onBlur) {
            onBlur(val);
        }
    };

    const handleKeyUp = (event) => {
        const ENTER_KEY = 'Enter';
        const ESC_KEY = 'Escape';
        if (event.key === ENTER_KEY || event.key === ESC_KEY) {
            inputRef.current.blur();
        }
    };

    return (
        <div
            style={{
                ...(width ? { width } : null),
            }}
            className={cx(
                'button-qty',
                'grid',
                'grid grid-cols-3',
                'justify-center',
                'border-[1px]',
                'rounded-[8px]',
                'gap-[7px]',
                'p-[4px]',
                'border-neutral-50',
                'xs:!max-w-[118px]',
                'sm:!max-w-[initial]',
                classNameInputContainer,
            )}
        >

            <ButtonActionQty
                className={cx('mx-auto swift-button-qty-minus', classNameBtnMinus)}
                label="-"
                disabled={disabledMin}
                onClick={handleMinus}
            />
            <input
                ref={inputRef}
                type="number"
                value={localValue}
                disabled={disabled}
                onChange={handleLocalChange}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                className={
                    cx(
                        'swift-btn-qty-input',
                        'text-center',
                        '!font-pwa-default',
                        'bg-neutral-white focus:outline-none',
                        'h-[100%]',
                        'w-[100%]',
                        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                        'disabled:text-neutral-300',
                        classNameInput,
                    )
                }
            />
            <ButtonActionQty
                className={cx('mx-auto swift-button-qty-plus', classNameBtnPlus)}
                label="+"
                onClick={handlePlus}
                disabled={disableMax}
            />
        </div>
    );
};

export default ButtonQty;
