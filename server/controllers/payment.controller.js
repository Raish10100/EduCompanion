const getRazorpayApiKey = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Razorpay API key",
        key: process.env.RAZORPAY_KEY_ID
    });
}



export {
    getRazorpayApiKey,
}