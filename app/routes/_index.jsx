import { useLoaderData } from "@remix-run/react";
import { getProducts } from "../models/product";
import { useState } from "react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let result = await getProducts();
  let products = Array.from(result).map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return products;
}

export default function Index() {
  let products = useLoaderData();
  console.log({ products });

  // let [samsungFilter, setSamsungFilter] = useState("");
  // let [sonyFilter, setSonyFilter] = useState("");
  // let [asusFilter, setAsusFilter] = useState("");
  // let [appleFilter, setAppleFilter] = useState("");
  // let [lgFilter, setLgFilter] = useState("");
  // let [oraimoFilter, setOraimoFilter] = useState("");

  let [filterArray, setFilterArray] = useState("");
  console.log({ filterArray });

  let filters = ["samsung", "sony", "asus", "apple", "lg", "oraimo"];

  let filteredProducts = products.filter((item) =>
    filterArray.includes(item.model.toLowerCase())
  );
  console.log({ filteredProducts });
  return (
    <main>
      <div className="mt-6 w-full flex">
        <div className="w-80 bg-gray-300 text-gray-700 h-screen px-3">
          {/* filter */}
          <h2 className="mt-4 ">Filter by:</h2>
          <ul className="flex flex-col gap-3 mt-5">
            {filters.map((filter, index) => (
              <Filter
                key={index}
                title={filter}
                name="brand"
                value={filter}
                filterArray={filterArray}
                setFilterArray={setFilterArray}
              />
              // {selectedFilter}
            ))}
          </ul>
        </div>
        {/* products */}
        <div className="w-full text-gray-300 lg:mx-11">
          <h1 className=" text-4xl font-semibold">products</h1>
          <ul className="grid grid-cols-2 lg:grid-cols-3  gap-4 mt-8">
            {filterArray.length > 0
              ? filteredProducts.map((item) => (
                  <li key={item._id}>
                    <Product product={item} />
                  </li>
                ))
              : products.map((item) => (
                  <li key={item._id}>
                    <Product product={item} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

// filter component
function Filter({ title, value, name, filterArray, setFilterArray }) {
  return (
    <li>
      <label htmlFor="" className="flex gap-2">
        {" "}
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={() => {
            if (filterArray.includes(value)) {
              let index = filterArray.indexOf(value);
              filterArray.splice(index, 1);
              setFilterArray([...filterArray]);
            } else {
              setFilterArray([...filterArray, value]);
            }
          }}
        />
        {title}
      </label>
    </li>
  );
  2;
}

// product component
function Product({ product }) {
  return (
    <article className="shadow-xl shadow-black ">
      <img
        src={product.image}
        alt={`image of the ${product.title}`}
        className="h-96 w-full object-cover border-transparent rounded-md"
      />
      <div className="flex gap-4 items-center mt-5">
        <h2>{product.title}</h2>
        <p>{product.model}</p>
      </div>
      <p className="mt-4 font-semibold text-orange-600">Ksh {product.price}</p>
    </article>
  );
}
