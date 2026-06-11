"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
import api from "../../../lib/axios";
import { MessageSquare, RefreshCcw } from "lucide-react";
import { io, Socket } from "socket.io-client";

export default function OrderDetail() {
  const { id } = useParams();
  const { user, token } = useAuthStore();
  const [order, setOrder] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();

    // Fetch Chat History
    const fetchChat = async () => {
       try {
         const res = await api.get(`/chat/${id}`);
         setChatMessages(res.data);
       } catch (err) {
         console.error(err);
       }
    };
    fetchChat();
  }, [id]);

  useEffect(() => {
    if (!token) return;
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001", {
       auth: { token },
       transports: ["websocket"]
    });
    
    socketInstance.emit("joinOrder", { orderId: Number(id) });
    
    socketInstance.on("newMessage", (msg) => {
       setChatMessages(prev => [...prev, msg]);
    });

    setSocket(socketInstance);

    return () => {
       socketInstance.disconnect();
    };
  }, [id, token]);

  const handleSendMessage = (e: React.FormEvent) => {
     e.preventDefault();
     if (!messageText.trim() || !socket) return;
     
     socket.emit("sendMessage", {
        orderId: Number(id),
        message: messageText
     });
     
     setMessageText("");
  };

  const handleUpdateStatus = async (status: string) => {
     try {
       await api.patch(`/orders/${id}/status`, { status });
       // reload order
       const res = await api.get(`/orders/${id}`);
       setOrder(res.data);
     } catch(err) {
       console.error(err);
     }
  };

  if (!order) return <div className="p-8 font-mono">Retrieving Waybill...</div>;

  const isCustomer = user?.role === "CUSTOMER";
  const isTraveler = user?.role === "TRAVELER";

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-start">
         
         {/* WAYBILL SUMMARY */}
         <div className="space-y-6">
            <div className="tag-card relative overflow-hidden">
               {/* Perforated top */}
               <div className="absolute top-0 left-0 right-0 h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIiBmaWxsPSIjZjlmOWY5IiBzdHJva2U9IiMyMjIiLz48L3N2Zz4=')] bg-repeat-x"></div>
               
               <div className="p-8 mt-2">
                  <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
                     <div>
                        <h1 className="text-3xl font-display uppercase tracking-tight">Waybill #{order.id}</h1>
                        <p className="font-mono text-xs uppercase text-gray-500">Item Manifest</p>
                     </div>
                     <div className="bg-black text-[var(--color-highlight)] font-mono font-bold text-xs px-3 py-1 uppercase border border-[var(--color-highlight)] shadow-[2px_2px_0_0_#ff5500]">
                        {order.status}
                     </div>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                     <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                        <span className="text-gray-500 uppercase">Description</span>
                        <span className="font-bold text-right max-w-[200px] truncate">{order.itemName}</span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                        <span className="text-gray-500 uppercase">Quantity</span>
                        <span className="font-bold">{order.quantity}</span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                        <span className="text-gray-500 uppercase">Weight</span>
                        <span className="font-bold">{order.weightKg} KG</span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                        <span className="text-gray-500 uppercase">Price</span>
                        <span className="font-bold">Rp {order.price.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between border-b border-dashed border-gray-300 pb-2">
                        <span className="text-gray-500 uppercase">Traveler</span>
                        <span className="font-bold">{order.trip?.traveler?.user?.name}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* STATUS CONTROLS */}
            <div className="tag-card p-6">
               <h3 className="font-mono text-xs uppercase text-[var(--color-ink-muted)] mb-4 flex items-center gap-2">
                 <RefreshCcw className="w-4 h-4"/> Manifest Operations
               </h3>
               
               {isTraveler && order.status === "PENDING" && (
                  <div className="flex gap-4">
                     <button onClick={() => handleUpdateStatus("ACCEPTED")} className="flex-1 bg-black text-white font-display uppercase py-3 hover:bg-[var(--color-highlight)] hover:text-black">Accept</button>
                     <button onClick={() => handleUpdateStatus("REJECTED")} className="flex-1 border border-black font-display uppercase py-3 hover:bg-gray-100">Reject</button>
                  </div>
               )}

               {isCustomer && order.status === "ACCEPTED" && (
                  <button onClick={() => alert("Mock Midtrans Payment logic here")} className="w-full bg-[var(--color-highlight)] text-black font-display uppercase tracking-widest py-3 border border-black shadow-[4px_4px_0_0_#000]">
                     Pay Invoice
                  </button>
               )}

               {isTraveler && order.status === "PAID" && (
                  <button onClick={() => handleUpdateStatus("PURCHASED")} className="w-full bg-black text-white font-display uppercase py-3 hover:bg-[var(--color-highlight)] hover:text-black">
                     Mark Purchased
                  </button>
               )}

               {isTraveler && order.status === "PURCHASED" && (
                  <button onClick={() => handleUpdateStatus("DELIVERED")} className="w-full bg-black text-white font-display uppercase py-3 hover:bg-[var(--color-highlight)] hover:text-black">
                     Mark Delivered
                  </button>
               )}

               {isCustomer && order.status === "DELIVERED" && (
                  <button onClick={() => handleUpdateStatus("COMPLETED")} className="w-full bg-black text-white font-display uppercase py-3 hover:bg-[var(--color-highlight)] hover:text-black">
                     Confirm Receipt (Complete)
                  </button>
               )}
            </div>
         </div>

         {/* TELEMETRY / CHAT */}
         <div className="tag-card flex flex-col h-[600px]">
            <div className="border-b-2 border-black p-4 bg-black text-white flex items-center gap-2">
               <MessageSquare className="w-5 h-5 text-[var(--color-highlight)]" />
               <span className="font-display uppercase tracking-widest">Comm Link</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
               {chatMessages.length === 0 ? (
                  <div className="text-center font-mono text-xs uppercase text-gray-400 mt-10">No comms established</div>
               ) : (
                  chatMessages.map((msg, i) => {
                     const isMe = msg.senderId === user?.id;
                     return (
                       <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                          <span className="font-mono text-[10px] uppercase text-gray-500 mb-1">{isMe ? "You" : "Operator"}</span>
                          <div className={`px-4 py-2 font-mono text-sm max-w-[80%] border ${isMe ? 'bg-black text-white border-black' : 'bg-white border-black shadow-[2px_2px_0_0_#000]'}`}>
                             {msg.message}
                          </div>
                       </div>
                     );
                  })
               )}
            </div>

            <form onSubmit={handleSendMessage} className="border-t-2 border-black p-4 bg-white flex gap-2">
               <input
                 type="text"
                 className="flex-1 border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
                 placeholder="Transmit message..."
                 value={messageText}
                 onChange={e => setMessageText(e.target.value)}
               />
               <button type="submit" className="bg-black text-white px-4 font-mono uppercase text-xs hover:bg-[var(--color-highlight)] hover:text-black transition-colors">
                  Send
               </button>
            </form>
         </div>

      </div>
    </div>
  );
}
