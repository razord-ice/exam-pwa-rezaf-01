/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithLink = (props) => {
    const { cartData, handleLink } = props;

    return (
        <div
            className={cx('group hover:cursor-pointer items-center flex')}
            onClick={handleLink}
        >
            <BadgeCounter value={cartData}>
                <ShoppingCartIcon
                    className={cx(
                        'w-[24px]',
                        'text-neutral-600',
                        'hover:text-primary-500',
                        'group-hover:text-primary-500',
                        'mt-0',
                        'hover:cursor-pointer',
                    )}
                />
            </BadgeCounter>
        </div>
    );
};

export default WithLink;
