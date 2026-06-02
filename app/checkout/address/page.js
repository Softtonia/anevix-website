import AddressSelect from '@/components/AddressSelect/AddressSelect';

export const metadata = {
  title: 'Select Address',
  description: 'Choose delivery address',
};

export default function CheckoutAddressPage() {
  return <AddressSelect />;
}
