import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import Link from "next/link"

type ProductsProp = {
    products: any[]
}

const ProductPage = ({ products }: ProductsProp) => {
    if (!products) return null;
    return (
        <div>
            {
                products.map((item) => (
                    <div key={item.id}>
                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </div>
                ))
            }
        </div>


    )
}
export const getStaticProps: GetStaticProps<ProductsProp> = async (context: GetStaticPropsContext) => {
    const data = await (await fetch(`http://localhost:3001/products`)).json();
    console.log("data", data);
    if (!data) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            products: data
        },
    }
}
export default ProductPage