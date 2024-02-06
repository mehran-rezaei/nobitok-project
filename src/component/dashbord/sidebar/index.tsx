function Sidebar(props: any) {
  return (
    <>
      <div className="w-[70%] h-[100%] flex shadow-lg py-5 bg-zinc-50 rounded-lg  flex-col gap-10  items-center">
        {/* <div 
        // onClick={() => props.setpage(1)}
         className=" ">
          <img
            className={`${props.page == 1 ? "bg-gray-300 p-2 rounded-md" : 'p-2 rounded-md'}`}
            src="../../../../images/icons/Burger.png"
            alt=""
          />
        </div> */}
        <div>
          <img
            className={`${props.page == 2 ? "bg-gray-300 p-2 rounded-md" : 'p-2 rounded-md'}`}
            onClick={() => props.setpage(2)}
            src="../../../../images/icons/Home.png"
            alt=""
          />
        </div>
        <div>
          <img
            className={`${props.page == 3 ? "bg-gray-300 p-2 rounded-md" : ' p-2 rounded-md'}`}
            onClick={() => props.setpage(3)}
            src="../../../../images/icons/Case.png"
            alt=""
          />
        </div>
        <div>
          <img
            className={`${props.page == 4 ? "bg-gray-300 p-2 rounded-md" : 'p-2 rounded-md'}`}
            onClick={() => props.setpage(4)}
            src="../../../../images/icons/Chart.svg"
            alt=""
          />
        </div>
        <div>
          <img
            className={`${props.page == 5 ? "bg-gray-300 p-2 rounded-md" : 'p-2 rounded-md'}`}
            onClick={() => props.setpage(5)}
            src="../../../../images/icons/Wallet.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
