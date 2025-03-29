export async function POST(params){
    const {prompt} = await req.json();

    try{
        const result = await chatSession.sendmessage(prompt);
        const AIResp = result.response.text();

        return NextResponse.json({result:AIResp})
    }catch(e){
        return NextResponse.json({error:e})
    }
}