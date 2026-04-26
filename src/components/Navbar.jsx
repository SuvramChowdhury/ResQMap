const Navbar=()=>{
    return(
      <div className="flex justify-start gap-5 items-center p-3 pl-5 bg-gray-900 text-white text-2xl ">
        <img src="./src/assets/alarm.png" alt="image" className="h-10 w-10" />
        <h2 className="font-[Montserrat]">ResQMap</h2>
        <h4 className="hidden md:block font-[sora]">All</h4>
        <h4 className="hidden md:block font-[sora]">Fire</h4>
        <h4 className="hidden md:block font-[sora]">Flood</h4>
        <h4 className="hidden md:block font-[sora]">Accident</h4>
      </div>
    )
}
export default Navbar;