import Router from "../utilities/router";

const router = new Router();

async function required(request: any){
    try {
        const { code } = await request.json();
        const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                },
                body: JSON.stringify({"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET, "code": code}),
            }
        )
        if (response.status >= 400) {
            throw new Error('Bad response from server')
          }
        
        const result: any = await response.json()
        const headers = {
            "Access-Control-Allow-Origin": "*",
        };

        if (result.error) {
            return new Response(JSON.stringify(result), { status: 401, headers });
        }

        return new Response(JSON.stringify({ token: result.access_token }), {
            status: 201,
            headers,
        });
    } catch (error: any) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
        });
    }
}

router.get("/", async (request) => {
    await required(request);
	return Response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,
        302
    );
});

export default router;