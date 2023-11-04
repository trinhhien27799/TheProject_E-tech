import React, { useEffect, useState } from "react";
import axios from "axios";

const favorites = () => {
  const [favorite, setFavorite] = useState(null);
  useEffect(() => {
    axios.get('http://192.168.110.173:3000/api/favorite/get-all').then((res) => {
      setFavorite(res.data);
    })
  }, [])

  return favorites;
}

export default favorites;