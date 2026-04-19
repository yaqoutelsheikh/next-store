import {getLatestProducts} from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";

export default async  function Home() {
  const data = await getLatestProducts();
  return <>
    <ProductList data={data} title="Newest Arrivals" limit={4}/>
  </>;
}
