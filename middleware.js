import { NextResponse } from 'next/server'

async function verifyJWT(token, secret) {
    const [header, payload, signature] = token.split('.');
  
    // Decode payload for inspection; no signature verification on edge
    const jsonPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return jsonPayload;
  }
 
export async function middleware(request) {
    
    // console.log(request.nextUrl.pathname);
    

    //Functionalioty to be added is that the jwt token should be sent in the header of every request apart from login and register
    const jwtToken = request.headers.get("authorization");
    const token = jwtToken.split(' ')[1]
    
    const payload = await verifyJWT(token, process.env.JWT_SECRET);

    if (!payload) {
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
    
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId);
    response.headers.set('x-user-name', payload.name);
    
    return response;
}

export const config = {
    matcher: ['/api/auction-house/create' , '/api/user/set-role'],
  }