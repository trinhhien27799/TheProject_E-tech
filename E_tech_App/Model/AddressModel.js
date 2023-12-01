import { useEffect, useState } from "react";
import { getAddress } from "../CallApi/AddressAPI";

export const ListAddress = [
    {
        id: 1,
        username: 'John',
        phone: '01484734942',
        address: '123 Main St.'
    },
    {
        id: 2,
        username: 'John Smith',
        phone: '07347394234',
        address: '123 Main St.'
    }
];

export const getAllAddresses = () => {
    const [addressData, setAddressData] = useState(null);

    const getData = async () => {
        try {
            const data = await getAddress();
            setAddressData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {getData()}, []);

    return addressData;
}

