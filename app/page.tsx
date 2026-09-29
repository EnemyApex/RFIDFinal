"use client"
import {useEffect,useState} from 'react';
export default function Page(){
const[books,setBooks]=useState<any[]>([]);
useEffect(()=>{const load=()=>fetch('/api/rfid').then(r=>r.json()).then(setBooks);load();setInterval(load,2000)},[]);
return(<main className="p-6 max-w-6xl mx-auto">
<h1 className="text-4xl font-serif font-bold">RFIDlib.</h1>
<p className="text-zinc-500 text-sm mb-6">{books.length} livres en base KV</p>
<div className="grid grid-cols-1 gap-4">
{books.map((b:any)=><div key={b.uid} className="bg-white p-5 rounded-[20px] border">
<h3 className="font-serif">{b.title}</h3>
<p className="text-[10px] text-zinc-400">{b.uid}</p>
<span className={`text-xs px-2 py-1 rounded-full ${b.status==='disponible'?'bg-green-100':'bg-red-100'}`}>{b.status}</span>
<p className="text-xs text-zinc-400 mt-1">{b.lastScan}</p>
</div>)}
{books.length===0 && <p className="text-zinc-400">Aucun scan. Badgez ton ESP32...</p>}
</div></main>)}
