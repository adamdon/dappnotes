export default async function (request, response)
{
    try
    {
        let returnObjectJson = {text: "test"};

        return response.status(200).json(returnObjectJson);

    }
    catch (error)
    {
        console.error(error.message);
        return response.status(500).json({errors: [{msg: "Server error"}]});
    }
}