import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-[500px] bg-[#2b323f] pt-[100px]">
      <div className="w-full border-b border-[#3c424e] pb-15">
        <div
          className="
        flex justify-between w-[1200px] m-auto text-[#c3c5c9]
        [&_p]:py-3
        [&_li]:py-3
        [&_a]:hover:underline
        [&_ul]:min-w-[360px]
        "
        >
          <ul>
            <li>
              <h1
                className="text-[18px] text-white italic mb-2"
                style={{
                  fontFamily: "serif",
                  fontWeight: "400",
                  letterSpacing: "2px",
                }}
              >
                LORO PEVERIENTE
              </h1>
              <p>Customer service:</p>
              <p>Mon - Fri: 08:00 - 21:00</p>
              <p>Sat and Sun: 09:00 - 18:00</p>
            </li>
          </ul>
          <ul>
            <li>
              <h1
                className="text-[18px] text-white"
                style={{
                  fontFamily: "serif",
                  fontWeight: "400",
                  letterSpacing: "2px",
                }}
              >
                Quick links
              </h1>
            </li>
            <li>
              <Link href="/contacts" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:underline">
                Refund & Return Policy
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:underline">
                Track Your Order
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <h1
                className="text-[18px] text-white"
                style={{
                  fontFamily: "serif",
                  fontWeight: "400",
                  letterSpacing: "2px",
                }}
              >
                Got a question?
              </h1>
            </li>
            <p>contact@loropeveriente.com</p>
          </ul>
        </div>
      </div>
    </footer>
  );
}
