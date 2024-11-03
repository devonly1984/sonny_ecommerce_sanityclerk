import { Category, Product } from "@/sanity.types";
import ProductsGrid from "./ProductsGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[]
}
const ProductsView = ({ products, categories }: ProductsViewProps) => {
  console.log(categories);
  return (
    <div>
      {/**categories */}
      <div className="flex flex-col">
        <div className="w-full sm:w-[200px]"></div>
      </div>
      <div className="flex-1">
        <div className="">
          <ProductsGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};
export default ProductsView;
