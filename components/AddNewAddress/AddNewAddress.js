'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import OrderSummary from '@/components/OrderSummary/OrderSummary';
import './AddNewAddress.css';

export default function AddNewAddress() {
  const [formData, setFormData] = useState({
    country: '',
    fullName: '',
    mobileNumber: '',
    houseNumber: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    addressType: 'home',
    defaultAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="addNewAddressWrap">
      <div className="addNewAddressInner">
        <header className="addHeader">
          <div className="headerLeft">
            <Link href="/checkout/address" className="backBtn" aria-label="Back">←</Link>
            <h1>Add New Address</h1>
          </div>
          <Link href="/checkout/address" className="cancelBtn">Cancel</Link>
        </header>

        <div className="addLayout">
          <main className="addForm">
            {/* Contact Details */}
            <section className="formSection">
              <h4 className="sectionLabel">CONTACT DETAILS</h4>
              
              <div className="formGroup">
                <label>COUNTRY</label>
                <select name="country" value={formData.country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                </select>
              </div>

              <div className="formGroup">
                <label className="Poppins-regular">Full Name (First and Last Name)</label>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="NAME"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <span className="clearBtn">✕</span>
                </div>
              </div>

              <div className="formGroup">
                <label className="Poppins-regular">Mobile Number</label>
                <div className="inputWrapper">
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="XXXXXXXXXX"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <span className="clearBtn">✕</span>
                </div>
              </div>

              <div className="formGroup checkbox">
                <label>
                  <input type="checkbox" /> Maybe used to assist delivery
                </label>
              </div>
            </section>

            {/* Address Section */}
            <section className="formSection">
              <h4 className="sectionLabel Poppins-regular">Address</h4>
              
              <div className="useLocation">
                <span>📍 Use my current location</span>
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="houseNumber"
                  placeholder="House Number/Tower/Block*"
                  value={formData.houseNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="address"
                  placeholder="Address (locality/building/street)*"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <input
                  type="text"
                  name="city"
                  placeholder="Town/City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <select name="state" value={formData.state} onChange={handleChange}>
                  <option value="">State</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="maharashtra">Maharashtra</option>
                </select>
              </div>
            </section>

            {/* Address Type */}
            <section className="formSection">
              <h4 className="sectionLabel Poppins-regular">Address Type</h4>
              
              <div className="radioGroup">
                <label>
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={formData.addressType === 'home'}
                    onChange={handleChange}
                  />
                  <span className="Poppins-regular">Home</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="addressType"
                    value="office"
                    checked={formData.addressType === 'office'}
                    onChange={handleChange}
                  />
                  <span className="Poppins-regular">Office</span>
                </label>
              </div>

              <div className="formGroup checkbox">
                <label className="Poppins-regular">
                  <input
                    type="checkbox"
                    name="defaultAddress"
                    checked={formData.defaultAddress}
                    onChange={handleChange}
                  />
                  Make this as my default address
                </label>
              </div>
            </section>

            <button className="useAddressBtn">Use this Address</button>
          </main>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
