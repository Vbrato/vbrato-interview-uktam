import { useCallback, useEffect, useRef, useState } from "react";

const PER_PAGE = 10;

export const InfiniteList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  const fetchNextPage = useCallback(() => {
    console.log(page);
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${page * PER_PAGE - PER_PAGE}&_limit=${PER_PAGE}`)
      .then((response) => response.json())
      .then((json) => {
        setPage((prevPage) => prevPage + 1);
        setData((prev) => [...prev, ...json]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${PER_PAGE}`)
      .then((response) => response.json())
      .then((json) => setData(json));
    const listNode = document.querySelector("#list-wrapper");
    listNode.addEventListener("scroll", handleScroll);
    return () => {
      listNode.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    const container = listRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      // user has scrolled to the bottom
      fetchNextPage();
    }
  };

  return (
    <div className="list-wrapper" id="list-wrapper" ref={listRef}>
      {data.length > 0 ? (
        data.map((item) => (
          <div className="list-item" key={item.id}>
            <p key={item.id}>
              {item.title}
              {item.body}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {isLoading ? <p>Loading...</p> : null}
    </div>
  );
};
