import styles from "./Counter.module.scss";
import Button from "shared/Button/Button";

type CounterProps = {
  counters: { title: string; value: number }[];
};

const Counter = ({ counters }: CounterProps) => {
  return (
    <div className={styles.wrapper}>
      {counters.map((counter) => (
        <Button key={counter.title}>
          <div className={styles.btnContent}>
            <p>{counter.title}</p>
            {counter.value}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default Counter;
