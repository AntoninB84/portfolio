import type { NextRequest } from 'next/server';
import { NextResponse } from "next/server";
import { createReadStream } from 'fs'; // Streaming module for reading
import { fetchObjectImageById } from '@/lib/_dao/objectImage-dao';

const APP_PATH = process.env.APP_ROOT_PATH;
const MEDIA_ROOT_PATH = `${ APP_PATH }/public/uploads/`;

async function MediaStreamIcon( request: NextRequest ) {

  const responseHeader = new Headers( request.headers );
  const requestUrl = new URL( request.url ).searchParams;
  const id = requestUrl.get('id');

  if ( id ) {
    const objectImage = await fetchObjectImageById(id);

    if ( objectImage && objectImage.filename ) {
      responseHeader.set( 'Content-Type', 'image' );
      const stream = createReadStream( MEDIA_ROOT_PATH + objectImage.filename );
      return new Response( stream as any, { headers: responseHeader });
    }
  }

  return NextResponse.json({ message: 'Media not found。' }, { status: 404 });
}

export { MediaStreamIcon as GET }