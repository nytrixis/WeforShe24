import React from 'react'

const ProductDescription = () => {
  return (
    <div className="max-padd-container mt-20">
      <div className="flex gap-2">
        <button className="btn-dark rounded-sm !text-xs !py-[6px] w-36">Description</button>
        <button className="btn-dark-outline rounded-sm !text-xs !py-[6px] w-36">Care Guide</button>
        <button className="btn-dark-outline rounded-sm !text-xs !py-[6px] w-36">Size Guide</button>
      </div>
      <div className="flex flex-col pb-16">
        <p className="text-sm mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  )
}

export default ProductDescription