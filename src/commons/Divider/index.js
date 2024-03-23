import cx from 'classnames';

const Divider = ({
    height,
    width = '100%',
    color = 'bg-neutral-500',
    className,
    orientation = 'horizontal',
}) => (
    <div
        style={{
            ...(height ? { height } : null),
            ...(width ? { width } : null),
        }}
        className={cx(
            orientation === 'horizontal' ? 'h-[1px] w-[100%]' : 'h-[100%] w-[1px]',
            color,
            className,
        )}
    />
);

export default Divider;
