import React from "react";
import Image from "next/image";
import { Instagram, WhatsApp, Google, Facebook } from "@mui/icons-material";
import "./ThankYou.css";
import StayUpdated from "../StayUpdated/StayUpdated";

export default function ThankYou() {
  return (
    <>
      <div className="thankYouPage">
        <div className="thankYouCard">
          <div className="thankYouImage">
            <Image
              src="/assets/images/thank-u.png"
              alt="Thank You"
              width={320}
              height={320}
              priority
            />
          </div>
          <div className="thankYouContent">
            <h4 className="Poppins-medium">Thank You!</h4>
            <p className="Poppins-regular">
              The order is on its way. <br />
              The order confirmation has been sent to your email.
            </p>
            <div className="socialRow">
              <span className="Poppins-medium">FOLLOW US</span>
              <div className="socialIcons">
                <a href="#" aria-label="Instagram">
                  <Instagram className="socialIcon" />
                </a>
                <a href="#" aria-label="Whatsapp">
                  <WhatsApp className="socialIcon" />
                </a>
                <a href="#" aria-label="Google">
                  <Google className="socialIcon" />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook className="socialIcon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StayUpdated />
    </>
  );
}
