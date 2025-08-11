import appStoreImg from "/public/appStore.svg";
import googlePlayImg from "/public/googlePlay.svg";


const Footer = () => {
  return (
    <footer className=" text-white py-12 px-6 md:px-16 lg:px-32 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-2xl font-semibold">
            <span className="text-[#EF3A55]">Q</span>uickShow
          </h2>
          <p className="text-[#C0C0C0] mt-4 leading-relaxed text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          <div className="flex space-x-4 mt-6">
            <a href="#">
              <img
                src={googlePlayImg}
                alt="Get it on Google Play"
                className="h-12"
              />
            </a>
            <a href="#">
              <img
                src={appStoreImg}
                alt="Download on the App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 pl-60">Company</h3>
          <ul className="space-y-2 text-[#C0C0C0] pl-60 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Contact us</a></li>
            <li><a href="#" className="hover:text-white">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 pl-50">Get in touch</h3>
          <p className="text-[#C0C0C0] text-sm pl-50" >+1-234-567-890</p>
          <p className="text-[#C0C0C0] text-sm mt-2 pl-50">contact@example.com</p>
        </div>
      </div>
      <div className='pt-5'>
        <hr/>
      </div>
    </footer>
  );
};

export default Footer;
