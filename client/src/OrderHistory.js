import React, {useEffect} from 'react'


function OrderHistory() {
    useEffect(()=>{
        fetch('/order_history')
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

  return (
    <div>OrderHistory</div>
  )
}

export default OrderHistory