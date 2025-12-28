"use server"
import { getUserToken } from "@/app/helpers/getUserToken";
import { Address, AddressResponse, SpecificAddressResponse } from "@/interfaces";
import { addressService } from "@/services/address.service";

export async function getUserAddressesAction(): Promise<AddressResponse> {
    const token = await getUserToken();
    const data = await addressService.getAddresses(token);
    return data;
}

export async function addAddressAction(address: Address): Promise<AddressResponse> {
    const token = await getUserToken();
    const data = await addressService.addAddress(address, token);
    return data;
}

export async function getSpecificAddressAction(addressId: string): Promise<SpecificAddressResponse> {
    const token = await getUserToken();
    const data = await addressService.getSpecificAddress(addressId, token);
    return data;
}

export async function removeAddressAction(addressId: string): Promise<AddressResponse> {
    const token = await getUserToken();
    const data = await addressService.removeAddress(addressId, token);
    return data;
}
