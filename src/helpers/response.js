const errorResponse = (res,status,message = null,data = null) => {
    res.status(status).json({title:'ERROR_PROCESSING',message,data})
}
const successResponse = (res,status,data = null) => {
    res.status(status).json({title:'SUCCESS',data})
}

export {errorResponse,successResponse}