import styles from "./App.module.scss";
import { AppRoutes } from "./routes/AppRoutes.tsx";

function App() {
  return (
    <div className={styles.app}>
      <AppRoutes />
    </div>
  );
}

export default App;
