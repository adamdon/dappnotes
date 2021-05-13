export default function (error, request, response, next)
{
    if (error instanceof SyntaxError)
    {
        if(error.type === "entity.parse.failed")
        {
            return response.status(500).json({errors: [{message: "JSON parse failed"}]});
        }
        else
        {
            return response.status(500).json({errors: [{message: "SyntaxError " + error.type}]});
        }
    }
    else
    {
        next();
    }
}