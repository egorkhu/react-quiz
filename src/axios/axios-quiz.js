import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-egorkhu-default-rtdb.firebaseio.com/'
})