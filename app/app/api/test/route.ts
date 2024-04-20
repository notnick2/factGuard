export async function POST(inputvalue: string) {
    const res = await fetch('http://127.0.0.1:5000/generate-response', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ video_id: inputvalue }),
    })
    const data = await res.json()
    return Response.json({data})
}
