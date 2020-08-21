import axiosWithAuth from '../auth/axiosWithAuth'

export const fetchColors = async () => {
    return axiosWithAuth().get('/api/colors')
}
