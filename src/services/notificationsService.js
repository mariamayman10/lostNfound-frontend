import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export async function markAsSeen(userId, notificationId) {
  const ref = doc(db, `users/${userId}/notifications/${notificationId}`);

  await updateDoc(ref, {
    seen: true,
  });
}
