import Typography from '@components/Typography';
import moment from 'moment';
import Link from 'next/link';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';

const ItemOrder = ({ status_label, order_number, detail }) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <div className={styles.contentItem}>
                <Typography variant="p" type="bold">
                    {status_label}
                </Typography>
                <Link href="/order/detail/[id]" as={`/order/detail/${order_number}`}>
                    <a>
                        <Typography variant="title" type="regular">
                            #
                            {order_number}
                        </Typography>
                    </a>
                </Link>
                <div className={styles.detailItem}>
                    <div className="column">
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            Date
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            No of Items
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            Total
                        </Typography>
                    </div>
                    <div className={styles.detailContent}>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            {moment().format('DD/M/YYYY')}
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            { detail[0].items.length }
                        </Typography>
                        <Typography variant="span" letter="capitalize" className="clear-margin-padding">
                            { formatPrice(detail[0].grand_total, detail[0].global_currency_code) }
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;
