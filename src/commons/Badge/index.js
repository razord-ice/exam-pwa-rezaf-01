import React from 'react';
import cx from 'classnames';

const Badge = ({
    className,
    label,
    bold,
    primary,
    secondary,
    danger,
    softColor,
    warning,
    success,
    fontSize = 12,
}) => {
    let classNamesColor = softColor ? cx('!bg-neutral-50', 'text-neutral-400') : cx('!bg-neutral-50', 'text-neutral-400');
    if (danger) {
        classNamesColor = softColor ? cx('bg-red-50', 'text-red-600') : cx('bg-red-50', 'text-red-500');
    }
    if (primary) {
        classNamesColor = softColor ? cx('bg-neutral-50', 'text-neutral-400') : cx('bg-neutral-50', 'text-neutral-400');
    }
    if (secondary) {
        classNamesColor = softColor ? cx('bg-neutral-50', 'text-neutral-300') : cx('bg-neutral-300', 'text-neutral-50');
    }
    if (warning) {
        classNamesColor = softColor ? cx('bg-yellow-50', 'text-yellow-500') : cx('bg-yellow-500', 'text-neutral-white');
    }
    if (success) {
        classNamesColor = softColor ? cx('bg-green-50', 'text-green-700') : cx('bg-green-50', 'text-green-700');
    }
    return (
        <div
            style={{
                ...(fontSize ? { fontSize } : null),
            }}
            className={
                cx(
                    'rounded-[4px]',
                    'px-[8px]',
                    'py-[4px]',
                    bold && 'font-bold',
                    classNamesColor,
                    className,
                )
            }
        >
            {label}
        </div>
    );
};

export default Badge;
