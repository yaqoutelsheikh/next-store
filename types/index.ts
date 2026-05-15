import {
    cartItemSchema,
    insertCartSchema,
    insertOrderItemSchema,
    insertOrderSchema,
    InsertProductSchema,
    insertReviewSchema,
    paymentResultSchema,
    shippingAddressSchema
} from "@/lib/validators";
import z from "zod";

export type Product = z.infer<typeof InsertProductSchema> & {
    id: string;
    rating: number;
    createdAt: Date;
};
export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
    id: string;
    createdAt: Date;
    isPaid: boolean;
    paidAt: Date | null;
    isDelivered: boolean;
    deliveredAt: Date | null;
    orderitems: OrderItem[];
    user: { name: string; email: string };
    paymentResult: PaymentResult;
};
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type Review = z.infer<typeof insertReviewSchema> & {
    id: string;
    createdAt: Date;
    user?: { name: string };
};