import ButtonCommonLink from "@/components/button-common-link";

export default function Contact() {
  return (
    <div className="w-full h-[500px] flex justify-center">
      <div className="w-[726px] pt-10">
        <h1
          className="mb-5"
          style={{
            fontSize: "53px",
            fontFamily: "serif",
            fontWeight: "100",
          }}
        >
          Contact
        </h1>
        <div
          className=" [&_input]:w-[351px] [&_input]:h-[45px] [&_input]:border [&_input]:border-[#737373] [&_input]:hover:border-[#737373]
          [&_input]:text-black [&_input]:placeholder-[#9fa3a8]
            [&_input]:px-6 [&_input]:pr-12
            [&_input]:outline-none [&_input]:focus:ring-0 [&_input]:focus:border-[#000000] [&_input]:focus:border-2
            [&_input]:bg-transparent
        "
        >
          <div className="gap-5 flex">
            <input type="text" placeholder="Name" spellCheck="false" />
            <input type="email" placeholder="Email" spellCheck="false" />
          </div>
          <input
            type="text"
            className="w-full! mt-5"
            placeholder="Phone number"
          />
          <textarea
            className="w-full! min-h-[100px] text-black placeholder-[#9fa3a8] px-6 pt-2 pb-2 pr-12 
            border border-[#737373] mt-5 resize-none
            outline-none focus:ring-0 focus:border-[#000000] focus:border-2 bg-transparent"
            placeholder="Comment"
          />
          <ButtonCommonLink text="Send" href="/" customStyles="mt-10" />
        </div>
      </div>
    </div>
  );
}
