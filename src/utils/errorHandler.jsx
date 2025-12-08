export const formatedError = (error)=>{
    const { status , data } = error?.response;
    console.log("error get", status, data)
    if(status>=500 && status<600){
        return "Somthing wend wrong on Server side!";
    }else if(status>=400 && status<500){
        return data.message;
    }else{
        return "Something went wrong";
    }
}