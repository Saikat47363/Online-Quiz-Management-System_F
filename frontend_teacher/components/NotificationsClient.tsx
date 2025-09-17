"use client";

import { useEffect } from "react";

import Pusher from "pusher-js";
 
export default function NotificationsClient() {

  useEffect(() => {

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {

      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,

    });
 
    const channel = pusher.subscribe("notifications");

    channel.bind("new-event", (data: any) => {

      alert("🔔 Notification: " + data.message);

    });
 
    return () => {

      channel.unbind_all();

      channel.unsubscribe();

    };

  }, []);
 
  return null;

}

 