import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/','/sign-in(.*)', '/sign-up(.*)']);
export default clerkMiddleware((auth, request) =>{
  const { userId, orgId } = auth();

  if(!isPublicRoute(request)){
    auth().protect();
  }
  
 
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};