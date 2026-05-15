import type {Metadata} from 'next';
import {getOrderById} from "@/lib/actions/order.action";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
    title: 'Order Details',
}
const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
    const {id} = await props.params;
    const order = await getOrderById(id);
    if (!order) notFound();
    return (
        <div className={''}>Details {JSON.stringify(order, null, 2)}</div>
    );
};

export default OrderDetailsPage;