import { createServer } from 'http';


const PORT = 3000;

async function handler(request, response) {
    if(request.method === 'POST' && request.url.includes('cart')){
        for await(const data of request){
            const item = JSON.parse(data);
            console.log('received', item);
            return response.end(`proccess succeeded for ${item.id}`);
        }
        
    }
    return response.end('hey!');
    
}

createServer(handler).listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});