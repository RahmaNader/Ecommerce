import Cookies from 'js-cookie';
import { AddressProps } from "@types";

export const saveAddressForUser = (address: AddressProps) => {
  const username = Cookies.get('username');
  if (!username || !address.saveAddress) return;

  const addressKey = `addresses_${username}`;
  const existingAddresses = Cookies.get(addressKey);
  const addresses: AddressProps[] = existingAddresses ? JSON.parse(existingAddresses) : [];
  
  addresses.push(address);
  Cookies.set(addressKey, JSON.stringify(addresses));
};

export const getAddressesForUser = (): AddressProps[] => {
  const username = Cookies.get('username');
  if (!username) return [];

  const addressKey = `addresses_${username}`;
  const addresses = Cookies.get(addressKey);
  return addresses ? JSON.parse(addresses) : [];
};

export const updateSavedAddresses = (addresses: AddressProps[]) => {
  const username = Cookies.get('username');
  if (!username) return;

  const savedAddresses = addresses.filter(addr => addr.saveAddress);
  if (savedAddresses.length > 0) {
    const addressKey = `addresses_${username}`;
    Cookies.set(addressKey, JSON.stringify(savedAddresses));
  }
};