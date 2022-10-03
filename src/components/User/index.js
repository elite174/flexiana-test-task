import styles from "./User.module.css";

export const User = ({ data }) => (
  <div className={styles.container}>
    <img className={styles.image} src={data.avatar_url} alt={data.login} />
    <a href={data.html_url} target="_blank">
      {data.login}
    </a>
  </div>
);
