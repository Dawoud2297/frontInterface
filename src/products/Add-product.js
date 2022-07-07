import {useEffect, useState} from 'react'
import {Button, Typography, TextField, FormControl, MenuItem, InputLabel, Select, FormLabel} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import ProductsPoints from './connection/points'

const AddProduct = () => {
  const [switcher, setSwitcher] = useState('')
  const [dataDvd, setDataDvd] = useState({name : '', price:'',sku:'',size:''})
  const [dataBook, setDataBook] = useState({name : '', price:'',sku:'',weight:''})
  const [dataFurniture, setDataFurniture] = useState({name : '', price:'',sku:'',height:'',width:'',length:''})
  const [rare, setRare] = useState(0)

  const navigate = useNavigate();

  const handleSwitcher = e =>{
    setSwitcher(e.target.value)
  }


  useEffect(()=>{
    const rand = Math.floor(Math.random()*100) 
    setRare(prev => (prev+rand))
  },[dataBook.name,dataDvd.name,dataFurniture.name])

  const handleSubmit = e =>{ 
    e.preventDefault();
    ProductsPoints
    .addOne(switcher === 'dvd' ? dataDvd : (switcher === 'book' ? dataBook : (switcher === 'furniture' ? dataFurniture : null)))
    .then(response=>{
      console.log(response.data)
      if(response.data.message === "Failed to create record!"){
        alert('Aomething  went weong')
      }
    }
      ).catch((error)=>{
      console.log(error);
    });
    navigate('/')
  }


  return (
    <div className='container'>
    <div className='header'>
      <Typography>
      <div className='logo'>
      <h1>
        Add Product
      </h1>
      </div>
      <div className='actions'>
       
        <Link to="/" className='link'>Cancel</Link>
      </div>
      </Typography>
    <div className='line'></div>
    </div>
    <div className='productsForm'>
      <div className='dropdown'>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="productType"
    value={switcher}
    onChange={handleSwitcher}
  >
    <MenuItem value={'dvd'}>DVD</MenuItem>
    <MenuItem value={'book'}>Book</MenuItem>
    <MenuItem value={'furniture'}>Furniture</MenuItem>
  </Select>
</FormControl>
      </div>
        <form onSubmit={handleSubmit} id='product_form'>
            <Typography>
            <FormControl fullWidth style={{marginTop:'30px'}}>
               <FormLabel>Name :</FormLabel>
            <TextField type='text' id='name' required value={switcher === 'dvd' ? dataDvd.name : (switcher === 'book' ? dataBook.name : (switcher === 'furniture' ? dataFurniture.name : ''))}
             onChange={switcher === 'dvd' ? e=>setDataDvd({...dataDvd, name :e.target.value}) : (switcher === 'book' ? e=>setDataBook({...dataBook, name : e.target.value}) : e=>setDataFurniture({...dataFurniture, name : e.target.value}))}
            />
            </FormControl>
            <FormControl fullWidth style={{marginTop:'30px'}}>
               <FormLabel>Price $:</FormLabel>
            <TextField
            type='number'
            id='price'
            required
            value={switcher === 'dvd' ? dataDvd.price : (switcher === 'book' ? dataBook.price : (switcher === 'furniture' ? dataFurniture.price : ''))}
             onChange={switcher === 'dvd' ? e=>setDataDvd({...dataDvd, price :e.target.value}) : (switcher === 'book' ? e=>setDataBook({...dataBook, price : e.target.value}) : e=>setDataFurniture({...dataFurniture, price : e.target.value}))}
            />
            </FormControl>
            <FormControl fullWidth style={{marginTop:'30px'}}>
               <FormLabel>Sku :</FormLabel>
            <TextField
            id='sku'
             disabled
              value={switcher === 'dvd' ? dataDvd.sku = `DVDSku${rare}_${dataDvd.name}` : (switcher === 'book' ? dataBook.sku = `BOOKSKU${rare}_${dataBook.name}` :(switcher === 'furniture' ? dataFurniture.sku = `FURNISKU${rare}_${dataFurniture.name}` : ' '))}
              onChange={switcher === 'dvd' ? e=>setDataDvd({...dataDvd, sku :e.target.value}) : (switcher === 'book' ? e=>setDataBook({...dataBook, sku : e.target.value}) : e=>setDataFurniture({...dataFurniture, sku : e.target.value}))}
              />
            </FormControl>
            <FormControl fullWidth style={{marginTop:'30px'}}>
              {
               switcher === 'dvd' ? (<FormLabel>size MB:</FormLabel>) : (switcher === 'book' ? <FormLabel>Weight Kg:</FormLabel> : (switcher === 'furniture' ? <FormLabel>Dimensions HxWxL:</FormLabel> : ''))
              }
              {
                switcher === 'dvd' ? <TextField type='number' id='size' value={dataDvd.size} required onChange={e=>setDataDvd({...dataDvd,size : e.target.value})}/> :
                (switcher === 'book' ? <TextField type='number' id='weight' value={dataBook.weight} required onChange={e=>setDataBook({...dataBook,weight : e.target.value})}/> : 
                (switcher === 'furniture' ? 
               ( <>
               <FormControl>
               <FormLabel>height :</FormLabel>
               <TextField type='number' id='height' placeholder='height' value={dataFurniture.height} required onChange={e=>setDataFurniture({...dataFurniture, height: e.target.value})}/>
               </FormControl>
               <FormControl>
               <FormLabel>width :</FormLabel>
                <TextField type='number' id='width' placeholder='width' value={dataFurniture.width} required onChange={e=>setDataFurniture({...dataFurniture, width: e.target.value})}/>
               </FormControl>
               <FormControl>
                <FormLabel>length :</FormLabel>
                <TextField type='number' id = 'length' placeholder='length' value={dataFurniture.length} required onChange={e=>setDataFurniture({...dataFurniture, length: e.target.value})}/>
               </FormControl>
               </>
                ): ''))
              }
            </FormControl>
            </Typography>
            <Button type='submit' size='big' color='primary' style={{marginTop:'10px'}} variant='contained'>
            Save
        </Button>
        </form>
    </div>
  </div>
  )
}

export default AddProduct;

