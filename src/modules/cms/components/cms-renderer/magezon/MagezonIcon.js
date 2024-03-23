import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import classnames from 'classnames';

const MagezonIcon = (props) => {
    // prettier-ignore
    const {
        link_url, icon_size, icon, align, el_class, el_inner_class,
        icon_background_color, icon_border_color, icon_border_radius,
        icon_border_style, icon_border_width, icon_color,
        icon_hover_background_color, icon_hover_border_color, icon_hover_color,
        link_target,
    } = props;
    const classIcon = 'magezon-icon ';
    const sizeClasses = `magezon-icon-size-${icon_size} `;
    let customUrl = '';
    let iconRes = '';
    if (icon.includes('fab') === true) iconRes += icon.replace('fab mgz-', 'fab ');
    if (icon.includes('fas') === true) iconRes += icon.replace('fas mgz-', 'fas ');
    if (icon.includes('mgz-oi') === true) iconRes += icon.replace('mgz-oi mgz-', 'oi ');
    if (icon.includes('far mgz') === true) iconRes += icon.replace('far mgz-', 'fa ');
    if (link_url) customUrl = link_url;

    return (
        <div className={classnames(classIcon, sizeClasses, el_class)}>
            {/* <div className="wrapperIcon"> */}
            <MagezonLink link={customUrl} link_target={link_target}>
                <div className={classnames('magezon-icon-inner flex justify-center items-center', el_inner_class)}>
                    <i className={iconRes} />
                </div>
            </MagezonLink>
            {/* </div> */}
            <style jsx>
                {`
                    .magezon-icon :global(i) {
                        // color: ${icon_color || 'var(--color-pwa-font_color)'};
                        color: #fff;
                    }
                    .magezon-icon :global(.magezon-icon-inner) {
                        position: relative;
                        background-color: ${icon_background_color || 'transparent'};
                        border-width: ${icon_border_width || 0};
                        border-radius: ${icon_border_radius || 0};
                        border-color: ${icon_border_color || '#000000'};
                        border-style: ${icon_border_style};
                    }
                    .magezon-icon :global(.magezon-icon-inner:hover) {
                        background-color: ${icon_hover_background_color};
                        border-color: ${icon_hover_border_color};
                    }
                    .magezon-icon :global(.magezon-icon-inner:hover i) {
                        color: ${icon_hover_color};
                    }
                    .magezon-icon-size-xs :global(.magezon-icon-inner) {
                        width: 1.5em;
                        height: 1.5em;
                    }
                    .magezon-icon-size-xs :global(i) {
                        font-size: 1.2em;
                    }
                    .magezon-icon-size-sm :global(.magezon-icon-inner) {
                        width: 3.15em;
                        height: 3.15em;
                    }
                    .magezon-icon-size-sm :global(i) {
                        font-size: 1.6em;
                    }
                    .magezon-icon-size-md :global(.magezon-icon-inner) {
                        width: 4em;
                        height: 4em;
                    }
                    .magezon-icon-size-md :global(i) {
                        font-size: 1.5rem;
                    }
                    .magezon-icon-size-lg :global(.magezon-icon-inner) {
                        width: 5em;
                        height: 5em;
                    }
                    .magezon-icon-size-lg :global(i) {
                        font-size: 2.85em;
                    }
                    .magezon-icon-size-xl :global(.magezon-icon-inner) {
                        width: 7.15em;
                        height: 7.15em;
                    }
                    .magezon-icon-size-xl :global(i) {
                        font-size: 5em;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .wrapperIcon {
                        display: flex;
                        justify-content: ${align};
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonIcon;
