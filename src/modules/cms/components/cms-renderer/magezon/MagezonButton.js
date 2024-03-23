/* eslint-disable react/no-danger */
import Button from '@common_button';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezonIcon';
import cx from 'classnames';

const MagezonButton = (props) => {
    const {
        title,
        link,
        icon,
        icon_position,
        icon_size,
        onClick = () => {},
        button_color,
        button_border_radius,
        button_font_size,
        button_border_style,
        button_background_color,
        button_border_color,
        button_border_width,
        button_hover_background_color,
        button_hover_border_color,
        button_hover_color,
        button_size,
        full_width,
        button_style,
        box_shadow_color,
        gradient_color_1,
        gradient_color_2,
    } = props;
    const isButtonXs = button_size === 'xs';
    const isRightIcon = icon_position === 'right';

    return (
        <div className="mgz-button">
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Button
                        type="button"
                        onClick={onClick}
                        className={cx('focus:shadow-none', {
                            'w-full': full_width,
                        })}
                        classNameText={cx('mgz-button--text', {
                            'text-xs': isButtonXs,
                        })}
                        size={isButtonXs ? 'sm' : button_size}
                    >
                        {icon && !isRightIcon ? <MagezonIcon icon={icon} icon_size={icon_size} icon_color={button_color} /> : null}
                        {title || ''}
                        {icon && isRightIcon ? <MagezonIcon icon={icon} icon_size={icon_size} icon_color={button_color} /> : null}
                    </Button>
                </MagezonLink>
            ) : (
                <Button
                    type="button"
                    onClick={onClick}
                    className={cx('focus:shadow-none', {
                        'w-full': full_width,
                    })}
                    classNameText={cx('mgz-button--text', {
                        'text-xs': isButtonXs,
                    })}
                    size={isButtonXs ? 'sm' : button_size}
                >
                    {icon && !isRightIcon ? <MagezonIcon icon={icon} icon_size={icon_size} icon_color={button_color} /> : null}
                    {title || ''}
                    {icon && isRightIcon ? <MagezonIcon icon={icon} icon_size={icon_size} icon_color={button_color} /> : null}
                </Button>
            )}
            {/* eslint-disable */}
            <style jsx>
                {`
                    .mgz-button :global(.mgz-button--text) {
                        ${button_color ? `color: ${button_color} !important;` : ''}
                        ${button_font_size ? `font-size: ${button_font_size} !important;` : ''}
                    }
                    .mgz-button :global(button:hover .mgz-button--text) {
                        ${button_hover_color ? `color: ${button_hover_color} !important;` : ''}
                    }
                    .mgz-button :global(.magezon-icon) {
                        ${isRightIcon ? 'margin-left: 5px;' : 'margin-right: 5px;'}
                    }
                    .mgz-button :global(button) {
                        ${button_border_style ? `border-style: ${button_border_style} !important;` : ''}
                        ${button_border_radius ? `border-radius: ${button_border_radius}px !important;` : ''}
                        ${button_background_color ? `background-color: ${button_background_color} !important;` : ''}
                        ${button_border_color ? `border-color: ${button_border_color} !important;` : ''}
                        ${button_border_width ? `border-width: ${button_border_width}px !important;` : ''}
                        ${button_style === '3d' && box_shadow_color ? `box-shadow: 0px 2px 4px -1px ${box_shadow_color}, 0px 4px 6px -1px ${box_shadow_color};` : ''}
                        ${button_style === 'gradient' && (gradient_color_1 || gradient_color_2) ? `
                            background-image: linear-gradient(to right, ${gradient_color_1} 0, ${gradient_color_2} 50%, ${gradient_color_1} 100%);
                            background-size: 200% 100%;
                        ` : ''}
                    }
                    .mgz-button :global(button:hover) {
                        transition: all .2s ease-in-out;
                        ${button_hover_background_color ? `background-color: ${button_hover_background_color} !important;` : ''}
                        ${button_hover_border_color ? `border-color: ${button_hover_border_color} !important;` : ''}
                        ${button_style === '3d' && box_shadow_color ? `box-shadow: 0px 1px 2px 0px ${box_shadow_color};` : ''}
                        ${button_style === 'gradient' && (gradient_color_1 || gradient_color_2) ? `
                            background-image: linear-gradient(to right, ${gradient_color_1} 0, ${gradient_color_2} 50%, ${gradient_color_1} 100%);
                            background-position: 100% 0;
                        ` : ''}
                    }
                `}
            </style>
            {/* eslint-enable */}
        </div>
    );
};

export default MagezonButton;
