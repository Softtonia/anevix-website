'use client';
import React, { useState, useEffect } from 'react';
import apiClient from '@/api';
import './Products.css';
import { 
  CheckCircleOutlineOutlined,
  InsertDriveFileOutlined,
  AccessTimeOutlined,
  ContentCopyOutlined,
  MoreVertOutlined,
  FilterAltOutlined,
  SearchOutlined,
  CheckroomOutlined,
  VisibilityOutlined,
  EditOutlined,
  ErrorOutlineOutlined,
  LaptopChromebookOutlined,
  LocalMallOutlined
} from '@mui/icons-material';

export default function ProductListingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadBatches, setUploadBatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Filters State
  const [activeMainTab, setActiveMainTab] = useState('Single Uploads');
  const [activeSubTab, setActiveSubTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        setLoading(true);
        const profileRes = await apiClient.get('/seller/onboarding/profile');
        const sellerId = profileRes.data?.profile?.b2cProfileId || 
                         profileRes.data?.b2cProfile?._id || 
                         profileRes.data?.profile?._id || 
                         profileRes.data?._id;

        if (!sellerId) throw new Error('Could not extract Seller ID from profile');

        const productsRes = await apiClient.get('/products/batches/list', { params: { sellerId } });
        const batches = productsRes.data.map((b, index) => ({
          ...b,
          sNo: index + 1
        }));
        
        setUploadBatches(batches);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchSellerProducts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: 'numeric', month: 'short', year: '2-digit' };
    const datePart = date.toLocaleDateString('en-GB', optionsDate).replace(/ /g, " ");
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timePart = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    return `${datePart.replace(/(\d{2})/, "'$1")} | ${timePart}`;
  };

  const getCategoryIcon = (cat) => {
    const lower = cat?.toLowerCase() || '';
    if (lower.includes('electronic') || lower.includes('laptop')) return <LaptopChromebookOutlined sx={{fontSize: 16}} />;
    if (lower.includes('bag') || lower.includes('luggage')) return <LocalMallOutlined sx={{fontSize: 16}} />;
    return <CheckroomOutlined sx={{fontSize: 16}} />;
  };

  // Derived state for filtering
  const filteredBatches = uploadBatches.filter(batch => {
    if (activeSubTab === 'QC in Progress' && batch.status !== 'pending') return false;
    if (activeSubTab === 'QC Error' && batch.status !== 'rejected') return false;
    if (activeSubTab === 'QC Pass' && batch.status !== 'active') return false;
    if (activeSubTab === 'Draft' && batch.status !== 'draft') return false;
    if (activeSubTab === 'Action Required' && batch.status !== 'rejected') return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = (batch.title || batch.category || '').toLowerCase().includes(query);
      const matchFileId = (batch.fileId || '').toLowerCase().includes(query);
      if (!matchTitle && !matchFileId) return false;
    }

    if (selectedCategory !== 'All Categories' && batch.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  const categories = ['All Categories', ...new Set(uploadBatches.map(b => b.category).filter(Boolean))];

  const counts = {
    'All': uploadBatches.length,
    'Action Required': uploadBatches.filter(b => b.status === 'rejected').length,
    'QC in Progress': uploadBatches.filter(b => b.status === 'pending').length,
    'QC Error': uploadBatches.filter(b => b.status === 'rejected').length,
    'QC Pass': uploadBatches.filter(b => b.status === 'active').length,
    'Draft': uploadBatches.filter(b => b.status === 'draft').length,
  };

  return (
    <div className="product-listing-container">
      <div className="sh-tabs-container">
        <div className="sh-main-tabs">
          <button className={`sh-main-tab ${activeMainTab === 'Bulk Uploads' ? 'active' : ''}`} onClick={() => setActiveMainTab('Bulk Uploads')}>Bulk Uploads (0)</button>
          <button className={`sh-main-tab ${activeMainTab === 'Single Uploads' ? 'active' : ''}`} onClick={() => setActiveMainTab('Single Uploads')}>Single Uploads ({uploadBatches.length})</button>
        </div>
        <div className="sh-sub-tabs">
          {['All', 'Action Required', 'QC in Progress', 'QC Error', 'QC Pass', 'Draft'].map(tab => (
            <button 
              key={tab}
              className={`sh-sub-tab ${activeSubTab === tab ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab)}
            >
              {tab} ({counts[tab] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="sh-toolbar">
        <div className="sh-search-box">
          <SearchOutlined className="sh-search-icon" />
          <input 
            type="text" 
            placeholder="Search by catalog name, file ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sh-filters">
          <select 
            className="sh-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className="sh-select"><option>All Status</option></select>
          <button 
            className="sh-clear-btn" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setActiveSubTab('All');
            }}
          >
            <FilterAltOutlined sx={{ fontSize: 16 }} /> Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading catalog data...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : uploadBatches.length === 0 ? (
        <div className="empty-state">
          <h2>No Catalogs Uploaded</h2>
          <p>You haven't uploaded any products yet.</p>
        </div>
      ) : (
        <div className="catalog-table-container">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Catalog / Product Preview</th>
                <th>Category</th>
                <th>File ID</th>
                <th>Created Date</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>{batch.sNo}</td>
                  <td>
                    <div className="sh-catalog-preview">
                      <div className="sh-catalog-img-wrapper">
                        <img 
                          src={batch.image} 
                          alt="Catalog" 
                          className="sh-catalog-img" 
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Image'; }}
                        />
                      </div>
                      <div className="sh-catalog-info">
                        <strong className="sh-catalog-title">{batch.title || `${batch.category} Collection`}</strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="sh-category-cell">
                      <div className="sh-cat-text">
                        <span>{batch.category} &gt;</span>
                        <span className="sh-cat-sub">{batch.category === 'Electronics' ? "Mobiles & Accessories >" : "Men's Clothing >"}</span>
                        <span className="sh-cat-sub">{batch.category === 'Electronics' ? "Laptops" : "T-Shirts"}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="sh-fileid-cell">
                      {batch.fileId}
                    </div>
                  </td>
                  <td>
                    <div className="sh-date-cell">
                      {formatDate(batch.createdDateRaw).split(' | ').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </td>
                  <td>{batch.productsCount}</td>
                  <td>
                    {batch.status === 'active' ? (
                      <span className="sh-qc-pill qc-pass">
                        <CheckCircleOutlineOutlined sx={{ fontSize: 14, mr: 0.5 }} /> QC Pass
                      </span>
                    ) : batch.status === 'pending' ? (
                      <span className="sh-qc-pill qc-pending">
                        <AccessTimeOutlined sx={{ fontSize: 14, mr: 0.5 }} /> Pending Approval
                      </span>
                    ) : batch.status === 'rejected' ? (
                      <div className="sh-qc-failed-container">
                        <span className="sh-qc-pill qc-failed">
                          <ErrorOutlineOutlined sx={{ fontSize: 14, mr: 0.5 }} /> QC Failed
                        </span>
                        {batch.rejection_reason && (
                          <div className="sh-qc-reason">
                            Reason: {batch.rejection_reason}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="sh-qc-pill qc-draft">
                        <InsertDriveFileOutlined sx={{ fontSize: 14, mr: 0.5 }} /> Draft
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="sh-actions-cell">
                      <button 
                        className="sh-action-btn primary"
                        onClick={() => {
                          setSelectedBatch(batch);
                          setIsModalOpen(true);
                        }}
                      >
                        {batch.status === 'active' ? (
                          <><VisibilityOutlined sx={{fontSize: 16}} /> View Catalog</>
                        ) : batch.status === 'rejected' ? (
                          <><VisibilityOutlined sx={{fontSize: 16}} /> Review</>
                        ) : (
                          <><EditOutlined sx={{fontSize: 16}} /> Edit Catalog</>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="sh-pagination-wrapper">
            <div className="sh-pagination-info">Showing {filteredBatches.length > 0 ? 1 : 0}-{filteredBatches.length} of {filteredBatches.length} catalogs</div>
            <div className="sh-pagination-controls">
              <button className="sh-page-btn disabled">&lt;</button>
              <button className="sh-page-btn active">1</button>
              <button className="sh-page-btn disabled">&gt;</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedBatch && (
        <div className="modal-overlay">
          <div className="modal-content catalog-modal">
            <div className="modal-header">
              <h3>Catalogs</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-batch-info">
                <p><strong>Category:</strong> {selectedBatch.category}</p>
                <p><strong>File Id:</strong> {selectedBatch.fileId}</p>
              </div>
              
              <div className="modal-products-list">
                {selectedBatch.products && selectedBatch.products.length > 0 ? (
                  selectedBatch.products.map((product, idx) => (
                    <div key={idx} className="modal-product-item">
                      <div className="product-images">
                        <img src={product.image || product.thumbnail || selectedBatch.image} alt="product" />
                        {(product.images?.[1] || product.thumbnail2) && <img src={product.images?.[1] || product.thumbnail2} alt="product2" className="img-small" />}
                      </div>
                      <div className="product-details">
                        <h4>{product.title || product.name || 'Puffed Snacks'}</h4>
                        <p className="catalog-id">Catalog Id:<br />{product.id || product._id || '577577360'}</p>
                      </div>
                      <div className="product-count-col">
                        <span className="label">Products</span>
                        <span className="value">1</span>
                      </div>
                      <div className="product-action">
                        <button className="view-catalog-outline-btn">View Catalog</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="modal-product-item">
                    <div className="product-images">
                      <img src={selectedBatch.image} alt="product" />
                      {/* Placeholder for second image if available in batch */}
                      <img src={selectedBatch.image} alt="product2" className="img-small" />
                    </div>
                    <div className="product-details">
                      <h4>Puffed Snacks</h4>
                      <p className="catalog-id">Catalog Id:<br />{selectedBatch.id || selectedBatch._id || '577577360'}</p>
                    </div>
                    <div className="product-count-col">
                      <span className="label">Products</span>
                      <span className="value">{selectedBatch.productsCount || 1}</span>
                    </div>
                    <div className="product-action">
                      <button className="view-catalog-outline-btn">View Catalog</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
