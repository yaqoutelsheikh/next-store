'use client';
import {Cart, CartItem} from "@/types";
import {Button} from "@/components/ui/button";
import {addToCart, removeItemFromCart} from "@/lib/actions/cart.actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Loader, Minus, Plus} from "lucide-react";
import {useTransition} from "react";

function AddToCart({cart, item}: { cart?: Cart, item: CartItem }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handleAddToCart = async () => {
        startTransition(async () => {

            const res = await addToCart(item);
            if (!res.success) {
                toast.error('', {
                    position: "top-center",
                    description: res.message,
                });
                return;
            }
            toast(res.message, {
                position: "top-center",
                action: (
                    <Button
                        onClick={() => router.push('/cart')}
                        className=" bg-primary-gradient text-white hover:bg-gray-800  "
                    >
                        Go to Cart

                    </Button>
                ),
            });
        });
    }

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);
            res.success ?
                toast(res.message, {
                    position: "top-center",
                }) :
                toast(res.message, {
                    position: "top-center",
                });

        });
    }
    // Check if item is in cart

    const existItem = cart && cart.items.find((it) => it.productId === item.productId);

    return existItem ? (
            <div>
                <Button type={'button'} variant="outline" onClick={handleRemoveFromCart}>
                    {isPending ? (
                        <Loader className="w-4 h-4 animate-spin"/>
                    ) : (
                        <Minus className="w-4 h-4"/>
                    )}
                </Button>
                <span className="px-2">{existItem.qty}</span>
                <Button type={'button'} variant="outline" onClick={handleAddToCart}>
                    {isPending ? (
                        <Loader className="w-4 h-4 animate-spin"/>
                    ) : (
                        <Plus className="w-4 h-4"/>
                    )}
                </Button>
            </div>
        ) :
        (<Button className="w-full   " type={'button'} onClick={handleAddToCart}>
            {isPending ? (
                <Loader className="w-4 h-4 animate-spin"/>
            ) : (
                <Plus className="w-4 h-4"/>
            )} Add To Cart</Button>)
}

export default AddToCart;