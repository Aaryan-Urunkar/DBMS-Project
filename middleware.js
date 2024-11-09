import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
// import { User } from '@/models/User';

async function verifyJWT(token, secret) {
    const [header, payload, signature] = token.split('.');
  
    // Decode payload for inspection; no signature verification on edge
    const jsonPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return jsonPayload;
  }
 
export async function middleware(request) {
    
    console.log(request.nextUrl.pathname);
    
    if(request.nextUrl.pathname.startsWith("/buyer/dashboard")){
      const role = await cookies(request).get('role');
      console.log(role.value);
      if(role.value !== "buyer"){
        return NextResponse.redirect("http://localhost:3000/")
      }
      return NextResponse.next();
    }

    if(request.nextUrl.pathname.startsWith("/auction-house-admin/dashboard")){
      const role = await cookies(request).get('role');
      if(role.value !== "auction house admin"){
        return NextResponse.redirect("http://localhost:3000/")
      }
      return NextResponse.next();
    }

    if(request.nextUrl.pathname.startsWith("/consignor/dashboard") || request.nextUrl.pathname.startsWith("/consignor/add-lot/")){
      const role = await cookies(request).get('role');
      if(role.value !== "consignor"){
        return NextResponse.redirect("http://localhost:3000/login")
      }
      return NextResponse.next();
    }    

    //Functionality to be added is that the jwt token should be sent in the header of every request apart from login and register
    const jwtToken = request.headers.get("authorization");
    const token = jwtToken.split(' ')[1]
    
    const payload = await verifyJWT(token, process.env.JWT_SECRET);

    if (!payload) {
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
    
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId);
    response.headers.set('x-user-name', payload.name);
    
    console.log("Midleware successful on " + request.nextUrl.pathname);
    return response;
}

export const config = {
    matcher: ['/api/auction-house/create' , 
      '/api/user/set-role' ,
      '/api/auction-house/',
      "/api/lot/create",
      "/api/lot/fetch",
      "/api/auction-house/creator",
      "/api/auction-house/delete",
      "/buyer/dashboard" ,
      "/auction-house-admin/dashboard" , 
      "/consignor/dashboard", 
      "/consignor/add-lot/:id*",
       ],
}