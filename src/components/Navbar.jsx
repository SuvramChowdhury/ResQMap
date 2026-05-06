const Navbar=()=>{
    return(
      <div className="flex justify-between items-center p-3 pl-5 bg-gray-900 text-white text-2xl ">
        <div className="flex justify-center items-center gap-4">
          <img src="./src/assets/alarm.png" alt="image" className="h-10 w-10" />
          <h2 className="font-[Montserrat] font-extrabold">ResQMap</h2>
        </div>
        <div className="text-2xl font-[Outfit] font-bold hidden md:block">
          See It. Report It. Save Someone
        </div>
        
      </div>
    )
}
export default Navbar;