'use client';
import {ShippingAddress} from "@/types";
import {useRouter} from "next/navigation";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {shippingAddressSchema} from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShippingAddressDefaultValue} from "@/lib/constants";
import {useTransition} from "react";
import {Input} from "@/components/ui/input";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {ArrowRight, Loader} from "lucide-react";
import {updateUserAddress} from "@/lib/actions/user.actions";
import {toast} from "sonner";

const ShippingAddressForm = ({address}: { address: ShippingAddress }) => {

    const router = useRouter();
    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || ShippingAddressDefaultValue
    });

    const [isPending, startTransition] = useTransition()

    const onsubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (value) => {
        startTransition(async () => {
            const res = await updateUserAddress(value);

            if (!res.success) {
                toast(res.message, {
                    position: "top-center",
                });
                return;
            }

            router.push('/payment-method');

        })
    }
    return (
        <>
            <div className={'max-w-md mx-auto space-y-4 select-none'}>
                <h1 className={'h2-bold mt-4'}>Shipping Address</h1>
                <p className={'text-sm text-muted-foreground'}>
                    Please enter and address to ship to
                </p>
                <form method="POST" className={'space-y-4'} onSubmit={form.handleSubmit(onsubmit)}>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="fullName"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="w-full" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                                    <Input {...field} id="fullName"
                                           className={'w-full'} aria-invalid={fieldState.invalid}
                                           placeholder="Enter full name"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="streetAddress"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="w-full" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="streetAddress">Address</FieldLabel>
                                    <Input {...field} id="streetAddress"
                                           aria-invalid={fieldState.invalid} placeholder="Enter address"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="city"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="w-full" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="city">City</FieldLabel>
                                    <Input {...field} id="city"
                                           aria-invalid={fieldState.invalid} placeholder="Enter city"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="postalCode"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="w-full" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
                                    <Input {...field} id="postalCode"
                                           aria-invalid={fieldState.invalid} placeholder="Enter postal code"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                    <div className={'flex flex-col  md:flex-row gap-5'}>
                        <Controller
                            name="country"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field className="w-full" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="country">Country</FieldLabel>
                                    <Input {...field} id="country"
                                           aria-invalid={fieldState.invalid} placeholder="Enter country"/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
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
    );
};

export default ShippingAddressForm;