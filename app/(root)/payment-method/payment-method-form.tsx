'use client';
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {paymentMethodSchema} from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";
import {DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS} from "@/lib/constants";
import {useTransition} from "react";
import {Button} from "@/components/ui/button";
import {ArrowRight, Loader} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {updateUserPaymentMethod} from "@/lib/actions/user.actions";
import {toast} from "sonner";

const PaymentMethodForm = ({preferredPaymentMethod}: {
    preferredPaymentMethod: string | null,
}) => {

    const router = useRouter();
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD
        }
    });

    const [isPending, startTransition] = useTransition();

    const onsubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
        startTransition(async () => {
            const res = await updateUserPaymentMethod(values);
            if (!res.success) {
                toast(res.message, {
                    position: "top-center",
                });
                return;
            }

            router.push('/place-order');
        });
    }

    return (
        <>
            <div className={'max-w-md mx-auto space-y-4 select-none'}>
                <h1 className={'h2-bold mt-4'}>Payment Method</h1>
                <p className={'text-sm text-muted-foreground'}>
                    Please select a payment method
                </p>
                <form method="POST" className={'space-y-4'} onSubmit={form.handleSubmit(onsubmit)}>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="type"
                            control={form.control}
                            render={({field}) => (
                                <RadioGroup onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                >
                                    {PAYMENT_METHODS.map((paymentMethod) => (
                                        <div key={paymentMethod} className="flex items-center space-x-3">
                                            <RadioGroupItem
                                                value={paymentMethod} id={paymentMethod}/>
                                            <Label htmlFor={paymentMethod}>{paymentMethod}</Label>
                                        </div>
                                    ))}

                                </RadioGroup>
                            )}
                        />

                    </div>
                    <div className={'flex gap-2'}>
                        <Button disabled={isPending} type={'submit'}>
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin"/>
                            ) : (
                                <ArrowRight className="w-4 h-4 "/>
                            )}{' '} Continue
                        </Button>
                    </div>


                </form>
            </div>
        </>

    )
};

export default PaymentMethodForm;