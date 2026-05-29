import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./theme-configuration/colorVariable.css";
import "./theme-configuration/typography.css";

export const metadata = {
  title: "Anevix - Your Shopping Destination",
  description: "Next.js E-commerce with MUI and Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="Inter-regular">
        <ThemeRegistry>
          <div id="root">
            <Header />
            <main style={{ minHeight: '80vh' }}>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
