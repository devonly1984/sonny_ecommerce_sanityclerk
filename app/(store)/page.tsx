import ProductsView from "@/components/product/ProductsView";
import { getAllCategories } from "@/sanity/lib/queries/categoryQueries";
import { getAllProducts } from "@/sanity/lib/queries/productQueries";

const Home = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories()
  return (
    <div>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};
export default Home;
