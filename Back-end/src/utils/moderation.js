const axios = require("axios");

const moderate = async (message) => {
    const response = await axios.post(`${process.env.ACS_API}/Screen?autocorrect=True&classify=True&language=eng`,
        message.content, {
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.ACS_KEY,
                "Content-Type": "text/plain"
            }
        })
    return !!response.data.Classification.ReviewRecommended;
}

module.exports = moderate
