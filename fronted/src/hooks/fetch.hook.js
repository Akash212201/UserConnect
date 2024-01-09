import axios from 'axios';
import {useState,useEffect} from 'react'
import { getUsername } from '../validation/helper';

axios.defaults.baseURL='http://localhost:8080';

function useFetch(query){
    const [getData, setData] = useState({isLoading: false,apiData: undefined, status: null, serverError:null});

    useEffect(() => {
     const fetchData= async()=>{
        try {
            setData(e=>({...e, isLoading: true}))
            const {username} = !query? await getUsername() : '';
            const {data,status}=!query? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`)

            if(status===201){
                setData(e=>({...e, isLoading: false}))
                setData(e=>({...e, apiData: data,status:status}))
            }
            
            setData(e=>({...e, isLoading: false}))
        }catch (error) {
            setData(e=>({...e, isLoading: false, serverError:null}))
        }
     };
     fetchData();
    }, [query]);
    return [getData, setData];
    
}
export default useFetch;