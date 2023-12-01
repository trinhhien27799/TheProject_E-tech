import { useEffect, useState } from "react";
import { getVariationDetail } from "../CallApi/productApi";

export const getVariationModal = (variationID) => {
    const [variation, setVariation] = useState(null);

    const getVariation = async () => {
        try {
            const data = await getVariationDetail(variationID);
            setVariation(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVariation(variationID)
    }, []);

    return variation;
}
