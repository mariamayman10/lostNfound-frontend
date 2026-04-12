import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, `users/${userId}/notifications`),
      orderBy("created_at", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data)

      setNotifications(data);

      // count unread
      const unread = data.filter((n) => !n.seen).length;
      setUnreadCount(unread);
    });

    return () => unsubscribe();
  }, [userId]);

  return { notifications, unreadCount };
}
