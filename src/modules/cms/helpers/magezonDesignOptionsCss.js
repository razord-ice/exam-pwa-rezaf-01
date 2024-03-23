/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { BREAKPOINTS } from '@core/theme/vars';
import css from 'styled-jsx/css';

const generateDesignOptions = (classSelector, designOptions) => {
    const {
        margin_top,
        margin_right,
        margin_bottom,
        margin_left,
        padding_top,
        padding_right,
        padding_bottom,
        padding_left,
        border_top_left_radius,
        border_top_right_radius,
        border_bottom_left_radius,
        border_bottom_right_radius,
        border_style,
        border_top_width,
        border_right_width,
        border_left_width,
        border_bottom_width,
        background_position,
        background_color,
        device_type,
        type,
        ...otherDeviceSizeDesignOpts
    } = designOptions;
    const prefixes = ['lg', 'md', 'sm', 'xs'];

    /**
     * @param {*} value
     * @param {*} defaultValue
     * @returns returns defaultValue if given values if of empty string or NaN
     */
    const returnDefaultIfNan = (value, defaultValue = 0) => {
        const removePx = value ? value.replace('px', '') : '';
        if (Number.isNaN(Number(removePx)) || removePx === '') {
            return defaultValue;
        }
        return removePx;
    };

    const generateOtherDesignOptions = (opts) => {
        const mappedValues = {};
        prefixes.forEach((prefix) => {
            const filteredOpts = Object.keys(opts).filter((k) => k.indexOf(prefix) !== -1);
            Object.assign(mappedValues, { [prefix]: filteredOpts });
        });
        return mappedValues;
    };

    const generateStyles = () => {
        const generatedStyles = {};
        if (device_type === 'custom') {
            const opts = generateOtherDesignOptions(otherDeviceSizeDesignOpts);
            Object.keys(opts).forEach((screenOpt) => {
                const tempObj = {};
                let tempMappedValues = '';

                opts[screenOpt].forEach((_opt) => {
                    if (_opt.indexOf('padding_left') !== -1) {
                        tempMappedValues += `padding-left: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], 10)}px;`;
                    }
                    if (_opt.indexOf('padding_right') !== -1) {
                        tempMappedValues += `padding-right: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], 10)}px;`;
                    }
                    if (_opt.indexOf('padding_top') !== -1) {
                        tempMappedValues += `padding-top: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], 10)}px;`;
                    }
                    if (_opt.indexOf('padding_bottom') !== -1) {
                        tempMappedValues += `padding-bottom: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], 10)}px;`;
                    }

                    if (_opt.indexOf('margin_left') !== -1) {
                        tempMappedValues += `margin-left: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], -10)}px;`;
                    }
                    if (_opt.indexOf('margin_right') !== -1) {
                        tempMappedValues += `margin-right: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt], -10)}px;`;
                    }
                    if (_opt.indexOf('margin_top') !== -1) {
                        tempMappedValues += `margin-top: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt])}px;`;
                    }
                    if (_opt.indexOf('margin_bottom') !== -1) {
                        tempMappedValues += `margin-bottom: ${returnDefaultIfNan(otherDeviceSizeDesignOpts[_opt])}px;`;
                    }
                });

                tempObj[screenOpt] = tempMappedValues;
                Object.assign(generatedStyles, tempObj);
            });
        }

        return generatedStyles;
    };

    // prettier-ignore
    if (type === 'column') {
        return css.resolve`
            .mgz-column :global(.mgz-element-inner) {
                ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                    margin: ${returnDefaultIfNan(margin_top)}px ${returnDefaultIfNan(margin_right)}px ${returnDefaultIfNan(margin_bottom)}px ${returnDefaultIfNan(margin_left)}px;
                ` : ''}
                ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                    padding: ${returnDefaultIfNan(padding_top, 10)}px ${returnDefaultIfNan(padding_right, 0)}px ${returnDefaultIfNan(padding_bottom, 10)}px ${returnDefaultIfNan(padding_left, 0)}px;
                ` : 'padding: 10px;'}
                ${border_top_left_radius ? `border-top-left-radius: ${returnDefaultIfNan(border_top_left_radius)}px;` : ''}
                ${border_top_right_radius ? `border-top-right-radius: ${returnDefaultIfNan(border_top_right_radius)}px;` : ''}
                ${border_bottom_left_radius ? `border-bottom-left-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
                ${border_bottom_right_radius ? `border-bottom-right-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
                ${border_style ? `border-style: ${border_style};` : ''}
                ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
                ${border_top_width ? `border-top-width: ${returnDefaultIfNan(border_top_width)}px;` : ''}
                ${border_right_width ? `border-right-width: ${returnDefaultIfNan(border_right_width)}px;` : ''}
                ${border_bottom_width ? `border-bottom-width: ${returnDefaultIfNan(border_bottom_width)}px;` : ''}
                ${border_left_width ? `border-left-width: ${returnDefaultIfNan(border_left_width)}px;` : ''}
                ${background_color ? `background-color: ${background_color};` : ''}
            }

            @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.lg || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.md || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.sm || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
                .mgz-column :global(.mgz-element-inner) {
                    ${generateStyles()?.xs || ''}
                }
            }
        `;
    }
    if (type === 'row') {
        return css.resolve`
            .mgz-row {
                ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                    margin: ${returnDefaultIfNan(margin_top)}px ${returnDefaultIfNan(margin_right, 10)}px ${returnDefaultIfNan(margin_bottom)}px ${returnDefaultIfNan(margin_left, 10)}px;
                ` : 'margin: 0px;'}
                ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                    padding: ${returnDefaultIfNan(padding_top)}px ${returnDefaultIfNan(padding_right)}px ${returnDefaultIfNan(padding_bottom)}px ${returnDefaultIfNan(padding_left)}px;
                ` : ''}
                ${border_top_left_radius ? `border-top-left-radius: ${returnDefaultIfNan(border_top_left_radius)}px;` : ''}
                ${border_top_right_radius ? `border-top-right-radius: ${returnDefaultIfNan(border_top_right_radius)}px;` : ''}
                ${border_bottom_left_radius ? `border-bottom-left-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
                ${border_bottom_right_radius ? `border-bottom-right-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
                ${border_style ? `border-style: ${border_style};` : ''}
                ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
                ${border_top_width ? `border-top-width: ${returnDefaultIfNan(border_top_width)}px;` : ''}
                ${border_right_width ? `border-right-width: ${returnDefaultIfNan(border_right_width)}px;` : ''}
                ${border_bottom_width ? `border-bottom-width: ${returnDefaultIfNan(border_bottom_width)}px;` : ''}
                ${border_left_width ? `border-left-width: ${returnDefaultIfNan(border_left_width)}px;` : ''}
                ${background_color ? `background-color: ${background_color};` : ''}
            }

            @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
                .mgz-row {
                    ${generateStyles()?.lg || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                .mgz-row {
                    ${generateStyles()?.md || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
                .mgz-row {
                    ${generateStyles()?.sm || ''}
                }
            }
            @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
                .mgz-row {
                    ${generateStyles()?.xs || ''}
                }
            }
        `;
    }

    return css.resolve`
        .${classSelector} :global(> *) {
            overflow: hidden;
            ${(margin_top || margin_right || margin_bottom || margin_left) ? `
                margin: ${returnDefaultIfNan(margin_top)}px ${returnDefaultIfNan(margin_right)}px ${returnDefaultIfNan(margin_bottom)}px ${returnDefaultIfNan(margin_left)}px;
            ` : ''}
            ${(padding_top || padding_right || padding_bottom || padding_left) ? `
                padding: ${returnDefaultIfNan(padding_top)}px ${returnDefaultIfNan(padding_right)}px ${returnDefaultIfNan(padding_bottom)}px ${returnDefaultIfNan(padding_left)}px;
            ` : ''}
            ${border_top_left_radius ? `border-top-left-radius: ${returnDefaultIfNan(border_top_left_radius)}px;` : ''}
            ${border_top_right_radius ? `border-top-right-radius: ${returnDefaultIfNan(border_top_right_radius)}px;` : ''}
            ${border_bottom_left_radius ? `border-bottom-left-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
            ${border_bottom_right_radius ? `border-bottom-right-radius: ${returnDefaultIfNan(border_bottom_left_radius)}px;` : ''}
            ${border_style ? `border-style: ${border_style};` : ''}
            ${background_position ? `background-position: ${background_position?.split('-').join(' ')};` : ''}
            ${border_top_width ? `border-top-width: ${returnDefaultIfNan(border_top_width)}px;` : ''}
            ${border_right_width ? `border-right-width: ${returnDefaultIfNan(border_right_width)}px;` : ''}
            ${border_bottom_width ? `border-bottom-width: ${returnDefaultIfNan(border_bottom_width)}px;` : ''}
            ${border_left_width ? `border-left-width: ${returnDefaultIfNan(border_left_width)}px;` : ''}
            ${background_color ? `background-color: ${background_color};` : ''}
        }

        @media screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.lg || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.md || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.sm || ''}
            }
        }
        @media screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm}px) {
            .${classSelector} :global(> *) {
                ${generateStyles()?.xs || ''}
            }
        }
    `;
};

export default generateDesignOptions;
