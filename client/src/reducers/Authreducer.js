import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState={
    token:"",
    loading:false,
    error:""
} 
const fetch1 = async (api,body)=>{
    console.log(body)
    const res = await fetch(api,{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(body)
    })
    return res.json()

}
export const createuser = createAsyncThunk(
    'create',
    async (body)=>{
        console.log(body)
        const result = await fetch1('http://localhost:5000/signup',body)
        return result
    }
)

export const signed = createAsyncThunk(
    'signed',
    async(body)=>{
        console.log(body)
        const result = await fetch1('http://localhost:5000/signin',body)
        return result
    }
)

const Authreducer =createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(createuser.fulfilled,(state,action)=>{
            if(action.payload.error){
            state.error = action.payload.error
            console.log(action.payload)
            }
            else{
                console.log(action.payload)
                state.error = ""
            }
        })
        builder.addCase(signed.fulfilled,(state,action)=>{
            if(action.payload.error){
                state.error = action.payload.error
            }
            state.token=action.payload.token
            localStorage.setItem("token",action.payload.token)
        })
    }

})
export default Authreducer.reducer