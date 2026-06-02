'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from '@mui/material';
import CustomDropdown from '@/utils/CustomDropdown/CustomDropdown';
import './PaymentMethod.css';

const paymentOptions = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Pay by any UPI app',
    icon: '📱',
    selected: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit/ ATM Card',
    description: 'Add and secure cards as per RBI Guidelines',
    icon: '💳',
    selected: false,
  },
  {
    id: 'emi',
    name: 'EMI',
    description: 'No cost EMI available',
    icon: '📊',
    selected: false,
    options: [
      'HDFC Credit Card EMI',
      'LazyPay EMI',
      'Kotak Credit Card EMI',
      'SBI Credit Card EMI',
      'Axis Credit Card EMI',
      'IDFC Credit Card EMI',
      'ICICI Credit Card EMI',
      'Amex Card EMI',
    ],
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: '🏦',
    selected: false,
    options: [
      'Airtel Payments Bank',
      'HDFC Bank',
      'ICICI Bank',
      'Kotak Bank',
      'State Bank of India',
      'Yes Bank Ltd',
      'United Bank of India',
      'Union Bank of India',
      'Punjab National Bank',
      'Jammu & Kashmir Bank',
    ],
  },
  {
    id: 'pod',
    name: 'Pay on Delivery',
    description: 'Cash, UPI and Cards accepted',
    icon: '🚚',
    selected: false,
  },
];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [emiAnchor, setEmiAnchor] = useState(null);
  const [netBankingAnchor, setNetBankingAnchor] = useState(null);

  const handleEmiClick = (event) => {
    setEmiAnchor(event.currentTarget);
  };

  const handleEmiClose = () => {
    setEmiAnchor(null);
  };

  const handleNetBankingClick = (event) => {
    setNetBankingAnchor(event.currentTarget);
  };

  const handleNetBankingClose = () => {
    setNetBankingAnchor(null);
  };

  return (
    <div className="paymentWrap">
      <div className="paymentInner">
        <header className="paymentHeader">
          <Link href="/checkout/address" className="backBtn" aria-label="Back">←</Link>
          <h1>Payment Method</h1>
        </header>

        <div className="paymentForm">
          {/* Total Amount */}
          <div className="totalAmount">
            <span>Total Amount</span>
            <span className="amount">Rs. 85,370/-</span>
          </div>

          {/* Payment Methods */}
          <section className="paymentMethods">
            <h4 className="sectionLabel">Payment Method</h4>
            
            <div className="methodsList">
              {/* UPI */}
              <div className="methodCard">
                <button
                  className={`methodHeader ${selectedMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('upi')}
                >
                  <div className="methodLeft">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === 'upi'}
                      onChange={() => setSelectedMethod('upi')}
                      className="radioInput"
                    />
                    <span className="methodIcon">📱</span>
                    <div className="methodInfo">
                      <h5 className="methodName">UPI</h5>
                      <p className="methodDesc">Pay by any UPI app</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Card */}
              <div className="methodCard">
                <button
                  className={`methodHeader ${selectedMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <div className="methodLeft">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === 'card'}
                      onChange={() => setSelectedMethod('card')}
                      className="radioInput"
                    />
                    <span className="methodIcon">💳</span>
                    <div className="methodInfo">
                      <h5 className="methodName">Credit/Debit/ ATM Card</h5>
                      <p className="methodDesc">Add and secure cards as per RBI Guidelines</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* EMI */}
              <div className="methodCard">
                <button
                  className={`methodHeader ${selectedMethod === 'emi' ? 'active' : ''}`}
                  onClick={(e) => {
                    setSelectedMethod('emi');
                    handleEmiClick(e);
                  }}
                >
                  <div className="methodLeft">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === 'emi'}
                      onChange={() => setSelectedMethod('emi')}
                      className="radioInput"
                    />
                    <span className="methodIcon">📊</span>
                    <div className="methodInfo">
                      <h5 className="methodName">EMI</h5>
                      <p className="methodDesc">No cost EMI available</p>
                    </div>
                  </div>
                  <span className={`expandIcon ${emiAnchor ? 'open' : ''}`}>⌄</span>
                </button>
              </div>

              {/* EMI Dropdown */}
              <CustomDropdown
                anchorEl={emiAnchor}
                open={Boolean(emiAnchor)}
                onClose={handleEmiClose}
                width={350}
              >
                <MenuItem onClick={handleEmiClose}>HDFC Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>LazyPay EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>Kotak Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>SBI Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>Axis Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>IDFC Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>ICICI Credit Card EMI</MenuItem>
                <MenuItem onClick={handleEmiClose}>Amex Card EMI</MenuItem>
              </CustomDropdown>

              {/* Net Banking */}
              <div className="methodCard">
                <button
                  className={`methodHeader ${selectedMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={(e) => {
                    setSelectedMethod('netbanking');
                    handleNetBankingClick(e);
                  }}
                >
                  <div className="methodLeft">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === 'netbanking'}
                      onChange={() => setSelectedMethod('netbanking')}
                      className="radioInput"
                    />
                    <span className="methodIcon">🏦</span>
                    <div className="methodInfo">
                      <h5 className="methodName">Net Banking</h5>
                    </div>
                  </div>
                  <span className={`expandIcon ${netBankingAnchor ? 'open' : ''}`}>⌄</span>
                </button>
              </div>

              {/* Net Banking Dropdown */}
              <CustomDropdown
                anchorEl={netBankingAnchor}
                open={Boolean(netBankingAnchor)}
                onClose={handleNetBankingClose}
                width={350}
              >
                <MenuItem onClick={handleNetBankingClose}>Airtel Payments Bank</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>HDFC Bank</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>ICICI Bank</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>Kotak Bank</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>State Bank of India</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>Yes Bank Ltd</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>United Bank of India</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>Union Bank of India</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>Punjab National Bank</MenuItem>
                <MenuItem onClick={handleNetBankingClose}>Jammu & Kashmir Bank</MenuItem>
              </CustomDropdown>

              {/* Pay on Delivery */}
              <div className="methodCard">
                <button
                  className={`methodHeader ${selectedMethod === 'pod' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('pod')}
                >
                  <div className="methodLeft">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === 'pod'}
                      onChange={() => setSelectedMethod('pod')}
                      className="radioInput"
                    />
                    <span className="methodIcon">🚚</span>
                    <div className="methodInfo">
                      <h5 className="methodName">Pay on Delivery</h5>
                      <p className="methodDesc">Cash, UPI and Cards accepted</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Gift Card */}
          <div className="giftCard">
            <span className="giftIcon">🎁</span>
            <span>Have a Gift Card?</span>
            <Link href="#" className="applyLink">Apply Gift Card</Link>
          </div>

          {/* We Accept */}
          <div className="weAccept">
            <h5>We Accept</h5>
            <div className="cardLogos">
              <Image src="/assets/images/visa.png" alt="Visa" width={60} height={40} />
              <Image src="/assets/images/amex.png" alt="Amex" width={60} height={40} />
              <Image src="/assets/images/paypalbank.png" alt="PayPal Bank" width={60} height={40} />
              <Image src="/assets/images/mastercard.png" alt="MasterCard" width={60} height={40} />
              <Image src="/assets/images/paypal.png" alt="PayPal" width={60} height={40} />
              <Image src="/assets/images/googlepay.png" alt="Google Pay" width={60} height={40} />
              <Image src="/assets/images/paytm.png" alt="Paytm" width={60} height={40} />
              <Image src="/assets/images/phonepe.png" alt="PhonePe" width={60} height={40} />
            </div>
          </div>

          <button className="placeOrderBtn">Place Order</button>

          <p className="terms">
            By placing the order, you agree to Anevix&apos;s <Link href="#">Terms of use</Link> and <Link href="#">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
