'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import OrderSummary from '@/components/OrderSummary/OrderSummary';
import './AddressSelect.css';

const sampleAddresses = [
  {
    id: 1,
    name: 'Name',
    tag: 'HOME',
    lines: ['Address Line 1', 'Address Line 1', 'Area', 'City, State, Zipcode'],
    phone: 'Phone: XXXXXXXXXX',
  },
  {
    id: 2,
    name: 'Name',
    tag: 'OFFICE',
    lines: ['Address Line 1', 'Address Line 1', 'Area', 'City, State, Zipcode'],
    phone: 'Phone: XXXXXXXXXX',
  },
  {
    id: 3,
    name: 'Name',
    tag: 'HOME',
    lines: ['Address Line 1', 'Address Line 1', 'Area', 'City, State, Zipcode'],
    phone: 'Phone: XXXXXXXXXX',
  },
];

export default function AddressSelect() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="addressWrap">
      <div className="addressInner">
        <header className="addressHeader">
          <div className="d-flex align-center">
          <button className="backBtn" aria-label="Back">←</button>
          <h1>Select Address</h1>
          </div>
          <button className="cancelBtn">Cancel</button>
        </header>

        <nav className="addressSteps">
          <ul>
            <li className="active Poppins-regular">Select Address</li>
            <li className="Poppins-regular">Payment Option</li>
            <li className="Poppins-regular">Add New Address 2</li>
          </ul>
        </nav>

        <div className="addressActions">
          <Link href="/checkout/add-address" className="addAddress">ADD NEW ADDRESS</Link>
        </div>

        <div className="addressLayout">
          <main className="addressList">
            <h4 className="sectionTitle Poppins-regular">DEFAULT ADDRESS</h4>
            {sampleAddresses.map(addr => (
              <article key={addr.id} className={`addressCard ${selected === addr.id ? 'selected' : ''}`}>
                <div className="cardRow">
                  <label className="radioWrap">
                    <input type="radio" name="selectedAddress" checked={selected === addr.id} onChange={() => setSelected(addr.id)} />
                    <span className="radioCustom" />
                  </label>
                  <div className="addrMeta">
                    <div className="addrTitle">
                      <strong>{addr.name}</strong>
                      <span className="addrTag">{addr.tag}</span>
                    </div>
                    <div className="addrLines">
                      {addr.lines.map((l, i) => <div key={i} className="addrLine Poppins-regular">{l}</div>)}
                    </div>
                    <div className="addrPhone Poppins-regular">{addr.phone}</div>
                  </div>
                </div>

                <div className="cardActions">
                  <button className="btn outline">Remove</button>
                  <button className="btn outline">Edit</button>
                </div>
              </article>
            ))}

            <h4 className="sectionTitle">OTHER ADDRESS</h4>
            {sampleAddresses.map(addr => (
              <article key={`other-${addr.id}`} className="addressCard">
                <div className="cardRow">
                  <label className="radioWrap">
                    <input type="radio" name="selectedAddress" checked={false} onChange={() => setSelected(addr.id)} />
                    <span className="radioCustom" />
                  </label>
                  <div className="addrMeta">
                    <div className="addrTitle">
                      <strong>{addr.name}</strong>
                      <span className="addrTag">{addr.tag}</span>
                    </div>
                    <div className="addrLines">
                      {addr.lines.map((l, i) => <div key={i} className="addrLine">{l}</div>)}
                    </div>
                    <div className="addrPhone">{addr.phone}</div>
                  </div>
                </div>

                <div className="cardActions">
                  <button className="btn outline">Remove</button>
                  <button className="btn outline">Edit</button>
                </div>
              </article>
            ))}

            <div className="confirmBar">
              <Link href="/checkout/payment" className="confirmBtn">Confirm Address</Link>
            </div>
          </main>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
