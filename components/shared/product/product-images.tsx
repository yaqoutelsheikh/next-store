'use client';
import Image from "next/image";
import {useState} from "react";
import {cn} from "@/lib/utils";

const ProductImages = ({images}: { images: string[] }) => {
    const [current, setCurren] = useState(0);
    return <div className={'space-y-4'}>
        <Image src={images[current]} alt="product image" width={1000} height={1000}
               className={'object-cover object-center min-h-[300px]'}/>
        <div className="flex">
            {images.map((image, index) => (
                <div
                    key={index}
                    onClick={() => setCurren(index)}
                    className={cn(
                        'relative mr-2 cursor-pointer overflow-hidden rounded-md border transition-all duration-300',
                        // الحالة العادية: حدود شفافة قليلاً أو لون الحدود الافتراضي
                        'border-border hover:border-primary/50',
                        // حالة الاختيار: استخدام اللون الأساسي (البنفسجي/الأزرق) مع توهج بسيط
                        current === index && 'border-primary ring-2 ring-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    )}
                >
                    <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={'product image'}
                        className={cn(
                            'object-cover transition-transform duration-300',
                            current === index ? 'scale-105' : 'opacity-80 hover:opacity-100'
                        )}
                    />
                </div>
            ))}
        </div>
    </div>
}
export default ProductImages;