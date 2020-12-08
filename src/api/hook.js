import axios from 'axios'

export async function sendPost(url='',data={}){
	var head = {'Content-Type': 'application/json;charset=UTF-8'}
	let res
	try{
		const response = await axios.post(url, data, head)
		res = response.data
		if (res[0].success){
			return res.slice(1)
		}else if (!res[0].sucsess){
			throw new Error('Please try again')
		}
		throw new Error(response.statusText) 
	}catch (err){
    		return Promise.reject(err.message ? err.message : res)
	}
}
//EOF
