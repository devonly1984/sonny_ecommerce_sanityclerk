import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type=='product'] | order(name asc) `);

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });
    return products.data || [];
  } catch (error) {
    console.log("Error fetching all products", error);
    return [];
  }
};
export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[_type=='product' && name match $searchParam]|order(name asc)`);

  try {
    const product = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}`,
      },
    });
    return product ? product.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductBySlug = async (slug: string) => {
  const GET_PRODUCT_BY_SLUG = defineQuery(`
        *[_type=="product" && slug.current == $slug] | order(name asc)[0]`);

  try {
    const product = await sanityFetch({
      query: GET_PRODUCT_BY_SLUG,
      params: { slug },
    });
    return product.data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProductsByCategory = async (slug: string) => {
    const GET_PRODUCT_BY_CATEGORY = defineQuery(`
    *[_type=="product" && references(*[_type=='category' && slug.current == $slug]._id)] | order(name asc)
    `);
    try {
        const products = await sanityFetch({
          query: GET_PRODUCT_BY_CATEGORY,
          params: { slug },
        });
        return products.data || []
    } catch (error) {
        console.log(error);
        return [];
    }

};