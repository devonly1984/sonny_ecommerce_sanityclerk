import { searchProductsByName } from "@/sanity/lib/products/productQueries";

const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {
    const { query } = (await searchParams);
    const products = await searchProductsByName(query);
  return <div>{query}</div>;
};
export default SearchPage;
