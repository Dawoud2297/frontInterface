import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardContent, Checkbox } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ProductsPoints from './connection/points';

function ProductsList() {
  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])


  const getAllProducts = () =>{
    ProductsPoints.getAll().then(response=>{
      console.log(response.data)
      setProducts(response.data)
    })
  }
  
  useEffect(()=>{
    getAllProducts()
  },[])
  
  let skus = [];

    const handleCheck = (event) => {
      skus = [...checked];
      if (event.target.checked) {
        skus = [...checked, event.target.value];
      } else {
        skus.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(skus);
    };

    const deletePro = () =>{
       
          for(let i = 0; i < checked.length; i++){
            ProductsPoints.deleteProduct(checked[i]).then(res=>window.location.reload())
          }
          
      }



  return (
    <div className='container'>
      <div className='header'>
        <Typography>
        <div className='logo'>
        <h1>
          Products List
        </h1>
        </div>
        <div className='actions'>
        <Link to="add-product" className='link'>
          ADD
        </Link>
          <Button
          color='white'
            // disabled={checked.length <= 0}
            onClick={() => deletePro()}
          >MASS DELETE</Button>
        </div>
        </Typography>
      <div className='line'></div>
      </div>
      <div className='products'>
        {
         products.length && products[0].map(product=>(
            <div className='individual'>
           <Box>
             <Card variant='outline' className='content'>
               <CardContent>
                 <div className='checkbox'>
                   <Checkbox 
                   className='delete-checkbox'
                   value={product.sku}
                   onChange={handleCheck}
                   ></Checkbox>
                 </div>
                 <div className='properties'>
                 <div> {product.sku} </div> 
                 <div>{product.name}</div>
                 <div>{product.price} $</div>
                 <div>Size {product.size}MB</div>
                 </div>
               </CardContent>
             </Card>
           </Box>
           </div>
          ))
        }
          {
         products.length && products[1].map(product=>(
            <div className='individual'>
           <Box>
             <Card variant='outline' className='content'>
               <CardContent>
                 <div className='checkbox'>
                 <Checkbox 
                   value={product.sku}
                   onChange={handleCheck}
                   ></Checkbox>
                 </div>
                 <div className='properties'>
                <div> {product.sku} </div> 
                 <div>{product.name}</div>
                 <div>{product.price} $</div>
                 <div>Wegiht {product.weight}KG</div>
                 </div>
               </CardContent>
             </Card>
           </Box>
           </div>
          ))
        }
         {
         products.length && products[2].map(product=>(
            <div className='individual'>
           <Box>
             <Card variant='outline' className='content'>
               <CardContent>
                 <div className='checkbox'>
                 <Checkbox 
                   value={product.sku}
                   onChange={handleCheck}
                   ></Checkbox>
                 </div>
                 <div className='properties'>
                 <div> {product.sku} </div> 
                 <div>{product.name}</div>
                 <div>{product.price} $</div>
                 <div>Dimensions {`${product.height}x${product.width}x${product.length}`}</div> 
                 </div>
               </CardContent>
             </Card>
           </Box>
           </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProductsList