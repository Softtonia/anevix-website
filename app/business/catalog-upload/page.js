'use client';
import React, { useState, useRef } from 'react';
import {
  CloudUploadOutlined,
  DescriptionOutlined,
  FileDownloadOutlined,
  CloseOutlined,
  AddBoxOutlined,
  LayersOutlined,
  AddPhotoAlternateOutlined,
  CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import './CatalogUpload.css';

export default function CatalogUploadPage() {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'bulk'

  // --- Bulk Upload State ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // --- Single Product State ---
  const [singleProduct, setSingleProduct] = useState({
    productType: 'simple', // 'simple' | 'variable' | 'external' | 'grouped'
    title: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    mrp: '',
    stock: '',
    description: '',
    // External Product fields
    externalUrl: '',
    buttonText: 'Buy Now',
    // Variable Product fields
    variations: [
      { attributeName: 'Size', attributeValue: 'M', sku: '', price: '', stock: '' },
    ],
    // Grouped Product fields (bundle of sub-products)
    groupedProducts: [
      { name: 'Included Item 1', sku: '', price: '', quantity: '1' },
    ],
    images: [],
  });
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [submittingProduct, setSubmittingProduct] = useState(false);

  // Bulk Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast.error('Please select an Excel (.xlsx, .xls) or CSV (.csv) file.');
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast.error('Please drop an Excel (.xlsx, .xls) or CSV (.csv) file.');
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a catalog file first.');
      return;
    }

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`Catalog "${selectedFile.name}" uploaded successfully! Products are being processed.`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const handleDownloadSample = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Title,SKU,Type,Category,Brand,Price,MRP,Stock,Description\nSample Leather Jacket,LJ-001,simple,Men Fashion,Anevix,2499,4999,50,Premium genuine leather jacket\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'anevix_catalog_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Sample template downloaded!');
  };

  // Single Product Handlers
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setSingleProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Variation handlers
  const handleAddVariation = () => {
    setSingleProduct((prev) => ({
      ...prev,
      variations: [
        ...prev.variations,
        { attributeName: 'Size', attributeValue: '', sku: '', price: '', stock: '' },
      ],
    }));
  };

  const handleRemoveVariation = (index) => {
    if (singleProduct.variations.length <= 1) {
      toast.error('At least one variation row is required for variable products.');
      return;
    }
    setSingleProduct((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  const handleVariationChange = (index, field, value) => {
    setSingleProduct((prev) => {
      const updated = [...prev.variations];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variations: updated };
    });
  };

  // Grouped Product handlers
  const handleAddGroupedProduct = () => {
    setSingleProduct((prev) => ({
      ...prev,
      groupedProducts: [
        ...prev.groupedProducts,
        { name: '', sku: '', price: '', quantity: '1' },
      ],
    }));
  };

  const handleRemoveGroupedProduct = (index) => {
    if (singleProduct.groupedProducts.length <= 1) {
      toast.error('At least one item is required in a grouped product bundle.');
      return;
    }
    setSingleProduct((prev) => ({
      ...prev,
      groupedProducts: prev.groupedProducts.filter((_, i) => i !== index),
    }));
  };

  const handleGroupedProductChange = (index, field, value) => {
    setSingleProduct((prev) => {
      const updated = [...prev.groupedProducts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, groupedProducts: updated };
    });
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    if (singleProduct.images.length >= 6) {
      toast.error('Maximum 6 product images allowed.');
      return;
    }
    setSingleProduct((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (index) => {
    setSingleProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSingleProductSubmit = (e) => {
    e.preventDefault();
    if (!singleProduct.title || !singleProduct.category) {
      toast.error('Please fill in required fields: Product Title and Category.');
      return;
    }

    if (singleProduct.productType === 'simple' && !singleProduct.price) {
      toast.error('Please enter the selling price for simple product.');
      return;
    }

    if (singleProduct.productType === 'external' && !singleProduct.externalUrl) {
      toast.error('Please provide the external affiliate or product URL.');
      return;
    }

    setSubmittingProduct(true);
    setTimeout(() => {
      setSubmittingProduct(false);
      const typeLabel =
        singleProduct.productType === 'variable'
          ? 'VARIABLE'
          : singleProduct.productType === 'external'
          ? 'EXTERNAL'
          : singleProduct.productType === 'grouped'
          ? 'GROUPED'
          : 'SIMPLE';
      toast.success(
        `Product "${singleProduct.title}" (${typeLabel}) published successfully!`
      );
      setSingleProduct({
        productType: 'simple',
        title: '',
        sku: '',
        category: '',
        brand: '',
        price: '',
        mrp: '',
        stock: '',
        description: '',
        externalUrl: '',
        buttonText: 'Buy Now',
        variations: [
          { attributeName: 'Size', attributeValue: 'M', sku: '', price: '', stock: '' },
        ],
        groupedProducts: [
          { name: 'Included Item 1', sku: '', price: '', quantity: '1' },
        ],
        images: [],
      });
    }, 1200);
  };

  return (
    <div className="catalog-upload-container">
      {/* Header & Mode Switcher */}
      <div className="catalog-header">
        <div>
          <h2>Add & Manage Products</h2>
          <p>Choose whether to add an individual product or bulk import your catalog via spreadsheet.</p>
        </div>

        {/* Tab Switcher */}
        <div className="catalog-mode-tabs">
          <button
            type="button"
            className={`catalog-tab-btn ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            <AddBoxOutlined fontSize="small" />
            Add Single Product
          </button>
          <button
            type="button"
            className={`catalog-tab-btn ${activeTab === 'bulk' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >
            <LayersOutlined fontSize="small" />
            Bulk Catalog Upload
          </button>
        </div>
      </div>

      {/* Mode 1: Add Single Product */}
      {activeTab === 'single' && (
        <form onSubmit={handleSingleProductSubmit} className="single-product-grid">
          <div className="single-product-main">
            {/* Product Type Selector */}
            <div className="form-section-card product-type-card">
              <div className="type-selector-header">
                <div>
                  <h3 className="section-title">Product Type</h3>
                  <p className="section-sub" style={{ margin: 0 }}>
                    Select the structure of the product you are adding.
                  </p>
                </div>
                <select
                  name="productType"
                  className="product-type-select"
                  value={singleProduct.productType}
                  onChange={handleProductInputChange}
                >
                  <option value="simple">Simple Product</option>
                  <option value="variable">Variable Product</option>
                  <option value="grouped">Grouped Product</option>
                  <option value="external">External / Affiliate Product</option>
                </select>
              </div>

              {/* Informative pill explaining selected type */}
              <div className="product-type-desc-banner">
                {singleProduct.productType === 'simple' && (
                  <span>
                    <strong>Simple Product:</strong> A standalone, physical or digital product with single pricing, inventory, and SKU.
                  </span>
                )}
                {singleProduct.productType === 'variable' && (
                  <span>
                    <strong>Variable Product:</strong> A product with multiple variations (e.g., sizes, colors, materials) each having its own price, SKU, and stock count.
                  </span>
                )}
                {singleProduct.productType === 'grouped' && (
                  <span>
                    <strong>Grouped Product:</strong> A collection or bundle of related standalone products sold together (e.g., Living Room Set, Skincare 3-Step Kit).
                  </span>
                )}
                {singleProduct.productType === 'external' && (
                  <span>
                    <strong>External / Affiliate Product:</strong> A product hosted or purchased outside of Anevix. Provides an external checkout redirect link.
                  </span>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-section-card">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label className="form-label">
                  Product Title <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g. Slim Fit Cotton Formal Shirt"
                  value={singleProduct.title}
                  onChange={handleProductInputChange}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Category <span className="required-star">*</span>
                  </label>
                  <select
                    name="category"
                    className="form-input"
                    value={singleProduct.category}
                    onChange={handleProductInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Men Fashion">Men's Fashion</option>
                    <option value="Women Fashion">Women's Fashion</option>
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Brand Name</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-input"
                    placeholder="e.g. Anevix Studio"
                    value={singleProduct.brand}
                    onChange={handleProductInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  className="form-input textarea"
                  placeholder="Provide comprehensive details about materials, care instructions, and sizing..."
                  value={singleProduct.description}
                  onChange={handleProductInputChange}
                />
              </div>
            </div>

            {/* If External Product: Link & Button Text */}
            {singleProduct.productType === 'external' && (
              <div className="form-section-card">
                <h3 className="section-title">External Product Settings</h3>
                <p className="section-sub">Direct buyers to an external checkout or partner website.</p>
                
                <div className="form-group">
                  <label className="form-label">
                    Product External URL <span className="required-star">*</span>
                  </label>
                  <input
                    type="url"
                    name="externalUrl"
                    className="form-input"
                    placeholder="https://example.com/item/123?affiliate=anevix"
                    value={singleProduct.externalUrl}
                    onChange={handleProductInputChange}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Button Call To Action Text</label>
                    <input
                      type="text"
                      name="buttonText"
                      className="form-input"
                      placeholder="e.g. Buy on Brand Site"
                      value={singleProduct.buttonText}
                      onChange={handleProductInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Listed Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="e.g. 1499"
                      value={singleProduct.price}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* If Grouped Product: Bundled / Child Products */}
            {singleProduct.productType === 'grouped' && (
              <div className="form-section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <h3 className="section-title">Grouped Bundle Items</h3>
                    <p className="section-sub" style={{ margin: 0 }}>Add the products or kit items bundled inside this group.</p>
                  </div>
                  <button
                    type="button"
                    className="add-variation-row-btn"
                    onClick={handleAddGroupedProduct}
                  >
                    + Add Grouped Item
                  </button>
                </div>

                <div className="variations-table-wrapper">
                  <table className="variations-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Item SKU</th>
                        <th>Unit Price (₹)</th>
                        <th>Qty in Bundle</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleProduct.groupedProducts.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <input
                              type="text"
                              className="variant-cell-input"
                              placeholder="e.g. Cleanser 100ml"
                              value={item.name}
                              onChange={(e) => handleGroupedProductChange(idx, 'name', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="variant-cell-input"
                              placeholder="SKU-ITEM-01"
                              value={item.sku}
                              onChange={(e) => handleGroupedProductChange(idx, 'sku', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="variant-cell-input"
                              placeholder="499"
                              value={item.price}
                              onChange={(e) => handleGroupedProductChange(idx, 'price', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="variant-cell-input"
                              placeholder="1"
                              value={item.quantity}
                              onChange={(e) => handleGroupedProductChange(idx, 'quantity', e.target.value)}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="remove-var-btn"
                              onClick={() => handleRemoveGroupedProduct(idx)}
                              title="Remove item"
                            >
                              <CloseOutlined fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="form-row-2" style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Bundle Special Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="e.g. 1299 (Discounted combo price)"
                      value={singleProduct.price}
                      onChange={handleProductInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bundle SKU</label>
                    <input
                      type="text"
                      name="sku"
                      className="form-input"
                      placeholder="e.g. BUNDLE-KIT-01"
                      value={singleProduct.sku}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* If Variable Product: Variations Matrix */}
            {singleProduct.productType === 'variable' && (
              <div className="form-section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <h3 className="section-title">Product Variations & Attributes</h3>
                    <p className="section-sub" style={{ margin: 0 }}>Configure options like size, color, SKU, pricing and inventory.</p>
                  </div>
                  <button
                    type="button"
                    className="add-variation-row-btn"
                    onClick={handleAddVariation}
                  >
                    + Add Variation
                  </button>
                </div>

                <div className="variations-table-wrapper">
                  <table className="variations-table">
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Option / Value</th>
                        <th>Variant SKU</th>
                        <th>Price (₹)</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleProduct.variations.map((variant, idx) => (
                        <tr key={idx}>
                          <td>
                            <input
                              type="text"
                              className="variant-cell-input"
                              placeholder="e.g. Size / Color"
                              value={variant.attributeName}
                              onChange={(e) => handleVariationChange(idx, 'attributeName', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="variant-cell-input"
                              placeholder="e.g. M, XL, Red"
                              value={variant.attributeValue}
                              onChange={(e) => handleVariationChange(idx, 'attributeValue', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="variant-cell-input"
                              placeholder="SKU-VAR-01"
                              value={variant.sku}
                              onChange={(e) => handleVariationChange(idx, 'sku', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="variant-cell-input"
                              placeholder="999"
                              value={variant.price}
                              onChange={(e) => handleVariationChange(idx, 'price', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="variant-cell-input"
                              placeholder="25"
                              value={variant.stock}
                              onChange={(e) => handleVariationChange(idx, 'stock', e.target.value)}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="remove-var-btn"
                              onClick={() => handleRemoveVariation(idx)}
                              title="Delete variation"
                            >
                              <CloseOutlined fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* If Simple Product: Single Price & Stock Fields */}
            {singleProduct.productType === 'simple' && (
              <div className="form-section-card">
                <h3 className="section-title">Pricing & Stock</h3>
                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">
                      Selling Price (₹) <span className="required-star">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="999"
                      value={singleProduct.price}
                      onChange={handleProductInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">MRP (₹)</label>
                    <input
                      type="number"
                      name="mrp"
                      className="form-input"
                      placeholder="1999"
                      value={singleProduct.mrp}
                      onChange={handleProductInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-input"
                      placeholder="50"
                      value={singleProduct.stock}
                      onChange={handleProductInputChange}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label className="form-label">SKU / Product Code</label>
                  <input
                    type="text"
                    name="sku"
                    className="form-input"
                    placeholder="e.g. SHT-BLK-M-01"
                    value={singleProduct.sku}
                    onChange={handleProductInputChange}
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="submit-product-btn"
                disabled={submittingProduct}
              >
                {submittingProduct
                  ? 'Saving Product...'
                  : `Publish ${singleProduct.productType === 'variable' ? 'Variable' : singleProduct.productType === 'grouped' ? 'Grouped' : singleProduct.productType === 'external' ? 'External' : 'Simple'} Product`}
              </button>
            </div>
          </div>

          {/* Media / Image Sidebar */}
          <div className="single-product-side">
            <div className="form-section-card">
              <h3 className="section-title">Product Images</h3>
              <p className="section-sub">Add image URLs for preview and listing catalog display.</p>

              <div className="image-input-bar">
                <input
                  type="url"
                  className="form-input"
                  placeholder="Paste image web URL..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                />
                <button
                  type="button"
                  className="add-img-btn"
                  onClick={handleAddImageUrl}
                >
                  <AddPhotoAlternateOutlined fontSize="small" /> Add
                </button>
              </div>

              <div className="image-preview-grid">
                {singleProduct.images.map((url, i) => (
                  <div key={i} className="preview-thumb">
                    <img src={url} alt={`Preview ${i + 1}`} onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Invalid'; }} />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={() => handleRemoveImage(i)}
                      title="Remove image"
                    >
                      <CloseOutlined fontSize="inherit" />
                    </button>
                  </div>
                ))}
                {singleProduct.images.length === 0 && (
                  <div className="no-images-hint">
                    No images added yet. You can paste image links or add them later.
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '16px 0 12px' }} />
              <div className="listing-tips">
                <strong>Tips for faster approval:</strong>
                <ul>
                  <li>Use clean, white background photos</li>
                  <li>Provide high resolution (min 800x800 px)</li>
                  <li>Include front, back, and detail shots</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Mode 2: Bulk Catalog Upload */}
      {activeTab === 'bulk' && (
        <div className="upload-options-grid">
          {/* Main Upload Area */}
          <div className="upload-card">
            <div
              className={`dropzone-area ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
              />
              <CloudUploadOutlined className="dropzone-icon" />
              <h4 className="dropzone-title">Click to browse or drag and drop your file</h4>
              <p className="dropzone-sub">Supported formats: CSV, XLSX, XLS (Max file size: 25MB)</p>
              <button
                type="button"
                className="browse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Browse Computer
              </button>
            </div>

            {selectedFile && (
              <div className="selected-file-preview">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DescriptionOutlined style={{ color: '#ff8c00' }} />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <CloseOutlined fontSize="small" />
                </button>
              </div>
            )}

            <button
              type="button"
              className="upload-action-btn"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Processing & Validating Catalog...' : 'Upload & Process Catalog'}
            </button>
          </div>

          {/* Template & Guidelines */}
          <div className="template-card">
            <h3>Catalog Template</h3>
            <p>
              Use our pre-configured spreadsheet template with all required product attributes, categories, and inventory columns.
            </p>

            <button
              type="button"
              className="download-template-btn"
              onClick={handleDownloadSample}
            >
              <FileDownloadOutlined fontSize="small" /> Download CSV Template
            </button>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '8px 0' }} />

            <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 8px', color: '#0f172a' }}>
              Upload Checklist
            </h4>
            <ul className="upload-guidelines">
              <li>Ensure product Title, Price, MRP, and SKU are filled in.</li>
              <li>Images can be hosted URL links separated by commas.</li>
              <li>Stock must be numeric and greater than or equal to 0.</li>
              <li>Max 5,000 product rows allowed per single upload.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
