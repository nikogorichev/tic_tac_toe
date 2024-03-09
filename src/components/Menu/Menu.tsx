import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectionMenu}>
        <p>Выберите, чем будет играть первый игрок</p>
        
        <div className={styles.buttons}>
          <Button theme={ThemeButton.GREY}>X</Button>
          <Button theme={ThemeButton.GREY}>0</Button>
        </div>
        <p>Помните, что Х ходит первым</p>
      </div>
      <Button>Новая игра против компьютера</Button>
      <Button theme={ThemeButton.SECONDARY}>
        Новая игра против другого игрока
      </Button>
    </div>
  );
};

export default Menu;
