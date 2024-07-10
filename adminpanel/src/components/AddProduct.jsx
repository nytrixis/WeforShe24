import React, { useState } from 'react'
import upload_area from '../assets/upload_area.svg'
import { MdAdd } from 'react-icons/md'


const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'clothing',
    new_price: '',
    old_price: '',
  });
  
  const imageHandler = (e) => {                                               
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]:e.target.value }) 
  }

  const Add_Product = async () => {
    console.log(productDetails)
    let responseData;
    let product = productDetails;           
    let formData = new FormData();        
    formData.append('product', image);    

    await fetch('http://localhost:4000/upload', {   
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,

    }).then((resp) => resp.json()).then((data) => { responseData = data })    
    if(responseData.success){                                                 
      product.image = responseData.image_url                                
      console.log(product)

      await fetch('http://localhost:4000/addproduct', {                       
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {data.success?alert("Product Added"):alert("upload failed")})
    }
  }


  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-5 lg:ml-5'>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product title:</h4>
        <input 
          type='text' 
          name='name' 
          value={productDetails.name} // value referenciado al name (e.targe.value)
          onChange={changeHandler}    // Establecimiento del estado, [e.target.name]:e.target.value
          placeholder='Type here...' 
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Price:</h4>
        <input
          type='text'
          name='old_price'
          value={productDetails.old_price}
          onChange={changeHandler}
          placeholder='Type here...'
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Offer Price:</h4>
        <input
          type='text'
          name='new_price'
          value={productDetails.new_price}
          onChange={changeHandler}
          placeholder='Type here...'
          className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md'
        />
      </div>
      <div className='mb-3 flex items-center gap-x-4'>
        <h4>Product Category:</h4>
        <select 
          name='category' 
          id='' 
          value={productDetails.category}
          onChange={changeHandler}
          className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'
        >
          <option value='clothing'>Clothing</option>
          <option value='cosmetic'>Cosmetic</option>
          <option value='electronics'>Electronics</option>
        </select>
      </div>
      <div>
        <label htmlFor='file-input'>
          <img 
            src={image?URL.createObjectURL(image):upload_area} // Si la imagen se selecciono se crea una URL temporal ligada al objeto file o blob
            alt='' 
            className='w-20 rounded-sm inline-block'
          />
        </label>
        <input 
          type='file' 
          name='image' 
          id='file-input' 
          hidden 
          className='bg-primary max-w-80 w-full py-3 px-4' 
          onChange={imageHandler}
        />
      </div>
      <button 
        onClick={() => {Add_Product()}}
        className='btn-dark rounded-lg mt-4 flexCenter gap-x-1'
      >
        Add Product
      </button>
    </div>
  )
}

export default AddProduct