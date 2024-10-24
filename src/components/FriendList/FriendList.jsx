import FriendListItem from '../FriendListItem/FriendListItem.jsx';
import styles from './FriendList.module.css';

const Friendlist = ({ friends }) => {
  return (
    <ul className={styles.friendsList}>
      {friends.map(friend => (
        <li key={friend.id}>
          <FriendListItem
            avatar={friend.avatar}
            name={friend.name}
            isOnline={friend.isOnline}
          />
        </li>
      ))}
    </ul>
  );
};

export default Friendlist;
