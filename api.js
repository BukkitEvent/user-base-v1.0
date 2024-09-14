const config = require('./config.json')

async function request(endpoint, options) {
    const url = 'https://discord.com/api/v10/' + endpoint

    if (options.body) options.body = JSON.stringify(options.body)
		
    const res = await fetch(url, {
    	headers: {
    		Authorization: `Bot ${process?.env?.token ?? config.token}`,
        	'Content-Type': 'application/json charset=UTF-8',
        	'User-Agent': 'UserBase/v1.0'
      	},
      ...options,
    })
    
    if (!res.ok) {
        const data = await res.json()

        throw new Error(JSON.stringify(data))
    }
    
    return res
}

module.exports = request