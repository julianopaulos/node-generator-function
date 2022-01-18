import { createServer } from 'http';
import { parse } from 'url';
import { randomUUID } from 'crypto';

const PORT = 3333;

async function handler(request, response) {
    if(request.method === 'GET' && request.url.includes('products')){
        const { query: { productName } } = parse(request.url, true);
        const result = {
            id: randomUUID(),
            product: productName
        }
        return response.end(JSON.stringify(result));
    }
    
}

createServer(handler).listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});