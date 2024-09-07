import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { fetchNotifications } from "../services/notification-endpoints";
import Loader from "../components/loader.component";
import NotificationCard from "../components/notification-card.component";
import LoadMoreButton from "../components/load-more.component";
import AnimationWrapper from "../common/page-animation";

const NotificationsPage = () => {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const {
    user: { token },
  } = useAuth();

  useEffect(() => {
    if (token) {
      fetchNotifications({
        token,
        filter: filter !== "all" ? filter : null,
      })
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const fetchMoreFn = ({ page, append = false }) => {
    fetchNotifications({
      token,
      filter: filter !== "all" ? filter : null,
      page,
    })
      .then((newData) => {
        setData((prev) => ({
          notifications: [...prev.notifications, ...newData.notifications],
          pagination: newData.pagination,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { notifications } = data || {};
  return (
    <div>
      <h1 className="max-md:hidden">Recent Notifications</h1>

      {notifications === null && <Loader />}
      {notifications &&
        notifications.length &&
        notifications.map((notification, index) => (
          <AnimationWrapper transition={{ delay: index * 0.05 }} key={index}>
            <NotificationCard
              setNotifications={setData}
              key={index}
              index={index}
              from={notification.user}
              notify_for={notification.notification_for}
              notification={notification}
              notifications={notifications}
            />
          </AnimationWrapper>
        ))}

      {data && data?.pagination?.nextPage && (
        <LoadMoreButton
          fetchMoreFn={fetchMoreFn}
          pagination={data.pagination}
        />
      )}
      {notifications && !notifications.length && <h1>Not yet</h1>}
    </div>
  );
};

export default NotificationsPage;
