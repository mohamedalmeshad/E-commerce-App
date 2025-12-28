'use client'
import { addAddressAction, getUserAddressesAction } from "@/actions/address.actions";
import { Address, AddressResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";


export const AddressContext = createContext<
    ({
        addresses: Address[];
        setAddresses: (addresses: Address[]) => void;
        isLoading: boolean;
        getAddresses: () => Promise<void>;
        addAddress: (address: { name: string, details: string, phone: string, city: string }) => Promise<boolean>;
    })
>({
    addresses: [],
    setAddresses: () => { },
    isLoading: false,
    getAddresses: async () => { },
    addAddress: async () => false,
});

export default function AddressContextProvider({ children }: { children: ReactNode }) {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getAddresses() {
        setIsLoading(true);
        try {
            const data: AddressResponse = await getUserAddressesAction();
            if (data.status === "success") {
                setAddresses(data.data);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function addAddress(address: { name: string, details: string, phone: string, city: string }) {
        try {
            const data = await addAddressAction(address);
            if (data.status === "success") {
                setAddresses(data.data);
                toast.success("Address added successfully");
                return true;
            } else {
                toast.error(data.message || "Failed to add address");
                return false;
            }
        } catch (error) {
            console.error("Error adding address:", error);
            toast.error("An error occurred while adding the address");
            return false;
        }
    }

    useEffect(() => {
        getAddresses();
    }, []);

    return (
        <AddressContext.Provider value={{ addresses, setAddresses, isLoading, getAddresses, addAddress }}>
            {children}
        </AddressContext.Provider>
    );
}
