import axios from 'axios'
import jquery from 'jquery'

// export default axios.create({
//     baseURL: 'http://localhost:4000/',
//     withCredentials: false,
// })


jquery.ajaxSetup({
    url: 'http://localhost:4000/',
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
})

export default jquery