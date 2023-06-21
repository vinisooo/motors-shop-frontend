const baseUrl='http://localhost:3001'

async function getData(url:string='',method:'GET'| 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET', body=undefined ) {
    
    let response:string | Promise<any>
    let res
    
    switch(method){
        case 'POST':
        case 'PATCH':
        case 'PUT':
            res = await fetch(`${baseUrl}${url}`,{
                method: method,
                body,
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!res.ok) {
              throw new Error('Failed to fetch data')
            }
            response = await res.json()
            break
        case "DELETE":
            console.log('configurar delete')
            response='deletar'
            break
        case "GET":
        default:
            res = await fetch(`${baseUrl}${url}`,{
                method: method,
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            response = await res.json()
        }
        
       return response
}

export {getData}