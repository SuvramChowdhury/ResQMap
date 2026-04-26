const Navbar=()=>{
    return(
      <div className="flex justify-start gap-5 items-center p-3 pl-5 bg-gray-900 text-white text-2xl ">
        <img src="./src/assets/alarm.png" alt="image" className="h-10 w-10" />
        <h2 className="font-[Montserrat] font-extrabold">ResQMap</h2>
        <h4 className="hidden md:block font-[sora] font-medium">All</h4>
        <h4 className="hidden md:block font-[sora] font-medium">Fire</h4>
        <h4 className="hidden md:block font-[sora] font-medium">Flood</h4>
        <h4 className="hidden md:block font-[sora] font-medium">Accident</h4>
      </div>
    )
}
export default Navbar;