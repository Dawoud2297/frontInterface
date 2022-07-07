import http from './http-common';

class ProductsPoints{
    getAll(){
        return http.get('/')
    }
    addOne(data){
        return http.post('/',data)
    }
    deleteProduct(getSkuAndDelete){
        return http.delete(`?sku=${getSkuAndDelete}`)
    }
}
export default new ProductsPoints();