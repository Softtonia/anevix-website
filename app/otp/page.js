import Otp from '@/components/Auth/otp/Otp';

export const metadata = {
  title: "Verify OTP",
  description: "Enter the One-Time Password (OTP) sent to your device to verify your identity and secure your Anevix account.",
  keywords: "otp verification, verify code, security otp, Anevix verification",
  alternates: {
    canonical: "/otp",
  },
  openGraph: {
    title: "Verify OTP | Anevix",
    description: "Enter the One-Time Password (OTP) sent to your device to verify your identity and secure your Anevix account.",
    url: "https://anevix.com/otp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify OTP | Anevix",
    description: "Enter the One-Time Password (OTP) sent to your device to verify your identity and secure your Anevix account.",
  }
};

export default function OtpPage() {
  return <Otp />;
}
