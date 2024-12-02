import React, { useState, useEffect, useRef } from 'react';

const Infinite = ({ items, fetchMoreItems }) => {
  const [displayedItems, setDisplayedItems] = useState(items.slice(0, 10));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        fetchMoreItems().then((newItems) => {
          setDisplayedItems([...displayedItems, ...newItems]);
          setHasMore(newItems.length > 0);
          setIsLoading(false);
        });
      }
    });

    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = observer;
    observerRef.current.observe(document.querySelector('.scroll-observer'));
  }, [hasMore, isLoading, fetchMoreItems]);

  return (
    <div>
      {displayedItems.map((item) => (
        <div className="box1" key={item.id}>{item.name}</div>
      ))}
      <div className="scroll-observer"></div>
    </div>
  );
};

export default Infinite;
