/*
-> enriquecimento de dados!

1 - ler do banco
2 - bater em uma api para pegar o resto das informações
3 - submeter os dados para outra api
*/

import axios from 'axios';

const myDb = async () => Array.from({length:1000}, (value, index) => `${index}-cellphone`);

const PRODUCTSURL = 'http://localhost:3333/products';
const CARTURL = 'http://localhost:3000/cart';

/*
//normal async function
async function processDbData(){
    const products = await myDb();
    const responses = [];

    for(const product of products){
        const { data: productInfo } = await axios.get(`${PRODUCTSURL}?productName=${product}`);
        const { data: cartData } = await axios.post(CARTURL, productInfo);
        //console.log('productInfo', productInfo);
        responses.push(cartData);
    }

    return responses;
}
console.table(await processDbData());
*/

//async generator function
async function* processDbDataGen(){
    const products = await myDb();

    for(const product of products){
        const { data: productInfo } = await axios.get(`${PRODUCTSURL}?productName=${product}`);
        const { data: cartData } = await axios.post(CARTURL, productInfo);
        yield cartData;
    }
}

//lista os dados de acordo com a disponibilidade
for await(const data of processDbDataGen()){
    console.table(data);
}