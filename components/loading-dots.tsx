import styles from "@/components/loading-dots.module.css";

export default function LoadingDots({ color = "#000" }: { color?: string }) {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
}
