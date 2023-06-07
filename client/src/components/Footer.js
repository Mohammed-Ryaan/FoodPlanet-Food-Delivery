import { LinkedIn } from "../assets";

const Footer = () => {
  return (
    <footer>
      <div className="text-xl text-primary flex items-center justify-between w-full p-7 bg-red-400">
        <div className="text-2xl pl-4 ">
          <p>Powered By</p>
          <p className="pl-14">Coffee</p>
        </div>
        <div className="text-2xl">
          <div className="flex items-center">
            <p>Made With</p>
            <span className="text-primary text-[35px] px-2">&#9825;</span>
          </div>
          <p className="pl-2">- Mohammed Ryaan</p>
        </div>
        <div className="flex items-start justify-start ">
          <a
            href="https://www.linkedin.com/in/mohammed-ryaan-0168891b8?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BnvGaEOVvTQWzMxR%2Bra8gCg%3D%3D"
            className="px-4 border-r border-r-primary"
            target="_blank"
          >
            <p className="text-black text-[40px]">&#9825;</p>
          </a>
          <a
            href="https://github.com/Mohammed-Ryaan"
            className="px-4 border-r border-r-primary"
            target="_blank"
          >
            <svg
              class="w-6 h-6"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.258.793-.574 0-.283-.012-1.03-.015-2.023-3.344.724-4.043-1.61-4.043-1.61-.547-1.39-1.336-1.76-1.336-1.76-1.09-.745.084-.73.084-.73 1.207.086 1.84 1.238 1.84 1.238 1.07 1.835 2.805 1.305 3.487.997.108-.77.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.534-1.523.104-3.176 0 0 1.007-.322 3.3 1.23.955-.27 1.98-.405 3-.41 1.02.004 2.045.14 3 .41 2.29-1.552 3.295-1.23 3.295-1.23.64 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.368.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .31.192.688.795.57C20.565 21.793 24 17.3 24 12c0-6.63-5.37-12-12-12zm0 0"></path>
            </svg>
          </a>
          <a
            href="https://instagram.com/mohammedryaan20"
            className="px-4 border-r border-r-primary"
            target="_blank"
          >
            &#129293;
          </a>
        </div>
      </div>
    </footer>
    // <footer class="bg-red-400">
    //   <div class="social-media-icons flex justify-center">
    //     <a href="https://www.linkedin.com/" target="_blank">
    //       <svg
    //         class="w-6 h-6"
    //         fill="white"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M21.6 0H2.4C1.1 0 0 1.1 0 2.4v19.2C0 22.9 1.1 24 2.4 24h19.2c1.3 0 2.4-1.1 2.4-2.4V2.4C24 1.1 22.9 0 21.6 0zm-5 18h-3v-4.9c0-1.2-.024-2.8-1.7-2.8-1.702 0-2 1.332-2 2.7V18h-3V6h3v1.4h.036c.476-.9 1.636-1.8 3.564-1.8 3.804 0 4.5 2.506 4.5 5.75V18zm0 0"></path>
    //       </svg>
    //     </a>
    //     <a href="https://github.com/" target="_blank">

    //     </a>
    //     <a href="https://www.instagram.com/" target="_blank">
    //       <svg
    //         class="w-6 h-6"
    //         fill="white"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M12 0a5.45 5.45 0 0 1 3.864 1.6A5.394 5.394 0 0 1 17.6 6.126a5.45 5.45 0 0 1-1.6 3.864A5.393 5.393 0 0 1 12 11.4a5.45 5.45 0 0 1-3.864-1.6A5.394 5.394 0 0 1 6.4 6.126 5.45 5.45 0 0 1 8 2.262 5.393 5.393 0 0 1 12 0zm0 1.2a4.243 4.243 0 0 0-3.005 1.237A4.194 4.194 0 0 0 7.8 6.126a4.243 4.243 0 0 0 1.237 3.005A4.194 4.194 0 0 0 12 10.8a4.243 4.243 0 0 0 3.005-1.237A4.194 4.194 0 0 0 16.2 6.126a4.243 4.243 0 0 0-1.237-3.005A4.194 4.194 0 0 0 12 1.2zm0 1.2a2.98 2.98 0 0 1 2.113.877A2.924 2.924 0 0 1 15 6.126c0 .79-.31 1.527-.877 2.087A2.98 2.98 0 0 1 12 9a2.98 2.98 0 0 1-2.113-.877A2.924 2.924 0 0 1 9 6.126c0-.79.31-1.527.877-2.087A2.98 2.98 0 0 1 12 2.4zm0 1.2a1.772 1.772 0 0 0-1.247.52A1.72 1.72 0 0 0 10.8 6.126c0 .46.18.888.504 1.207a1.772 1.772 0 0 0 1.247.52c.468 0 .897-.18 1.226-.504A1.72 1.72 0 0 0 14.4 6.126c0-.46-.18-.888-.504-1.207A1.772 1.772 0 0 0 12 3.6zm6.6 3.479a.41.41 0 0 1 .41.41v7.161a.41.41 0 0 1-.41.41h-1.2V9.24h.882l.196-2.2h-.984V5.41c0-.253.204-.457.457-.457h.526V3.6h-.926a1.224 1.224 0 0 0-.877.36A1.246 1.246 0 0 0 16.8 5.41v1.63h1.2zm0 0"></path>
    //       </svg>
    //     </a>
    //   </div>
    //   <div class="text-center text-white mt-2">
    //     Powered by Coffee, Made with{" "}
    //     <svg
    //       class="inline w-4 h-4 text-white align-middle"
    //       fill="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path d="M12 22.539l-1.819-1.609c-6.067-5.365-10.487-9.762-10.487-14.404C0.694 3.646 4.816 0 12 0s11.306 3.646 11.306 6.526c0 4.642-4.42 9.04-10.487 14.404L12 22.539zm-1.645-4.206c5.245-4.62 9.045-8.387 9.045-12.913C19.4 4.098 16.91 2 12 2S4.6 4.098 4.6 5.42c0 4.526 3.8 8.293 9.045 12.913l-1.29 1.139zm0 0" />
    //     </svg>{" "}
    //     - Mohammed Ryaan
    //   </div>
    // </footer>
  );
};

export default Footer;
