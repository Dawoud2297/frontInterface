import axios from "axios";

export default axios.create({
    baseURL : 'http://localhost/startPHP/products2/backend/index.php',
    headers : {
        "content-type" : "application/json"
    }
})