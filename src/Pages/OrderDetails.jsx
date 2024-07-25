import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log("Order ID:", id);
  }, [id]);
  return (
    <div>
      OrderDetails Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Temporibus quasi quia aperiam facilis est quae autem vitae nulla rem
      exercitationem pariatur odio laudantium modi velit labore voluptatem
      cupiditate, sapiente dolorum?
    </div>
  );
};

export default OrderDetails;
