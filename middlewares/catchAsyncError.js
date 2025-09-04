export const catchAsyncError = (theFunction) => {
    return(req, res, next) => {
        Promise.resolve(theFunction(req, res, next)).catch(next);
        // The above line ensures that any error thrown in the async function is caught and passed to the next middleware
        // This is useful for handling errors in asynchronous code without having to use try-catch blocks
        };
    };
