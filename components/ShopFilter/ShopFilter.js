"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

import { ChevronDown } from "lucide-react";

import ProductCard from "../../utils/ProductCard/ProductCard";
import "./ShopFilter.css";

/* PRODUCTS */
const availableProducts = [
  {
    id: 1,
    brand: "Tense Jeans",
    name: "Relaxed Wide-Leg Denim",
    rating: 4.9,
    reviewCount: 1345,
    oldPrice: "Rs 7,490",
    newPrice: "Rs 5,490",
    image: "/assets/images/chair1.png",
    badge: "50% OFF",
    badgeType: "discount",
    discountPercent: 50,
    discountTag: "Best value",
    category: "Jeans",
    color: "Blue",
    size: "M",
    gender: "Men",
    price: 5490,
  },
  {
    id: 2,
    brand: "Avenue Denim",
    name: "High Rise Straight Fit",
    rating: 4.8,
    reviewCount: 920,
    oldPrice: "Rs 7,990",
    newPrice: "Rs 5,390",
    image: "/assets/images/chair2.png",
    badge: "HOT",
    badgeType: "hot",
    discountPercent: 32,
    discountTag: "Trending",
    category: "Jeans",
    color: "Black",
    size: "L",
    gender: "Women",
    price: 5390,
  },
  {
    id: 3,
    brand: "Cobalt Street",
    name: "Slim Cargo Denim",
    rating: 4.6,
    reviewCount: 730,
    oldPrice: "Rs 8,490",
    newPrice: "Rs 5,990",
    image: "/assets/images/chair3.png",
    badge: "HOT",
    badgeType: "hot",
    discountPercent: 29,
    discountTag: "Popular",
    category: "Jeans",
    color: "Light Blue",
    size: "S",
    gender: "Men",
    price: 5990,
  },
  {
    id: 4,
    brand: "Urban Loop",
    name: "Comfort Stretch Denim",
    rating: 4.7,
    reviewCount: 684,
    oldPrice: "Rs 8,200",
    newPrice: "Rs 5,790",
    image: "/assets/images/chair4.png",
    badge: "NEW",
    badgeType: "hot",
    discountPercent: 29,
    discountTag: "Best seller",
    category: "Jeans",
    color: "Denim",
    size: "XL",
    gender: "Women",
    price: 5790,
    newArrival: "Last 30 days",
  },
  {
    id: 5,
    brand: "Denim Edge",
    name: "Vintage Flare Jeans",
    rating: 4.5,
    reviewCount: 561,
    oldPrice: "Rs 8,900",
    newPrice: "Rs 6,190",
    image: "/assets/images/chair5.png",
    badge: "45% OFF",
    badgeType: "discount",
    discountPercent: 30,
    discountTag: "Limited",
    category: "Jeans",
    color: "Mid Blue",
    size: "M",
    gender: "Women",
    price: 6190,
    newArrival: "Last 90 days",
  },
];

/* FILTER OPTIONS */
const filterOptions = {
  genders: ["Men", "Women", "Boys", "Girls"],

  categories: ["Trousers", "Jeans", "Track Pants", "Lounge Pants"],

  brands: [
    "KOTTY",
    "Levi's",
    "Roadster",
    "Highlander",
    "Avenue Denim",
    "Denim Edge",
  ],

  reviews: [4, 3, 2, 1],

  discounts: ["10% or more", "25% or more", "35% or more", "50% or more"],

  colours: [
    { label: "Black", value: "#222222" },
    { label: "Blue", value: "#2F6BCE" },
    { label: "Grey", value: "#8B8B8B" },
    { label: "White", value: "#F5F5F5" },
    { label: "Beige", value: "#E4D1B9" },
    { label: "Brown", value: "#7A4B2A" },
  ],

  waistSizes: ["22", "24", "26", "28", "30", "32", "34", "36", "38", "40"],

  womensSizes: ["2XL", "3XL", "4XL", "5XL", "6XL"],

  mensSizes: [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "8XL",
  ],
};

/* SORT OPTIONS */
const sortOptions = [
  "Featured",
  "What’s New?",
  "Popularity",
  "Better Discount",
  "Price: High to Low",
  "Price: Low to High",
  "Customer Rating",
];

const ShopFilter = () => {
  /* FILTER STATES */
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [selectedReviews, setSelectedReviews] = useState([]);

  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const [selectedColour, setSelectedColour] = useState(null);

  const [selectedWaistSize, setSelectedWaistSize] = useState(null);

  const [selectedGeneralSize, setSelectedGeneralSize] = useState(null);

  const [selectedGender, setSelectedGender] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [priceRange, setPriceRange] = useState({ min: 195, max: 10100 });

  /* SORT STATES */
  const [selectedSort, setSelectedSort] = useState("Featured");

  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* TOGGLE OPTION */
  const toggleOption = (option, selected, setSelected) => {
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  /* CLEAR FILTERS */
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedReviews([]);
    setSelectedDiscounts([]);
    setSelectedColour(null);
    setSelectedWaistSize(null);
    setSelectedGeneralSize(null);
    setSelectedGender(null);
    setSelectedCategory(null);
    setPriceRange({ min: 195, max: 10100 });
  };

  /* FILTER + SORT */
  const filteredProducts = useMemo(() => {
    let products = availableProducts.filter((product) => {
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      if (
        selectedReviews.length > 0 &&
        !selectedReviews.some((rating) => product.rating >= rating)
      ) {
        return false;
      }

      if (selectedColour && product.color !== selectedColour) {
        return false;
      }

      if (selectedWaistSize && product.size !== selectedWaistSize) {
        return false;
      }

      if (selectedGeneralSize && product.size !== selectedGeneralSize) {
        return false;
      }

      if (selectedGender && product.gender !== selectedGender) {
        return false;
      }

      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (selectedDiscounts.length > 0) {
        if (
          !selectedDiscounts.some((option) => {
            const percent = Number(option.replace("% or more", "").trim());

            return product.discountPercent >= percent;
          })
        ) {
          return false;
        }
      }

      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }

      return true;
    });

    /* SORTING */
    switch (selectedSort) {
      case "Price: Low to High":
        products.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        products.sort((a, b) => b.price - a.price);
        break;

      case "Customer Rating":
        products.sort((a, b) => b.rating - a.rating);
        break;

      case "Popularity":
        products.sort((a, b) => b.reviewCount - a.reviewCount);
        break;

      case "Better Discount":
        products.sort((a, b) => b.discountPercent - a.discountPercent);
        break;

      default:
        break;
    }

    return products;
  }, [
    selectedBrands,
    selectedReviews,
    selectedDiscounts,
    selectedColour,
    selectedWaistSize,
    selectedGeneralSize,
    selectedGender,
    selectedCategory,
    priceRange,
    selectedSort,
  ]);

  return (
    <div className="shopFilterPage">
      <div className="shopContainer">
        {/* HEADER */}
        <div className="shopHeader">
          <div>
            <p className="pageSubtitle Poppins-regular">
              Search results for “jeans”
            </p>
          </div>

          {/* SHOP ACTIONS */}
          <div className="shopActions">
            <span className="resultsCount Poppins-medium">
              {filteredProducts.length} Products
            </span>

            {/* SORT */}
            <div className="sortWrapper" ref={dropdownRef}>
              <button
                className="sortButton Poppins-medium"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                Sort by: {selectedSort}
                <ChevronDown
                  size={18}
                  className={openDropdown ? "rotateArrow" : ""}
                />
              </button>

              {openDropdown && (
                <div className="sortDropdown">
                  {sortOptions.map((option) => (
                    <p
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setOpenDropdown(false);
                      }}
                      className={selectedSort === option ? "activeSort" : ""}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="shopGrid">
          {/* SIDEBAR */}
          <aside className="shopSidebar">
            <div className="sidebarCard">
              {/* FILTER HEADER */}
              <div className="sidebarSectionHeader">
                <h3 className="Poppins-bold">Filters</h3>

                <button
                  className="clearButton"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>

              {/* GENDER */}
              <div className="filterSection">
                <h4 className="sectionTitle Poppins-semi-bold">Gender</h4>

                <div className="filterList">
                  {filterOptions.genders.map((item) => (
                    <label key={item} className="radioItem">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === item}
                        onChange={() => setSelectedGender(item)}
                      />

                      <span className="Poppins-regular">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CATEGORY */}
              <div className="filterSection">
                <h4 className="sectionTitle">Categories</h4>

                <div className="filterList">
                  {filterOptions.categories.map((item) => (
                    <label key={item} className="checkboxItem">
                      <input
                        type="checkbox"
                        checked={selectedCategory === item}
                        onChange={() =>
                          setSelectedCategory(
                            selectedCategory === item ? null : item,
                          )
                        }
                      />

                      <span className="Poppins-regular">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BRAND */}
              <div className="filterSection">
                <h4 className="sectionTitle">Brand</h4>

                <div className="filterList">
                  {filterOptions.brands.map((item) => (
                    <label key={item} className="checkboxItem">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(item)}
                        onChange={() =>
                          toggleOption(item, selectedBrands, setSelectedBrands)
                        }
                      />

                      <span className="Poppins-regular">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              {/* PRICE */}
              <div className="filterSection">
                <h4 className="sectionTitle">Price</h4>

                <div className="priceRange">
                  <div className="priceTop">
                    <span className="Poppins-regular">
                      ₹{priceRange.min.toLocaleString()}
                    </span>
                    <span className="Poppins-regular">
                      ₹{priceRange.max.toLocaleString()}
                      {priceRange.max === 10100 ? "+" : ""}
                    </span>
                  </div>

                  <div className="dualSliderWrapper">
                    <div
                      className="sliderTrackFill"
                      style={{
                        left: `${((priceRange.min - 195) / (10100 - 195)) * 100}%`,
                        right: `${100 - ((priceRange.max - 195) / (10100 - 195)) * 100}%`,
                      }}
                    />
                    <input
                      type="range"
                      min="195"
                      max="10100"
                      value={priceRange.min}
                      onChange={(e) => {
                        const val = Math.min(
                          Number(e.target.value),
                          priceRange.max - 100,
                        );
                        setPriceRange((prev) => ({ ...prev, min: val }));
                      }}
                      className="priceSlider priceSliderMin"
                    />
                    <input
                      type="range"
                      min="195"
                      max="10100"
                      value={priceRange.max}
                      onChange={(e) => {
                        const val = Math.max(
                          Number(e.target.value),
                          priceRange.min + 100,
                        );
                        setPriceRange((prev) => ({ ...prev, max: val }));
                      }}
                      className="priceSlider priceSliderMax"
                    />
                  </div>
                </div>
              </div>

              {/* REVIEWS */}
              <div className="filterSection">
                <h4 className="sectionTitle">Customer Reviews</h4>

                <div className="filterList">
                  {filterOptions.reviews.map((rating) => (
                    <label key={rating} className="checkboxItem">
                      <input
                        type="checkbox"
                        checked={selectedReviews.includes(rating)}
                        onChange={() =>
                          toggleOption(
                            rating,
                            selectedReviews,
                            setSelectedReviews,
                          )
                        }
                      />

                      <span className="Poppins-regular">
                        ⭐ {rating} stars & up
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DISCOUNT */}
              <div className="filterSection">
                <h4 className="sectionTitle">Discount Range</h4>

                <div className="filterList">
                  {filterOptions.discounts.map((option) => (
                    <label key={option} className="checkboxItem">
                      <input
                        type="checkbox"
                        checked={selectedDiscounts.includes(option)}
                        onChange={() =>
                          toggleOption(
                            option,
                            selectedDiscounts,
                            setSelectedDiscounts,
                          )
                        }
                      />

                      <span className="Poppins-regular">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* COLOUR */}
              <div className="filterSection">
                <h4 className="sectionTitle">Colour</h4>

                <div className="colourRow">
                  {filterOptions.colours.map((colour) => (
                    <button
                      key={colour.label}
                      type="button"
                      className={`colourChip ${
                        selectedColour === colour.label ? "activeColour" : ""
                      }`}
                      onClick={() =>
                        setSelectedColour(
                          selectedColour === colour.label ? null : colour.label,
                        )
                      }
                      style={{
                        backgroundColor: colour.value,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* WAIST SIZE */}
              <div className="filterSection">
                <h4 className="sectionTitle">Waist Size</h4>

                <div className="sizeGrid">
                  {filterOptions.waistSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`sizeButton ${
                        selectedWaistSize === size ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedWaistSize(
                          selectedWaistSize === size ? null : size,
                        )
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* WOMENS SIZE */}
              <div className="filterSection">
                <h4 className="sectionTitle">Women&#39;s General Size</h4>

                <div className="sizeGrid">
                  {filterOptions.womensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`sizeButton ${
                        selectedGeneralSize === size ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedGeneralSize(
                          selectedGeneralSize === size ? null : size,
                        )
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* MENS SIZE */}
              <div className="filterSection">
                <h4 className="sectionTitle">Men&#39;s General Size</h4>

                <div className="sizeGrid">
                  {filterOptions.mensSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`sizeButton ${
                        selectedGeneralSize === size ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedGeneralSize(
                          selectedGeneralSize === size ? null : size,
                        )
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="shopResults">
            <div className="productsGrid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
