import { useNotifications } from "../customHooks/useNotification";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { FaComment } from "react-icons/fa";

import { useState } from "react";
import { markAsSeen } from "../services/notificationsService";

function NotificationItem({ notification, userId,setOpen }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!notification.seen) {
      await markAsSeen(userId, notification.id);
    }

    if (notification.reportId) {
      navigate(`/report/${notification.reportId}`);
    }
    setOpen(false)
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-start gap-3 p-3 cursor-pointer
        transition rounded-lg
        border-b border-(--border)
        ${!notification.seen ? "bg-orange-50" : ""}
      `}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100">
        <FaComment className="text-(--secondary)" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {notification.created_at?.toDate?.().toLocaleString?.() || "Just now"}
        </p>
      </div>
      {!notification.seen && (
        <span className="w-2.5 h-2.5 bg-(--secondary) rounded-full mt-2"></span>
      )}
    </div>
  );
}

function Notifications({ user }) {
  const { notifications, unreadCount } = useNotifications(user);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mr-3">
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <IoNotifications size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-(--secondary) text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </div>
      {open && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-xl max-h-96 overflow-y-auto"
        >
          {notifications.length === 0 ? (
            <p className="p-3 text-sm text-(--text-muted)">No notifications</p>
          ) : (
            notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} userId={user} setOpen={setOpen} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
export default Notifications;
