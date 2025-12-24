import Link from "next/link";

interface IProps {
  text: string;
  variant?: "black";
  customStyles?: string;
  href: string;
}

export default function ButtonCommonLink({
  text,
  href,
  customStyles = "",
  variant = "black",
}: IProps) {
  const variantStyles =
    variant === "black" ? "text-white bg-black px-[40px] py-[10px]" : "";

  return (
    <Link
      href={href}
      className={`inline-block ${variantStyles} ${customStyles}
          transition-transform
          duration-100
          ease-out
          hover:scale-105
        `}
    >
      <span style={{ fontFamily: "serif", fontSize: "14px" }}>{text}</span>
    </Link>
  );
}
