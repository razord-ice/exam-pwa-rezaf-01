import Typography from '@common_typography';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import cx from 'classnames';

const MagezonHeading = (props) => {
    const {
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        heading_type,
        text,
        link,
        font_weight,
        font_size,
        color,
        align,
    } = props;

    const style = {};
    if (color && color !== '') style.color = color;
    if (font_weight && font_weight !== '') style.fontWeight = font_weight;
    if (font_size && font_size !== '') style.fontSize = `${typeof font_size === 'number' ? `${font_size}px` : `${font_size.replace('px', '')}px`}`;
    if (align && align !== '') style.textAlign = align;

    return (
        <div
            className={cx('magezon-heading', {
                'max-sm:hidden': xs_hide,
                'max-md:hidden': sm_hide,
                'max-lg:hidden': md_hide,
                'max-xl:hidden': lg_hide,
            })}
        >
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Typography variant={heading_type || 'h2'} style={style}>
                        {text || ''}
                    </Typography>
                </MagezonLink>
            ) : (
                <Typography variant={heading_type || 'h2'} style={style}>
                    <span dangerouslySetInnerHTML={{ __html: text || '' }} />
                </Typography>
            )}
            <style jsx>
                {`
                    .magezon-heading {
                        width: 100%;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonHeading;
