import config from "../../modules/config.js"

export default async function (request, response)
{
    try
    {
        let returnObjectJson = {config: config};

        return response.status(200).json(returnObjectJson);

    }
    catch (error)
    {
        console.error(error.message);
        return response.status(500).json({errors: [{msg: "Server error"}]});
    }
}