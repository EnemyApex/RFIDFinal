import {NextResponse} from 'next/server';
import {kv} from '@vercel/kv';
const KEY='rfidlib:books';
export async function GET(){
 try{const books=await kv.get(KEY)||[];return NextResponse.json(books)}catch{return NextResponse.json([])}
}
export async function POST(req:Request){
 const{uid}=await req.json();
 try{
  let books:any[]=(await kv.get(KEY) as any[])||[];
  let book=books.find((b:any)=>b.uid===uid);
  if(!book){book={uid,title:`Livre ${uid.slice(0,4)}`,status:'emprunté',lastScan:new Date().toLocaleString(),history:1};books.push(book)}
  else{book.status=book.status==='disponible'?'emprunté':'disponible';book.lastScan=new Date().toLocaleString();book.history++}
  await kv.set(KEY,books);
  return NextResponse.json(book);
 }catch{return NextResponse.json({ok:true})}
}
