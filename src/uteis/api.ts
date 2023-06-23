const baseUrl='http://localhost:3001'

interface config{
    method?:'GET'| 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?:any 
    headers?:{
        "Content-Type"?:string,
        Authorization?:string
    }
    next?:{
        revalidate?: number
    }
    cache?: "force-cache"| "reload" | "no-cache" | "no-store" | "only-if-cached" | "default"
}

async function getData(url:string='',config:config={body:null,headers:{"Content-Type":'',Authorization:''},method:'GET',cache:"force-cache"} ) {

    const {body,headers,method,next,cache}=config
    const head= !headers ? {"Content-Type":"application/json"} : {"Content-Type":"application/json",...headers}
    
    let response:string | Promise<any>
    let res
    

    switch(method){
        case 'POST':
        case 'PATCH':
        case 'PUT':
            try{
                res = await fetch(`${baseUrl}${url}`,{
                    method: method,
                    body,
                    headers:head,
                    next
                });
                response = await res.json()
                return response
            }catch(err){
                console.log(err)
            }
            break
        case "DELETE":
            console.log('configurar delete')
            response='deletar'
            break
        case "GET":
        default:
            try{
                res = await fetch(`${baseUrl}${url}`,{
                    method: method,
                    headers:head,
                    cache: cache || "force-cache",
                    next
                });
                response = await res.json()
                return response
            }catch(err){
                console.log(err)
            }
        }
        
}

export {getData}