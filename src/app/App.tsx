import styles from "./App.module.scss";
import { AppRoutes } from "./routes/AppRoutes.tsx";

function App() {
  return (
    <div className={styles.app}>
      {/*<Link to={"/auth"} className={styles.link}>auth</Link>*/}
      {/*<Link to={"/chat"} className={styles.link}>chat</Link>*/}
      <AppRoutes />
    </div>
  );
}

export default App;
