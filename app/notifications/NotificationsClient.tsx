

"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
 
export default function NotificationsClient() {
  useEffect(() => {
    // 🔎 Debug
    console.log("🔑 Pusher Key:", process.env.NEXT_PUBLIC_PUSHER_APP_KEY);
    console.log("🌍 Pusher Cluster:", process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
 
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
 
    if (!key || !cluster) {
      console.error("❌ Missing Pusher key/cluster. Check .env.local");
      return;
    }
 
    const pusher = new Pusher(key, { cluster });
 
    const channel = pusher.subscribe("notifications");
    channel.bind("new-event", (data: any) => {
      alert("🔔 " + JSON.stringify(data));
    });
 
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
 
  return null;
}