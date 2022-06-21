import axios from "axios";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
export default function useFecthFreindCustomHook(query, pageNumber) {
  const URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("TOKEN");
  const { USERID } = useParams();
  const [freindsData, setFreindsData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFreindsData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "get",
      url:
        URL +
        "/api/get_friends?user_id=" +
        USERID +
        "&page=" +
        pageNumber +
        "&limit=10&match=" +
        query,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        if (res.data.data) {
          setFreindsData((prevFriend) => [...prevFriend, ...res.data.data]);
        } else setFreindsData([]);
        if (res.data.next) {
          setHasMore(true);
        } else setHasMore(false);

        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { freindsData, hasMore, loading, error };
}
