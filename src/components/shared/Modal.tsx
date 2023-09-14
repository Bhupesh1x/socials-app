function Modal({ children }: any) {
  return (
    <div className="h-screen w-full bg-[#00000062] z-[1000] flex items-center justify-center fixed top-0 left-0">
      <div className="h-[35vh] md:w-[35%] hideScroll w-[90%] rounded-lg shadow-lg bg-white relative py-3 px-6 border-2 border-gray-200 overflow-y-scroll z-[999]">
        {children}
      </div>
    </div>
  );
}

export default Modal;
