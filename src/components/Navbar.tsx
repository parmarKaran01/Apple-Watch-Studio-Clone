import Image from "next/image";
import styles from "./Navber.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Image
        src={
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-design-studio-logo?wid=236&hei=52&fmt=jpeg&qlt=90&.v=1566849941844"
        }
        alt="apple-logo"
        width={90}
        height={19}
      />
    </div>
  );
};

export default Navbar;
